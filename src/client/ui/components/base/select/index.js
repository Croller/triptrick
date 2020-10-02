import React, { useState, useEffect, useRef } from 'react';
import { CloseCircleRegSvg } from 'client/assets/images';
import { OutSideClick } from 'client/ui/components/base/OutSideClick';
import {
  Wrapper,
  Label,
  Container,
  Item, Text,
  ControlWrapper, Control,
  Prefix,
  Suffix,
  List, Options, Opt,
} from './styled';

export const Option = ({
  key,
  children,
  onClick,
}) => (
  <Opt key={key} onClick={() => onClick(children)}>{children}</Opt>
);

export const Select = ({
  type = 'text',
  label = null,
  value,
  prefix = null,
  showSearch = false,
  multiple = false,
  children = [],
  onChange,
  // onBlur,  // TODO
  className = '',
}) => {
  const ref = useRef();
  const [show, setShow] = useState(false);
  const [val, setVal] = useState('');
  const [search, setSearch] = useState('');
  const [list, setList] = useState(null);

  const handleSearch = (e) => {
    const str = e.target.value;
    const arr = filterDic(val, list).filter((item) => item.props.children.indexOf(str) > -1);
    setSearch(str);
    if (str.length > 0 && str.length > 0) {
      setList(arr);
    } else {
      setList(children);
    }
  };

  const handleSelect = (id) => {
    if (multiple && Array.isArray(val)) {
      const result = list.find((item) => parseInt(item.key, 0) === id);
      const arr = [...val, { id: parseInt(result.key, 0), name: result.props.children }];
      setVal(arr);
      setList(filterDic(arr, children));
      onChange([...val.map((v) => v.id), id]);
    } else {
      const arr = list.filter((item) => parseInt(item.key, 0) === id);
      setSearch(arr[0].props.children);
      setVal(arr[0]);
      setList(filterDic(arr[0].key, children));
      onChange(id);
      handleShow(false);
    }
  };

  const handleClear = () => {
    setSearch('');
    if (!multiple) {
      onChange(null);
      setList(children);
      setVal('');
    }
  };

  const handleBlur = () => {
    if (multiple) {
      // onBlur(val.map((v) => v.id));
      setSearch('');
    } else {
      // onBlur(val.id || null);
    }
    handleShow(false);
  };

  const handleDelete = (item) => {
    if (multiple && Array.isArray(val)) {
      const arr = val.filter((v) => v.id !== item.id);
      onChange(arr.map((r) => r.id));
      setVal(arr);
      setList(filterDic(arr, children));
      handleShow(true);
    }
  };

  const handleShow = (bool = null) => {
    setShow(bool !== null ? bool : !show);
  };

  const handleFocus = () => {
    if (showSearch) {
      ref.current.focus();
    }
    if (!show) {
      handleShow();
    }
  };

  const filterDic = (def, arr) => {
    if (arr && multiple) {
      return arr.filter((item) => !def.some((v) => v.id === parseInt(item.key, 0)));
    }
    return arr.filter((item) => parseInt(def, 0) !== parseInt(item.key, 0));
  };

  useEffect(() => {
    if (value && children) {
      setList(children);
      setVal(value || '');
      if (Array.isArray(value)) {
        setVal(value);
      } else {
        const arr = children.filter((item) => parseInt(item.key, 0) !== value);
        const obj = children.find((item) => parseInt(item.key, 0) === value);
        setVal({ id: parseInt(obj.key, 0), name: obj.props.children });
        setList(arr);
        setSearch(children.find((item) => parseInt(item.key, 0) === value).props.children);
      }
    }
  }, [value, children]);

  return (
    <OutSideClick onOutSide={handleBlur}>
      <Wrapper
        className={className}
        onClick={handleFocus}
      >
        {label && (
          <Label htmlFor="control">
            {label}
            :
          </Label>
        )}
        <Container prefix={prefix} suffix={showSearch}>
          {prefix && (
            <Prefix label={label}>
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
                  <CloseCircleRegSvg onClick={() => handleDelete(item)} />
                </Item>
              ))}
            </>
          )}
          {showSearch && (
            <ControlWrapper width={(search.length > 0 && `${search.length * 11}px`) || '2px'}>
              <Control
                ref={ref}
                name="control"
                autoComplete="off"
                type={type}
                value={search}
                onChange={handleSearch}
                onClick={handleShow}
              />
            </ControlWrapper>
          )}
          {showSearch && search.length > 0 && (
            <Suffix label={label}>
              <CloseCircleRegSvg onClick={handleClear} />
            </Suffix>
          )}
        </Container>
        {show && list.length > 0 && (
          <List>
            <Options>
              {list && filterDic(val, list).map((child) => React.cloneElement(child, { onClick: () => handleSelect(parseInt(child.key, 0)) }))}
            </Options>
          </List>
        )}
      </Wrapper>
    </OutSideClick>
  );
};
