import '../css/main.scss';
import '../css/main2.scss';
import '../css/common_css_file.css';
import style from '../css/provide_to_module.css';
import $ from 'jquery';
const sum = (a, b) => {
    return a + b;
};

$('.main').html(sum(1, 8));
console.log(style.main);