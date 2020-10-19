import React from 'react';
import {
  Wrapper,
} from './styled';

export const Form = ({
  className = '',
  children,
  onSubmit = () => {},
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Wrapper
      className={`t-form ${className}`}
      onSubmit={handleSubmit}
    >
      {children}
    </Wrapper>
  );
};
