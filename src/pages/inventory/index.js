import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetInventory, actionGetWarehouse } from 'store/reducers/warehouse';
import CustomAutocomplete from 'components/Mui/CustomAutoComplete';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeMdx } from 'utils/theme';
import { SCHEMA_NEW_PRODUCT, SHCEMA_INVENTORY } from 'utils/schema';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DateFormat, { formatMoney } from 'utils/format';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';

const columns = [
  {
    id: 1,
    label: 'Product Name'
  },
  {
    id: 2,
    label: 'Quantity'
  },
  {
    id: 3,
    label: 'Price'
  }
];

const InventoryPage = () => {
  const dispatch = useDispatch();
  const { data: dataWarehouse } = useSelector((state) => state.warehouse.getwarehouse);
  const { data: dataInventory } = useSelector((state) => state.warehouse.getInventory);
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      warehouseId: null,
      month: null,
      year: null
      // image: null,
      // description: null
    },
    resolver: yupResolver(SHCEMA_INVENTORY)
  });
  useEffect(() => {
    dispatch(actionGetWarehouse());
  }, []);

  console.log(dataWarehouse?.warehouses);
  const handleFetchInventory = async (data) => {
    console.log(data);
    const formData = {
      warehouseId: data?.warehouseId?._id,
      month: data?.month,
      year: data?.year
    };
    dispatch(actionGetInventory(formData)).then((res) => {});
  };
  console.log(dataInventory);
  return (
    <ThemeProvider theme={ThemeMdx}>
      <div className="w-full container">
        <form onSubmit={handleSubmit(handleFetchInventory)}>
          <div className="grid lg:grid-cols-4 md:grid-cols-3  gap-5 ">
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
                      fullWidth
                      {...params}
                      label="Warehouse"
                      error={Boolean(errors.warehouseId)}
                      helperText={errors.category?.message || ''}
                    />
                  )}
                  {...field}
                  onChange={(_, option) => {
                    field.onChange(option);
                  }}
                />
              )}
            />
            <Controller
              name="month"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth error={Boolean(errors.month)} helperText={errors.month?.message || ''} label="Month" />
              )}
            />
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth error={Boolean(errors.year)} helperText={errors.year?.message || ''} label="Year" />
              )}
            />
            <Button variant="contained" color="primary" type="submit">
              Accept
            </Button>
          </div>
        </form>
        <div className="mt-10">
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell align="center">
                      <p className="min-w-max">{column.label}</p>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {dataProduct?.productDatas?.length > 0 ? (
                  dataProduct?.productDatas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                      <>
                        <TableRow hover role="checkbox" tabIndex={-1}>
                          <TableCell align="center">{page * rowsPerPage + 1 * (index + 1)}</TableCell>
                          <TableCell>{row?.title}</TableCell>
                          <TableCell>
                            <p className="min-w-max break-words line-clamp-3"> {row?.brand?.title}</p>
                          </TableCell>
                          <TableCell>
                            <p className="min-w-max break-words line-clamp-3"> {row?.category?.title}</p>
                          </TableCell>
                          <TableCell>
                            <p className="max-w-[100px] break-words line-clamp-3">{row?.description}</p>
                          </TableCell>
                          <TableCell align="center">
                            <div className="min-w-[200px] flex justify-center">
                              <img className="block w-[100px] h-[100px]" src={row?.images[0]} alt="product image" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="min-w-max">{formatMoney(row?.price)} đ</p>
                          </TableCell>
                          <TableCell>
                            <p className="w-[200px]">{DateFormat(row?.createdAt)}</p>
                          </TableCell>
                          <TableCell align="center">
                            <div className="flex gap-3 items-center">
                              <Button color="error" onClick={() => handleDelete(row?._id)} variant="outlined" startIcon={<DeleteIcon />}>
                                Delete
                              </Button>
                              <Button onClick={() => handleUpdate(row?._id)} variant="outlined" startIcon={<EditIcon />}>
                                edit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {open && <DialogUpdateForm open={open} setOpen={setOpen} id={id} />}
                      </>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%'
                        }}
                      >
                        Empty Data
                      </div>
                    </TableCell>
                  </TableRow>
                )} */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default InventoryPage;
