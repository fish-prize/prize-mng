import {
  PRIZE_GOODS_DATASOURCE_REQUEST,
  PRIZE_GOODS_DATASOURCE_FAILURE,
  PRIZE_GOODS_DATASOURCE_SUCCESS,
} from './constants';

const initialState = {};

function prizeGoodsDataSourceReducer(state = initialState, action) {
  switch (action.type) {
    case PRIZE_GOODS_DATASOURCE_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case PRIZE_GOODS_DATASOURCE_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        ...action.payload,
      });
    case PRIZE_GOODS_DATASOURCE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        ...action.payload,
      });
    default:
      return state;
  }
}

export default prizeGoodsDataSourceReducer;
