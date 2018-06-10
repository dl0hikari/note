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

> sudo nano /etc/dhcpcd.conf

```
interface eth0
inform 192.168.2.50
static routers=192.168.2.1
static domain_name_servers=192.168.2.1 8.8.8.8
```