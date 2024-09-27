import { QRCodes } from "@/data/QRTypes";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TypeComponent } from "../QRContent";
import QRStyles from "../QRStyles";
import RenderQR from "../RenderQR";
import { QRConfigData, QROptions } from "@/types/qrTypes";
import { ReactNode, useEffect, useState } from "react";
import { useService } from "@/context/ServiceContext";

type TagProps = {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
};

const QRTypeTag = ({ children, active, onClick }: TagProps) => {
  return (
    <Box
      _hover={{
        shadow: "base",
      }}
      bg={active ? "gray.100" : "white"}
      shadow={active ? "base" : ""}
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={"gray.200"}
      borderRadius={"xl"}
      cursor={"pointer"}
      px={4}
      py={3}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

export const QrCodeConfigure = ({
  qrType,
  handleQrData,
  qrData,
  admin = false,
  styles = false,
  action,
}: {
  qrType: string;
  handleQrData: (data: any) => void;
  qrData: QROptions;
  admin?: boolean;
  styles?: boolean;
  action?: ReactNode;
}) => {
  const { getAllQRstyles } = useService();
  const [styleData, setStyleData] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getAllQRstyles();
      setStyleData(data);
    }
    if (admin) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleChange = (e: any) => {
  //   const { value } = e.target;
  //   if (value === "") return;
  //   const selectedStyle = styleData.find((style) => style.name === value);
  //   handleQrData(Object.assign({}, {...qrData}, selectedStyle?.style));
  // };



  return (
    <Stack
      spacing={{ base: 8, md: 10 }}
      py={{ base: 4, md: 6 }}
      direction={{ base: "column", md: "row" }}
    >
      <Box flex="4">
        <Box
          p={5}
          borderWidth="1px"
          borderColor={"gray.200"}
          borderRadius={"xl"}
          mt={4}
        >
          <VStack gap={4}>
            <TypeComponent
              type={qrType}
              handleQrData={handleQrData}
              formData={qrData}
              admin={admin}
              styles={styles}
              name={qrData.name}
            />
            <Divider />
            {/* {(!styles && admin ) && (
              <>
                <Select onChange={handleChange} value={selectedStyle?.name}>
                  <option value={""}>{"Select Style"}</option>
                  {styleData.map((style) => (
                    <option key={style?.docId} value={style?.name}>
                      {style?.name}
                    </option>
                  ))}
                </Select>
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  fontSize={"20px"}
                  fontWeight={500}
                >
                  OR
                </Flex>
                <Divider />
              </>
            )} */}
            <QRStyles handleQrData={handleQrData} qrData={qrData.qrData} />
          </VStack>
          {action && action}
        </Box>
      </Box>
      <Box flex="3" mt={4} position={"sticky"} top={20}>
        <RenderQR qrData={qrData.qrData} />
      </Box>
    </Stack>
  );
};

export function QrCodesTypes({
  qrType,
  handleSelectedType,
}: {
  qrType: string;
  handleSelectedType: (type: string) => void;
}) {
  return (
    <HStack flexWrap={"wrap"} spacing={4} alignItems={"center"}>
      {QRCodes.map((qr) => (
        <QRTypeTag
          key={qr.label}
          active={qr.value === qrType}
          onClick={() => handleSelectedType(qr.value)}
        >
          <Text
            display={"flex"}
            gap={3}
            fontSize={"lg"}
            fontWeight={"semibold"}
          >
            {qr.icon} {qr.label}
          </Text>
        </QRTypeTag>
      ))}
    </HStack>
  );
}
