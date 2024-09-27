import {
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { QRVariant } from "@/types/QRVariant";
import { ChangeEvent, useEffect, useState } from "react";
import { useService } from "@/context/ServiceContext";
import { ListProps } from "@/app/admin/links/page";
import Link from "next/link";

export default function QRUrl({
  value,
  setValue,
  admin,
}: QRVariant & { admin?: boolean }) {
  const [formData, setFormData] = useState({ value : '' });
  const [dynamicQr, setDynamicQr] = useState<boolean>(false);
  const { getAllLinks } = useService();
  const [data, setData] = useState<ListProps[] | []>([]);
  const [selectedLink, setSelectedLink] = useState<ListProps>(data[0]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllLinks();

      setData(data);
      if (value.value && value.dynamic) {
        const link = data.find((link: any) => link.docId === value.linkDocId);
        if (link) {
          setSelectedLink(link);
        }
      } else {
        if (data.length > 0) {
          setSelectedLink(data[0]);
        } else {
          setSelectedLink({} as ListProps);
        }
      }
    }
    setDynamicQr(value.dynamic || false);
    if (admin) fetchData();

    setFormData(Object.assign({}, { value : '' }, value.formData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = data.find((link) => link.name === e.target.value);

    if (selected) {
      setSelectedLink(selected);
      setValue({
        value: `https://www.cuminqr.com/${selected.alias}`,
        linkDocId: selected.docId,
      });
    }
  };

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setDynamicQr(e.target.checked);
    if (checked) {
      setValue({
        value: `https://www.cuminqr.com/${selectedLink.alias}`,
        dynamic: true,
        linkDocId: selectedLink.docId,
      });
    } else {
      setValue({ value: "", dynamic: false });
    }
  };

  const handleChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    const newData = { ...formData, value: value };
    setValue({ value: value, formData: newData });
    setFormData((prevData) => ({ ...prevData, value: value }));  
  }

  return (
    <FormControl>
      <FormLabel htmlFor="qr-url" fontWeight={"semibold"}>
        <HStack justifyContent={"space-between"}>
          <Text>URL</Text>
          {dynamicQr && (
            <Link href="/admin/links">
              <Text
                fontSize={14}
                _hover={{ textDecoration: "underline" }}
                cursor={"pointer"}
                color={"blue.500"}
              >
                + Create
              </Text>
            </Link>
          )}
        </HStack>
      </FormLabel>
      {dynamicQr ? (
        <Select onChange={handleChange} value={selectedLink?.name}>
          {data.map((link) => (
            <option key={link?.docId} value={link?.name}>
              {`${link?.name} (https://cuminqr.com/${link?.alias} -> ${link?.destinationUrl})`}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          // id="qr-url"
          placeholder="https://example.com"
          value={formData.value}
          onChange={handleChangeFormData}
        />
      )}
      {/* {admin && ( */}
      <VStack alignItems={"flex-start"} gap={4}>
        <Checkbox
          mt={4}
          isDisabled={!admin}
          isChecked={dynamicQr}
          onChange={handleChangeCheckbox}
        >
          <Text fontSize={15} fontWeight={500}>
            Dynamic QR code
          </Text>
        </Checkbox>
        <Text fontSize={14} color={"gray.600"} fontWeight={500}>
          Enabling this will create a QR code that points to an internal short
          link, which will redirect to any specified link, dynamically.
        </Text>
      </VStack>
      {/* )} */}
    </FormControl>
  );
}
