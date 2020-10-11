import React, { useState, useEffect, useRef } from 'react';
import { CloseCircleLightSvg } from 'client/assets/images';
import { OutSideClick } from 'client/ui/components/base/OutSideClick';
import {
  Wrapper,
  Label,
  Container,
  Item, Text,
  ControlWrapper, Control,
  Prefix,
  Suffix,
  Error,
  List, Options, Opt,
} from './styled';

export const Option = ({
  value,
  children,
  onClick,
}) => (
  <Opt value={value} onClick={() => onClick(children)}>{children}</Opt>
);

export const Select = ({
  type = 'text',
  label = null,
  defaulValue,
  prefix = null,
  showSearch = false,
  multiple = false,
  children = [],
  required = false,
  disabled = false,
  error = 'Required field',
  onChange = () => {},
  onBlur = () => {},
  className = '',
}) => {
  const ref = useRef();
  const [show, setShow] = useState(false);
  const [val, setVal] = useState(null);
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);

  const handleSearch = (e) => {
    const str = e.target.value;
    const arr = filterDic(val, list).filter((item) => item.props.children.indexOf(str) > -1);
    setSearch(str);
    handleShow(true);
    if (str.length > 0) {
      setList(arr);
    } else {
      setList(children);
    }
  };

  const handleSelect = (value) => {
    if (multiple) {
      const result = list.find((item) => item.props.value === value);
      const arr = [...(val || []), { id: result.props.value, name: result.props.children }];
      setSearch('');
      setVal(arr);
      setList(filterDic(arr, children));
      onChange([...arr.map((v) => v.id)]);
    } else {
      const arr = list.filter((item) => item.props.value === value);
      setSearch(arr[0].props.children);
      setVal(value);
      setList(filterDic(arr[0].id, children));
      onChange(value);  
      handleShow(false);
    }
  };

  const handleClear = () => {
    setSearch('');
    if (!multiple) {
      setVal(null);
      setList(children);
      onChange(null);
    }
  };

  const handleBlur = () => {
    if (show) {
      if (multiple && Array.isArray(val)) {
        onBlur(val.map((v) => v.id));
        setSearch('');
      } else {
        onBlur((val && val.value) || null);
      }
    }
    handleShow(false);
  };

  const handleDelete = (item) => {
    if (!disabled && multiple && Array.isArray(val)) {
      const arr = val.filter((v) => v.id !== item.id);
      setVal(arr);
      setList(filterDic(arr, children));
      onChange(arr.map((r) => r.id));
      handleShow(true);
    }
  };

  const handleShow = (bool = null) => {
    setShow(bool !== null ? bool : !show);
  };

  const handleFocus = () => {
    if (showSearch) {
      !disabled && ref.current.focus();
    }
    if (!show) {
      handleShow();
    }
  };

  const filterDic = (def, arr) => {
    if (Array.isArray(def) && arr && multiple) {
      return arr.filter((item) => !def.some((v) => v.id === item.props.value));
    }
    return arr.filter((item) => def !== item.props.value);
  };

  useEffect(() => {
    if (defaulValue) {
      setVal(defaulValue || '');
      if (!Array.isArray(defaulValue)) {
        const arr = children.filter((item) => item.props.value !== defaulValue);
        const obj = children.find((item) => item.props.value === defaulValue);
        setVal({ value: obj.props.value, name: obj.props.children });
        setList(arr);
        setSearch(children.find((item) => item.props.value === defaulValue).props.children);
      } else {
        setVal(defaulValue);
      }
    }
    setList(children);
  }, [defaulValue, children]);

  return (
    <OutSideClick onOutSide={handleBlur}>
      <Wrapper
        className={`t-select-wrapper ${className}`}
        onClick={handleFocus}
      >
        {label && (
          <Label className="t-select-label" htmlFor="control">
            {label}
            :
          </Label>
        )}
        <Container
          className="t-select-container"
          prefix={prefix}
          suffix={showSearch}
          required={required && !val}
          disabled={disabled}
        >
          {prefix && (
            <Prefix className="t-select-prefix" label={label}>
              {prefix}
            </Prefix>
          )}
          {multiple && (
            <>
              {Array.isArray(val) && val.map((item, i) => (
                <Item key={`_item_${i + 1}`}>
                  <Text>
                    {item.name}
                  </Text>
                  <CloseCircleLightSvg onClick={() => handleDelete(item)} />
                </Item>
              ))}
            </>
          )}
          {showSearch && (
            <ControlWrapper
              width={(search.length > 0 && `${search.length * 11}px`) || '2px'}
            >
              <Control
                ref={ref}
                name="control"
                autoComplete="off"
                className="t-select-input" 
                type={type}
                value={search}
                onChange={handleSearch}
              />
            </ControlWrapper>
          )}
          {showSearch && search.length > 0 && (
            <Suffix className="t-select-suffix" label={label}>
              <CloseCircleLightSvg onClick={handleClear} />
            </Suffix>
          )}
        </Container>
        {required && error && !val && (
          <Error>{error}</Error>
        )}
        {!disabled && show && list.length > 0 && (
          <List className="t-select-options">
            <Options className="t-select-options-item">
              {list && filterDic(val, list).map((child) => React.cloneElement(child, {
                onClick: () => handleSelect(child.props.value),
              }))}
            </Options>
          </List>
        )}
      </Wrapper>
    </OutSideClick>
  );
};
