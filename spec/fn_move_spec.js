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
    xit ('moves to the right point', function() {
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
    xit ('moves to the right point', function() {
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
    xit ('moves to the right point', function() {
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
    xit ('moves to the and of the last star', function() {
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
      this.el1 = $('<div data-target="#target1" class="el"></div>').appendTo('body');
      this.el2 = $('<div data-target="#target2" class="el"></div>').appendTo('body');
      this.target1  = $('<div id="target1"></div>').appendTo('body');
      this.target2  = $('<div id="target2"></div>').appendTo('body');
    });

    afterEach(function() {
      this.el1.remove();
      this.el2.remove();
      this.target1.remove();
      this.target2.remove();
    });

    // TODO: set taget with callback.
    xit ('moves to the right point on all of them', function() {
      // given
      var els = $('.el').raty({
        precision  : true,
        target     : function() {
          return this.getAttribute('data-target');
        },
        targetType : 'number'
      });

      // when
      $('.el').raty('move', 1.7);

      // then
      expect(this.target.text()).toEqual('1.7');
      expect(this.target2.text()).toEqual('1.7');
    });
  });
});
