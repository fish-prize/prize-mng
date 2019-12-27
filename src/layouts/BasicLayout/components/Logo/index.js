import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo">
        <Link to="/" className="logo-text">
          抽奖活动后台
        </Link>
      </div>
    );
  }
}
