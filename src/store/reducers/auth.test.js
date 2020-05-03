import auth from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('authReducer', ()=>{
  it('should return the initial state', ()=> {
    expect(auth(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      redirectPath: '/',
    });
  });

  it('should store the token upon login', ()=> {
    expect(auth(undefined, {type: actionTypes.AUTH_SUCCESS, idToken: 'someToken', localId: 'userId'})).toEqual({
      token: 'someToken',
      userId: 'userId',
      error: null,
      loading: false,
      redirectPath: '/',
    });
  });
});
