/* global $ */

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const days = [29.07, 30.07, 31.07, 1.08, 2.08, 3.08, 4.08, 5.08, 6.08, 7.08, 8.08, 9.08, 10.08, 11.08, 12.08, 13.08, 14.08, 15.08, 16.08, 17.08, 18.08, 19.08, 20.08, 21.08, 22.08, 23.08, 24.08, 25.08, 26.08, 27.08, 28.08, 29.08, 30.08, 31.08, 1.09];

const $root = $('.example');
const $calendar = $('<section>')
  .addClass('calendar')
  .appendTo($root);
const $list = $('<ul>')
  .addClass('calendar__month-list')
  .appendTo($calendar);
const $prev = $('<li>')
  .addClass('calendar__month-list-prev')
  .appendTo($list);
const $header = $('<li>')
  .addClass('calendar__month-list-header')
  .html('Август 2019')
  .attr('data-year', '2019')
  .attr('data-month', '08')
  .appendTo($list);
const $next = $('<li>')
  .addClass('calendar__month-list-next')
  .appendTo($list);
const $table = $('<table>')
  .addClass('calendar__table')
  .appendTo($calendar);
const $thead = $('<thead>')
  .appendTo($table);
const $th = $('<th>')
  .addClass('calendar__table-header')
  .appendTo($thead);
weekdays.forEach((item) => {
  $('<td>')
    .addClass('calendar__table-weekday')
    .html(item)
    .appendTo($th);
});
const $tbody = $('<tbody>')
  .appendTo($table);

for (let i of [0, 1, 2, 3, 4]) {
  $('<tr>')
    .addClass(`calendar__table-body-${i}`)
    .appendTo($tbody);
}
days.forEach((item, ind) => {
  let num = ind / 7;
  num = num - (num % 1);
  $('<td>')
    .addClass('calendar__table-day')
    .html(item.toString().split('.')[0])
    .attr('data-day', item)
    .attr('data-table-td', ind)
    .appendTo($(`.calendar__table-body-${num}`));
});

const $buttons = $('<div>')
  .addClass('calendar__buttons')
  .appendTo($calendar);
const $btnClean = $('<button>')
  .addClass('calendar__buttons-clean')
  .html('очистить')
  .appendTo($buttons);
const $btnApply = $('<button>')
  .addClass('calendar__buttons-apply')
  .html('применить')
  .appendTo($buttons);

let currentDataDay = -1;
let currentTableTd = -1;
let listIntermediate = [];
function clearClass() {
  const $cntDataDay = $(`td[data-day="${currentDataDay}"]`);
  $cntDataDay
    .removeClass('calendar__table-day_active')
    .addClass('calendar__table-day');
  for (let i = 0; i <= listIntermediate.length; i += 1) {
    $(`td[data-table-td="${listIntermediate[i]}"]`).removeClass('calendar__table-day_intermediate');
  }
}

function setIntermediate(i) {
  listIntermediate.push(i);
  $(`td[data-table-td="${i}"]`).addClass('calendar__table-day_intermediate');
}

const main = 19.08;
const mainTableTd = 21;
function setNewDay(event) {
  const { target } = event;
  const checkDataDay = target.tagName === "TD" && target.dataset.day !== undefined;
  if (checkDataDay) {
    clearClass();
    currentDataDay = target.dataset.day;
    currentTableTd = parseInt(target.dataset.tableTd, 10);
    target.className = 'calendar__table-day_active';
    if (mainTableTd < currentTableTd) {
      for (let i = mainTableTd + 1; i < currentTableTd; i += 1) {
        setIntermediate(i);
      }
    } else {
      for (let i = currentTableTd + 1; i < mainTableTd; i += 1) {
        setIntermediate(i);
      }
    }
  }
}

function cleanDataDay(event) {
  event.preventDefault();
  clearClass();
  currentDataDay = -1;
}

function applyDataDay(event) {
  event.preventDefault();
  console.log(currentDataDay); // отдача значения наружу
  cleanDataDay();
}

function getNextMonth(event) {
  const [one, month, day, year] = new Date().toString().split(' ');
  console.log(one);
  console.log(month);
  console.log(day);
  console.log(year);
}

function getPrevMonth(event) {
  const days_in_april = 32 - new Date(2019, 2, 32).getDate();
  console.log(days_in_april);
}


$(`td[data-day="${main}"]`).addClass('calendar__table-day_active');
$root.on('click', setNewDay);
$btnClean.on('click', cleanDataDay);
$btnApply.on('click', applyDataDay);
$next.on('click', getNextMonth);
$prev.on('click', getPrevMonth);
