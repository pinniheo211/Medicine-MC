/* eslint-disable react/display-name */
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import { forwardRef } from 'react';

const CustomAutocomplete = forwardRef((props, ref) => {
  return <Autocomplete {...props} ref={ref} PaperComponent={(props) => <Paper {...props} className="custom-autocomplete-paper" />} />;
});

export default CustomAutocomplete;
