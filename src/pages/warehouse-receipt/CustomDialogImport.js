import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomAutocomplete from 'components/Mui/CustomAutoComplete';
import { actionImportProduct, actionGetImport } from 'store/reducers/warehouse';

export default function DialogImport({ open, setOpen }) {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([{ name: '', quantity: '' }]);
  const { data: dataWarehouse } = useSelector((state) => state.warehouse.getwarehouse);
  const { data: dataProduct } = useSelector((state) => state.product.getProduct);

  const handleClose = () => {
    setOpen(false);
  };

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

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      warehouseId: null,
      products: []
    }
  });

  const handleNew = (data) => {
    const formattedProducts = rows.map((row) => ({
      product: row.name,
      quantity: parseInt(row.quantity)
    }));

    const formData = {
      warehouseId: data.warehouseId?._id,
      products: formattedProducts
    };
    debugger;
    dispatch(actionImportProduct(formData)).then((res) => {
      if (res?.payload?.success) {
        setOpen(false);
        dispatch(actionGetImport());
      }
    });
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '1000px'
          }
        }
      }}
      onClose={handleClose}
      open={open}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Create a Goods Receipt Note
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(handleNew)}>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <Controller
                name="warehouseId"
                control={control}
                render={({ field }) => (
                  <CustomAutocomplete
                    fullWidth
                    options={dataWarehouse?.warehouses || []}
                    id="autocomplete-custom-ward"
                    getOptionLabel={(option) => option.name || ''}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Warehouse"
                        error={Boolean(errors.warehouseId)}
                        helperText={errors.warehouseId?.message || ''}
                      />
                    )}
                    {...field}
                    onChange={(_, option) => {
                      field.onChange(option);
                    }}
                  />
                )}
              />
            </div>
            <button
              type="button"
              onClick={handleAddRow}
              className="max-w-[100px] mt-3 disabled:cursor-not-allowed disabled:bg-slate-600 rounded-lg bg-primary-8 py-1.5 hover:-translate-y-1 transition-all duration-300 text-white"
            >
              Add Row
            </button>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Product</TableCell>
                    <TableCell align="left">Quantity</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0, width: '400px' } }}>
                      <TableCell align="left">
                        <div className="w-[300px]">
                          <CustomAutocomplete
                            id={`product-${index}`}
                            size="small"
                            fullWidth
                            options={dataProduct?.productDatas || []}
                            getOptionLabel={(option) => option.title || ''}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Product"
                                error={Boolean(errors.products)}
                                helperText={errors.products?.message || ''}
                              />
                            )}
                            value={row.name}
                            onChange={(_, option) => handleChange(index, 'name', option)}
                          />
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          fullWidth
                          value={row.quantity}
                          onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleDeleteRow(index)} aria-label="delete" size="small">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="text-right mt-10">
            <button className="min-w-[100px] disabled:cursor-not-allowed disabled:bg-slate-600 rounded-lg bg-primary-8 py-1.5 hover:-translate-y-1 transition-all duration-300 text-white">
              Submit
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
