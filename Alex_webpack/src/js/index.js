import '../css/index.scss';
import style from '../css/provide_to_module.scss';
import $ from 'jquery';
const sum = (a, b) => {
    return a + b;
};

$('.main').html(sum(1, 8));
console.log(style.main);
