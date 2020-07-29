import React, { Component } from 'react';
import { Spin, Icon } from 'antd';
import './Loader.scss';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
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
  }
}

export default Loader;
