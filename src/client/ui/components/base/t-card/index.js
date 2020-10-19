import React from 'react';
import {
  Wrapper,
  Header, Title, Extra,
  Content,
  Control,
} from './styled';

export const Card = ({
  title = '',
  extra = null,
  control = null,
  className = '',
  children,
}) => (
  <Wrapper className={`t-card ${className}`}>
    {title && (
      <Header className="t-card-head">
        <Title className="t-card-head-title">
          {title}
        </Title>
        {extra && (
          <Extra className="t-card-head-extra">
            {extra}
          </Extra>
        )}
      </Header>
    )}
    <Content className="t-card-content">
      {children}
    </Content>
    {control && (
      <Control className="t-card-control">
        {control}
      </Control>
    )}
  </Wrapper>
);
