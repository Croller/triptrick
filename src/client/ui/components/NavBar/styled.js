import styled from 'styled-components';
import {
  Z_INDEX,
  PALETTE,
  FONTS,
  BREAKPOINTS,
  THEME,
} from 'client/style/constants';

export const Wrapper = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${Z_INDEX.header};
`;

export const Nav = styled.nav`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.5rem 1rem;

  @media (min-width: 992px) {
    flex-flow: row nowrap;
    justify-content: flex-start;
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  padding: 15px;
  margin-left: auto;
  margin-right: auto;
  color: ${PALETTE.white};
  font-size: ${THEME.controlLabelFontSize};
  justify-content: space-between;
  flex-wrap: nowrap;
`;

export const Brand = styled.div`
  display: block;
`;

export const Logo = styled.img`
  height: 60px;
`;

export const Menu = styled.ul`
  position: absolute;
  flex-direction: column;
  width: 100%;
  top: 100px;
  left: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  display: ${p => (p.show ? 'block' : 'none')};

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 10px 0;
    top: 0;
  }
`;

export const MenuIcon = styled.div`
  margin: auto 0;
  font-size: 24px;
  color: ${PALETTE.grey2};
  padding: 5px 7px;
  border-radius: ${THEME.controlBorderRadius};
  cursor: pointer;

  &:hover {
    color: ${PALETTE.grey1};
  }

  &:focus {
    outline: none;
  }
`;

export const Item = styled.li`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  height: 100%;
  justify-content: center;
  text-decoration: none;
  font-family: ${FONTS.comfortaaRegular};
  line-height: 14px;
  margin: 0 15px;
  cursor: pointer;

  @media screen and (min-width: ${BREAKPOINTS.small}) {
    height: 40px;
  }
`;

export const Link = styled.a`
  color: ${PALETTE.black};
  font-size: ${THEME.controlLabelFontSize};
  transition: color 0.25s ease-in-out;
  line-height: 2.5;
  text-decoration: none;
  text-align: center;

  &::after {
    display: block;
    content: "";
    border-bottom: 3px solid ${PALETTE.orange1};
    transform: scaleX(0);
    transition: transform 0.25s ease-in-out;
  }

  &::before{
    position: absolute;
    left: 0;
    width: 100%;
  }

  &:hover {
    color: ${PALETTE.orange1};
    transition: color 0.25s ease-in-out;

    &::after{
      transform: scaleX(1);
    }
  }
`;
