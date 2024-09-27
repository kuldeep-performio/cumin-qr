import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  size?: string;
  hasCloseButton?: boolean;
  children: React.ReactNode;
  footerChildren?: React.ReactNode;
  title?: string;
  description?: string;
};

export default function Flyout({
  onClose,
  isOpen,
  size = "md",
  hasCloseButton = true,
  children,
  footerChildren,
  title,
  description,
}: Props) {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={{ base : 'md', xs : 'full' }}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Flex justifyContent="space-between" alignItems="center">
            <VStack color={"gray.600"} gap={"2xs"} alignItems={"flex-start"}>
              <Heading size="md">{title}</Heading>
              {description && <Text fontSize="sm">{description}</Text>}
            </VStack>
            {hasCloseButton && <DrawerCloseButton  />}
          </Flex>
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        {footerChildren && (
          <DrawerFooter borderTopWidth="1px">{footerChildren}</DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
