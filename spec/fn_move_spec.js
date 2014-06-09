describe('#move', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el     = Helper.create('#el');
    this.target = Helper.create('#target');
  });

  afterEach(function() {
    Helper.clear();
  });

  describe('with interger score', function() {
    it ('moves to the right point', function() {
      // given
      this.el.raty({
        precision  : true,
        target     : '#target',
        targetType : 'number'
      });

      // when
      this.el.raty('move', 1);

      // then
      expect(this.target.text()).toEqual('1.0');
    });
  });

  describe('with float score', function() {
    it ('moves to the right point', function() {
      // given
      this.el.raty({
        precision  : true,
        target     : '#target',
        targetType : 'number'
      });

      // when
      this.el.raty('move', 1.7);

      // then
      expect(this.target.text()).toEqual('1.7');
    });
  });

  describe('with string score', function() {
    it ('moves to the right point', function() {
      // given
      this.el.raty({
        precision  : true,
        target     : '#target',
        targetType : 'number'
      });

      // when
      this.el.raty('move', '1.7');

      // then
      expect(this.target.text()).toEqual('1.7');
    });
  });

  describe('when score is bigger then the number of stars', function() {
    it ('moves to the and of the last star', function() {
      // given
      this.el.raty({
        precision  : true,
        target     : '#target',
        targetType : 'number'
      });

      // when
      this.el.raty('move', 6.7);

      // then
      expect(this.target.text()).toEqual('5.0');
    });
  });

  describe('with class selection', function() {
    beforeEach(function() {
      this.target1 = Helper.create('#target1');
      this.target2 = Helper.create('#target2');
      this.el1     = Helper.create('.el', { 'data-target': '#target1' });
      this.el2     = Helper.create('.el', { 'data-target': '#target2' });
    });

    // TODO: set taget as callback.
    // TODO: set taget as object.
    xit ('moves to the right point on all of them', function() {
      // given
      this.el.raty({
        precision  : true,
        target     : function() {
          return this.getAttribute('data-target');
        },
        targetType : 'number'
      });

      // when
      this.el.raty('move', 1.7);

      // then
      expect(this.target1.text()).toEqual('1.7');
      expect(this.target2.text()).toEqual('1.7');
    });
  });
});
