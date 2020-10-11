import React, { useState, useEffect, useRef } from 'react';
import { CloseCircleLightSvg } from 'client/assets/images';
import {
  Group,
  GroupLabel,
  GroupContainer,
  Separator,
  Wrapper,
  Label,
  Container,
  Control,
  Prefix,
  Suffix,
} from './styled';

const setSeparator = (array, sep) => array.reduce((childrens, child, c) => {
  if (sep && array.length !== c + 1) {
    return [
      ...childrens,
      React.cloneElement(child, { ...child.props, key: `_input_range_${c + 1}` }),
      React.cloneElement(sep, { key: `_separator_range_${c + 1}` }),
    ];
  }
  return [...childrens, React.cloneElement(child, { ...child.props, key: `_input_${sep ? 'range' : 'group'}_${c + 1}` })];
}, []);

const groupFunc = (
  label,
  children,
  separator,
  className,
) => ((
  <Group className={`t-input-range ${className}`}>
    {label && (
      <GroupLabel className="t-input-range-label">
        {label}
      </GroupLabel>
    )}
    <GroupContainer
      className="t-input-range-container"
      label={label}
      separator={separator}
    >
      {setSeparator(children, separator)}
    </GroupContainer>
  </Group>
));

const SetSeparator = (separator) => (
  <Separator>
    {separator || '-'}
  </Separator>
);

export const InputRange = ({
  label = null,
  separator = null,
  children,
  className = '',
}) => (groupFunc(label, children, SetSeparator(separator), className));

export const InputGroup = ({
  label = null,
  children,
  className = '',
}) => (groupFunc(label, children, null, className));

export const Input = ({
  type = 'text',
  label = null,
  defaultValue = '',
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
    if (val !== defaultValue && defaultValue !== null && defaultValue !== undefined) {
      setVal(defaultValue || '');
    }
  }, [defaultValue]);

  return (
    <Wrapper
      className={`t-input-wrapper ${className}`}
      onClick={handleFocus}
    >
      {label && (
        <Label className="t-input-label" htmlFor="control">
          {label}
          :
        </Label>
      )}
      <Container>
        {prefix && (
          <Prefix className="t-input-prefix" label={label}>
            {prefix}
          </Prefix>
        )}
        <Control
          ref={ref}
          name="control"
          autoComplete="off"
          className="t-input-control" 
          type={type}
          value={val}
          prefix={prefix}
          suffix={showClear}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {showClear && val.length > 0 && (
          <Suffix className="t-input-suffix" label={label}>
            <CloseCircleLightSvg onClick={handleClear} />
          </Suffix>
        )}
      </Container>
    </Wrapper>
  );
};
