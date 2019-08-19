/* eslint-disable func-names */
/* eslint-disable wrap-iife */
/* global jQuery $ */

(function ($) {
  $.fn.dropdown = function (settings) {
    const options = $.extend([], settings);
    return this.each(function () {
      const $root = $(this);
      $root.css('position', 'relative');
      $('<section>').addClass('drop-down-menu').insertAfter($root);

      const $section = $('.drop-down-menu');
      $section
        .css('max-width', $root.css('width'))
        .css('margin-bottom', `-${$root.css('margin-bottom')}`);

      const listPlaceholder = {};
      options.forEach(({ title, cnt }, ind) => {
        listPlaceholder[ind] = cnt;
        const $article = $('<article>')
          .addClass('drop-down-menu__item');
        if (ind !== 0) $article.addClass('drop-down-menu__item_margin');

        $('<h3>')
          .addClass('drop-down-menu__item-text')
          .html(title)
          .appendTo($article);

        $('<button>')
          .addClass('drop-down-menu__item-button drop-down-menu__item_float drop-down-menu__item-button_plus')
          .html('+')
          .attr('data-id', ind)
          .appendTo($article);

        $('<span>')
          .addClass('drop-down-menu__item-text drop-down-menu__item-text_width drop-down-menu__item_float')
          .html(cnt)
          .attr('data-id', ind)
          .appendTo($article);

        $('<button>')
          .addClass('drop-down-menu__item-button drop-down-menu__item_float drop-down-menu__item-button_minus')
          .html('-')
          .attr('data-id', ind)
          .appendTo($article);

        $section.append($article);
      });

      function setNewCnt(dataId, cnt) {
        const $text = $(`span[data-id = "${dataId}"`);
        const num = parseInt($text.html(), 10) + cnt;
        if (num > 10) return;
        if (num < 0) return;

        listPlaceholder[dataId] = num;
        let placeholder = '';
        Object.keys(listPlaceholder).forEach((item) => {
          placeholder += `${listPlaceholder[item]} ${options[item].title}, `;
        });

        $text.html(num);
        $root.attr('placeholder', placeholder.trim().slice(0, -1));
      }

      function toggleNumber(e) {
        e.preventDefault();
        if (/plus/i.test(e.target.className)) setNewCnt(e.target.dataset.id, 1);
        if (/minus/i.test(e.target.className)) setNewCnt(e.target.dataset.id, -1);
      }

      const toggle = () => $section.slideToggle();
      $root.on('click', toggle).parent().on('click', toggleNumber);
    });
  };
})(jQuery);
