/* global jQuery document window */

(($) => {
  const jq = $;
  jq.fn.rangeSlider = function pluginJQ(settings) {
    const options = $.extend({}, settings);
    return this.each(() => {
      const $root = $(this);
      const $slider = $('<section>')
        .addClass('range js-range')
        .appendTo($root);
      const $between = $('<div>')
        .addClass('range__between js-range__between')
        .appendTo($slider);
      const $button1 = $('<span>')
        .addClass('range__button range__button_one js-range__button_one')
        .appendTo($slider);
      const $button2 = $('<span>')
        .addClass('range__button range__button_two js-range__button_two')
        .appendTo($slider);

      const $left = $(`.${options.left}`);
      const $right = $(`.${options.right}`);

      function getStep() {
        const stepPx = parseInt($root.css('width'), 10) / options.max;
        return stepPx * options.step;
      }

      function getCoords(elem) {
        const $box = $(elem).offset();
        const $window = $(window);
        return {
          top: $box.top + $window.scrollTop(),
          left: $box.left + $window.scrollLeft()
        };
      }

      function ifElse(left1, left2) {
        if (left1 > left2) {
          $between.css('width', `${left1 - left2}px`);
          $between.css('margin-left', `${left2}px`);
        } else {
          $between.css('width', `${left2 - left1}px`);
          $between.css('margin-left', `${left1}px`);
        }
      }

      function ifElseRight(left1, left2, leftCnt) {
        if (left1 > left2) {
          $left.html(`${leftCnt}₽`);
        } else {
          $right.html(`${leftCnt}₽`);
        }
      }

      function ifElseLeft(left1, left2, leftCnt) {
        if (left1 > left2) {
          $right.html(`${leftCnt}₽`);
        } else {
          $left.html(`${leftCnt}₽`);
        }
      }

      function getNewCnt(step, pageXY, shift) {
        const space = pageXY - shift;
        const max = space / step;
        let x = max - (max % 1);
        x *= options.step;
        if (x > options.max) x = options.max;
        if (x < options.min) x = options.min;
        return x;
      }

      function btnRangeMouse(event) {
        const clazz = /range__button_two/i.test(event.target.className);
        const sliderCoords = getCoords($slider);
        const buttonCoords1 = getCoords($button1);
        const buttonCoords2 = getCoords($button2);
        let shiftX2 = event.pageX - buttonCoords2.left;
        let shiftX1 = event.pageX - buttonCoords1.left;
        const $document = $(document);
        const step = getStep();

        function btnMove(event) {
          const leftCnt = getNewCnt(step, event.pageX, sliderCoords.left);
          if (clazz) {
            let left2 = event.pageX - shiftX2 - sliderCoords.left;
            const right2 = $slider.outerWidth() - $button2.outerWidth();
            if (left2 < 0) left2 = 0;
            if (left2 > right2) left2 = right2;
            $button2.css('margin-left', `${left2}px`);
            shiftX1 = event.pageX - buttonCoords1.left;
            const left1 = event.pageX - shiftX1 - sliderCoords.left;
            ifElse(left1, left2);
            ifElseRight(left1, left2, leftCnt);
          } else {
            let left1 = event.pageX - shiftX1 - sliderCoords.left;
            const right1 = $slider.outerWidth() - $button1.outerWidth();
            if (left1 < 0) left1 = 0;
            if (left1 > right1) left1 = right1;
            $button1.css('margin-left', `${left1}px`);
            shiftX2 = event.pageX - buttonCoords2.left;
            const left2 = event.pageX - shiftX2 - sliderCoords.left;
            ifElse(left1, left2);
            ifElseLeft(left1, left2, leftCnt);
          }
        }

        function initialEvent() {
          document.onmousemove = null;
          document.onmouseup = null;
        }

        document.onmousemove = btnMove;
        $document.on('mouseup', initialEvent);
      }

      $button1
        .on('mousedown', btnRangeMouse)
        .on('dragstart', () => false);
      $button2
        .on('mousedown', btnRangeMouse)
        .on('dragstart', () => false);
    });
  };
})(jQuery);
