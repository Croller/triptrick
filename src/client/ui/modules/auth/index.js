import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signIn, auth, getTableByNames } from 'client/actions/global';
import { getLocalStorage, setLocalStorage } from 'client/utils/common';
import {
  Wrapper,
  LoginWrapper,
  Login,
  Password,
  SignIn,
} from './styled';

export const AuthModule = () => {
  const rootDispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState({ login: '', password: '' });
  const { user } = useSelector((state) => state.global);
  const token = getLocalStorage('tt', true);

  // login: 'adminTriptrick',
  // password: '!Triptrick2020',

  const signin = () => {
    rootDispatch(signIn(data));
  };

  useEffect(() => {
    if (!user && token) {
      rootDispatch(auth({ token }));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setLocalStorage('tt', user.token, true);
      rootDispatch(getTableByNames([
        'data_users',
        'dictionary_roles',
        'description_data_users',
        'description_dictionary_roles',
      ]));
      history.push('/');
    }
  }, [user]);

  return (
    <Wrapper>
      <LoginWrapper>
        <Login name="login" label="Логин" onChange={obj => setData({ ...data, ...obj })} />
        <Password name="password" label="Пароль" type="password" onChange={obj => setData({ ...data, ...obj })} />
        <SignIn onClick={signin}>
          Войти
        </SignIn>
      </LoginWrapper>
    </Wrapper>
  );
};

