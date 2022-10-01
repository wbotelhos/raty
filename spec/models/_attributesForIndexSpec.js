describe('#_attributesForIndex', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  context('when :starType is img', function () {
    it('uses alt attribute with given index', function () {
      // given

      var options = { starType: 'img' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes.alt).toEqual(index);
    });

    it('uses src with :path and returned _nameForIndex', function () {
      // given

      var name = 'starOff';
      var options = { path: 'path', starOff: 'starOff', starType: 'img' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      spyOn(raty, '_nameForIndex').and.returnValue(name);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes.src).toEqual('pathstarOff');
    });

    it('does not use data-alt', function () {
      // given

      var options = { starType: 'img' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes['data-alt']).toEqual(undefined);
    });

    it('does not use class', function () {
      // given

      var options = { starType: 'img' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes['class']).toEqual(undefined);
    });

    it('sets title with _getHint and given index', function () {
      // given

      var hint = 'double';
      var options = { starType: 'img' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      raty.init();

      spyOn(raty, '_getHint').and.returnValue(hint);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes.title).toEqual(hint);
    });
  });

  context('when :starType is not img', function () {
    it('uses data-alt attribute with given index', function () {
      // given

      var options = { starType: 'i' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes['data-alt']).toEqual(index);
    });

    it('uses class with property name returned _nameForIndex', function () {
      // given

      var name = 'starOff';
      var options = { starType: 'i' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      raty.init();

      spyOn(raty, '_nameForIndex').and.returnValue(name);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes['class']).toEqual(raty.opt.starOff);
    });

    it('does not use alt', function () {
      // given

      var options = { starType: 'i' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes.alt).toEqual(undefined);
    });

    it('does not use src', function () {
      // given

      var options = { starType: 'i' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes.src).toEqual(undefined);
    });

    it('sets title with _getHint and given index', function () {
      // given

      var hint = 'double';
      var options = { starType: 'i' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      raty.init();

      spyOn(raty, '_getHint').and.returnValue(hint);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes.title).toEqual(hint);
    });
  });
});
