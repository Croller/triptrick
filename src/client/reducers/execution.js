import * as Constants from '../constants';

export default function reducer(exec = Constants.EXECUTION, action) {
  switch (action.type) {
    case Constants.EXECUTION_TABLE_SET:
      return {
        ...exec,
        tables: { ...exec.tables, ...action.obj.table },
        loading: false,
      };
    case Constants.EXECUTION_DIC_SET:
      return {
        ...exec,
        dictionary: { ...exec.dictionary, ...action.obj },
        loading: false,
      };
    case Constants.EXECUTION_STAT_SET:
      return { ...exec, ...action.obj };
    default:
      return exec;
  }
}
