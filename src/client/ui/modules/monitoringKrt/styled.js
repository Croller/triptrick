import styled from 'styled-components';
import { List, Item } from 'client/ui/components/base/t-list';
import { PALETTE, THEME, FONTS } from 'client/style/constants';

export const Wrapper = styled.div`
  display: block;
`;

export const Tabs = styled(List)`
  padding: 15px 20px;
  width: 100%;
`;

export const Tab = styled(Item)`
  padding: 15px 20px;
  line-height: 28px;
  display: block;
  margin-right: 20px;
  box-shadow: ${THEME.containerBoxShadow};
  border-radius: ${THEME.containerBorderRadius};
  background-color: ${p => (p.active ? `${PALETTE.white}` : `${PALETTE.grey6}`)};
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  display: block;
  overflow-y: scroll;

  table {
    border-spacing: 0;

    th {
      background-color: ${PALETTE.red2};
      padding: 7px 10px;
    }

    td {
      padding: 7px 10px;
    }
  }
`;

export const Table = styled.div`
  display: block;
  border: 1px solid ${PALETTE.grey2};
  border-bottom-width: 0;
  transition: 0.5s;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  color: ${PALETTE.white};
  font-family: ${FONTS.bold};

  > div {
    background-color: ${PALETTE.red2};

    > div {
      border-color: ${PALETTE.white}
    }

    &:hover {
      background-color: ${PALETTE.red2};
    }

  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${PALETTE.grey2};
  background-color: ${PALETTE.white};
  cursor: pointer;

  &:hover {
    background-color: ${PALETTE.grey6};
    -webkit-transition: background-color 0.2s linear;
    -ms-transition: background-color 0.2s linear;
    transition: background-color 0.2s linear;
  }
`;

export const Cell = styled.div`
  display: flex;
  width: ${p => p.width || '200px'};
  text-align: center;
  padding: 7px 10px;
  min-height: 60px;
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${PALETTE.grey2};

  &:last-child {
    border-right-width: 0;
  }
`;

export const GroupText = styled.span`
  text-transform: uppercase;
  color: ${PALETTE.red2};
  letter-spacing: 8px;
  font-family: ${FONTS.bold};
`;

export const NameText = styled.span`
  font-family: ${FONTS.bold};
`;

export const Text = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

// GroupWrapper,
//   Group,
//   GroupCount,
//   Before,
//   Current,
//   GroupLabel,

export const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

export const GroupTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: ${PALETTE.red2};
  letter-spacing: 8px;
  font-family: ${FONTS.bold};
  margin-bottom: 50px;
`;

export const GroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 150px;
  justify-content: center;
`;

export const Group = styled.div`
  width: 220px;
  height: 170px;
  border-radius: ${THEME.containerBorderRadius};
  background-color: ${PALETTE.white};
  box-shadow: ${THEME.containerBoxShadow};
  margin-left: 30px;
`;

export const GroupCount = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
`;

export const Before = styled.div`
  font-size: 24px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 10px;
`;

export const Current = styled.div`
  font-size: 65px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const GroupName = styled.div`
  height: 70px;
  font-family: ${FONTS.bold};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
