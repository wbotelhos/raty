# Raty - A Star Rating Plugin

[![CI](https://github.com/wbotelhos/raty/workflows/CI/badge.svg)](https://github.com/wbotelhos/raty/actions)
[![NPM Version](https://badge.fury.io/js/raty-js.svg)](https://badge.fury.io/js/raty-js)
[![Maintainability](https://codeclimate.com/github/wbotelhos/raty.png)](https://codeclimate.com/github/wbotelhos/raty)
[![Sponsor](https://img.shields.io/badge/sponsor-%3C3-green)](https://www.patreon.com/wbotelhos)

## Rails Rating?

This is **Rating**: https://github.com/wbotelhos/rating :star:

## Usage with Image

- jquery.raty.js
- star-off.png
- star-on.png

```html
<script src="jquery.raty.js"></script>

<div></div>
```

```js
$('div').raty();
```

## Usage with Font

- jquery.raty.js
- jquery.raty.[eot|svg|ttf|woff]
- jquery.raty.css

```html
<link rel="stylesheet" href="jquery.raty.css">
<script src="jquery.raty.js"></script>

<div></div>
```

```js
$('div').raty({ starType: 'i' });
```

## Options

| Property       | Default                                        |Description                                                      |
|----------------|------------------------------------------------|-----------------------------------------------------------------|
|`cancelButton`  |`false`                                         |Creates a cancel button to cancel the rating.                    |
|`cancelClass`   |`'raty-cancel'`                                 |Name of cancel's class.                                          |
|`cancelHint`    |`'Cancel this rating!'`                         |The cancel's button hint.                                        |
|`cancelOff`     |`'cancel-off.png'`                              |Icon used on active cancel.                                      |
|`cancelOn`      |`'cancel-on.png'`                               |Icon used inactive cancel.                                       |
|`cancelPlace`   |`'left'`                                        |Cancel's button position.                                        |
|`click`         |`undefined`                                     |Callback executed on rating click.                               |
|`half`          |`false`                                         |Enables half star selection.                                     |
|`halfShow`      |`true`                                          |Enables half star display.                                       |
|`hints`         |`['bad', 'poor', 'regular', 'good', 'gorgeous']`|Hints used on each star.                                         |
|`iconRange`     |`undefined`                                     |Object list with position and icon on and off to do a mixed icons|
|`iconRangeSame` |`false`                                         |All icons prior to selection will be the same as the selection.  |
|`mouseout`      |`undefined`                                     |Callback executed on mouseout.                                   |
|`mouseover`     |`undefined`                                     |Callback executed on mouseover.                                  |
|`noRatedMsg`    |`'Not rated yet!'`                              |Hint for non rated elements when it's readOnly.                  |
|`number`        |`5`                                             |The number of stars that will be presented.                      |
|`numberMax`     |`20`                                            |Max number of stars star the option number will create.          |
|`path`          |`undefined`                                     |A global path where the icon will be found.                      |
|`precision`     |`false`                                         |Enables the selection of a precise score.                        |
|`readOnly`      |`false`                                         |Turns the rating read-only.                                      |
|`round`         |`{ down: .25, full: .6, up: .76 }`              |Includes value attributes to do the score rounding math.         |
|`score`         |`undefined`                                     |Initial rating.                                                  |
|`scoreName`     |`'score'`                                       |Name of the hidden field that holds the score value.             |
|`single`        |`false`                                         |Enables single star selection.                                   |
|`space`         |`true`                                          |Puts space between the icons.                                    |
|`starHalf`      |`'star-half.png'`                               |The name of the half star image.                                 |
|`starOff`       |`'star-off.png'`                                |Name of the star image off.                                      |
|`starOn`        |`'star-on.png'`                                 |Name of the star image on.                                       |
|`target`        |`undefined`                                     |Element selector where the score will be displayed.              |
|`targetFormat`  |`'{score}'`                                     |Template to interpolate the score in.                            |
|`targetKeep`    |`false`                                         |If the last rating value will be kept on mouseout.               |
|`targetScore`   |`undefined`                                     |Score field target avoiding hidden field creation                |
|`targetText`    |`''`                                            |Default text in a target.                                        |
|`targetType`    |`'hint'`                                        |Choose if target will receive a hint or the score number         |
|`starType`      |`'img'`                                         |Element used to represent a star.                                |

## Functions

| Function                                | Description                                               |
|-----------------------------------------|-----------------------------------------------------------|
|`$('div').data('raty).score();`          |Get the current score.                                     |
|`$('div').data('raty).score(number);`    |Set a score.                                               |
|`$('div').data('raty).click(number);`    |Click on a star.                                           |
|`$('div').data('raty).readOnly(boolean);`|Change the read-only state.                                |
|`$('div').data('raty).cancel(boolean);`  |Cancel the rating. The last param force the click callback.|
|`$('div').data('raty).move(number);`     |Move the mouse to the given score point position.          |
