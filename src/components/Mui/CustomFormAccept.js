import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { actionDeleteProduct, actionGetProduct } from 'store/reducers/product';
import { useDispatch, useSelector } from 'react-redux';

const CustomFormAccept = ({ open, setOpen, title, description, handleAgree }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  // const handleDelete = () => {
  //   dispatch(actionDeleteProduct(id)).then((res) => {
  //     if (res?.payload?.err === 0) {
  //       dispatch(actionGetProduct(userId));
  //     }
  //     setOpen(false);
  //   });
  // };

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button autoFocus onClick={handleAgree}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomFormAccept;
