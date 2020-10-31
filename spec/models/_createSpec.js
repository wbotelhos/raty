describe('#_create', function() {
  beforeEach(function() {
    this.el = Helper.create('#el');
  });

  it ('calls all necessary methods', function() {
    // given
    var element  = this.el[0];
    var instance = new $.raty.Raty(element, { score: 1 });

    spyOn($.raty.Raty.prototype , '_executeCallbacks');
    spyOn($.raty.Raty.prototype , '_adjustNumber');
    spyOn($.raty.Raty.prototype , '_adjustHints');
    spyOn($.raty.Raty.prototype , '_adjustedScore').and.returnValue('<input>');
    spyOn($.raty.Raty.prototype , '_setPath');
    spyOn($.raty.Raty.prototype , '_createStars');
    spyOn($.raty.Raty.prototype , '_createScore');
    spyOn($.raty.Raty.prototype , '_apply');
    spyOn($.raty.Raty.prototype , '_setTitle');
    spyOn($.raty.Raty.prototype , '_target');
    spyOn($.raty.Raty.prototype , '_binds');

    // when
    instance._create();

    // then
    expect($.raty.Raty.prototype._executeCallbacks).toHaveBeenCalled();
    expect($.raty.Raty.prototype._adjustNumber).toHaveBeenCalled();
    expect($.raty.Raty.prototype._adjustHints).toHaveBeenCalled();
    expect($.raty.Raty.prototype._adjustedScore).toHaveBeenCalledWith(1);
    expect($.raty.Raty.prototype._setPath).toHaveBeenCalled();
    expect($.raty.Raty.prototype._createStars).toHaveBeenCalled();
    expect($.raty.Raty.prototype._createScore).toHaveBeenCalled();
    expect($.raty.Raty.prototype._apply).toHaveBeenCalledWith('<input>');
    expect($.raty.Raty.prototype._setTitle).toHaveBeenCalledWith('<input>');
    expect($.raty.Raty.prototype._target).toHaveBeenCalledWith('<input>');
    expect($.raty.Raty.prototype._binds).toHaveBeenCalled();

    expect(element.style.cursor).toEqual('pointer');
    expect(this.el.data('raty')).toEqual(instance);
  });

  context('when *starType is "img"', function() {
    it ('does not calls :_adjustStarName', function() {
      // given
      var element  = this.el[0];
      var options  = { starType: 'img' };
      var instance = new $.raty.Raty(element, options);

      spyOn($.raty.Raty.prototype , '_adjustStarName');

      // when
      instance._create();

      // then
      expect($.raty.Raty.prototype._adjustStarName).not.toHaveBeenCalled();
    });
  });

  context('when *starType is not "img"', function() {
    it ('calls :_adjustStarName', function() {
      // given
      var element  = this.el[0];
      var options  = { starType: 'i' };
      var instance = new $.raty.Raty(element, options);

      spyOn($.raty.Raty.prototype , '_adjustStarName');

      // when
      instance._create();

      // then
      expect($.raty.Raty.prototype._adjustStarName).toHaveBeenCalled();
    });
  });

  context('when *cancel is true', function() {
    it ('does not calls :_createCancel', function() {
      // given
      var element  = this.el[0];
      var options  = { cancelButton: true };
      var instance = new $.raty.Raty(element, options);

      spyOn($.raty.Raty.prototype , '_createCancel');

      // when
      instance._create();

      // then
      expect($.raty.Raty.prototype._createCancel).toHaveBeenCalled();
    });
  });

  context('when *cancel is false', function() {
    it ('calls :_createCancel', function() {
      // given
      var element  = this.el[0];
      var options  = { cancelButton: false };
      var instance = new $.raty.Raty(element, options);

      spyOn($.raty.Raty.prototype , '_createCancel');

      // when
      instance._create();

      // then
      expect($.raty.Raty.prototype._createCancel).not.toHaveBeenCalled();
    });
  });

  context('when *precision is true', function() {
    it ('does not calls :_adjustPrecision', function() {
      // given
      var element  = this.el[0];
      var options  = { precision: true };
      var instance = new $.raty.Raty(element, options);

      spyOn($.raty.Raty.prototype , '_adjustPrecision');

      // when
      instance._create();

      // then
      expect($.raty.Raty.prototype._adjustPrecision).toHaveBeenCalled();
    });
  });

  context('when *precision is false', function() {
    it ('calls :_adjustPrecision', function() {
      // given
      var element  = this.el[0];
      var options  = { precision: false };
      var instance = new $.raty.Raty(element, options);

      spyOn($.raty.Raty.prototype , '_adjustPrecision');

      // when
      instance._create();

      // then
      expect($.raty.Raty.prototype._adjustPrecision).not.toHaveBeenCalled();
    });
  });

  context('when *readOnly is true', function() {
    it ('calls :_lock', function() {
      // given
      var element  = this.el[0];
      var instance = new $.raty.Raty(element, { readOnly: true });

      spyOn($.raty.Raty.prototype , '_lock');

      // when
      instance._create();

      // then
      expect($.raty.Raty.prototype._lock).toHaveBeenCalled();
    });

    it ('does not call :_binds', function() {
      // given
      var element  = this.el[0];
      var instance = new $.raty.Raty(element, { readOnly: true });

      spyOn($.raty.Raty.prototype , '_binds');

      // when
      instance._create();

      // then
      expect($.raty.Raty.prototype._binds).not.toHaveBeenCalled();
    });

    it ('does not set cursor style to pointer', function() {
      // given
      var element  = this.el[0];
      var instance = new $.raty.Raty(element, { readOnly: true });

      // when
      instance._create();

      // then
      expect(element.style.cursor).not.toEqual('pointer');
    });
  });

  context('when *readOnly is false', function() {
    it ('does not call :_lock', function() {
      // given
      var element  = this.el[0];
      var instance = new $.raty.Raty(element, { readOnly: false });

      spyOn($.raty.Raty.prototype , '_lock');

      // when
      instance._create();

      // then
      expect($.raty.Raty.prototype._lock).not.toHaveBeenCalled();
    });

    it ('calls :_binds', function() {
      // given
      var element  = this.el[0];
      var instance = new $.raty.Raty(element, { readOnly: false });

      spyOn($.raty.Raty.prototype , '_binds');

      // when
      instance._create();

      // then
      expect($.raty.Raty.prototype._binds).toHaveBeenCalled();
    });

    it ('sets cursor style to pointer', function() {
      // given
      var element  = this.el[0];
      var instance = new $.raty.Raty(element, { readOnly: false });

      // when
      instance._create();

      // then
      expect(element.style.cursor).toEqual('pointer');
    });
  });
});
