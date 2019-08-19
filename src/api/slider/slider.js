/* global jQuery document window $ */
/* eslint-disable wrap-iife */
/* eslint-disable func-names */
// eslint-disable-next-line no-multiple-empty-lines

(function ($) {
  $.fn.rangeSlider = function () {
    return this.each(function () {
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

      function btnRangeMouse(event) {
        const clazz = /range__button_two/i.test(event.target.className);
        const sliderCoords = getCoords($slider);
        const buttonCoords1 = getCoords($button1);
        const buttonCoords2 = getCoords($button2);
        let shiftX2 = event.pageX - buttonCoords2.left;
        let shiftX1 = event.pageX - buttonCoords1.left;
        const $document = $(document);

        function btnMove(event) {
          if (clazz) {
            let left2 = event.pageX - shiftX2 - sliderCoords.left;
            const right2 = $slider.outerWidth() - $button2.outerWidth();
            if (left2 < 0) left2 = 0;
            if (left2 > right2) left2 = right2;
            $button2.css('margin-left', `${left2}px`);
            shiftX1 = event.pageX - buttonCoords1.left;
            const left1 = event.pageX - shiftX1 - sliderCoords.left;
            ifElse(left1, left2);
          } else {
            let left1 = event.pageX - shiftX1 - sliderCoords.left;
            const right1 = $slider.outerWidth() - $button1.outerWidth();
            if (left1 < 0) left1 = 0;
            if (left1 > right1) left1 = right1;
            $button1.css('margin-left', `${left1}px`);
            shiftX2 = event.pageX - buttonCoords2.left;
            const left2 = event.pageX - shiftX2 - sliderCoords.left;
            ifElse(left1, left2);
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
