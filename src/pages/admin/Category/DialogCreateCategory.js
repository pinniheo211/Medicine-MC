import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { actionAddNewProduct, actionGetProduct } from 'store/reducers/product';
import { useSelector } from 'react-redux';
import { CurrencyNumericFormat } from 'components/Mui/NumericFormat';
import { yupResolver } from '@hookform/resolvers/yup';
import { SCHEMA_CATEGORY, SCHEMA_NEW_PRODUCT } from 'utils/schema';
import { useState } from 'react';
import CustomAutocomplete from 'components/Mui/CustomAutoComplete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { actionCreateCategory, actionGetCategory } from 'store/reducers/category';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

export default function DialogCreateCateogy({ open, setOpen }) {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: null
    },
    resolver: yupResolver(SCHEMA_CATEGORY)
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleNew = (data) => {
    dispatch(actionCreateCategory(data)).then((res) => {
      if (res?.payload?.success) {
        setOpen(false);
        dispatch(actionGetCategory());
      }
    });
  };

  return (
    <>
      <Dialog
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '1000px'
            }
          }
        }}
        onClose={handleClose}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          New Category
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form onSubmit={handleSubmit(handleNew)}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message || ''}
                  label="Category Name"
                />
              )}
            />

            <div className="text-right mt-10">
              <button className="min-w-[100px] disabled:cursor-not-allowed disabled:bg-slate-600 rounded-lg bg-primary-8 py-1.5 text-white">
                submit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
