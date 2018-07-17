# raspbian 上不去网问题
## 设置静态IP
> sudo nano /etc/network/interfaces
```
auto lo
iface lo inet loopback

iface eth0 inet manual

allow-hotplug wlan0
iface wlan0 inet manual
    wap-conf /etc/wpa_supplicant/wpa_supplicant.conf

allow-hotplug wlan1
iface wlan1 inet manual
    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
```
ps: 我把上面的 allow-hotplug wlan0 到最后注释掉wifi居然连上了。。。。。。。。。但不是静态ip，我也修改了wpa_supplicant.conf文件，只不过加上了要连接的路由名和密码
```
network={
    ssid="XXX"
    key_mgmt=WPA-PSK
    psk="XXX"
}
```

> sudo nano /etc/dhcpcd.conf

```
interface eth0
inform 192.168.2.100
static routers=192.168.2.1
static domain_name_servers=192.168.2.1 8.8.8.8
```
查看无线网
```
sudo iwlist wlan0 scan
```

# tightvnc

```
sudo apt-get update
sudo apt-get install tightvncserver

#启动
tightvncserver

```