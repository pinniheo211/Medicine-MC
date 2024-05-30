import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { SCHEMA_IMPORTPRODUCT, SCHEMA_NEWWAREHOUSE } from 'utils/schema';
import { useState } from 'react';
import {
  actionDoCreateWarehouse,
  actionExportProduct,
  actionGetExport,
  actionGetWarehouse,
  actionImportProduct
} from 'store/reducers/warehouse';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomAutocomplete from 'components/Mui/CustomAutoComplete';

export default function DialogExport({ open, setOpen }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { data: dataWarehouse } = useSelector((state) => state.warehouse.getwarehouse);
  const { data: dataProduct } = useSelector((state) => state.product.getProduct);
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
      warehouseId: [],
      product: [],
      quantity: '',
      address: ''
    },
    resolver: yupResolver(SCHEMA_IMPORTPRODUCT)
  });
  const handleNew = (data) => {
    const product = data?.product?.map((item) => {
      return {
        product: item?._id,
        quantity: data?.quantity
      };
    });
    const formData = {
      warehouseId: data?.warehouseId?._id,
      products: product,
      address: data?.address
    };
    dispatch(actionExportProduct(formData)).then((res) => {
      if (res?.payload?.success) {
        debugger;
        dispatch(actionGetExport());
        setOpen(false);
      }
    });
  };
  console.log(dataProduct?.productDatas);
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
          Create a goods receiving note
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
                  name="warehouseId"
                  control={control}
                  render={({ field }) => (
                    <CustomAutocomplete
                      fullWidth
                      options={dataWarehouse?.warehouses || []}
                      id="autocomplete-custom-ward"
                      getOptionLabel={(option) => option.name || ''}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Warehouse"
                          error={Boolean(errors.warehouseId)}
                          helperText={errors.warehouseId?.message || ''}
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
                  name="product"
                  control={control}
                  render={({ field }) => (
                    <CustomAutocomplete
                      multiple
                      id="size-small-outlined-multi"
                      fullWidth
                      options={dataProduct?.productDatas || []}
                      getOptionLabel={(option) => option.title || ''}
                      renderInput={(params) => (
                        <TextField {...params} label="Product" error={Boolean(errors.product)} helperText={errors.product?.message || ''} />
                      )}
                      {...field}
                      onChange={(_, option) => {
                        field.onChange(option);
                      }}
                    />
                  )}
                />
              </div>

              <div className="flex items-center gap-3">
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={Boolean(errors.address)}
                      helperText={errors.address?.message || ''}
                      label="Address"
                    />
                  )}
                />
                <Controller
                  name="quantity"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={Boolean(errors.quantity)}
                      helperText={errors.quantity?.message || ''}
                      label="Quantity"
                    />
                  )}
                />
              </div>
            </div>
            <div className="text-right mt-10">
              <button className="min-w-[100px] disabled:cursor-not-allowed disabled:bg-slate-600 rounded-lg bg-primary-8 py-1.5 hover:-translate-y-1 transition-all duration-300 text-white">
                submit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
