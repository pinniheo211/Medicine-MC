import DataTable from 'components/Mui/DataTable';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionDeleteProduct, actionGetProduct } from 'store/reducers/product';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DateFormat from 'utils/format';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import CustomFormAccept from 'components/Mui/CustomFormAccept';
import DialogProduct from './CustomDialog';
import { truncate } from 'lodash';
const Product = () => {
  const dispatch = useDispatch();
  const { data: dataProduct } = useSelector((state) => state.product.getProduct);
  // const [dataProduct, setDataProduct] = useState([]);
  const { data: dataProfile } = useSelector((state) => state.auth.user);
  const columns = [
    {
      id: 1,
      label: 'Code Id'
    },
    {
      id: 2,
      label: 'Product Name'
    },
    {
      id: 3,
      label: 'Catregory'
    },
    {
      id: 4,
      label: 'Description'
    },
    {
      id: 5,
      label: 'Image'
    },
    {
      id: 6,
      label: 'Price'
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
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDelete = (id) => {
    dispatch(actionDeleteProduct(id)).then((res) => {
      if (res?.payload?.err === 0) {
        dispatch(actionGetProduct(userId));
      }
      setOpen(false);
    });
  };

  const userId = dataProfile?.userData?.userId;
  useEffect(() => {
    dispatch(actionGetProduct(userId)).then((res) => {
      if (res?.payload?.err === 0) {
        // setDataProduct(res?.payload?.productData?.rows);
      }
    });
  }, []);
  return (
    <div className="container w-full ">
      <div className="w-full  flex flex-col gap-10 items-end">
        <button
          onClick={() => setOpenDialog(true)}
          className="mr-10 px-5 py-1.5 hover:-translate-y-1 transition-all duration-300 text-white font-semibold rounded-lg bg-primary-8"
        >
          + Add Product
        </button>
        {openDialog && <DialogProduct open={openDialog} userId={userId} setOpen={setOpenDialog} />}
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
                {dataProduct?.productData?.rows?.length > 0 ? (
                  dataProduct?.productData?.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                      <>
                        <TableRow hover role="checkbox" tabIndex={-1}>
                          <TableCell>{row?.id}</TableCell>
                          <TableCell>{row?.name}</TableCell>
                          <TableCell>{row?.categoryData?.value}</TableCell>
                          <TableCell>
                            <p className="max-w-[200px] break-words line-clamp-3">{row?.description}</p>
                          </TableCell>
                          <TableCell align="center">
                            <div className="min-w-[200px] flex justify-center">
                              <img className="block w-[100px] h-[100px]" src={row?.image} alt="product image" />
                            </div>
                          </TableCell>
                          <TableCell>{row?.price}</TableCell>
                          <TableCell>{DateFormat(row?.createdAt)}</TableCell>
                          <TableCell align="center">
                            <div className="flex gap-3 items-center">
                              <Button onClick={() => handleDelete(row?.id)} variant="outlined" startIcon={<DeleteIcon />}>
                                Delete
                              </Button>
                              <Button variant="outlined" startIcon={<EditIcon />}>
                                edit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {/* {open && (
                          <CustomFormAccept
                            open={open}
                            setOpen={setOpen}
                            title="Delete Product"
                            description="Do you want to delete this Product?"
                            handleDelete={() => handleDelete(row?.id)}
                          />
                        )} */}
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
            count={dataProduct?.productData?.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Product;
