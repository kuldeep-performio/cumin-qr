"use client";

import { LineChart } from "@/app/components/Charts/LineChart";
import Table from "@/app/components/Table";
import { SimpleToolbar } from "@/app/components/ToolBar";
import { useService } from "@/context/ServiceContext";
import { timeSince } from "@/utils/datetime";
import {
  Box,
  Flex,
  HStack,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { BsEyeglasses, BsFillPeopleFill } from "react-icons/bs";
import { FaMapMarkedAlt } from "react-icons/fa";

type ListProps = {
  id: string;
  browser: string;
  os: string;
  currentTime: string;
  country: string;
  city: string;
  state: string;
  device: string;
  language: string;
};

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}

type LinkProps = {
  id: string;
  name: string;
  destinationUrl: string;
  alias: string;
  docId: string;
  views: number;
  stats: any[];
};

interface DataItem {
  id: number;
  country: string;
  os: string;
}

const calculateCountAndPercentage = (
  dataArray: DataItem[],
  property: string,
  totalCount: number
) => {
  const counts = dataArray.reduce((countMap, item) => {
    const key = item[property];
    countMap[key] = (countMap[key] || 0) + 1;
    return countMap;
  }, {});

  const dataWithPercentage = Object.entries(counts).map(([key, count]) => ({
    [property]: key,
    count,
    percentage: (count / totalCount) * 100,
  }));

  return dataWithPercentage;
};

const DashCard = ({
  children,
  ...props
}: { children: ReactNode } & StatProps) => {
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"8"}
      shadow={"md"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.400", "gray.500")}
      rounded={"lg"}
      backgroundColor="white"
      {...props}
    >
      {children}
    </Stat>
  );
};

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <DashCard>
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontSize={"xl"} fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber mt={"4"} fontSize={"4xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </DashCard>
  );
}

