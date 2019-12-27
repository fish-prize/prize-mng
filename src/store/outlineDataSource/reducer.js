import {
  OUTLINE_DATASOURCE_REQUEST,
  OUTLINE_DATASOURCE_FAILURE,
  OUTLINE_DATASOURCE_SUCCESS,
} from './constants';

const initialState = {};

function outlineDataSourceReducer(state = initialState, action) {
  switch (action.type) {
    case OUTLINE_DATASOURCE_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case OUTLINE_DATASOURCE_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        ...action.payload,
      });
    case OUTLINE_DATASOURCE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        ...action.payload,
      });
    default:
      return state;
  }
}

export default outlineDataSourceReducer;
