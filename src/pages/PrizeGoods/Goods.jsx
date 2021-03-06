import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import IceContainer from '@icedesign/container';
import CustomHead from './components/CustomHead';
import ContractTable from './components/ContractTable';
import SearchFilter from './components/SearchFilter';

import { list } from '../../api/goods';

const { Row, Col } = Grid;

export default class Goods extends Component {
  static displayName = 'Goods';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      filter: {},
      dataSource: [],
      total: 0,
      isLoading: false
    };
  }
  async componentDidMount() {
    // 假设此处从服务端获取html格式的编辑器内容
    const params = this.props.location && this.props.location.query && this.props.location.query.outlineId ? { outlineId: this.props.location.query.outlineId } : {};
    this.fetchData(params);
  }

  fetchData = (params) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        const req = Object.assign(this.state.filter || {}, params);
        list(req)
          .then((response) => {
            this.setState({
              dataSource: response.data.data.content,
              total: response.data.data.total,
              isLoading: false,
            });
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            this.setState({
              isLoading: false,
            });
          });
      },
    );
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { dataSource, total, isLoading } = this.state;
    return (
      <Row gutter={20} wrap>
        <Col l="24">
          <IceContainer style={{ padding: '0' }}>
            <CustomHead
              title="物品列表"
              fetchData={this.fetchData}
            />
            <div style={{ padding: '20px' }}>
              <SearchFilter query={this.props.location.query} setFilter={this.setFilter} fetchData={this.fetchData} />
              <ContractTable
                isLoading={isLoading}
                dataSource={dataSource}
                fetchData={this.fetchData}
                total={total}
              />
            </div>
          </IceContainer>
        </Col>
      </Row>
    );
  }
}
