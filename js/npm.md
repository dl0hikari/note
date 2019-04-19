# npm install出现"Unexpected end of JSON input while parsing near"错误解决方法

> npm cache clean --force

即可解决

# 设置npm镜像

> npm install nrm -g --save

> nrm ls

> nrm current

> nrm use cnpm

> nrm add qihoo http://registry.npm.360.org

测试速度
> nrm test npm
删除
> nrm del qihoo

# windows-build-tools
> npm install --global --production windows-build-tools

> sudo apt-get remove --auto-remove --purge packagename

> sudo apt-get install packagename

# node-sass 安装不成功 问题解决办法
1. 安装windows-build-tools
2. 在  windows-build-tools 安装路径下安装python2.7
3. npm config set python2.7的路径
4. npm config set msvs_version 2015
5. 切换npm源指向tiaobao源
6. 安装