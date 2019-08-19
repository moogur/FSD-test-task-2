/* global $ */

const $dropdownMenu = $('.js-dropdown-menu');
const $rangeSlider = $('.js-slide-double');
const $dropdownToggle = $('.js-dropdown-toggle');

function iconDropdown() {
  const $dropdown = $('.drop-down-menu');
  $dropdown.slideToggle();
}

$dropdownMenu.dropdown([
  { title: 'спальни', cnt: 2 },
  { title: 'кровати', cnt: 2 },
  { title: 'ванные комнаты', cnt: 0 }
]);
$rangeSlider.rangeSlider();
$dropdownToggle.on('click', iconDropdown);
