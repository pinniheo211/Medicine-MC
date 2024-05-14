// material-ui

import DataTable from 'components/Mui/DataTable';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionDeleteWarehouse, actionGetWarehouse } from 'store/reducers/warehouse';
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
export const columns = [
  {
    id: 1,
    label: 'STT'
  },
  {
    id: 2,
    label: 'Warehouse Code'
  },
  {
    id: 3,
    label: 'Warehouse Name'
  },
  {
    id: 4,
    label: 'Phone'
  },
  {
    id: 5,
    label: 'Address'
  },
  {
    id: 6,
    label: 'Status'
  },

  {
    id: 7,
    label: 'Create At'
  },
  {
    id: 8,
    label: 'Action'
  }
];
const WarehousePage = () => {
  const dispatch = useDispatch();
  const { data: dataUser } = useSelector((state) => state.auth.user);
  const { data: dataWarehouse } = useSelector((state) => state.warehouse.getwarehouse);

  const [openDialog, setOpenDialog] = useState(false);
  // const [dataWarehouse, setDataWarehouse] = useState([]);
  const User = dataUser?.userData?.userId;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteWarehouse = (id) => {
    dispatch(actionDeleteWarehouse(id)).then((res) => {
      if (res?.payload?.err === 0) {
        dispatch(actionGetWarehouse(User));
      }
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    dispatch(actionGetWarehouse(User));
  }, []);
  console.log(openDialog);
  return (
    <div className="flex flex-col gap-10 items-end">
      <button onClick={() => setOpenDialog(true)} className="mr-10 px-5 py-1.5 text-white font-semibold rounded-lg bg-primary-8">
        + Add Warehouse
      </button>
      {openDialog && <DialogWarehouse open={openDialog} userId={User} setOpen={setOpenDialog} />}
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
              {dataWarehouse?.warehouseData?.rows?.length > 0 ? (
                dataWarehouse?.warehouseData?.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row?.warehouseId}</TableCell>
                      <TableCell>{row?.warehouseName}</TableCell>
                      <TableCell>{row?.phone}</TableCell>
                      <TableCell>
                        <p className="min-w-[150px]">{row?.address}</p>
                      </TableCell>
                      <TableCell>{row?.status === 1 ? 'Default' : ''}</TableCell>
                      <TableCell>
                        <p className="min-w-[200px]">{DateFormat(row?.createAt)}</p>
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex gap-3 items-center">
                          <Button onClick={() => handleDeleteWarehouse(row?.warehouseId)} variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                          </Button>
                          <Button variant="outlined" startIcon={<EditIcon />}>
                            edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
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
          count={dataWarehouse?.warehouseData?.count}
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
