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
    src: local('FuturaPT-Light'), url(${FuturaPTLight}) format('truetype');
  }

  @font-face {
    font-family: 'FuturaPT-Book';
    src: local('FuturaPT-Book'), url(${FuturaPTBook}) format('truetype');
  }

  @font-face {
    font-family: 'FuturaPT-Medium';
    src: local('FuturaPT-Medium'), url(${FuturaPTMedium}) format('truetype');
  }

  @font-face {
    font-family: 'FuturaPT-Bold';
    src: local('FuturaPT-Bold'), url(${FuturaPTBold}) format('truetype');
  }

  @font-face {
    font-family: 'Comfortaa-Regular';
    src: local('Comfortaa-Regular'), url(${ComfortaaRegular}) format('truetype');
  }

  @font-face {
    font-family: 'Comfortaa-Bold';
    src: local('Comfortaa-Bold'), url(${ComfortaaBold}) format('truetype');
  }

  @font-face {
    font-family: 'Comfortaa-Light';
    src: local('Comfortaa-Light'), url(${ComfortaaLight}) format('truetype');
  }
  
  body {
    height: 100%;
    margin: 0;
    font-family: ${FONTS.regular} !important;
    overflow-x: hidden;
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

  /* input number hide arraows */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
`;
