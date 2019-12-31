import React, { Component } from 'react';
import {Grid, Dialog, Button, Form, Input, Field, Message, NumberPicker, Upload, Radio, DatePicker} from '@alifd/next';
import Img from '@icedesign/img';
import Select from '@alifd/next/lib/select';
import { update } from '../../../../api/goods';
import AppHoc from '../../../AppHoc';
import { baseUrl } from '../../../../utils/myAxios';

const { Row, Col } = Grid;

const FormItem = Form.Item;

@AppHoc
export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      /* dataIndex: null, */
    };
    this.field = new Field(this);
  }

  handlePrizeProductSelectChange = item => {
    console.log('handlePrizeProductSelectChange: ', item);
    if (!item) return;
    this.field.setValues({ productId: item.value, productName: item.label });
    this.setState({
      visible: true,
      productId: item.value,
      productName: item.label,
    });
  };

  handleSubmit = () => {
    this.field.validate((errors, values) => {
      // values.startLearnTime = values.startLearnTime.format('YYYY-MM-DD HH:mm:ss');
      /* if (typeof values.startLearnTime === 'object') {
        values.startLearnTime = values.startLearnTime.format('YYYY-MM-DD HH:mm:ss');
      } */
      // console.log('values->', values);
      if (errors) {
        console.log('errors', errors);
        for (const one in errors) {
          console.log('error ', one, errors[one].errors[0]);
          Message.error(`${errors[one].errors[0]}`);
        }
        return;
      }

      if (!values.goodsPic) {
        Message.error('请上传奖品ICON');
        return;
      }

      update(values)
        .then(() => {
          // const { dataIndex } = this.state;
          // console.log('update -> ', dataIndex);
          // this.props.getFormValues(dataIndex, values);
          this.props.fetchData();
          Message.success('更新成功');
        })
        .catch(() => {
          Message.error('更新失败');
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
  onOpen = (index, record) => {
    const copyRecord = Object.assign({}, record);
    this.field.setValues({ ...copyRecord });
    this.setState({
      visible: true,
      productId: record.productId,
      productName: record.productName,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

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
          编 辑
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="编辑"
        >
          <Form field={this.field}>
            <FormItem label="奖品：" required {...formItemLayout}>
              <Select
                style={{ width: '100%' }}
                showSearch
                useDetailValue
                filterLocal={false}
                dataSource={this.props.prizeProductsDataSource1}
                onChange={this.handlePrizeProductSelectChange}
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

            <FormItem label="库存：" {...formItemLayout}>
              <NumberPicker style={{ width: 120 }} min={0} max={9999999} precision={0} name="goodsTotal" defaultValue={9999999} />
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
                defaultValue={[
                  {
                    uid: record.id,
                    url: record.goodsPic,
                    imgURL: record.goodsPic,
                  },
                ]}
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
};
