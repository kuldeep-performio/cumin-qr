import { List, ListItem, Icon, Flex, Text, Box } from "@chakra-ui/react";
import Link from "next/link";
import { IconType } from "react-icons";

export interface SidenavItem {
  icon: IconType;
  label: string;
  to: string;
  active: string[];
}

export interface SidenavItemsProps {
  navItems: SidenavItem[];
  mode?: "semi" | "over";
  activePath?: string;
  onClose?: () => void;
}

export function SidenavItems({
  navItems,
  mode = "semi",
  activePath = "/admin/dashboard",
  onClose,
}: SidenavItemsProps) {
  const sidebarItemInOverMode = (item: SidenavItem, index: number) => (
    <ListItem key={index}>
      <Link href={item.to} onClick={() => onClose && onClose()}>
        <Flex
          alignItems="center"
          py={3}
          px={4}
          borderRadius="lg"
          _hover={{ color: "#5CB75C" }}
          color={
            item.active.includes(activePath.split("/")[2]) ? "#5CB75C" : "gray.800"
          }
          bg={
            item.active.includes(activePath.split("/")[2])
              ? "#BABABA28"
              : "transparent"
          }
        >
          <Icon boxSize="5" as={item.icon} />
          <Text ml={2}>{item.label}</Text>
        </Flex>
      </Link>
    </ListItem>
  );
  const sidebarItemInSemiMode = (
    { icon, active, ...item }: SidenavItem,
    index: number
  ) => (
    <ListItem key={index}>
      {/* <Tooltip label={item.label} placement="right"> */}
      <Link
        href={item.to}
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Box
          key={index}
          display={"flex"}
          gap={2}
          py={2}
          px={4}
          minHeight={"44px"}
          alignItems={"center"}
          _hover={{ color: "#5CB75C" }}
          color={
            active.includes(activePath.split("/")[2]) ? "#5CB75C" : "white"
          }
          aria-label={item.label}
          borderRadius="lg"
          bg={
            active.includes(activePath.split("/")[2])
              ? "#BABABA28"
              : "transparent"
          }
        >
          <Icon as={icon} fontSize={22} />
          <Text
            fontSize="md"
            fontWeight={500}
            textDecoration={"none"}
            textAlign="center"
          >
            {item.label}
          </Text>
        </Box>
      </Link>
      {/* </Tooltip> */}
    </ListItem>
  );
  return (
    <List spacing={3} width={"100%"}>
      {mode === "semi"
        ? navItems.map((item, index) => sidebarItemInSemiMode(item, index))
        : navItems.map((item, index) => sidebarItemInOverMode(item, index))}
    </List>
  );
}

export default SidenavItems;
