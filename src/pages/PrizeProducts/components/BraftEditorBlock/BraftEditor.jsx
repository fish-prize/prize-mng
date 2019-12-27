import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { uploadFile } from '../../../../api/upload';

export default class BraftEditorBlock extends Component {
  componentDidMount() {}
  uploadPlug = (param) => {
    uploadFile(param.file, (complete) => {
      param.progress(complete);
    }, (data) => {
      console.log('data.url', data.data.url);
      param.success({
        url: data.data.url,
        meta: {
          id: new Date().getTime(),
          title: data.name || '默认',
          alt: data.name || '默认',
          loop: true, // 指定音视频是否循环播放
          autoPlay: true, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
          poster: data.poster || '', // 指定视频播放器的封面
        },
      });
    }, (error) => {
      console.log('upload error', error);
      param.error({
        msg: error,
      });
    });
  };

  render() {
    // this.props.content
    const defaultProps = {
      height: 300,
      placeholder: '请输入内容',
      contentFormat: 'html',
    };
    return (
      <IceContainer>
        <BraftEditor {...defaultProps}
          value={this.props.editorState}
          media={{ uploadFn: this.uploadPlug }}
          onChange={this.props.handleChange}
        />
      </IceContainer>
    );
  }
}
