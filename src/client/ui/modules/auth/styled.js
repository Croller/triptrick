import styled from 'styled-components';
import {
  PALETTE,
  THEME,
} from 'client/style/constants';
import { Input } from 'client/ui/components/base/t-input';
import { Button } from 'client/ui/components/base/t-button';

export const Wrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background-color: ${PALETTE.grey6};
`;

export const LoginWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-70%);
  margin-left: auto;
  margin-right: auto;
  width: 240px;
  background-color: ${PALETTE.white};
  border-radius: 8px;
  box-shadow: ${THEME.containerBoxShadow};
  padding: 30px 40px;
`;

export const Login = styled(Input)`
  margin: 0 0 20px;
`;

export const Password = styled(Input)`
  margin: 0 0 30px;
`;

export const SignIn = styled(Button)`
  width: 100%;
`;
