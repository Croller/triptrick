import React, { useState, useEffect, useRef } from 'react';
import { CircleLightSvg, DotCircleLightSvg } from 'client/assets/images';
import {
  Group,
  GroupLabel,
  GroupContainer,
  Error,
  Label,
  Container,
  IconBlock,
  Text,
  Control,
} from './styled';

export const RadioGroup = ({
  name = null,
  label = null,
  defaulValue,
  children,
  direction = 'column',
  required = false,
  disabled = false,
  error = 'Required field',
  onChange = () => {},
  // onBlur = () => {},
  className = '',
}) => {
  const [val, setVal] = useState(null);

  const handleChange = (value) => {
    if (!disabled) {
      setVal(value);
      onChange(name ? { [name]: value } : value);
    }
  };

  useEffect(() => {
    if (defaulValue) {
      setVal(defaulValue);
    }
  }, [defaulValue]);

  return (
    <Group className={`t-radio-group ${className}`}>
      {label && (
        <GroupLabel className="t-radio-group-label">
          {label}
        </GroupLabel>
      )}
      <GroupContainer
        className="t-radio-group-container"
        direction={direction}
        label={label}
      >
        {children && children.map((child) => React.cloneElement(child, {
          onClick: () => handleChange(child.props.value),
          checked: val === child.props.value,
          disabled,
        }))}
      </GroupContainer>
      {required && error && !val && (
        <Error>{error}</Error>
      )}
    </Group>
  ); 
};

export const Radio = ({
  children,
  checked = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  const ref = useRef();
  return (
    <Label
      className={`t-radio ${className}`}
      htmlFor="control"
      onClick={onClick}
      disabled={disabled}
    >
      <Container>
        <Control
          ref={ref}
          name="control"
          autoComplete="off"
          className="t-radio-input" 
          type="checkbox"
          value={checked}
        /> 
        <IconBlock className="t-radio-icon" status={checked}>
          {checked ? (
            <DotCircleLightSvg />
          ) : (
            <CircleLightSvg />
          )}
        </IconBlock>
      </Container>
      {children && (
        <Text className="t-radio-label">{children}</Text>
      )}
    </Label>
  );
};
