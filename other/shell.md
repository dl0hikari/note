# shell问题集
## shell脚本中出现以下错误提示
1. expr: 参数数目错误
2. ")syntax error: invalid arithmetic operator (error token is "

换行符造成 windows中换行为\r\n linux下为\n,shell运算中会去掉末尾的\n而留下\r 造成错误。网上可搜索解决方法，我采用的是用notepad++把脚本文件转换为unix格式