import styled from 'styled-components';
import { PALETTE } from 'client/style/constants';

export const Wrapper = styled.ul`
  display: flex;
  flex-direction: ${p => (p.vertical ? 'column' : 'row')};
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Child = styled.li`
  display: flex;
  padding: 7px 5px;

  > svg {
    width: 10px;
    color: ${PALETTE.grey2};
    margin-right: 10px;
  }
`;
