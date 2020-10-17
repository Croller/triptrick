import { createGlobalStyle } from 'styled-components';
import FuturaPTLight from 'client/assets/fonts/FuturaPT-Light.ttf';
import FuturaPTBook from 'client/assets/fonts/FuturaPT-Book.ttf';
import FuturaPTMedium from 'client/assets/fonts/FuturaPT-Medium.ttf';
import FuturaPTBold from 'client/assets/fonts/FuturaPT-Bold.ttf';
import ComfortaaRegular from 'client/assets/fonts/Comfortaa-Regular.ttf';
import ComfortaaBold from 'client/assets/fonts/Comfortaa-Bold.ttf';
import ComfortaaLight from 'client/assets/fonts/Comfortaa-Light.ttf';
import { FONTS, PALETTE } from './constants';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'FuturaPT-Light';
    src: url(${FuturaPTLight}) format('ttf');
  }

  @font-face {
    font-family: 'FuturaPT-Book';
    src: url(${FuturaPTBook}) format('ttf');
  }

  @font-face {
    font-family: 'FuturaPT-Medium';
    src: url(${FuturaPTMedium}) format('ttf');
  }

  @font-face {
    font-family: 'FuturaPT-Bold';
    src: url(${FuturaPTBold}) format('ttf');
  }

  @font-face {
    font-family: 'Comfortaa-Regular';
    src: url(${ComfortaaRegular}) format('ttf');
  }

  @font-face {
    font-family: 'Comfortaa-Bold';
    src: url(${ComfortaaBold}) format('ttf');
  }

  @font-face {
    font-family: 'Comfortaa-Light';
    src: url(${ComfortaaLight}) format('ttf');
  }

  body {
    height: 100%;
    margin: 0;
    font-family: ${FONTS.comfortaaRegular};
  }

  [ant-click-animating-without-extra-node]::after {
    animation: 0s !important;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-thumb {
    background: ${PALETTE.grey5};
    border: 0 none ${PALETTE.grey5};
    border-radius: 50px;
  }

  ::-webkit-scrollbar-track {
    background: ${PALETTE.grey3};
    border: 0 none ${PALETTE.grey3};
    border-radius: 50px;
  }

  ::-webkit-scrollbar-corner {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${PALETTE.grey5};
    cursor: pointer;
  }

  ::-webkit-scrollbar-track:hover {
    background: ${PALETTE.grey3};
    cursor: pointer;
  }
`;
