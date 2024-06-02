import { Paper, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Button, TableBody } from '../../../node_modules/@mui/material/index';
import DialogExport from './CustomDialogExport';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetProduct } from 'store/reducers/product';
import { actionGetDesExport, actionGetExport, actionGetWarehouse } from 'store/reducers/warehouse';
import DateFormat from 'utils/format';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DescriptionExport from './DescriptionExport';
export const columns = [
  {
    id: 1,
    label: 'STT'
  },
  {
    id: 2,
    label: 'Warehouse'
  },
  {
    id: 3,
    label: 'Address'
  },
  {
    id: 3,
    label: 'Export To'
  },
  {
    id: 4,
    label: 'Total Products'
  },
  {
    id: 5,
    label: 'Create At'
  },
  {
    id: 6,
    label: 'Action'
  }
];
const WarehouseExport = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { data: dataExportProduct } = useSelector((state) => state.warehouse.getExportProduct);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDescription = (id) => {
    setId(id);
    setOpen(true);
    dispatch(actionGetDesExport(id));
  };
  useEffect(() => {
    dispatch(actionGetWarehouse());
    dispatch(actionGetProduct());
    dispatch(actionGetExport());
  }, []);

  return (
    <div className="flex container flex-col gap-10 items-start">
      <button onClick={() => setOpenDialog(true)} className="mr-10 px-5 py-1.5 text-white font-semibold rounded-lg bg-primary-8">
        Create Warehouse Export
      </button>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
            {openDialog && <DialogExport open={openDialog} setOpen={setOpenDialog} />}
            <TableBody>
              {dataExportProduct?.data?.length > 0 ? (
                dataExportProduct?.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <>
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          <p className='className="max-w-[200px] min-w-max'>{row?.warehouse?.name}</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="w-[100px] line-clamp-2">{row?.warehouse?.address}</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="w-[200px]">{row?.address}</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="min-w-[150px]">{row?.products?.length}</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="min-w-[200px]">{DateFormat(row?.createdAt)}</p>
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex w-full justify-center gap-3 items-center">
                            <span className="text-primary-8" onClick={() => handleDescription(row?._id)}>
                              <RemoveRedEyeIcon />
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                      {open && <DescriptionExport open={open} setOpen={setOpen} id={id} />}
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
          count={dataExportProduct?.data?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default WarehouseExport;
