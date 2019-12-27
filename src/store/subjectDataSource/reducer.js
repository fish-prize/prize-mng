import {
  SUBJECT_DATASOURCE_REQUEST,
  SUBJECT_DATASOURCE_FAILURE,
  SUBJECT_DATASOURCE_SUCCESS,
} from './constants';

const initialState = {};

function subjectDataSourceReducer(state = initialState, action) {
  switch (action.type) {
    case SUBJECT_DATASOURCE_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case SUBJECT_DATASOURCE_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        ...action.payload,
      });
    case SUBJECT_DATASOURCE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        ...action.payload,
      });
    default:
      return state;
  }
}

export default subjectDataSourceReducer;
