import React, { useState, useEffect, useRef } from 'react';
import { CircleLightSvg, DotCircleLightSvg } from 'client/assets/images';
import {
  Group,
  GroupLabel,
  GroupContainer,
  Label,
  Container,
  IconBlock,
  Text,
  Control,
} from './styled';

export const RadioGroup = ({
  label = null,
  defaulValue,
  children,
  direction = 'column',
  className = '',
  onChange,
}) => {
  const [val, setVal] = useState();

  const handleChange = (value) => {
    setVal(value);
    onChange(value);
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
        }))}
      </GroupContainer>
    </Group>
  ); 
};

export const Radio = ({
  children,
  checked = false,
  onClick,
  className = '',
}) => {
  const ref = useRef();
  return (
    <Label className={`t-radio ${className}`} htmlFor="control" onClick={onClick}>
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
