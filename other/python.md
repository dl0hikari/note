# 列表生成式
```py
>>> [x * x for x in range(1, 11)]
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

>>> [x * x for x in range(1, 11) if x % 2 == 0] # 可以加上if判断
[4, 16, 36, 6, 100]

>>> [m + n for x in 'ABC' for n in 'XYZ']
['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']
```

# 生成器 (generator)
生成器保存的是算法， 每次调用next(g),就计算出g的下一个元素的值，直到计算到最后一个元素，没有更多的元素时，抛出StopIteration的错误。

我们创建了一个generator后，基本上永远不会调用next()，而是通过for循环来迭代它，并且不需要关心StopIteration的错误。

如果一个函数定义中包含yield关键字，那么这个函数就不再是一个普通函数，而是一个generator：
```py

def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b
        a, b = b, a + b
        n = n + 1
    return 'done'

```
```py
    >>> f = fib(6)
    >>> f
    <generator object fib at 0x104feaaa0>
```
# 迭代器
迭代是重复反馈过程的活动，其目的通常是为了逼近所需目标或结果。每一次对过程的重复称为一次“迭代”，而每一次迭代得到的结果会作为下一次迭代的初始值。

可以直接作用于for循环的数据类型有以下几种：
一类是集合数据类型，如 list、tuple、dict、set、str等；
一类是generator，包括生成器和带yield的generator function。
这些可以直接作用于for循环的对象统称为可迭代对象：Iterable。
可以用isinstance()判断一个对象是否是Iterable对象：
```py
>>> from collections import Iterable
>>>
True
>>> isinstance({}, Iterable)
True
>>> isinstance('abc', Iterable)
True
>>> isinstance((x for x in range(10)), Iterable)
True
>>> isinstance(100, Iterable)
False
```

而生成器不但可以作用于for循环，还可以被next()函数不断调用并返回下一个值，直到最后抛出StopIteration错误表示无法继续返回下一个值了。
可以被next()函数调用并不断返回下一个值的对象称为迭代器：Iterator。
可以使用isinstance()判断一个对象是否是Iterator对象：
```py
>>> from collections import Iterator
>>> isinstance((x for x in range(10)), Iterator)
True
>>> isinstance([], Iterator)
False
>>> isinstance({}, Iterator)
False
>>> isinstance('abc', Iterator)
False
```
生成器都是Iterator对象，但list、dict、str虽然是Iterable，却不是Iterator。
把list、dict、str等Iterable变成Iterator可以使用iter()函数：
```py
>>> isinstance(iter([]), Iterator)
True
>>> isinstance(iter('abc'), Iterator)
True
```

# 装饰器
假设我们要增强now()函数的功能，比如，在函数调用前后自动打印日志，但又不希望修改now()函数的定义，这种在代码运行期间动态增加功能的方式，称之为“装饰器”（Decorator）

```py
import functools

def log(func):
    @functools.wraps(func) # 没明白
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper
```

# __slots__
__slots__变量限制class能添加的属性。 使用__slots__要注意，__slots__定义的属性仅对当前类实例起作用，对继承的子类是不起作用的。

```py
class Student(object):
    __slots__ = ('name', 'age') #用tuple定义允许绑定的属性名称
```

# MixIn
MixIn的目的就是给一个类增加多个功能，这样，在设计类的时候，我们优先考虑通过多重继承来组合多个MixIn的功能，而不是设计多层次的复杂的继承关系。

# Enum类
 枚举类
 ```py
from enum import Enum

Month = Enum('Month', ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))
for name, member in Month.__members__.items():
    print(name, '=>', member, ',', member.value)
 ```
> Jan => Month.Jan , 1<br>
> Feb => Month.Feb , 2<br>
> Mar => Month.Mar , 3<br>
> Apr => Month.Apr , 4<br>
> May => Month.May , 5<br>
> Jun => Month.Jun , 6<br>
> Jul => Month.Jul , 7<br>
> Aug => Month.Aug , 8<br>
> Sep => Month.Sep , 9<br>
> Oct => Month.Oct , 10<br>
> Nov => Month.Nov , 11<br>
> Dec => Month.Dec , 12<br>

