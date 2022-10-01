describe('#init', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  it('calls all necessary methods', function () {
    // given

    var raty = new Raty(document.querySelector('#el'), { score: 1 });

    spyOn(raty, '_executeCallbacks');
    spyOn(raty, '_adjustNumber');
    spyOn(raty, '_adjustHints');
    spyOn(raty, '_adjustedScore').and.returnValue('<input>');
    spyOn(raty, '_setPath');
    spyOn(raty, '_createStars');
    spyOn(raty, '_createScore');
    spyOn(raty, '_apply');
    spyOn(raty, '_setTitle');
    spyOn(raty, '_target');
    spyOn(raty, '_binds');

    // when
    raty.init();

    // then
    expect(raty._executeCallbacks).toHaveBeenCalled();
    expect(raty._adjustNumber).toHaveBeenCalled();
    expect(raty._adjustHints).toHaveBeenCalled();
    expect(raty._adjustedScore).toHaveBeenCalledWith(1);
    expect(raty._setPath).toHaveBeenCalled();
    expect(raty._createStars).toHaveBeenCalled();
    expect(raty._createScore).toHaveBeenCalled();
    expect(raty._apply).toHaveBeenCalledWith('<input>');
    expect(raty._setTitle).toHaveBeenCalledWith('<input>');
    expect(raty._target).toHaveBeenCalledWith('<input>');
    expect(raty._binds).toHaveBeenCalled();

    expect(raty.element.style.cursor).toEqual('pointer');
  });

  it('returns the raty instance', function () {
    // given
    var raty = new Raty(document.querySelector('#el'), { score: 1 });

    // when
    var result = raty.init();

    // then
    expect(result).toEqual(raty);
  });

  context('when *starType is "img"', function () {
    it('does not calls :_adjustStarName', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), { starType: 'img' });

      spyOn(raty, '_adjustStarName');

      // when
      raty.init();

      // then
      expect(raty._adjustStarName).not.toHaveBeenCalled();
    });
  });

  context('when *starType is not "img"', function () {
    it('calls :_adjustStarName', function () {
      // given

      var options = { starType: 'i' };
      var raty = new Raty(document.querySelector('#el'), options);

      spyOn(raty, '_adjustStarName');

      // when
      raty.init();

      // then
      expect(raty._adjustStarName).toHaveBeenCalled();
    });
  });

  context('when *cancel is true', function () {
    it('does not calls :_createCancel', function () {
      // given

      var options = { cancelButton: true };
      var raty = new Raty(document.querySelector('#el'), options);

      spyOn(raty, '_createCancel');

      // when
      raty.init();

      // then
      expect(raty._createCancel).toHaveBeenCalled();
    });
  });

  context('when *cancel is false', function () {
    it('calls :_createCancel', function () {
      // given

      var options = { cancelButton: false };
      var raty = new Raty(document.querySelector('#el'), options);

      spyOn(raty, '_createCancel');

      // when
      raty.init();

      // then
      expect(raty._createCancel).not.toHaveBeenCalled();
    });
  });

  context('when *precision is true', function () {
    it('does not calls :_adjustPrecision', function () {
      // given

      var options = { precision: true };
      var raty = new Raty(document.querySelector('#el'), options);

      spyOn(raty, '_adjustPrecision');

      // when
      raty.init();

      // then
      expect(raty._adjustPrecision).toHaveBeenCalled();
    });
  });

  context('when *precision is false', function () {
    it('calls :_adjustPrecision', function () {
      // given

      var options = { precision: false };
      var raty = new Raty(document.querySelector('#el'), options);

      spyOn(raty, '_adjustPrecision');

      // when
      raty.init();

      // then
      expect(raty._adjustPrecision).not.toHaveBeenCalled();
    });
  });

  context('when *readOnly is true', function () {
    it('calls :_lock', function () {
      // given

      var raty = new Raty(document.querySelector('#el'), { readOnly: true });

      spyOn(raty, '_lock');

      // when
      raty.init();

      // then
      expect(raty._lock).toHaveBeenCalled();
    });

    it('does not call :_binds', function () {
      // given

      var raty = new Raty(document.querySelector('#el'), { readOnly: true });

      spyOn(raty, '_binds');

      // when
      raty.init();

      // then
      expect(raty._binds).not.toHaveBeenCalled();
    });

    it('does not set cursor style to pointer', function () {
      // given

      var raty = new Raty(document.querySelector('#el'), { readOnly: true });

      // when
      raty.init();

      // then
      expect(raty.element.style.cursor).not.toEqual('pointer');
    });
  });

  context('when *readOnly is false', function () {
    it('does not call :_lock', function () {
      // given

      var raty = new Raty(document.querySelector('#el'), { readOnly: false });

      spyOn(raty, '_lock');

      // when
      raty.init();

      // then
      expect(raty._lock).not.toHaveBeenCalled();
    });

    it('calls :_binds', function () {
      // given

      var raty = new Raty(document.querySelector('#el'), { readOnly: false });

      spyOn(raty, '_binds');

      // when
      raty.init();

      // then
      expect(raty._binds).toHaveBeenCalled();
    });

    it('sets cursor style to pointer', function () {
      // given

      var raty = new Raty(document.querySelector('#el'), { readOnly: false });

      // when
      raty.init();

      // then
      expect(raty.element.style.cursor).toEqual('pointer');
    });
  });
});
