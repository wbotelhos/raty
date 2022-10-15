describe('#_isReadOnly', () => {
  it('returns true when read only value is true', () => {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el')).init();

    // when
    raty.element.dataset.readOnly = true;

    // then
    expect(raty._isReadOnly()).toEqual(true);
  });

  it('returns "true" when read only value is true', () => {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el')).init();

    // when
    raty.element.dataset.readOnly = 'true';

    // then
    expect(raty._isReadOnly()).toEqual(true);
  });

  it('returns false when read only value is false', () => {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el')).init();

    // when
    raty.element.dataset.readOnly = false;

    // then
    expect(raty._isReadOnly()).toEqual(false);
  });

  it('returns false when read only value is undefined', () => {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el')).init();

    // when
    raty.element.dataset.readOnly = undefined;

    // then
    expect(raty._isReadOnly()).toEqual(false);
  });

  it('returns false when read only value is null', () => {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el')).init();

    // when
    raty.element.dataset.readOnly = null;

    // then
    expect(raty._isReadOnly()).toEqual(false);
  });

  it('returns false when read only value is empty', () => {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el')).init();

    // when
    raty.element.dataset.readOnly = '';

    // then
    expect(raty._isReadOnly()).toEqual(false);
  });
});