@unique 装饰器可以帮助我们检查保证没有重复值

```py
from enum import Enum, unique

@unique
class Weekday(Enum):
    Sun = 0
    Mon = 1
    Tue = 2
    Wed = 3
    Thu = 4
    Fri = 5
    Sat = 6
day1 = Weekday.Sun
print(Weekday.Mon.value)
print(Weekday[1])
print(Weekday(1))
```

# 元类
metaclass是Python面向对象里最难理解，也是最难使用的 **魔术代码**。正常情况下，你不会碰到需要使用metaclass的情况，所以先pass


可以动态创建出类
```py
def fn(self, name='world'):
    print('Hello, %s.' % name)

Hello = type('Hello', (object, ), dict(hello=fn))

h = Hello()
print(h.hello())
```
通过type()函数创建的类和直接写class是完全一样的，因为Python解释器遇到class定义时，仅仅是扫描一下class定义的语法，然后调用type()函数创建出class

# 断言

```py
...
    assert n != 0, 'n is zero!'
...
```

> $ python -0 test.py  //关闭断言

```py
import requests
from bs4 import BeautifulSoup

r = requests.get('http://localhost:3000/ddd')
html = r.content
soup = BeautifulSoup(html, "html5lib")
for img in soup.find_all('img'):
  _img =  requests.get('http://localhost:3000/'+img['src'])
  f = open('./test.png', 'wb')
  f.write(_img.content)
  f.close()
  break
```

# 函数参数
1.可变参数
``` python
def test(*args):
    pass

```
2.关键字参数
``` py
def test(**kw):
    pass

```
3.命名关键字参数
```py
def test(name, age, *, city, job):
    pass
```
> 如果函数定义中已经有了一个可变参数，后面跟着的命名关键字参数就不再需要一个特殊分隔符*了
```py
def test(name, age, *args, city, job)
```
4.参数组合
> 参数定义的顺序必须是：必选参数、默认参数、可变参数、命名关键字参数和关键字参数。

# 检查是否是方法
1. 根据__call__属性判断
```py
add = lambda a, b: a + b
if (hasattr(add, "__call__")):
    print(add(1, 3))
```
2. 用isfunction判断
```py
from inspect import isfunction

add = lambda a, b: a + b
if (isfunction(add)):
    print(add(1, 3))
```
# python字符串前u、r、b的含义
1. 字符串前加u
例：u"我是含有中文字符组成的字符串。"
作用：后面字符串以 Unicode 格式 进行编码，一般用在中文字符串前面，防止因为源码储存格式问题，导致再次使用时出现乱码。
2. 字符串前加r
例：r"\n\n\n\n\n\n
作用：声明后面的字符串是普通字符串，相对的，特殊字符串中含有：转义字符 \n \t 什么什么的。
3. b
做用：python3.x里默认的str是(py2.x里的)unicode, bytes是(py2.x)的str, b”“前缀代表的就是bytes
　　　python2.x里, b前缀没什么具体意义， 只是为了兼容python3.x的这种写法

在Python 3.x版本中，把'xxx'和u'xxx'统一成Unicode编码，即写不写前缀u都是一样的，而以字节形式表示的字符串则必须加上b前缀：b'xxx'。

# TCP编程
通常我们用一个Socket表示“打开了一个网络链接”，而打开一个Scoket需要知道目标计算机的IP地址和端口号，再制定协议类型即可。
客户端：
```py
#导入socket库
import socket

# 创建一个socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 建立连接
s.connect(("www.sina.com.cn", 80))
# 发送数据:
s.send(b'GET / HTTP/1.1\r\nHost: www.sina.com.cn\r\nConnection: close\r\n\r\n')
buffer = []
while True:
    # 每次最多接受1k字节
    d = s.recv(1024) # recv(max)
    if d:
        buffer.append(d)
    else:
        break
data = b''.join(buffer)

s.close()

header, html = data.split(b'\r\n\r\n', 1) # split(str="", num) num--分割次数
print(header.decode('utf-8'))
# 把接收的数据写入文件
with open('sina.html', 'wb') as f:
    f.write(html)
```
服务器：
由于服务器会有大量来自客户端的连接，所以，服务器要能够区分一个Socket连接是和哪个客户端绑定的。一个Socket依赖4项：服务器地址、服务器端口、客户端地址、客户端端口来唯一确定一个Socket。

