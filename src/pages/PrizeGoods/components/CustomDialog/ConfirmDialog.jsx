import React, { Component } from 'react';
import { Dialog, Button, Form, Input, Field, Message } from '@alifd/next';
import { del } from '../../../../api/goods';


export default class ConfirmDialog extends Component {
  static displayName = 'ConfirmDialog';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.field = new Field(this);
  }

  handleSubmit = () => {
    this.field.validate((errors, values) => {
      if (errors) {
        Message.error('请检查你的输入');
        return;
      }
      // console.log('confirm values->', values);
      del(values)
        .then(() => {
          this.props.fetchData();
          Message.success('删除成功');
        })
        .catch((err) => {
          console.log('confirm ', err);
          Message.error('删除失败');
        })
        .finally(() => {
          // this.setState({
          //   visible: false,
          // });
        });
    });
  };

  onOpen = (index, record) => {
    this.field.setValues({ ...record });
    this.setState({
      visible: true,
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

    return (
      <div style={styles.editDialog}>
        <Button type="secondary" size="small" onClick={() => this.onOpen(index, record)}>
          {this.props.confirmBtnTitle}
        </Button>
        <Dialog
          style={{ width: 640 }}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          closeable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title={this.props.confirmTitle}
        >
          <Form field={this.field}>
            <Input htmlType="hidden"
              {...init('id', {
                     rules: [{ required: true }],
                   })}
            />
            {this.props.confirmContent}
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
