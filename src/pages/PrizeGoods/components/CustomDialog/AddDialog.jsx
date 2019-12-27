import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, Message, Upload, NumberPicker, DatePicker } from '@alifd/next';
import Select from '@alifd/next/lib/select';
import { update } from '../../../../api/goods';
import AppHoc from '../../../AppHoc';
import { baseUrl } from '../../../../utils/myAxios';

import '../../Goods.scss';

const FormItem = Form.Item;

@AppHoc
export default class AddDialog extends Component {
  static displayName = 'AddDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.field = new Field(this);
  }

  componentDidMount() {
    this.props.prizeProductsDataSource();
    // this.props.prizeGoodsDataSource();
  }

  handleSubmit = () => {
    this.field.validate((errors, values) => {
      console.log('values->', values);
      /* if (typeof values.startLearnTime === 'object') {
        values.startLearnTime = values.startLearnTime.format('YYYY-MM-DD HH:mm:ss');
      } */
      if (typeof values.expireTime === 'object') {
        values.expireTime = values.expireTime.format('YYYY-MM-DD HH:mm:ss');
      }
      if (errors) {
        console.log('errors', errors);
        for (const one in errors) {
          console.log('error ', one, errors[one].errors[0]);
          Message.error(`${errors[one].errors[0]}`);
        }
        return;
      }
      if (!values.goodsPic) {
        Message.error('请上传物品图片');
        return;
      }
      update(values)
        .then(() => {
          Message.success('新增成功');
          this.props.fetchData();
          this.props.prizeProductsDataSource();
        })
        .catch(() => {
          Message.error('新增失败');
        })
        .finally(() => {
          this.setState({
            visible: false,
          });
        });
    });
  };

  onUploadSuccess = (file, value) => {
    const imgUrl = value[0].response.data.url;
    this.field.setValues({ goodsPic: imgUrl });
  };
  onUploadRemove = () => {
    this.field.setValues({ goodsPic: '' });
  };
  onOpen = () => {
    if (this.props.prizeProductsDataSource1 && this.props.prizeProductsDataSource1[0]) {
      this.field.setValues({
        productId: this.props.prizeProductsDataSource1[0].value,
        productName: this.props.prizeProductsDataSource1[0].label,
      });
      this.setState({
        productId: this.props.prizeProductsDataSource1[0].value,
        productName: this.props.prizeProductsDataSource1[0].label,
      });
    }
    /* if (this.prizeGoodsDataSource1 && this.prizeGoodsDataSource1[0]) {
      this.field.setValues({
        id: this.prizeGoodsDataSource1[0].value,
        goodsTitle: this.props.prizeGoodsDataSource1[0].label,
      });
      this.setState({
        id: this.props.prizeGoodsDataSource1[0].value,
        goodsTitle: this.props.prizeGoodsDataSource1[0].label,
      });
    } */
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  handlePrizeProductsSelectChange = item => {
    console.log('handlePrizeProductsSelectChange: ', item);
    if (!item) return;
    this.field.setValues({ productId: item.value, productName: item.label });
    this.setState({
      productId: item.value,
      productName: item.label,
    });
  };
  printError = (name) => {
    if (this.field.getError(name)) {
      return <span className="error-msg">{this.field.getError(name).join(',')}</span>;
    }
  }

  render() {
    const init = this.field.init;
    const { index, record } = this.props;

    const formItemLayout = {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    return (
      <div style={styles.editDialog}>
        <Button type="secondary" size="small" onClick={() => this.onOpen(index, record)}>
          新 增
        </Button>
        <Dialog
          style={{ width: 600 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="新增"
        >
          <Form field={this.field}>
            <FormItem label="奖品：" required {...formItemLayout}>
              <Select
                style={{ width: '100%' }}
                showSearch
                useDetailValue
                filterLocal={false}
                dataSource={this.props.prizeProductsDataSource1}
                onChange={this.handlePrizeProductsSelectChange}
                value={{ value: this.state.productId, label: this.state.productName }}
              />
            </FormItem>
            <FormItem label="物品名称：" {...formItemLayout}>
              <Input
                placeholder="请输入物品名称"
                {...init('goodsTitle', {
                  rules: [{ required: true, message: '请输入物品名称' }],
                })}
              />
            </FormItem>
            <FormItem label="物品图片(建议300*300)：" {...formItemLayout}>
              <Upload.Card
                autoUpload
                dragable
                useDataURL
                limit={1}
                timeout={10000}
                action={`${baseUrl}/file/upload`}
                accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                onSuccess={this.onUploadSuccess}
                onRemove={this.onUploadRemove}
              />
            </FormItem>
            <FormItem label="出现概率：" {...formItemLayout}>
              <NumberPicker style={{ width: 120 }} min={0} max={100} precision={0} name="showRate" defaultValue={100} label="百分之:" />
            </FormItem>
            <FormItem label="领取过期时间：" {...formItemLayout}>
              <DatePicker
                format="YYYY-MM-DD"
                showTime={{ format: 'HH:mm:ss' }}
                {...init('expireTime', {
                  rules: [{ required: true, disabled: true, message: '前选择领取过期时间' }],
                })}
              />
            </FormItem>
            <FormItem label="领取地址：" {...formItemLayout}>
              <Input
                placeholder="请输入领取地址"
                {...init('targetUrl', {
                  rules: [{ required: true, message: '请输入领取地址' }],
                })}
              />
            </FormItem>
          </Form>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  },
  winBgLy: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-round',
  },
};