```py
# server.py
import socket
import time, threading

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # 首先创建一个基于IPv4和TCP协议的Scoket

s.bind(('127.0.0.1', 9999)) # 绑定监听的地址和端口

s.listen(5) # listen()方法开始监听端口，传入的参数指定等待连接的最大数量：
print('Waiting for connection...')

def tcplink(sock, addr):
    print('Accept new connection from %s %s...' % addr)
    sock.send(b'Welcome!')
    while True:
        data = sock.recv(1024)
        time.sleep(1)
        if not data or data.decode('utf-8') == 'exit':
            break
        sock.send(('Hello, %s!' % data.decode('utf-8')).encode('utf-8'))
    sock.close()
    print('Connection form %s:%s closed.' % addr)

while True:
    # 接受一个新连接
    sock, addr = s.accept()
    # 创建新线程来处理TCP连接
    t = threading.Thread(target=tcplink, args=(sock, addr))
    t.start()
```
```py
# client.py
import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('127.0.0.1', 9999))

print(s.recv(1024).decode('utf-8'))

for data in [b'Michael', b'Tracy', b'Sarah']:
    s.send(data)
    print(s.recv(1024).decode('utf-8'))
s.send(b'exit')
s.close()
```

# UDP编程
和TCP类似，使用UDP的通信双方也分为客户端和服务器。服务器首先需要绑定端口：
```py
# server.py
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) #SOCK_DGRAM 指定Socket的类型是UDP

s.bind(('127.0.0.1', 9999))

print('Bind UDP on 9999...')
while True:
    # 接收数据
    data, addr = s.recvfrom(1024)
    print('Received from %s:%s.' % addr)
    s.sendto(b'Hello, %s!' % data, addr) #直接调用sendto()就可以把数据用UDP发给客户端
```
```py
# client.py
import socket

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
for data in [b'Michael', b'Tracy', b'Sarah']:
    # 发送数据
    s.sendto(data, ('127.0.0.1', 9999))
    # 接收数据
    print(s.recv(1024).decode('utf-8'))
s.close()
```

# WSGI接口   (Web Server Gateway Interface)
Python 内置了一个WSGI服务器，这个模块叫wsgiref,让我们不必关心HTTP请求、解析、发送等操作，只专心用Python编写web业务

```py
# hello.py

def application(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/html')]) # 报文首部 {状态行、响应首部字段、通用首部字段、实体首部字段、其他}
    return [b'<h1>Hello, web!</h1>'] #报文主体
```

```py
# server.py
# 从wsgiref模块导入:
from wsgiref.simple_server import make_server
# 导入我们自己编写的application函数:
from hello import application

# 创建一个服务器，IP地址为空，端口是8000，处理函数是application:
httpd = make_server('', 8000, application)
print('Serving HTTP on port 8000...')
# 开始监听HTTP请求:
httpd.serve_forever()
```

# 使用Web框架
  Flask
> pip install flask

```py
from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    return '<h1>Home</h1>'
...
if __name__ == '__main__':
    app.run()
```
# 使用模板
Flask默认支持的模板是jinja2
> pip install jinja2

```py
from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('home.html') # 模板在同级的templates目录下
...
if __name__ == '__main__':
    app.run()
```

# Coroutine 协程（协同程序）
子程序，或者称为函数。是通过栈实现的，一个线程就是执行一个子程序。子程序调用总是一个入口，一次返回，调用顺序是明确的。而协程的调用和子程序不同。协程看上去也是子程序，但是在执行的过程中， 在子程序内部可中断，然后转而执行别的子程序，在适当的时候再返回来接着执行。

协程的特点在于是一个线程执行，那和多线程比，协程有什么优势？

