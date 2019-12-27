import {
  SERIES_DATASOURCE_REQUEST,
  SERIES_DATASOURCE_FAILURE,
  SERIES_DATASOURCE_SUCCESS,
} from './constants';

const initialState = {};

function seriesDataSourceReducer(state = initialState, action) {
  switch (action.type) {
    case SERIES_DATASOURCE_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case SERIES_DATASOURCE_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        ...action.payload,
      });
    case SERIES_DATASOURCE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        ...action.payload,
      });
    default:
      return state;
  }
}

export default seriesDataSourceReducer;
