"use client";
import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { QRCode } from "../QRCodeGenerator";
import Image from "next/image";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { QRConfigData } from "@/types/qrTypes";

export default function RenderQR({ qrData }: { qrData: QRConfigData }) {
  const { value } = qrData;

  // const handleDownload = () => {
  // 	html2canvas(document.querySelector('#react-qrcode-logo') as any)
  // 		.then(function (canvas) {
  // 			const link = document.createElement('a');
  // 			link.download = 'react-qrcode-logo.png';
  // 			link.href = canvas.toDataURL();
  // 			link.click();
  // 		});
  // }

  function download({ type = "png" }) {
    if (value) {
      let canvas = document.getElementById(
        "cumin-qr-code-canvas"
      ) as HTMLCanvasElement;
      let url = canvas && canvas.toDataURL(`image/${type}`);
      let link = document.createElement("a");
      link.download = `your-qr.${type}`;
      link.href = url;
      link.click();
    } else {
      alert("Please generate a QR code first");
    }
  }

  // function shareCanvasViaEmail(
  //   subject = "Sharing QR code",
  //   body = "Check out this QR code:"
  // ) {
  //   var canvas = document.getElementById(
  //     "cumin-qr-code-canvas"
  //   ) as HTMLCanvasElement;
  //   // Get data URL of canvas content
  //   const dataURL = canvas.toDataURL("image/png");

  //   // Encode the data URL to make it safe for inclusion in a URL
  //   const encodedData = encodeURIComponent(dataURL);

  //   // Create the mailto link with the canvas image as attachment
  //   const mailtoLink = `mailto:?subject=${encodeURIComponent(
  //     subject
  //   )}&body=${encodeURIComponent(body)}%0A%0A${encodedData}`;

  //   // Open the default email client with the mailto link
  //   window.open(mailtoLink);
  // }

  return (
    <Stack
      spacing={{ base: 5, md: 6 }}
      alignItems={"center"}
      position={"sticky"}
      top={6}
    >
      <Box>
        {value ? (
          <QRCode {...qrData} />
        ) : (
          <Box borderRadius={"lg"} borderWidth={"1px"} p={8}>
            <Image
              src={"/static/qr-code-fallback.svg"}
              height={343}
              width={343}
              alt="QR"
            />
          </Box>
        )}
      </Box>
      <HStack spacing={8} alignItems={"center"}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width={60}>
            Download
          </MenuButton>
          <MenuList bg={"white"} zIndex={99}>
            <MenuItem onClick={() => download({ type: "png" })}>
              Download as PNG
            </MenuItem>
            <MenuItem onClick={() => download({ type: "jpg" })}>
              Download as JPG
            </MenuItem>
            <MenuItem onClick={() => download({ type: "webp" })}>
              Download as WEBP
            </MenuItem>
          </MenuList>
        </Menu>
        {/* <Menu>
          <MenuButton
            width={"full"}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            Share
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => shareCanvasViaEmail()}>Share via Main</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu> */}
      </HStack>
      <Text as={"span"}>
        Make sure to test out your configured QR code before using it in
        production.
      </Text>
    </Stack>
  );
}
