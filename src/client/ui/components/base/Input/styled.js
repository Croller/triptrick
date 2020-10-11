import styled, { css } from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';

const withoutSeparator = css`
  > div {
    margin: 0;

    input {
      border-left-width: ${THEME.controlBorderWidth};
      border-right-width: 0;
      border-radius: 0;
    }

    &:first-child {
      input {
        border-radius: ${THEME.controlBorderRadius};
        border-left-width: ${THEME.controlBorderWidth};
        border-right-width: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    &:last-child {
      input {
        border-radius: ${THEME.controlBorderRadius};
        border-left-width: ${THEME.controlBorderWidth};
        border-right-width: ${THEME.controlBorderWidth};
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
`;

const withSeparator = css`
  > div {
    margin: 0;
  }
`;

export const Group = styled.div`
  display: block;
  margin: ${THEME.controlMargin};
`;

export const GroupLabel = styled.label`
  font-family: ${FONTS.comfortaaRegular};
  font-size: ${THEME.controlLabelFontSize};
`;

export const GroupContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin-top: ${p => (p.label ? `${THEME.controlLabelMargin}` : 0)};
  ${p => (p.separator ? withSeparator : withoutSeparator)}
`;

export const Separator = styled.div`
  line-height: ${THEME.controlHeight};
  width: ${THEME.controlHeight};
  text-align: center;

  > svg {
    width: 15px;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: ${THEME.controlMargin};
`;

export const Label = styled.label`
  font-family: ${FONTS.comfortaaRegular};
  font-size: ${THEME.controlLabelFontSize};
  margin: 0 0 ${THEME.controlLabelMargin};
`;

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const Control = styled.input`
  width: 100%;
  height: ${THEME.controlHeight};
  font-family: ${FONTS.comfortaaRegular};
  font-size: 14px;
  border: ${THEME.controlBorderWidth} solid ${PALETTE.grey3};
  border-radius: ${THEME.controlBorderRadius};
  padding-left: ${(p) => ((p.prefix && '35px') || '7px')};
  padding-right: ${(p) => ((p.suffix && '35px') || '7px')};
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

export const Prefix = styled.span`
  position: absolute;
  height: 100%;
  display: flex;
  top: 0;
  left: 10px;
  z-index: 1;

  > svg {
    width: 12px;
    color: ${PALETTE.grey2};
  }
`;

export const Suffix = styled.span`
  position: absolute;
  height: 100%;
  display: flex;
  top: 0;
  right: 10px;
  z-index: 1;
  cursor: pointer;

  > svg {
    width: 16px;
    color: ${PALETTE.grey2};
    opacity: 1;

    &:hover {
      opacity: 0.8;
      transition: opacity 0.25s ease-in-out;
    }
  }
`;

