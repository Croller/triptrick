import React from 'react';

import { Input } from 'client/ui/components/base/input';
import { Select, Option } from 'client/ui/components/base/select';
import { BarsSolidSvg } from 'client/assets/images';
import { Wrapper } from './styled';

const UI = () => {
  const handleChange = (key, obj) => {
    console.log(key, obj);
  };
  const handleBlur = (key, obj) => {
    console.log(key, obj);
  };

  return (
    <Wrapper>
      <Input
        label="Input with prefix and suffix clear function"
        value="Input value"
        prefix={(<BarsSolidSvg />)}
        showClear
        onChange={(obj) => handleChange('Input change - ', obj)}
        onBlur={(obj) => handleBlur('Input blur - ', obj)}
      />
      <br />
      <br />
      <Input
        label="Input with mask"
        value="Input value"
        showClear
        onChange={(obj) => handleChange('Input change - ', obj)}
        onBlur={(obj) => handleBlur('Input blur - ', obj)}
      />
      <br />
      <br />
      <Select
        label="Select single with search"
        value={1}
        showSearch
        onChange={(obj) => handleChange('Select change - ', obj)}
        onBlur={(obj) => handleBlur('Select blur - ', obj)}
      >
        <Option key="1">test 1</Option>
        <Option key="2">test 2</Option>
        <Option key="3">test 3</Option>
        <Option key="4">test 4</Option>
        <Option key="5">test 5</Option>
      </Select>
      <br />
      <br />
      <Select
        label="Select multiple with search and prefix"
        value={[
          { id: 1, name: 'item 1' },
          { id: 4, name: 'item 4' },
        ]}
        multiple
        showSearch
        prefix={(<BarsSolidSvg />)}
        onChange={(obj) => handleChange('Select change - ', obj)}
        onBlur={(obj) => handleBlur('Select blur - ', obj)}
      >
        <Option key="1">test 1</Option>
        <Option key="2">test 2</Option>
        <Option key="3">test 3</Option>
        <Option key="4">test 4</Option>
        <Option key="5">test 5</Option>
      </Select>
      <br />
      <br />
      <Select
        label="Select multiple simple, only select"
        value={[
          { id: 1, name: 'item 1' },
          { id: 4, name: 'item 4' },
        ]}
        multiple
        onChange={(obj) => handleChange('Select change - ', obj)}
        onBlur={(obj) => handleBlur('Select blur - ', obj)}
      >
        <Option key="1">test 1</Option>
        <Option key="2">test 2</Option>
        <Option key="3">test 3</Option>
        <Option key="4">test 4</Option>
        <Option key="5">test 5</Option>
      </Select>
    </Wrapper>
  );
};

export default UI;

