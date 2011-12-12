describe('Using ID', function() {

	beforeEach(function() {
		$('body').append('<div id="star"></div>');
	});

	afterEach(function() {
		$('#star').remove();
	});

	it ('should chainable', function() {
		// given
		var $star		= $('#star'),
			className	= 'my-class';

		// when
		$star.raty().addClass(className);

		// then
	    expect($star).toHaveClass(className);
	});

	it ('should change the path', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ path: '../img' });

		var $imgs = $star.children('img');

		// then
	    expect($imgs.eq(0)).toHaveAttr('src', '../img/star-off.png');
	    expect($imgs.eq(1)).toHaveAttr('src', '../img/star-off.png');
	    expect($imgs.eq(2)).toHaveAttr('src', '../img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', '../img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', '../img/star-off.png');
	});

	it ('should create the default stars', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty();

		var $imgs = $star.children('img');

		// then
	    expect($imgs.eq(0)).toHaveAttr('title', 'bad');
	    expect($imgs.eq(1)).toHaveAttr('title', 'poor');
	    expect($imgs.eq(2)).toHaveAttr('title', 'regular');
	    expect($imgs.eq(3)).toHaveAttr('title', 'good');
	    expect($imgs.eq(4)).toHaveAttr('title', 'gorgeous');

	    expect($imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');

	    expect($star.children('input').val()).toEqual('');
	});

	it ('should create 7 stars', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ number: 7 });

		var $imgs = $star.children('img');

		// then
	    expect($imgs.eq(0)).toHaveAttr('title', 'bad');
	    expect($imgs.eq(1)).toHaveAttr('title', 'poor');
	    expect($imgs.eq(2)).toHaveAttr('title', 'regular');
	    expect($imgs.eq(3)).toHaveAttr('title', 'good');
	    expect($imgs.eq(4)).toHaveAttr('title', 'gorgeous');
	    expect($imgs.eq(5)).toHaveAttr('title', '6');
	    expect($imgs.eq(6)).toHaveAttr('title', '7');

	    expect($imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(5)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(6)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should create the score field', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty();

		var $score = $star.children('input');

		// then
	    expect($score).toHaveAttr('type', 'hidden');
	    expect($score).toHaveAttr('name', 'score');
	    expect($score).toHaveValue(0);
	});

	it ('should create a custom score name field', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ scoreName: 'entity.score' });

		var $score = $star.children('input');

		// then
		expect($score).toHaveAttr('type', 'hidden');
		expect($score).toHaveAttr('name', 'entity.score');
		expect($score).toHaveValue(0);
	});

	it ('should start readOnly with not rated yet message', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ readOnly: true });

		var $imgs = $star.children('img');

		// then
	    expect($imgs.eq(0)).toHaveAttr('title', 'not rated yet');
	    expect($imgs.eq(1)).toHaveAttr('title', 'not rated yet');
	    expect($imgs.eq(2)).toHaveAttr('title', 'not rated yet');
	    expect($imgs.eq(3)).toHaveAttr('title', 'not rated yet');
	    expect($imgs.eq(4)).toHaveAttr('title', 'not rated yet');
	});

	it ('should be started with 3 stars', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ start: 3 });

		var $imgs = $star.children('img');

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should be started with 3 stars and readOnly', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ readOnly: true, start: 3});

		var $imgs = $star.children('img');

		// then
		expect($imgs.eq(0)).toHaveAttr('title', 'regular');
	    expect($imgs.eq(1)).toHaveAttr('title', 'regular');
	    expect($imgs.eq(2)).toHaveAttr('title', 'regular');
	    expect($imgs.eq(3)).toHaveAttr('title', 'regular');
	    expect($imgs.eq(4)).toHaveAttr('title', 'regular');

		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should be hovered 2 stars', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty();

		var $imgs = $star.children('img');

		$imgs.eq(1).mouseover();

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should be clicked 2 stars', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty();

		var $imgs = $star.children('img');

		$imgs.eq(1).mouseover().click().mouseleave();

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');

		expect($star.children('input')).toHaveValue(2);
	});

	it ('should not be hovered with readOnly', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ readOnly: true });

		var $imgs = $star.children('img');

		$imgs.eq(1).mouseover();

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should not be clicked with readOnly', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ readOnly: true });

		var $imgs = $star.children('img');

		$imgs.eq(1).mouseover().click().mouseleave();

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');

		expect($star.children('input').val()).toEqual('');
	});

	it ('should execute click callback', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({
			click: function(score, evt) {
				$(this).attr('title', score);
			}
		});

		$star.children('img').eq(3).mouseover().click().mouseleave();

		// then
		expect($star).toHaveAttr('title', 4);
	});

	it ('should have this as self element', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({
			click: function(score, evt) {
				$(this).attr('title', score);
			}
		});

		$star.children('img').eq(3).mouseover().click().mouseleave();

		// then
		expect($star).toHaveAttr('title', 4);
	});

	it ('should create default cancel button', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ cancel: true });

		var $cancel = $star.children('img:first');
		
		// then
		expect($cancel).toHaveClass('raty-cancel');
		expect($cancel).toHaveAttr('title', 'cancel this rating!');
		expect($cancel).toHaveAttr('alt', 'x');
		expect($cancel).toHaveAttr('src', 'img/cancel-off.png');
	});

	it ('should change cancel off button', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ cancel: true, cancelOff: 'new-cancel-off.png' });

		var $cancel = $star.children('img:first');

		// then
		expect($cancel).toHaveClass('raty-cancel');
		expect($cancel).toHaveAttr('title', 'cancel this rating!');
		expect($cancel).toHaveAttr('alt', 'x');
		expect($cancel).toHaveAttr('src', 'img/new-cancel-off.png');
	});

	it ('should change cancel on button', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ cancel: true, cancelOn: 'new-cancel-on.png' });

		var $cancel = $star.children('img:first').mouseenter();

		// then
		expect($cancel).toHaveClass('raty-cancel');
		expect($cancel).toHaveAttr('title', 'cancel this rating!');
		expect($cancel).toHaveAttr('alt', 'x');
		expect($cancel).toHaveAttr('src', 'img/new-cancel-on.png');
	});

	it ('should change cancel hint', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ cancel: true, cancelHint: 'my-hint' });

		var $cancel = $star.children('img:first').mouseenter();

		// then
		expect($cancel).toHaveAttr('title', 'my-hint');
	});

	it ('should turn off the stars on mouseover on cancel button', function() {
		// given
		var $star	= $('#star').raty({ start: 3, cancel: true }),
			$imgs	= $star.children('img');
		
		// when
		$star.children('img:first').mouseenter();

		// then
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(5)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should display noRatedMsg when readOnly', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ readOnly: true });

		// then
		var $imgs = $star.children('img');

		expect($imgs.eq(0)).toHaveAttr('title', 'not rated yet');
		expect($imgs.eq(1)).toHaveAttr('title', 'not rated yet');
		expect($imgs.eq(2)).toHaveAttr('title', 'not rated yet');
		expect($imgs.eq(3)).toHaveAttr('title', 'not rated yet');
		expect($imgs.eq(4)).toHaveAttr('title', 'not rated yet');
	});

	it ('should cancel the rating', function() {
		// given
		var $star	= $('#star').raty({ start: 5, cancel: true }),
			$imgs	= $star.children('img');

		// when
		$star.children('img:first').mouseover().click().mouseleave();

		// then
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(5)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should create right cancel button', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ cancel: true, cancelPlace: 'right' });

		var $cancel = $star.children('img:last');

		// then
		expect($cancel).toHaveClass('raty-cancel');
		expect($cancel).toHaveAttr('title', 'cancel this rating!');
		expect($cancel).toHaveAttr('alt', 'x');
		expect($cancel).toHaveAttr('src', 'img/cancel-off.png');
	});

	it ('should set hint for cancel button', function() {
		// given
		var $star	= $('#star'),
			hint	= 'remove my rating!';

		// when
		$star.raty({ cancel: true, cancelHint: hint });

		var $cancel = $star.children('img:first');

		// then
		expect($cancel).toHaveClass('raty-cancel');
		expect($cancel).toHaveAttr('title', hint);
		expect($cancel).toHaveAttr('alt', 'x');
		expect($cancel).toHaveAttr('src', 'img/cancel-off.png');
	});

	it ('should execute cancel click callback', function() {
		// given
		var $star = $('#star').raty({ cancel: true, click: function(score, evt) { $(this).attr('title', (score === null)); } });

		// when
		$star.children('img:first').mouseover().click().mouseleave();

		// then
		expect($star).toHaveAttr('title', 'true');
		expect($star.children('input').val()).toEqual('');
	});

	it ('should round down on max limit down with no half and halfShow', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ half: false, halfShow: false, start: 1.5 });

		var $imgs = $star.children('img');

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should round up on min limit up with no half and halfShow', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ half: false, halfShow: false, start: 1.6 });

		var $imgs = $star.children('img');

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should round down on max limit down with half and halfShow', function() {
		// given
		var $star = $('#star');
		
		// when
		$star.raty({ half: true, halfShow: true, start: 1.25 });
		
		var $imgs = $star.children('img');
		
		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should show half on min limit half with half and halfShow', function() {
		// given
		var $star = $('#star');
		
		// when
		$star.raty({ half: true, halfShow: true, start: 1.26 });
		
		var $imgs = $star.children('img');
		
		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-half.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should show half on max limit half with half and halfShow', function() {
		// given
		var $star = $('#star');
		
		// when
		$star.raty({ half: true, halfShow: true, start: 1.75 });
		
		var $imgs = $star.children('img');
		
		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-half.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should show round up on min limit up with half and halfShow', function() {
		// given
		var $star = $('#star');
		
		// when
		$star.raty({ half: true, halfShow: true, start: 1.76 });
		
		var $imgs = $star.children('img');
		
		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should round down on max limit down with half and no halfShow', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ half: true, halfShow: false, start: 1.25 });

		var $imgs = $star.children('img');

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should round down on min limit half with half and no halfShow', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ half: true, halfShow: false, start: 1.26 });

		var $imgs = $star.children('img');

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should round up on max limit half with half and no halfShow', function() {
		// given
		var $star = $('#star');
		
		// when
		$star.raty({ half: true, halfShow: false, start: 1.75 });
		
		var $imgs = $star.children('img');
		
		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should round up on min limit up with half and no halfShow', function() {
		// given
		var $star = $('#star');
		
		// when
		$star.raty({ half: true, halfShow: false, start: 1.76 });
		
		var $imgs = $star.children('img');
		
		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should round down on max limit down with no half and halfShow', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ half: false, halfShow: true, start: 1.25 });

		var $imgs = $star.children('img');

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should show half on min limit half with no half and halfShow', function() {
		// given
		var $star = $('#star');
		
		// when
		$star.raty({ half: false, halfShow: true, start: 1.26 });
		
		var $imgs = $star.children('img');
		
		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-half.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should show half on max limit half with no half and halfShow', function() {
		// given
		var $star = $('#star');
		
		// when
		$star.raty({ half: false, halfShow: true, start: 1.75 });
		
		var $imgs = $star.children('img');
		
		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-half.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should show round up on min limit up with no half and halfShow', function() {
		// given
		var $star = $('#star');
		
		// when
		$star.raty({ half: false, halfShow: true, start: 1.76 });
		
		var $imgs = $star.children('img');
		
		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should set custom hints', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ hintList: ['a', '', null, 'd', '5'] });

		var $imgs = $star.children('img');

		// then
	    expect($imgs.eq(0)).toHaveAttr('title', 'a');
	    expect($imgs.eq(1)).toHaveAttr('title', '');
	    expect($imgs.eq(2)).toHaveAttr('title', 3);
	    expect($imgs.eq(3)).toHaveAttr('title', 'd');
	    expect($imgs.eq(4)).toHaveAttr('title', '5');
	});

	it ('should change the star off', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ starOff: 'medal-off.png' });

		var $imgs = $star.children('img');

		// then
	    expect($imgs.eq(0)).toHaveAttr('src', 'img/medal-off.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/medal-off.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/medal-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/medal-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/medal-off.png');
	});

	it ('should change the star on', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ starOn: 'medal-on.png' });

		var $imgs = $star.children('img');

		$imgs.eq(3).mouseover();

		// then
	    expect($imgs.eq(0)).toHaveAttr('src', 'img/medal-on.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/medal-on.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/medal-on.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/medal-on.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should use range icons', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({
			iconRange: [
	            { range: 2, on: 'face-a.png', off: 'face-a-off.png' },
	            { range: 3, on: 'face-b.png', off: 'face-b-off.png' },
	            { range: 4, on: 'face-c.png', off: 'face-c-off.png' },
	            { range: 5, on: 'face-d.png', off: 'face-d-off.png' }
			]
		});

		var $imgs = $star.children('img');

		// then
	    expect($imgs.eq(0)).toHaveAttr('src', 'img/face-a-off.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/face-a-off.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/face-b-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/face-c-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/face-d-off.png');
	});

	it ('should use range icons and apply not found icons default', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({
			iconRange: [
	            { range: 2, off: 'face-a-off.png' },
	            { range: 3, off: 'face-b-off.png' },
	            { range: 4, on: 'face-c.png', off: 'face-c-off.png' },
	            { range: 5 }
			]
		});

		var $imgs = $star.children('img');

		$imgs.eq(3).mouseover();

		// then
	    expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/face-c.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should hover range icons', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({
			iconRange: [
				{ range: 2, on: 'face-a.png', off: 'face-a-off.png' },
				{ range: 3, on: 'face-b.png', off: 'face-b-off.png' },
				{ range: 4, on: 'face-c.png', off: 'face-c-off.png' },
				{ range: 5, on: 'face-d.png', off: 'face-d-off.png' }
			],
            starOff: 'face-off.png'
		});

		var $imgs = $star.children('img');

		$imgs.eq(4).mouseover();

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/face-a.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/face-a.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/face-b.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/face-c.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/face-d.png');
	});

	it ('should set off range icons on mouseleave', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({
			iconRange: [
				{ range: 2, on: 'face-a.png', off: 'face-a-off.png' },
				{ range: 3, on: 'face-b.png', off: 'face-b-off.png' },
				{ range: 4, on: 'face-c.png', off: 'face-c-off.png' },
				{ range: 5, on: 'face-d.png', off: 'face-d-off.png' },
			],
            starOff: 'face-off.png'
		});

		var $imgs = $star.children('img');

		$imgs.eq(4).mouseover();
		$star.mouseleave();

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/face-a-off.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/face-a-off.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/face-b-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/face-c-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/face-d-off.png');
	});

	it ('should keep the start value range icons on mouseleave', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({
			iconRange: [
				{ range: 2, on: 'face-a.png', off: 'face-a-off.png' },
				{ range: 3, on: 'face-b.png', off: 'face-b-off.png' },
				{ range: 4, on: 'face-c.png', off: 'face-c-off.png' },
				{ range: 5, on: 'face-d.png', off: 'face-d-off.png' }
			],
            starOff: 'face-off.png',
            start: 1
		});

		var $imgs = $star.children('img');

		$imgs.eq(4).mouseover();
		$star.mouseleave();

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/face-a.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/face-a-off.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/face-b-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/face-c-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/face-d-off.png');
	});

	it ('should calculate the right icon size', function() {
		// given
		var $star	= $('#star'),
			size	= 24,
			number	= 5;

		// when
		$star.raty({ size: size });

		// then
		expect($star.width()).toEqual(number * size + number * 4);
	});

	it ('should set custom width', function() {
		// given
		var $star	= $('#star'),
			size	= 24;

		// when
		$star.raty({ size: size, width: 200 });

		// then
		expect($star.width()).toEqual(200);
	});

	it ('should set custom width when readOnly', function() {
		// given
		var $star	= $('#star'),
			size	= 24;

		// when
		$star.raty({ readOnly: true, size: size, width: 200 });

		// then
		expect($star.width()).toEqual(200);
	});

	it ('should calculate the right icon size with cancel button', function() {
		// given
		var $star	= $('#star'),
			size	= 24,
			number	= 5;

		// when
		$star.raty({ cancel: true, size: size });

		// then
		expect($star.width()).toEqual(number * size + number * 4 + (size + 4));
	});

	it ('should set a target on div with mouseover', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint = $('#hint'),
			$star = $('#star').raty({ target: '#hint' });

		// when
		$star.children('img').eq(3).mouseover();

		// then
		expect($hint).toHaveHtml('good');

		$hint.remove();
	});

	it ('should set a target on div with mouseover but take off when mouseleave', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint = $('#hint'),
			$star = $('#star').raty({ target: '#hint' });

		// when
		$star.children('img').eq(3).mouseover().mouseleave();

		// then
		expect($hint).toBeEmpty();

		$hint.remove();
	});

	it ('should change the cancel hint using target', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint = $('#hint'),
			$star = $('#star').raty({
			cancel:     true,
			cancelHint: 'none',
			target:     '#hint',
		});

		// when
		$star.children('img:first').mouseenter();

		// then
		expect($hint).toHaveHtml('none');

		$hint.remove();
	});

	it ('should set hint on a combobox element', function() {
		$('body').append('<select id="hint"><option value="">--</option><option value="good">good</option></select>');

		// given
		var $hint = $('#hint'),
			$star = $('#star').raty({ target: '#hint' });

		// when
		$star.children('img').eq(3).mouseover();

		// then
		expect($hint.val()).toEqual('good');

		$hint.remove();
	});

	it ('should set hint on a text element', function() {
		$('body').append('<input id="hint" type="text" />');

		// given
		var $hint = $('#hint'),
			$star = $('#star').raty({ target: '#hint' });

		// when
		$star.children('img').eq(3).mouseover();

		// then
		expect($hint.val()).toEqual('good');

		$hint.remove();
	});

	it ('should set hint on a textarea element', function() {
		$('body').append('<textarea id="hint"></textarea>');

		// given
		var $hint = $('#hint'),
			$star = $('#star').raty({ target: '#hint' });

		// when
		$star.children('img').eq(3).mouseover();

		// then
		expect($hint.val()).toEqual('good');

		$hint.remove();
	});

	it ('should set number hint on a combobox element', function() {
		$('body').append('<select id="hint"><option value="">--</option><option value="4">4</option></select>');

		// given
		var $hint = $('#hint'),
			$star = $('#star').raty({ target: '#hint', targetType: 'number' });

		// when
		$star.children('img').eq(3).mouseover();

		// then
		expect($hint.val()).toEqual('4');

		$hint.remove();
	});

	it ('should set number hint and keep it on mouseleave', function() {
		$('body').append('<select id="hint"><option value="">--</option><option value="4">4</option></select>');

		// given
		var $hint = $('#hint'),
			$star = $('#star').raty({ target: '#hint', targetType: 'number', targetKeep: true });

		// when
		$star.children('img').eq(3).mouseover().click().mouseleave();

		// then
		expect($hint.val()).toEqual('4');

		$hint.remove();
	});

	it ('should create stars without space', function() {
		// given
		var $star	= $('#star');
			size	= 16,
			number	= 5;

		// when
		$star.raty({ space: false });

		// then
		expect($star.width()).toEqual(number * size + number * (4 * 0));
	});

	it ('should create stars with cancel without space', function() {
		// given
		var $star	= $('#star');
			size	= 16,
			number	= 5;

		// when
		$star.raty({ cancel: true, space: false });

		// then
		expect($star.width()).toEqual(number * size + number * (4 * 0) + 16 + (4 * 0));
	});

	it ('should not set target with targetText when has started score and targetKeep is true with mouseout', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint	= $('#hint'),
			$star	= $('#star').raty({ start: 3, target: '#hint', targetKeep: true, targetText: 'my-hint-message' });

		// when
		$star.children('img').eq(3).mouseover().mouseleave();

		// then
		expect($hint).toHaveHtml('regular');

		$hint.remove();
	});

	it ('should not set target with targetText when has clicked score and targetKeep is true with mouseout', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint	= $('#hint'),
			$star	= $('#star').raty({ target: '#hint', targetKeep: true, targetText: 'my-hint-message' });

		// when
		$star.children('img').eq(3).mouseover().click().mouseleave();

		// then
		expect($hint).toHaveHtml('good');

		$hint.remove();
	});

	it ('should set target with targetText when has started score and targetKeep is false with mouseout', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var message	= 'my-hint-message',
			$hint	= $('#hint'),
			$star	= $('#star').raty({ start: 3, target: '#hint', targetKeep: false, targetText: message });

		// when
		$star.children('img').eq(3).mouseover().mouseleave();

		// then
		expect($hint).toHaveHtml(message);

		$hint.remove();
	});

	it ('should set target with targetText when has clicked score and targetKeep false with mouseout', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var message	= 'my-hint-message',
			$hint	= $('#hint'),
			$star	= $('#star').raty({ target: '#hint', targetKeep: false, targetText: message });

		// when
		$star.children('img').eq(3).mouseover().click().mouseleave();

		// then
		expect($hint).toHaveHtml(message);

		$hint.remove();
	});

	it ('should set target with targetText when has started score and targetKeep is false without mouseout', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var message	= 'my-hint-message',
			$hint	= $('#hint'),
			$star	= $('#star');

		// when
		$star.raty({ start: 3, target: '#hint', targetKeep: false, targetText: message });

		// then
		expect($hint).toHaveHtml(message);

		$hint.remove();
	});

	it ('should set score as readonly when start with readOnly', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ readOnly: true });

		// then
		expect($star.children('input')).toHaveAttr('readonly', 'readonly');
	});

	it ('should be down with round option', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ halfShow: true, start: 1.9, round: { down: .9, full: .98, up: .99 } });

		var $imgs = $star.children('img');

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should be half with round option', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ halfShow: true, start: 1.91, round: { down: .9, full: .98, up: .99 } });

		var $imgs = $star.children('img');

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-half.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should be up with round option', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ halfShow: true, start: 1.99, round: { down: .9, full: .98, up: .99 } });

		var $imgs = $star.children('img');

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should be full with round option and halfShow off', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ halfShow: false, start: 1.98, round: { down: .9, full: .98, up: .99 } });

		var $imgs = $star.children('img');

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should be down with round option and others options default', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ halfShow: true, start: 1.9, round: { down: .9 } });

		var $imgs = $star.children('img');

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should be half with round option and others options default', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ halfShow: true, start: 1.26, round: { } });

		var $imgs = $star.children('img');

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-half.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should be up with round option and others options default', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ halfShow: true, start: 1.99, round: { up: .99 } });

		var $imgs = $star.children('img');

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should be full with round option and halfShow off and others options default', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ halfShow: false, start: 1.98, round: { full: .98 } });

		var $imgs = $star.children('img');

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should set hint target with start option and targetKeep true', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint	= $('#hint'),
			$star	= $('#star');

		// when
		$star.raty({ target: '#hint', precision: true, start: 3, targetKeep: true });

		// then
		expect($hint).toHaveHtml('regular');

		$hint.remove();
	});

	it ('should set precision number target with just one fractional number', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint	= $('#hint'),
			$star	= $('#star');

		// when
		$star.raty({ target: '#hint', precision: true, targetType: 'number', start: 1.2333, targetKeep: true });

		// then
		expect($hint).toHaveHtml('1.2');

		$hint.remove();
	});

	it ('should set precision number target with start options and targetKeep true', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint	= $('#hint'),
			$star	= $('#star');

		// when
		$star.raty({ target: '#hint', precision: true, targetType: 'number', start: 1.2, targetKeep: true });

		// then
		expect($hint).toHaveHtml('1.2');

		$hint.remove();
	});

	it ('should set target with format on mouseover', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint	= $('#hint'),
			$star	= $('#star').raty({ target: '#hint', targetFormat: 'score: {score}', precision: true });

		// when
		$star.children('img:first').mouseover();

		// then
		expect($hint).toHaveHtml('score: bad');

		$hint.remove();
	});

	it ('should set score with precision and half disabled', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint	= $('#hint'),
			$star	= $('#star').raty({ target: '#hint', targetKeep: true, precision: true });

		// when
		$star.children('img:first').mouseover().click().mouseleave();

		// then
		expect($hint).toHaveHtml('bad');

		$hint.remove();
	});

	it ('should set and keep target with format on click and mouseleave', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint	= $('#hint'),
			$star	= $('#star').raty({ target: '#hint', targetFormat: 'score: {score}', targetKeep: true });

		// when
		$star.children('img:first').mouseover().click().mouseleave();

		// then
		expect($hint).toHaveHtml('score: bad');

		$hint.remove();
	});

	it ('should set target with format and precision', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint	= $('#hint'),
			$star	= $('#star');

		// when
		$star.raty({ target: '#hint', targetFormat: 'score: {score}', targetKeep: true, targetType: 'number', precision: true, start: 1.2 });

		// then
		expect($hint).toHaveHtml('score: 1.2');

		$hint.remove();
	});

	it ('should set target with none value', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint	= $('#hint'),
			$star	= $('#star');

		// when
		$star.raty({ target: '#hint', targetFormat: 'score: {score}', targetKeep: true, targetType: 'number', targetText: 'none' });

		// then
		expect($hint).toHaveHtml('score: none');

		$hint.remove();
	});

	it ('should not to use format template on cancel mouseover', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint	= $('#hint'),
			$star	= $('#star').raty({ cancel: true, target: '#hint', targetFormat: 'score: {score}', targetKeep: true });

		// when
		$star.children('img:first').mouseenter();

		// then
		expect($hint).toHaveHtml('cancel this rating!');

		$hint.remove();
	});

	it ('should show single icon selection on mouseover', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ single: true });

		var $imgs = $star.children('img');

		$imgs.eq(2).mouseover();

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should show single icon selection on click', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({ single: true });

		var $imgs = $star.children('img');

		$imgs.eq(2).mouseover().click().mouseleave();

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should show single icon selection with iconRange enabled on mouseover', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({
			iconRange: [
				{ range: 2, on: 'face-a.png', off: 'face-a-off.png' },
				{ range: 3, on: 'face-b.png', off: 'face-b-off.png' },
				{ range: 4, on: 'face-c.png', off: 'face-c-off.png' },
				{ range: 5, on: 'face-d.png', off: 'face-d-off.png' }
			],
			single: true
		});

		var $imgs = $star.children('img');

		$imgs.eq(3).mouseover();

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/face-a-off.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/face-a-off.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/face-b-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/face-c.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/face-d-off.png');
	});

	it ('should show single icon selection with iconRange enabled on click', function() {
		// given
		var $star = $('#star');

		// when
		$star.raty({
			iconRange: [
				{ range: 2, on: 'face-a.png', off: 'face-a-off.png' },
				{ range: 3, on: 'face-b.png', off: 'face-b-off.png' },
				{ range: 4, on: 'face-c.png', off: 'face-c-off.png' },
				{ range: 5, on: 'face-d.png', off: 'face-d-off.png' }
			],
			single: true
		});

		var $imgs = $star.children('img');

		$imgs.eq(3).mouseover().click().mouseleave();

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/face-a-off.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/face-a-off.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/face-b-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/face-c.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/face-d-off.png');
	});

	it ('score should get it as int', function() {
		// given
		var $star = $('#star').raty({ start: 1 });

		// when
		var score = $star.raty('score');

		// then
		expect(score).toEqual(1);
	});

	it ('score should get it as float', function() {
		// given
		var $star = $('#star').raty({ start: 1.5 });

		// when
		var score = $star.raty('score');

		// then
		expect(score).toEqual(1.5);
	});

});

