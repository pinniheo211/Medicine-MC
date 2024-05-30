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
import { useSelector } from 'react-redux';
import { CurrencyNumericFormat } from 'components/Mui/NumericFormat';
import { yupResolver } from '@hookform/resolvers/yup';
import { SCHEMA_NEW_PRODUCT } from 'utils/schema';
import { useEffect, useState } from 'react';
import { actionGetDetailProduct, actionGetProduct, actionUpdateProduct } from 'store/reducers/product';
import CustomAutocomplete from 'components/Mui/CustomAutoComplete';
import { DeleteOutlined } from '@ant-design/icons';

export default function DialogUpdateForm({ open, setOpen, id }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState([]);
  const [image, setImage] = useState([]);

  const { data: dataDetailProduct } = useSelector((state) => state.product.detailProduct);
  const { data: dataCategory } = useSelector((state) => state.category.getCategory);
  const { data: dataBrand } = useSelector((state) => state.brand.getBrand);
  const handleClose = () => {
    setOpen(false);
  };
  console.log(dataDetailProduct);

  const {
    control,
    setValue,
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
    dataNew.append('brand', data?.brand);
    dataNew.append('description', data?.description);
    dataNew.append('slug', data?.slug);
    const dataForm = {
      id: id,
      body: {
        title: data?.title,
        price: data?.price,
        brand: data?.brand,
        description: data?.description
      }
    };
    dispatch(actionUpdateProduct(dataForm)).then((res) => {
      setOpen(false);
      if (res?.payload?.success) {
        setOpen(false);
        dispatch(actionGetProduct());
      }
    });
  };
  useEffect(() => {
    if (dataDetailProduct) {
      setValue('title', dataDetailProduct?.productData?.title);
      setValue('brand', dataDetailProduct?.productData?.brand);
      setValue('category', dataDetailProduct?.productData?.category);
      setValue('description', dataDetailProduct?.productData?.description);
      setValue('price', dataDetailProduct?.productData?.price);
      setValue('slug', dataDetailProduct?.productData?.slug);
      setImage(dataDetailProduct?.productData?.images);
    }
  }, []);

  console.log(dataDetailProduct?.productData?.images);

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
          Update Product
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
              {dataDetailProduct?.productData?.images?.map((img, index) => {
                return (
                  <div className="w-full flex flex-col gap-3">
                    <div className="rounded-lg shadow border p-3 flex justify-between items-center">
                      <img src={img} alt="image" className="w-[50px]" />
                      <DeleteOutlined />
                    </div>
                  </div>
                );
              })}
              {/* <UploadImage setFile={setFile} file={file} image={image} /> */}
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
