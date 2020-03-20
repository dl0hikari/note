
// 听课榜
// http://data.edufe.com.cn/?f=aliaction&m=action_timelong

// 课程热度榜
// http://data.edufe.com.cn/?f=aliaction&m=action_c_timelong

// 登录学员听课占比
// http://data.edufe.com.cn/?f=aliaction&m=action_cyc_course

// 登录学生作业占比
// http://data.edufe.com.cn/?f=aliaction&m=action_cyc_home

// 登录学员辅导占比
// http://data.edufe.com.cn/?f=aliaction&m=action_cyc_fd

// 今日登录
// http://data.edufe.com.cn/?f=aliaction&m=action_dl_today

// 昨日登录
// http://data.edufe.com.cn/?f=aliaction&m=action_dl_yesteday

// 今日登录率
// http://data.edufe.com.cn/?f=aliaction&m=action_lv

// 在籍人数
// [
// {
//     "name": "",
//     "value": 118450
// }
// ]
// 地图
// http://data.edufe.com.cn/?f=aliaction&m=action_ab
var _defaultEdufe = {
    action_dl_today: 'http://data.edufe.com.cn/?f=aliaction&m=action_dl_today',
    action_dl_yesteday: 'http://data.edufe.com.cn/?f=aliaction&m=action_dl_yesteday',
    action_lv: "http://data.edufe.com.cn/?f=aliaction&m=action_lv",
    student_count: [{name:'在籍人数', value: 118450}],// 在籍人数
    action_mob: "http://data.edufe.com.cn/?f=aliaction&m=action_mob",
    action_timelong: "http://data.edufe.com.cn/?f=aliaction&m=action_timelong", // 听课排行榜
    action_c_timelong: "http://data.edufe.com.cn/?f=aliaction&m=action_c_timelong",// 课程热度排行榜
    action_cyc_course: 'http://data.edufe.com.cn/?f=aliaction&m=action_cyc_course',
    action_cyc_home: 'http://data.edufe.com.cn/?f=aliaction&m=action_cyc_home',
    action_cyc_fd: 'http://data.edufe.com.cn/?f=aliaction&m=action_cyc_fd',
    action_allarea: "http://data.edufe.com.cn/?f=aliaction&m=action_allarea",
    action_fxecharts: "http://data.edufe.com.cn/?f=aliaction&m=action_fxecharts",
    timing: 3000, // 地图获取数据间隔
    timing_lv: 3000, // 圆盘获取数据间隔
    timing_login: 3000 // 今日登录 昨日登录等获取数据时间间隔
}

// 听课排行榜
function clean_dom_children(str_name){
    $(str_name).html("");
}
function createDom_tk(data_arr){
    var frag = document.createDocumentFragment();
    $.each(data_arr, function(index, value){
        var divD0 = document.createElement('div');
        if(index%2 == 0){
            divD0.className = "row odd";
        }else{
            divD0.className = "row";
        }
        var divD1 = document.createElement('div');
        divD1.className = "cell";

        var divD2 = document.createElement('div');
        divD2.className = "num";
        divD2.innerHTML = index+1;

        divD1.appendChild(divD2);
        divD2 = null;
        divD0.appendChild(divD1);

        divD1 = document.createElement('div');
        divD1.className = "cell2";
        divD1.innerHTML = value.name;
        divD0.appendChild(divD1);

        divD1 = document.createElement('div');
        divD1.className = 'cell3';
        divD1.innerHTML = value.time;
        divD0.appendChild(divD1);

        frag.appendChild(divD0);
    });
    return frag;
}
// $.get(_defaultEdufe.action_timelong, function(data){
//     var data_arr = data;
//     var frag = createDom_tk(data_arr);
//     document.getElementById("lcenter-list-items").appendChild(frag);

//     var ranking_list = new RankingList('.lcenter-list-items .row', 5);
//         ranking_list.init();
// }, 'json');

function get_timelong(){
    clean_dom_children("#lcenter-list-items");
    $.get(_defaultEdufe.action_timelong, function(data){
    // 初始化dom
    var data_arr = data;
    var frag = createDom_tk(data_arr);
    document.getElementById("lcenter-list-items").appendChild(frag);

    var ranking_list = new RankingList('.lcenter-list-items .row', 5);
        ranking_list.init();
    }, 'json');
}

