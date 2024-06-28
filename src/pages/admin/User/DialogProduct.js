import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import DateFormat from 'utils/format';
import { Paper } from '@mui/material';
import { Button } from '@mui/material';
import { actionDeleteProductByAdmin, actionGetProductById } from 'store/reducers/product';
import { actionGetAllUser } from 'store/reducers/auth';
import DeleteIcon from '@mui/icons-material/Delete';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen, userId }) {
  const dispatch = useDispatch();
  const { data: dataProduct } = useSelector((state) => state.product.getProductByUser);
  const handleClose = () => {
    setOpen(false);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteProductByAdmin = (id, userId) => {
    console.log(id, 'id');
    console.log(userId, 'userId');

    dispatch(actionDeleteProductByAdmin({ userId: userId, id: id })).then((res) => {
      dispatch(actionGetAllUser());
      setOpen(false);
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth={false}
      >
        <DialogTitle>{'Products'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TableContainer component={Paper} sx={{ maxHeight: 500, width: '100%' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell alignItem="center">Create At</TableCell>
                    <TableCell alignItem="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataProduct?.products?.length > 0 ? (
                    <>
                      {dataProduct?.products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((item, index) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <p className="w-[200px] line-clamp-3">{item?.title}</p>
                          </TableCell>
                          <TableCell>
                            <p className="w-[200px] line-clamp-4">{item?.description}</p>
                          </TableCell>
                          <TableCell>{item?.price}</TableCell>
                          <TableCell>{item?.category?.title}</TableCell>
                          <TableCell>{item?.brand?.title}</TableCell>
                          <TableCell>
                            <div className="w-[100px]">
                              <img className="w-full h-full" src={item?.images[0]} />
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="w-[200px]">{DateFormat(item?.createdAt)}</p>
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => handleDeleteProductByAdmin(item?._id, userId)}
                              color="error"
                              variant="outlined"
                              startIcon={<DeleteIcon color="error" />}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <div>No data</div>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={dataProduct?.products?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
