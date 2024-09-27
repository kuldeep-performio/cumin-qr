import { defaultVCardData } from "@/data/common";
import { QRVariant } from "@/types/QRVariant";
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";


export default function QRvCard({ value, setValue }: QRVariant) {
  const [formData, setFormData] = useState(defaultVCardData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    const dataTosend = `BEGIN:VCARD\nVERSION:4.0\nFN:${newData.firstName} ${newData.lastName}\nORG:${newData.organization}\nTEL;TYPE=work,voice:${newData.phone}\nEMAIL:${newData.email}\nADR:${newData.address}\nTITLE:${newData.title}\nURL:${newData.website}\nBDAY:${newData.birthday}\nEND:VCARD`;
    setValue({ value: dataTosend,  formData : newData  });
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const generateVCard = () => {
    const vCardData = `
          BEGIN:VCARD
          VERSION:3.0
          FN:${formData.firstName}
          ORG:${formData.organization}
          TEL:${formData.phone}
          EMAIL:${formData.email}
          ADR:${formData.address}
          TITLE:${formData.title || ""}
          URL:${formData.website || ""}
          BDAY:${formData.birthday || ""}
          END:VCARD
        `;

    // Remove extra whitespaces and newlines
    const cleanedVCardData = vCardData.replace(/\n\s*/g, "");

    return `BEGIN:VCARD\nVERSION:4.0\nFN:${formData.firstName} ${formData.lastName}\nORG:${formData.organization}\nTEL;TYPE=work,voice:${formData.phone}\nEMAIL:${formData.email}\nADR:${formData.address}\nTITLE:${formData.title}\nURL:${formData.website}\nBDAY:${formData.birthday}\nEND:VCARD`;
  };

  //   useEffect(() => {
  //     setValue({ value: generateVCard() });
  //   }, [formData])

  useEffect(() => {
    // setFormData(value && Object.keys(value).length > 0 ? value.formData : defaultVCardData);
    setFormData(Object.assign({}, defaultVCardData, value.formData));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormControl>
      <HStack gap={4}>
        <Box width={"full"}>
          <FormLabel htmlFor="firstName" fontWeight={"semibold"}>
            First name
          </FormLabel>
          <Input
            placeholder="abcdef"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Box>
        <Box width={"full"}>
          <FormLabel htmlFor="lastName" fontWeight={"semibold"}>
            Last name
          </FormLabel>
          <Input
            placeholder="abcdef"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Box>
      </HStack>

      <FormLabel mt={4} htmlFor="email" fontWeight={"semibold"}>
        Email
      </FormLabel>
      <Input
        placeholder="abcdef@abc.com"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <FormLabel mt={4} htmlFor="website" fontWeight={"semibold"}>
        Website url
      </FormLabel>
      <Input
        placeholder="https://www.example.com"
        name="website"
        value={formData.website}
        onChange={handleChange}
      />

      <FormLabel mt={4} htmlFor="organization" fontWeight={"semibold"}>
        Organization
      </FormLabel>
      <Input
        placeholder="Type here..."
        name="organization"
        value={formData.organization}
        onChange={handleChange}
      />

      <FormLabel mt={4} htmlFor="title" fontWeight={"semibold"}>
        Job title
      </FormLabel>
      <Input
        placeholder="Software Engineer"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />

      <FormLabel mt={4} htmlFor="birthday" fontWeight={"semibold"}>
        Birthday
      </FormLabel>
      <Input
        type="date"
        name="birthday"
        value={formData.birthday}
        onChange={handleChange}
      />

      <FormLabel mt={4} htmlFor="address" fontWeight={"semibold"}>
        Address
      </FormLabel>
      <Input
        placeholder="123, Example Street, City, Country, 123456"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />

      <FormLabel mt={4} htmlFor="phone" fontWeight={"semibold"}>
        Phone number
      </FormLabel>
      <Input
        placeholder="0123456789"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
    </FormControl>
  );
}
