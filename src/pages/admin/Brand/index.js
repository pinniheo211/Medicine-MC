import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionDeleteCategory, actionGetCategory, actionGetDesCategory } from 'store/reducers/category';
import DateFormat from 'utils/format';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DialogCreateBrand from './DialogCreateBrand';
import DialogFormUpdate from './DialogFormUpdate';
import { actionDeleteBrand, actionGetBrand, actionGetDesBrand } from 'store/reducers/brand';
export const columns = [
  {
    id: 1,
    label: 'STT'
  },
  {
    id: 2,
    label: 'Category name'
  },
  {
    id: 3,
    label: 'Created At'
  },
  {
    id: 3,
    label: 'Action'
  }
];
const Brand = () => {
  const { data: dataBrand } = useSelector((state) => state.brand.getBrand);
  const [openCategory, setOpenCategory] = useState(false);
  const [openUpdateCategory, setOpenUpdateCategory] = useState(false);
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
  const handleDelete = (id) => {
    dispatch(actionDeleteBrand(id)).then((res) => {
      if (res?.payload?.success) {
        dispatch(actionGetBrand());
      }
    });
  };

  const handleUpdate = (id) => {
    dispatch(actionGetDesBrand(id)).then((res) => {
      if (res?.payload?.success) {
        setOpenUpdateCategory(true);
        setId(id);
      }
    });
  };
  useEffect(() => {
    dispatch(actionGetBrand());
  }, []);
  console.log(dataBrand);
  return (
    <div className="flex container flex-col gap-10 items-start">
      <button onClick={() => setOpenCategory(true)} className="mr-10 px-5 py-1.5 text-white font-semibold rounded-lg bg-primary-8">
        Create Category
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
            {openCategory && <DialogCreateBrand open={openCategory} setOpen={setOpenCategory} />}
            <TableBody>
              {dataBrand?.brands?.length > 0 ? (
                dataBrand?.brands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <>
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          <p className='className="max-w-[200px] min-w-max'>{row?.title}</p>
                        </TableCell>
                        <TableCell align="center">{DateFormat(row?.createdAt)}</TableCell>

                        <TableCell align="center">
                          <div className="flex gap-3 items-center justify-center">
                            <Button onClick={() => handleDelete(row?._id)} color="error" variant="outlined" startIcon={<DeleteIcon />}>
                              Delete
                            </Button>
                            <Button onClick={() => handleUpdate(row?._id)} variant="outlined" startIcon={<EditIcon />}>
                              edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {openUpdateCategory && <DialogFormUpdate open={openUpdateCategory} setOpen={setOpenUpdateCategory} id={id} />}
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
export default Brand;
