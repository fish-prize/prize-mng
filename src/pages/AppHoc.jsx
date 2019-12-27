import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from '../utils/injectReducer';

import { prizeActivityDataSource } from '../store/prizeActivityDataSource/action';
import prizeActivityDataSourceReducer from '../store/prizeActivityDataSource/reducer';

import { prizeProductsDataSource } from '../store/prizeProductsDataSource/action';
import prizeProductsDataSourceReducer from '../store/prizeProductsDataSource/reducer';

import { prizeGoodsDataSource } from '../store/prizeGoodsDataSource/action';
import prizeGoodsDataSourceReducer from '../store/prizeGoodsDataSource/reducer';
/*
import { seriesDataSource } from '../store/seriesDataSource/action';
import seriesDataSourceReducer from '../store/seriesDataSource/reducer';

import { outlineDataSource } from '../store/outlineDataSource/action';
import outlineDataSourceReducer from '../store/outlineDataSource/reducer';
*/

const AppHoc = (WrappedComponent) => {
  class AppContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    componentDidMount() {

    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapDispatchToProps = {
    prizeActivityDataSource,
    prizeProductsDataSource,
    prizeGoodsDataSource,
    /* seriesDataSource,
    outlineDataSource,
    */
  };

  const mapStateToProps = (state) => {
    // console.log('mapStateToProps->', state.subjectDataSource.dataSource);
    return {
      prizeActivityDataSource1: state.prizeActivityDataSource.dataSource,
      prizeProductsDataSource1: state.prizeProductsDataSource.dataSource,
      prizeGoodsDataSource1: state.prizeGoodsDataSource.dataSource,
      /* seriesDataSource1: state.seriesDataSource.dataSource,
      outlineDataSource1: state.outlineDataSource.dataSource,
      */
    };
  };

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
  );

  const withPrizeActivityDateSourceReducer = injectReducer({
    key: 'prizeActivityDataSource',
    reducer: prizeActivityDataSourceReducer,
  });

  const withPrizeProductsDateSourceReducer = injectReducer({
    key: 'prizeProductsDataSource',
    reducer: prizeProductsDataSourceReducer,
  });

  const withPrizeGoodsDateSourceReducer = injectReducer({
    key: 'prizeGoodsDataSource',
    reducer: prizeGoodsDataSourceReducer,
  });

  /* const withSeriesDateSourceReducer = injectReducer({
    key: 'seriesDataSource',
    reducer: seriesDataSourceReducer,
  });

  const withOutlineDateSourceReducer = injectReducer({
    key: 'outlineDataSource',
    reducer: outlineDataSourceReducer,
  }); */

  return compose(
    withPrizeActivityDateSourceReducer,
    withPrizeProductsDateSourceReducer,
    withPrizeGoodsDateSourceReducer,
    /* withSubjectDateSourceReducer,
    withSeriesDateSourceReducer,
    withOutlineDateSourceReducer, */
    withConnect
  )(AppContainer);
};

export default AppHoc;
