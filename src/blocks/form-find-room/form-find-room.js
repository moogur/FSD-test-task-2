/* global $ */

const $inputGuests = $('.js-input-guest');

$inputGuests.dropdown([
  { title: 'взрослые', cnt: 2 },
  { title: 'дети', cnt: 1 },
  { title: 'младенцы', cnt: 0 }
]);
