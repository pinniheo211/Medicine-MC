import { Paper, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Button, TableBody } from '../../../node_modules/@mui/material/index';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetDesExport, actionGetDesImport, actionGetImport, actionGetWarehouse } from 'store/reducers/warehouse';
import { actionGetProduct } from 'store/reducers/product';
import DateFormat from 'utils/format';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DescriptionImport from './DescriptionImport';
import DialogImport from './CustomDialogImport';
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
const WarehouseReceipt = () => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const { data: dataGetImport } = useSelector((state) => state.warehouse.getImportProduct);
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
    dispatch(actionGetDesImport(id));
  };
  useEffect(() => {
    dispatch(actionGetWarehouse());
    dispatch(actionGetProduct());
    dispatch(actionGetImport());
  }, []);
  console.log(dataGetImport);
  return (
    <div className="flex container flex-col gap-10 items-start">
      <button onClick={() => setOpenDialog(true)} className="mr-10 px-5 py-1.5 text-white font-semibold rounded-lg bg-primary-8">
        Create Warehouse Receipt
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
            {openDialog && <DialogImport open={openDialog} setOpen={setOpenDialog} />}
            <TableBody>
              {dataGetImport?.data?.length > 0 ? (
                dataGetImport?.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <>
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row?.warehouse?.name}</TableCell>
                        <TableCell align="center">
                          <p className="min-w-[150px]">{row?.warehouse?.address}</p>
                        </TableCell>
                        <TableCell align="center">{row?.products?.length}</TableCell>

                        <TableCell align="center">
                          <p className="min-w-[200px]">{DateFormat(row?.updatedAt)}</p>
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex w-full justify-center gap-3 items-center">
                            <span className="text-primary-8" onClick={() => handleDescription(row?._id)}>
                              <RemoveRedEyeIcon />
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                      {open && <DescriptionImport open={open} setOpen={setOpen} id={id} />}
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
          count={dataGetImport?.importRecords?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default WarehouseReceipt;
