import * as React from 'react';
import { useRef } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DateFormat from 'utils/format';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

export default function DescriptionExport({ open, setOpen }) {
  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'Print This Document',
    onAfterPrint: () => toast.success('Data saved with PDF')
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { data: dataExport } = useSelector((state) => state.warehouse.getDesExportProduct);
  console.log(dataExport);
  return (
    <BootstrapDialog
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '1000px'
          }
        }
      }}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Description Export Product
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
      <div ref={componentPDF} style={{ width: '100%' }}>
        <DialogContent dividers>
          <div className="flex items-start md:flex-row lg:flex-row flex-col gap-10 mb-10">
            <div className="w-full flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <p className="w-[120px]">From: </p>
                <p>{dataExport?.exportRecord?.warehouse?.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="w-[120px]">Activity type: </p>
                <p>Goods Receipt Note (GRN)</p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <p className="w-[120px]">To: </p>
                <p>{dataExport?.exportRecord?.warehouse?.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="w-[120px]">Create At: </p>
                <p>{DateFormat(dataExport?.exportRecord?.warehouse?.createdAt)}</p>
              </div>
            </div>
          </div>
          <div>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Product Name</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataExport?.exportRecord?.products?.map((rows) => {
                  return (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="center">{rows?.product?.title}</TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center">
                          <img className="w-[100px]" src={rows?.product?.images[0]} />
                        </div>
                      </TableCell>
                      <TableCell align="center">{rows?.quantity}</TableCell>
                      <TableCell align="center">{rows?.product?.price} đ</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </div>
      <DialogActions>
        <button onClick={generatePDF} className="my-5 mr-5 px-5 py-1.5 text-white font-semibold rounded-lg bg-primary-8">
          Print PDF
        </button>
      </DialogActions>
    </BootstrapDialog>
  );
}
