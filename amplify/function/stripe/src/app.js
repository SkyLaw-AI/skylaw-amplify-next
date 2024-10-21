/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let tableName = "stripecustomers";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "email";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/stripe";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch (type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

/************************************
* HTTP Get method to list objects *
************************************/

app.get(path, async function (req, res) {
  var params = {
    TableName: tableName,
    Select: 'ALL_ATTRIBUTES',
  };

  try {
    const data = await ddbDocClient.send(new ScanCommand(params));
    res.json(data.Items);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: 'Could not load items: ' + err.message });
  }
});

/************************************
 * HTTP Get method to query objects *
 ************************************/

app.get(path + hashKeyPath, async function (req, res) {
  const condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH];
  } else {
    try {
      condition[partitionKeyName]['AttributeValueList'] = [convertUrlType(req.params[partitionKeyName], partitionKeyType)];
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition
  }

  try {
    const data = await ddbDocClient.send(new QueryCommand(queryParams));
    res.json(data.Items);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: 'Could not load items: ' + err.message });
  }
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + '/object' + hashKeyPath + sortKeyPath, async function (req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  let getItemParams = {
    TableName: tableName,
    Key: params
  }

  try {
    const data = await ddbDocClient.send(new GetCommand(getItemParams));
    if (data.Item) {
      res.json(data.Item);
    } else {
      res.json(data);
    }
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: 'Could not load items: ' + err.message });
  }
});


/************************************
* HTTP put method for insert object *
*************************************/

app.put(path, async function (req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  try {
    let data = await ddbDocClient.send(new PutCommand(putItemParams));
    res.json({ success: 'put call succeed!', url: req.url, data: data })
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});

/************************************
* HTTP post method for insert object *
*************************************/

app.post(path, async function (req, res) {
  const PRICE_IDS = {
    LUMBAR_PRICE_ID: process.env.LUMBAR_PRICE_ID,
    CERVICAL_PRICE_ID: process.env.CERVICAL_PRICE_ID,
    MRIDOCPROCESSOR_PRICE_ID: process.env.MRI_PRICE_ID,
    FUTURES_PRICE_ID: process.env.FUTURES_PRICE_ID,
  }

  try {
    const email = req.body.email;
    const redirectUrl = req.body.redirectUrl;
    const priceId = PRICE_IDS[req.body.priceId + '_PRICE_ID'];



    // Check if the customer already exists
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customer;
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      // Create a new customer if one doesn't already exist
      customer = await stripe.customers.create({
        email: email,
      });
    }

    const customerId = customer.id;

    // Check if the customer already has an active subscription
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
    });


    // Check each subscription's items to see if the priceId is included
    const hasSubscriptionToPriceId = subscriptions.data.some(subscription =>
      subscription.items.data.some(item => item.price.id === priceId)
    );

    if (hasSubscriptionToPriceId) {
      // Customer already has an active subscription to the given priceId, return undefined
      res.json({ success: 'post call succeed!', url: req.url, data: undefined });
      return;
    }

    let putItemParams = {
      TableName: tableName,
      Item: { email, customerId, priceId },
    };

    await ddbDocClient.send(new PutCommand(putItemParams));
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
        },
      ],
      // customer_email: email,
      customer: customerId,
      mode: 'subscription',
      success_url: redirectUrl,
      cancel_url: redirectUrl,
    });

    const stripeRedirectUrl = checkoutSession.url;

    res.json({ success: 'post call succeed!', url: req.url, data: stripeRedirectUrl });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});


/**************************************
* HTTP remove method to delete object *
***************************************/

app.delete(path + '/object' + hashKeyPath + sortKeyPath, async function (req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  let removeItemParams = {
    TableName: tableName,
    Key: params
  }

  try {
    let data = await ddbDocClient.send(new DeleteCommand(removeItemParams));
    res.json({ url: req.url, data: data });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url });
  }
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
