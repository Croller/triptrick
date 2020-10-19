import styled from 'styled-components';
import Slider, { Range } from 'rc-slider';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import 'rc-slider/assets/index.css';

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
  height: ${THEME.controlHeight};
  margin: 0 5px 5px;
  width: calc(100% - 10px);
  position: relative;

  .rc-slider-rail {
    background-color: ${PALETTE.grey5};
  }

  .rc-slider-dot-active {
    border-color: ${PALETTE.blue1};
  }

  .rc-slider-track {
    background-color: ${PALETTE.blue1};
  }

  .rc-slider-handle {
    border-color: ${PALETTE.blue1};

    &.rc-slider-handle-click-focused {
      border-color: ${PALETTE.blue1};

      &.rc-slider-handle-dragging {
        border-color: ${PALETTE.blue1} !important;
        box-shadow: none !important;
        border-width: 2px !important;
      }
    }
  }

  .rc-slider-mark-text {
    color: ${PALETTE.black};
    transform: translateX(-50%) !important;

    &:first-child {
      transform: translateX(-10%) !important;
    }

    &:last-child {
      transform: translateX(-90%) !important;
    }
  }
`;

export const SliderStyled = styled(Slider)`
  display: block;
`;

export const RangeStyled = styled(Range)`
  display: block;
`;
