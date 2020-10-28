import styled, {css } from 'styled-components';
import {
  Z_INDEX,
  PALETTE,
  THEME,
  BREAKPOINTS,
} from 'client/style/constants';
import { Grid } from 'client/ui/components/base/t-grid';

export const Wrapper = styled.div`
  display: block;
`;

export const Container = styled.div`
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  z-index: ${Z_INDEX.content};

  @media screen and (min-width: ${BREAKPOINTS.md}) {
    top: 40%;
  }
`;

export const Content = styled.div`
  max-width: ${BREAKPOINTS.xs};
  margin: auto;

  ${() => Object.keys(BREAKPOINTS).map(key => css`
    @media (min-width: ${BREAKPOINTS[key]}) {
      max-width: ${BREAKPOINTS[key]};
    }
  `)}
`;

export const GridStyled = styled(Grid)`
  grid-template-areas:
    "sw sw sw sw sw sw sw sw sw sw sw sw"
    "pw pw pw pw pw pw pw pw pw pw pw pw"
    "fw fw fw fw fw fw fw fw fw fw fw fw"
    "rw rw rw rw rw rw rw rw rw rw rw rw";

  @media screen and (min-width: ${BREAKPOINTS.md}) {
    grid-template-areas:
      ". . . . sw sw sw sw sw sw sw sw sw sw . . . ."
      ". . pw pw pw pw pw pw pw pw pw pw pw pw pw pw . ."
      "fw fw fw fw fw rw rw rw rw rw rw rw rw rw rw rw rw rw";
  }
`;

export const ServicesWrapper = styled.div`
  grid-area: sw;
  height: 40px;
  margin-bottom: 20px;
  background-color: ${PALETTE.white};
  border-radius: ${THEME.containerBorderRadius};
  box-shadow: ${THEME.containerBoxShadow};

  @media screen and (min-width: ${BREAKPOINTS.md}) {
    margin-bottom: 30px;
  }
`;

export const SearchWrapper = styled.div`
  grid-area: pw;
  height: 60px;
  margin-bottom: 10px;
  background-color: ${PALETTE.white};
  border-radius: ${THEME.containerBorderRadius};
  box-shadow: ${THEME.containerBoxShadow};

  @media screen and (min-width: ${BREAKPOINTS.md}) {
    margin-bottom: 80px;
  }
`;

export const FilterWrapper = styled.div`
  grid-area: fw;
  height: 300px;
  margin-bottom: 10px;
  background-color: ${PALETTE.white};
  border-radius: ${THEME.containerBorderRadius};
  box-shadow: ${THEME.containerBoxShadow};

  @media screen and (min-width: ${BREAKPOINTS.md}) {
    margin-bottom: 0;
  }
`;

export const ResultsWrapper = styled.div`
  grid-area: rw;
  height: 600px;
  background-color: ${PALETTE.white};
  border-radius: ${THEME.containerBorderRadius};
  box-shadow: ${THEME.containerBoxShadow};
`;
