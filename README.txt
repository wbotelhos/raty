/**
 * jQuery Raty - A Star Rating Plugin - http://wbotelhos.com/raty
 * --------------------------------------------------------------------------
 *
 * jQuery Raty is a plugin that generates a customizable star rating automatically.
 *
 * Licensed under The MIT License
 * 
 * @version     0.5
 * @since       11.06.2010
 * @author      Washington Botelho dos Santos
 * @link        http://wbotelhos.com/raty
 * @twitter     http://twitter.com/wbotelhos
 * @license     http://www.opensource.org/licenses/mit-license.php MIT 
 * @package     jQuery Plugins
 * 
 * Thanks to:
 * --------------------------------------------------------------------------
 * @glbenz
 * @franciscosouza
 * 
 * Usage (default values):
 * --------------------------------------------------------------------------
 *	$('div#star').raty({
 *		cancelHint:   'cancel this rate!',                             // The hint information.
 *		cancelOff:    'cancel-off.png'                                 // Name of the cancel image off.
 *		cancelOn:     'cancel-on.png'                                  // Name of the cancel image on.
 *		cancelPlace:  'left',                                          // Position of the cancel button.
 *		hintList:     ['bad', 'poor', 'regular', 'good', 'gorgeous'],  // A hint information for default 5 stars.
 *		number:       5,                                               // Number of star.
 *		path:         'img,                                            // Path of images.
 *		readOnly:     false,                                           // read-only or not.
 *		scoreName:    'score',                                         // The name of target score.
 *		showCancel:   false,                                           // If will be showed a button to cancel the rate.
 *		showHalf:     false,                                           // Active the half star.
 *		starHalf:     'star-half.png',                                 // The image of the half star.
 *		start:        0,                                               // Start with a score value.
 *		starOff:      'star-off.png',                                  // Name of the star image on.
 *		starOn:       'star-on.png'                                    // Name of the star image on.
 *    //onClick:    function() { alert('clicked!'); }                // A default function can to be setted here.
 *	});
 *  
 *  <div id="star"></div>
 *
 * Public functions:
 * --------------------------------------------------------------------------
 *  $.fn.raty.start(3);                                              // Starting the rating with 3 stars later.
 *  $.fn.raty.readOnly(true);                                        // Adjusts the rating for read-only later.
 *  $.fn.raty.click(2);                                              // Click in a star later.
 *
 *  Should come after the current raty and before the anothers one. Because it takes the last called raty.
 *
 */