import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomAutocomplete from './CustomAutoComplete';
import { useSelector } from 'react-redux';

const DynamicTable = () => {
  const [rows, setRows] = useState([{ name: '', quantity: '' }]);
  const { data: dataProduct } = useSelector((state) => state.product.getProduct);

  const handleAddRow = () => {
    setRows([...rows, { name: '', quantity: '' }]);
  };

  const handleDeleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  return <></>;
};

export default DynamicTable;
