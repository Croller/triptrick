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
  defaulValue,
  min = 1,
  max = 100,
  step = 1,
  vertical = false,
  marks = null,

  multiple = false,
  disabled = false,
  onChange = () => {},
  className = '',
}) => {
  const [val, setVal] = useState(0);
  
  const handleChange = (e) => {
    const str = e.target.value;
    console.log(str, e);
    setVal(str);
    onChange(name ? { [name]: str } : str);
  };

  useEffect(() => {
    if (multiple && defaulValue && Array.isArray(defaulValue)) {
      setVal(defaulValue);
      console.log(defaulValue);
    }
    if (!multiple && defaulValue && !Array.isArray(defaulValue)) {
      setVal(defaulValue);
      console.log(defaulValue);
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
            min={min}
            // max={max}
            marks={marks}
            step={step}
            defaultValue={val}
            vertical={vertical}
            disabled={disabled}
          />
        ) : (
          <SliderStyled
            min={min}
            // max={max}
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
