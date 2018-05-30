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

#断言

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



> **package**: <br >tkinter<br > pygame <br >types

# 特殊变量
```py
# __str__与 __repr__
# __iter)__ __next__
# __getitem__ __setitem__
# __getattr__
# __call__
```
