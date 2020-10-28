
import { post } from 'client/utils/dataProviders/common';
import * as Constants from '../constants';

export const setTable = obj => ({
  type: Constants.KRT_TABLE_SET,
  obj,
});

export const setSupportData = obj => ({
  type: Constants.KRT_SUPPORT_DATA_SET,
  obj,
});

export const setError = obj => ({
  type: Constants.KRT_ERROR_SET,
  obj,
});

export const setLoading = obj => ({
  type: Constants.KRT_LOADING_SET,
  obj,
});

export const getKrtMonitoring = (arr) => async (dispatch) => {
  dispatch(setLoading(true));
  const results = await post('table/get', { names: arr });
  if (results.status === 200 && !results.data.error) {
    dispatch(setTable(results.data));
  } else {
    dispatch(setError(results.data.error));
  }
};

export const getTableByName = (arr) => async (dispatch) => {
  dispatch(setLoading(true));
  const results = await post('table/get', { names: arr });
  if (results.status === 200 && !results.data.error) {
    dispatch(setSupportData(results.data));
  } else {
    dispatch(setError(results.data.error));
  }
};

