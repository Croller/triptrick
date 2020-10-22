import styled from 'styled-components';
import { BREAKPOINTS } from 'client/style/constants';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 8px;
  overflow: initial;

  @media screen and (min-width: ${BREAKPOINTS.md}) {
    grid-template-columns: repeat(18, 1fr);
    grid-column-gap: 20px;
  }
`;
