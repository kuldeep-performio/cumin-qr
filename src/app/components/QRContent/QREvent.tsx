import { defaultEventData } from "@/data/common";
import { QRVariant } from "@/types/QRVariant";
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

export default function QREvent({ value, setValue }: QRVariant) {
  const [formData, setFormData] = useState(defaultEventData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    const dataTosend = createEvent(newData);
    setValue({ value: dataTosend, formData: newData});
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  useEffect(() => {
    setFormData(Object.assign({}, defaultEventData, value.formData));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const timezones = Intl.supportedValuesOf("timeZone");

  function createEvent(newData: any) {
    const beginEvent = "BEGIN:VEVENT\r\n";
    const endEvent = "END:VEVENT";
    const eventSummary = "SUMMARY:" + newData.summary + "\r\n";
    const eventLocation = "LOCATION:" + newData.location + "\r\n";
    const eventURL = "URL:" + newData.url + "\r\n";
    const eventDesc = "DESCRIPTION:" + newData.description + "\r\n";
    const eventStart =
      "DTSTART;TZID=" +
      newData.timezone +
      ":" +
      timeStamp(newData.startDate) +
      "\r\n";
    const eventEnd =
      "DTEND;TZID=" +
      newData.timezone +
      ":" +
      timeStamp(newData.endDate) +
      "\r\n";
    const generatedEvent =
      beginEvent +
      eventSummary +
      eventDesc +
      eventURL +
      eventLocation +
      eventStart +
      eventEnd +
      endEvent;
    return generatedEvent;
  }

  const timeStamp = (haha: string) => {
    const newDateTime = haha.split("-").join("").split(":").join("");
    const formattedTimestamp = `${newDateTime}00Z`;
    return formattedTimestamp;
  };

  return (
    <FormControl>
      <FormLabel htmlFor="summary" fontWeight={"semibold"}>
        Summary
      </FormLabel>
      <Input name="summary" placeholder="summary" value={formData.summary} onChange={handleChange} />
      <HStack gap={4} mt={4}>
        <Box width={"full"}>
          <FormLabel htmlFor="startDate" fontWeight={"semibold"}>
            Starts on
          </FormLabel>
          <Input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </Box>
        <Box width={"full"}>
          <FormLabel htmlFor="endDate" fontWeight={"semibold"}>
            End on
          </FormLabel>
          <Input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </Box>
      </HStack>

      <FormLabel mt={4} htmlFor="location" fontWeight={"semibold"}>
        Location
      </FormLabel>
      <Input
        name="location"
        placeholder="location"
        value={formData.location}
        onChange={handleChange}
      />

      <FormLabel mt={4} htmlFor="url" fontWeight={"semibold"}>
        Event URL
      </FormLabel>
      <Input name="url" placeholder="https://meet.google.com/abcabcabc" value={formData.url} onChange={handleChange} />

      <FormLabel mt={4} htmlFor="description" fontWeight={"semibold"}>
        Description
      </FormLabel>
      <Textarea
        rows={3}
        name="description"
        placeholder="description"
        shadow="sm"
        focusBorderColor="brand.400"
        value={formData.description}
        onChange={handleChange}
      />
      <FormLabel mt={4} htmlFor="phone" fontWeight={"semibold"}>
        Timezone
      </FormLabel>
      <Select name="timezone" value={formData.timezone} onChange={handleChange}>
        {timezones.map((timezone) => (
          <option key={timezone} value={timezone}>
            {timezone}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
