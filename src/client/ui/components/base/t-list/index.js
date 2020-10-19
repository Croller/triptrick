import React from 'react';
import {
  Wrapper,
  Child,
} from './styled';

export const Item = ({
  className = '',
  children,
  onClick = () => {},
}) => (
  <Child
    className={`t-list-item ${className}`}
    onClick={onClick}
  >
    {children}
  </Child>
);

export const List = ({
  className = '',
  vertical = true,
  children,
}) => (
  <Wrapper
    className={`t-list ${className}`}
    vertical={vertical}
  >
    {children}
  </Wrapper>
);
