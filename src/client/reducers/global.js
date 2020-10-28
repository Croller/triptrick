import * as Constants from '../constants';

export default function reducer(global = Constants.GLOBAL, action) {
  switch (action.type) {
    case Constants.GLOBAL_USER_SET:
      return {
        ...global,
        user: { ...action.obj },
        loading: false,
      };
    case Constants.GLOBAL_SUPPORT_DATA_SET:
      return {
        ...global,
        supoortData: { ...global.supoortData, ...action.obj },
        loading: false,
      };
    case Constants.GLOBAL_ERROR_SET:
      return {
        ...global,
        error: { ...action.obj },
        loading: false,
      };
    case Constants.GLOBAL_LOADING_SET:
      return {
        ...global,
        loading: action.obj,
        error: null,
      };
    default:
      return global;
  }
}