// 课程热度排行榜
function createDom_hot(data){
    // 课时最大值为基准
    var maxValue=0;
    $.each(data, function(index, ele){
        if(ele.value>maxValue){
            maxValue = ele.value;
        }
    });
    var frag = document.createDocumentFragment();
    $.each(data, function(index, ele){
        var divD0 = document.createElement('div');
        divD0.className = "item";

        var divD1 = document.createElement('div');
        divD1.className = "num";
        divD1.innerHTML = index + 1;
        divD0.appendChild(divD1);

        divD1 =  document.createElement('div');
        divD1.className = "course";

        divD2 = document.createElement('div');
        divD2.className = "color";
        divD2.style = "width:"+(ele.value/maxValue*100)+"%;";
        divD2.innerHTML = ele.content;

        divD1.appendChild(divD2);
        divD0.appendChild(divD1);

        frag.appendChild(divD0);
    });
    return frag;
}
// $.get(_defaultEdufe.action_c_timelong, function(data){

//     // 初始化dom
//     var frag = createDom_hot(data);
//     document.getElementById('hot-courses').appendChild(frag);
//     frag = null;
//     var animation_rotate = new AnimationRotate('.item');
//     animation_rotate.init();
// }, 'json');

function get_c_timelong(){
    clean_dom_children("#hot-courses");
    $.get(_defaultEdufe.action_c_timelong, function(data){
    // 初始化dom
    var frag = createDom_hot(data);
    document.getElementById('hot-courses').appendChild(frag);
    frag = null;
    var animation_rotate = new AnimationRotate('.item');
    animation_rotate.init();
    }, 'json');
}

// 统计圆盘
var percentArr = [];
var statistics_opt = {
        'targetStr': '.svg-wrapper',
        'radius': 90,
        // 'percentArr':percentArr
    };
var obj_statistics = null;
function get_types_lv(){
    $.when(
        $.ajax(_defaultEdufe.action_cyc_course, {dataType: 'json'}),
        $.ajax(_defaultEdufe.action_cyc_home, {dataType: 'json'}),
        $.ajax(_defaultEdufe.action_cyc_fd, {dataType: 'json'})
    ).done(function(course, home, fd){
        percentArr.push(course[0][0].value*100, home[0][0].value*100, fd[0][0].value*100);
        statistics_opt['percentArr'] = percentArr;
        if(!(obj_statistics instanceof Statistics)){
            obj_statistics = new Statistics(statistics_opt);
        }
        obj_statistics.setData(undefined, false);
    });
    setTimeout(get_types_lv, _defaultEdufe.timing_lv);
}
// setTimeout(get_types_lv, 0);
// 动态数字显示
// 今日登录
// {{ url_for('static', filename='map/data/action_dl_today.json', _external=True) }}
function get_types_login(){
    $.get(_defaultEdufe.action_dl_today, function(data){
        var _from = parseInt($('.today-logined-count').html().replace(',', '')) || 0;
        $('#login-today title').html(data[0].name);
        $('.today-logined-count').countTo({from: _from, to: data[0].value, speed: 1500});
    }, 'json');
    // 昨日登录
    $.get(_defaultEdufe.action_dl_yesteday, function(data){
        var _from = parseInt($('.yesterday-logined-count').html().replace(',', '')) || 0;
        $('#login-yesterday title').html(data[0].name);
        $('.yesterday-logined-count').countTo({from: _from, to: data[0].value, speed: 1500});
    }, 'json');
    // 今日登陆率
    $.get(_defaultEdufe.action_lv, function(data){
        var _from = parseFloat($('.today-logined-percent').html()) || 0;
        $('#login-today-lv title').html(data[0].name);
        $('.today-logined-percent').countTo({from: _from, to: data[0].value, speed: 1500, decimals: 2});
    }, 'json');
    // pc
    $.get(_defaultEdufe.action_mob, function(data){
        var _from = parseInt($('.pc_user_count').html()) || 0;
        var _to = data[0].value * 100;
        $('.pc_user_count').countTo({from: _from, to: _to, speed: 1500});
    // 手机
        var _from = parseInt($('.mobile_user_count').html()) || 0;
        var _to = data[1].value * 100;
        $('.mobile_user_count').countTo({from: _from, to: _to, speed: 1500});
    }, 'json');

    setTimeout(get_types_login, _defaultEdufe.timing_login);
}
// setTimeout(get_types_login, 0);
// 在籍人数
function studentCount(){
    var data = _defaultEdufe.student_count;
    $("#people-count title").html(data[0].name );
    $('.students-count').countTo({to: data[0].value});
}


