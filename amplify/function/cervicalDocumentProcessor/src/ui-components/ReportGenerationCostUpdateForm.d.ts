/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { ReportGenerationCost } from "../API.ts";
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
export declare type ReportGenerationCostUpdateFormInputValues = {
    OpenAiPromptCost?: number;
    OpenAiCompletionCost?: number;
    AwsTextractCost?: number;
    AwsComprehendMedicalCost?: number;
    TotalCost?: number;
    createdAt?: string;
    documentKey?: string;
};
export declare type ReportGenerationCostUpdateFormValidationValues = {
    OpenAiPromptCost?: ValidationFunction<number>;
    OpenAiCompletionCost?: ValidationFunction<number>;
    AwsTextractCost?: ValidationFunction<number>;
    AwsComprehendMedicalCost?: ValidationFunction<number>;
    TotalCost?: ValidationFunction<number>;
    createdAt?: ValidationFunction<string>;
    documentKey?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReportGenerationCostUpdateFormOverridesProps = {
    ReportGenerationCostUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    OpenAiPromptCost?: PrimitiveOverrideProps<TextFieldProps>;
    OpenAiCompletionCost?: PrimitiveOverrideProps<TextFieldProps>;
    AwsTextractCost?: PrimitiveOverrideProps<TextFieldProps>;
    AwsComprehendMedicalCost?: PrimitiveOverrideProps<TextFieldProps>;
    TotalCost?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    documentKey?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ReportGenerationCostUpdateFormProps = React.PropsWithChildren<{
    overrides?: ReportGenerationCostUpdateFormOverridesProps | undefined | null;
} & {
    id?: {
        documentKey: string;
        createdAt: string;
    };
    reportGenerationCost?: ReportGenerationCost;
    onSubmit?: (fields: ReportGenerationCostUpdateFormInputValues) => ReportGenerationCostUpdateFormInputValues;
    onSuccess?: (fields: ReportGenerationCostUpdateFormInputValues) => void;
    onError?: (fields: ReportGenerationCostUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ReportGenerationCostUpdateFormInputValues) => ReportGenerationCostUpdateFormInputValues;
    onValidate?: ReportGenerationCostUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ReportGenerationCostUpdateForm(props: ReportGenerationCostUpdateFormProps): React.ReactElement;
