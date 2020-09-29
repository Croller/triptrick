import React from 'react';

import { Input } from 'client/ui/components/base/Input';
import { BarsSolidSvg } from 'client/assets/images';
import { Wrapper } from './styled';

const UI = () => {
  const handleChange = (key, obj) => {
    console.log(key, obj);
  };

  return (
    <Wrapper>
      <Input
        label="Label"
        value="Input value"
        prefix={(<BarsSolidSvg />)}
        showClear
        onChange={(obj) => handleChange('Input', obj)}
      />
    </Wrapper>
  );
};

export default UI;

