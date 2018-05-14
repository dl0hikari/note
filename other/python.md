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

```test.py
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
