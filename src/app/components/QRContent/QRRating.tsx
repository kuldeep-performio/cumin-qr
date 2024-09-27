import { QRVariant } from "@/types/QRVariant";
import { Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

export default function QRRating({ value, setValue }: QRVariant) {

  const [formData, setFormData] = useState({ value : '' });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setValue({ value: value, formData: newData });
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    // setFormData(value && Object?.keys(value).length > 0 ? value.formData : defaultEmailData);
    setFormData(Object.assign({}, {value : ''}, value.formData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FormControl>
        <FormLabel mt={4} htmlFor="qr-message" fontWeight={"semibold"}>
          Google Reviews Link
        </FormLabel>
        <Input
          value={formData.value}
          placeholder="https://g.page/your-business/review?rc"
          onChange={handleChange}
        />
      </FormControl>
      <Box mt={2} width={"full"} bg={"gray.100"} p={4}>
        <Text as='div' pl={4} fontSize={'16px'}>
          <ol>
            <li>
              Log into your{" "}
              <a style={{ textDecoration : 'underline', color : 'blue' }} href="https://www.google.com/business/">
                Google Business Profile
              </a>{" "}
              .
            </li>
            <li>
              Look for your business on Google Search and click the link that
              states the number of reviews you have.
            </li>
            <li>Now select the “Get more reviews” button.</li>
            <li>
              {
                "There's your Google reviews link! Copy and paste into an textbox above."
              }
            </li>
          </ol>
        </Text>
      </Box>
    </>
  );
}
