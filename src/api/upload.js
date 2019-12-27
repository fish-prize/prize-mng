import axios from '../utils/myAxios';

export async function uploadFile(file, onProgress, onSuccess, onError) {
  console.log('--->file is=>', file);
  const data = new FormData();
  data.append('name', file.name);
  data.append('file', file);
  axios.put('/file/upload', data, {
    timeout: 300000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    transformRequest: [function (trasferData) {
      return trasferData;
    }],
    onUploadProgress: progress => {
      const complete = progress.loaded / progress.total * 100 | 0;
      onProgress(complete);
    },
  }).then((response) => {
    console.log('upload file response', response);
    if (response && response.data && response.data.code === 1) {
      console.log('upload file success.', response.data);
      onSuccess(response.data);
    } else {
      onError('上传失败');
    }
  }).catch((error) => {
    onError(`${error}网络异常`);
  });
}
