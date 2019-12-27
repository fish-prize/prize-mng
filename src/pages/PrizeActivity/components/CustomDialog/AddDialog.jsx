import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, Message } from '@alifd/next';
import Select from '@alifd/next/lib/select';
import BraftEditor from 'braft-editor';
import { update } from '../../../../api/activity';
import AppHoc from '../../../AppHoc';
import BraftEditorBlock from '../BraftEditorBlock/BraftEditor';


import '../../Activity.scss';

const FormItem = Form.Item;
const Option = Select.Option;
@AppHoc
export default class AddDialog extends Component {
  static displayName = 'AddDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    const editorStateOfRules = BraftEditor.createEditorState('<p></p>');
    const editorStateOfInvalidContent = BraftEditor.createEditorState('<p></p>');
    this.state = {
      status: 1,
      visible: false,
      editorStateOfRules,
      editorStateOfInvalidContent,
    };
    this.field = new Field(this);
  }

  handleSubmit = () => {
    this.field.validate((errors, values) => {
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
  handleInvalidContentChange = value => {
    // console.log('handleInvalidContentChange=>', value.toHTML());
    this.setState({ editorStateOfInvalidContent: value });
    this.field.setValues({ invalidContent: value.toHTML() });
  }

  handleRulesContentChange = value => {
    // console.log('editorStateOfRules=>', value.toHTML());
    this.setState({ editorStateOfRules: value });
    this.field.setValues({ rules: value.toHTML() });
  }

  onOpen = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  handleStatusChanged = value => {
    this.setState({ status: value });
    this.field.setValues({ status: value });
  }
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
          style={{ width: 800 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="新增"
        >
          <Form field={this.field}>
            <FormItem label="抽奖活动标题：" {...formItemLayout}>
              <Input
                placeholder="请输入抽奖活动标题"
                {...init('prizeTitle', {
                       rules: [{ required: true, message: '请输入抽奖活动标题' }],
                     })}
              />
            </FormItem>

            <FormItem label="状态：" {...formItemLayout}>
              <Select
                defaultValue={1}
                value={this.state.status}
                onChange={this.handleStatusChanged}
                style={{ width: '100%' }}
                {...init('status', {
                  rules: [{ required: true, disabled: true, message: '请选择状态' }],
                })}
              >
                <Option value="1">有效</Option>
                <Option value="0">无效</Option>
              </Select>
            </FormItem>

            <FormItem label="客服电话：" {...formItemLayout}>
              <Input
                placeholder="请输入客服电话"
                {...init('servicePhone', {
                  rules: [{ required: false, disabled: true, message: '请输入客服电话' }],
                })}
              />
            </FormItem>

            <FormItem label="活动规则：" {...formItemLayout}>
              <div style={{ width: 640, border: '1px solid #ccc', marginLeft: 1 }} className="my-component">
                <BraftEditorBlock
                  editorState={this.state.editorStateOfRules}
                  handleChange={this.handleRulesContentChange}
                />
              </div>
            </FormItem>

            <FormItem label="无效时推荐内容：" {...formItemLayout}>
              <div style={{ width: 640, border: '1px solid #ccc', marginLeft: 1 }} className="my-component">
                <BraftEditorBlock
                  editorState={this.state.editorStateOfInvalidContent}
                  handleChange={this.handleInvalidContentChange}
                />
              </div>
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
