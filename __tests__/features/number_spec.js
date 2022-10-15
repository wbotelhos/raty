describe('#number', () => {
  it('accepts callback return and has the correct arguments', () => {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el'), {
      number: function (element) {
        this._this = this;
        this._element = element;

        return 10;
      },
    });

    // when
    raty.init();

    // then
    expect(raty.element.querySelectorAll('img').length).toEqual(10);
    expect(raty._this).toBe(raty);
    expect(raty._element).toEqual(document.querySelector('#el'));
  });

  it('changes the number of stars', () => {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el'), { number: 1 });

    // when
    raty.init();

    // then
    expect(raty.element.querySelectorAll('img').length).toEqual(1);
  });

  it('accepts number as string', () => {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el'), { number: '1' });

    // when
    raty.init();

    // then
    expect(raty.element.querySelectorAll('img').length).toEqual(1);
  });

  it('accepts callback', () => {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el'), {
      number: function () {
        return 1;
      },
    });

    // when
    raty.init();

    // then
    expect(raty.opt.number).toEqual(1);
  });

  it('accepts data attribute', () => {
    // given
    Helper._append('div', { 'data-number': 3 });

    var raty = new Raty(document.querySelector('[data-number]'));

    // when
    raty.init();

    // then
    expect(raty.opt.number).toEqual(3);
  });
});
