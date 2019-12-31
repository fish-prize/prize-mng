#!/bin/bash
#替换线上接口地址为api.sweetbiancheng.com
sed -i "" "s/localhost:8081/prize.ichenxing.cn/g" /Users/wenxiaoyu/workspace/kuku/coding/prize/prize-mng/src/utils/myAxios.js

npm run build
cd build

rm -rf /Users/wenxiaoyu/workspace/kuku/coding/prize/prize-server/src/main/resources/static/mng

cp -R * /Users/wenxiaoyu/workspace/kuku/coding/prize/prize-server/src/main/resources/static/mng/

#zip -r sweetbiancheng-mng.zip *

#echo 'sweetbiancheng-mng.zip 到远程服务器'
#scp sweetbiancheng-mng.zip root@47.104.220.91:/usr/local/nginx/html/mng
#rm sweetbiancheng-mng.zip
#echo 'sweetbiancheng-mng.zip 到远程服务器 完成.'


#ssh root@47.104.220.91 "cd /usr/local/nginx/html/mng; unzip -o sweetbiancheng-mng.zip"
#echo '解压远程 sweetbiancheng-mng.zip成功.'

#ssh root@47.104.220.91 "cd /usr/local/nginx/html/mng; rm -rf sweetbiancheng-mng.zip"
#echo '删除远程 sweetbiancheng-mng.zip成功.'

sed -i "" "s/prize.ichenxing.cn/localhost:8081/g" /Users/wenxiaoyu/workspace/kuku/coding/prize/prize-mng/src/utils/myAxios.js
