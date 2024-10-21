/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { MyIconProps } from "./MyIcon";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
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
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type Features2x2OverridesProps = {
    Features2x2?: PrimitiveOverrideProps<FlexProps>;
    Features?: PrimitiveOverrideProps<FlexProps>;
    FeatureRow1?: PrimitiveOverrideProps<FlexProps>;
    Feature1?: PrimitiveOverrideProps<FlexProps>;
    IconBox1?: PrimitiveOverrideProps<FlexProps>;
    Icon1?: MyIconProps;
    Heading1?: PrimitiveOverrideProps<TextProps>;
    Description1?: PrimitiveOverrideProps<TextProps>;
    Feature2?: PrimitiveOverrideProps<FlexProps>;
    IconBox2?: PrimitiveOverrideProps<FlexProps>;
    Icon2?: MyIconProps;
    Heading2?: PrimitiveOverrideProps<TextProps>;
    Description2?: PrimitiveOverrideProps<TextProps>;
    FeatureRow2?: PrimitiveOverrideProps<FlexProps>;
    Feature3?: PrimitiveOverrideProps<FlexProps>;
    IconBox3?: PrimitiveOverrideProps<FlexProps>;
    Icon3?: MyIconProps;
    Heading3?: PrimitiveOverrideProps<TextProps>;
    Description3?: PrimitiveOverrideProps<TextProps>;
    Feature4?: PrimitiveOverrideProps<FlexProps>;
    IconBox4?: PrimitiveOverrideProps<FlexProps>;
    Icon4?: MyIconProps;
    Heading4?: PrimitiveOverrideProps<TextProps>;
    Description4?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type Features2x2Props = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: Features2x2OverridesProps | undefined | null;
}>;
export default function Features2x2(props: Features2x2Props): React.ReactElement;
