import React from 'react';
import {
  Wrapper,
} from './styled';

export const Tooltip = ({
  position = 'top',
  title = 'tooltip',
  trigger = 'mouseenter',
  arrow = true,
  animation = 'fade',
  className = '',
  children,
}) => (
  <Wrapper
    position={position}
    title={title}
    trigger={trigger}
    arrow={arrow}
    animation={animation}
    className={`t-tooltip ${className}`}
  >
    {children}
  </Wrapper>
);
