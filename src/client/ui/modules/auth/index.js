import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, auth, getTableByName } from 'client/actions/global';
import {
  Wrapper,
} from './styled';

export const AuthModule = () => {
  const rootDispatch = useDispatch();
  const { user, supoortData } = useSelector((state) => state.global);

  useEffect(() => {
    if (!user) {
      rootDispatch(signIn({
        login: 'adminTriptrick',
        password: '!Triptrick2020',
      }));
      rootDispatch(getTableByName([
        'dictionary_roles',
        'description_data_users',
        'description_dictionary_roles',
      ]));
    }
  }, []);

  useEffect(() => {
    if (user) {
      // console.log(user);
    }
    if (supoortData) {
      // console.log(supoortData);
    }
  }, [user, supoortData]);

  return (
    <Wrapper />
  );
};

