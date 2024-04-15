// material-ui

import DataTable from 'components/Mui/DataTable';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionGetProduct } from 'store/reducers/product';

const WarehousePage = () => {
  return <DataTable />;
};

export default WarehousePage;
