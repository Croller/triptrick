
import * as Constants from '../constants';

export const getDescriprion = obj => ({
  type: Constants.USER_SET,
  obj,
});

export const get = obj => (dispatch) => {
  dispatch(setUser({ error: null, loading: true }));
  axios.post('/api/user/signin', obj)
    .then((res) => {
      if (res.status === 200 && res.data.error === null) {
        const storage = { ...res.data, loading: false, enterAt: moment() };
        localStorage.setItem('apr_isgz', JSON.stringify(storage));
        dispatch(setUser(storage));
      }
    })
    .catch((err) => {
      const error = {
        name: 'server',
        code: err.request.status,
        text: err.message,
      };
      dispatch(setUser({ error, loading: false }));
    });
};

export const list = token => (dispatch) => {
  dispatch(setUser({ error: null, loading: true }));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  axios.get('/api/user/list', { ...config })
    .then((res) => {
      if (res.status === 200) {
        const arr = { ...res.data, loading: false };
        dispatch(setUser(arr));
      }
    })
    .catch((err) => {
      const { data } = err.response;
      dispatch(setUser({ error: data, loading: false }));
    });
};

export const create = (token, obj) => (dispatch) => {
  dispatch(setUser({ error: null, loading: true }));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  axios.post('/api/user/create', obj.userData, { ...config })
    .then((res) => {
      if (res.status === 200 && res.data.error === null) {
        dispatch(setUser({ loading: false }));
        if (obj.who === 'admin') dispatch(list(token));
      }
    })
    .catch((err) => {
      const error = {
        name: 'server',
        code: err.request.status,
        text: err.message,
      };
      dispatch(setUser({ error, loading: false }));
    });
};

export const edit = (token, obj) => (dispatch) => {
  dispatch(setUser({ error: null, loading: true }));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  axios.post('/api/user/edit', obj, { ...config })
    .then((res) => {
      if (res.status === 200 && res.data.error === null) {
        const storage = { ...res.data, loading: false, enterAt: moment() };
        localStorage.setItem('apr_isgz', JSON.stringify(storage));
        dispatch(setUser(storage));
        if (obj.who === 'admin') dispatch(list(token));
      }
    })
    .catch((err) => {
      const error = {
        name: 'server',
        code: err.request.status,
        text: err.message,
      };
      dispatch(setUser({ error, loading: false }));
    });
};

export const signout = obj => (dispatch) => {
  localStorage.removeItem('apr_isgz');
  dispatch(setUser({
    ...obj,
    token: null,
    error: null,
  }));
};
