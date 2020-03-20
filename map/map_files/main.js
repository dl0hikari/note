
// 需要引用jQuery

// scale window
window.onload = window.onresize = function(){
    var w = 1920, winW = window.innerWidth;
    var scaleBody = winW / 1920;
    document.getElementById('datav-layout-wrapper').style = 'transform: scale('+ scaleBody +'); \
    transform-origin: left top 0px; overflow-x: hidden; display: table;';
}

// 生成颜色数组 start
var GradientColor = function(startColor,endColor,step){
    this.startColor = startColor;
    this.endColor = endColor;
    this.step = step;
};
GradientColor.prototype = {
    constructor: GradientColor,
    init: function(){
        startRGB = this.colorRgb(this.startColor);//转换为rgb数组模式
        startR = startRGB[0];
        startG = startRGB[1];
        startB = startRGB[2];

        endRGB = this.colorRgb(this.endColor);
        endR = endRGB[0];
        endG = endRGB[1];
        endB = endRGB[2];

        sR = (endR-startR)/this.step;//总差值
        sG = (endG-startG)/this.step;
        sB = (endB-startB)/this.step;

        var colorArr = [];
        for(var i=0;i<this.step;i++){
            //计算每一步的hex值
            var hex = this.colorHex('rgb('+parseInt((sR*i+startR))+','+parseInt((sG*i+startG))+','+parseInt((sB*i+startB))+')');
            colorArr.push(hex);
        }
        return colorArr;
    },
    colorRgb: function(sColor){  // 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var sColor = sColor.toLowerCase();
        if(sColor && reg.test(sColor)){
            if(sColor.length === 4){
                var sColorNew = "#";
                for(var i=1; i<4; i+=1){
                    sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for(var i=1; i<7; i+=2){
                sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
            }
            return sColorChange;
        }else{
            return sColor;
        }
    },
    colorHex: function(rgb){ // 将rgb表示方式转换为hex表示方式
        var _this = rgb;
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if(/^(rgb|RGB)/.test(_this)){
            var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g,"").split(",");
            var strHex = "#";
            for(var i=0; i<aColor.length; i++){
                var hex = Number(aColor[i]).toString(16);
                hex = hex<10 ? 0+''+hex :hex;// 保证每个rgb的值为2位
                if(hex === "0"){
                    hex += hex;
                }
                strHex += hex;
            }
            if(strHex.length !== 7){
                strHex = _this;
            }
            return strHex;
        }else if(reg.test(_this)){
            var aNum = _this.replace(/#/,"").split("");
            if(aNum.length === 6){
                return _this;
            }else if(aNum.length === 3){
                var numHex = "#";
                for(var i=0; i<aNum.length; i+=1){
                    numHex += (aNum[i]+aNum[i]);
                }
                return numHex;
            }
        }else{
            return _this;
        }
    }
}

// 使用方法  var gradient = new GradientColor('#F2574C','#4C6CF2',10);
// 生成颜色数组 eng

// 圆盘 start


var Statistics = function(options){
    this.options = options;
    this.targetObj = $(options.targetStr);
    this.radius = options.radius;
    this.perimeter = Math.PI * 2 * options.radius;
    this.args = options.percentArr;
    this._classname = options.classname || "circle"
};
Statistics.prototype = {
    constructor: Statistics,
    setData: function(arr, isDelay=true){
        var that = this;
        if(arr){
            this.args = arr
        }
        // this.clearDate();
        // this.sleep(1000);
        this.targetObj.each(function(index, ele){
            if(that.args[index] != null){
                // $('circle', this)[1].setAttribute('class', 'circle');
                var percent = that.args[index] / 100;
                var _from = parseInt($('.percent span', this).html()) || 0;
                $('circle', this)[1].setAttribute('stroke-dasharray', that.perimeter * percent + " " + that.perimeter * (1- percent));
                $('.percent span', this).countTo({'from':_from, 'to': that.args[index]});
            }
        });
        return this;
    },
    clearDate: function(){
        var that = this;
        this.targetObj.each(function(index, ele){
            if(that.args[index] != null){
                $('circle', this)[1].setAttribute('class', '');
                $('circle', this)[1].setAttribute('stroke-dasharray', "0 1000");
            }
        });
    },
    sleep: function(delay){
        var start = (new Date()).getTime();
        while((new Date().getTime()-start<delay)){
            continue;
        }
    }
};

// 圆盘 end


// 地图 start

// 首先要初始化地图
function LcenterLines(settings){
    this.toCity = settings.toCity;
    this.fromCityArr = settings.fromCityArr;
    this.second = settings.second;
    this.myEcharts = echarts.init(document.getElementById(settings.map));
    this.option = {
        backgroundColor: '#0e2a43',
        title: {
            left: 'center',
            textStyle:{
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        geo: {
            map: 'china',
            label:{
                normal: {
                    show: true,
                    color: '#ffffff'
                },
                emphasis: {
                    show: false,
                    color: '#ffffff'
                }
            },
            roam: false, // 开启缩放或平移
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: 'rgba(255, 255, 255, 0.5)'
                },
                emphasis: {
                    // areaColor: 'normal',
                    borderColor: 'rgba(190, 255, 0, 0.5)'
                }
            },
            regions: []
        },
        series: []
    };
    this.planePath = settings.planePath;
    this._period = settings._period;
    this.color = settings.color;
    this.colorLength = settings.colorLength;
    this.effectScatterData = settings.effectScatterData;
    this.geoCoordMap = settings.geoCoordMapData;
    this.regions = [];
    this.regionsData = settings.regionsData;
    this.lcenterData = settings.lcenterData;
    this.regionsColors = settings.regionsColors;
    this.regionsNameMap = settings.regionsNameMap;
};
LcenterLines.prototype = {
    constructor: LcenterLines,
    convertData: function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = this.geoCoordMap[dataItem[0].name];
            var toCoord = this.geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord]
                });
            }
        }
        return res;
    },
    convertData2: function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = this.geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value),
                    t:'test'
                });
            }
        }
        return res;
    },
    makeSeries: function(){
        var that = this;
        // [[this.toCity, this.fromCityArr]].forEach(function(item, i){
            that.option.series.push(
            {
                // name: item[0] + '网络教育',
                type: 'lines',
                zlevel: 3,
                effect: {
                    show: true,
                    period: that._period,
                    trailLength: 0.1,
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#ffde09' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#ff4a09' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                    symbol: 'roundRect',
                    symbolSize: [7, 20],
                    animation: false,
                    animationUpdateDuration: 0
                },
                lineStyle:{
                    normal: {
                        color: that.color,
                        width: 0,
                        curveness: 0.2
                    }
                },
                data: []
            },
            {
                // name: item[0] + ' 网络教育',
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: that._period,
                    trailLength: 0,
                    loop: false,
                    animation: false,
                    animationUpdateDuration: 0,
                    symbolSize: 0,
                },
                lineStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#f1f627' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#0aef5d' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        width: 5,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: []
            },
            {
                name: '学习中心',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: that.convertData2(
                    that.lcenterData
                ),
                label: {
                    normal: {
                        show: false,
                        formatter: '{b}',
                        color: '#ff0000',
                        align: 'right',
                        offset: [-10, 0]
                    },
                    emphasis: {
                        show: false
                    }
                },
                tooltip: {
                    show: true,
                    trigger: 'item',
                    formatter: function (params) {
                        return params.t;
                    }
                    // formatter: '{b}<br>{a}<br>{c}<br>{d}<br>{e}',
                }
            },
            {
                name: '大连',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: that.convertData2(that.effectScatterData),
                showEffectOn: 'render',
                symbolSize: 20,
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true,
                        color: '#fff'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f4e925',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 3,
                tooltip: {
                    show: false,
                    formatter: '{b}'
                }
            }
        )
    // });
        // this.runAnimationLoop();
    },
    dynamicDate: function(options){
        var lines_data = this.convertData(options.fromCityArr);
        this.option.series[0].data = lines_data;
        this.option.series[1].data = lines_data;
    },
    clearAllLines: function () {
        var that = this;
        for(var i=0, len=this.option.series.length; i<len; i++){
            if(i >= len-2){
                continue;
            }
            this.option.series[i].data = [];

        }
        this.myEcharts.on('finished', function(){
            that = null;
        });
        this.myEcharts.setOption(this.option);

    },
    closeAnimationLoop: function(){
        var that = this;
        setTimeout(function(){
            // that.option.series[0].effect.loop = false;
            that.clearAllLines();
        }, this.second)
    },
    runAnimationLoop: function(){
        this.option.series[0].effect.loop = true;
    },
    init: function(){
        // 省份名称映射处理
        this.changeRegionsName(this.regionsData);
        this.regionsColorInit();
        this.makeSeries();
        // this.myEcharts.showLoading();
        this.myEcharts.setOption(this.option);
        return this;
    },
    regionsColorInit: function(colorArr = ['#faad14', '#d29f23', '#cd9d25', '#a48f35', '#737c49',
    '#476e59', '#1f5e68', '#266166', '#075571', '#2e3c48']){
        var that = this;
        var gradient = colorArr.length > 2 ? colorArr : new GradientColor(colorArr[0], colorArr[1], this.colorLength).init();
        var step = Math.floor(this.regionsData.length/gradient.length);
        // 按人数排序
        this.regionsData.sort(this.sortRegionsWithValue);
        $.each(this.regionsData, function(index, ele){
            var temp_index = Math.min(Math.floor(index/step), that.colorLength-1);
            var temp_obj = {
                name: ele.name,
                itemStyle: {
                    normal:{
                        areaColor: gradient[temp_index]
                    },
                    emphasis:{
                        areaColor: gradient[temp_index],
                        borderColor: 'rgba(190, 255, 0, 0.5)',
                        borderWidth: 2
                    }
                }
            }
            that.regions.push(temp_obj);
        });
        this.option.geo.regions = this.regions;
        return this;
    },
    sortRegionsWithValue: function(a, b){
        return b.value-a.value;
    },
    editOption: function(){  // 修改option后要生效则需要执行此方法
        this.myEcharts.setOption(this.option);
        return this;
    },
    changeRegionsName: function(regionsData){
        var that = this;
        var _regionsData = [];
        $.each(regionsData, function(index, ele){
            var _name = ele.name;
            _name = that.regionsNameMap[_name];
            var _value = ele.value;
            _regionsData.push({
                name: _name,
                value: _value
            })
        });
        this.regionsData = _regionsData;
        return this;
    },
    run: function(options){
        this.dynamicDate(options);
        this.myEcharts.setOption(this.option);
        this.closeAnimationLoop(this.second);
        return this;
    }
}
$.extend({
    makeMap: function(options){
        var opt_default = {
            'toCity': '大连',
            'fromCityArr': [],
            'regionsData': [], // 省份报名人数（根据人数显示颜色）
            'lcenterData': [], // 学习中心名称
            'geoCoordMapData': [], // 城市地理位置坐标数据
            'regionsColors': [],
            'second':  3000,
            'map': 'map',
            'planePath': '',
            '_period': 1,
            // 'color': ['#a6c84c', '#ffa022', '#46bee9'],
            'color': '#a6c84c',
            'colorLength': 10,
            'effectScatterData': [
                {name: '大连', value: 2}
            ],
            'regionsNameMap':{
                "河北省": "河北",
                "广西壮族自治区": "广西",
                "安徽省": "安徽",
                "北京市": "北京",
                "福建省": "福建",
                "甘肃省": "甘肃",
                "四川省": "四川",
                "广东省": "广东",
                "贵州省": "贵州",
                "海南省": "海南",
                "河南省": "河南",
                "内蒙古自治区": "内蒙古",
                "湖北省": "湖北",
                "湖南省": "湖南",
                "吉林省": "吉林",
                "江苏省": "江苏",
                "江西省": "江西",
                "辽宁省": "辽宁",
                "宁夏回族自治区": "宁夏",
                "山东省": "山东",
                "山西省": "山西",
                "陕西省": "陕西",
                "上海市": "上海",
                "天津市": "天津",
                "西藏自治区": "西藏",
                "新疆维吾尔族自治区": "新疆",
                "云南省": "云南",
                "浙江省": "浙江",
                "重庆市": "重庆",
                "黑龙江省": "黑龙江",
                "青海省": "青海",
                "台湾省": "台湾"
            }
        };
        options = options || {};
        var settings = $.extend({}, opt_default, options);
        return new LcenterLines(settings).init();
    }
});

