import styled, { css } from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';

const absolute = css`
  position: absolute;
  background-color: ${PALETTE.white};
  color: ${PALETTE.black};
  z-index: 100;
  font-family: ${FONTS.comfortaaLight};
`;

export const Wrapper = styled.div`
  display: block;
  height: ${p => p.height};
  width: ${p => p.width};
  border-radius: ${THEME.controlBorderRadius};
  font-family: ${FONTS.comfortaaLight};

  .mapboxgl-ctrl-attrib {
    display: none;
  }

  canvas {
    border-radius: 3px;
  }
`;

export const Scale = styled.div`
  right: 0;
  bottom: 0;
  width: 70px;
  text-align: center;
  border-radius: ${THEME.controlBorderRadius} 0;
  padding: 5px 10px;
  z-index: 100;
  ${absolute}
`;

export const Coordinates = styled.div`
  left: 0;
  bottom: 0;
  width: 135px;
  text-align: center;
  border-radius: 0 ${THEME.controlBorderRadius};
  padding: 5px 10px;
  z-index: 100;
  ${absolute}
`;
