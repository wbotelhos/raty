# jQuery Raty - A Star Rating Plugin

[http://wbotelhos.com/raty](http://wbotelhos.com/raty) - jQuery Raty is a plugin that generates a customizable star rating.

## Version

```
@version  2.5.3
@since    2014.04.23
@author   Washington Botelho
@doc      wbotelhos.com/raty
```

## Required Files

+ jquery.js
+ jquery.raty.js
+ star-on.png
+ star-off.png
+ or (instead of images, font-awesome/glyphicons/custom css)

## Options

```js
cancel      : false                                          // Creates a cancel button to cancel the rating.
cancelHint  : 'Cancel this rating!'                          // The cancel's button hint.
cancelOff   : 'cancel-off.png'                               // Icon used on active cancel.
cancelOn    : 'cancel-on.png'                                // Icon used inactive cancel.
cancelPlace : 'left'                                         // Cancel's button position.
click       : undefined                                      // Callback executed on rating click.
half        : false                                          // Enables half star selection.
halfShow    : true                                           // Enables half star display.
hints       : ['bad', 'poor', 'regular', 'good', 'gorgeous'] // Hints used on each star.
iconRange   : undefined                                      // Object list with position and icon on and off to do a mixed icons.
mouseout    : undefined                                      // Callback executed on mouseout.
mouseover   : undefined                                      // Callback executed on mouseover.
noRatedMsg  : 'Not rated yet!'                               // Hint for no rated elements when it's readOnly.
number      : 5                                              // Number of stars that will be presented.
numberMax   : 20                                             // Max of star the option number can creates.
path        : ''                                             // A global locate where the icon will be looked.
precision   : false                                          // Enables the selection of a precision score.
readOnly    : false                                          // Turns the rating read-only.
round       : { down: .25, full: .6, up: .76 }               // Included values attributes to do the score round math.
score       : undefined                                      // Initial rating.
scoreName   : 'score'                                        // Name of the hidden field that holds the score value.
single      : false                                          // Enables just a single star selection.
size        : 16                                             // The size of the icons that will be used.
space       : true                                           // Puts space between the icons.
starHalf    : 'star-half.png'                                // The name of the half star image.
starOff     : 'star-off.png'                                 // Name of the star image off.
starOn      : 'star-on.png'                                  // Name of the star image on.
target      : undefined                                      // Element selector where the score will be displayed.
targetFormat: '{score}'                                      // Template to interpolate the score in.
targetKeep  : false                                          // If the last rating value will be keeped after mouseout.
targetText  : ''                                             // Default text setted on target.
targetType  : 'hint'                                         // Option to choose if target will receive hint o 'score' type.
width       : undefined                                      // Manually adjust the width for the project.
starType    : 'img'                                          // The type of the star, img as default, could also be whatever element
```

## Usage

```html
<div id="star"></div>
```

```js
$('#star').raty();
```

```html
<div class="star"></div>
<div class="star"></div>
<div class="star"></div>
```

```js
$('.star').raty();
```

```js
// using it w/ font-awesome
$('.star').raty({
  starType : 'i',
  starOn   : 'fa fa-star',
  starOff  : 'fa fa-star-o',
  starHalf : 'fa fa-star-half-o'
});
```

```js
// or w/ custom css where on/off/half are classes to apply to star elements
$('.star').raty({
  starType : 'span',
  starOn   : 'on',
  starOff  : 'off',
  starHalf : 'half',
});
```

## Functions

```js
$('#star').raty('score');                  // Get the current score.

$('#star').raty('score', number);          // Set the score.

$('#star').raty('click', number);          // Click on some star.

$('.star').raty('readOnly', boolean);      // Change the read-only state.

$('#star').raty('cancel', boolean);        // Cancel the rating. The last param force the click callback.

$('#star').raty('reload');                 // Reload the rating with the current configuration.

$('#star').raty('set', { option: value }); // Reset the rating with new configurations.

$('#star').raty('destroy');                // Destroy the bind and give you the raw element.
```

## Contributors

[Check it out](http://github.com/wbotelhos/raty/graphs/contributors)

## Licence

The MIT License

## Love it!

Via [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=X8HEP2878NDEG&item_name=jQuery%20Raty) or [Gittip](http://www.gittip.com/wbotelhos). Thanks! (:
