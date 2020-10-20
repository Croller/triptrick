import React from 'react';

import { InputRange, InputGroup, Input } from 'client/ui/components/base/t-input';
import { Select, Option } from 'client/ui/components/base/t-select';
import { CheckBoxGroup, CheckBox } from 'client/ui/components/base/t-checkbox';
import { RadioGroup, Radio } from 'client/ui/components/base/t-radio';
import { ButtonGroup, Button } from 'client/ui/components/base/t-button';
import { Slider } from 'client/ui/components/base/t-slider';
import { Form } from 'client/ui/components/base/t-form';
import { Card } from 'client/ui/components/base/t-card';
import { Tooltip } from 'client/ui/components/base/t-tooltip';
import { List, Item } from 'client/ui/components/base/t-list';
import { Label } from 'client/ui/components/base/t-label';
import { Map } from 'client/ui/components/base/t-map';
import { PALETTE } from 'client/style/constants';
import {
  BarsSolidSvg,
  PlaneLightSvg,
  CircleLightSvg,
  CloseCircleLightSvg, 
  MinusLightSvg,
} from 'client/assets/images';
import { Wrapper } from './styled';

import {
  CHECKBOX_DATA,
  RADIO_DATA,
  SELECTED_DATA,
  SELECT_DATA,
  MAP_LAYERS_DATA,
} from './constants';

