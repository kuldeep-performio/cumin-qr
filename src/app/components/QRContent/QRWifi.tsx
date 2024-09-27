import { defaultWifiData } from "@/data/common";
import { QRVariant } from "@/types/QRVariant";
import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

export default function QRWifi({ value, setValue }: QRVariant) {
  const [formData, setFormData] = useState(defaultWifiData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    let dataTosend;
    if (newData.encryption !== "nopass") {
      dataTosend = `WIFI:S:${newData.name};T:${newData.encryption};P:${newData.password};;`;
    } else {
      `WIFI:S:${newData.name};T:${newData.encryption};`;
    }
    setValue({ value: dataTosend, formData: newData});
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    // setFormData(value && Object.keys(value).length > 0 ? value.formData : defaultWifiData);
    setFormData(Object.assign({}, defaultWifiData, value.formData));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormControl>
      <FormLabel htmlFor="wifi-name" fontWeight={"semibold"}>
        WiFi name (SSID)
      </FormLabel>
      <Input
        id="wifi-name"
        name="name"
        placeholder="WiFi name"
        value={formData.name}
        onChange={handleChange}
      />
      <FormLabel mt={4} htmlFor="encryption" fontWeight={"semibold"}>
        Encryption
      </FormLabel>
      <Select
        name="encryption"
        onChange={handleChange}
        value={formData.encryption}
      >
        <option value="WEP">WEP</option>
        <option value="WPA">WPA/WPA2</option>
        <option value="nopass">No encryption</option>
      </Select>
      <FormLabel mt={4} htmlFor="password" fontWeight={"semibold"}>
        Password
      </FormLabel>
      <Input
        id="password"
        placeholder="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
    </FormControl>
  );
}
