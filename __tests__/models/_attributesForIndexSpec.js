describe('#_attributesForIndex', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  context('when :starType is img', function () {
    it('uses alt attribute with given index', () => {
      // given

      var options = { starType: 'img' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes.alt).toEqual(index);
    });

    it('uses src with :path and returned _nameForIndex', () => {
      // given

      var name = 'starOff';
      var options = { path: 'path', starOff: 'starOff', starType: 'img' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      jest.spyOn(raty, '_nameForIndex').mockImplementationOnce(() => name);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes.src).toEqual('pathstarOff');
    });

    it('does not use data-alt', () => {
      // given

      var options = { starType: 'img' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes['data-alt']).toEqual(undefined);
    });

    it('does not use class', () => {
      // given

      var options = { starType: 'img' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes['class']).toEqual(undefined);
    });

    it('sets title with _getHint and given index', () => {
      // given

      var hint = 'double';
      var options = { starType: 'img' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      raty.init();

      jest.spyOn(raty, '_getHint').mockImplementationOnce(() => hint);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes.title).toEqual(hint);
    });
  });

  context('when :starType is not img', function () {
    it('uses data-alt attribute with given index', () => {
      // given

      var options = { starType: 'i' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes['data-alt']).toEqual(index);
    });

    it('uses class with property name returned _nameForIndex', () => {
      // given

      var name = 'starOff';
      var options = { starType: 'i' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      raty.init();

      jest.spyOn(raty, '_nameForIndex').mockImplementationOnce(() => name);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes['class']).toEqual(raty.opt.starOff);
    });

    it('does not use alt', () => {
      // given

      var options = { starType: 'i' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes.alt).toEqual(undefined);
    });

    it('does not use src', () => {
      // given

      var options = { starType: 'i' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes.src).toEqual(undefined);
    });

    it('sets title with _getHint and given index', () => {
      // given

      var hint = 'double';
      var options = { starType: 'i' };
      var index = 1;
      var raty = new Raty(document.querySelector('#el'), options);

      raty.init();

      jest.spyOn(raty, '_getHint').mockImplementationOnce(() => hint);

      // when
      var attributes = raty._attributesForIndex(index);

      // then
      expect(attributes.title).toEqual(hint);
    });
  });
});
