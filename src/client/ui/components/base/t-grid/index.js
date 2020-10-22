import React from 'react';
import {
  Wrapper,
} from './styled';

export const Grid = ({
  className = '',
  children,
}) => (
  <Wrapper className={`t-grid ${className}`}>
    {children}
  </Wrapper>
);
