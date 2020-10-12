import styled, { css } from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';

export const Group = styled.div`
  position: relative;
  display: block;
  margin: ${THEME.controlMargin};
`;

export const GroupLabel = styled.label`
  font-family: ${FONTS.comfortaaRegular};
  font-size: ${THEME.controlLabelFontSize};
`;

export const GroupContainer = styled.div`
  display: flex;
  flex-direction: ${p => p.direction};
  margin-top: ${p => (p.label ? `${THEME.controlLabelMargin}` : 0)};

  label {
    ${p => (p.direction === 'column' ? css`
      margin-bottom: 5px;
    ` : css`margin-right: 15px;`)}

    &:last-child {
      ${p => (p.direction === 'column' ? css`
      margin-bottom: 0;
    ` : css`margin-right: 0;`)}
    }
  }
`;

export const Error = styled.span`
  position: absolute;
  bottom: ${THEME.controlErrorMargin};
  display: block;
  font-family: ${FONTS.comfortaaLight};
  color: ${PALETTE.red1};
  font-size: ${THEME.controlErrorFontSize};
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  font-family: ${FONTS.comfortaaRegular};
  font-size: ${THEME.controlFontSize};
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
`;

export const Control = styled.input`
  position: absolute;
  opacity: 0;
  z-index: -1;

  &:focus {
    outline: none;
  }
`;

export const Container = styled.span`
  display: block;
`;

export const IconBlock = styled.span`
  margin-right: 10px;

  > svg {
    width: 16px;
    color: ${PALETTE.grey2};
  }
`;

export const Text = styled.p`
  display: block;
  margin: 0;
`;
