import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Wrapper,
  Box,
  Label,
} from './styled';

export const MainModule = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <Box onClick={history.push('/monitoring_krt')}>
        <Label>
          Мониторинг КРТ
        </Label>
      </Box>
    </Wrapper>
  );
};

