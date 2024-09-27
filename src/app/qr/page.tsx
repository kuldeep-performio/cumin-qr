import { Box, Text } from "@chakra-ui/react";
import { Metadata } from "next";
import { QRRenderComponentHero } from "./[type]/RenderQr";

export const metadata: Metadata = {
  title: 'QR Code Generator',
  description: 'Easily generate your QR codes. Create & Customize Your Dynamic QR code for FREE. Generate simple & advanced QR codes. Easy, customizable & trackable.',
}

export default function CreateQR() {
     
  return (
    // <Container maxW={"7xl"} mt={4}>
      <Box  py={12}>
        <Text
          textAlign={"center"}
          lineHeight={"32px"}
          fontSize={32}
          mb={14}
          fontWeight={"semibold"}
        >
          Easily generate your{" "}
          <Text as={"span"} color={"red.400"}>
          QR codes
          </Text>
        </Text>
        <QRRenderComponentHero />
      </Box>
    // </Container>
  );
}
