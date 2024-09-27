import { QRVariant } from "@/types/QRVariant";
import {
  Box,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  value: string;
  handleChange: (value: any) => void;
  name: string;
  placeHolder: string;
  label: string;
};

const SocialInput = ({
  value,
  handleChange,
  placeHolder,
  label,
  name,
}: Props) => {
  return (
    <Box mt={2} width={"full"}>
      <FormLabel htmlFor="facebook" fontWeight={"semibold"}>
        {label}
      </FormLabel>
      <Input
        placeholder={placeHolder}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
};

export default function QRSocial({ value, setValue }: QRVariant) {

  const [formData, setFormData] = useState({ value : '', type : 'facebook' });

  const handleChange = (value: string) => {
    setFormData({ value: "", type: value });
    setValue({ value: "", formData: { value: "", type: value } });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const newData = { ...formData, value };
    const selected = formData.type;
    let dataToSend;
    if (selected === "facebook") {
      dataToSend = `https://www.facebook.com/${value}`;
    } else if (selected === "twitter") {
      dataToSend = `https://www.twitter.com/${value}`;
    } else if (selected === "instagram") {
      dataToSend = `https://www.instagram.com/${value}`;
    } else if (selected === "linkedIn") {
      dataToSend = `https://www.linkedin.com/in/${value}`;
    } else if (selected === "youTube") {
      dataToSend = `https://www.youtube.com/user/${value}`;
    } else {
      dataToSend = "";
    }
    setValue({ value: dataToSend, formData: newData });
    setFormData((prevData) => ({ ...prevData, value: value }));  
  };

  useEffect(() => {
    setFormData(Object.assign({}, { value : '', type : 'facebook' }, value.formData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack direction={"column"} width={"full"}>
      <RadioGroup onChange={handleChange} value={formData.type}>
        <Stack direction="row" flexWrap={"wrap"}>
          <Radio value="facebook">Facebook</Radio>
          <Radio value="twitter">Twitter</Radio>
          <Radio value="instagram">Instagram</Radio>
          <Radio value="linkedIn">LinkedIn</Radio>
          <Radio value="youTube">YouTube</Radio>
        </Stack>
      </RadioGroup>
      <Box mt={2} width={"full"}>
        {formData.type === "facebook" ? (
          <SocialInput
            value={formData.value}
            handleChange={handleInputChange}
            name="facebook"
            label="Facebook username"
            placeHolder="abcdef"
          />
        ) : formData.type === "twitter" ? (
          <SocialInput
            value={formData.value}
            handleChange={handleInputChange}
            name="twitter"
            label="Twitter username"
            placeHolder="abcdef"
          />
        ) : formData.type === "instagram" ? (
          <SocialInput
            value={formData.value}
            handleChange={handleInputChange}
            name="instagram"
            label="Instagram username"
            placeHolder="abcdef"
          />
        ) : formData.type === "linkedIn" ? (
          <SocialInput
            value={formData.value}
            handleChange={handleInputChange}
            name="linkedIn"
            label="LinkedIn username"
            placeHolder="abcdef"
          />
        ) : formData.type === "youTube" ? (
          <SocialInput
            value={formData.value}
            handleChange={handleInputChange}
            name="youTube"
            label="YouTube username"
            placeHolder="abcdef"
          />
        ) : null}
      </Box>
    </Stack>
  );
}