const UI = () => {
  const handleChange = (key, obj) => {
    console.log(key, obj);
  };

  return (
    <Wrapper>
      <Input
        name="input_1"
        label="Input with prefix and suffix clear function"
        defaultValue="Input value"
        prefix={(<BarsSolidSvg />)}
        showClear
        onChange={(obj) => handleChange('Input change with name - ', obj)}
      />
      <br />
      <br />
      <Input
        label="Input disabled"
        defaultValue="Input value"
        prefix={(<BarsSolidSvg />)}
        showClear
        disabled
        onChange={(obj) => handleChange('Input change - ', obj)}
      />
      <br />
      <br />
      <Input
        label="Input required"
        prefix={(<BarsSolidSvg />)}
        showClear
        required
        onChange={(obj) => handleChange('Input change - ', obj)}
      />
      <br />
      <br />
      <Input
        label="Input with mask"
        defaultValue="Input value"
        showClear
        onChange={(obj) => handleChange('Input change - ', obj)}
      />
      <br />
      <br />
      <Input
        type="password"
        label="Input password"
        defaultValue="password"
        showClear
        onChange={(obj) => handleChange('Input change - ', obj)}
      />
      <br />
      <br />
      <Input
        defaultValue="Input witout label"
        prefix={(<BarsSolidSvg />)}
        showClear
        onChange={(obj) => handleChange('Input change - ', obj)}
      />
      <br />
      <br />
      <InputGroup>
        {[...Array(2)].map((num, n) => (
          <Input
            key={`_input_grp_1_${n + 1}`}
            showClear
            defaultValue={`Input ${n + 1}`}
            onChange={(obj) => handleChange('Input change - ', obj)}
          />
        ))}
      </InputGroup>
      <br />
      <br />
      <InputGroup label="Input group with label">
        {[...Array(4)].map((num, n) => (
          <Input
            key={`_input_grp_2_${n + 1}`}
            showClear
            separator={null}
            defaultValue={`Input ${n + 1}`}
            onChange={(obj) => handleChange('Input change - ', obj)}
          />
        ))}
      </InputGroup>
      <br />
      <br />
      <InputRange label="Input range with label">
        {[...Array(4)].map((num, n) => (
          <Input
            key={`_input_grp_2_${n + 1}`}
            showClear
            separator={null}
            defaultValue={`Input ${n + 1}`}
            onChange={(obj) => handleChange('Input change - ', obj)}
          />
        ))}
      </InputRange>
      <br />
      <br />
      <InputRange
        label="Input range with label and custom separator"
        separator={(<PlaneLightSvg />)}
      >
        {[...Array(4)].map((num, n) => (
          <Input
            key={`_input_grp_2_${n + 1}`}
            showClear
            separator={null}
            defaultValue={`Input ${n + 1}`}
            onChange={(obj) => handleChange('Input change - ', obj)}
          />
        ))}
      </InputRange>
      <br />
      <br />
      <CheckBox
        name="checkbox_0"
        value
        onChange={(obj) => handleChange('Single Checkbox change - ', obj)}
      >
        Single Checkbox
      </CheckBox>
      <br />
      <br />
      <CheckBoxGroup
        name="checkbox_1"
        checked
        onChange={(obj) => handleChange('Checkbox change with name - ', obj)}
      >
        {CHECKBOX_DATA.map((item) => (
          <CheckBox key={`_checkbox_1_${item.id}`} value={item.id}>{item.name}</CheckBox>
        ))}
      </CheckBoxGroup>
      <br />
      <br />
      <CheckBoxGroup
        label="Checkbox group row with label"
        defaulValue={[1, 3]}
        direction="row"
        onChange={(obj) => handleChange('Checkbox change - ', obj)}
      >
        {CHECKBOX_DATA.map((item) => (
          <CheckBox key={`_checkbox_1_${item.id}`} value={item.id}>{item.name}</CheckBox>
        ))}
      </CheckBoxGroup>
      <br />
      <br />
      <CheckBoxGroup
        label="Checkbox disabled"
        defaulValue={[1, 3]}
        direction="row"
        disabled
        onChange={(obj) => handleChange('Checkbox change - ', obj)}
      >
        {CHECKBOX_DATA.map((item) => (
          <CheckBox key={`_checkbox_1_${item.id}`} value={item.id}>{item.name}</CheckBox>
        ))}
      </CheckBoxGroup>
      <br />
      <br />
      <CheckBoxGroup
        label="Checkbox required"
        direction="row"
        required
        onChange={(obj) => handleChange('Checkbox change - ', obj)}
      >
        {CHECKBOX_DATA.map((item) => (
          <CheckBox key={`_checkbox_1_${item.id}`} value={item.id}>{item.name}</CheckBox>
        ))}
      </CheckBoxGroup>
      <br />
      <br />
      <RadioGroup
        name="radio_1"
        onChange={(obj) => handleChange('Radio change with name - ', obj)}
      >
        {RADIO_DATA.map((item) => (
          <Radio key={`_radio_1_${item.id}`} value={item.id}>{item.name}</Radio>
        ))}
      </RadioGroup>
      <br />
      <br />
      <RadioGroup
        label="Radio group row with label"
        defaulValue={2}
        direction="row"
        onChange={(obj) => handleChange('Radio change - ', obj)}
      >
        {RADIO_DATA.map((item) => (
          <Radio key={`_radio_1_${item.id}`} value={item.id}>{item.name}</Radio>
        ))}
      </RadioGroup>
      <br />
      <br />
      <RadioGroup
        label="Radio disabled"
        direction="row"
        disabled
        onChange={(obj) => handleChange('Radio change - ', obj)}
      >
        {RADIO_DATA.map((item) => (
          <Radio key={`_radio_1_${item.id}`} value={item.id}>{item.name}</Radio>
        ))}
      </RadioGroup>
      <br />
      <br />
      <RadioGroup
        label="Radio required"
        direction="row"
        required
        onChange={(obj) => handleChange('Radio change - ', obj)}
      >
        {RADIO_DATA.map((item) => (
          <Radio key={`_radio_1_${item.id}`} value={item.id}>{item.name}</Radio>
        ))}
      </RadioGroup>
      {/*   TODO
      <br />
      <br />
      <RadioGroup
        label="Radio required"
        direction="row"
        onChange={(obj) => handleChange('Radio change - ', obj)}
      >
        {RADIO_DATA.map((item) => (
          <Button color={PALETTE.red1} key={`_button_1_${item.id}`}>{item.name}</Button>
        ))}
      </RadioGroup> */}
      <br />
      <br />
      <Select
        name="select_0"
        label="Select single with search"
        defaulValue={1}
        showSearch
        onChange={(obj) => handleChange('Select change with name - ', obj)}
      >
        {SELECT_DATA.map((item) => (
          <Option key={`_option_1_${item.id}`} value={item.id}>{item.name}</Option>
        ))}
      </Select>
      <br />
      <br />
      <Select
        name="select_1"
        label="Select multiple with search and prefix"
        defaulValue={SELECTED_DATA}
        multiple
        showSearch
        prefix={(<BarsSolidSvg />)}
        onChange={(obj) => handleChange('Select change with name - ', obj)}
      >
        {SELECT_DATA.map((item) => (
          <Option key={`_option_2_${item.id}`} value={item.id}>{item.name}</Option>
        ))}
      </Select>
      <br />
      <br />
      <Select
        label="Select multiple simple, only select"
        defaulValue={SELECTED_DATA}
        multiple
        onChange={(obj) => handleChange('Select change - ', obj)}
      >
        {SELECT_DATA.map((item) => (
          <Option key={`_option_3_${item.id}`} value={item.id}>{item.name}</Option>
        ))}
      </Select>
      <br />
      <br />
      <Select
        label="Select disabled"
        defaulValue={SELECTED_DATA}
        multiple
        disabled
        onChange={(obj) => handleChange('Select change - ', obj)}
      >
        {SELECT_DATA.map((item) => (
          <Option key={`_option_4_${item.id}`} value={item.id}>{item.name}</Option>
        ))}
      </Select>
      <br />
      <br />
      <Select
        label="Select disabled"
        multiple
        required
        onChange={(obj) => handleChange('Select change - ', obj)}
      >
        {SELECT_DATA.map((item) => (
          <Option key={`_option_5_${item.id}`} value={item.id}>{item.name}</Option>
        ))}
      </Select>
      <br />
      <br />
      <Label>Button group</Label>
      <ButtonGroup>
        <Button>Button</Button>
        <Button color={PALETTE.green1}>Button</Button>
        <Button color={PALETTE.red1}>Button</Button>
        <Button color={PALETTE.blue1}>Button</Button>
        <Button disabled>Disabled</Button>
      </ButtonGroup>
      <br />
      <br />
      <ButtonGroup>
        <Button>Button</Button>
        <Button color={PALETTE.blue1}>
          <PlaneLightSvg />
          Icon
        </Button>
        <Button disabled>
          <CircleLightSvg />
          Icon
          <CircleLightSvg />
        </Button>
      </ButtonGroup>
      <br />
      <br />
      <Slider
        label="Slider range"
        min={0}
        max={500}
        defaulValue={100}
        marks={{ 0: 'start', 500: 'finish' }}
        onChange={(obj) => handleChange('Slider change - ', obj)}
      />
      <Slider
        label="Slider range multiple"
        min={0}
        max={500}
        defaulValue={[100, 200]}
        marks={{ 0: 'start', 300: 'middle', 500: 'finish' }}
        multiple
        onChange={(obj) => handleChange('Slider multiple change - ', obj)}
      />
      <br />
      <br />
      <Label>List</Label>
      <List>
        {SELECT_DATA.map((item, i) => (
          <Item key={`_item_5_${item.id}`} onClick={() => handleChange('List item click multiple change - ', item.id)}>
            <MinusLightSvg />
            {`Item ${i + 1}`}
          </Item>
        ))}
      </List>
      <br />
      <br />
      <Label>List horizontal with tooltip</Label>
      <List vertical={false}>
        {SELECT_DATA.map((item, i) => (
          <Tooltip key={`_item_4_${item.id}`} title={`Tooltip item ${item.id}`}>
            <Item>
              <MinusLightSvg />
              {`Item ${i + 1}`}
            </Item>
          </Tooltip>
        ))}
      </List>
      <br />
      <br />
      <Form onSubmit={(obj) => handleChange('Form change - ', obj)}>
        <Input
          label="Form control"
          defaultValue="Input value"
          prefix={(<BarsSolidSvg />)}
          showClear
          onChange={(obj) => handleChange('Input change - ', obj)}
        />
        <Button type="submit" color={PALETTE.green1}>Submit</Button>
      </Form>
      <br />
      <br />
      <Card
        title="Card title"
        extra={(
          <>
            <CircleLightSvg />
            <CloseCircleLightSvg />
          </>
        )}
        control={(
          <>
            <Button>Reset</Button>
            <Button>Submit</Button>
          </>
        )}
      >
        Card body
      </Card>
      <br />
      <br />
      <Card
        control={(
          <>
            <Button>Reset</Button>
            <Button>Submit</Button>
          </>
        )}
      >
        Card without title
      </Card>
      <br />
      <br />
      <Card>
        Card without title
      </Card>
      <br />
      <br />
      <Card title="Map component">
        <Map
          height="500px"
          mode="drawPolygon"
          layers={MAP_LAYERS_DATA}
          onClick={(obj) => handleChange('Map click - ', obj)}
          onCreate={(arr) => handleChange('Map create - ', arr)}
        />
      </Card>
    </Wrapper>
  );
};

export default UI;

