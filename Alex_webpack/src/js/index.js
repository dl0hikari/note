import '../css/main.scss';
import '../css/main2.scss';
import $ from 'jquery';
const sum = (a, b) => {
    return a + b;
};

$('.main').html(sum(1, 8));