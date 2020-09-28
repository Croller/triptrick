import React from 'react';
import {
  Wrapper,
  Background,
  Container,
  BounceFirst,
  BounceSecond,
} from './styled';

export const Loader = ({ className = '', height = null, color = null }) => (
  <Wrapper className={className} height={height}>
    <Background />
    <Container>
      <BounceFirst color={color} />
      <BounceSecond />
    </Container>
  </Wrapper>
);
