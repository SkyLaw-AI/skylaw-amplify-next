var AWS = require("aws-sdk");

const ses = new AWS.SES({ region: "us-east-2" });
var cognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

const LAST_REQUEST_TIME = "LAST_REQUEST_TIME";

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  let userEvent = event.requestContext.identity.cognitoAuthenticationProvider;

  const userPoolIdPattern = /cognito-idp\..+\.amazonaws\.com\/([a-zA-Z0-9-_]+)/;
  const userIdPattern = /CognitoSignIn:([a-f0-9-]+)/;

  const userPoolIdMatch = userEvent.match(userPoolIdPattern);
  const userIdMatch = userEvent.match(userIdPattern);

  const userPoolId = userPoolIdMatch ? userPoolIdMatch[1] : null;
  const userId = userIdMatch ? userIdMatch[1] : null;

  console.log("userEvent: ", userEvent);
  console.log("UserPool id: ", userPoolId);
  console.log("User id: ", userId);

  if (userPoolId && userId) {
    console.log("Fetching User");
    let user = await cognito
      .adminGetUser({
        UserPoolId: userPoolId,
        Username: userId,
      })
      .promise();

    console.log("User Attributes: ", user.UserAttributes);

    let lastRequestTime = user.UserAttributes.filter(
      (item) => item.Name === `custom:${LAST_REQUEST_TIME}`
    );

    console.log("Last request time for the user: ", lastRequestTime);
    let currDate = new Date();
    if (
      lastRequestTime &&
      lastRequestTime.length > 0 &&
      (currDate - new Date(lastRequestTime[0].Value)) / (1000 * 60 * 60) < 24
    ) {
      console.log("Curr date: ", currDate.toISOString());
      console.log(
        "Diff: ",
        (currDate - new Date(lastRequestTime[0].Value)) / (1000 * 60 * 60)
      );
      return returnResponse(500, {
        message: "Please wait 24h before requesting again!",
      });
    }

    console.log("Curr date: ", currDate.toISOString());
    console.log("Last request time: ", lastRequestTime);

    let email = user.UserAttributes.filter((item) => item.Name === "email")[0]
      .Value;

    console.log("User email attribute: ", email);

    try {
      let emailAccess = await ses
        .sendEmail({
          Destination: {
            ToAddresses: ["team@skylaw.ai"],
          },
          Message: {
            Body: {
              Text: {
                Data: "A new user has requested to gain access to MRI, please consider giving them the access.",
              },
            },
            Subject: {
              Data: `A new User ${email} is requesting access to MRI!`,
            },
          },
          Source: "john@skylaw.ai",
        })
        .promise();

      console.log("Sent the email successfully: ", emailAccess);

      console.log("Setting last update param for the user");
      await cognito
        .adminUpdateUserAttributes({
          UserPoolId: userPoolId,
          Username: userId,
          UserAttributes: [
            {
              Name: `custom:${LAST_REQUEST_TIME}`,
              Value: new Date().toISOString(),
            },
          ],
        })
        .promise();

      console.log(
        "Successfully udpated the last access request time for the user"
      );
      return returnResponse(200, {});
    } catch (error) {
      console.log(error);
      return returnResponse(500, { message: "Something Went Wrong!" });
    }
  }
  return returnResponse(500, { message: "Invalid User Request!" });
};

function returnResponse(code, body) {
  return {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(body),
  };
}
