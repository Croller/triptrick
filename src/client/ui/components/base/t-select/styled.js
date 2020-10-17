import styled, { css } from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';

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
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  max-width: 100%;
  min-height: ${THEME.controlHeight};
  border: ${THEME.controlBorderWidth} solid ${p => (p.required ? `${PALETTE.red1}` : `${PALETTE.grey3}`)};
  border-radius: ${THEME.controlBorderRadius};
  padding: 2px 0 2px;
  padding-left: ${(p) => ((p.prefix && '35px') || '7px')};
  padding-right: ${(p) => ((p.suffix && '35px') || '7px')};
  background-color: ${p => (p.disabled ? `${PALETTE.grey6}` : `${PALETTE.white}`)};
  cursor: pointer;

  > span {
    margin: 1.5px 3px 1.5px 0;
  }

  ${p => (p.disabled && css`
    cursor: not-allowed;
    color: ${PALETTE.disabled};

    svg {
      color: ${PALETTE.disabled} !important;
    }
  `)}
`;

export const Item = styled.span`
  display: flex;
  border-width: 0;
  border-radius: ${THEME.controlBorderRadius};
  background-color: ${PALETTE.grey5};
  padding: 5px 8px;
  margin-right: 5px;

  svg {
    width: 14px;
    color: ${PALETTE.grey2};
    cursor: pointer;
    opacity: 1;

    &:hover {
      opacity: 0.8;
      transition: opacity 0.25s ease-in-out;
    }
  }
`;

export const Text = styled.span`
  font-size: ${THEME.controlLabelFontSize};
  text-align: center;
  margin-right: 5px;

  > svg {
    -webkit-tap-highlight-color: transparent;
  }
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
  font-size: ${THEME.controlFontSize};
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

export const List = styled.div`
  position: relative;
  width: 100%;
`;

export const Error = styled.span`
  position: absolute;
  bottom: ${THEME.controlErrorMargin};
  display: block;
  font-family: ${FONTS.comfortaaLight};
  color: ${PALETTE.red1};
  font-size: ${THEME.controlErrorFontSize};
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
  border: ${THEME.controlBorderWidth} solid ${PALETTE.grey3};
  border-top-width: 0;
  border-radius: ${THEME.controlBorderRadius};
`;

export const Opt = styled.li`
  min-width: auto;
  min-height: auto;
  padding: 11px 10px;
  font-size: ${THEME.controlFontSize};
  cursor: pointer;
  border-bottom: ${THEME.controlBorderWidth} solid ${PALETTE.grey3};

  &:hover {
    background-color: ${PALETTE.grey5};
  }

  &:last-child {
    border-bottom: 0;
  }
`;

