import React, { useState, useEffect, useRef } from 'react';
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
  onBlur,
  className = '',
}) => {
  const ref = useRef();
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

  const handleBlur = () => {
    onBlur(val);
  };

  const handleFocus = () => {
    ref.current.focus();
  };

  useEffect(() => {
    if (val !== value) {
      setVal(value || '');
    }
  }, [value]);

  return (
    <Wrapper className={className} onClick={handleFocus}>
      {label && (
        <Label htmlFor="control">
          {label}
          :
        </Label>
      )}
      {prefix && (
        <Prefix label={label}>
          {prefix}
        </Prefix>
      )}
      <Control
        ref={ref}
        name="control"
        autoComplete="off"
        type={type}
        value={val}
        prefix={prefix}
        suffix={showClear}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {showClear && val.length > 0 && (
        <Suffix label={label}>
          <CloseCircleRegSvg onClick={handleClear} />
        </Suffix>
      )}
    </Wrapper>
  );
};
