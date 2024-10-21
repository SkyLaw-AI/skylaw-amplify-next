/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  getOverridesFromVariants,
  mergeVariantsAndOverrides,
} from "./utils";
import { Text, View } from "@aws-amplify/ui-react";
export default function LogoWithText(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: { SKYLAW: {}, logo: {}, LogoWithText: {} },
      variantValues: { color: "neutral" },
    },
    {
      overrides: {
        SKYLAW: { color: "rgba(64,106,191,1)", top: "0.09px" },
        logo: {},
        LogoWithText: {},
      },
      variantValues: { color: "brand" },
    },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <View
      width="127.88px"
      height="18.91px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "LogoWithText")}
      {...rest}
    >
      <View
        width="127.88px"
        height="18.91px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0px"
        left="0px"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "logo")}
      >
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="600"
          color="rgba(92,102,112,1)"
          lineHeight="19.363636016845703px"
          textAlign="center"
          display="block"
          direction="column"
          justifyContent="unset"
          letterSpacing="3.05px"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          position="absolute"
          top="0px"
          left="calc(50% - 42.5px - 0.44px)"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="SKYLAW"
          {...getOverrideProps(overrides, "SKYLAW")}
        ></Text>
      </View>
    </View>
  );
}
