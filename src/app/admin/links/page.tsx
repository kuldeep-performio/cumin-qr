"use client";

import Table from "@/app/components/Table";
import { useEffect, useState } from "react";
import { useService } from "@/context/ServiceContext";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import ToolBar from "@/app/components/ToolBar";
import Flyout from "@/app/components/Flyout";
import AddEditLink from "./AddEditLink";
import { useRouter } from "next/navigation";

export type ListProps = {
  id: string;
  name: string;
  destinationUrl: string;
  alias: string;
  docId: string;
  views: number;

};

export default function Links() {
  const { getAllLinks, createNewLink, deleteLink, editLink } = useService();
  const [selectedLink, setSelectedLink] = useState<ListProps | null>(null);
  const [formData, setFormData] = useState<ListProps | null>(null);
  const router = useRouter()

  const columns = [
    {
      header: "Name",
      accessor: "name",
      primary: true,
    },
    {
      header: "Alias",
      accessor: "alias",
    },
    {
      header: "Destination URL",
      accessor: "destinationUrl",
    },
    {
      header: "Views",
      accessor: "views",
    },
    {
      header: "Created At",
      accessor: "createdAt",
    },
    // {
    //   header: "Updated At",
    //   accessor: "updatedAt",
    // },
    {
      header: "Actions",
      accessor: "actions",
    },
  ];

  const [data, setData] = useState<ListProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllLinks();
      setData(data);
    }
    fetchData();
  }, [getAllLinks]);

  const handleAddLink = async () => {
    try {
      await createNewLink(formData as ListProps);
      const data = await getAllLinks();
      setData(data);
    } catch (error: any) {
      console.error("Error making POST request:", error.message);
    }
  };

  const handleEditLink = async () => {
    try {
      await editLink(selectedLink?.docId, formData as ListProps); 
      const data = await getAllLinks();
      setData(data);
    } catch (error: any) {
      console.error("Error making PUT request:", error.message);
    }
  }

  const deleteLinkData = async (id: string) => {
    try {
      await deleteLink(id);
      const data = await getAllLinks();
      setData(data);
    } catch (error: any) {
      console.error("Error making DELETE request:", error.message);
    }
  };

  const isNew = selectedLink && Object.keys(selectedLink)?.length === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNew) {
      handleAddLink();
    } else {
      handleEditLink();
    }
    setSelectedLink(null);
    setFormData(null);
  };

  const handleCancel = () => {
    setSelectedLink(null);
  };

  return (
    <Box backgroundColor="gray.50">
      <ToolBar
        handleClick={() => setSelectedLink({} as ListProps)}
        title={"Links"}
        subTitle={
          "Effortlessly customize your links for any platform or audience."
        }
        addButtonTitle={"Add new link"}
      />
      <Box py={4} px={6}>
        <Table<ListProps>
          data={data && data}
          columns={columns}
          deleteAction={deleteLinkData}
          primaryAction={(row) => router.push(`/admin/link-stats/${row.docId}`)}
          tertiaryAction={(row) => router.push(`/admin/link-stats/${row.docId}`)}
          editAction={(row) => {
            setSelectedLink(row);
            setFormData(row);
          }}
        />
      </Box>
      <Flyout
        title={!isNew ? "Edit Link" : "Create Link"}
        isOpen={!!selectedLink}
        onClose={() => setSelectedLink(null)}
        footerChildren={
          <ButtonGroup gap="4">
            <Button
              colorScheme="red"
              variant={"outline"}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleSubmit}>
              {!isNew ? "Update" : "Create"}
            </Button>
          </ButtonGroup>
        }
      >
        <AddEditLink
          selectedLink={selectedLink}
          setFormData={setFormData}
          formData={formData}
        />
      </Flyout>
    </Box>
  );
}
