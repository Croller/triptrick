import styled from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';

export const Group = styled.div`
  display: flex;
  flex-direction: row;
  margin: ${THEME.controlMargin};

  > button {
    margin: 0;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const Wrapper = styled.button`
  display: block;
  display: flex;
  align-items: center;
  background-color: ${p => p.color || `${PALETTE.white}`};
  border: ${THEME.controlBorderWidth} solid ${p => p.color || `${PALETTE.grey3}`};
  border-radius: ${THEME.controlBorderRadius};
  font-family: ${FONTS.comfortaaRegular};
  font-size: ${THEME.controlFontSize};
  margin: ${THEME.controlMargin};
  padding: 10px 18px;
  color: ${p => ((p.color && `${PALETTE.white}`) || `${PALETTE.black}`)};
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${p => ((p.color && `${PALETTE.white}`) || `${PALETTE.grey6}`)};
    color: ${p => (p.color || `${PALETTE.black}`)};
    transition: background-color 0.1s linear;
  }

  &:disabled {
    cursor: not-allowed;
    color: ${PALETTE.grey3};

    &:hover {
      background-color: ${PALETTE.grey6};
    }
  }

  > svg {
    width: 18px;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
      margin-left: 10px;
    }

    &:first-child {
      margin-right: 10px;
      margin-left: 0;
    }
  }
`;
