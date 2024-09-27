import { defaultEmailData } from "@/data/common";
import { QRVariant } from "@/types/QRVariant";
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";

export default function QREmail({ value, setValue }: QRVariant) {
  const [formData, setFormData] = useState(defaultEmailData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    const dataToSend = `mailto:${newData.email}?subject=${encodeURIComponent(
      newData.subject
    )}&body=${encodeURIComponent(newData.message)}`;
    setValue({ value: dataToSend, formData: newData });
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    setFormData(Object.assign({}, defaultEmailData, value.formData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormControl>
      <FormLabel htmlFor="email" fontWeight={"semibold"}>
        Email address
      </FormLabel>
      <Input
        name="email"
        placeholder="abcdef@abc.com"
        value={formData?.email}
        onChange={handleChange}
      />
      <FormLabel mt={4} htmlFor="subject" fontWeight={"semibold"}>
        Prefilled subject
      </FormLabel>
      <Input
        name="subject"
        placeholder="subject"
        value={formData?.subject}
        onChange={handleChange}
      />
      <FormLabel mt={4} htmlFor="message" fontWeight={"semibold"}>
        Prefilled message
      </FormLabel>
      <Textarea
        rows={3}
        name="message"
        placeholder="message"
        value={formData?.message}
        onChange={handleChange}
      />
    </FormControl>
  );
}
