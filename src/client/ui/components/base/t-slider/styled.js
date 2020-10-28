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
  font-family: ${FONTS.regular};
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
    border: 1px solid ${PALETTE.grey4};
    height: 10px;
  }

  .rc-slider-track {
    background-color: ${PALETTE.white};
    border: 1px solid ${PALETTE.grey4};
    height: 10px !important;
  }

  .rc-slider-dot-active {
    border: 1px solid ${PALETTE.blue1};
  }

  .rc-slider-handle {
    top: 8px !important;
    border: 1px solid ${PALETTE.blue1};

    &.rc-slider-handle-click-focused {
      border: 1px solid ${PALETTE.blue1};

      &.rc-slider-handle-dragging {
        border: 1px solid ${PALETTE.blue1} !important;
        box-shadow: none !important;
      }
    }
  }

  .rc-slider-mark {
    top: 24px !important;

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
  }

  .rc-slider-step {
    display: none;
  }
`;

export const SliderStyled = styled(Slider)`
  display: block;
`;

export const RangeStyled = styled(Range)`
  display: block;
`;
