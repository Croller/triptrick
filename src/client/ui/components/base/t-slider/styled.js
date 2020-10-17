import styled from 'styled-components';
import Slider, { Range } from 'rc-slider';
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
  width: 100%;
  position: relative;
`;

export const SliderStyled = styled(Slider)`
  display: block;
`;

export const RangeStyled = styled(Range)`
  display: block;
`;
