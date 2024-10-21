/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps, useNavigateAction } from "./utils";
import LogoWithText from "./LogoWithText";
import { Button, Flex, Text } from "@aws-amplify/ui-react";
import MyIcon from "./MyIcon";
export default function NavBarHeader(props) {
  const { overrides, ...rest } = props;
  const dashboardOnClick = useNavigateAction({ type: "url", url: "/" });
  const billingOnClick = useNavigateAction({ type: "url", url: "" });
  return (
    <Flex
      gap="40px"
      direction="row"
      width="1440px"
      height="unset"
      justifyContent="center"
      alignItems="center"
      position="relative"
      boxShadow="0px 2px 6px rgba(0.05098039284348488, 0.10196078568696976, 0.14901961386203766, 0.15000000596046448)"
      padding="24px 32px 24px 32px"
      backgroundColor="rgba(13,26,38,1)"
      {...getOverrideProps(overrides, "NavBarHeader")}
      {...rest}
    >
      <LogoWithText
        width="127.88px"
        height="18.91px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        color="brand"
        {...getOverrideProps(overrides, "LogoWithText")}
      ></LogoWithText>
      <Flex
        gap="40px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 32129767076")}
      >
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          color="rgba(255,255,255,1)"
          lineHeight="24px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Dashboard"
          onClick={() => {
            dashboardOnClick();
          }}
          {...getOverrideProps(overrides, "Dashboard")}
        ></Text>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          color="rgba(255,255,255,1)"
          lineHeight="24px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Billing"
          onClick={() => {
            billingOnClick();
          }}
          {...getOverrideProps(overrides, "Billing")}
        ></Text>
      </Flex>
      <Flex
        gap="32px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-end"
        alignItems="center"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 32129767081")}
      >
        <MyIcon
          width="24px"
          height="24px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          overflow="hidden"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          type="notification"
          {...getOverrideProps(overrides, "MyIcon")}
        ></MyIcon>
        <Button
          width="unset"
          height="unset"
          shrink="0"
          size="default"
          isDisabled={false}
          variation="link"
          children="Logout"
          {...getOverrideProps(overrides, "Logout")}
        ></Button>
      </Flex>
    </Flex>
  );
}
