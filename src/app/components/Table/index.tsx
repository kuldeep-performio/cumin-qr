"use client";
import React, { useState } from "react";
import {
  Flex,
  Table as ChakraTable,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Input,
  IconButton,
  Select,
  Skeleton,
  Box,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { FiMoreVertical } from "react-icons/fi";

type TableRow = {
  id: number | string;
};

type Props<TData> = {
  data: TData[];
  columns: {
    header: string;
    accessor: string;
    primary?: boolean;
  }[];
  editAction?: (row: TData) => void;
  deleteAction?: (linkId : string) => void;
  primaryAction?: (row : TData) => void;
  tertiaryAction?: (row : TData) => void;
  backgroundColor?: string;
};

function Table<TData extends TableRow>({
  data,
  columns,
  editAction,
  deleteAction,
  primaryAction,
  tertiaryAction,
  backgroundColor = "gray.50",
}: Props<TData>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [isLoading, setIsLoading] = useState(false);

  const filteredData = data.filter((row: TData) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <Flex
      backgroundColor={backgroundColor}
      direction="column"
      alignItems="center"
      mt={4}
    >
      <Flex w="100%" justifyContent="flex-end">
        <InputGroup backgroundColor={backgroundColor}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            backgroundColor="white"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            mb={4}
            w="300px"
          />
        </InputGroup>
      </Flex>
      <Box
        w="100%"
        overflow={"auto"}
        borderWidth="1px"
        borderRadius="lg"
        borderColor={"gray.200"}
      >
        <ChakraTable backgroundColor="white" variant="simple">
          <Thead>
            <Tr>
              {columns.map((key) => (
                <Th key={key.accessor}>{key.header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {currentData.length === 0 ? (
              <Tr>
                <Td
                  colSpan={Object.keys(data.length > 0 && data[0]).length}
                  textAlign="center"
                >
                  No data found
                </Td>
              </Tr>
            ) : (
              currentData.map((row) => (
                <Tr key={row.id} _hover={{ backgroundColor: "red.50" }}>
                  {columns.map((value, index) => {
                    if (value.primary) {
                      return (
                        <Td key={index}>
                          <Text
                            color="blue.500"
                            cursor="pointer"
                            fontSize={"medium"}
                            fontWeight={"medium"}
                            textDecoration={"underline"}
                            onClick={() => primaryAction?.(row)}
                          >
                            {row[value.accessor as keyof TableRow]}
                          </Text>
                        </Td>
                      );
                    } else if (value.accessor === "actions") {
                      return (
                        <Td key={index}>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              colorScheme={"gray"}
                              icon={<FiMoreVertical />}
                              variant="outline"
                            />
                            <MenuList>
                              <MenuItem onClick={() => editAction?.(row)}>Edit</MenuItem>
                              <MenuItem onClick={() =>  deleteAction?.(row.docId)}>Delete</MenuItem>
                              <MenuItem onClick={() => tertiaryAction?.(row)}>Statistics</MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      );
                    }
                    return (
                      <Td key={index}>
                        {row[value.accessor as keyof TableRow]}
                      </Td>
                    );
                  })}
                </Tr>
              ))
            )}
            {isLoading &&
              Array.from({ length: itemsPerPage - currentData.length }).map(
                (arr, index) => (
                  <Tr key={`skeleton-${index}`}>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                  </Tr>
                )
              )}
          </Tbody>
        </ChakraTable>
      </Box>
      <Flex width={'100%'} mt={4} alignItems="center" flexWrap={'wrap'} justifyContent={"flex-end"} gap={"8px"}>
        <Flex>
          <Text  w={24}>
            {`Page ${currentPage} of ${totalPages}`}
          </Text>
        </Flex>
        <Select
          backgroundColor="white"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          maxW={'20%'}
        >
          {[50, 100, 200, 500].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <IconButton
          aria-label="Previous page"
          isDisabled={isLoading || currentPage === 1}
          icon={<ChevronLeftIcon />}
          onClick={() => goToPage(currentPage - 1)}
        />
        <IconButton
          aria-label="Next page"
          isDisabled={
            isLoading ||
            currentPage === totalPages ||
            endIndex >= filteredData.length
          }
          icon={<ChevronRightIcon />}
          onClick={() => goToPage(currentPage + 1)}
          
        />
        <Flex>
          <Text ml={4} w={32}>
            {`Total records : ${filteredData.length}`}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Table;