1. 最大的优势就是协程极高的执行效率。因为子程序切换不是线程切换，而是有程序自身控制，因此没有线程切换的开销，和多线程比，程序数量越多，协程的性能优势就越明显。
2. 第二大优势就是不需要多线程的锁机制，因为只有一个线程，也不存在同时写变量冲突，在协程中控制共享资源不加锁，只需要判断状态就好了，所以执行效率比多线程高很多。

Python对协程的支持是通过generator实现的

# asyncio
1. asyncio提供了完善的异步IO支持；
2. 异步操作需要在coroutine中通过yield from完成；
3. 多个coroutine可以封装成一组Task然后并发执行。

# async/await
请注意，async和await是针对coroutine的新语法，要使用新的语法，只需要做两步简单的替换：
1. 把@asyncio.coroutine替换为async；
2. 把yield from替换为await。

# aiohttp


# IDLE （shell）

# BIF (Built-in functions)

# 类中 双下划线开头定义的变量为私有变量 通常不可用实例直接调用，但不是绝对可以用实例._类名__属性(例如：stu._Student__age)调用

# 错误处理
所有的错误类型都继承自BaseException

```py
import logging
try:
    pass
except Exception as e:
    loggin.exception(e)
finally:
    pass

```
自编错误类 使用 **raise** 语句抛出
```py
class FooError(ValueError):
    pass

def foo(s):
    n = int(s)
    if n==0:
        raise FooError('invalid value: %s' % s)
    return 10 / n

foo('0')
```
只要处理不了 就向上抛raise
```py
def foo(s):
    n = int(s)
    if n==0:
        raise ValueError('invalid value: %s' % s)
    return 10 / n

def bar():
    try:
        foo('0')
    except ValueError as e:
        print('ValueError!')
        raise

bar()

```
# 调试
1. print 方法打印
2. assert 断言
关闭断言 大写的O
> $ python -O err.py
3. loggin
```py
import logging
logging.basicConfig(level=logging.INFO) #DEBUG, INFO, WARNING, ERROR

logging.info("n = %d" % n) #根据上面设置的等级 使用对应的方法 logging.debug()/logging.warning/logging.error
```
4. pbd 调试
> $ python -m pdb test.py
启动后输入命令 **l**查看代码 **n**单步执行代码 **p**查看变量 **q** 退出

在py文件中 可能出错的地方放一个pdb.set_trace() 可以设置断点
```py
import pdb

s = '0'
n = int(s)
pdb.set_trace() # 运行到这里会自动暂停
print(10 / n)
```

# 单元测试
要引入Python自带的unittest模块
1. 编写单元测试时，需要编写一个测试类，从unittest.TestCase继承.
2. 以test开头定义方法名，否则测试的时候不会执行
3. unittest.TestCase 提供了很多内置判断条件 常用的时assertEqual()、assertTrue()
4. 编好的单元测试，我们就可以运行单元测试。最简单的运行方式时在脚本的最后加上两行代码if __name__ == '__main__':unittest.main()
5. 另一种方法时在命令行通过参数 -m unittest直接运行单元测试：
> python -m unittest mydict_test.py
6. setUp与tearDown


```py
# mydict_test.py
from m import Dist
import unittest

class TestDict(unittest.TestCase):

    def setUp(self):  #这两个方法貌似放在那个位置都可以  最先执行setUp 最后执行tearDown
        print('setUp...')

    def tearDown(self):
        print('tearDown...')

    def test_haha(self):
        d = Dist(a = 1, b = 'test')
        self.assertEqual(d.a, 1)
        self.assertEqual(d.b, 'test')
        self.assertTrue(isinstance(d, dict))

if __name__ == '__main__':  # 两行代码
    unittest.main()
```
```py
# m.py
#！ /usr/bin/env python3
# -*- coding: utf-8 -*-

'a test script'

__author__ = 'alex'

class Dist(dict):

    def __init__(self, **kw):
        super().__init__(self, **kw)

    def __getattr__(self, key):
        try:
            return self[key]
        except KeyError:
            raise AttributeError(r"'Dist' object has no attribute '%s'" % key)

    def __setattr__(self, key, value):
        self[key] = value
```
另一种重要的断言就是期待抛出指定类型的Error,比如通过d['emptyp']访问不存在的key是，断言会抛出KeyError:

