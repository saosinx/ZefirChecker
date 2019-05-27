(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }

        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }

      return n[i].exports;
    }

    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);

    return o;
  }

  return r;
})()({
  1: [function (require, module, exports) {
    var ZEFIR, activateZefir, checkDOMChange;
    ZEFIR = {
      list: [],
      source: void 0,
      html: {
        select: void 0,
        input: void 0,
        value: void 0,
        dropdown: void 0
      }
    };

    activateZefir = function () {
      var fillDropdownMenu, generateZefirSelectMarkup, resetDropdownMenu, setListOption;

      fillDropdownMenu = function () {
        var elem, i, results;
        i = 0;
        results = [];

        while (i < ZEFIR.source.options.length) {
          elem = document.createElement('li');
          elem.innerHTML = ZEFIR.source.options[i].innerHTML;
          elem.setAttribute('value', ZEFIR.source.options[i].value);
          ZEFIR.list.push({
            name: ZEFIR.source.options[i].innerHTML,
            value: ZEFIR.source.options[i].value
          });
          ZEFIR.html.dropdown.appendChild(elem);

          if (ZEFIR.source.value === ZEFIR.source.options[i].value) {
            ZEFIR.html.value.setAttribute('value', ZEFIR.source.value);
            ZEFIR.html.value.innerHTML = ZEFIR.source.options[i].innerHTML;
          }

          results.push(i += 1);
        }

        return results;
      };

      resetDropdownMenu = function (force = false) {
        var cb;

        cb = function () {
          return [].forEach.call(ZEFIR.html.dropdown.children, child => {
            if (child.style.display === 'none') {
              return child.style.display = 'block';
            } else {
              return '';
            }
          });
        };

        if (force) {
          cb();
        } else {
          setTimeout(cb, 300);
        }

        ZEFIR.html.input.value = '';
        ZEFIR.html.value.style.display = 'block';
      };

      setListOption = function (option) {
        ZEFIR.html.select.classList.remove('--opened');
        ZEFIR.html.input.blur();
        ZEFIR.source.value = option.getAttribute('value');
        ZEFIR.html.value.innerHTML = option.innerHTML;
        return ZEFIR.html.value.setAttribute('value', option.getAttribute('value'));
      };

      generateZefirSelectMarkup = function () {
        var elem;
        elem = document.createElement('div');
        elem.setAttribute('id', 'zefir-select');
        elem.setAttribute('class', 'zefir-select-container');
        elem.innerHTML = "<div class=\"zefir-select\" tabindex=\"0\">\n	<div class=\"zefir-select-inner\">\n		<div class=\"zefir-select-selected-value\" value=\"\"></div>\n		<div class=\"zefir-select-search\">\n			<div class=\"zefir-select-search-inner\">\n				<input class=\"zefir-select-search-input\" autocomplete=\"off\" value=\"\" />\n				<span class=\"zefir-select-search-mirror\">&nbsp;</span>\n			</div>\n		</div>\n	</div>\n	<span class=\"zefir-select-arrow\" unselectable=\"on\">\n		<i class=\"zefiricon zefir-select-arrow-icon\">\n			<svg viewbox=\"64 64 896 896\" width=\"1em\" height=\"1em\" fill=\"currentColor\" focusable=\"false\">\n				<path d=\"M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z\"></path>\n			</svg>\n		</i>\n	</span>\n</div>\n<div class=\"zefir-select-dropdown\">\n	<ul class=\"zefir-select-dropdown-list\"></ul>\n</div>";
        return elem;
      };

      ZEFIR.html.select = generateZefirSelectMarkup();
      ZEFIR.source.parentNode.appendChild(ZEFIR.html.select);
      ZEFIR.html.input = ZEFIR.html.select.querySelector('.zefir-select-search-input');
      ZEFIR.html.value = ZEFIR.html.select.querySelector('.zefir-select-selected-value');
      ZEFIR.html.dropdown = ZEFIR.html.select.querySelector('.zefir-select-dropdown-list');
      fillDropdownMenu();
      console.log('%c🦄🦄🦄 Zefir Select creater 🦄🦄🦄', 'color: aqua;font-size: 18px;font-weight: bold;');
      ZEFIR.html.input.addEventListener('input', e => {
        if (ZEFIR.html.input.value.length) {
          ZEFIR.html.value.style.display = 'none';
        } else {
          ZEFIR.html.value.style.display = 'block';
        }

        if (ZEFIR.html.input.value.length) {
          [].forEach.call(ZEFIR.html.dropdown.children, child => {
            if (!child.innerHTML.toLowerCase().includes(ZEFIR.html.input.value.toLowerCase())) {
              child.style.display = 'none';
            } else if (child.style.display === 'none') {
              child.style.display = 'block';
            }
          });
        } else {
          resetDropdownMenu(true);
        }
      });
      ZEFIR.html.select.addEventListener('click', e => {
        if (e.target.closest('.zefir-select-arrow')) {
          if (ZEFIR.html.select.classList.contains('--focused')) {
            '';
          } else {
            ZEFIR.html.select.classList.add('--focused');
          }

          ZEFIR.html.select.classList.toggle('--opened');

          if (ZEFIR.html.select.classList.contains('--opened')) {
            ZEFIR.html.input.focus();
          } else {
            ZEFIR.html.input.blur();
          }

          return;
        }

        if (e.target.tagName === 'LI') {
          setListOption(e.target);
          resetDropdownMenu();
          console.log(ZEFIR.source.value, ZEFIR.list.find(elem => {
            return elem.value === ZEFIR.source.value;
          }).name);
          return;
        }

        ZEFIR.html.select.classList.add('--focused', '--opened');
        return ZEFIR.html.input.focus();
      });
      return document.addEventListener('click', e => {
        if (!e.target.closest('#zefir-select')) {
          ZEFIR.html.select.classList.remove('--focused', '--opened');
          return resetDropdownMenu();
        }
      });
    };

    console.log('%c🍻🍻🍻 DOMContentLoaded 🍻🍻🍻', 'color: sandyBrown;font-size: 18px;font-weight: bold;');
    (checkDOMChange = function () {
      ZEFIR.source = document.querySelector("#cycle_version:not([aria-hidden='true'])");

      if (ZEFIR.source && ZEFIR.source.getAttribute('aria-hidden' === 'true')) {
        ZEFIR.source = void 0;
      }

      ZEFIR.html.select = document.getElementById('zefir-select');

      if (ZEFIR.source && !ZEFIR.html.select) {
        activateZefir();
      } else if (!ZEFIR.source && ZEFIR.html.select) {
        ZEFIR.html.select.parentNode.removeChild(ZEFIR.html.select);
        console.log('%c⭐⭐⭐ Zefir Select removed ⭐⭐⭐', 'color: gold;font-size: 18px;font-weight: bold;');
      }

      return setTimeout(checkDOMChange, 100);
    })();
  }, {}]
}, {}, [1]);