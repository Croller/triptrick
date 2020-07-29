import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';

const Layout = (props) => {
  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default translate()(withRouter(Layout));
