import { createGlobalStyle } from 'styled-components';
import FuturaPTLight from 'client/assets/fonts/FuturaPT-Light.ttf';
import FuturaPTBook from 'client/assets/fonts/FuturaPT-Book.ttf';
import FuturaPTMedium from 'client/assets/fonts/FuturaPT-Medium.ttf';
import FuturaPTBold from 'client/assets/fonts/FuturaPT-Bold.ttf';
import ComfortaaRegular from 'client/assets/fonts/Comfortaa-Regular.ttf';
import ComfortaaBold from 'client/assets/fonts/Comfortaa-Bold.ttf';
import ComfortaaLight from 'client/assets/fonts/Comfortaa-Light.ttf';
import TTNormsBoldItalic from 'client/assets/fonts/TTNorms-BoldItalic.ttf';
import TTNormsBold from 'client/assets/fonts/TTNorms-Bold.ttf';
import TTNormsBlackItalic from 'client/assets/fonts/TTNorms-BlackItalic.ttf';
import TTNormsRegular from 'client/assets/fonts/TTNorms-Regular.ttf';
import TTNormsMediumItalic from 'client/assets/fonts/TTNorms-MediumItalic.ttf';
import TTNormsExtraLight from 'client/assets/fonts/TTNorms-ExtraLight.ttf';
import TTNormsThinItalic from 'client/assets/fonts/TTNorms-ThinItalic.ttf';
import TTNormsMedium from 'client/assets/fonts/TTNorms-Medium.ttf';
import TTNormsLightItalic from 'client/assets/fonts/TTNorms-LightItalic.ttf';
import TTNormsHeavyItalic from 'client/assets/fonts/TTNorms-HeavyItalic.ttf';
import TTNormsBlack from 'client/assets/fonts/TTNorms-Black.ttf';
import TTNormsExtraBoldItalic from 'client/assets/fonts/TTNorms-ExtraBoldItalic.ttf';
import TTNormsExtraBold from 'client/assets/fonts/TTNorms-ExtraBold.ttf';
import TTNormsExtraLightItalic from 'client/assets/fonts/TTNorms-ExtraLightItalic.ttf';
import TTNormsLight from 'client/assets/fonts/TTNorms-Light.ttf';
import TTNormsHeavy from 'client/assets/fonts/TTNorms-Heavy.ttf';
import TTNormsItalic from 'client/assets/fonts/TTNorms-Italic.ttf';
import TTNormsThin from 'client/assets/fonts/TTNorms-Thin.ttf';
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

  @font-face {
    font-family: 'TTNorms-BoldItalic';
    src: url(${TTNormsBoldItalic}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-Bold';
    src: url(${TTNormsBold}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-BlackItalic';
    src: url(${TTNormsBlackItalic}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-Regular';
    src: url(${TTNormsRegular}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-MediumItalic';
    src: url(${TTNormsMediumItalic}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-ExtraLight';
    src: url(${TTNormsExtraLight}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-ThinItalic';
    src: url(${TTNormsThinItalic}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-Medium';
    src: url(${TTNormsMedium}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-LightItalic';
    src: url(${TTNormsLightItalic}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-HeavyItalic';
    src: url(${TTNormsHeavyItalic}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-Black';
    src: url(${TTNormsBlack}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-ExtraBoldItalic';
    src: url(${TTNormsExtraBoldItalic}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-ExtraBold';
    src: url(${TTNormsExtraBold}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-ExtraLightItalic';
    src: url(${TTNormsExtraLightItalic}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-Light';
    src: url(${TTNormsLight}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-Heavy';
    src: url(${TTNormsHeavy}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-Italic';
    src: url(${TTNormsItalic}) format('ttf');
  }

  @font-face {
    font-family: 'TTNorms-Thin';
    src: url(${TTNormsThin}) format('ttf');
  }

  body {
    height: 100%;
    margin: 0;
    font-family: ${FONTS.regular};
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
`;
