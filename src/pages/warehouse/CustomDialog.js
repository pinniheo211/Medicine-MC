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
import { useState } from 'react';
import { actionDoCreateWarehouse, actionGetWarehouse } from 'store/reducers/warehouse';
import { yupResolver } from '@hookform/resolvers/yup';

export default function DialogWarehouse({ open, setOpen, userId }) {
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
      warehouseName: null,
      address: null,
      phone: null,
      status: null
    },
    resolver: yupResolver(SCHEMA_NEWWAREHOUSE)
  });
  const handleNew = (data) => {
    const formData = {
      warehouseName: data?.warehouseName,
      address: data?.address,
      phone: data?.phone,
      status: 1,
      userId: dataProfile?.userData?.userId
    };
    dispatch(actionDoCreateWarehouse(formData)).then((res) => {
      if (res?.payload?.err === 0) {
        dispatch(actionGetWarehouse(dataProfile?.userData?.userId));
        setOpen(false);
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
              maxWidth: '500px'
            }
          }
        }}
        onClose={handleClose}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add New Warehouse
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
                  name="warehouseName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={Boolean(errors.warehouseName)}
                      helperText={errors.warehouseName?.message || ''}
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
