import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionDeleteCategory, actionGetCategory, actionGetDesCategory } from 'store/reducers/category';
import DateFormat from 'utils/format';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { actionDeleteBrand, actionGetBrand, actionGetDesBrand } from 'store/reducers/brand';
import { actionBlockUser, actionGetAllUser, actionGetUserId, actionUnblockUser } from 'store/reducers/auth';
import BlockIcon from '@mui/icons-material/Block';
import DialogFormUpdate from './DialogFormUpdate';
import DoneIcon from '@mui/icons-material/Done';
export const columns = [
  {
    id: 1,
    label: 'STT'
  },
  {
    id: 2,
    label: 'User Name'
  },
  {
    id: 3,
    label: 'Email'
  },
  {
    id: 3,
    label: 'Phone Number'
  },
  {
    id: 3,
    label: 'Amount of Products'
  },
  {
    id: 3,
    label: 'Amount of Warehouses'
  },
  {
    id: 3,
    label: 'Create At'
  },
  {
    id: 3,
    label: 'Status'
  },
  {
    id: 3,
    label: 'Action'
  }
];
const User = () => {
  const { data: dataBrand } = useSelector((state) => state.brand.getBrand);
  const { data: dataUser } = useSelector((state) => state.auth.getAllUser);
  const [openCategory, setOpenCategory] = useState(false);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [id, setId] = useState();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleBlock = (id) => {
    dispatch(actionBlockUser(id)).then((res) => {
      if (res?.payload?.success) {
        dispatch(actionGetAllUser());
      }
    });
  };
  const handleActive = (id) => {
    dispatch(actionUnblockUser(id)).then((res) => {
      if (res?.payload?.success) {
        dispatch(actionGetAllUser());
      }
    });
  };

  const handleUpdate = (id) => {
    dispatch(actionGetUserId(id)).then((res) => {
      if (res?.payload?.success) {
        setOpenUpdateUser(true);
        setId(id);
      }
    });
  };
  useEffect(() => {
    dispatch(actionGetAllUser());
  }, []);
  console.log(dataUser);
  return (
    <div className="flex container flex-col gap-10 items-start">
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
            {/* {openCategory && <DialogCreateBrand open={openCategory} setOpen={setOpenCategory} />} */}
            <TableBody>
              {dataUser?.users?.length > 0 ? (
                dataUser?.users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <>
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          <p className='className="max-w-[200px] min-w-max'>
                            {row?.firstname} {row?.lastname}
                          </p>
                        </TableCell>
                        <TableCell align="center">{row?.email}</TableCell>
                        <TableCell align="center">{row?.mobile}</TableCell>
                        <TableCell align="center">{row?.products?.length ? row?.products?.length : 0}</TableCell>
                        <TableCell align="center">{row?.warehouses?.length ? row?.warehouses?.length : 0}</TableCell>
                        <TableCell align="center">
                          <p className="min-w-max">{DateFormat(row?.createdAt)}</p>
                        </TableCell>
                        <TableCell align="center">
                          {row?.isBlocked ? (
                            <p className="bg-rose-500 px-3 py-1 rounded-lg text-white">Blocked</p>
                          ) : (
                            <p className="bg-sky-500 px-3 py-1 rounded-lg text-white">Active</p>
                          )}
                        </TableCell>

                        <TableCell align="center">
                          <div className="flex gap-3 items-center justify-center">
                            <Button onClick={() => handleUpdate(row?._id)} variant="outlined" startIcon={<EditIcon />}>
                              edit
                            </Button>
                            {row?.isBlocked ? (
                              <Button onClick={() => handleActive(row?._id)} color="success" variant="outlined" startIcon={<DoneIcon />}>
                                Active
                              </Button>
                            ) : (
                              <Button onClick={() => handleBlock(row?._id)} color="error" variant="outlined" startIcon={<BlockIcon />}>
                                Block
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                      {openUpdateUser && <DialogFormUpdate open={openUpdateUser} setOpen={setOpenUpdateUser} id={id} />}
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
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataExportProduct?.data?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </div>
  );
};
export default User;
