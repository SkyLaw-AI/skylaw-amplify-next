/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getClaimaint } from "../graphql/queries";
import { updateClaimaint } from "../graphql/mutations";
const client = generateClient();
export default function ClaimaintUpdateForm(props) {
  const {
    id: idProp,
    claimaint: claimaintModelProp,
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
    searchName: "",
    reportKey: "",
    injuryDate: "",
    createdAt: "",
    reportStatus: "",
    pageCount: "",
    baseCostPerPage: "",
    totalCost: "",
    invoiceDocumentPath: "",
    type: "",
    documentKey: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [searchName, setSearchName] = React.useState(initialValues.searchName);
  const [reportKey, setReportKey] = React.useState(initialValues.reportKey);
  const [injuryDate, setInjuryDate] = React.useState(initialValues.injuryDate);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [reportStatus, setReportStatus] = React.useState(
    initialValues.reportStatus
  );
  const [pageCount, setPageCount] = React.useState(initialValues.pageCount);
  const [baseCostPerPage, setBaseCostPerPage] = React.useState(
    initialValues.baseCostPerPage
  );
  const [totalCost, setTotalCost] = React.useState(initialValues.totalCost);
  const [invoiceDocumentPath, setInvoiceDocumentPath] = React.useState(
    initialValues.invoiceDocumentPath
  );
  const [type, setType] = React.useState(initialValues.type);
  const [documentKey, setDocumentKey] = React.useState(
    initialValues.documentKey
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = claimaintRecord
      ? { ...initialValues, ...claimaintRecord }
      : initialValues;
    setName(cleanValues.name);
    setSearchName(cleanValues.searchName);
    setReportKey(cleanValues.reportKey);
    setInjuryDate(cleanValues.injuryDate);
    setCreatedAt(cleanValues.createdAt);
    setReportStatus(cleanValues.reportStatus);
    setPageCount(cleanValues.pageCount);
    setBaseCostPerPage(cleanValues.baseCostPerPage);
    setTotalCost(cleanValues.totalCost);
    setInvoiceDocumentPath(cleanValues.invoiceDocumentPath);
    setType(cleanValues.type);
    setDocumentKey(cleanValues.documentKey);
    setErrors({});
  };
  const [claimaintRecord, setClaimaintRecord] =
    React.useState(claimaintModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getClaimaint.replaceAll("__typename", ""),
              variables: { ...idProp },
            })
          )?.data?.getClaimaint
        : claimaintModelProp;
      setClaimaintRecord(record);
    };
    queryData();
  }, [idProp, claimaintModelProp]);
  React.useEffect(resetStateValues, [claimaintRecord]);
  const validations = {
    name: [{ type: "Required" }],
    searchName: [{ type: "Required" }],
    reportKey: [],
    injuryDate: [{ type: "Required" }],
    createdAt: [{ type: "Required" }],
    reportStatus: [{ type: "Required" }],
    pageCount: [],
    baseCostPerPage: [],
    totalCost: [],
    invoiceDocumentPath: [],
    type: [{ type: "Required" }],
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
          name,
          searchName,
          reportKey: reportKey ?? null,
          injuryDate,
          createdAt,
          reportStatus,
          pageCount: pageCount ?? null,
          baseCostPerPage: baseCostPerPage ?? null,
          totalCost: totalCost ?? null,
          invoiceDocumentPath: invoiceDocumentPath ?? null,
          type,
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
            query: updateClaimaint.replaceAll("__typename", ""),
            variables: {
              input: {
                documentKey: claimaintRecord.documentKey,
                createdAt: claimaintRecord.createdAt,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ClaimaintUpdateForm")}
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
              searchName,
              reportKey,
              injuryDate,
              createdAt,
              reportStatus,
              pageCount,
              baseCostPerPage,
              totalCost,
              invoiceDocumentPath,
              type,
              documentKey,
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
        label="Search name"
        isRequired={true}
        isReadOnly={false}
        value={searchName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              searchName: value,
              reportKey,
              injuryDate,
              createdAt,
              reportStatus,
              pageCount,
              baseCostPerPage,
              totalCost,
              invoiceDocumentPath,
              type,
              documentKey,
            };
            const result = onChange(modelFields);
            value = result?.searchName ?? value;
          }
          if (errors.searchName?.hasError) {
            runValidationTasks("searchName", value);
          }
          setSearchName(value);
        }}
        onBlur={() => runValidationTasks("searchName", searchName)}
        errorMessage={errors.searchName?.errorMessage}
        hasError={errors.searchName?.hasError}
        {...getOverrideProps(overrides, "searchName")}
      ></TextField>
      <TextField
        label="Report key"
        isRequired={false}
        isReadOnly={false}
        value={reportKey}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              searchName,
              reportKey: value,
              injuryDate,
              createdAt,
              reportStatus,
              pageCount,
              baseCostPerPage,
              totalCost,
              invoiceDocumentPath,
              type,
              documentKey,
            };
            const result = onChange(modelFields);
            value = result?.reportKey ?? value;
          }
          if (errors.reportKey?.hasError) {
            runValidationTasks("reportKey", value);
          }
          setReportKey(value);
        }}
        onBlur={() => runValidationTasks("reportKey", reportKey)}
        errorMessage={errors.reportKey?.errorMessage}
        hasError={errors.reportKey?.hasError}
        {...getOverrideProps(overrides, "reportKey")}
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
              searchName,
              reportKey,
              injuryDate: value,
              createdAt,
              reportStatus,
              pageCount,
              baseCostPerPage,
              totalCost,
              invoiceDocumentPath,
              type,
              documentKey,
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
      <TextField
        label="Created at"
        isRequired={true}
        isReadOnly={true}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              name,
              searchName,
              reportKey,
              injuryDate,
              createdAt: value,
              reportStatus,
              pageCount,
              baseCostPerPage,
              totalCost,
              invoiceDocumentPath,
              type,
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
      <SelectField
        label="Report status"
        placeholder="Please select an option"
        isDisabled={false}
        value={reportStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              searchName,
              reportKey,
              injuryDate,
              createdAt,
              reportStatus: value,
              pageCount,
              baseCostPerPage,
              totalCost,
              invoiceDocumentPath,
              type,
              documentKey,
            };
            const result = onChange(modelFields);
            value = result?.reportStatus ?? value;
          }
          if (errors.reportStatus?.hasError) {
            runValidationTasks("reportStatus", value);
          }
          setReportStatus(value);
        }}
        onBlur={() => runValidationTasks("reportStatus", reportStatus)}
        errorMessage={errors.reportStatus?.errorMessage}
        hasError={errors.reportStatus?.hasError}
        {...getOverrideProps(overrides, "reportStatus")}
      >
        <option
          children="Request received"
          value="REQUEST_RECEIVED"
          {...getOverrideProps(overrides, "reportStatusoption0")}
        ></option>
        <option
          children="Processing document"
          value="PROCESSING_DOCUMENT"
          {...getOverrideProps(overrides, "reportStatusoption1")}
        ></option>
        <option
          children="Complete"
          value="COMPLETE"
          {...getOverrideProps(overrides, "reportStatusoption2")}
        ></option>
        <option
          children="Invalid document"
          value="INVALID_DOCUMENT"
          {...getOverrideProps(overrides, "reportStatusoption3")}
        ></option>
        <option
          children="Error"
          value="ERROR"
          {...getOverrideProps(overrides, "reportStatusoption4")}
        ></option>
      </SelectField>
      <TextField
        label="Page count"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={pageCount}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              searchName,
              reportKey,
              injuryDate,
              createdAt,
              reportStatus,
              pageCount: value,
              baseCostPerPage,
              totalCost,
              invoiceDocumentPath,
              type,
              documentKey,
            };
            const result = onChange(modelFields);
            value = result?.pageCount ?? value;
          }
          if (errors.pageCount?.hasError) {
            runValidationTasks("pageCount", value);
          }
          setPageCount(value);
        }}
        onBlur={() => runValidationTasks("pageCount", pageCount)}
        errorMessage={errors.pageCount?.errorMessage}
        hasError={errors.pageCount?.hasError}
        {...getOverrideProps(overrides, "pageCount")}
      ></TextField>
      <TextField
        label="Base cost per page"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={baseCostPerPage}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              searchName,
              reportKey,
              injuryDate,
              createdAt,
              reportStatus,
              pageCount,
              baseCostPerPage: value,
              totalCost,
              invoiceDocumentPath,
              type,
              documentKey,
            };
            const result = onChange(modelFields);
            value = result?.baseCostPerPage ?? value;
          }
          if (errors.baseCostPerPage?.hasError) {
            runValidationTasks("baseCostPerPage", value);
          }
          setBaseCostPerPage(value);
        }}
        onBlur={() => runValidationTasks("baseCostPerPage", baseCostPerPage)}
        errorMessage={errors.baseCostPerPage?.errorMessage}
        hasError={errors.baseCostPerPage?.hasError}
        {...getOverrideProps(overrides, "baseCostPerPage")}
      ></TextField>
      <TextField
        label="Total cost"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={totalCost}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              searchName,
              reportKey,
              injuryDate,
              createdAt,
              reportStatus,
              pageCount,
              baseCostPerPage,
              totalCost: value,
              invoiceDocumentPath,
              type,
              documentKey,
            };
            const result = onChange(modelFields);
            value = result?.totalCost ?? value;
          }
          if (errors.totalCost?.hasError) {
            runValidationTasks("totalCost", value);
          }
          setTotalCost(value);
        }}
        onBlur={() => runValidationTasks("totalCost", totalCost)}
        errorMessage={errors.totalCost?.errorMessage}
        hasError={errors.totalCost?.hasError}
        {...getOverrideProps(overrides, "totalCost")}
      ></TextField>
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
              searchName,
              reportKey,
              injuryDate,
              createdAt,
              reportStatus,
              pageCount,
              baseCostPerPage,
              totalCost,
              invoiceDocumentPath: value,
              type,
              documentKey,
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
      <TextField
        label="Type"
        isRequired={true}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              searchName,
              reportKey,
              injuryDate,
              createdAt,
              reportStatus,
              pageCount,
              baseCostPerPage,
              totalCost,
              invoiceDocumentPath,
              type: value,
              documentKey,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></TextField>
      <TextField
        label="Document key"
        isRequired={true}
        isReadOnly={true}
        value={documentKey}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              searchName,
              reportKey,
              injuryDate,
              createdAt,
              reportStatus,
              pageCount,
              baseCostPerPage,
              totalCost,
              invoiceDocumentPath,
              type,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || claimaintModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || claimaintModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
