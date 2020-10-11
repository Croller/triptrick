import React, { useState, useEffect, useRef } from 'react';
import { CircleLightSvg, CheckCircleLightSvg } from 'client/assets/images';
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

export const CheckBoxGroup = ({
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
  const [val, setVal] = useState([]);

  const handleChange = (value) => {
    if (!disabled) {
      let eVal = [...val, value];
      const exist = val.some((v) => v === value);
      if (exist) {
        eVal = val.filter((v) => v !== value);
      }
      setVal(eVal);
      onChange(eVal);
    }
  };

  useEffect(() => {
    if (defaulValue && Array.isArray(defaulValue)) {
      setVal(defaulValue);
    }
  }, [defaulValue]);

  return (
    <Group className={`t-checkbox-group ${className}`}>
      {label && (
        <GroupLabel className="t-checkbox-group-label">
          {label}
        </GroupLabel>
      )}
      <GroupContainer
        className="t-checkbox-group-container"
        direction={direction}
        label={label}
      >
        {children && children.map((child) => React.cloneElement(child, {
          onClick: () => handleChange(child.props.value),
          checked: val.some((v) => v === child.props.value),
          disabled,
        }))}
      </GroupContainer>
      {required && error && val.length === 0 && (
        <Error>{error}</Error>
      )}
    </Group>
  ); 
};

export const CheckBox = ({
  children,
  checked = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  const ref = useRef();
  return (
    <Label
      className={`t-checkbox ${className}`}
      htmlFor="control"
      onClick={onClick}
      disabled={disabled}
    >
      <Container>
        <Control
          ref={ref}
          name="control"
          autoComplete="off"
          className="t-checkbox-input" 
          type="checkbox"
          value={checked}
        />
        <IconBlock className="t-checkbox-icon" status={checked}>
          {checked ? (
            <CheckCircleLightSvg />
          ) : (
            <CircleLightSvg />
          )}
        </IconBlock>
      </Container>
      {children && (
        <Text className="t-checkbox-label">{children}</Text>
      )}
    </Label>
  );
};
