"use client";

import {
  QrCodeConfigure,
  QrCodesTypes,
} from "@/app/components/Banner/QRGenerate";
import Table from "@/app/components/Table";
import ToolBar, { SimpleToolbar } from "@/app/components/ToolBar";
import { useService } from "@/context/ServiceContext";
import { defaultQrData } from "@/data/common";
import { QRConfigData } from "@/types/qrTypes";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export type ListProps = {
  id: string;
  name: string;
  docId: string;
  createdAt: string;
  updatedAt: string;
  style: QRConfigData;
} & QRConfigData;

const columns = [
  {
    header: "Name",
    accessor: "name",
    primary: true,
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

export default function QrStyles() {
  const defaultStyleData = {...defaultQrData, value : 'default'}
  const { getAllQRstyles, editQrStyle, deleteQrStyle, createNewQRStyle } =
    useService();
  const [data, setData] = useState<ListProps[]>([]);
  const [addNewStyle, setAddNewStyle] = useState<boolean>(false);
  const [qrStyleData, setQrStyleData] = useState<QRConfigData>(
    defaultStyleData as QRConfigData
  );
  const [selectedQrStyle, setSelectedQrStyle] = useState<ListProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const data = await getAllQRstyles();
      setData(data);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteQrStyleData = async (id: string) => {
    try {
      await deleteQrStyle(id);
      const data = await getAllQRstyles();
      setData(data);
    } catch (error: any) {
      console.error("Error making DELETE request:", error.message);
    }
  };

  const handleQrData = (data: QRConfigData) => {
    setQrStyleData({ ...qrStyleData, ...data });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!qrStyleData.name)
      return alert("Please fill all the fields");
    try {
      if (selectedQrStyle) {
        await editQrStyle(selectedQrStyle.docId, {
          name: qrStyleData.name,
          style: qrStyleData,
        });
      } else {
        await createNewQRStyle({
          name: qrStyleData.name,
          style: qrStyleData,
        });
      }

      const data = await getAllQRstyles();
      setData(data);
      setAddNewStyle(false);
      setQrStyleData(defaultStyleData as QRConfigData);
    } catch (error: any) {
      console.error("Error making POST request:", error.message);
    }
  };

  const handleCancel = () => {
    setQrStyleData(defaultStyleData as QRConfigData);
    setSelectedQrStyle(null);
    setAddNewStyle(!addNewStyle);
  };

  const handlePrimaryAction = (row: ListProps) => {
    console.log(row)
  };

  return (
    <>
      {addNewStyle ? (
        <>
          <SimpleToolbar
            title={"Create New QR  styles"}
            subTitle={`somthing ill change it later`}
            pageTile={"Create qr styles"}
            backHandle={handleCancel}
          />
          <Box py={12} px={8}>
            <QrCodeConfigure
              qrType={'text'}
              handleQrData={handleQrData}
              qrData={qrStyleData}
              admin={true}
              styles
              action={
                <Flex justifyContent={"space-between"} mt={4}>
                  <Button
                    flex={1}
                    mr={4}
                    variant={"outline"}
                    colorScheme="gray"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    flex={1}
                    onClick={handleSubmit}
                    className="btn btn-primary"
                    type="submit"
                    isDisabled={!qrStyleData.name || !qrStyleData.value}
                  >
                    {selectedQrStyle ? "Update" : "Create"}
                  </Button>
                </Flex>
              }
            />
          </Box>
        </>
      ) : (
        <Box backgroundColor="gray.50">
          <ToolBar
            handleClick={() => setAddNewStyle(!addNewStyle)}
            title={"QR styles"}
            subTitle={
              "Effortlessly customize your qr styles for any platform or audience."
            }
            addButtonTitle={"Add new QR style"}
          />
          <Box py={4} px={6}>
            <Table<ListProps>
              data={data && data}
              columns={columns}
              deleteAction={deleteQrStyleData}
              primaryAction={(row) => handlePrimaryAction(row)}
              tertiaryAction={(row) => handlePrimaryAction(row)}
              editAction={(row) => {
                setSelectedQrStyle(row);
                setQrStyleData(row.style);
                setAddNewStyle(!addNewStyle);
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
