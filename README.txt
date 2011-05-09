/**
 * jQuery Raty - A Star Rating Plugin - http://wbotelhos.com
 * --------------------------------------------------------------------------
 *
 * jQuery Raty is a plugin that generates a customizable star rating automatically.
 *
 * Licensed under The MIT License
 * 
 * @version     1.4.0
 * @since       06.11.2010
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
 * @olleolleolle
 * @jeongee
 * @emwendelin
 *
 * Default values:
 * --------------------------------------------------------------------------
 * cancel:       false                                            // Show a button to cancel the rating or not.   
 * cancelHint:   'cancel this rating!'                            // The hint information.
 * cancelOff:    'cancel-off.png'                                 // Name of the cancel image off.
 * cancelOn:     'cancel-on.png'                                  // Name of the cancel image on.
 * cancelPlace:  'left'                                           // Position of the cancel button.
 * click:        null                                             // Default callback function.
 * half:         false                                            // Active the half star.
 * hintList:     ['bad', 'poor', 'regular', 'good', 'gorgeous']   // A hint information for default 5 stars.
 * iconRange:    []                                               // A range of custom icons that you can set.
 * noRatedMsg:   'not rated yet'                                  // A hint for no rated elements when it's read-only.
 * number:       5                                                // Number of star.
 * path:         'img                                             // Path of images.
 * readOnly:     false                                            // read-only or not.
 * scoreName:    'score'                                          // The name of target score.
 * size:         16                                               // The icons size.
 * starHalf:     'star-half.png'                                  // The image of the half star.
 * starOff:      'star-off.png'                                   // Name of the star image on.
 * starOn:       'star-on.png'                                    // Name of the star image on.
 * start:        0                                                // Start with a score value.
 * target:       null                                             // Number of stars to be selected.
 * targetKeep:   false                                            // If the last choose value will be keeped on mouseout.
 * targetType:   'hint'                                           // What display on target element: hint or number.
 * width:        null                                             // The container width of the stars.
 *
 *
 * Usage with default values:
 * --------------------------------------------------------------------------
 *
 * $('#star').raty();
 *
 * <div id="star"></div>
 *
 *
 * $('.group').raty();
 *
 * <div class="group"></div>
 * <div class="group"></div>
 * <div class="group"></div>
 *
 *
 * Public functions:
 * --------------------------------------------------------------------------
 * You must pass a ID or a class to be the target of the action:
 *
 * $.fn.raty.start(3, '#raty');        // Starting the rating with 3 stars.
 * $.fn.raty.readOnly(true, '.raty');  // Adjusts the ratings for read-only.
 * $.fn.raty.click(2, '#raty');        // Click on the second star.
 * $.fn.raty.cancel('#raty', true);    // Cancel the rating. The second optional parameter enables the click callback.
 *
 */