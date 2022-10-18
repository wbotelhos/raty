describe('options', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  it('has the right default values', () => {
    // given
    var raty = new Raty(document.querySelector('#el'));

    // when
    var opt = raty.opt;

    // then
    expect(opt.cancelButton).toEqual(false);
    expect(opt.cancelClass).toEqual('raty-cancel');
    expect(opt.cancelHint).toEqual('Cancel this rating!');
    expect(opt.cancelOff).toEqual('cancel-off.png');
    expect(opt.cancelOn).toEqual('cancel-on.png');
    expect(opt.cancelPlace).toEqual('left');
    expect(opt.click).toEqual(undefined);
    expect(opt.half).toEqual(false);
    expect(opt.halfShow).toEqual(true);
    expect(opt.hints).toEqual(['bad', 'poor', 'regular', 'good', 'gorgeous']);
    expect(opt.iconRange).toEqual(undefined);
    expect(opt.mouseover).toEqual(undefined);
    expect(opt.noRatedMsg).toEqual('Not rated yet!');
    expect(opt.number).toBe(5);
    expect(opt.path).toEqual(undefined);
    expect(opt.precision).toEqual(false);
    expect(opt.readOnly).toEqual(false);
    expect(opt.round.down).toEqual(0.25);
    expect(opt.round.full).toEqual(0.6);
    expect(opt.round.up).toEqual(0.76);
    expect(opt.score).toEqual(undefined);
    expect(opt.scoreName).toEqual('score');
    expect(opt.single).toEqual(false);
    expect(opt.space).toEqual(true);
    expect(opt.starHalf).toEqual('star-half.png');
    expect(opt.starOff).toEqual('star-off.png');
    expect(opt.starOn).toEqual('star-on.png');
    expect(opt.target).toEqual(undefined);
    expect(opt.targetFormat).toEqual('{score}');
    expect(opt.targetKeep).toEqual(false);
    expect(opt.targetText).toEqual('');
    expect(opt.targetType).toEqual('hint');
    expect(opt.width).toEqual(undefined);
  });
});
