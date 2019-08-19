/* global $ */

const $main = $('.added-convenience');
const $header = $('.added-convenience__header');

function toggleList({ target: { className } }) {
  const check = /header/i.test(className) || /expand/i.test(className);
  if (check) {
    $header.next().toggleClass('added-convenience__expand_less').next().slideToggle();
  }
}

$main.on('click', toggleList);
