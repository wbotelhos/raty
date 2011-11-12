describe('Using default', function() {

	beforeEach(function() {
		$('body').append('<div id="raty"></div>');
	});

	afterEach(function() {
		$('#raty').remove();
	});

	it('should chainable', function() {
		// given
		var $star		= $('#raty'),
			className	= 'my-class';

		// when
		$star.raty().addClass(className);

		// then
	    expect($star).toHaveClass(className);
	});

}); // USING DEFAULT