import { defaultLocationData } from "@/data/common";
import { QRVariant } from "@/types/QRVariant";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

export default function QRLocation({ value, setValue }: QRVariant) {
  const [formData, setFormData] = useState(defaultLocationData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    const dataTosend = `geo:${newData.latitude},${newData.longitude}`;
    setValue({ value: dataTosend,  formData : newData  });
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    // setFormData(value && Object.keys(value).length > 0 ? value.formData : defaultLocationData);
    setFormData(Object.assign({}, defaultLocationData, value.formData));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormControl>
      <FormLabel htmlFor="qr-latitude" fontWeight={"semibold"}>
        Latitude
      </FormLabel>
      <Input
        type="number"
        id="qr-latitude"
        name="latitude"
        placeholder="latitude"
        value={formData.latitude}
        onChange={handleChange}
      />
      <FormLabel mt={4} htmlFor="qr-longitude" fontWeight={"semibold"}>
        Longitude
      </FormLabel>
      <Input
        type="number"
        id="qr-longitude"
        name="longitude"
        placeholder="longitude"
        value={formData.longitude}
        onChange={handleChange}
      />
    </FormControl>
  );
}
