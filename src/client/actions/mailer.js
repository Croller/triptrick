import axios from 'axios';
import * as Constants from '../constants';

export const setTable = obj => ({
  type: Constants.EXECUTION_TABLE_SET,
  obj,
});

export const setDictionary = obj => ({
  type: Constants.EXECUTION_DIC_SET,
  obj,
});

export const setState = obj => ({
  type: Constants.EXECUTION_STAT_SET,
  obj,
});

export const getTable = obj => (dispatch) => {
  dispatch(setState({ error: null, loading: true }));
  axios.post('/api/execution/table', obj)
    .then((res) => {
      if (res.status === 200 && !('error' in res.data)) {
        dispatch(setTable({ ...res.data }));
      } else {
        dispatch(setState({ ...res.data, loading: false }));
      }
    })
    .catch((err) => {
      const error = {
        name: 'server',
        code: err.request.status,
        text: err.message,
      };
      dispatch(setState({ ...{ error }, loading: false }));
    });
};

export const getDictionary = obj => (dispatch) => {
  dispatch(setState({ error: null, loading: true }));
  axios.post('/api/execution/dictionary', obj)
    .then((res) => {
      if (res.status === 200 && !('error' in res.data)) {
        dispatch(setDictionary({ ...res.data }));
      } else {
        dispatch(setState({ ...res.data, loading: false }));
      }
    })
    .catch((err) => {
      const error = {
        name: 'server',
        code: err.request.status,
        text: err.message,
      };
      dispatch(setState({ ...{ error }, loading: false }));
    });
};