// 其次传入 起始城市 结束城市



// 地图 end


// 翻转动画 start
function AnimationRotate(targetClassname, num=5, backToFrontClassname='back_to_front', frontToBackClassname='front_to_back', stayTiming=3000){
    this.num = num; // num 显示条目
    this.classname = targetClassname;
    this.backToFront = backToFrontClassname;
    this.frontToBack = frontToBackClassname;
    this.stayTiming = stayTiming;  // 毫秒
    this.timeout = null;
}
AnimationRotate.prototype = {
    constructor: AnimationRotate,
    init: function(){
        var obj = $(this.classname);
        var that = this;
        var step = null;

        obj.each(function(index, ele){
            // 每一条信息的高度(包括margin)
            if(step === null){
                step = $(ele).height() + parseInt($(ele).css('marginBottom'));
            }
            if(index < that.num){
                $(ele).css({
                    'top': step*(index%5)+'px',
                    'position': 'absolute',
                    'transform': 'rotateX(0deg)'
                });
            }
            if(index >= that.num){
                $(ele).css({
                    'top': step*(index%5)+'px',
                    'position': 'absolute',
                    'transform': 'rotateX(180deg)'
                });
            }
        });

        setTimeout(function(){
            that.itemRotate();
        }, that.stayTiming);
    },
    itemRotate: function(){
        var obj = $(this.classname);
        var parent = $(this.classname).parent();
        var that = this;
        var step = null;

        var objTemp = null;
        if(obj.length > that.num*2){
            objTemp = obj[that.num-1];
        }else {
            objTemp = obj[obj.length - 1];
        }
        $(objTemp).on('animationend webkitAnimationEnd oAnimationEnd', function(){
            for(var i=0,len=obj.length;i<5;i++){
                $(obj.get(i)).appendTo(parent);
            }
            that.alternate();
            $(this).off('animationend webkitAnimationEnd oAnimationEnd', arguments.callee);
        });
        obj.each(function(index, ele){
            var is180deg = that.is180deg(ele);
            if(is180deg){
                $(ele).show();
                $(ele).addClass(that.backToFront).css('animation-delay', (index%that.num) * 100 +'ms');
                $(ele).on('animationend', function(){
                    $(this).css({
                        'transform': 'rotateX(0deg)'
                    });
                    $(this).removeClass(that.backToFront);
                });
            }else{
                $(ele).addClass(that.frontToBack).css('animation-delay', (index%that.num) * 100 +'ms');
                $(ele).on('animationend', function(){
                    $(this).css({
                        'transform': 'rotateX(180deg)'
                    });
                    $(this).removeClass(that.frontToBack);
                });
            }
            // $('.'+that.backToFront+', .'+that.frontToBack).css('animation-play-state', 'running');
            if(index == (2*that.num-1)){
                return false;
            }
        });
        // this.alternate();
    },
    alternate: function(){
        var that = this;
        // $('.'+that.backToFront+', .'+that.frontToBack).css('animation-play-state', 'paused');
        setTimeout(function(){
            that.itemRotate();
        }, this.stayTiming);
    },
    is180deg: function(domobj){
        var func = $(domobj).css('transform').toLowerCase();
        var is180deg = !!~func.indexOf('matrix3d');
        return is180deg;
    }
}

