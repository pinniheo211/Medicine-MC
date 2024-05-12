import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { actionDeleteProduct, actionGetProduct } from 'store/reducers/product';
import { useDispatch } from 'react-redux';

const CustomFormAccept = ({ open, userId, setOpen, title, description, id, setDataProduct }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(actionDeleteProduct(id)).then((res) => {
      if (res?.payload?.err === 0) {
        dispatch(actionGetProduct(userId)).then((res) => {
          if (res?.payload?.err === 0) {
            setDataProduct(res?.payload?.productData?.rows);
          }
        });
      }
      setOpen(false);
    });
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button autoFocus onClick={handleDelete}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CustomFormAccept;
