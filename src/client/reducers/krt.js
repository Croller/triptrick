import * as Constants from '../constants';

export default function reducer(krt = Constants.KRT, action) {
  switch (action.type) {
    case Constants.KRT_TABLE_SET:
      return {
        ...krt,
        data: { ...krt.data, ...action.obj },
        loading: false,
      };
    case Constants.KRT_SUPPORT_DATA_SET:
      return {
        ...krt,
        supoortData: { ...krt.supoortData, ...action.obj },
        loading: false,
      };
    case Constants.KRT_ERROR_SET:
      return {
        ...krt,
        error: { ...action.obj },
        loading: false,
      };
    case Constants.KRT_LOADING_SET:
      return {
        ...krt,
        loading: action.obj,
        error: null,
      };
    default:
      return krt;
  }
}