```py
width self.assertRaises(KeyError):
    value = d['empty']
```
# 文档测试
pass

# 文件读写
如果文件很小，read()一次性读取最方便；如果不能确定文件大小，反复调用read(size)比较保险；如果是配置文件，调用readlines()最方便：
```py

for line in f.readlines():
    print(line.strip()) # 把末尾的'\n'删掉
```

为什么open txt文件时需要指定utf8编码？ 这是根据系统的编码决定的 如果系统编码为utf8 就不用添加encoding='utf-8'
```py
# 查看系统编码

import locale
print(locale.getpreferredencoding())

# >>> cp936
```

# StringIO和BytesIO
很多时候，数据读写不一定是文件，也可以在内存中读写。
StringIO顾名思义就是在内存中读写str。
```py
from io import StringIO
f = StringIO()
f.write('hello')
# >>> 5
f.write(' ')
# >>> 1
f.write('world!')
# >>> 6
print(f.getvalue())
# >>> hello world!
```
getvalue()方法用于获得写入后的str。
seek()/tell()

# 操作文件和目录
```py
import os
print(os.name)      # 操作系统类型
print(os.environ)   # 环境变量
print(os.environ.get('PATH')) # 获取环境变量某个值
print(os.path.abspath('.'))   # 查看当前目录的绝对路径
```
建立目录
```py
import os

cpath = os.path.abspath('.')
dpath = os.path.join(cpath, 'testdir') # 创建一个新目录 testdir 使用join可以正确处理Linux与windows的路径分隔符
os.mkdir(dpath)
os.rmdir(dpath) # 删除目录

os.path.split('/Users/michael/testdir/file.txt') # 拆分成两部分，后一部分总是最后级别的目录或文件名 ('/Users/michael/testdir', 'file.txt')
os.path.splitext('/path/to/file.txt') # 取得文件扩展名 ('/path/to/file', '.txt')
os.rename('test.txt', 'test.py') # 重命名文件
os.remove('test.py') # 删除文件

```
shutil 模块提供了 copyfile()的函数，模块中有很多使用函数，它们可以看作是os模块的补充
```py
[x for x in os.listdir('.') if os.path.isdir(x)] # listdir 列出当前目录下文件
```

```py
[x for x in os.listdir('.') if os.path.isfile(x) and os.path.splitext(x)[1]=='.py'] # listdir 列出当前目录下.py文件
```

# 序列化
Python提供了pickle模块来实现序列化
```py
import pickle
d = dict(name='Bob', age=33, score=99)
print(pickle.dumps(d)) # pickle.dumps()方法把任意对象序列化成一个bytes

f = open('dump.txt', 'wb')
pickle.dump(d, f) # pickle.dump()直接把对象序列化后写入一个file-like Object
f.close()

f = open('dump.txt', 'rb')
d = pickle.load(f) # pickle.load()
f.close()
print(d)
```
## JSON
```py
>>> import json
>>> d = dict(name='alex', age=33, score=88)
>>> json.dumps(d) # json.dumps() 序列化 返回一个str,内容就是标准的JSON
'{"name": "alex", "age": 33, "score": 88}'

>>> json_str ='{"age":20, "score": 99, "age":99}'
>>> json.loads(json_str) # 反序列化
{'age': 99, 'score': 99}
```

```py
import json

class Student(object):
    def __init__(self, name, age, score):
        self.name = name
        self.age = age
        self.score = score

s = Student('alex', 33, 89)

def student2dict(std):
    return {
        'name': std.name,
        'age': std.age,
        'score': std.score
    }

print(json.dumps(s, default=student2dict)) #可选参数default就是把任意一个对象变成一个可序列为JSON的对象

print(json.dumps(s, default=lambda obj: obj.__dict__)) #通常class的实例都有一个__dict__属性，它就是一个dict，用来存储实例变量。也有少数例外，比如定义了__slots__的class。


jsonstr = json.dumps(s, default=student2dict)

def dict2student(d):
    return Student(d['name'], d['age'], d['score'])

print(json.loads(jsonstr, object_hook=dict2student)) # 反序列化
```
```py
obj = dict(name='小明同学', age=20)
s = json.dumps(obj, ensure_ascii=True) #
```


