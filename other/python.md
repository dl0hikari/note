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
