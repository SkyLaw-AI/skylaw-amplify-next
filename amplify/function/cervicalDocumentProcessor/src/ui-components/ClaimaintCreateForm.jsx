/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import {
  fetchByPath,
  getOverrideProps,
  processFile,
  validateField,
} from "./utils";
import { generateClient } from "aws-amplify/api";
import { createClaimaint } from "../graphql/mutations";
import { Field } from "@aws-amplify/ui-react/internal";
const client = generateClient();
export default function ClaimaintCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    injuryDate: "",
    documentKey: undefined,
    invoiceDocumentPath: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [injuryDate, setInjuryDate] = React.useState(initialValues.injuryDate);
  const [documentKey, setDocumentKey] = React.useState(
    initialValues.documentKey
  );
  const [invoiceDocumentPath, setInvoiceDocumentPath] = React.useState(
    initialValues.invoiceDocumentPath
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setInjuryDate(initialValues.injuryDate);
    setDocumentKey(initialValues.documentKey);
    setInvoiceDocumentPath(initialValues.invoiceDocumentPath);
    setErrors({});
  };
  const validations = {
    name: [{ type: "Required" }],
    injuryDate: [{ type: "Required" }],
    documentKey: [{ type: "Required" }],
    invoiceDocumentPath: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          injuryDate,
          documentKey,
          invoiceDocumentPath,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createClaimaint.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ClaimaintCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              injuryDate,
              documentKey,
              invoiceDocumentPath,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Injury date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={injuryDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              injuryDate: value,
              documentKey,
              invoiceDocumentPath,
            };
            const result = onChange(modelFields);
            value = result?.injuryDate ?? value;
          }
          if (errors.injuryDate?.hasError) {
            runValidationTasks("injuryDate", value);
          }
          setInjuryDate(value);
        }}
        onBlur={() => runValidationTasks("injuryDate", injuryDate)}
        errorMessage={errors.injuryDate?.errorMessage}
        hasError={errors.injuryDate?.hasError}
        {...getOverrideProps(overrides, "injuryDate")}
      ></TextField>
      <Field
        errorMessage={errors.documentKey?.errorMessage}
        hasError={errors.documentKey?.hasError}
        label={"Document key"}
        isRequired={true}
        isReadOnly={false}
      >
        <StorageManager
          onUploadSuccess={({ key }) => {
            setDocumentKey((prev) => {
              let value = key;
              if (onChange) {
                const modelFields = {
                  name,
                  injuryDate,
                  documentKey: value,
                  invoiceDocumentPath,
                };
                const result = onChange(modelFields);
                value = result?.documentKey ?? value;
              }
              return value;
            });
          }}
          onFileRemove={({ key }) => {
            setDocumentKey((prev) => {
              let value = initialValues?.documentKey;
              if (onChange) {
                const modelFields = {
                  name,
                  injuryDate,
                  documentKey: value,
                  invoiceDocumentPath,
                };
                const result = onChange(modelFields);
                value = result?.documentKey ?? value;
              }
              return value;
            });
          }}
          processFile={processFile}
          accessLevel={"private"}
          acceptedFileTypes={["application/pdf"]}
          isResumable={false}
          showThumbnails={true}
          maxFileCount={1}
          maxSize={50000000}
          {...getOverrideProps(overrides, "documentKey")}
        ></StorageManager>
      </Field>
      <TextField
        label="Invoice document path"
        isRequired={false}
        isReadOnly={false}
        value={invoiceDocumentPath}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              injuryDate,
              documentKey,
              invoiceDocumentPath: value,
            };
            const result = onChange(modelFields);
            value = result?.invoiceDocumentPath ?? value;
          }
          if (errors.invoiceDocumentPath?.hasError) {
            runValidationTasks("invoiceDocumentPath", value);
          }
          setInvoiceDocumentPath(value);
        }}
        onBlur={() =>
          runValidationTasks("invoiceDocumentPath", invoiceDocumentPath)
        }
        errorMessage={errors.invoiceDocumentPath?.errorMessage}
        hasError={errors.invoiceDocumentPath?.hasError}
        {...getOverrideProps(overrides, "invoiceDocumentPath")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
