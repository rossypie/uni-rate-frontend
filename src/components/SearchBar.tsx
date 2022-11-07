import { Autocomplete } from '@mantine/core';
import { IconSearch } from "@tabler/icons";

interface SearchBarProps{
  data: string[]
  placeholder: string
  label: string
}

const SearchBar = (props:SearchBarProps) => {
  return (
    <Autocomplete
      placeholder={props.placeholder}
      label={props.label}
      radius="xl"
      size="md"
      data={props.data}
      icon={<IconSearch/>}
    />
  );
}

export default SearchBar;