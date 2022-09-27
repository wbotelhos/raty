describe('#targetScore', function () {
  beforeEach(function () {
    $('body').append('<div id="element"></div>');

    this.scoreField = $('<input id="score" type="text" />').appendTo('body');
  });

  afterEach(function () {
    $('#element').remove();
    $('#hint').remove();

    this.scoreField.remove();
  });

  xit('avoids the creation of default score field', function () {
    // given
    var raty = new Raty('#element', { targetScore: '#score' });

    // when
    raty.init();

    // then
    expect(raty.self.querySelector('input')).toEqual(null);
  });

  xit('changes the place where score will be setted', function () {
    // given
    var raty = new Raty('#element', { targetScore: '#score' }).init();
    var star = raty.self.querySelector('img');

    // when
    Helper.trigger(star, 'click');

    // then
    expect(this.scoreField).toHaveValue('1');
  });
});
