require('@testing-library/jest-dom');

global.Raty = require('../src/raty').default;

global.context = function context(description, spec) {
  // eslint-disable-line no-redeclare, no-unused-vars
  describe(description, spec);
};

global.xcontext = function xcontext(description, spec) {
  // eslint-disable-line no-redeclare, no-unused-vars
  xdescribe(description, spec);
};

afterEach(() => {
  document.body.innerHTML = '';
});

function camelize(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    if (key.startsWith('data-')) {
      el.dataset[camelize(key.replace('data-', ''))] = attrs[key];
    } else el.setAttribute(key, attrs[key]);
  }
}

global.Helper = {
  clear: function () {
    if (this.ids) {
      for (var i = 0; i < this.ids.length; i++) {
        document.querySelector(this.ids[i]).remove();
      }
    }
  },

  // Creates an element for the test document to be used on the tests.
  create: function (id, type, options) {
    type = type || 'div';

    var data = this._data(id);
    var attrs = this._attrs(data, options);

    return this._append(type, attrs);
  },

  click: function (el, integer, decimal) {
    this.mouseTrigger('mousemove', el, integer, decimal);
    this.mouseTrigger('click', el, integer, decimal);
  },

  extension: function (elements) {
    var items;

    if (Object.prototype.toString.call(items) === '[object Array]') {
      items = elements;
    } else {
      items = [elements];
    }

    var extensions = [];

    items.forEach((item) => {
      var paths = item.split('/');

      extensions.push(paths[paths.length - 1]);
    });

    return extensions.length === 1 ? extensions[0] : extensions;
  },

  last: function (items) {
    var size = items.length;

    return items[size - 1];
  },

  mouseData: function (el, integer, decimal) {
    var stars = el.querySelectorAll('img:not(.raty-cancel)');
    var star = stars[integer];
    var width = star.offsetWidth || parseFloat(getComputedStyle(star).fontSize);
    var fraction = width / 10;
    var left = start.getBoundingClientRect().left + window.scrollX;
    var pageX = left + fraction * decimal + 0.1;

    // if (console && console.log) {
    //   console.debug(
    //     integer + '.' + decimal,
    //     ':',
    //     'left:',
    //     left,
    //     'width:',
    //     width,
    //     'fraction (width/10):',
    //     fraction,
    //     'pageX:',
    //     pageX,
    //     'fractions (decimal * fraction)',
    //     decimal * fraction
    //   );
    // }

    return { el: star, pageX: pageX };
  },

  mouseTrigger: function (action, el, integer, decimal) {
    var data = this.mouseData(el, integer, decimal);
    const evt = new Event(action, { pageX: data.pageX });

    data.el.trigger(evt);
  },

  mousemove: function (el, integer, decimal) {
    this.mouseTrigger('mousemove', el, integer, decimal);
  },

  target: function (id, type, options) {
    type = type || 'div';

    var data = this._data(id);
    var attrs = this._attrs(data, options);

    const element = this._append(type, attrs);

    if (type === 'select') {
      element.insertAdjacentHTML('beforeend', this._select());
    }

    return element;
  },

  trigger: function (el, eventName) {
    el.dispatchEvent(new Event(eventName));
  },

  // private

  // eslint-disable-line no-redeclare, no-unused-vars
  // Appends the element into the test document body using the mounted attrs.
  _append: function (type, attrs) {
    const element = document.createElement(type);
    setAttributes(element, attrs);

    document.querySelector(`body`).appendChild(element);

    return element;
  },

  // Build ID and class attribute for the created element like `<div id="any"></div>`.
  _attrs: function (data, options) {
    var attrs = options || {};

    if (data.prefix === '#') {
      attrs.id = data.id;
    } else {
      attrs['class'] = data.id;
    }

    return attrs;
  },

  // Collects the identificator of the element and the prefix that indicates an ID or class.
  _data: function (id) {
    var data = { prefix: id.charAt(0), id: id.slice(1) };

    this.ids = this.ids || [];

    this.ids.push(id);

    return data;
  },

  _select: function () {
    return (
      '' +
      '<option value="Cancel this rating!">cancel hint default</option>' +
      '<option value="cancel-hint-custom">cancel hint custom</option>' +
      '<option value="">cancel number default</option>' +
      '<option value="0">cancel number custom</option>' +
      '<option value="bad">bad hint imutable</option>' +
      '<option value="1">bad number imutable</option>' +
      '<option value="targetText">targetText is setted without targetKeep</option>' +
      '<option value="gorgeous">targetFormat</option>'
    );
  },
};
