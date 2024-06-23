import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const SCHEMA_REGISTER = Yup.object().shape({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required').max(250, 'Email cannot exceed 250 characters'),
  mobile: Yup.string().required('required').matches(phoneRegExp, 'Mobile number is not valid').min(10, 'too short').max(10, 'too long'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

export const SCHEMA_LOGIN = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required').max(250, 'Email cannot exceed 250 characters'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

export const SCHEMA_FORGOT = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required').max(250, 'Email cannot exceed 250 characters')
});

export const SCHEMA_RESET = Yup.object().shape({
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

// export const SCHEMA_NEW_PRODUCT = Yup.object().shape({
//   name: Yup.string().required('Product name is required'),
//   price: Yup.number().required('Price is required'),
//   available: Yup.number().required('Available is required'),
//   category_code: Yup.string().required('Category is required'),
//   description: Yup.string().required('Description is required')
// });

export const SCHEMA_NEW_PRODUCT = Yup.object().shape({
  title: Yup.string().required('Product name is required'),
  price: Yup.number().required('Price is required'),
  brand: Yup.object().required('Brand is required'),
  category: Yup.object().required('Category is required')
});

export const SHCEMA_INVENTORY = Yup.object().shape({
  warehouseId: Yup.object().required('Warehouse is required'),
  month: Yup.string().required('Month is required'),
  year: Yup.string().required('Year is required')
});

export const SCHEMA_NEWWAREHOUSE = Yup.object().shape({
  name: Yup.string().required('Warehouse name is required'),
  phone: Yup.string().required('required').matches(phoneRegExp, 'Phone number is not valid').min(10, 'too short').max(10, 'too long'),
  address: Yup.string().required('Address is required')
});

export const SCHEMA_IMPORTPRODUCT = Yup.object().shape({
  warehouseId: Yup.object().required('Warehouse is required'),
  product: Yup.array().required('Product is required'),
  address: Yup.string().required('Address is required')
});

export const SCHEMA_CATEGORY = Yup.object().shape({
  title: Yup.string().required('Category name is required')
});
