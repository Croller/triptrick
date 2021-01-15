import React, { useState } from 'react';
import { LogoPng } from 'client/assets/images';
import { BREAKPOINTS } from 'client/style/constants';
import { compareBreakpoint } from 'client/utils/common';
import {
  Wrapper,
  Nav, Container,
  Brand, Logo,
  MenuIcon, Menu, Item, Link,
} from './styled';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(window.innerWidth, BREAKPOINTS.xs, compareBreakpoint(window.innerWidth, BREAKPOINTS.xs));
  return (
    <Wrapper>
      <Nav>
        <Container>
          <Brand>
            <Logo src={LogoPng} />
          </Brand>
          {compareBreakpoint(window.innerWidth, BREAKPOINTS.xs) && (
            <MenuIcon onClick={() => setIsOpen(!isOpen)} />
          )}
          <Menu show={isOpen}>
            <Item><Link href="/">Главная</Link></Item>
            <Item><Link href="/blog">Блог</Link></Item>
            <Item><Link href="/account">Кабинет</Link></Item>
          </Menu>
        </Container>
      </Nav>
    </Wrapper>
  );
};
