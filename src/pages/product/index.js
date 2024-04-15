import DataTable from 'components/Mui/DataTable';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetProduct } from 'store/reducers/product';
const Product = () => {
  const dispatch = useDispatch();
  const [dataProduct, setDataProduct] = useState([]);
  const columns = [
    {
      id: 1,
      label: 'STT'
    },
    {
      id: 2,
      label: 'Product Name'
    },
    {
      id: 3,
      label: 'Catregory'
    },
    {
      id: 4,
      label: 'Description'
    },
    {
      id: 5,
      label: 'Image'
    },
    {
      id: 6,
      label: 'Price'
    },

    {
      id: 7,
      label: 'Create At'
    }
  ];
  useEffect(() => {
    dispatch(actionGetProduct()).then((res) => {
      if (res?.payload?.err === 0) {
        setDataProduct(res?.payload?.productData?.rows);
      }
    });
  }, []);
  return <DataTable data={dataProduct} columns={columns} />;
};

export default Product;
