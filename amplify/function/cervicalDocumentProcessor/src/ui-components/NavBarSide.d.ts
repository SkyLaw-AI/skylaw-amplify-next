/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { LogoWithTextProps } from "./LogoWithText";
import { MyIconProps } from "./MyIcon";
import { FlexProps, ImageProps, TextProps } from "@aws-amplify/ui-react";
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
export declare type NavBarSideOverridesProps = {
    NavBarSide?: PrimitiveOverrideProps<FlexProps>;
    "Frame 32129767087"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 32129767088"?: PrimitiveOverrideProps<FlexProps>;
    LogoWithText?: LogoWithTextProps;
    "Frame 414"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 322"?: PrimitiveOverrideProps<FlexProps>;
    icon39443712?: PrimitiveOverrideProps<FlexProps>;
    MyIcon39443713?: MyIconProps;
    label?: PrimitiveOverrideProps<TextProps>;
    Section?: PrimitiveOverrideProps<FlexProps>;
    link29767111?: PrimitiveOverrideProps<FlexProps>;
    icon39433544?: PrimitiveOverrideProps<FlexProps>;
    MyIcon39433545?: MyIconProps;
    Liability?: PrimitiveOverrideProps<TextProps>;
    link29767103?: PrimitiveOverrideProps<FlexProps>;
    icon39433519?: PrimitiveOverrideProps<FlexProps>;
    MyIcon39433520?: MyIconProps;
    "ICD-29767106"?: PrimitiveOverrideProps<TextProps>;
    link38991859?: PrimitiveOverrideProps<FlexProps>;
    icon38991860?: PrimitiveOverrideProps<FlexProps>;
    MyIcon38991861?: MyIconProps;
    "ICD-38991862"?: PrimitiveOverrideProps<TextProps>;
    "Frame 32129767135"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 416"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 415"?: PrimitiveOverrideProps<FlexProps>;
    "Rectangle 1163"?: PrimitiveOverrideProps<ImageProps>;
    "Frame 32129767140"?: PrimitiveOverrideProps<FlexProps>;
    "Wesley Peck"?: PrimitiveOverrideProps<TextProps>;
    MyIcon39173440?: MyIconProps;
} & EscapeHatchProps;
export declare type NavBarSideProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: NavBarSideOverridesProps | undefined | null;
}>;
export default function NavBarSide(props: NavBarSideProps): React.ReactElement;
