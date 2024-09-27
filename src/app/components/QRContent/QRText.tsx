import { QRVariant } from "@/types/QRVariant";
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";


export default function QRText({ value, setValue, styles }: QRVariant & {styles ? : boolean}) {

  const [formData, setFormData] = useState({ value : '' });

  // const [debouncedInputValue, setDebouncedInputValue] = React.useState("");

  // const handleInputChange = (e : ChangeEvent<HTMLTextAreaElement>) => {
  //   setValue(e.target.value);
  // };

  // React.useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setDebouncedValue(inputValue);
  //   }, 500);
  //   return () => clearTimeout(timeoutId);
  // }, [inputValue, 500]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target;
    const newData = { ...formData, value: value };
    setValue({ value: value, formData: newData });
    setFormData((prevData) => ({ ...prevData, value: value }));  
  }
  
  useEffect(() => {
    // setFormData(value && Object?.keys(value).length > 0 ? value.formData : { value : '' });
    setFormData(Object.assign({}, { value : '' }, value.formData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

//   const _changeText(newText:string) {
//     setValue(newText)
//   }

// const changeText = useDebounce(_changeText, 1000)

  return (
    <FormControl >
      <FormLabel htmlFor="qr-text" fontWeight={"semibold"}>
        Text content
      </FormLabel>
      <Textarea
        placeholder="Type here..."
        rows={3}
        isDisabled={styles}
        name="qr-text"
        shadow="sm"
        focusBorderColor="brand.400"
        value={formData.value}
        onChange={handleChange}
      />
    </FormControl>
  );
}
