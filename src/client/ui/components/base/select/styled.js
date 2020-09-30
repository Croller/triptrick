import styled from 'styled-components';
import { FONTS, PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 5px 0;
`;

export const Label = styled.label`
  font-family: ${FONTS.comfortaaRegular};
  font-size: 12px;
  margin-bottom: 6px;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  max-width: 100%;
  min-height: 36px;
  border: 1px solid ${PALETTE.grey3};
  border-radius: 3px;
  padding: 2px 0 2px;
  padding-left: ${(p) => ((p.prefix && '35px') || '7px')};
  padding-right: ${(p) => ((p.suffix && '35px') || '7px')};
  cursor: pointer;

  > span {
    margin: 1.5px 3px 1.5px 0;
  }
`;

export const Item = styled.span`
  display: flex;
  border-width: 0;
  border-radius: 3px;
  background-color: #F0EDED;
  padding: 5px 8px;
  margin-right: 5px;

  svg {
    width: 14px;
    cursor: pointer
  }
`;

export const Text = styled.span`
  font-size: 14px;
  text-align: center;
  margin-right: 5px;
`;

export const ControlWrapper = styled.span`
  box-sizing: border-box;
  position: relative;
  width: ${(p) => p.width};
`;

export const Control = styled.input`
  width: 100%;
  min-width: 4px;
  height: 25px;
  font-family: ${FONTS.comfortaaRegular};
  font-size: 14px;
  border-width: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const Prefix = styled.span`
  position: absolute;
  top: 0;
  left: 10px;
  height: 100%;
  display: flex;
  z-index: 1;
  margin: 0 !important;

  > svg {
    width: 12px;
    color: ${PALETTE.grey2};
  }
`;

export const Suffix = styled.span`
  position: absolute;
  top: 0;
  right: 10px;
  height: 100%;
  display: flex;
  z-index: 1;
  margin: 0 !important;
  cursor: pointer;

  > svg {
    width: 16px;
    color: ${PALETTE.grey2};

    &:hover {
      color: ${PALETTE.grey1};
    }
  }
`;

export const List = styled.div`
  position: relative;
  width: 100%;
`;

export const Options = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: ${PALETTE.white};
  z-index: 2;
  border: 1px solid ${PALETTE.grey3};
  border-top-width: 0;
  border-radius: 3px;
`;

export const Opt = styled.li`
  padding: 9px 8px;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 1px solid ${PALETTE.grey3};

  &:hover {
    background-color: ${PALETTE.grey3};
  }

  &:last-child {
    border-bottom: 0;
  }
`;

