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
import { SCHEMA_NEW_PRODUCT } from 'utils/schema';
import { useState } from 'react';
import CustomAutocomplete from 'components/Mui/CustomAutoComplete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
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

export default function DialogProduct({ open, setOpen, userId }) {
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    description: ''
  });
  const [filePreviews, setFilePreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews(previews);
    setFiles(selectedFiles);
    setValue('images', selectedFiles); // Setting files in react-hook-form
  };
  const { data: dataCategory } = useSelector((state) => state.category.getCategory);
  const { data: dataBrand } = useSelector((state) => state.brand.getBrand);
  const handleClose = () => {
    setOpen(false);
  };

  const {
    control,
    handleSubmit,
    register,
    setValue,
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
  console.log(payload);

  const handleDeleteImage = (index) => {
    const newPreviews = [...filePreviews];
    const newFiles = [...files];
    newPreviews.splice(index, 1);
    newFiles.splice(index, 1);
    setFilePreviews(newPreviews);
    setFiles(newFiles);
    setValue('images', newFiles); // Update react-hook-form value
  };
  const handleNew = (data) => {
    const dataNew = new FormData();
    dataNew.append('title', data?.title);
    dataNew.append('price', data?.price);
    dataNew.append('brand', data?.brand?._id);
    dataNew.append('category', data?.category?._id);
    dataNew.append('description', data?.description);
    files.forEach((file) => dataNew.append('images', file));
    dispatch(actionAddNewProduct(dataNew)).then((res) => {
      if (res?.payload?.success) {
        dispatch(actionGetProduct({ page: 1, limit: 10 })).then((res) => {
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

              <div className="flex flex-col gap-2 mt-8">
                <label className="font-semibold" htmlFor="products">
                  Upload Image of product
                </label>
                {/* <input
                  type="file"
                  accept="image/png, image/jpeg"
                  id="products"
                  className="px-10 py-1 rounded-lg bg-blue-500 text-white"
                  multiple
                  onChange={handleFileChange}
                /> */}
                <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                  Upload file
                  <VisuallyHiddenInput type="file" accept="image/png, image/jpeg" multiple onChange={handleFileChange} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {filePreviews.map((src, index) => (
                  <div className="relative group">
                    <img key={index} src={src} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded-lg shadow" />
                    <div className="absolute top-0 right-0  ">
                      <span className="text-rose-500 cursor-pointer" onClick={() => handleDeleteImage(index)}>
                        <CloseIcon />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* <UploadImage setFile={setFile} /> */}
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
