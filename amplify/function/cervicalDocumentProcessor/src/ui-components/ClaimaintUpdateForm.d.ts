/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Claimaint } from "../API.ts";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ClaimaintUpdateFormInputValues = {
    name?: string;
    searchName?: string;
    reportKey?: string;
    injuryDate?: string;
    createdAt?: string;
    reportStatus?: string;
    pageCount?: number;
    baseCostPerPage?: number;
    totalCost?: number;
    invoiceDocumentPath?: string;
    type?: string;
    documentKey?: string;
};
export declare type ClaimaintUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    searchName?: ValidationFunction<string>;
    reportKey?: ValidationFunction<string>;
    injuryDate?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    reportStatus?: ValidationFunction<string>;
    pageCount?: ValidationFunction<number>;
    baseCostPerPage?: ValidationFunction<number>;
    totalCost?: ValidationFunction<number>;
    invoiceDocumentPath?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    documentKey?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ClaimaintUpdateFormOverridesProps = {
    ClaimaintUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    searchName?: PrimitiveOverrideProps<TextFieldProps>;
    reportKey?: PrimitiveOverrideProps<TextFieldProps>;
    injuryDate?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    reportStatus?: PrimitiveOverrideProps<SelectFieldProps>;
    pageCount?: PrimitiveOverrideProps<TextFieldProps>;
    baseCostPerPage?: PrimitiveOverrideProps<TextFieldProps>;
    totalCost?: PrimitiveOverrideProps<TextFieldProps>;
    invoiceDocumentPath?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    documentKey?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ClaimaintUpdateFormProps = React.PropsWithChildren<{
    overrides?: ClaimaintUpdateFormOverridesProps | undefined | null;
} & {
    id?: {
        documentKey: string;
        createdAt: string;
    };
    claimaint?: Claimaint;
    onSubmit?: (fields: ClaimaintUpdateFormInputValues) => ClaimaintUpdateFormInputValues;
    onSuccess?: (fields: ClaimaintUpdateFormInputValues) => void;
    onError?: (fields: ClaimaintUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ClaimaintUpdateFormInputValues) => ClaimaintUpdateFormInputValues;
    onValidate?: ClaimaintUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ClaimaintUpdateForm(props: ClaimaintUpdateFormProps): React.ReactElement;
