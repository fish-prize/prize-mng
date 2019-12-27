import React, { Component } from 'react';
import Img from '@icedesign/img';
import { Grid, Dialog, Button, Form, Input, Field, Message, Upload, NumberPicker, Radio } from '@alifd/next';
import Select from '@alifd/next/lib/select';
import { update } from '../../../../api/products';
import AppHoc from '../../../AppHoc';
import { baseUrl } from '../../../../utils/myAxios';

import '../../Products.scss';

const { Row, Col } = Grid;
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
    this.props.prizeActivityDataSource();
    console.log('componentDidMount->', this.props.prizeActivityDataSource1);
  }

  handleSubmit = () => {
    this.field.validate((errors, values) => {
      console.log('values->', values);
      /* if (typeof values.startLearnTime === 'object') {
        values.startLearnTime = values.startLearnTime.format('YYYY-MM-DD HH:mm:ss');
      } */
      if (errors) {
        console.log('errors', errors);
        for (const one in errors) {
          console.log('error ', one, errors[one].errors[0]);
          Message.error(`${errors[one].errors[0]}`);
        }
        return;
      }
      if (!values.productIcon) {
        Message.error('请上传奖品ICON');
        return;
      }
      update(values)
        .then(() => {
          Message.success('新增成功');
          this.props.fetchData();
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
    this.field.setValues({ productIcon: imgUrl });
  };
  onUploadRemove = () => {
    this.field.setValues({ productIcon: '' });
  };
  onOpen = () => {
    if (this.props.prizeActivityDataSource1 && this.props.prizeActivityDataSource1[0]) {
      this.field.setValues({
        prizeId: this.props.prizeActivityDataSource1[0].value,
        prizeTitle: this.props.prizeActivityDataSource1[0].label,
      });
      this.setState({
        prizeId: this.props.prizeActivityDataSource1[0].value,
        prizeTitle: this.props.prizeActivityDataSource1[0].label,
      });
    }
    this.setState({
      visible: true
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  handlePrizeActivitySelectChange = item => {
    console.log('handlePrizeActivitySelectChange: ', item);
    if (!item) return;
    this.field.setValues({ prizeId: item.value, prizeTitle: item.label });
    this.setState({
      prizeId: item.value,
      prizeTitle: item.label,
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
            <FormItem label="抽奖活动：" required {...formItemLayout}>
              <Select
                style={{ width: '100%' }}
                showSearch
                useDetailValue
                filterLocal={false}
                dataSource={this.props.prizeActivityDataSource1}
                onChange={this.handlePrizeActivitySelectChange}
                value={{ value: this.state.prizeId, label: this.state.prizeTitle }}
              />
            </FormItem>
            <FormItem label="奖品名称：" {...formItemLayout}>
              <Input
                placeholder="请输入奖品名称"
                {...init('productName', {
                       rules: [{ required: true, message: '请输入奖品名称' }],
                     })}
              />
            </FormItem>
            <FormItem label="奖品ICON：" {...formItemLayout}>
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

            <FormItem label="库存：" {...formItemLayout}>
              <NumberPicker style={{ width: 120 }} min={0} max={9999999} precision={0} name="productTotal" defaultValue={9999999} />
            </FormItem>

            <FormItem label="中奖概率：" {...formItemLayout}>
              <NumberPicker style={{ width: 120 }} min={0} max={100} precision={0} name="hitRate" defaultValue={100} label="百分之:" />
            </FormItem>

            <FormItem label="中奖背景：" {...formItemLayout}>
              <Radio.Group defaultValue="http://img.ichenxing.cn/prize/win_bg_ty.gif" name="winBgImgUrl" >
                <Row>
                  <Col span="8" align="center">
                    <Radio value="http://img.ichenxing.cn/prize/win_bg_ty.gif">
                      通用奖背景
                    </Radio>
                  </Col>
                  <Col span="8">
                    <Radio value="http://img.ichenxing.cn/prize/win_bg_0.gif">
                      特等奖背景
                    </Radio>
                  </Col>
                  <Col span="8">
                    <Radio value="http://img.ichenxing.cn/prize/win_bg_1.gif">
                      一等奖背景
                    </Radio>
                  </Col>
                </Row>
                <Row>
                  <Col span="8" align="center">
                    <Img
                      src="http://img.ichenxing.cn/prize/win_bg_3.gif"
                      width={100}
                      height={110}
                      title="通用奖背景"
                    />
                  </Col>
                  <Col span="8">
                    <Img
                      src="http://img.ichenxing.cn/prize/win_bg_0.gif"
                      width={100}
                      height={110}
                      title="特等奖背景"
                    />
                  </Col>
                  <Col span="8">
                    <Img
                      src="http://img.ichenxing.cn/prize/win_bg_1.gif"
                      width={100}
                      height={110}
                      title="一等奖背景"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span="8" align="center">
                    <Radio value="http://img.ichenxing.cn/prize/win_bg_2.gif">
                      二奖背景
                    </Radio>
                  </Col>
                  <Col span="8">
                    <Radio value="http://img.ichenxing.cn/prize/win_bg_3.gif">
                      三奖背景
                    </Radio>
                  </Col>
                </Row>
                <Row>
                  <Col span="8" align="center">
                    <Img
                      src="http://img.ichenxing.cn/prize/win_bg_2.gif"
                      width={100}
                      height={110}
                      title="二等奖背景"
                    />
                  </Col>
                  <Col span="8">
                    <Img
                      src="http://img.ichenxing.cn/prize/win_bg_3.gif"
                      width={100}
                      height={110}
                      title="三等奖背景"
                    />
                  </Col>
                </Row>
              </Radio.Group>
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
