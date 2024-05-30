// material-ui

import DataTable from 'components/Mui/DataTable';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionDeleteWarehouse, actionGetDescriptionWarehouse, actionGetWarehouse } from 'store/reducers/warehouse';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DateFormat from 'utils/format';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DialogWarehouse from './CustomDialog';
import DialogUpdateWarehouse from './CustomDialogUpdateWarehouse';
export const columns = [
  {
    id: 1,
    label: 'STT'
  },
  {
    id: 2,
    label: 'Warehouse Name'
  },
  {
    id: 3,
    label: 'Phone'
  },
  {
    id: 4,
    label: 'Address'
  },

  {
    id: 6,
    label: 'Create At'
  },
  {
    id: 7,
    label: 'Action'
  }
];
const WarehousePage = () => {
  const dispatch = useDispatch();
  const { data: dataUser } = useSelector((state) => state.auth.user);
  const { data: dataWarehouse } = useSelector((state) => state.warehouse.getwarehouse);

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  // const [dataWarehouse, setDataWarehouse] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteWarehouse = (id) => {
    dispatch(actionDeleteWarehouse(id)).then((res) => {
      if (res?.payload?.success) {
        dispatch(actionGetWarehouse());
      }
    });
  };

  const handleUpdateWarehouse = (id) => {
    dispatch(actionGetDescriptionWarehouse(id)).then((res) => {
      if (res?.payload?.success) {
        setOpen(true);
        setId(id);
      }
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    dispatch(actionGetWarehouse());
  }, []);
  console.log(dataWarehouse?.warehouses);
  return (
    <div className="flex container flex-col gap-10 items-end">
      <button onClick={() => setOpenDialog(true)} className="mr-10 px-5 py-1.5 text-white font-semibold rounded-lg bg-primary-8">
        + Add Warehouse
      </button>
      {openDialog && <DialogWarehouse open={openDialog} setOpen={setOpenDialog} />}
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
            <TableBody>
              {dataWarehouse?.warehouses?.length > 0 ? (
                dataWarehouse?.warehouses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <>
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row?.name}</TableCell>
                        <TableCell align="center">{row?.phone}</TableCell>
                        <TableCell align="center">
                          <p className="min-w-[150px]">{row?.address}</p>
                        </TableCell>
                        {/* <TableCell>{row?.status === 1 ? 'Default' : ''}</TableCell> */}
                        <TableCell align="center">
                          <p className="min-w-[200px]">{DateFormat(row?.createdAt)}</p>
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex w-full justify-center gap-3 items-center">
                            <Button
                              color="error"
                              onClick={() => handleDeleteWarehouse(row?._id)}
                              variant="outlined"
                              startIcon={<DeleteIcon />}
                            >
                              Delete
                            </Button>
                            <Button onClick={() => handleUpdateWarehouse(row?._id)} variant="outlined" startIcon={<EditIcon />}>
                              edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {open && <DialogUpdateWarehouse open={open} setOpen={setOpen} id={id} />}
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
          count={dataWarehouse?.warehouses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default WarehousePage;
