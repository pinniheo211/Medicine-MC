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
import { SCHEMA_NEWWAREHOUSE } from 'utils/schema';
import { useEffect, useState } from 'react';
import { actionDoCreateWarehouse, actionGetWarehouse, actionUpdateWarehouse } from 'store/reducers/warehouse';
import { yupResolver } from '@hookform/resolvers/yup';

export default function DialogUpdateWarehouse({ open, setOpen, id }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { data: dataDesWarehouse } = useSelector((state) => state.warehouse.getDesWarehouse);
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
      name: null,
      address: null,
      phone: null
    },
    resolver: yupResolver(SCHEMA_NEWWAREHOUSE)
  });
  const handleUpdate = (data) => {
    const formData = {
      id: id,
      body: {
        name: data?.name,
        address: data?.address,
        phone: data?.phone
      }
    };
    dispatch(actionUpdateWarehouse(formData)).then((res) => {
      if (res?.payload?.success) {
        dispatch(actionGetWarehouse());
        setOpen(false);
      }
    });
  };

  useEffect(() => {
    setValue('name', dataDesWarehouse?.description?.name);
    setValue('address', dataDesWarehouse?.description?.address);
    setValue('phone', dataDesWarehouse?.description?.phone);
  }, []);

  return (
    <>
      <Dialog
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '500px'
            }
          }
        }}
        onClose={handleClose}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Update Warehouse
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
          <form onSubmit={handleSubmit(handleUpdate)}>
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
              </div>
              <div className="flex items-center gap-5">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth error={Boolean(errors.phone)} helperText={errors.phone?.message || ''} label="Phone" />
                  )}
                />
              </div>
            </div>
            <div className="text-right mt-10">
              <button className="min-w-[100px] disabled:cursor-not-allowed rounded-lg bg-primary-8 py-1.5 hover:-translate-y-1 transition-all duration-300 text-white">
                Update
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
