import React from 'react';
import { Map } from 'client/ui/components/base/t-map';
import {
  Wrapper,
  Container,
  Content,
  GridStyled,
  ServicesWrapper,
  SearchWrapper,
  FilterWrapper,
  ResultsWrapper,
} from './styled';

const Main = () => (
  <Wrapper>
    <Map />
    <Container>
      <Content>
        <GridStyled>
          <ServicesWrapper />
          <SearchWrapper />
          <FilterWrapper />
          <ResultsWrapper />
        </GridStyled>
      </Content>
    </Container>
  </Wrapper>
);

export default Main;
