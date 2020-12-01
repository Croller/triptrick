import styled from 'styled-components';
import {
  PALETTE,
  THEME,
} from 'client/style/constants';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${PALETTE.grey6};
`;

export const Box = styled.div`
  width: 200px;
  border-radius: 8px;
  box-shadow: ${THEME.containerBoxShadow};
  background-color: ${PALETTE.white};
`;

export const Label = styled.p`
  font-size: 18px;
`;

