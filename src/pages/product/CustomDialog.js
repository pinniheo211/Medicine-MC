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
import CustomAutocomplete from 'components/Mui/CustomAutoComplete';

export default function DialogProduct({ open, setOpen, userId }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { data: dataCategory } = useSelector((state) => state.category.getCategory);
  const { data: dataBrand } = useSelector((state) => state.brand.getBrand);
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
      title: null,
      price: null,
      brand: null,
      description: null,
      category: null
      // image: null,
      // description: null
    },
    resolver: yupResolver(SCHEMA_NEW_PRODUCT)
  });
  const handleNew = (data) => {
    const dataNew = new FormData();
    dataNew.append('title', data?.title);
    dataNew.append('price', data?.price);
    dataNew.append('brand', data?.brand?._id);
    dataNew.append('category', data?.category?._id);
    dataNew.append('description', data?.description);
    dataNew.append('images', file);

    dispatch(actionAddNewProduct(dataNew)).then((res) => {
      if (res?.payload?.success) {
        dispatch(actionGetProduct()).then((res) => {
          if (res?.payload?.success) {
            setOpen(false);
          }
        });
      }
    });
  };
  console.log(dataBrand?.brands);
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
              <div className="flex items-center gap-5">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <CustomAutocomplete
                      fullWidth
                      options={dataCategory?.productCategories || []}
                      id="autocomplete-custom-ward"
                      getOptionLabel={(option) => option.title || ''}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Category"
                          error={Boolean(errors.category)}
                          helperText={errors.category?.message || ''}
                        />
                      )}
                      {...field}
                      onChange={(_, option) => {
                        field.onChange(option);
                      }}
                    />
                  )}
                />
                <Controller
                  name="brand"
                  control={control}
                  render={({ field }) => (
                    <CustomAutocomplete
                      fullWidth
                      options={dataBrand?.brands || []}
                      id="autocomplete-custom-ward"
                      getOptionLabel={(option) => option.title || ''}
                      renderInput={(params) => (
                        <TextField {...params} label="Brand" error={Boolean(errors.brand)} helperText={errors.brand?.message || ''} />
                      )}
                      {...field}
                      onChange={(_, option) => {
                        field.onChange(option);
                      }}
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
