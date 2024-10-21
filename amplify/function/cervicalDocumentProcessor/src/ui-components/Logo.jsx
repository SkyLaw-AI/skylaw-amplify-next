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
import { Flex, Text } from "@aws-amplify/ui-react";
export default function Logo(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    { overrides: { S: {}, Logo: {} }, variantValues: { color: "neutral" } },
    {
      overrides: { S: { color: "rgba(4,125,149,1)" }, Logo: {} },
      variantValues: { color: "brand" },
    },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <Flex
      gap="10px"
      direction="column"
      width="unset"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(255,255,255,1)"
      display="flex"
      {...getOverrideProps(overrides, "Logo")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="900"
        color="rgba(125,214,232,1)"
        fontStyle="italic"
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
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="S"
        {...getOverrideProps(overrides, "S")}
      ></Text>
    </Flex>
  );
}
