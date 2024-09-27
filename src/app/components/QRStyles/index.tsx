import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import QRBranding from "./QRBranding";
import QREyes from "./QREyes";
import QRPattern from "./QRPattern";
import QROthers from "./QROthers";
import {
  PiAirTrafficControl,
  PiExclude,
  PiQrCodeDuotone,
  PiRugFill,
} from "react-icons/pi";
import { QRConfigData } from "@/types/qrTypes";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

export const BorderBox = ({ active, onClick, children }: Props) => {
  return (
    <Box
      onClick={onClick}
      height={14}
      width={14}
      p={1}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"md"}
      cursor={"pointer"}
      borderWidth={active ? "2px" : "1px"}
      borderColor={active ? "blue.400" : "gray.200"}
    >
      {children}
    </Box>
  );
};

const StyleTypeBox = ({ active, children, onClick }: Props) => {
  return (
    <Box
      _hover={{
        shadow: "base",
      }}
      shadow={active ? "base" : ""}
      borderWidth={active ? "2px" : "1px"}
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={active ? "red.200" : "gray.200"}
      borderRadius={"xl"}
      cursor={"pointer"}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

export default function QRStyles({
  handleQrData,
  qrData,
}: {
  handleQrData: (data: any) => void;
  qrData: QRConfigData;
}) {
  const {
    eyeColor,
    eyeRadius,
    fgColor,
    qrStyle,
    logoPadding,
    logoHeight,
    logoWidth,
    bgColor,
    quietZone,
    ecLevel,
    logoPaddingStyle,
    logoImage,
  } = qrData;

  const styleTypes = [
    {
      name: "Pattern",
      icon: <PiQrCodeDuotone size={30} />,
    },
    {
      name: "Brand",
      icon: <PiAirTrafficControl size={30} />,
    },
    {
      name: "Eyes",
      icon: <PiExclude size={30} />,
    },
    // {
    //   name: "Background",
    //   icon: "",
    // },
    // {
    //   name: "Frames",
    //   icon: "",
    // },
    {
      name: "Others",
      icon: <PiRugFill size={30} />,
    },
  ];

  const [activeStyle, setActiveStyle] = useState(styleTypes[0]);

  return (
    <Box width={"full"}>
      <HStack
        gap={5}
        flexWrap={"wrap"}
        width={"full"}
        alignItems={"flex-start"}
      >
        {styleTypes.map((styleType) => (
          <StyleTypeBox
            key={styleType.name}
            active={activeStyle.name === styleType.name}
            onClick={() => setActiveStyle(styleType)}
          >
            <VStack gap={0} height={"85px"} width={"90px"}>
              <Box
                height={"50px"}
                width={"full"}
                bg={"gray.100"}
                borderTopRadius={"xl"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {styleType.icon}
              </Box>
              <Box
                height={"40px"}
                width={"full"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                bg={"transparent"}
              >
                <Text>{styleType.name}</Text>
              </Box>
            </VStack>
          </StyleTypeBox>
        ))}
      </HStack>
      {activeStyle.name === "Brand" && (
        <QRBranding
          logoPaddingStyle={logoPaddingStyle}
          logoPadding={logoPadding}
          logoHeight={logoHeight}
          logoWidth={logoWidth}
          setValue={handleQrData}
          logoImage={logoImage}
        />
      )}
      {activeStyle.name === "Eyes" && (
        <QREyes
          eyeRadius={eyeRadius}
          eyeColor={eyeColor}
          setValue={handleQrData}
        />
      )}
      {activeStyle.name === "Pattern" && (
        <QRPattern
          qrStyle={qrStyle}
          fgColor={fgColor}
          setValue={handleQrData}
        />
      )}
      {activeStyle.name === "Others" && (
        <QROthers
          bgColor={bgColor}
          quietZone={quietZone}
          ecLevel={ecLevel}
          setValue={handleQrData}
        />
      )}
    </Box>
  );
}
