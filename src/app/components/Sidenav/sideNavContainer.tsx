import { ReactNode, ReactElement } from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";

export interface SidenavContainerProps {
  children: ReactNode;
  sidenav: ReactElement;
}

export function SidenavContainer({ children, sidenav }: SidenavContainerProps) {
  return (
    <Grid templateAreas={`'sidebar main'`} templateColumns="auto 1fr">

      <GridItem area="sidebar" as="aside" w="full" p={0}>
        <Box
          pos="sticky"
          top={0}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
          w={{ base: 0, md: "200px" }}
          borderRight="1px solid"
          borderColor="gray.100"
          backgroundColor={"#3B3B3B"}
          p={{ base: 0, md: 2 }}
          paddingTop={8}
          height="100vh"
          overflow="auto"
          css={{
           
            "&::-webkit-scrollbar": {
              height: "var(--chakra-sizes-1)",
              width: "var(--chakra-sizes-1)"
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "var(--chakra-colors-gray-400)"
            }
          }}
        >
          {sidenav}
        </Box>
      </GridItem>
      <GridItem as="main" area="main" overflow={'auto'}>
        {children}
      </GridItem>
    </Grid>
  );
}

export default SidenavContainer;
