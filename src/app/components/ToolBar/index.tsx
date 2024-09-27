import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

type Props = {
  handleClick: () => void;
  title: string;
  subTitle: string;
  addButtonTitle: string;
};

type SimpleToolbarProps = {
  backHandle: () => void;
  title: string;
  subTitle: string;
  pageTile: string;
};

export function SimpleToolbar({
  backHandle,
  title,
  subTitle,
  pageTile,
}: SimpleToolbarProps) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={4}
      px={6}
      borderBottom="1px solid"
      borderColor="gray.300"
      backgroundColor="gray.50"
    >
      <VStack gap={"2xs"} alignItems={"flex-start"}>
        <Flex cursor={"pointer"} onClick={backHandle}>
          <ChevronLeftIcon fontSize={24} />
          <Heading size="md">{title}</Heading>
        </Flex>
        <Text ml={6} fontSize="md">
          {subTitle}
        </Text>
      </VStack>
      <Heading size="md">{pageTile}</Heading>
    </Box>
  );
}

export default function ToolBar({
  handleClick,
  title,
  subTitle,
  addButtonTitle,
}: Props) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={4}
      px={6}
      borderBottom="1px solid"
      borderColor="gray.300"
      backgroundColor="gray.50"
    >
      <VStack gap={"2xs"} alignItems={"flex-start"}>
        <Text fontSize="sm">{subTitle}</Text>
        <Heading size="md">{title}</Heading>
      </VStack>
      <Button colorScheme="green" onClick={handleClick}>
        {addButtonTitle}
      </Button>
    </Box>
  );
}
