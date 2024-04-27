# Raty - A Star Rating Plugin.

[![Tests](https://github.com/wbotelhos/raty/workflows/Tests/badge.svg)](https://github.com/wbotelhos/raty/actions/workflows/tests.yml)
[![NPM Version](https://badge.fury.io/js/raty-js.svg)](https://badge.fury.io/js/raty-js)
[![Maintainability](https://api.codeclimate.com/v1/badges/e152fa0075358ae855f1/maintainability)](https://codeclimate.com/github/wbotelhos/raty/maintainability)
[![Sponsor](https://img.shields.io/badge/sponsor-%3C3-green)](https://github.com/sponsors/wbotelhos)

## Rating for Rails?

It's **Rating**: https://github.com/wbotelhos/rating :star:

## Help

- Check the [Tutorial](https://github.com/wbotelhos/raty/blob/main/tutorial.md) to learn about all available features.
- If you're migrating from `v3` to `v4` check the [Upgrade](https://github.com/wbotelhos/raty/blob/main/UPGRADE.md) document.

## Usage with Image

- raty.js
- star-off.png
- star-on.png

```html
<script src="raty.js"></script>

<div data-raty></div>
```

```js
const raty = new Raty(document.querySelector('[data-raty]'));

raty.init();
```

## Usage with Font

- raty.css
- raty.[eot|svg|ttf|woff]
- raty.js

```html
<link rel="stylesheet" href="raty.css">

<script src="raty.js"></script>

<div data-raty></div>
```

```js
new Raty(document.querySelector('[data-raty]'), { starType: 'i' });
```

## Options

| Property      | Default                                        |Description                                                      |
|---------------|------------------------------------------------|-----------------------------------------------------------------|
|`cancelButton` |`false`                                         |Creates a cancel button to cancel the rating.                    |
|`cancelClass`  |`'raty-cancel'`                                 |Name of cancel's class.                                          |
|`cancelHint`   |`'Cancel this rating!'`                         |The cancel's button hint.                                        |
|`cancelOff`    |`'cancel-off.png'`                              |Icon used on active cancel.                                      |
|`cancelOn`     |`'cancel-on.png'`                               |Icon used inactive cancel.                                       |
|`cancelPlace`  |`'left'`                                        |Cancel's button position.                                        |
|`click`        |`undefined`                                     |Callback executed on rating click.                               |
|`half`         |`false`                                         |Enables half star selection.                                     |
|`halfShow`     |`true`                                          |Enables half star display.                                       |
|`hints`        |`['bad', 'poor', 'regular', 'good', 'gorgeous']`|Hints used on each star.                                         |
|`iconRange`    |`undefined`                                     |Object list with position and icon on and off to do a mixed icons|
|`iconRangeSame`|`false`                                         |All icons prior to selection will be the same as the selection.  |
|`mouseout`     |`undefined`                                     |Callback executed on mouseout.                                   |
|`mouseover`    |`undefined`                                     |Callback executed on mouseover.                                  |
|`noRatedMsg`   |`'Not rated yet!'`                              |Hint for non rated elements when it's readOnly.                  |
|`number`       |`5`                                             |The number of stars that will be presented.                      |
|`numberMax`    |`20`                                            |Max number of stars star the option number will create.          |
|`path`         |`undefined`                                     |A global path where the icon will be found.                      |
|`precision`    |`false`                                         |Enables the selection of a precise score.                        |
|`readOnly`     |`false`                                         |Turns the rating read-only.                                      |
|`round`        |`{ down: .25, full: .6, up: .76 }`              |Includes value attributes to do the score rounding math.         |
|`score`        |`undefined`                                     |Initial rating.                                                  |
|`scoreName`    |`'score'`                                       |Name of the hidden field that holds the score value.             |
|`single`       |`false`                                         |Enables single star selection.                                   |
|`space`        |`true`                                          |Puts space between the icons.                                    |
|`starHalf`     |`'star-half.png'`                               |The name of the half star image.                                 |
|`starOff`      |`'star-off.png'`                                |Name of the star image off.                                      |
|`starOn`       |`'star-on.png'`                                 |Name of the star image on.                                       |
|`target`       |`undefined`                                     |Element selector where the score will be displayed.              |
|`targetFormat` |`'{score}'`                                     |Template to interpolate the score in.                            |
|`targetKeep`   |`false`                                         |If the last rating value will be kept on mouseout.               |
|`targetScore`  |`undefined`                                     |Score field target avoiding hidden field creation                |
|`targetText`   |`''`                                            |Default text in a target.                                        |
|`targetType`   |`'hint'`                                        |Choose if target will receive a hint or the score number         |
|`starType`     |`'img'`                                         |Element used to represent a star.                                |

## Functions

To call some function, first, save the Raty instance on a variable and then call the functions:

```js
var raty = new Raty(document.querySelector('[data-raty]'));
```

| Function               | Description                                               |
|------------------------|-----------------------------------------------------------|
|`raty.score()`          |Get the current score.                                     |
|`raty.score(number)`    |Set a score.                                               |
|`raty.click(number)`    |Click on a star.                                           |
|`raty.readOnly(boolean)`|Change the read-only state.                                |
|`raty.cancel(boolean)`  |Cancel the rating. The last param force the click callback.|
|`raty.move(number)`     |Move the mouse to the given score point position.          |

## Build

```sh
gulp 'amd'
gulp 'umd'
gulp 'commonjs'
gulp 'systemjs'
gulp 'es6'
gulp 'es5'
gulp 'es5-test'
```
