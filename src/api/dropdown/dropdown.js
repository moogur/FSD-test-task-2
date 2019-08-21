/* eslint-disable wrap-iife */
/* global jQuery */

(function jq($) {
  $.fn.dropdown = function pluginJQ(settings) {
    const options = $.extend({ data: [], buttons: false, all: false }, settings);
    return this.each(() => {
      const $root = $(this);
      $root.css('position', 'relative');
      const $section = $('<section>')
        .addClass('drop-down-menu')
        .insertAfter($root);

      $section
        .css('margin-bottom', `-${$root.css('margin-bottom')}`);

      const listPlaceholder = {};
      options.data.forEach(({ title, cnt }, ind) => {
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
          .addClass(cnt === 0 ? 'drop-down-menu__item-button_zero' : '')
          .html('-')
          .attr('data-id', ind)
          .appendTo($article);

        $section.append($article);
      });

      if (options.buttons) {
        const $buttons = $('<div>')
          .addClass('drop-down-menu__buttons')
          .appendTo($section);

        $('<button>')
          .addClass('drop-down-menu__buttons-clean')
          .html('очистить')
          .appendTo($buttons);

        $('<button>')
          .addClass('drop-down-menu__buttons-apply')
          .html('применить')
          .appendTo($buttons);
      }

      function setPlaceholder() {
        let placeholder = '';
        if (options.all) {
          let sum = 0;
          Object.values(listPlaceholder).forEach((item, ind) => {
            if (ind < 2) {
              sum += item;
            } else if (ind === 2) {
              placeholder = `${sum} гостя`;
              if (item !== 0) placeholder += `, ${item} младенцев`;
            }
          });
        } else {
          Object.keys(listPlaceholder).forEach((item, ind) => {
            if (ind === 0) placeholder += `${listPlaceholder[item]} ${options.data[item].title}, `;
            if (ind === 1) placeholder += `${listPlaceholder[item]} ${options.data[item].title}... `;
          });
        }
        $root.attr('placeholder', `${placeholder}`);
      }

      function setNewCnt(dataId, cnt) {
        const $text = $(`span[data-id = "${dataId}"`);
        const num = parseInt($text.html(), 10) + cnt;
        if (num > 10) return;
        if (num < 0) return;
        if (num === 0) {
          $text.next().addClass('drop-down-menu__item-button_zero');
        } else {
          $text.next().removeClass('drop-down-menu__item-button_zero');
        }

        listPlaceholder[dataId] = num;
        $text.html(num);
      }

      function applyData() {
        $section.slideUp('slow', () => {
          setPlaceholder();
        });
      }

      function cleanData() {
        Object.keys(listPlaceholder).forEach((item) => {
          listPlaceholder[item] = 0;
          const $text = $(`span[data-id = "${item}"`);
          $text
            .html(listPlaceholder[item])
            .next()
            .addClass('drop-down-menu__item-button_zero');
        });
        applyData();
      }

      function toggleNumber(e) {
        e.preventDefault();
        if (/plus/i.test(e.target.className)) setNewCnt(e.target.dataset.id, 1);
        if (/minus/i.test(e.target.className)) setNewCnt(e.target.dataset.id, -1);
      }

      const toggle = () => {
        $section.slideToggle('slow', () => {
          if ($section.css('display') === 'none') setPlaceholder();
        });
      };
      $root.on('click', toggle).parent().on('click', toggleNumber);
      if (options.buttons) {
        $('.drop-down-menu__buttons-clean').on('click', cleanData);
        $('.drop-down-menu__buttons-apply').on('click', applyData);
      }
    });
  };
})(jQuery);
