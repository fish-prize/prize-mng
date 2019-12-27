/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import CustomForm from '../CustomForm';
import AppHoc from '../../../AppHoc';

@AppHoc
export default class SearchFilter extends Component {
  static displayName = 'SearchFilter';

  static propTypes = {};

  static defaultProps = {};

  initFields = {
    base: {
      productName: '',
      id: '',
      prizeId: '',
    },
  };

  state = {
    value: {
      productName: '',
      id: '',
      prizeId: '',
    },
  };

  componentWillMount() {
    this.props.prizeActivityDataSource();
    this.props.prizeProductsDataSource();
    const tmpValue = this.state.value;
    Object.assign(tmpValue, this.props.query);
    this.setState({ value: tmpValue });
  }

  /**
   * 提交回调函数
   */
  handleSubmit = (errors, value) => {
    if (errors) {
      console.log({ errors });
      return;
    }
    this.props.setFilter(value);
    this.props.fetchData(value);
    console.log({ value });
  };

  /**
   * 重置表单
   */
  handleReset = () => {
    this.setState(
      {
        value: Object.assign(
          {},
          this.initFields.base,
          this.initFields.advanced,
        ),
      }
    );
    this.props.setFilter({});
    this.props.fetchData();
  };

  /**
   * 获取渲染表单的字段
   */
  getFormFiled = (initConfig) => {
    const initFields = this.state.value;
    const config = initConfig.filter((item) => {
      const keys = Object.keys(initFields);
      return keys.includes(item.formBinderProps.name);
    });

    return {
      config,
    };
  };

  handleChange = (value) => {
    console.log('handleChange-->', value);
    // const valueTmp = this.state.value;
    // valueTmp.id = value.id;
    // valueTmp.prizeTitle = value.prizeTitle;
    // this.setState({ value: valueTmp });
  }
  /*
  handlePrizeActivitySerach = (value) => {
    if (this.searchPrizeActivityTimeout) {
      clearTimeout(this.searchPrizeActivityTimeout);
    }
    this.searchPrizeActivityTimeout = setTimeout(() => {
      this.props.prizeActivityDataSource({ prizeTitle: value });
    }, 100);
  } */
  render() {
    const config = [
      {
        label: '抽奖活动',
        component: 'Select',
        componentProps: {
          filterLocal: true,
          showSearch: true,
          hasClear: true,
          // useDetailValue: true,
        },
        formBinderProps: {
          name: 'prizeId',
          required: false,
          message: '请选择抽奖活动',
        },
        dataSourceName: 'prizeActivityDataSource1',
      },
      {
        label: '奖品',
        component: 'Select',
        componentProps: {
          filterLocal: true,
          showSearch: true,
          hasClear: true,
          // useDetailValue: true,
        },
        formBinderProps: {
          name: 'id',
          required: false,
          message: '请选择奖品',
        },
        dataSourceName: 'prizeProductsDataSource1',
      },
    ];

    const getFormFiled = this.getFormFiled(config);
    return (
      <CustomForm
        value={this.state.value}
        config={getFormFiled.config}
        handleSubmit={this.handleSubmit}
        handleReset={this.handleReset}
        handleChange={this.handleChange}
      />
    );
  }
}

