import React from 'react';
import { Spin, Icon } from 'antd';
import './Loader.scss';

const Loader = () => (
  <div className="Loader">
    <div className="background" />
    <div className="spiner">
      <Spin
        size="large"
        indicator={
          <Icon type="loading" style={{ fontSize: 35 }} spin />
        }
      />
    </div>
  </div>
);

export default Loader;
