import { Paper, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Button, TableBody } from '../../../node_modules/@mui/material/index';
export const columns = [
  {
    id: 1,
    label: 'STT'
  },
  {
    id: 2,
    label: 'Code'
  },
  {
    id: 3,
    label: 'From'
  },
  {
    id: 4,
    label: 'To'
  },

  {
    id: 6,
    label: 'Contact'
  },
  {
    id: 7,
    label: 'Create At'
  },
  {
    id: 8,
    label: 'Status'
  }
];
const WarehouseReceipt = () => {
  return (
    <div className="flex container flex-col gap-10 items-start">
      <button className="mr-10 px-5 py-1.5 text-white font-semibold rounded-lg bg-primary-8">Create Warehouse Receipt</button>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell align="center">
                    <p className="min-w-max">{column.label}</p>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {dataWarehouse?.warehouses?.length > 0 ? (
                dataWarehouse?.warehouses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <>
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row?.name}</TableCell>
                        <TableCell align="center">{row?.phone}</TableCell>
                        <TableCell align="center">
                          <p className="min-w-[150px]">{row?.address}</p>
                        </TableCell>
                        <TableCell align="center">
                          <p className="min-w-[200px]">{DateFormat(row?.createdAt)}</p>
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex w-full justify-center gap-3 items-center">
                            <Button onClick={() => handleDeleteWarehouse(row?._id)} variant="outlined" startIcon={<DeleteIcon />}>
                              Delete
                            </Button>
                            <Button onClick={() => handleUpdateWarehouse(row?._id)} variant="outlined" startIcon={<EditIcon />}>
                              edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {open && <DialogUpdateWarehouse open={open} setOpen={setOpen} id={id} />}
                    </>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={12} align="center">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                      }}
                    >
                      Empty Data
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody> */}
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataWarehouse?.warehouses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </div>
  );
};

export default WarehouseReceipt;
