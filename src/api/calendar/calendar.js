/* global jQuery */

(($) => {
  const jq = $;
  jq.fn.calendar = function pluginJQ(settings) {
    const options = $.extend({}, settings);
    return this.each(() => {
      const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
      const listMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август'];
      listMonths.push('Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь');
      let now = new Date();
      let month = new Date().getMonth();
      const year = new Date().getFullYear();
      let predMonthDay = new Date(year, month - 1, 0).getDate();
      const number = parseInt(options.value, 10);
      let currentDataDay = number || -1;

      const $calendarTo = $(`.${options.to}`);
      let $activeInput;
      let currentDate;
      let staticData;
      let staticTableTd;
      let currentTableTd;
      const $root = $(this);
      const $calendar = $('<section>')
        .addClass('calendar')
        .insertAfter($root);
      const $list = $('<ul>')
        .addClass('calendar__month-list')
        .appendTo($calendar);
      $('<li>')
        .addClass('calendar__month-list-prev')
        .appendTo($list);
      const $header = $('<li>')
        .addClass('calendar__month-list-header')
        .html(`${listMonths[month]} ${year}`)
        .attr('data-year', `${year}`)
        .attr('data-month', `${month + 1}`)
        .appendTo($list);
      $('<li>')
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

      function displayThisMonth() {
        const newDays = [];
        now.setDate(1);
        // Предыдущий месяц
        const blank = (now.getDay() === 0) ? 6 : now.getDay() - 1;
        for (let i = 1; i <= blank; i += 1) {
          newDays.push(predMonthDay - blank + i);
        }
        // Текущий месяц
        now.setMonth(now.getMonth() + 1);
        now.setDate(0);
        const DAYS = now.getDate();
        for (let i = 1; i <= DAYS; i += 1) {
          newDays.push(i);
        }
        // Следующий месяц
        const last = now.getDay();
        let lastBlank = (last === 0) ? 0 : 7 - last;
        for (let i = 1; i <= lastBlank; i += 1) {
          newDays.push(i);
        }

        lastBlank = newDays.length - 1 - lastBlank;
        $tbody.children().remove();
        newDays.forEach((item, ind) => {
          if (ind % 7 === 0) $('<tr>').appendTo($tbody);
          let MONTH = now.getMonth() + 1;
          let DAY = item.toString();
          MONTH = MONTH.toString();
          if (MONTH.length === 1) MONTH = `0${MONTH}`;
          if (DAY.length === 1) DAY = `0${DAY}`;
          const content = `${DAY}.${MONTH}.${now.getFullYear()}`;
          const $td = $('<td>')
            .addClass('calendar__table-day')
            .html(item)
            .attr('data-table-td', ind);
          if (ind < blank || ind > lastBlank) {
            $td
              .addClass('calendar__table-day_pred-next-month')
              .attr('data-day', '');
          } else {
            $td.attr('data-day', content);
          }
          $td.appendTo($('tr:last'));
        });

        $header
          .html(`${listMonths[now.getMonth()]} ${now.getFullYear()}`)
          .attr('data-year', `${now.getFullYear()}`)
          .attr('data-month', `${now.getMonth() + 1}`);
      }

      function createMonth(num = 0) {
        month += num;
        predMonthDay = new Date(year, month, 0).getDate();
        now = new Date();
        now.setMonth(month);
        displayThisMonth();
      }

      const listIntermediate = [];
      function clearClass() {
        const $cntDataDay = $(`td[data-table-td="${currentTableTd}"]`);
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

      function setNewDay(target) {
        const currentTarget = target;
        if (currentTarget.dataset.predNextMonth) return;
        clearClass();
        currentTableTd = parseInt(currentTarget.dataset.tableTd, 10);
        if ($activeInput.hasClass('js-input-from') && staticTableTd < currentTableTd) return;
        if ($activeInput.hasClass('js-input-to') && staticTableTd > currentTableTd) return;
        currentDataDay = currentTarget.dataset.day;
        currentDate = currentTarget.dataset.day;
        currentTarget.className = 'calendar__table-day_active';
        if (staticData !== -1) {
          if (staticTableTd < currentTableTd) {
            for (let i = staticTableTd + 1; i < currentTableTd; i += 1) {
              setIntermediate(i);
            }
          } else {
            for (let i = currentTableTd + 1; i < staticTableTd; i += 1) {
              setIntermediate(i);
            }
          }
        }
      }

      function clean() {
        clearClass();
        $(`td[data-day="${staticData}"]`).removeClass('calendar__table-day_active');
        currentDataDay = -1;
      }

      function removeAttribute() {
        $calendarTo.removeAttr('disabled');
        $root.removeAttr('disabled');
      }

      function cleanDataDay() {
        const data = ($activeInput.hasClass('js-input-from')) ? 'data-from' : 'data-to';
        $activeInput
          .attr(data, '')
          .attr('value', '');
        clean();
        $('td.calendar__table-day_active')
          .removeClass('calendar__table-day_active')
          .addClass('calendar__table-day');
        $('td.calendar__table-day_intermediate')
          .removeClass('calendar__table-day_intermediate');
        removeAttribute();
        $calendar.slideUp('slow');
      }

      function applyDataDay() {
        if (currentDataDay === -1) return;
        const data = ($activeInput.hasClass('js-input-from')) ? 'data-from' : 'data-to';
        $activeInput
          .attr(data, currentDate)
          .attr('value', currentDate);
        clean();
        removeAttribute();
        $calendar.slideUp('slow');
      }

      const toggle = () => {
        $calendar.slideToggle('slow', () => {
          if ($calendar.css('display') === 'none') {
            cleanDataDay();
          }
        });
      };

      const createMonthAdditional = () => {
        const data = ($activeInput.hasClass('js-input-from')) ? 'data-from' : 'data-to';
        $activeInput
          .attr(data, '')
          .attr('value', '');
        clean();
        staticTableTd = -1;
        currentTableTd = -1;
        $('td.calendar__table-day_active')
          .removeClass('calendar__table-day_active')
          .addClass('calendar__table-day');
        $('td.calendar__table-day_intermediate')
          .removeClass('calendar__table-day_intermediate');
      };

      const getNextMonth = () => {
        createMonth(1);
        createMonthAdditional();
      };

      const getPrevMonth = () => {
        createMonth(-1);
        createMonthAdditional();
      };

      function parentClick(event) {
        event.preventDefault();
        if (/js-input-from/i.test(event.target.className)) {
          $calendarTo.attr('disabled', 'disabled');
          $activeInput = $('.js-input-from');
          currentDate = $activeInput.attr('data-from') || -1;
          staticData = $calendarTo.attr('data-to') || -1;
          const boolStatic = staticData !== -1;
          const boolActive = currentDate !== -1;
          if (boolStatic) {
            const $static = $(`td[data-day="${staticData}"]`);
            staticTableTd = parseInt($static.attr('data-table-td'), 10);
            $static.addClass('calendar__table-day_active');
          }
          if (boolActive) {
            const $active = $(`td[data-day="${currentDate}"]`);
            currentTableTd = parseInt($active.attr('data-table-td'), 10);
            $active.addClass('calendar__table-day_active');
          }
          if (boolActive && boolStatic) {
            for (let i = currentTableTd + 1; i < staticTableTd; i += 1) {
              setIntermediate(i);
            }
          }
        }
        if (/js-input-to/i.test(event.target.className)) {
          $root.attr('disabled', 'disabled');
          $activeInput = $('.js-input-to');
          currentDate = $activeInput.attr('data-to') || -1;
          staticData = $root.attr('data-from') || -1;
          const boolStatic = staticData !== -1;
          const boolActive = currentDate !== -1;
          if (boolStatic) {
            const $static = $(`td[data-day="${staticData}"]`);
            staticTableTd = parseInt($static.attr('data-table-td'), 10);
            $static.addClass('calendar__table-day_active');
          }
          if (boolActive) {
            const $active = $(`td[data-day="${currentDate}"]`);
            currentTableTd = parseInt($active.attr('data-table-td'), 10);
            $active.addClass('calendar__table-day_active');
          }
          if (boolActive && boolStatic) {
            for (let i = staticTableTd + 1; i < currentTableTd; i += 1) {
              setIntermediate(i);
            }
          }
        }
        if (/month-list-next/i.test(event.target.className)) getNextMonth();
        if (/month-list-prev/i.test(event.target.className)) getPrevMonth();
        if (/table-day/i.test(event.target.className)) setNewDay(event.target);
      }

      createMonth();
      $root
        .on('click', toggle)
        .parent()
        .on('click', parentClick);
      $calendarTo
        .on('click', toggle)
        .parent()
        .on('click', parentClick);
      $btnClean.on('click', cleanDataDay);
      $btnApply.on('click', applyDataDay);
    });
  };
})(jQuery);