# 正则

> re.DOTALL
> re.IGNORECASE re.I
> re.VERBOSE  忽略空白和注释

# 编码问题
``` py
 open(filepath, 'r', encoding='utf-8')

 soup = bs4.BeautifulSoup(res.text, 'html.parser')
```
# 特殊变量
```py
# __str__与 __repr__
# __iter__ __next__
# __getitem__ __setitem__
# __getattr__
# __call__
```
> **package**: <br >tkinter<br > pygame <br >types <br >logging<br >



# 按装virtualenv
提示timeout是网络问题 开全局
```cmd
pip --default-timeout=100 install virtualenv
```
使用virtualenv命令建一个虚拟环境，自动下载相关工具
```cmd
virtualenv venv
```
使用管理员权限打开cmd
执行activate文件
```cmd
....venv\Scripts>activate
```
退出虚拟环境
```cmd
deactivate
```

# 查看已安装的包

```cmd
pip show packagename

pip list

pip list –outdated  #检测更新

pip install --upgrade packagename #升级包

pip uninstall packagename #卸载包
```

# flask 模板修改不需要重起

```py
    #...
    if __name__ == '__main__':
        app.jinja_env.auto_reload = True
        app.config['TEMPLATES_AUTO_RELOAD'] = True
        # app.run(debug=True, host='0.0.0.0')
        manager.run()
```

# python hell.py shell 进入不了command line
因为没有引入flask_script 中的Manager

# 设置获取环境变量
用Python Shell设置或获取环境变量的方法：
一、设置系统环境变量
1、os.environ['环境变量名称']='环境变量值' #其中key和value均为string类型
2、os.putenv('环境变量名称', '环境变量值')
二、获取系统环境变量
1、os.environ['环境变量名称']
2、os.getenv('环境变量名称')

# SQLite 删除列
https://www.jianshu.com/p/79ff2b2af493
https://blog.csdn.net/White_Idiot/article/details/78533046

