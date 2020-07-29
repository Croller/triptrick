import * as Constants from '../constants';

export default function reducer(user = Constants.USER, action) {
  switch (action.type) {
    case Constants.USER_SET:
      return { ...user, ...action.obj };
    default:
      return user;
  }
}
