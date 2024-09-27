import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { ListProps } from "./page";

export default function AddEditLink({
  selectedLink,
  setFormData,
  formData,
}: {
    selectedLink: ListProps | null;
    formData: ListProps | null;
    setFormData?: any;
}) {

  return (
    <>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={formData?.name}
          placeholder="unique name to identify url"
        />
      </FormControl>
      <FormControl mt={6} isRequired>
        <FormLabel>Destination Url</FormLabel>
        <Input
          value={formData?.destinationUrl}
          onChange={(e) =>
            setFormData({ ...formData, destinationUrl: e.target.value })
          }
          placeholder="destination url"
        />
      </FormControl>
      <FormControl>
        <FormLabel mt={6}>Alias</FormLabel>
        <InputGroup>
          <InputLeftAddon>cuminqr.com/</InputLeftAddon>
          <Input
            value={formData?.alias}
            onChange={(e) =>
              setFormData({ ...formData, alias: e.target.value })
            }
            placeholder="alias name of your choice"
          />
        </InputGroup>
      </FormControl>
    </>
  );
}
