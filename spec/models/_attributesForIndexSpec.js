describe('#_attributesForIndex', function() {
  beforeEach(function() {
    this.el = Helper.create('#el');
  });

  context('when :starType is img', function() {
    it ('uses alt attribute with given index', function() {
      // given
      var element  = this.el[0];
      var options  = { starType: 'img' };
      var index    = 1;
      var instance = new $.raty.Raty(element, options);

      // when
      var attributes = instance._attributesForIndex(index);

      // then
      expect(attributes.alt).toEqual(index);
    });

    it ('uses src with :path and returned _nameForIndex', function() {
      // given
      var element  = this.el[0];
      var name     = 'starOff';
      var options  = { path: 'path', starOff: 'starOff', starType: 'img' };
      var index    = 1;
      var instance = new $.raty.Raty(element, options);

      spyOn($.raty.Raty.prototype, '_nameForIndex').and.returnValue(name);

      // when
      var attributes = instance._attributesForIndex(index);

      // then
      expect(attributes.src).toEqual('pathstarOff');
    });

    it ('does not use data-alt', function() {
      // given
      var element  = this.el[0];
      var options  = { starType: 'img' };
      var index    = 1;
      var instance = new $.raty.Raty(element, options);

      // when
      var attributes = instance._attributesForIndex(index);

      // then
      expect(attributes['data-alt']).toBeUndefined();
    });

    it ('does not use class', function() {
      // given
      var element  = this.el[0];
      var options  = { starType: 'img' };
      var index    = 1;
      var instance = new $.raty.Raty(element, options);

      // when
      var attributes = instance._attributesForIndex(index);

      // then
      expect(attributes['class']).toBeUndefined();
    });

    it ('sets title with _getHint and given index', function() {
      // given
      var element  = this.el[0];
      var hint     = 'double';
      var options  = { starType: 'img' };
      var index    = 1;
      var instance = new $.raty.Raty(element, options);

      spyOn($.raty.Raty.prototype, '_getHint').and.returnValue(hint);

      // when
      var attributes = instance._attributesForIndex(index);

      // then
      expect(attributes.title).toEqual(hint);
    });
  });

  context('when :starType is not img', function() {
    it ('uses data-alt attribute with given index', function() {
      // given
      var element  = this.el[0];
      var options  = { starType: 'i' };
      var index    = 1;
      var instance = new $.raty.Raty(element, options);

      // when
      var attributes = instance._attributesForIndex(index);

      // then
      expect(attributes['data-alt']).toEqual(index);
    });

    it ('uses class with property name returned _nameForIndex', function() {
      // given
      var element  = this.el[0];
      var name     = 'starOff';
      var options  = { starType: 'i' };
      var index    = 1;
      var instance = new $.raty.Raty(element, options);

      spyOn($.raty.Raty.prototype, '_nameForIndex').and.returnValue(name);

      // when
      var attributes = instance._attributesForIndex(index);

      // then
      expect(attributes['class']).toEqual(instance.opt.starOff);
    });

    it ('does not use alt', function() {
      // given
      var element  = this.el[0];
      var options  = { starType: 'i' };
      var index    = 1;
      var instance = new $.raty.Raty(element, options);

      // when
      var attributes = instance._attributesForIndex(index);

      // then
      expect(attributes.alt).toBeUndefined();
    });

    it ('does not use src', function() {
      // given
      var element  = this.el[0];
      var options  = { starType: 'i' };
      var index    = 1;
      var instance = new $.raty.Raty(element, options);

      // when
      var attributes = instance._attributesForIndex(index);

      // then
      expect(attributes.src).toBeUndefined();
    });

    it ('sets title with _getHint and given index', function() {
      // given
      var element  = this.el[0];
      var hint     = 'double';
      var options  = { starType: 'i' };
      var index    = 1;
      var instance = new $.raty.Raty(element, options);

      spyOn($.raty.Raty.prototype, '_getHint').and.returnValue(hint);

      // when
      var attributes = instance._attributesForIndex(index);

      // then
      expect(attributes.title).toEqual(hint);
    });
  });
});
