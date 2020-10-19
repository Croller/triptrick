import React, { useState, useEffect } from 'react';
import {
  Wrapper,
  Label,
  Container,
  SliderStyled,
  RangeStyled,
} from './styled';

export const Slider = ({
  name = null,
  label = null,
  defaulValue = null,
  min = 0,
  max = 100,
  step = 1,
  vertical = false,
  marks = null,

  multiple = false,
  disabled = false,
  onChange = () => {},
  className = '',
}) => {
  const [val, setVal] = useState((multiple && [0, 100]) || 0);
  
  const handleChange = (value) => {
    setVal(value);
    onChange(name ? { [name]: value } : value);
  };

  useEffect(() => {
    if (multiple && defaulValue) {
      setVal((Array.isArray(defaulValue) && defaulValue) || []);
    }
    if (!multiple && defaulValue && !Array.isArray(defaulValue)) {
      setVal(defaulValue);
    }
  }, [defaulValue]);

  return (
    <Wrapper className={`t-rc-slider-wrapper ${className}`}>
      {label && (
        <Label className="t-rc-slider-label" htmlFor="control">
          {label}
          :
        </Label>
      )}
      <Container>
        {multiple ? (
          <RangeStyled
            defaultValue={val}
            min={min}
            max={max}
            step={step}
            marks={marks}
            vertical={vertical}
            disabled={disabled}
            onAfterChange={handleChange}
          />
        ) : (
          <SliderStyled
            min={min}
            max={max}
            marks={marks}
            step={step}
            defaultValue={val}
            vertical={vertical}
            disabled={disabled}
            onAfterChange={handleChange}
          />
        )}
      </Container>
    </Wrapper>
  );
};
