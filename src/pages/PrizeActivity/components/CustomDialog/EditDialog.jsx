import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, Message } from '@alifd/next';
import Select from '@alifd/next/lib/select';
import BraftEditor from 'braft-editor';
import BraftEditorBlock from '../BraftEditorBlock/BraftEditor';
import { update } from '../../../../api/activity';
import AppHoc from '../../../AppHoc';


const FormItem = Form.Item;
const Option = Select.Option;
@AppHoc
export default class EditDialog extends Component {
  static displayName = 'EditDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    const editorStateOfRules = BraftEditor.createEditorState('<p></p>');
    const editorStateOfInvalidContent = BraftEditor.createEditorState('<p></p>');
    this.state = {
      visible: false,
      dataIndex: null,
      status: 0,
      editorStateOfRules,
      editorStateOfInvalidContent,
    };
    this.field = new Field(this);
  }

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

  handleStatusChanged = value => {
    this.setState({ status: value });
    this.field.setValues({ status: value });
  }

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

  onOpen = (index, record) => {
    const copyRecord = Object.assign({}, record);
    this.field.setValues({ ...copyRecord });

    const editorStateOfRules = BraftEditor.createEditorState(copyRecord.rules);
    const editorStateOfInvalidContent = BraftEditor.createEditorState(copyRecord.invalidContent);

    this.setState({
      visible: true,
      // dataIndex: index,
      status: copyRecord.status,
      editorStateOfRules,
      editorStateOfInvalidContent,
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
            <FormItem label="抽奖活动ID：" {...formItemLayout}>
              <Input readOnly
                {...init('id', {
                       rules: [{ required: true, disabled: true }],
                     })}
              />
            </FormItem>
            <FormItem label="抽奖活动名称：" {...formItemLayout}>
              <Input
                {...init('prizeTitle', {
                       rules: [{ required: true, disabled: true, message: '请输入章节名称' }],
                     })}
              />
            </FormItem>

            <FormItem label="状态：" {...formItemLayout}>
              <Select value={this.state.status} onChange={this.handleStatusChanged} style={{ width: '100%' }}>
                <Option value="1">有效</Option>
                <Option value="0">无效</Option>
              </Select>
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
