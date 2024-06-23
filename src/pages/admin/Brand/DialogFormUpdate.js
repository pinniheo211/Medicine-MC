import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import UploadImage from 'components/UploadImage';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { CurrencyNumericFormat } from 'components/Mui/NumericFormat';
import { yupResolver } from '@hookform/resolvers/yup';
import { SCHEMA_BRAND, SCHEMA_CATEGORY, SCHEMA_NEW_PRODUCT } from 'utils/schema';
import { useEffect, useState } from 'react';
import { actionGetDetailProduct, actionGetProduct, actionUpdateProduct } from 'store/reducers/product';
import CustomAutocomplete from 'components/Mui/CustomAutoComplete';
import { DeleteOutlined } from '@ant-design/icons';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { actionGetCategory, actionUpdateCategory } from 'store/reducers/category';
import { actionGetBrand, actionUpdateBrand } from 'store/reducers/brand';

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

export default function DialogFormUpdate({ open, setOpen, id }) {
  const dispatch = useDispatch();
  const { data: dataDesBrand } = useSelector((state) => state.brand.getDesBrand);
  const handleClose = () => {
    setOpen(false);
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: null
    },
    resolver: yupResolver(SCHEMA_BRAND)
  });
  const handleNew = (data) => {
    const dataForm = {
      id: id,
      body: data
    };
    dispatch(actionUpdateBrand(dataForm)).then((res) => {
      if (res?.payload?.success) {
        setOpen(false);
        dispatch(actionGetBrand());
      }
    });
  };
  useEffect(() => {
    if (dataDesBrand) {
      setValue('title', dataDesBrand?.brand?.title);
    }
  }, []);

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
          Update Category
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
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={Boolean(errors.title)}
                      helperText={errors.title?.message || ''}
                      label="Product Name"
                    />
                  )}
                />
              </div>
            </div>
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
