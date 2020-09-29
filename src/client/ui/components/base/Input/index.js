import React, { useState, useEffect } from 'react';
import { CloseCircleRegSvg } from 'client/assets/images';
import {
  Wrapper,
  Label,
  Control,
  Prefix,
  Suffix,
} from './styled';

export const Input = ({
  type = 'text',
  label = null,
  value,
  prefix = null,
  showClear = false,
  onChange,
  className = '',
}) => {
  const [val, setVal] = useState('');

  const handleChange = (e) => {
    const str = e.target.value;
    setVal(str);
    onChange(str);
  };

  const handleClear = () => {
    setVal('');
    onChange('');
  };

  useEffect(() => {
    if (val !== value) {
      setVal(value || '');
    }
  }, [value]);

  return (
    <Wrapper className={className}>
      {label && (
        <Label htmlFor="control">
          {label}
          :
        </Label>
      )}
      <Control
        name="control"
        autoComplete="off"
        type={type}
        value={val}
        prefix={prefix}
        suffix={showClear}
        onChange={handleChange}
      />
      {prefix && (
        <Prefix label={label}>
          {prefix}
        </Prefix>
      )}
      {showClear && (
        <Suffix label={label}>
          <CloseCircleRegSvg onClick={handleClear} />
        </Suffix>
      )}
    </Wrapper>
  );
};
