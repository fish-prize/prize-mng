import React, { Component } from 'react';
import Img from '@icedesign/img';
import { Table, Pagination } from '@alifd/next';
import PropTypes from 'prop-types';

import EditDialog from '../CustomDialog/EditDialog';
import ConfirmDialog from '../CustomDialog/ConfirmDialog';
import './CustomTable.scss';

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static defaultProps = {
    dataSource: [],
  };

  static propTypes = {
    dataSource: PropTypes.array,
    total: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 15,
    };
  }

  handlePagination = (current) => {
    this.setState(
      {
        current,
      },
      () => {
        this.props.fetchData({ page: current, pageSize: this.state.pageSize });
      },
    );
  };

  handlePageSizeChange = (pageSize) => {
    this.setState(
      {
        pageSize,
      },
      () => {
        this.props.fetchData({ page: this.state.current, pageSize });
      },
    );
  };

  handleAuthorize = (advertiserId) => {
    if (!advertiserId) {
      console.log('invalid advertiserId');
    }
  };

  getFormValues = (dataIndex, values) => {
    // const { dataSource } = this.state;
    const { dataSource } = this.props;
    dataSource[dataIndex] = values;
    this.setState({
      dataSource,
    });
  };
  render() {
    const { dataSource, total, style = {}, isLoading = false } = this.props;
    const renderShowRate = (value, index, record) => {
      return (
        <div>
          {record.showRate}%
        </div>
      );
    };

    const renderGoodsPic = (value, index, record) => {
      return (
        <Img
          width={100}
          height={110}
          src={record.goodsPic}
          type="cover"
        />
      );
    };
    const renderOperation = (value, index, record) => {
      // console.log('value-->', value,'index-->', index, 'record-->', record);
      return (
        <div>
          <EditDialog
            index={index}
            record={record}
            /* getFormValues={this.getFormValues} */
            fetchData={this.props.fetchData}
          />
          <ConfirmDialog
            index={index}
            record={record}
            fetchData={this.props.fetchData}
            confirmTitle="确认删除"
            confirmContent={<span style={styles.confirmContent}>您真的要删除吗？</span>}
            confirmBtnTitle="删除"
          />
        </div>
      );
    };

    return (
      <div style={style}>
        <Table
          loading={isLoading}
          dataSource={dataSource}
          hasBorder={false}
          className="custom-table"
          style={{ minHeight: '500px' }}
        >
          <Table.Column title="ID" dataIndex="id" />
          <Table.Column title="奖品标题" dataIndex="productName" />
          <Table.Column title="物品名称" dataIndex="goodsTitle" />
          <Table.Column title="物品图片" dataIndex="goodsPic" cell={renderGoodsPic} />
          <Table.Column title="物品库存" dataIndex="goodsTotal" />
          <Table.Column title="领取过期时间" dataIndex="expireTime" />
          <Table.Column title="出现概率" dataIndex="showRate" cell={renderShowRate} />
          <Table.Column title="领取地址" dataIndex="targetUrl" />
          <Table.Column title="创建时间" dataIndex="createTime" />
          <Table.Column title="更新时间" dataIndex="updateTime" />
          <Table.Column title="操作" dataIndex="authed" cell={renderOperation} />
        </Table>
        <Pagination
          total={total}
          style={styles.pagination}
          current={this.state.current}
          onChange={this.handlePagination}
          pageSize={this.state.pageSize}
          pageSizeList={[10, 15, 20, 50]}
          onPageSizeChange={this.handlePageSizeChange}
          pageSizeSelector="filter"
          pageSizePosition="end"
        />
      </div>
    );
  }
}

const styles = {
  pagination: {
    margin: '20px 0',
    textAlign: 'center',
  },
  link: {
    margin: '0 5px',
    color: 'rgba(49, 128, 253, 0.65)',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  disabled: {
    color: 'graytext',
    cursor: 'not-allowed',
    textDecoration: 'none',
  },
  separator: {
    margin: '0 8px',
    display: 'inline-block',
    height: '12px',
    width: '1px',
    verticalAlign: 'middle',
    background: '#e8e8e8',
  },
  confirmContent: {
    color: 'red',
    fontSize: '16px',
  },
  cover: {
    height: '60px',
  },
};
