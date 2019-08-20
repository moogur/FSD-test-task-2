/* global $ */

const $inputGuests = $('.js-input-guest');

const toggleClass = () => $inputGuests.toggleClass('find-room__item-input_active');

$inputGuests
  .dropdown({
    data: [
      { title: 'взрослые', cnt: 2 },
      { title: 'дети', cnt: 1 },
      { title: 'младенцы', cnt: 0 }
    ],
    buttons: true,
    all: true
  })
  .on('click', toggleClass);
