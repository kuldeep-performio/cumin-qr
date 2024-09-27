import { QRVariant } from "@/types/QRVariant";
import {
  Box,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function QRAppStore({ value, setValue }: QRVariant) {

  const [formData, setFormData] = useState({ value : '', type : 'playStore' });

  const handleChange = (value: string) => {
    setFormData({ value: "", type: value });
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    const newData = { ...formData, value: value };
    setValue({ value: value, formData: newData });
    setFormData((prevData) => ({ ...prevData, value: value }));  
  }
  
  useEffect(() => {
    setFormData(Object.assign({}, { value : '', type : 'playStore' }, value.formData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack direction={"column"} width={"full"}>
      <RadioGroup onChange={handleChange} value={formData.type}>
        <Stack direction="row">
          <Radio value="playStore">Google play store</Radio>
          <Radio value="appStore">Apple app store</Radio>
        </Stack>
      </RadioGroup>
      <Box mt={2} width={"full"}>
        {formData.type === "playStore" ? (
          <>
            <FormLabel htmlFor="playStore" fontWeight={"semibold"}>
              Play store url
            </FormLabel>
            <Input
              placeholder="https://play.google.com/store/apps/details?id=com.example.app"
              name="playStore"
              value={formData.value}
              onChange={handleChangeValue}
            />
          </>
        ) : (
          <>
            <FormLabel htmlFor="appStore" fontWeight={"semibold"}>
              App store url
            </FormLabel>
            <Input
              placeholder="https://apps.apple.com/us/app/your-app/id284882215"
              name="appStore"
              value={formData.value}
              onChange={handleChangeValue}
            />
          </>
        )}
      </Box>
    </Stack>
  );
}
