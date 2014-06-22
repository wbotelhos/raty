describe('#set', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('is chainable', function() {
    // given
    this.el.raty();

    // when
    var ref = this.el.raty('set', {});

    // then
    expect(ref).toBe(this.el);
  });

  it ('changes the declared options', function() {
    // given
    this.el.raty();

    // when
    var ref = this.el.raty('set', { scoreName: 'other' });

    // then
    expect(ref.children('input')).toHaveAttr('name', 'other');
  });

  it ('keeps the other options', function() {
    // given
    this.el.raty({ number: 6 });

    // when
    var ref = this.el.raty('set', { scoreName: 'other' });

    // then
    expect(ref.children('img').length).toEqual(6);
  });

  context('with external bind on wrapper', function() {
    it ('is kept', function() {
      // given
      this.el.on('click', function() {
        $(this).data('trigged', true);
      }).raty();

      this.el.raty('set', {});

      // when
      this.el.trigger('click');

      // then
      expect(this.el.data('trigged')).toBeTruthy();
    });
  });

  context('when :readOnly by function', function() {
    it ('is removes the readonly data info', function() {
      // given
      this.el.raty().raty('readOnly', true);

      // when
      var ref = this.el.raty('set', { readOnly: false });

      // then
      expect(this.el).not.toHaveData('readonly');
    });
  });
});
