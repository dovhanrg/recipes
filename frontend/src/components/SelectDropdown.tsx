import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

const SEARCH_PARAMS = [
  { title: 'All', value: 'All' },
  { title: 'Ingredient', value: 'ingredient' },
  { title: 'Country', value: 'country' },
  { title: 'Category', value: 'category' },
];

type Props = {
  onSelect: (value: string) => void;
  onChange: (value: string) => void;
  initialSearchType?: string;
  initialSearchValue?: string;
};

export function SelectDropdown({
  onSelect,
  onChange,
  initialSearchType,
  initialSearchValue,
}: Props) {
  const [searchParam, setSearchParam] = useState<string>(
    initialSearchType || 'All'
  );
  const handleSelectChange = (event: SelectChangeEvent) => {
    setSearchParam(event.target.value);
    onSelect(event.target.value);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onChange(event.target.value);
  };

  const searchTitle =
    SEARCH_PARAMS.find((sp) => sp.value === searchParam).title ?? '';

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Filter by:</InputLabel>
      <Box sx={{ display: 'flex' }}>
        <Select
          sx={{ flexGrow: 0.5 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchParam}
          label="Filter by"
          onChange={handleSelectChange}
        >
          {SEARCH_PARAMS.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
        {searchParam !== 'All' && (
          <TextField
            sx={{ flexGrow: 0.5 }}
            id="outlined-basic"
            label={searchParam !== 'All' ? `Enter ${searchTitle}` : ''}
            variant="outlined"
            onChange={handleChange}
            value={initialSearchValue || undefined}
          />
        )}
      </Box>
    </FormControl>
  );
}
