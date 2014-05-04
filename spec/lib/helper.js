isClear = true;

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
