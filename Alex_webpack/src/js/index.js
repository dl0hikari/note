import '../css/main.scss';
import '../css/main2.scss';
import style from '../css/main3.css';
import $ from 'jquery';
const sum = (a, b) => {
    return a + b;
};

$('.main').html(sum(1, 8));
console.log(style.main);