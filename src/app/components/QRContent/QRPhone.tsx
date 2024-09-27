import { QRVariant } from "@/types/QRVariant";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function QRPhone({ value, setValue }: QRVariant) {
  const [formData, setFormData] = useState({ value : '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    const newData = { ...formData, value: value };
    const dataToSend = `tel:${value}`;
    setValue({ value: dataToSend, formData: newData });
    setFormData((prevData) => ({ ...prevData, value: value }));  
  }

  useEffect(() => {
    setFormData(Object.assign({}, { value : '' }, value.formData));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormControl>
      <FormLabel htmlFor="qr-phone" fontWeight={'semibold'}>
        Phone number
      </FormLabel>
      <Input  value={formData.value} placeholder="9876543210" onChange={handleChange} />
    </FormControl>
  );
}