// 地图
var edufe_map = null;
var regionsData = [];
var geoCoordMapData = {};
    geoCoordMapData['大连'] = [121.62,38.92];

function get_login(){
    var DLData = [];
    $.get(_defaultEdufe.action_fxecharts, function(data){
        $.each(data, function(index, ele){
            DLData.push([
                {name:ele.name},
                {name:'大连',value:95}
            ])
        });
        edufe_map.run({
            'toCity': '大连',
            'fromCityArr': DLData,
        });
        setTimeout(get_login, _defaultEdufe.timing);
    }, 'json');
}
function selectColors(arr){
    var oUl = $('<ul class="selectColor"></ul>');
    $.each(arr, function(index, ele){
        var endIndex = ele.length-1;
        var sColors = ele[0];
        var halfEleIndex = 0;
        if(ele.length>2){
            halfEleIndex = Math.floor(halfEleIndex/2);
            sColors += ', '+ele[halfEleIndex];
        }
        sColors += ', '+ele[endIndex];
        $('<li>'+ index +'</li>').css({
            'background': '-webkit-linear-gradient(left top, '+ sColors +')',
        }).css({
            'background': '-moz-linear-gradient(left top, '+ sColors +')',
        }).css({
            'background': 'linear-gradient(left top, '+ sColors +')'
        }).appendTo(oUl);
    });
    $(".datav-layout").append(oUl);
    oUl.children('li').on('click', function(e){
        var tmp = $(this).index();
        edufe_map.regionsColorInit(arr[tmp]).editOption();
    });
}

$.when(
    $.ajax(_defaultEdufe.action_timelong, {dataType: 'json'}),
    $.ajax(_defaultEdufe.action_c_timelong, {dataType: 'json'}),
    $.ajax(_defaultEdufe.action_cyc_course, {dataType: 'json'}),
    $.ajax(_defaultEdufe.action_cyc_home, {dataType: 'json'}),
    $.ajax(_defaultEdufe.action_cyc_fd, {dataType: 'json'}),
    $.ajax(_defaultEdufe.action_allarea, {dataType: 'json'})
).done(function(a, b, course, home, fd, map){
    // 听课排行榜
    var frag = createDom_tk(a[0]);
    document.getElementById("lcenter-list-items").appendChild(frag);
    frag = null;

    // 课程热度排行榜
    var frag = createDom_hot(b[0]);
    document.getElementById('hot-courses').appendChild(frag);
    frag = null;

    // 统计圆盘
    percentArr.push(course[0][0].value*100, home[0][0].value*100, fd[0][0].value*100);
    statistics_opt['percentArr'] = percentArr;
    obj_statistics = new Statistics(statistics_opt);
    // 地图
    $.each(map[0], function(index, ele){
        geoCoordMapData[index] = [ele[0], ele[1]];
        regionsData.push({
            "name": index,
            "value": ele[2]
        })
    });
    edufe_map = $.makeMap({
        'geoCoordMapData': geoCoordMapData, //
        'regionsData': regionsData,
    });

}).done(function(){
    $(".welcome").fadeOut(1500, function(){
        // 听课排行榜
        var ranking_list = new RankingList('.lcenter-list-items .row', 5);
        ranking_list.init();
       // 课程热度排行榜
       var animation_rotate = new AnimationRotate('.item');
       animation_rotate.init();

       // 统计圆盘
       obj_statistics.setData(undefined, false);
       setTimeout(get_types_lv, _defaultEdufe.timing_lv);

       // 动态数字显示
       get_types_login();
       studentCount();

       // 地图
       get_login();

       selectColors([
           ['#faad14', '#d29f23', '#cd9d25', '#a48f35', '#737c49',
           '#476e59', '#1f5e68', '#266166', '#075571', '#2e3c48'],
           ['#ff0000', '#0000ff'],
           ['#00ff00', '#0000ff'],
           ['#d3a124','#0a5670','#3d695d','#323c48', '#2a333d'],
           ['#faad14', '#2e3c48']
       ]);
   });
});