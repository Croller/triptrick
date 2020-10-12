import React from 'react';
import {
  Group,
  Wrapper,
} from './styled';

export const ButtonGroup = ({
  children,
  className = '',
}) => (
  <Group className={className}>{children}</Group>
);

export const Button = ({
  color = null,
  disabled = false,
  children,
  className = '',
}) => (
  <Wrapper
    className={className}
    disabled={disabled}
    color={color}
  >
    {children}
  </Wrapper>
);
