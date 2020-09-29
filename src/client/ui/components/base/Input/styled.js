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

export const Control = styled.input`
  height: 32px;
  font-family: ${FONTS.comfortaaRegular};
  font-size: 14px;
  border: 1px solid ${PALETTE.grey3};
  border-radius: 3px;
  padding-left: ${(p) => ((p.prefix && '35px') || '7px')};
  padding-right: ${(p) => ((p.suffix && '35px') || '7px')};

  &:focus {
    outline: none;
    border: 1px solid ${PALETTE.grey4};
  }
`;

export const Prefix = styled.span`
  position: absolute;
  top: ${(p) => (p.label ? '31px' : '10px')};
  left: 10px;
  z-index: 1;

  > svg {
    width: 12px;
    color: ${PALETTE.grey2};
  }
`;

export const Suffix = styled.span`
  position: absolute;
  top: ${(p) => (p.label ? '30px' : '10px')};
  right: 10px;
  z-index: 1;
  cursor: pointer;

  > svg {
    width: 16px;
    color: ${PALETTE.grey2};

    &:hover {
      color: ${PALETTE.grey1};
    }
  }
`;

