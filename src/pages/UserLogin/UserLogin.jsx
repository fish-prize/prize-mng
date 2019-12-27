/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';
import Img from '@icedesign/img';

import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';

import { userLogin, checkSession } from './actions';
import { get as localGet } from '../../utils/localStorage';
import { baseUrl } from '../../utils/myAxios';

let id = new Date().getTime();


@withRouter
class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: localGet('his_login_username') || '',
        password: '',
        checkbox: false,
        verifyCode: '',
        codeId: id,
      },
      verifyCodeUrl: `${baseUrl}/mng/user/code?id=${id}`,
    };
  }

  componentDidMount() {
    this.props.checkSession();
    console.log('userLogin', this.props);
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleCodeClick = () => {
    id = new Date().getTime();
    this.setState({
      value: {
        codeId: id,
      },
      verifyCodeUrl: `${baseUrl}/mng/user/code?id=${id}`,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (!values.username) {
        Message.error('请输入用户名');
        return;
      }
      if (!values.password) {
        Message.error('请输入密码');
        return;
      }
      if (!values.verifyCode) {
        Message.error('请输入图片验证码');
        return;
      }
      if (errors) {
        console.log('errors', errors);
        return;
      }
      this.props.userLogin(values);
    });
  };

  handleKeydown = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmit(e);
    }
  };

  render() {
    return (
      <div style={styles.container}>
        <h4 style={styles.title}>登 录</h4>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formItems}>
            <div style={styles.formItem}>
              <IceIcon type="person" size="small" style={styles.inputIcon} />
              <IceFormBinder name="username" required message="必填">
                <Input
                  size="large"
                  maxLength={20}
                  placeholder="用户名"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="username" />
            </div>

            <div style={styles.formItem}>
              <IceIcon type="lock" size="small" style={styles.inputIcon} />
              <IceFormBinder name="password" required message="必填">
                <Input
                  size="large"
                  htmlType="password"
                  placeholder="密码"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="password" />
            </div>
            <div style={styles.formItem}>
              <IceIcon type="image" size="small" style={styles.inputIcon} />
              <IceFormBinder name="verifyCode" required message="必填">
                <Input
                  size="large"
                  placeholder="验证码"
                  style={styles.inputCol}
                  onKeyDown={this.handleKeydown}
                  innerAfter={
                    <a onClick={this.handleCodeClick}>
                      <Img
                        src={this.state.verifyCodeUrl}
                        height={30}
                        style={{ verticalAlign: 'middle' }}
                      />
                    </a>
                  }
                />
              </IceFormBinder>
              <IceFormError name="verifyCode" />
            </div>

            <div style={styles.footer}>
              <Button
                type="primary"
                size="large"
                onClick={this.handleSubmit}
                style={styles.submitBtn}
              >
                登 录
              </Button>
            </div>
          </div>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const mapDispatchToProps = {
  userLogin,
  checkSession,
};

const mapStateToProps = (state) => {
  return { loginResult: state.login };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });

export default compose(
  withReducer,
  withConnect,
)(UserLogin);

const styles = {
  container: {
    width: '400px',
    padding: '40px',
   /* background: '#fffff',*/
    borderRadius: '6px',
  },
  title: {
    marginBottom: '40px',
    color: 'rgba(255, 255, 255)',
    fontSize: '28px',
    fontWeight: '500',
    textAlign: 'center',
  },
  formItem: {
    position: 'relative',
    marginBottom: '20px',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '12px',
    color: '#666',
  },
  inputCol: {
    width: '100%',
    paddingLeft: '20px',
  },
  submitBtn: {
    width: '100%',
  },
  tips: {
    marginTop: '20px',
    display: 'block',
    textAlign: 'center',
  },
};

