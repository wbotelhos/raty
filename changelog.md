## v4.3.0

### Update

- Adds missing builded files
- Updates UPGRADE.md guide by [markvantilburg](https://github.com/markvantilburg)

## v4.2.0

### Update

- Drops Jasmine and Karma in favor of Jest and JSDOM; [#242](https://github.com/wbotelhos/raty/pull/242) by [bukhtiyarov-a-v](https://github.com/bukhtiyarov-a-v)
- Updates the README; [#245](https://github.com/wbotelhos/raty/pull/245) by [Jaskaran-Techno](https://github.com/Jaskaran-Techno)
- Drops jQuery from tests and so from the entire project; [#246](https://github.com/wbotelhos/raty/pull/246) by [bukhtiyarov-a-v](https://github.com/bukhtiyarov-a-v)
- Fixes error when `half` option is `true`; [#249](https://github.com/wbotelhos/raty/pull/249) by [fono09](https://github.com/fono09)

### Bugfix

- Adds TypesScript Types; [#241](https://github.com/wbotelhos/raty/pull/241) by [Fyzu](https://github.com/Fyzu)

## v4.1.0

### News

- Adds TypesScript Types; [#241](https://github.com/wbotelhos/raty/pull/241) by [Fyzu](https://github.com/Fyzu)

## v4.0.0

### Break Change

- The jQuery dependency was dropped, so the syntax to start Raty was changed, check the [UPGRADE.md](https://github.com/wbotelhos/raty/blob/main/UPGRADE.md);
- The global configuration `$.raty.option = 'value'` was removed;
- The callback `click`, `mouseover` and `mouseout` now has the `this` scope being the `Raty` class instance and the following arguments: `score, element, event`;
- The callback `number`, `readOnly`, `score`, `scoreName`, `target`, and `path`, now has the `this` scope being the `Raty` class instance and the single argument: `element`;
- The functions now is called from the `Raty` instance;
- When `click` **function** is called, we don't really have an original event, so instead to receive a fake event `new Event('click')`, an `undefined` value is provided.

### Update

- The read only function now uses `pointerEvents` over unbind the listeners;

## v3.1.1

### Bugfix

- Fix invalid Bower JSON; [#232](https://github.com/wbotelhos/raty/pull/232) by [Nimmer](https://github.com/Nimmer)

## v3.1.0

### News

- Adds `iconRangeSame` option where the previous stars will be the same as the selected one; [#135](https://github.com/wbotelhos/raty/issues/135) by [viniciusjl](https://github.com/viniciusjl)

### Update

- Adds CSS, Images and Fonts to Bower; [#161](https://github.com/wbotelhos/raty/pull/161) by [juriejan](https://github.com/juriejan)

## v3.0.0

### Break Change

- Function `destroy` was removed;
- Function `reload` was removed;
- Function `set` was removed;
- Functions now is accessed via `element.data('raty').FUNCTION_NAME()`;
- Option `cancel` was renamed to `cancelButton`;

### Bugfix

- When using `single` options the click was not turning the star on; [#155](https://github.com/wbotelhos/raty/pull/155) by [henrikhannemose](https://github.com/henrikhannemose)

### Update

- Grammars fixes; [#217](https://github.com/wbotelhos/raty/pull/217) by [tfantina](https://github.com/tfantina)
- All the code were migrated to pure Prototype. Vanilla JS coming soon!;

## v2.9.0

### Update

+ Drops `engines` from `package.json` for a greater flexibility;

## v2.8.0

### News

+ Add support to configure options via `$.data()`;

## v2.7.1

### Bugfix

+ Fix `readOnly` when using fonts; (Amaia Baigorri)

### News

+ Added Bower package; (yadhu)
+ Added `path` options as callback; (tyler-king)

## v2.7.0

### Bugfix

+ Function `move` was losing precision with float with more then one digit;
+ Function `move` was losing the saved `options` data;
+ With `half` enable, mousemove was not changing to full star after 0.5 point;
+ With `half` enable, score field was receiving precision value. (reported by hoangnham01)

### Update

+ If you returns `false` into `click` callback, the action will be prevented;
+ When `precision` is on it won't force `targetType` to be `score` anymore.

### News

+ Added support to float `hints`;

## v2.6.0

### Bugfix

+ Target was not showing the score when `half` was enabled; (andersonba)
+ Fixed some JS Lint warnings; (Qazzian)
+ Cancel button `mouseleave` must yiels no score as `undefined` not `null`;
+ The `numberMax` now sets the stars between 1...`numberMax` instead 0...`numberMax`.

### Update

+ `path` now is `undefined` by default;
+ The {score} placeholder on `targetFormat` option is no longer mandatory;
+ On `click` method, if click callback is not defined, it will be ignore instead of throw error;
+ Option `size` was removed! Raty will discover it;
+ Option `width` was removed! It is a bad idea force a width on this responsive days. Try `inline-block` for fit.

### News

+ Added option `targetScore` to choose where the score will be setted; (byhoratiss)
+ Added function `move` to move the cursor through stars;
+ Put the library over Travis Continuous Integration; (danielpsf)
+ Added option `starType` to be possible change from image to other element like `i` and use font to render the stars;
+ Option `target` accepts callback;
+ Added option `cancelClass` to choose the class name for cancel button.

## v2.5.2

### Bugfix

The read-only indicator was not removing after the reset of configuration, blocking the `click` and `score` functions.

## v2.5.1

### News

+ Added function `destroy` to rollback to original object before the bind;
+ Added option `mouseout` to handle things on mouse out;
+ The `number` option can be setted via callback; (muratguzel)
+ The `readOnly` and `scoreName` option can be setted via callback; (aprimadi)
+ You can avoid the width style setting the option `width` to false.

### Update

+ Extracted the limit of stars to the option `numberMax`;
+ The `hints` options can receives three values:
  - empty string: receives an empty string as hint;
  - null: receives the score value as hint;
  - undefined: receives the default hint.
+ The `noRatedMsg` option value was change to "Not rated yet!";
+ The `score` argument of `click` callback now is number instead string;
+ The `score` argument of `mouseover` callback now is number instead string;
+ The option `mouseover` no longer will trigger on mouseout. Use `mouseout`;
+ When `precision` is enabled, `half` becomes enabled and `targetType` is changed to 'score';
+ When `readOnly` is true, the cursor style will be removed instead to use the default.

### Bugfix

+ The `click` function was not yielding the event.
+ The `path` always was prepend avoiding absolute or different path for each icon;
+ The `readOnly` function no more unbinds external binds;
+ The `readonly` was not removed on readOnly becames disabled;
+ The `reload` function now is chainable;
+ The `set` function now is chainable.
+ The `targetKeep` was keepping the template even without score;

## v2.4.5

+ Now the error messages is displayed in place of stars to be more visible;
+ Fixed the 'score' function to handle undefined score when we have no vote;
+ Fixed the mouseover function to handle undefined score when we have no vote;
	- For cancel button we get 'null' to know when mouse over it;
+ Fixed multiple mouseout actions on cancel function and mouseout bind;
+ Fixed functions that was not applying not continuing to apply if someone was invalid;
+ Fixed the flag that indicates read-only or not.

## v2.4.0

+ Added the function 'reload' to reload the rating with the current configuration;
+ Added the function 'set' to reload the rating applying new configurations;
+ Added the option 'mouseover' to handle a callback on mouseover the stars; (packowitz)
+ Fixed error when 'start' options receives a string number (eskimoblood);
+ Fixed multiples events when readOnly is applied more then time by public function; (janapol)
+ Now attribute 'hintList' is called just of 'hints';
+ Now attribute 'start' is called as 'score' to make more sense;
+ Now the method 'start' is called as 'score' too.

## v2.1.0

+ Now Raty keeps the state of the elements and no longer depends on ID for each one:
	- The score no longer has ID;
	- The stars images no longer has ID;
	- The stars images no longer has class.
+ Added function 'score' to recover the current score.

## v2.0.0

+ Added option 'halfShow' to just display and separate from the option to vote 'half';
+ Added option 'targetText' to choose default value when there is no score or targetKepp is off;
+ Added option 'precision' to be able rating with precision values, without star representation;
+ Added option 'space' to be able take off the spaces between the star;
+ Added option 'round' to customize the visual rounding of values;
+ Added option 'targetFormat' to customize the target with a template;
+ Added option 'single' to present only the selected star; (suggestion by newcube)
+ Fixed bug in IE 7 that returns void instead undefined when there is no an attribute;
+ Fixed bug that not set custom width when 'readOnly' is enabled;
+ Fixed bug that not set back the hints after disable read only option;
+ Fixed bug that not create cancel button when starts with 'readOnly';
+ Fixed the function cancel() to set the right hint on target score;
+ Fixed the functions start() and click() to set the value on target when 'target' option is enabled;
+ Fixed the functions start() and click() not to be executed when 'readOnly' is enabled;
+ Fixed the 'target' option to work with 'half' and 'precision' option;
+ Fixed the index number given to Raty binded by class without id; ("Remember me, please?")
+ Refactored the code to make it cleanner and faster;
+ Changed the class of the cancel button to 'raty-cancel' to avoid CSS conflicts;
+ Now is possible to use 'start' option as callback function to get start value; (hpgihan)
+ Now the scope of click callback is the raty element as DOM, not jQuery selection, to follow the usual;
+ Now the field score is set to readonly when 'readOnly' is enabled;
+ Now attribute 'iconRange' is represented as a list of object with option to choose starOn and starOff;
+ Now we using the best pratice to build the plugin;
+ Now the plugin is under test with Jasmine and Jasmine jQuery.

## v1.4.3

+ Now public function return the context to be able the chaining;
+ Fixed: the option 'readOnly' brokes the plugin;
+ Prevented the processing of the set of classes in public function.

## v1.4.0

+ Added attribute 'target' to choose a element to display the score when the mouse is on the star;
+ Added attribute 'targetKeep' to keep the selected value on the target element;
+ Added attribute 'targetType' to choose what display in the target element: hint or number;
+ New function called $.fn.raty.cancel() to cancel the rating;
+ Now the action of cancel removes the score value instead set it to zero;
+ Using mouseover when the half star is disabled to avoid to waste actions trigger;
+ Now is possible pass a empty string in the $.fn.raty.start() to cancel the rating;
+ Public functions without specify ID or class is no longer supported.

## v1.3.3

+ Fixed the icon presentation when the start attribute is setted and the iconRange is enabled;
+ Now the click function receives the event as argument. (Eric Wendelin)

## v1.3.2

+ Fixed: the last Raty configuration will not be applied in others targets Raty anymore;
+ Now is possible to use the element as identifier like div.star on direct actions.

## v1.3.0

+ Added attribute size for to choose the size of the icons that will be used;
+ Added attribute width for to choose the container width of the stars;
+ Changed the name of the attribute showCancel to just cancel.

## v1.2.1

+ Fixed half star when click function is enabled.

## v1.2.0

+ Added support to half star selection;
+ Changed the name of the attribute onClick to just click;
+ Changed the name of the attribute showHalf to half, because of the selection support.

## v1.0.1

+ Fixed the ID's auto generation to work in IE6 and IE7.

## v1.0.0

+ Now you can pass a optionally ID or a class to be the target of the public function's actions;
+ Fixed the read-only that wasn't begin applied by the public function readOnly.

## v0.9

+ Improved the selector to accept bind by class name;
+ Now if you don't pass a ID for the element, then it will be created;
+ Now the hint list will be applied even if the quantity are less than the stars.

## v0.8

+ Added iconRange attribute. Now you can set custom icons for especific ranges;
+ Fixed the cancel button that didn't hidden when using the public function readOnly.

## v0.7

+ Added noRatedMsg attribute. A hint for no rated elements when it's read-only;
+ Avoided negative star number in public function start;
+ Avoided a number bigger than the number of star in public function start;
+ Fixed the public function start when the star are read-only and is not passed a start value;
+ Fixed the half star function on it is made by public function start.

## v0.6

+ Now you can use the key "this" to refer the star element itself in the onClick handler;
+ Fixed the reference context when using public functions or local functions;
+ When the stars are read-only, all titles are transformed in the corresponding title score;
+ Avoided negative star number;
+ Avoided more than 20 stars. But it's can be changed in the script if you need.

## v0.5

+ Now you can put a cancel button to cancel your rating;
+ Choose the cancel image off;
+ Choose the cancel image on;
+ Choose the left or right side position for the cancel button;
+ Change the hint of the cancel button.

## v0.4

+ Added support to display half star.

## v0.3

+ Fixed some mistakes to work on IE browser.

## v0.2

+ Added the public function click, that do the click on a star;
+ Was removed the execution of the onClick when used the function start;
+ Added onClick function that enable a callback when a star is clicked.

## v0.1

+ Change the path of images;
+ Change the name image files;
+ Choose the number of stars that will be presented;
+ Choose a hint information of each star;
+ Start with a default score;
+ Set the stars read-only;
+ Choose the name of the hidden score field.
