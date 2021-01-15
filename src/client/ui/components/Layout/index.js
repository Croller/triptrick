import React from 'react';
import { NavBar } from 'client/ui/components/NavBar';
import { Wrapper, Content } from './styled';

export const Layout = ({ children }) => (
  <Wrapper>
    <NavBar />
    <Content>
      {children}
    </Content>
  </Wrapper>
);