describe('Using class', function() {

	beforeEach(function() {
		$('body').append('<div class="star"></div><div class="star"></div><div class="star"></div>');
	});

	afterEach(function() {
		$('.star').remove();
	});

	it ('should create the default stars', function() {
		// given
		var $stars = $('.star');

		// when
		$stars.raty();

		// then
		var $imgs1 = $stars.eq(0).children('img'),
			$imgs2 = $stars.eq(1).children('img'),
			$imgs3 = $stars.eq(2).children('img');

	    expect($imgs1.eq(0)).toHaveAttr('title', 'bad');
	    expect($imgs1.eq(1)).toHaveAttr('title', 'poor');
	    expect($imgs1.eq(2)).toHaveAttr('title', 'regular');
	    expect($imgs1.eq(3)).toHaveAttr('title', 'good');
	    expect($imgs1.eq(4)).toHaveAttr('title', 'gorgeous');

	    expect($imgs1.eq(0)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs1.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs1.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs1.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs1.eq(4)).toHaveAttr('src', 'img/star-off.png');

	    expect($imgs2.eq(0)).toHaveAttr('title', 'bad');
	    expect($imgs2.eq(1)).toHaveAttr('title', 'poor');
	    expect($imgs2.eq(2)).toHaveAttr('title', 'regular');
	    expect($imgs2.eq(3)).toHaveAttr('title', 'good');
	    expect($imgs2.eq(4)).toHaveAttr('title', 'gorgeous');

	    expect($imgs2.eq(0)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs2.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs2.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs2.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs2.eq(4)).toHaveAttr('src', 'img/star-off.png');

	    expect($imgs3.eq(0)).toHaveAttr('title', 'bad');
	    expect($imgs3.eq(1)).toHaveAttr('title', 'poor');
	    expect($imgs3.eq(2)).toHaveAttr('title', 'regular');
	    expect($imgs3.eq(3)).toHaveAttr('title', 'good');
	    expect($imgs3.eq(4)).toHaveAttr('title', 'gorgeous');

	    expect($imgs3.eq(0)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs3.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs3.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs3.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs3.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should select first raty', function() {
		// given
		var $stars = $('.star').raty(),
			$imgs1 = $stars.eq(0).children('img'),
			$imgs2 = $stars.eq(1).children('img'),
			$imgs3 = $stars.eq(2).children('img');

		// when
		$imgs1.eq(3).mouseover();

		// then
	    expect($imgs1.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs1.eq(1)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs1.eq(2)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs1.eq(3)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs1.eq(4)).toHaveAttr('src', 'img/star-off.png');

	    expect($imgs2.eq(0)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs2.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs2.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs2.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs2.eq(4)).toHaveAttr('src', 'img/star-off.png');

	    expect($imgs3.eq(0)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs3.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs3.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs3.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs3.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should click second raty', function() {
		// given
		var $stars = $('.star').raty(),
			$imgs1 = $stars.eq(0).children('img'),
			$imgs2 = $stars.eq(1).children('img'),
			$imgs3 = $stars.eq(2).children('img');

		// when

		$imgs2.eq(3).mouseover().click().mouseleave();

		// then
	    expect($imgs1.eq(0)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs1.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs1.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs1.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs1.eq(4)).toHaveAttr('src', 'img/star-off.png');

	    expect($imgs2.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs2.eq(1)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs2.eq(2)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs2.eq(3)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs2.eq(4)).toHaveAttr('src', 'img/star-off.png');

	    expect($imgs3.eq(0)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs3.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs3.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs3.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs3.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should click on first and third raty', function() {
		// given
		var $stars = $('.star').raty(),
			$imgs1 = $stars.eq(0).children('img'),
			$imgs2 = $stars.eq(1).children('img'),
			$imgs3 = $stars.eq(2).children('img');

		// when
		$imgs1.eq(3).mouseover().click().mouseleave();
		$imgs3.eq(3).mouseover().click().mouseleave();

		// then
		expect($imgs1.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs1.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs1.eq(2)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs1.eq(3)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs1.eq(4)).toHaveAttr('src', 'img/star-off.png');

	    expect($imgs2.eq(0)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs2.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs2.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs2.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs2.eq(4)).toHaveAttr('src', 'img/star-off.png');

		expect($imgs3.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs3.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs3.eq(2)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs3.eq(3)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs3.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should hover all and out', function() {
		// given
		var $stars = $('.star').raty(),
			$imgs1 = $stars.eq(0).children('img'),
			$imgs2 = $stars.eq(1).children('img'),
			$imgs3 = $stars.eq(2).children('img');

		// when
		$imgs1.eq(1).mouseover().mouseleave();
		$imgs2.eq(2).mouseover().mouseleave();
		$imgs3.eq(3).mouseover().mouseleave();

		// then
		expect($imgs1.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(4)).toHaveAttr('src', 'img/star-off.png');

	    expect($imgs2.eq(0)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs2.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs2.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs2.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs2.eq(4)).toHaveAttr('src', 'img/star-off.png');

		expect($imgs3.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should set score as readonly when start with readOnly', function() {
		// given
		var $stars = $('.star');

		// when
		$stars.eq(0).raty({ readOnly: true });
		$stars.eq(1).raty({ readOnly: true });
		$stars.eq(2).raty({ readOnly: true });

		// then
		expect($stars.eq(0).children('input')).toHaveAttr('readonly', 'readonly');
		expect($stars.eq(1).children('input')).toHaveAttr('readonly', 'readonly');
		expect($stars.eq(2).children('input')).toHaveAttr('readonly', 'readonly');
	});

	it ('score should get it as int', function() {
		// given
		var $stars = $('.star');;

		$stars.eq(0).raty({ start: 1 });
		$stars.eq(1).raty({ start: 2 });
		$stars.eq(2).raty({ start: 3 });

		// when
		var score1 = $stars.eq(0).raty('score'),
			score2 = $stars.eq(1).raty('score'),
			score3 = $stars.eq(2).raty('score');

		// then
		expect(score1).toEqual(1);
		expect(score2).toEqual(2);
		expect(score3).toEqual(3);
	});

	it ('score should get it as float', function() {
		// given
		var $stars = $('.star');;

		$stars.eq(0).raty({ start: 1.1 });
		$stars.eq(1).raty({ start: 2.2 });
		$stars.eq(2).raty({ start: 3.3 });

		// when
		var score1 = $stars.eq(0).raty('score'),
			score2 = $stars.eq(1).raty('score'),
			score3 = $stars.eq(2).raty('score');

		// then
		expect(score1).toEqual(1.1);
		expect(score2).toEqual(2.2);
		expect(score3).toEqual(3.3);
	});

});

describe('Using function with id', function() {

	beforeEach(function() {
		$('body').append('<div id="star"></div>');
	});

	afterEach(function() {
		$('#star').remove();
	});

	it ('should start the start with 3 stars', function() {
		// given
		var $star = $('#star').raty();

		// when
		$star.raty('start', 3);

		// then
		var $imgs = $star.children('img');

	    expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should not call click callback when start function run without true option', function() {
		// given
		var $star = $('#star').raty({ click: function(score, evt) { $(this).attr('title', score); }});

		// when
		$star.raty('start', 3);

		// then
		var $imgs = $star.children('img');

	    expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');

	    expect($star.attr('title')).toEqual(undefined);
	});

	it ('should set readOnly and fix the hints', function() {
		// given
		var $star = $('#star').raty({ start: 1 });

		// when
		$star.raty('readOnly', true);

		var $imgs = $star.children('img');

		$imgs.eq(3).mouseover().click();

		// then
	    expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');

	    expect($imgs.eq(0)).toHaveAttr('title', 'bad');
	    expect($imgs.eq(1)).toHaveAttr('title', 'bad');
	    expect($imgs.eq(2)).toHaveAttr('title', 'bad');
	    expect($imgs.eq(3)).toHaveAttr('title', 'bad');
	    expect($imgs.eq(4)).toHaveAttr('title', 'bad');
	});

	it ('should set readOnly and hide cancel button', function() {
		// given
		var $star = $('#star').raty({ cancel: true, path: '../img' });

		// when
		$star.raty('readOnly', true);

		// then
	    expect($star.children('.raty-cancel')).not.toBeVisible();
	});

	it ('should unset readOnly and show cancel button', function() {
		// given
		var $star = $('#star').raty({ cancel: true, readOnly: true, path: '../img' });

		// when
		$star.raty('readOnly', false);

		// then
	    expect($star.children('.raty-cancel')).toBeVisible();
	});

	it ('should unset readOnly and put back the titles', function() {
		// given
		var $star = $('#star').raty();

		// when
		$star.raty('readOnly', true).raty('readOnly', false);

		var $imgs = $star.children('img');

		$imgs.eq(1).mouseover().click();

		// then
	    expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');

	    expect($imgs.eq(0)).toHaveAttr('title', 'bad');
	    expect($imgs.eq(1)).toHaveAttr('title', 'poor');
	    expect($imgs.eq(2)).toHaveAttr('title', 'regular');
	    expect($imgs.eq(3)).toHaveAttr('title', 'good');
	    expect($imgs.eq(4)).toHaveAttr('title', 'gorgeous');
	});

	it ('should cancel without click', function() {
		// given
		var $star = $('#star').raty({ start: 1 });

		// when
		$star.raty('cancel');

		var $imgs = $star.children('img');

		// then
	    expect($imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');

	    expect($star.children('input').val()).toEqual('');
	});

	it ('should cancel with click', function() {
		// given
		var $star = $('#star').raty({
			click: function(score, evt) {
				$(this).attr('title', (score === null) ? 'null' : score);
			},
			start: 1
		});

		// when
		$star.raty('cancel', true);

		var $imgs = $star.children('img');

		// then
	    expect($imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
	    expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');

	    expect($star).toHaveAttr('title', 'null');
	    expect($star.children('input').val()).toEqual('');
	});

	it ('should click the star 3', function() {
		// given
		var $star = $('#star').raty({
			click: function(score, evt) {
				$(this).attr('title', score);
			}
		});

		// when
		$star.raty('click', 3);

		// then
		var $imgs = $star.children('img');

		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
		expect($star).toHaveAttr('title', 3);
	});

	it ('should set a target on div with mouseover', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint = $('#hint'),
			$star = $('#star').raty({ target: '#hint', targetKeep: true, click: function(score, evt) { } });

		// when
		$star.raty('click', 4);

		// then
		expect($hint).toHaveHtml('good');

		$hint.remove();
	});

	it ('should set a target on div with mouseover', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint = $('#hint'),
			$star = $('#star').raty({ target: '#hint', targetKeep: true });

		// when
		$star.raty('start', 4);

		// then
		expect($hint).toHaveHtml('good');

		$hint.remove();
	});

	it ('should set a target on div with cancel', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint = $('#hint'),
			$star = $('#star').raty({ cancel: true, target: '#hint', targetKeep: true });

		// when
		$star.raty('cancel');

		// then
		expect($hint).toBeEmpty();

		$hint.remove();
	});

	it ('should not start when it is readOnly', function() {
		// given
		var $star = $('#star').raty({ readOnly: true });

		// when
		$star.raty('start', 1);

		// then
		var $imgs = $star.children('img');

		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should not click when it is readOnly', function() {
		// given
		var $star = $('#star').raty({ readOnly: true, click: function(score, evt) { } });

		// when
		$star.raty('click', 1);

		// then
		var $imgs = $star.children('img');

		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should not cancel when it is readOnly', function() {
		// given
		var $star = $('#star').raty({ readOnly: true, start: 1 });

		// when
		$star.raty('cancel');

		// then
		var $imgs = $star.children('img');

		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
		expect($star.children('input').val()).toEqual('1');
	});

	it ('should set score as readonly when start with readOnly', function() {
		// given
		var $star = $('#star').raty();

		// when
		$star.raty('readOnly', true);

		// then
		expect($star.children('input')).toHaveAttr('readonly', 'readonly');
	});

	it ('should to do mouseleave automatically and set the cancel hint on target', function() {
		$('body').append('<div id="hint"></div>');

		// given
		var $hint	= $('#hint'),
			$star	= $('#star').raty({ cancel: true, target: '#hint', targetFormat: 'score: {score}', targetKeep: true });

		// when
		$star.raty('cancel');

		// then
		expect($hint).toHaveHtml('score: ');

		$hint.remove();
	});

	it ('should rebind the cancel button after readOnly be enabled', function() {
		// given
		var $star = $('#star').raty({ cancel: true });

		// when
		$star.raty('readOnly', true).raty('readOnly', false).children('.raty-cancel').mouseenter();

		var $imgs = $star.children('img').not('.raty-cancel');

		// then
		expect($imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

});

describe('Using function with class', function() {
	
	beforeEach(function() {
		$('body').append('<div class="star"></div><div class="star"></div><div class="star"></div>');
	});

	afterEach(function() {
		$('.star').remove();
	});

	it ('should start the starts with 3 stars', function() {
		// given
		var $stars = $('.star').raty();

		// when
		$stars.raty('start', 3);

		// then
		var $imgs1 = $stars.eq(0).children('img'),
			$imgs2 = $stars.eq(1).children('img'),
			$imgs3 = $stars.eq(2).children('img');

		expect($imgs1.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs1.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs1.eq(2)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs1.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(4)).toHaveAttr('src', 'img/star-off.png');

		expect($imgs2.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs2.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs2.eq(2)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs2.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(4)).toHaveAttr('src', 'img/star-off.png');

		expect($imgs3.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs3.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs3.eq(2)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs3.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});
	
	it ('should set readOnly and fix the hint', function() {
		// given
		var $stars = $('.star').raty();

		// when
		$stars.raty('readOnly', true);

		var $imgs1 = $stars.eq(0).children('img'),
			$imgs2 = $stars.eq(1).children('img'),
			$imgs3 = $stars.eq(2).children('img');
	
		$imgs1.eq(3).mouseover().click();
		$imgs2.eq(3).mouseover().click();
		$imgs3.eq(3).mouseover().click();

		// then
		expect($imgs1.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(4)).toHaveAttr('src', 'img/star-off.png');

		expect($imgs1.eq(0)).toHaveAttr('title', 'not rated yet');
	    expect($imgs1.eq(1)).toHaveAttr('title', 'not rated yet');
	    expect($imgs1.eq(2)).toHaveAttr('title', 'not rated yet');
	    expect($imgs1.eq(3)).toHaveAttr('title', 'not rated yet');
	    expect($imgs1.eq(4)).toHaveAttr('title', 'not rated yet');

		expect($imgs2.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(4)).toHaveAttr('src', 'img/star-off.png');

		expect($imgs2.eq(0)).toHaveAttr('title', 'not rated yet');
	    expect($imgs2.eq(1)).toHaveAttr('title', 'not rated yet');
	    expect($imgs2.eq(2)).toHaveAttr('title', 'not rated yet');
	    expect($imgs2.eq(3)).toHaveAttr('title', 'not rated yet');
	    expect($imgs2.eq(4)).toHaveAttr('title', 'not rated yet');

		expect($imgs3.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(4)).toHaveAttr('src', 'img/star-off.png');

		expect($imgs3.eq(0)).toHaveAttr('title', 'not rated yet');
	    expect($imgs3.eq(1)).toHaveAttr('title', 'not rated yet');
	    expect($imgs3.eq(2)).toHaveAttr('title', 'not rated yet');
	    expect($imgs3.eq(3)).toHaveAttr('title', 'not rated yet');
	    expect($imgs3.eq(4)).toHaveAttr('title', 'not rated yet');
	});

	it ('should unset readOnly and put back the titles', function() {
		// given
		var $stars = $('.star').raty();

		// when
		$stars.raty('readOnly', true).raty('readOnly', false);

		var $imgs1 = $stars.eq(0).children('img'),
			$imgs2 = $stars.eq(1).children('img'),
			$imgs3 = $stars.eq(2).children('img');

		$imgs1.eq(3).mouseover().click();
		$imgs2.eq(3).mouseover().click();
		$imgs3.eq(3).mouseover().click();

		// then
		expect($imgs1.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs1.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs1.eq(2)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs1.eq(3)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs1.eq(4)).toHaveAttr('src', 'img/star-off.png');

		expect($imgs1.eq(0)).toHaveAttr('title', 'bad');
	    expect($imgs1.eq(1)).toHaveAttr('title', 'poor');
	    expect($imgs1.eq(2)).toHaveAttr('title', 'regular');
	    expect($imgs1.eq(3)).toHaveAttr('title', 'good');
	    expect($imgs1.eq(4)).toHaveAttr('title', 'gorgeous');

		expect($imgs2.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs2.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs2.eq(2)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs2.eq(3)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs2.eq(4)).toHaveAttr('src', 'img/star-off.png');

		expect($imgs2.eq(0)).toHaveAttr('title', 'bad');
	    expect($imgs2.eq(1)).toHaveAttr('title', 'poor');
	    expect($imgs2.eq(2)).toHaveAttr('title', 'regular');
	    expect($imgs2.eq(3)).toHaveAttr('title', 'good');
	    expect($imgs2.eq(4)).toHaveAttr('title', 'gorgeous');

		expect($imgs3.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs3.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs3.eq(2)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs3.eq(3)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs3.eq(4)).toHaveAttr('src', 'img/star-off.png');

		expect($imgs3.eq(0)).toHaveAttr('title', 'bad');
	    expect($imgs3.eq(1)).toHaveAttr('title', 'poor');
	    expect($imgs3.eq(2)).toHaveAttr('title', 'regular');
	    expect($imgs3.eq(3)).toHaveAttr('title', 'good');
	    expect($imgs3.eq(4)).toHaveAttr('title', 'gorgeous');
	});
	
	it ('should cancel without click', function() {
		// given
		var $stars = $('.star').raty({ start: 1 });

		// when
		$stars.raty('cancel');

		// then
		var $imgs1 = $stars.eq(0).children('img'),
			$imgs2 = $stars.eq(1).children('img'),
			$imgs3 = $stars.eq(2).children('img');

		expect($imgs1.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(4)).toHaveAttr('src', 'img/star-off.png');
		expect($stars.eq(0).children('input').val()).toEqual('');

		expect($imgs2.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(4)).toHaveAttr('src', 'img/star-off.png');
		expect($stars.eq(1).children('input').val()).toEqual('');

		expect($imgs3.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(4)).toHaveAttr('src', 'img/star-off.png');
		expect($stars.eq(2).children('input').val()).toEqual('');
	});
	
	it ('should cancel with click', function() {
		// given
		var $stars = $('.star').raty({
			click: function(score, evt) {
				$(this).attr('title', (score === null) ? 'null' : score);
			},
			start: 1
		});

		// when
		$stars.raty('cancel', true);

		// then
		var $imgs1 = $stars.eq(0).children('img'),
			$imgs2 = $stars.eq(1).children('img'),
			$imgs3 = $stars.eq(2).children('img');
	
		expect($imgs1.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(4)).toHaveAttr('src', 'img/star-off.png');
		expect($stars.eq(0)).toHaveAttr('title', 'null');
		expect($stars.eq(0).children('input').val()).toEqual('');

		expect($imgs2.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(4)).toHaveAttr('src', 'img/star-off.png');
		expect($stars.eq(1)).toHaveAttr('title', 'null');
		expect($stars.eq(1).children('input').val()).toEqual('');

		expect($imgs3.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(4)).toHaveAttr('src', 'img/star-off.png');
		expect($stars.eq(1)).toHaveAttr('title', 'null');
		expect($stars.eq(2).children('input').val()).toEqual('');
	});

	it ('should click the star 3', function() {
		// given
		var $stars = $('.star').raty({
			click: function(score, evt) {
				$(this).attr('title', score);
			}
		});

		// when
		$stars.raty('click', 3);

		// then
		var $imgs1 = $stars.eq(0).children('img'),
			$imgs2 = $stars.eq(1).children('img'),
			$imgs3 = $stars.eq(2).children('img');
	
		expect($imgs1.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs1.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs1.eq(2)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs1.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(4)).toHaveAttr('src', 'img/star-off.png');
		expect($stars.eq(0)).toHaveAttr('title', 3);

		expect($imgs2.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs2.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs2.eq(2)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs2.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(4)).toHaveAttr('src', 'img/star-off.png');
		expect($stars.eq(1)).toHaveAttr('title', 3);

		expect($imgs3.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs3.eq(1)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs3.eq(2)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs3.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(4)).toHaveAttr('src', 'img/star-off.png');
		expect($stars.eq(2)).toHaveAttr('title', 3);
	});
	
	it ('should set a target on div with click', function() {
		$('body').append('<div id="hint1"></div><div id="hint2"></div><div id="hint3"></div>');

		// given
		var $hint1	= $('#hint1'),
			$hint2	= $('#hint2'),
			$hint3	= $('#hint3'),
			$stars	= $('.star');

		$stars.eq(0).raty({ target: '#hint1', targetKeep: true, click: function(score, evt) { } });
		$stars.eq(1).raty({ target: '#hint2', targetKeep: true, click: function(score, evt) { } });
		$stars.eq(2).raty({ target: '#hint3', targetKeep: true, click: function(score, evt) { } });

		// when
		$stars.raty('click', 4);

		// then
		expect($hint1).toHaveHtml('good');
		expect($hint2).toHaveHtml('good');
		expect($hint3).toHaveHtml('good');

		$hint1.remove();
		$hint2.remove();
		$hint3.remove();
	});
	
	it ('should set a target on div with start', function() {
		$('body').append('<div id="hint1"></div><div id="hint2"></div><div id="hint3"></div>');

		// given
		var $hint1	= $('#hint1'),
			$hint2	= $('#hint2'),
			$hint3	= $('#hint3'),
			$stars	= $('.star');
	
		$stars.eq(0).raty({ target: '#hint1', targetKeep: true, click: function(score, evt) { } });
		$stars.eq(1).raty({ target: '#hint2', targetKeep: true, click: function(score, evt) { } });
		$stars.eq(2).raty({ target: '#hint3', targetKeep: true, click: function(score, evt) { } });

		// when
		$stars.raty('start', 4);

		// then
		expect($hint1).toHaveHtml('good');
		expect($hint2).toHaveHtml('good');
		expect($hint3).toHaveHtml('good');

		$hint1.remove();
		$hint2.remove();
		$hint3.remove();
	});

	it ('should set a target on div with cancel', function() {
		$('body').append('<div id="hint1"></div><div id="hint2"></div><div id="hint3"></div>');

		// given
		var $hint1	= $('#hint1'),
			$hint2	= $('#hint2'),
			$hint3	= $('#hint3'),
			$stars	= $('.star');
	
		$stars.eq(0).raty({ cancel: true, target: '#hint1', targetKeep: true, click: function(score, evt) { } });
		$stars.eq(1).raty({ cancel: true, target: '#hint2', targetKeep: true, click: function(score, evt) { } });
		$stars.eq(2).raty({ cancel: true, target: '#hint3', targetKeep: true, click: function(score, evt) { } });

		// when
		$stars.raty('cancel');

		// then
		expect($hint1).toBeEmpty();
		expect($hint2).toBeEmpty();
		expect($hint3).toBeEmpty();

		$hint1.remove();
		$hint2.remove();
		$hint3.remove();
	});

	it ('should not start when it is readOnly', function() {
		// given
		var $stars = $('.star').raty({ readOnly: true });

		// when
		$stars.eq(0).raty('start', 1);
		$stars.eq(1).raty('start', 1);
		$stars.eq(2).raty('start', 1);

		// then
		var $imgs1 = $stars.eq(0).children('img'),
			$imgs2 = $stars.eq(1).children('img'),
			$imgs3 = $stars.eq(2).children('img');

		expect($imgs1.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(4)).toHaveAttr('src', 'img/star-off.png');

		expect($imgs2.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(4)).toHaveAttr('src', 'img/star-off.png');

		expect($imgs3.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should not click when it is readOnly', function() {
		// given
		var $stars = $('.star').raty({ readOnly: true, click: function(score, evt) { } });

		// when
		$stars.eq(0).raty('click', 1);
		$stars.eq(1).raty('click', 1);
		$stars.eq(2).raty('click', 1);

		// then
		var $imgs1 = $stars.eq(0).children('img'),
			$imgs2 = $stars.eq(1).children('img'),
			$imgs3 = $stars.eq(2).children('img');

		expect($imgs1.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(4)).toHaveAttr('src', 'img/star-off.png');

		expect($imgs2.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(4)).toHaveAttr('src', 'img/star-off.png');

		expect($imgs3.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

	it ('should not cancel when it is readOnly', function() {
		// given
		var $stars = $('.star').raty({ readOnly: true, start: 1 });

		// when
		$stars.eq(0).raty('cancel');
		$stars.eq(1).raty('cancel');
		$stars.eq(2).raty('cancel');

		// then
		var $imgs1 = $stars.eq(0).children('img'),
			$imgs2 = $stars.eq(1).children('img'),
			$imgs3 = $stars.eq(2).children('img');

		expect($imgs1.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs1.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(4)).toHaveAttr('src', 'img/star-off.png');
		expect($stars.eq(0).children('input').val()).toEqual('1');

		expect($imgs2.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs2.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(4)).toHaveAttr('src', 'img/star-off.png');
		expect($stars.eq(1).children('input').val()).toEqual('1');

		expect($imgs3.eq(0)).toHaveAttr('src', 'img/star-on.png');
		expect($imgs3.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(4)).toHaveAttr('src', 'img/star-off.png');
		expect($stars.eq(2).children('input').val()).toEqual('1');
	});

	it ('should set score as readonly when start with readOnly', function() {
		// given
		var $stars = $('.star').raty();

		// when
		$stars.eq(0).raty('readOnly', true);
		$stars.eq(1).raty('readOnly', true);
		$stars.eq(2).raty('readOnly', true);

		// then
		expect($stars.eq(0).children('input')).toHaveAttr('readonly', 'readonly');
		expect($stars.eq(1).children('input')).toHaveAttr('readonly', 'readonly');
		expect($stars.eq(2).children('input')).toHaveAttr('readonly', 'readonly');
	});

	it ('should rebind the cancel button after readOnly be enabled', function() {
		// given
		var $stars = $('.star').raty({ cancel: true });

		// when
		$stars.raty('readOnly', true).raty('readOnly', false).children('.raty-cancel').mouseenter();

		// then
		var $imgs1 = $stars.eq(0).children('img').not('.raty-cancel'),
			$imgs2 = $stars.eq(1).children('img').not('.raty-cancel'),
			$imgs3 = $stars.eq(2).children('img').not('.raty-cancel');

		expect($imgs1.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs1.eq(4)).toHaveAttr('src', 'img/star-off.png');
	
		expect($imgs2.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs2.eq(4)).toHaveAttr('src', 'img/star-off.png');
	
		expect($imgs3.eq(0)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(1)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(2)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(3)).toHaveAttr('src', 'img/star-off.png');
		expect($imgs3.eq(4)).toHaveAttr('src', 'img/star-off.png');
	});

});