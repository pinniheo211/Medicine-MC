import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import UploadImage from 'components/UploadImage';
import { useDispatch } from 'react-redux';
import { actionAddNewProduct, actionGetProduct } from 'store/reducers/product';
import { useSelector } from 'react-redux';
import { CurrencyNumericFormat } from 'components/Mui/NumericFormat';
import { yupResolver } from '@hookform/resolvers/yup';
import { SCHEMA_NEW_PRODUCT } from 'utils/schema';
import { useState } from 'react';
import LoaderStyleOne from 'components/LoadingComponent';

export default function DialogProduct({ open, setOpen, userId }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { data: dataProfile } = useSelector((state) => state.auth.user);
  const handleClose = () => {
    setOpen(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: null,
      price: null,
      available: null,
      category_code: null,
      image: null,
      description: null
    },
    resolver: yupResolver(SCHEMA_NEW_PRODUCT)
  });
  const handleNew = (data) => {
    const dataNew = new FormData();
    dataNew.append('name', data?.name);
    dataNew.append('price', data?.price);
    dataNew.append('available', data?.available);
    dataNew.append('category_code', data?.category_code);
    dataNew.append('description', data?.description);
    dataNew.append('userId', dataProfile?.userData?.userId);
    dataNew.append('image', file);
    dispatch(actionAddNewProduct(dataNew)).then((res) => {
      if (res?.payload?.err === 0) {
        setOpen(false);
        dispatch(actionGetProduct(userId)).then((res) => {
          if (res?.payload?.err === 0) {
            setOpen(false);
          }
        });
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
          Add New Product
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
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message || ''}
                      label="Warehouse Name"
                    />
                  )}
                />
                <Controller
                  name="available"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={Boolean(errors.available)}
                      helperText={errors.available?.message || ''}
                      label="Available"
                    />
                  )}
                />
              </div>
              <div className="flex items-center gap-5">
                <Controller
                  name="category_code"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={Boolean(errors.category_code)}
                      helperText={errors.category_code?.message || ''}
                      label="Category"
                    />
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      InputProps={{
                        inputComponent: CurrencyNumericFormat
                      }}
                      fullWidth
                      error={Boolean(errors.price)}
                      helperText={errors.price?.message || ''}
                      label="Price"
                    />
                  )}
                />
              </div>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    row={20}
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message || ''}
                    label="Description"
                  />
                )}
              />
              <UploadImage setFile={setFile} />
            </div>
            <div className="text-right mt-10">
              <button className="min-w-[100px] disabled:cursor-not-allowed disabled:bg-slate-600 rounded-lg bg-qh2-green py-1.5 text-white">
                submit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
