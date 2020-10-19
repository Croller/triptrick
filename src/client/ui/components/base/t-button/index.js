import React from 'react';
import {
  Group,
  Wrapper,
} from './styled';

export const ButtonGroup = ({
  children,
  className = '',
}) => (
  <Group className={`t-button-group ${className}`}>{children}</Group>
);

export const Button = ({
  type = 'button',
  color = null,
  disabled = false,
  children,
  className = '',
}) => (
  <Wrapper
    type={type}
    className={`t-button ${className}`}
    disabled={disabled}
    color={color}
  >
    {children}
  </Wrapper>
);
