import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetInventory, actionGetWarehouse } from 'store/reducers/warehouse';
import CustomAutocomplete from 'components/Mui/CustomAutoComplete';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeMdx } from 'utils/theme';
import { SHCEMA_INVENTORY } from 'utils/schema';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import * as XLSX from 'xlsx';

const columns = [
  {
    id: 1,
    label: 'Warehouse'
  },
  {
    id: 2,
    label: 'Product'
  },
  {
    id: 5,
    label: 'Import Quantity'
  },
  {
    id: 6,
    label: 'Export Quantity'
  },
  {
    id: 7,
    label: 'Final Quantity'
  }
];

const InventoryPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const exportToExcel = () => {
    const wsData = [
      ['INVENTORY REPORT'], // Tiêu đề lớn của bảng
      [], // Dòng trống giữa tiêu đề lớn và tiêu đề cột
      columns.map((column) => column.label.toUpperCase()),
      ...dataInventory?.inventory.map((item) => [
        dataInventory?.warehouseName,
        item?.product?.title,
        item?.importedQuantity,
        item?.exportedQuantity,
        item?.initialQuantity
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Định dạng tiêu đề lớn
    const mainTitleStyle = {
      font: { bold: true, sz: 24 }, // Kích thước chữ 24
      alignment: { horizontal: 'center', vertical: 'center' }
    };

    // Định dạng tiêu đề cột
    const headerStyle = {
      font: { bold: true, sz: 12 },
      fill: { fgColor: { rgb: '0000FF' } }, // Xanh dương
      alignment: { horizontal: 'center', vertical: 'center' }
    };

    // Thiết lập độ rộng cho các cột
    ws['!cols'] = [{ wch: 20 }, { wch: 30 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];

    // Áp dụng định dạng cho tiêu đề lớn
    const titleCellRef = XLSX.utils.encode_cell({ c: 0, r: 0 });
    if (!ws[titleCellRef]) ws[titleCellRef] = {};
    ws[titleCellRef].s = mainTitleStyle;

    // Gộp ô cho tiêu đề lớn để nó trải rộng toàn bộ các cột
    ws['!merges'] = [{ s: { c: 0, r: 0 }, e: { c: columns.length - 1, r: 0 } }];

    // Áp dụng định dạng cho tiêu đề cột
    columns.forEach((column, index) => {
      const cellRef = XLSX.utils.encode_cell({ c: index, r: 2 });
      if (!ws[cellRef]) ws[cellRef] = {};
      ws[cellRef].s = headerStyle;
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
    XLSX.writeFile(wb, 'inventory.xlsx');
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

        {dataInventory?.inventory?.length > 0 ? (
          <div className="mt-10">
            <Button className="mb-6" variant="contained" color="primary" onClick={exportToExcel}>
              Export to Excel
            </Button>
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
                  {dataInventory?.inventory?.length > 0 ? (
                    dataInventory?.inventory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      return (
                        <>
                          <TableRow hover role="checkbox" tabIndex={-1}>
                            <TableCell>{dataInventory?.warehouseName}</TableCell>
                            <TableCell align="center">
                              <div className="flex gap-2 items-center">
                                <img className="block w-[100px] h-[100px]" src={row?.product?.images[0]} alt="product image" />

                                <p className="min-w-max break-words line-clamp-3">{row?.product?.title}</p>
                              </div>
                            </TableCell>
                            <TableCell align="center">
                              <p className="min-w-max break-words line-clamp-3"> {row?.importedQuantity}</p>
                            </TableCell>
                            <TableCell align="center">
                              <p className="min-w-max break-words line-clamp-3">{row?.exportedQuantity}</p>
                            </TableCell>
                            <TableCell align="center">
                              <p className="min-w-max break-words line-clamp-3">{row?.initialQuantity}</p>
                            </TableCell>
                          </TableRow>
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
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={dataInventory?.inventory?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default InventoryPage;
