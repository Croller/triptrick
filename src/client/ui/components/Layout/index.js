import React from 'react';
import { NavBar } from 'client/ui/components/NavBar';
import { Container, Content } from './styled';

export const Layout = (props) => {
  const { children } = props;
  return (
    <Container>
      <NavBar />
      <Content>
        {children}
      </Content>
    </Container>
  );
};
