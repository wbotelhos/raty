describe('#set', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  xit ('is chainable', function() {
    // given
    var self = this.el.raty();

    // when
    var ref = self.raty('set', {});

    // then
    expect(ref).toBe(self);
  });

  xit ('changes the declared options', function() {
    // given
    var self = this.el.raty();

    // when
    var ref = self.raty('set', { scoreName: 'other' });

    // then
    expect(ref.children('input')).toHaveAttr('name', 'other');
  });

  xit ('keeps the other options', function() {
    // given
    var self = this.el.raty({ number: 6 });

    // when
    var ref = self.raty('set', { scoreName: 'other' });

    // then
    expect(ref.children('img').length).toEqual(6);
  });

  context('with external bind on wrapper', function() {
    xit ('is kept', function() {
      // given
      var self = this.el.on('click', function() {
        $(this).data('trigged', true);
      }).raty();

      self.raty('set', {});

      // when
      self.trigger('click');

      // then
      expect(self.data('trigged')).toBeTruthy();
    });
  });

  context('when :readOnly by function', function() {
    it ('is removes the readonly data info', function() {
      // given
      var self = this.el.raty().raty('readOnly', true);

      // when
      var ref = self.raty('set', { readOnly: false });

      // then
      expect(self).not.toHaveData('readonly');
    });
  });
});
