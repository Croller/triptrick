import styled from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${THEME.controlBorderRadius};
  box-shadow: 0 1px 10px 0 ${PALETTE.grey4};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px;
  border-bottom: 1px solid ${PALETTE.grey5};
`;

export const Title = styled.div`
  display: block;
  width: 100%;
  line-height: 30px;
  font-family: ${FONTS.comfortaaBold};
`;

export const Extra = styled.div`
  display: flex;
  width: auto;

  > svg {
    width: 20px;
    color: ${PALETTE.grey2};
    margin-right: 10px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const Content = styled.div`
  display: block;
  padding: 10px 12px;
`;

export const Control = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  > button {
    width: 100%;
    border-color: ${PALETTE.grey5};
    border-width: 0;
    border-radius: 0;
    border-top-width: 1px;
    border-right-width: 1px;

    &:last-child {
      border-right-width: 0;
    }
  }
`;

