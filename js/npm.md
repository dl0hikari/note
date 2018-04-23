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