# sqlalchemy
**使用传统的connection的方式连接和操作数据库**
```py
from sqlalchemy import create_engine

engine = create_engine('sqlite:///:db_path:', echo=True)
conn = engine.connect()
res = conn.execute('select * from users')
for row in res:
    print(row)
```
**connection事务**
```py
# ...
with engine.connect() as conn:
    trans = conn.begin()
    try:
        r1 = conn.execute("select * from users")
        r2 = conn.execute("insert into User(name, age) values(?, ?)", 'alex', 24)
        trans.commit()
    except:
        trans.rollback()
        raise
```
**通过session**
```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///:db_path:', echo=True)
DB_Session = sessionmaker(bind=engine)
session = DB_Session()
# dosomething with session
session.execute('select * from User')
session.execute("insert into User(name, age) values('alex', 33)")
session.execute("insert into User(:name, :age)", {'name':'alex', 'age':11}) #参数使用dict,在sql语句中使用:key占位
session.commit() #如果是增删改 需要commit
session.close()
```
**ORM**
对象关系映射（英语：(Object Relational Mapping，简称ORM，或O/RM，或O/R mapping）
```py
# User.py
from sqlalchemy import Column, Integer, String
from Models import Base

class User(Base):
    __tablename__ = 'User'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    name = Column('name', String(50))
    age = Column('age', Integer)
# Role.py
from Models import Base

class Role(Base):
    __tablename__ = 'Role'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    name = Column('name', String(50))

# Models.py
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# manage.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from User import User
from Role import Role
from Models import Base

DB_CONNECT_STRING = 'sqlite:///test.sqlite'
engine = create_engine(DB_CONNECT_STRING, echo=True)
DB_Session = sessionmaker(bind=engine)
session = DB_Session()
Base.metadata.create_all(engine)

u = User(name='alex', age=33)
r = Role(name='user')

session.add(u)
session.add(r)
session.commit()
print(r.id)
```
# UTC 协调世界时
Coordinated Universal Time，UTC

# 使用flask-moment 问题
1. 引用flask-moment模块,需要引用moment.js与jquery.js,如果使用bootstrap/base.html模板则jquery已经在scripts块中引入，
只需要引用moment.js。
```py
from flask import Flask
from flask_moment import Moment
app = Flask(__name__)
moment = Moment(app)
# ...
```
```html
<!-- ... -->
<p>The local date and time is {{ moment(current_time).format('LLL') }}</p>
<p>That was {{ moment(current_time).fromNow(refresh=True) }}</p>
<!-- ... -->
{% block scripts  %}
{{ super() }}
{{ moment.include_moment() }} <!-- 注意加载顺序 -->
{% endblock %}
<!-- ... -->
```
```html
<!-- ... -->
<!-- 添加在head块中 需要重新引入jquery moment已提供方法引入即可 -->
{% block head  %}
{{ super() }}
{{ moment.include_jquery() }}
{{ moment.include_moment() }} <!-- 注意加载顺序 -->
{% endblock %}
<!-- ... -->
```

# nginx 服务器搭建
1. python 环境
```
$ sudo apt-get install python-setuptools
$ sudo easy_install pip

```
也可以直接安装pip
```
$ sudo apt-get install python-pip
```
2. 安装虚拟环境
```
$ sudo apt-get install virtualenv
```
3. 创建虚拟环境
```
$ virtualenv venv3 --no-site-packages --python=python3 #python3环境
$ virtualenv venv --no-site-packages --python=python2 #python2环境
```
4. 安装uwsgi依赖
```
$ sudo apt-get install build-essential python-dev（这是两个包）
```
5. 进入虚拟环境
```
$ source venv3/bin/activate
```

6. 安装uwsgi
```
(venv3) $ pip install uwsgi
```

7. 安装flask及工程依赖包

```
(venv3) $ pip install -r requirements.txt
```
ps: pip freeze > requirements.txt

8. 安装Nginx 修改nginx配置 启动服务
```
$ sudo apt-get install nginx
```
配置文件路径  /etc/nginx/sites-enabled/default
```
server {
    listen 80;                   # 服务器监听端口
    server_name 110.110.110.110; # 这里写你的域名或者公网IP
    charset      utf-8;          # 编码
    client_max_body_size 75M;    # 之前写的关于GET和POST的区别，这里应该是原因之一吧

    location / {
        include uwsgi_params;         # 导入uwsgi配置
        uwsgi_pass 127.0.0.1:8000;    # 转发端口，需要和uwsgi配置当中的监听端口一致
        uwsgi_param UWSGI_PYTHON /home/自己创建的目录/venv;       # Python解释器所在的路径（这里为虚拟环境）
        uwsgi_param UWSGI_CHDIR /home/自己创建的目录;             # 项目根目录
        uwsgi_param UWSGI_SCRIPT manage:app; （比如你测试用test.py文件，文件中app = Flask(__name__)，那么这里就填  test：app）# 项目的主程序
    }
}

#server {
#    listen 3001;
#    server_name 127.0.0.1;
#    charset utf-8;
#    client_max_body_size 75M;
#    root /usr/local/webserver/www/;
#    index test.py;
#    location / {
#        include uwsgi_params;
#        uwsgi_pass 127.0.0.1:3002;
#        uwsgi_param UWSGI_PYTHON /home/pi/ENV;
#        uwsgi_param UWSGI_CHDIR /home/pi/Documents/flasky_alex;
#        uwsgi_param UWSGI_SCRIPT test:app;
#    }
#}
```
```
$ sudo /etc/init.d/nginx start
```
9. 编写uwsgi配置文件
```
[uwsgi]
socket = 127.0.0.1:3002
plugins = python
chdir = /home/pi/Documents/flasky_alex
wsgi-file = manage.py
callable = manage
```

10. 运行uwsgi
```
$ uwsgi --ini ini的文件名.ini &
```


11. pipenv 相关命令执行报错 UnicodeDecodeError: 'utf-8' codec can't decode byte 0xbc in position 4: invalid start byte
    是因为进程中存在中文进程 关闭就可以启动了

    pipenv shell 显示激活
    pipenv run python hello.py  这个命令允许你不显示激活虚拟环境即可在当前项目的虚拟环境中执行命令