export default function LinkStats() {
  const pathname = usePathname();
  const { getLinkById } = useService();
  const [linkData, setLinkData] = useState<LinkProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      if (pathname) {
        const link_data = await getLinkById(pathname.split("/")[3]);
        const modifiedData = link_data.data();
        setLinkData(modifiedData);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const columns = [
    {
      header: "Browser",
      accessor: "browser",
    },
    {
      header: "OS",
      accessor: "os",
    },
    {
      header: "Country",
      accessor: "country",
    },
    {
      header: "City",
      accessor: "city",
    },
    {
      header: "State",
      accessor: "state",
    },
    {
      header: "Device",
      accessor: "device",
    },
    {
      header: "Language",
      accessor: "language",
    },
    {
      header: "Time",
      accessor: "currentTime",
    },
  ];

  const dates: string[] = [];

  for (let i = 6; i >= 0; i--) {
    const currentDate: Date = new Date();
    currentDate.setDate(currentDate.getDate() - i);
    dates.push(currentDate.toISOString().split("T")[0]);
  }

  const unique = (arr: any[] | undefined, props: string[]) => [
    ...new Map(
      arr && arr.map((entry) => [props.map((k) => entry[k]).join("|"), entry])
    ).values(),
  ];

  const mergedLogs1 = dates.map((date) => {
    const matchingLogs =
      linkData &&
      linkData.stats.filter((log) => log.currentTime?.split("T")[0] === date);
    const matchingUsers = unique(linkData?.stats, ["device", "ip"]);
    return { date, logs: matchingLogs, users: matchingUsers };
  });

  const countryData = calculateCountAndPercentage(
    (linkData && linkData?.stats) || [],
    "country",
    linkData?.views || 0
  );

  const deviceData = calculateCountAndPercentage(
    (linkData && linkData?.stats) || [],
    "device",
    linkData?.views || 0
  );

  const browserData = calculateCountAndPercentage(
    (linkData && linkData?.stats) || [],
    "browser",
    linkData?.views || 0
  );

  const languageData = calculateCountAndPercentage(
    (linkData && linkData?.stats) || [],
    "language",
    linkData?.views || 0
  );

  const osData = calculateCountAndPercentage(
    (linkData && linkData?.stats) || [],
    "os",
    linkData?.views || 0
  );

  const distinctCountries = [
    ...new Set(linkData?.stats.map((item) => item.country)),
  ];

  const distinctUsers: any[] = unique(linkData?.stats, ["device", "ip"]);

  const viewsData = mergedLogs1.map((log) => log?.logs?.length);
  const uniqueFields = unique(linkData?.stats, ["device", "ip"]);

  const dateCounts = {};

  for (let i = 0; i < dates.length; i++) {
    for (let j = 0; j < uniqueFields.length; j++) {
      if (dates[i] === uniqueFields[j].currentTime.split("T")[0]) {
        dateCounts[dates[i]] = +1;
      } else {
        dateCounts[dates[i]] = 0;
      }
    }
  }

  const listData = linkData?.stats
    .sort((a, b) => new Date(b.currentTime) - new Date(a.currentTime))
    .map((item: any) => {
      return {
        ...item,
        currentTime: timeSince(item.currentTime),
      };
    });

  return (
    <>
      <SimpleToolbar
        title={linkData?.name || ""}
        subTitle={`https://cuminqr.com/${linkData?.alias || ""} -> ${
          linkData?.destinationUrl
        }`}
        pageTile={"Link Statistics"}
        backHandle={() => router.back()}
      />
      {linkData?.views ? (
        <Box p={12} backgroundColor="gray.50">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <StatsCard
              title={"Total views"}
              stat={linkData?.views.toString() || "0"}
              icon={
                <BsEyeglasses color="rgba(255, 99, 132, 0.5)" size={"3em"} />
              }
            />
            <StatsCard
              title={"No. of users"}
              stat={distinctUsers.length.toString() || "0"}
              icon={
                <BsFillPeopleFill
                  color="rgba(53, 162, 235, 0.5)"
                  size={"3em"}
                />
              }
            />
            <StatsCard
              title={"Country wide views"}
              stat={distinctCountries.length.toString() || "0"}
              icon={
                <FaMapMarkedAlt color="rgba(255, 99, 132, 0.5)" size={"3em"} />
              }
            />
          </SimpleGrid>
          <DashCard mt={8} minHeight={{ xs: "200px" }}>
            <LineChart
              data={[Object.values(dateCounts), viewsData]}
              labels={dates}
            />
          </DashCard>
          <Flex justifyContent="flex-start" mt={8} gap={8} flexWrap={"wrap"}>
            <Box width={"48%"} flexGrow={1}>
              <DashCard px={6} py={4}>
                <>
                  <Text mb={6} fontSize={18} fontWeight={600}>
                    Countries
                  </Text>
                  {countryData.map((item, index) => (
                    <Fragment key={item.country + new Date().toISOString()}>
                      <HStack  justifyContent={"space-between"}>
                        <Text fontSize={16} fontWeight={600}>
                          <>{item.country || "Other"}</>
                        </Text>
                        <Flex gap={4}>
                          <Text
                            fontSize={14}
                            fontWeight={500}
                            color={"gray.600"}
                          >
                            {item.percentage.toFixed(2)}%
                          </Text>
                          <Text fontSize={16} fontWeight={600}>
                            <> {item.count || 0}</>
                          </Text>
                        </Flex>
                      </HStack>
                      <Progress
                        borderRadius={"20px"}
                        my={2}
                        value={item.percentage}
                        size="sm"
                        colorScheme={index % 2 === 0 ? "red" : "blue"}
                      />
                    </Fragment>
                  ))}
                </>
              </DashCard>
            </Box>
            <Box width={"48%"} flexGrow={1}>
              <DashCard px={6} py={4}>
                <>
                  <Text mb={6} fontSize={18} fontWeight={600}>
                    Devices
                  </Text>
                  {deviceData.map((item, index) => (
                    <Fragment key={item.device + new Date().toISOString()}>
                      <HStack justifyContent={"space-between"}>
                        <Text fontSize={16} fontWeight={600}>
                          <>{item.device || "Other"}</>
                        </Text>
                        <Flex gap={4}>
                          <Text
                            fontSize={14}
                            fontWeight={500}
                            color={"gray.600"}
                          >
                            {item.percentage.toFixed(2)}%
                          </Text>
                          <Text fontSize={16} fontWeight={600}>
                            <> {item.count || 0}</>
                          </Text>
                        </Flex>
                      </HStack>
                      <Progress
                        borderRadius={"20px"}
                        my={2}
                        value={item.percentage}
                        size="sm"
                        colorScheme={index % 2 === 0 ? "red" : "blue"}
                      />
                    </Fragment>
                  ))}
                </>
              </DashCard>
            </Box>
            <Box width={"48%"} flexGrow={1}>
              <DashCard px={6} py={4}>
                <>
                  <Text mb={6} fontSize={18} fontWeight={600}>
                    Languages
                  </Text>
                  {languageData.map((item, index) => (
                    <Fragment key={item.language + new Date().toISOString()}>
                      <HStack justifyContent={"space-between"}>
                        <Text fontSize={16} fontWeight={600}>
                          <>{item.language || "Other"}</>
                        </Text>
                        <Flex gap={4}>
                          <Text
                            fontSize={14}
                            fontWeight={500}
                            color={"gray.600"}
                          >
                            {item.percentage.toFixed(2)}%
                          </Text>
                          <Text fontSize={16} fontWeight={600}>
                            <> {item.count || 0}</>
                          </Text>
                        </Flex>
                      </HStack>
                      <Progress
                        borderRadius={"20px"}
                        my={2}
                        value={item.percentage}
                        size="sm"
                        colorScheme={index % 2 === 0 ? "red" : "blue"}
                      />
                    </Fragment>
                  ))}
                </>
              </DashCard>
            </Box>
            <Box width={"48%"} flexGrow={1}>
              <DashCard px={6} py={4}>
                <>
                  <Text mb={6} fontSize={18} fontWeight={600}>
                    Browser
                  </Text>
                  {browserData.map((item, index) => (
                    <Fragment key={item.browser + new Date().toISOString()}>
                      <HStack justifyContent={"space-between"}>
                        <Text fontSize={16} fontWeight={600}>
                          <>{item.browser || "Other"}</>
                        </Text>
                        <Flex gap={4}>
                          <Text
                            fontSize={14}
                            fontWeight={500}
                            color={"gray.600"}
                          >
                            {item.percentage.toFixed(2)}%
                          </Text>
                          <Text fontSize={16} fontWeight={600}>
                            <> {item.count || 0}</>
                          </Text>
                        </Flex>
                      </HStack>
                      <Progress
                        borderRadius={"20px"}
                        my={2}
                        value={item.percentage}
                        size="sm"
                        colorScheme={index % 2 === 0 ? "red" : "blue"}
                      />
                    </Fragment>
                  ))}
                </>
              </DashCard>
            </Box>
            <Box width={"48%"} flexGrow={1}>
              <DashCard px={6} py={4}>
                <>
                  <Text mb={6} fontSize={18} fontWeight={600}>
                    Operating System
                  </Text>
                  {osData.map((item, index) => (
                    <Fragment key={item.os + new Date().toISOString()}>
                      <HStack justifyContent={"space-between"}>
                        <Text fontSize={16} fontWeight={600}>
                          <>{item.os || "Other"}</>
                        </Text>
                        <Flex gap={4}>
                          <Text
                            fontSize={14}
                            fontWeight={500}
                            color={"gray.600"}
                          >
                            {item.percentage.toFixed(2)}%
                          </Text>
                          <Text fontSize={16} fontWeight={600}>
                            <> {item.count || 0}</>
                          </Text>
                        </Flex>
                      </HStack>
                      <Progress
                        borderRadius={"20px"}
                        my={2}
                        value={item.percentage}
                        size="sm"
                        colorScheme={index % 2 === 0 ? "red" : "blue"}
                      />
                    </Fragment>
                  ))}
                </>
              </DashCard>
            </Box>
            <Box width={"48%"} flexGrow={1}></Box>
          </Flex>
          <DashCard mt={8}>
            <Table<ListProps>
              data={listData || []}
              columns={columns}
              backgroundColor="white"
            />
          </DashCard>
        </Box>
      ) : (
        <Box p={12} backgroundColor="gray.50">
          No stats for now
        </Box>
      )}
    </>
  );
}
