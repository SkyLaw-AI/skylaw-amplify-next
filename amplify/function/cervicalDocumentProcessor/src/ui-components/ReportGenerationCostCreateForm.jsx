/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createReportGenerationCost } from "../graphql/mutations";
const client = generateClient();
export default function ReportGenerationCostCreateForm(props) {
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
    OpenAiPromptCost: "",
    OpenAiCompletionCost: "",
    AwsTextractCost: "",
    AwsComprehendMedicalCost: "",
    TotalCost: "",
    createdAt: "",
    documentKey: "",
  };
  const [OpenAiPromptCost, setOpenAiPromptCost] = React.useState(
    initialValues.OpenAiPromptCost
  );
  const [OpenAiCompletionCost, setOpenAiCompletionCost] = React.useState(
    initialValues.OpenAiCompletionCost
  );
  const [AwsTextractCost, setAwsTextractCost] = React.useState(
    initialValues.AwsTextractCost
  );
  const [AwsComprehendMedicalCost, setAwsComprehendMedicalCost] =
    React.useState(initialValues.AwsComprehendMedicalCost);
  const [TotalCost, setTotalCost] = React.useState(initialValues.TotalCost);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [documentKey, setDocumentKey] = React.useState(
    initialValues.documentKey
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setOpenAiPromptCost(initialValues.OpenAiPromptCost);
    setOpenAiCompletionCost(initialValues.OpenAiCompletionCost);
    setAwsTextractCost(initialValues.AwsTextractCost);
    setAwsComprehendMedicalCost(initialValues.AwsComprehendMedicalCost);
    setTotalCost(initialValues.TotalCost);
    setCreatedAt(initialValues.createdAt);
    setDocumentKey(initialValues.documentKey);
    setErrors({});
  };
  const validations = {
    OpenAiPromptCost: [{ type: "Required" }],
    OpenAiCompletionCost: [{ type: "Required" }],
    AwsTextractCost: [{ type: "Required" }],
    AwsComprehendMedicalCost: [{ type: "Required" }],
    TotalCost: [{ type: "Required" }],
    createdAt: [{ type: "Required" }],
    documentKey: [{ type: "Required" }],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
          OpenAiPromptCost,
          OpenAiCompletionCost,
          AwsTextractCost,
          AwsComprehendMedicalCost,
          TotalCost,
          createdAt,
          documentKey,
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
            query: createReportGenerationCost.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "ReportGenerationCostCreateForm")}
      {...rest}
    >
      <TextField
        label="Open ai prompt cost"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={OpenAiPromptCost}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              OpenAiPromptCost: value,
              OpenAiCompletionCost,
              AwsTextractCost,
              AwsComprehendMedicalCost,
              TotalCost,
              createdAt,
              documentKey,
            };
            const result = onChange(modelFields);
            value = result?.OpenAiPromptCost ?? value;
          }
          if (errors.OpenAiPromptCost?.hasError) {
            runValidationTasks("OpenAiPromptCost", value);
          }
          setOpenAiPromptCost(value);
        }}
        onBlur={() => runValidationTasks("OpenAiPromptCost", OpenAiPromptCost)}
        errorMessage={errors.OpenAiPromptCost?.errorMessage}
        hasError={errors.OpenAiPromptCost?.hasError}
        {...getOverrideProps(overrides, "OpenAiPromptCost")}
      ></TextField>
      <TextField
        label="Open ai completion cost"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={OpenAiCompletionCost}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              OpenAiPromptCost,
              OpenAiCompletionCost: value,
              AwsTextractCost,
              AwsComprehendMedicalCost,
              TotalCost,
              createdAt,
              documentKey,
            };
            const result = onChange(modelFields);
            value = result?.OpenAiCompletionCost ?? value;
          }
          if (errors.OpenAiCompletionCost?.hasError) {
            runValidationTasks("OpenAiCompletionCost", value);
          }
          setOpenAiCompletionCost(value);
        }}
        onBlur={() =>
          runValidationTasks("OpenAiCompletionCost", OpenAiCompletionCost)
        }
        errorMessage={errors.OpenAiCompletionCost?.errorMessage}
        hasError={errors.OpenAiCompletionCost?.hasError}
        {...getOverrideProps(overrides, "OpenAiCompletionCost")}
      ></TextField>
      <TextField
        label="Aws textract cost"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={AwsTextractCost}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              OpenAiPromptCost,
              OpenAiCompletionCost,
              AwsTextractCost: value,
              AwsComprehendMedicalCost,
              TotalCost,
              createdAt,
              documentKey,
            };
            const result = onChange(modelFields);
            value = result?.AwsTextractCost ?? value;
          }
          if (errors.AwsTextractCost?.hasError) {
            runValidationTasks("AwsTextractCost", value);
          }
          setAwsTextractCost(value);
        }}
        onBlur={() => runValidationTasks("AwsTextractCost", AwsTextractCost)}
        errorMessage={errors.AwsTextractCost?.errorMessage}
        hasError={errors.AwsTextractCost?.hasError}
        {...getOverrideProps(overrides, "AwsTextractCost")}
      ></TextField>
      <TextField
        label="Aws comprehend medical cost"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={AwsComprehendMedicalCost}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              OpenAiPromptCost,
              OpenAiCompletionCost,
              AwsTextractCost,
              AwsComprehendMedicalCost: value,
              TotalCost,
              createdAt,
              documentKey,
            };
            const result = onChange(modelFields);
            value = result?.AwsComprehendMedicalCost ?? value;
          }
          if (errors.AwsComprehendMedicalCost?.hasError) {
            runValidationTasks("AwsComprehendMedicalCost", value);
          }
          setAwsComprehendMedicalCost(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "AwsComprehendMedicalCost",
            AwsComprehendMedicalCost
          )
        }
        errorMessage={errors.AwsComprehendMedicalCost?.errorMessage}
        hasError={errors.AwsComprehendMedicalCost?.hasError}
        {...getOverrideProps(overrides, "AwsComprehendMedicalCost")}
      ></TextField>
      <TextField
        label="Total cost"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={TotalCost}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              OpenAiPromptCost,
              OpenAiCompletionCost,
              AwsTextractCost,
              AwsComprehendMedicalCost,
              TotalCost: value,
              createdAt,
              documentKey,
            };
            const result = onChange(modelFields);
            value = result?.TotalCost ?? value;
          }
          if (errors.TotalCost?.hasError) {
            runValidationTasks("TotalCost", value);
          }
          setTotalCost(value);
        }}
        onBlur={() => runValidationTasks("TotalCost", TotalCost)}
        errorMessage={errors.TotalCost?.errorMessage}
        hasError={errors.TotalCost?.hasError}
        {...getOverrideProps(overrides, "TotalCost")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              OpenAiPromptCost,
              OpenAiCompletionCost,
              AwsTextractCost,
              AwsComprehendMedicalCost,
              TotalCost,
              createdAt: value,
              documentKey,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <TextField
        label="Document key"
        isRequired={true}
        isReadOnly={false}
        value={documentKey}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              OpenAiPromptCost,
              OpenAiCompletionCost,
              AwsTextractCost,
              AwsComprehendMedicalCost,
              TotalCost,
              createdAt,
              documentKey: value,
            };
            const result = onChange(modelFields);
            value = result?.documentKey ?? value;
          }
          if (errors.documentKey?.hasError) {
            runValidationTasks("documentKey", value);
          }
          setDocumentKey(value);
        }}
        onBlur={() => runValidationTasks("documentKey", documentKey)}
        errorMessage={errors.documentKey?.errorMessage}
        hasError={errors.documentKey?.hasError}
        {...getOverrideProps(overrides, "documentKey")}
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
