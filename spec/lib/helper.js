isClear = true;

Helper = {
  _append: function(type, attrs) {
    return $('<' + type + '/>', attrs).appendTo('body');
  },

  _attrs: function(data, options) {
    var attrs = options || {};

    if (data.prefix === '#') {
      attrs.id = data.id;
    } else {
      attrs['class'] = data.id;
    }

    return attrs;
  },

  _select: function() {
    return '' +
      '<option value="Cancel this rating!">cancel hint default</option>' +
      '<option value="cancel-hint-custom">cancel hint custom</option>' +

      '<option value="">cancel number default</option>' +
      '<option value="0">cancel number custom</option>' +

      '<option value="bad">bad hint imutable</option>' +
      '<option value="1">bad number imutable</option>' +

      '<option value="targetText">targetText is setted without targetKeep</option>' +

      '<option value="gorgeous">targetFormat</option>';
  },

  _save: function(id) {
    var data = { prefix: id.charAt(0), id: id.slice(1) };

    this.ids = this.ids || [];

    this.ids.push(id);

    return data;
  },

  clear: function() {
    for (var i = 0; i < this.ids.length; i++) {
      $(this.ids[i]).remove();
    }
  },

  create: function(id, type, options) {
    type = type || 'div';

    var data  = this._save(id),
        attrs = this._attrs(data, options);

    return this._append(type, attrs);
  },

  click: function(el, integer, decimal) {
    this.mouseTrigger('mousemove', el, integer, decimal);
    this.mouseTrigger('click', el, integer, decimal);
  },

  mouseData: function(el, integer, decimal) {
    var
      stars    = el.children('img:not(.raty-cancel)'),
      star     = stars.eq(integer),
      width    = star[0].width || parseFloat(star.css('font-size'));
      fraction = width / 10,
      left     = star.offset().left,
      pageX    = left + fraction * decimal + 0.1;

    if (console && console.log) {
      console.debug(integer + '.' + decimal, ':', 'left:', left, 'width:', width, 'fraction (width/10):', fraction, 'pageX:', pageX, 'fractions (decimal * fraction)', decimal * fraction);
    }

    return { el: star, pageX: pageX }
  },

  mouseTrigger: function(action, el, integer, decimal) {
    var
      data  = this.mouseData(el, integer, decimal),
      evt   = $.Event(action, { pageX: data.pageX });

    data.el.trigger(evt);
  },

  mousemove: function(el, integer, decimal) {
    this.mouseTrigger('mousemove', el, integer, decimal);
  },

  target: function(id, type, options) {
    type = type || 'div';

    var data  = this._save(id),
        attrs = this._attrs(data, options);

    if (type === 'select') {
      attrs.html = this._select();
    }

    return this._append(type, attrs);
  }
};

function context(description, spec) {
  describe(description, spec);
}

function build() {
  $('body').append('<div id="element"></div>');
}

function buildDivTarget() {
  $('body').append('<div id="hint"></div>');
}

function buildComboboxTarget() {
  $('body').append(
    '<select id="hint">' +
      '<option value="Cancel this rating!">cancel hint default</option>' +
      '<option value="cancel-hint-custom">cancel hint custom</option>' +

      '<option value="">cancel number default</option>' +
      '<option value="0">cancel number custom</option>' +

      '<option value="bad">bad hint imutable</option>' +
      '<option value="1">bad number imutable</option>' +

      '<option value="targetText">targetText is setted without targetKeep</option>' +

      '<option value="score: bad">targetFormat</option>' +
    '</select>'
  );
}

function buildTextareaTarget() {
  $('body').append('<textarea id="hint"></textarea>');
}

function buildTextTarget() {
  $('body').append('<input id="hint" type="text" />');
}

function clear() {
  if (isClear) {
    $('#element').remove();
    $('#hint').remove();
  }
}
