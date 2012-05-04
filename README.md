# jQuery Raty - A Star Rating Plugin - http://wbotelhos.com/raty

jQuery Raty is a plugin that generates a customizable star rating.

## Version

	@version        2.4.5
	@since          2010.06.11
	@author         Washington Botelho
	@documentation  wbotelhos.com/raty
	@twitter        twitter.com/wbotelhos

## Required Files

+ jquery.raty.min.js
+ star-on.png
+ star-off.png

## Default values

	cancel       : false                                          // Show a button to cancel the rating or not.   
	cancelHint   : 'cancel this rating!'                          // The hint information.
	cancelOff    : 'cancel-off.png'                               // Name of the cancel image off.
	cancelOn     : 'cancel-on.png'                                // Name of the cancel image on.
	cancelPlace  : 'left'                                         // Position of the cancel button.
	click        : undefined                                      // Callback for click actions.
	half         : false                                          // Active the half star.
	halfShow     : true                                           // Enables half star display.
	hints        : ['bad', 'poor', 'regular', 'good', 'gorgeous'] // A hint information for default 5 stars.
	iconRange    : undefined                                      // Object list representing each icon with position and names.
	mouseover    : undefined                                      // Callback for mouseover actions.
	noRatedMsg   : 'not rated yet'                                // A hint for no rated elements when it's read-only.
	number       : 5                                              // Number of star.
	path         : 'img                                           // Path of images.
	precision    : false                                          // Enables the selection of a precision score.
	readOnly     : false                                          // read-only or not.
	round        : { down: .25, full: .6, up: .76 }               // Configuration to set the round rules.
	score        : undefined                                      // Initial score value.
	scoreName    : 'score'                                        // The name of target score.
	single       : false                                          // Enables the single star selection.
	size         : 16                                             // The icons size.
	space        : true                                           // Puts space between the stars.
	starHalf     : 'star-half.png'                                // The image of the half star.
	starOff      : 'star-off.png'                                 // Name of the star image off.
	starOn       : 'star-on.png'                                  // Name of the star image on.
	target       : undefined                                      // Element selector where the rating will be displayed.
	targetFormat : '{score}'                                      // Template to interpolate the score with some thing.
	targetKeep   : false                                          // If the last choose value will be keeped on mouseout.
	targetText   : ''                                             // Default value when there's no score or targetKeep is off.
	targetType   : 'hint'                                         // What display on target element: hint or number.
	width        : undefined                                      // The container width of the stars.

## Usage

	$('#star').raty();

	<div id="star"></div>

	$('.star').raty();

	<div class="star"></div>
	<div class="star"></div>
	<div class="star"></div>

## Functions

	$('#star').raty('score');                // Recovers the current score or undefined for no rated. Class returns an array of score.

	$('#star').raty('score', 3);             // Set the score to 3 stars.

	$('#star').raty('click', 2);             // Click on the second star.

	$('.star').raty('readOnly', true);       // Adjusts all elements with class called 'star' for read-only.

	$('#star').raty('cancel', true);         // Cancel the rating. The second optional parameter enables the callback.

	$('#star').raty('reload');               // Reload the rating with the current configuration.

	$('#star').raty('set', { number: 10 });  // Reload the rating applying new configurations.

## Contributors

+ Andreas Köberle
+ Daniel Faria
+ Eric Wendelin
+ Francisco Souza
+ Gabriel Benz
+ hpgihan
+ janapol
+ jeongee
+ Olle Jonsson
+ packowitz

## Licence

The MIT License

Copyright (c) 2010 Washington Botelho

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Buy me a coffee

You can do it by [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=X8HEP2878NDEG&item_name=jQuery%20Raty). Thanks! (:
