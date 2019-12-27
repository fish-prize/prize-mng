import React, { Component } from 'react';
import { Grid, Dialog, Button, Form, Input, Field, Message, NumberPicker, Upload, Radio } from '@alifd/next';
import Img from '@icedesign/img';
import Select from '@alifd/next/lib/select';
import { update } from '../../../../api/products';
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

  handlePrizeActivitySelectChange = item => {
    console.log('handlePrizeActivitySelectChange: ', item);
    if (!item) return;
    this.field.setValues({ prizeId: item.value, prizeTitle: item.label });
    this.setState({
      visible: true,
      prizeId: item.value,
      prizeTitle: item.label,
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

      if (!values.productIcon) {
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
    this.field.setValues({ productIcon: imgUrl });
  };
  onUploadRemove = () => {
    this.field.setValues({ productIcon: '' });
  };
  onOpen = (index, record) => {
    const copyRecord = Object.assign({}, record);
    this.field.setValues({ ...copyRecord });
    this.setState({
      visible: true,
      prizeId: record.prizeId,
      prizeTitle: record.prizeTitle,
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
            <FormItem label="奖品ID：" {...formItemLayout}>
              <Input readOnly
                {...init('id', {
                       rules: [{ required: true, disabled: true }],
                     })}
              />
            </FormItem>
            <FormItem label="奖品名称：" {...formItemLayout}>
              <Input
                {...init('productName', {
                       rules: [{ required: true, disabled: true, message: '请输入奖品名称' }],
                     })}
              />
            </FormItem>
            <FormItem label="抽奖活动：" {...formItemLayout}>
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
            <FormItem label="奖品ICON：" {...formItemLayout}>
              <Upload.Card
                autoUpload
                dragable
                useDataURL
                limit={1}
                timeout={10000}
                action={`${baseUrl}/file/upload`}
                accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                defaultValue={[
                  {
                    uid: record.id,
                    url: record.productIcon,
                    imgURL: record.productIcon,
                  },
                ]}
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
              <Radio.Group name="winBgImgUrl" >
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
};
