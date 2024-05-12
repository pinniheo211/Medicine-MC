// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import auth from './auth';
import product from './product';
import warehouse from './warehouse';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, auth, product, warehouse });

export default reducers;
