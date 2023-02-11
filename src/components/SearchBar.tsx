import { Autocomplete } from '@mantine/core';
import { IconSearch } from "@tabler/icons";

import { UniListItem } from '../types/Responses';

interface SearchBarProps{
  data: UniListItem[] | []
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
      data={props.data.map(function (item) { return item?.name; })}
      icon={<IconSearch/>}
    />
  );
}

export default SearchBar;