// 翻转动画 end

// 听课排行榜 start
var RankingList = function(classname, num=5, stayTiming=3000){
    this.classname = classname;
    // num 过渡的条数
    this.num = num;
    this.stayTiming = stayTiming;
    this.obj = $(this.classname);
    this.parentDom = this.obj.parent().get(0);
    this.itemH = this.obj.height();
};
RankingList.prototype = {
    constructor: RankingList,
    init: function(){
        var that = this;
        setTimeout(function(){
            that.itemHide();
        }, that.stayTiming)
    },
    itemHide: function(){
        // 获取num数个dom
        var ele_array = $(this.classname).splice(0, this.num);
        var that = this;
        $(ele_array[this.num-1]).on('transitionend webkitTransitionEnd oTransitionEnd', function(){
            that.changeQueue(ele_array);
            $(this).off('transitionend webkitTransitionEnd oTransitionEnd', arguments.callee);
        });
        for(var i=0; i<this.num; i++){
            $(ele_array[i]).css('height', '0px');
        }
        setTimeout(function(){
            that.itemHide();
        }, that.stayTiming)
    },
    changeQueue: function(ele_array){
        for(var i=0; i<this.num; i++){
            $(ele_array[i]).appendTo(this.parentDom).css('height', this.itemH);
        }
    }
};
// 听课排行榜 start
