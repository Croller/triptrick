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
  font-family: ${FONTS.regular};
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
  display: flex;
  min-width: auto;
  min-height: auto;
  justify-content: center;
  width: ${THEME.controlHeight};
  flex-wrap: wrap;
  align-items: center;
  height: auto;
  align-content: right;

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
  font-family: ${FONTS.regular};
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
  font-family: ${FONTS.regular};
  font-size: ${THEME.controlFontSize};
  border: ${THEME.controlBorderWidth} solid ${p => (p.required ? `${PALETTE.red1}` : `${PALETTE.grey3}`)};
  border-radius: ${THEME.controlBorderRadius};
  padding-left: ${(p) => ((p.prefix && '35px') || '7px')};
  padding-right: ${(p) => ((p.suffix && '35px') || '7px')};
  box-sizing: border-box;
  cursor: pointer;
  background-color: ${p => (p.disabled ? `${PALETTE.grey6}` : `${PALETTE.white}`)};
  letter-spacing: -0.5px;
  outline: none;
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    color: ${PALETTE.disabled};
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
  -webkit-tap-highlight-color: transparent;

  > svg {
    width: 14px;
    color: ${PALETTE.grey2};
    opacity: 1;

    &:hover {
      opacity: 0.8;
      transition: opacity 0.25s ease-in-out;
    }
  }
`;

export const Error = styled.span`
  position: absolute;
  bottom: ${THEME.controlErrorMargin};
  display: block;
  font-family: ${FONTS.light};
  color: ${PALETTE.red1};
  font-size: ${THEME.controlErrorFontSize};
`;
