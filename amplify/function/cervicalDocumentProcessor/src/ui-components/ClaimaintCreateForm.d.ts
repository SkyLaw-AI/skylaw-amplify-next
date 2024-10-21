/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { StorageManagerProps } from "@aws-amplify/ui-react-storage";
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
export declare type ClaimaintCreateFormInputValues = {
    name?: string;
    injuryDate?: string;
    documentKey?: string;
    invoiceDocumentPath?: string;
};
export declare type ClaimaintCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    injuryDate?: ValidationFunction<string>;
    documentKey?: ValidationFunction<string>;
    invoiceDocumentPath?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ClaimaintCreateFormOverridesProps = {
    ClaimaintCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    injuryDate?: PrimitiveOverrideProps<TextFieldProps>;
    documentKey?: PrimitiveOverrideProps<StorageManagerProps>;
    invoiceDocumentPath?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ClaimaintCreateFormProps = React.PropsWithChildren<{
    overrides?: ClaimaintCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ClaimaintCreateFormInputValues) => ClaimaintCreateFormInputValues;
    onSuccess?: (fields: ClaimaintCreateFormInputValues) => void;
    onError?: (fields: ClaimaintCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ClaimaintCreateFormInputValues) => ClaimaintCreateFormInputValues;
    onValidate?: ClaimaintCreateFormValidationValues;
} & React.CSSProperties>;
export default function ClaimaintCreateForm(props: ClaimaintCreateFormProps): React.ReactElement;
