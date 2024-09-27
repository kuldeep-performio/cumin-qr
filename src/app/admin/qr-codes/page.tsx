"use client";

import {
  QrCodeConfigure,
  QrCodesTypes,
} from "@/app/components/Banner/QRGenerate";
import Table from "@/app/components/Table";
import ToolBar, { SimpleToolbar } from "@/app/components/ToolBar";
import { useService } from "@/context/ServiceContext";
import { defaultQRDataAdmin, defaultQrData } from "@/data/common";
import { QRConfigData, QRConfigDataAdmin, QROptions } from "@/types/qrTypes";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export type ListProps = {
  id: string;
  name: string;
  docId: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  type: string;
  value: string;
  dynamic: boolean;
  qrData: QRConfigData;
} & QRConfigDataAdmin;



const columns = [
  {
    header: "Name",
    accessor: "name",
    primary: true,
  },
  {
    header: "Views",
    accessor: "views",
  },
  {
    header: "Created At",
    accessor: "createdAt",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

export default function QrCodes() {
  const { getAllQRcodes, editQrCode, deleteQrCode, createNewQRCode } =
    useService();
  const [data, setData] = useState<ListProps[]>([]); // table data 
  const [addEditQr, setAddEditQr] = useState<boolean>(false); // to show qr config page
  const [selectedQrType, setSelectedQrType] = useState<string>("text"); // selected qr type
  const [qrData, setQrData] = useState<QROptions>(
    {
      name  : "",
      dynamic: false,
      qrData: defaultQrData as QRConfigData,
    }
  );
  const [selectedQrCode, setSelectedQrCode] = useState<ListProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const data = await getAllQRcodes();
      setData(data);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteQrCodeData = async (id: string) => {
    try {
      await deleteQrCode(id);
      const data = await getAllQRcodes();
      setData(data);
    } catch (error: any) {
      console.error("Error making DELETE request:", error.message);
    }
  };

  const handleSelectType = (type: string) => {
    setSelectedQrType(type);
    // setQrData(defaultQrData as QRConfigData);
  };

  const handleQrData = (data: QRConfigData) => {
    setQrData({ ...qrData, ...data });
  };
  
  console.log('qrData: ', qrData);
  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (!qrData.name || !qrData.value)
  //     return alert("Please fill all the fields");
  //   try {
  //     if (selectedQrCode) {
  //       await editQrCode(selectedQrCode.docId, {
  //         name: qrData.name,
  //         value: qrData.value,
  //         type: selectedQrType,
  //         dynamic: qrData.dynamic,
  //         qrData: qrData,
  //       });
  //     } else {
  //       await createNewQRCode({
  //         name: qrData.name,
  //         value: qrData.value,
  //         type: selectedQrType,
  //         dynamic: qrData.dynamic,
  //         qrData: qrData,
  //       });
  //     }

  //     const data = await getAllQRcodes();
  //     setData(data);
  //     setAddEditQr(false);
  //     setQrData(defaultQrData as QRConfigData);
  //     setSelectedQrType("text");
  //   } catch (error: any) {
  //     console.error("Error making POST request:", error.message);
  //   }
  // };

  // const handleCancel = () => {
  //   setSelectedQrType("text");
  //   setQrData(defaultQrData as QRConfigData);
  //   setSelectedQrCode(null);
  //   setAddEditQr(!addEditQr);
  // };

  // const handlePrimaryAction = (row: ListProps) => {
  //   if (!row.dynamic) {
  //     alert("Dynamic QR code can't be opened");
  //   } else {
  //     const { linkDocId } = row.qrData;
  //     if (linkDocId) {
  //       router.push(`/admin/link-stats/${row.qrData.linkDocId}`);
  //     }
  //   }
  // };

  return (
    <>
      {addEditQr ? (
        <>
          <SimpleToolbar
            title={"Create New QR code"}
            subTitle={`somthing ill change it later`}
            pageTile={"Link Statistics"}
            backHandle={() => setAddEditQr(!addEditQr)}
          />
          <Box py={12} px={8}>
            <QrCodesTypes
              qrType={selectedQrType}
              handleSelectedType={handleSelectType}
            />
            <QrCodeConfigure
              qrType={selectedQrType}
              handleQrData={(data) => handleQrData(data)}
              qrData={qrData}
              admin={true}
              action={
                <Flex justifyContent={"space-between"} mt={4}>
                  <Button
                    flex={1}
                    mr={4}
                    variant={"outline"}
                    colorScheme="gray"
                    // onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    flex={1}
                    // onClick={handleSubmit}
                    className="btn btn-primary"
                    type="submit"
                    isDisabled={!qrData.name || !qrData.qrData.value}
                  >
                    {selectedQrCode ? "Update" : "Create"}
                  </Button>
                </Flex>
              }
            />
          </Box>
        </>
      ) : (
        <Box backgroundColor="gray.50">
          <ToolBar
            handleClick={() => setAddEditQr(!addEditQr)}
            title={"QR codes"}
            subTitle={
              "Effortlessly customize your qr for any platform or audience."
            }
            addButtonTitle={"Add new QR code"}
          />
          <Box py={4} px={6}>
            <Table<ListProps>
              data={data && data}
              columns={columns}
              deleteAction={deleteQrCodeData}
              // primaryAction={(row) => handlePrimaryAction(row)}
              // tertiaryAction={(row) => handlePrimaryAction(row)}
              editAction={(row) => {
                setSelectedQrCode(row);
                setSelectedQrType(row.type);
                setQrData(row.qrData);
                setAddEditQr(!addEditQr);
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
