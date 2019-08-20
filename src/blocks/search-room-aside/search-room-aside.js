/* global $ */

const $dropdownMenu = $('.js-dropdown-menu');
const $rangeSlider = $('.js-slide-double');
const $dropdownToggle = $('.js-dropdown-toggle');

function iconDropdown() {
  const $dropdown = $('.drop-down-menu');
  $dropdown.slideToggle();
}

const toggleClass = () => $dropdownMenu.toggleClass('search-room__input_active');

$dropdownMenu
  .dropdown({
    data: [
      { title: 'спальни', cnt: 2 },
      { title: 'кровати', cnt: 2 },
      { title: 'ванные комнаты', cnt: 0 }
    ],
    buttons: false,
    all: false
  })
  .on('click', toggleClass);

$rangeSlider.rangeSlider({
  min: 1000,
  max: 20000,
  step: 1000,
  left: 'js-slider-left',
  right: 'js-slider-right'
});

$dropdownToggle.on('click', iconDropdown);
