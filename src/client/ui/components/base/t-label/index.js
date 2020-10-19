import React from 'react';
import {
  Wrapper,
} from './styled';

export const Label = ({
  className = '',
  children,
}) => (
  <Wrapper className={`t-label ${className}`}>
    {children}
  </Wrapper>
);
