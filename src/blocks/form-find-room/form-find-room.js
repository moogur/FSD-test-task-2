/* global $ */

const $inputGuests = $('.js-input-guest');
const $calendarFrom = $('.js-input-from');
const $calendarTo = $('.js-input-to');

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

$calendarFrom.calendar({
  to: 'js-input-to'
});
/*
const myLlang = {
  days: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
  daysShort: ['Вос','Пон','Вто','Сре','Чет','Пят','Суб'],
  daysMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
  months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
  monthsShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
  today: 'Сегодня',
  clear: 'Очистить',
  dateFormat: 'dd.mm.yyyy',
  timeFormat: 'hh:ii',
  firstDay: 1
};

$calendarFrom.datepicker({
  range: true,
  language: 'myLlang',
  onSelect: function (fd, d, picker) {
    $calendarFrom.val(fd.split("-")[0]);
    $calendarTo.val(fd.split("-")[1]);
  }
});
*/