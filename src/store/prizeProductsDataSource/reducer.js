import {
  PRIZE_PRODUCTS_DATASOURCE_REQUEST,
  PRIZE_PRODUCTS_DATASOURCE_FAILURE,
  PRIZE_PRODUCTS_DATASOURCE_SUCCESS,
} from './constants';

const initialState = {};

function prizeProductsDataSourceReducer(state = initialState, action) {
  switch (action.type) {
    case PRIZE_PRODUCTS_DATASOURCE_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case PRIZE_PRODUCTS_DATASOURCE_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        ...action.payload,
      });
    case PRIZE_PRODUCTS_DATASOURCE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        ...action.payload,
      });
    default:
      return state;
  }
}

export default prizeProductsDataSourceReducer;
