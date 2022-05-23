describe('#_roundStars', function() {
  beforeEach(function() {
    this.el = Helper.create('#el');
  });


  context ('when event is given', function() {
    beforeEach(function() {
      this.evt = document.createEvent('MouseEvents');
      spyOn($.raty.Raty.prototype , '_starName');
    });

    context('when score is positive integer', function() {
      it ('requests calls _starName', function() {
        // given
        var number = 2;
        var element  = this.el[0];
        var options  = {};
        var instance = new $.raty.Raty(element, options);

        // when
        instance._roundStars(number, this.evt);
  
        // then
        expect($.raty.Raty.prototype._starName).toHaveBeenCalledWith(this.number, this.evt);
      });
    });
  });
});
