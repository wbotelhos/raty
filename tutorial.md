# Default

You need just to have a `div` to build the Raty.

```html
<div></div>
```

```js
new Raty(document.querySelector('div'));
```

# Score

Used when we want to represent a state.

```js
new Raty(document.querySelector('div'), { score: 3 });
```

# Score callback

If you need the initial score to be based on a dynamic value, you can use a callback for it.
You can pass any value for it, not necessarily a data value, for example, you can use a field value.

```js
new Raty(document.querySelector('div'), {
  score: function() {
    return 2 * 2;
  }
});
```

# Score Name

Changes the name of the hidden [score](#score) field.

```js
new Raty(document.querySelector('div'), { scoreName: 'entity[score]' });
```

# Data Support

You can pass any `data-*` attribute via HTML and Raty will use it as an option.

```html
<div data-read-only="true" data-score="3" data-score-name="teacher[teacher_categories][0][value]"></div>
```

```js
new Raty(document.querySelector('div'));
```

# Number

Changes the number of stars.

```js
new Raty(document.querySelector('div'), { number: 10 });
```

# Number callback

You can receive the [number](#number) of stars dynamic using a callback to set it.

```js
new Raty(document.querySelector('div'), {
  number: function() {
    return 3;
  }
});
```

# Number Max

Change the max number of stars that can be created.

<div id="numberMax"></div>

```js
new Raty(document.querySelector('div'), {
  numberMax: 5,
  number: 100
});
```

# Read Only

You can prevent users from voting. It can be applied with or without a [score](#score).

```js
new Raty(document.querySelector('div'), { readOnly: true, score: 3 });
```

# Read Only callback

You can decide if the rating will be [readOnly](#read-only) dynamically returning `true` of `false` on callback.

```js
new Raty(document.querySelector('div'), {
  readOnly: function() {
    return true;
  }
});
```

# Not Rated Message

If [readOnly](#read-only) is enabled and there is no [score](#score), the [hint](#hint) "Not rated yet!" will be shown for all stars. But you can change it.

```js
new Raty(document.querySelector('div'), {
  readOnly: true,
  noRatedMsg: "I'm readOnly and I haven't rated yet!"
});
```

# Half Show

You can represent a float [score](#score) as a half star icon.
This option is just to **show** the half star. If you want to enable voting with half star, check the option [half](#half).

The `round` options showed below are just for the **icon**, the score remains as a **float**.

## Enabled

The `round` rules are:

- Down: score <= x.25 the star will be rounded down;
- Half: score > x.25 and < x.76 the star will be a half star;
- Up: score >= x.76 the star will be rounded up.

```js
new Raty(document.querySelector('div'), { score: 1.26 });
```

## Disabled

When `halfShow` is disabled, only the option `full` (`.6`) is checked:

- Down: score < x.6 the star will be rounded down;
- Up: score >= x.6 the star will be rounded up;

```js
new Raty(document.querySelector('div'), {
  halfShow: false,
  score: 1.59
});
```

# Round

You can customize the round values of the [halfShow](#half-show) option.
When `halfShow` is enabled, only `down` and `up` is used for round.
You can specify just the attribute you want to change and keep the others as their defaults.

```js
new Raty(document.querySelector('div'), {
  round: { down: .26, up: .76 },
  score: 1.26
});
```

# Half

Enables the half star voting. If you want to vote with more precision than a half value, check the option [precision](#precision).

```js
new Raty(document.querySelector('div'), {
  half: true,
  hints: [
    ['1/2 bad', 'bad'],
    ['1/2 poor', 'poor'],
    ['1/2 regular', 'regular'],
    ['1/2 good', 'good'],
    ['1/2 gorgeous', 'gorgeous'],
  ]
});
```

# Star Half

Changes the name of the half star image.

When you want to specify a different icon with a different directory, you must to set the [path](#path) option to `null` to prepending the star's original path to your path. You will then have to specify all other icons with their explicit original path.

```js
new Raty(document.querySelector('div'), {
  half: true,
  starHalf: 'star-half-mono.png'
});
```

You can change the star icons.

```js
new Raty(document.querySelector('div'), {
  cancelButton: true,
  starOff: 'star-off-big.png',
  starOn: 'star-on-big.png'
});
```

# Click

You can write a callback to handle the [score](#score) and the click `event`.
You can reference the Raty instance using `this`.

```js
new Raty(document.querySelector('div'), {
  click: function(score, element, evt) {
    alert('score:' + score + "\nID: " + element.id + "\nevent: " + evt);
  }
});
```

# Click Prevent

If you return `false` into the callback, the click event will be prevented.

```js
new Raty(document.querySelector('div'), {
  click: function(score, element, evt) {
    alert('Score will not change.')

    return false;
  }
});
```

# Hints

Changes the hint for each star by it position on array.
If you pass `null`, the [score](#score) value of this star will be the hint.
If you pass `undefined`, this position will be ignored and receive the default hint.

```js
new Raty(document.querySelector('div'), { hints: ['a', null, '', undefined, '*_*']});
```

# Path

Changes the path where your icons are located.
Set it only if you want the same path for all icons.
Don't mind about the last slash of the path, if you don't put it, it will be setted for you.

```js
new Raty(document.querySelector('div'), { path: 'assets/images' });
```

Now we have the following full paths: **assets/images/star-on.png**, **assets/images/star-off.png** and so.

# Path Callback

You can set the path dynamically using callback.

```js
new Raty(document.querySelector('div'), {
  path: function() {
    return '/assets/vendor/raty';
  }
});
```

# Star Off and Star On

Changes the icons.

```js
new Raty(document.querySelector('div'), {
  starOff: 'off.png',
  starOn: 'on.png'
});
```

# Cancel Button

Adds a cancel button on the left side of the stars to cancel the [score](#score).
Inside the [click](#click) callback the argument code receives the value `null` when we click on the cancel button.

```js
new Raty(document.querySelector('div'), { cancelButton: true });
```

# Cancel Button Hint

Like the stars, the [cancelButton](#cancel-button) button has a hint, and you can change it.

```js
new Raty(document.querySelector('div'), {
  cancelButton: true,
  cancelHint: 'My cancel hint!'
});
```

# Cancel Button Place

Changes the [cancelButton](#cancel-button) button to the right side.

```js
new Raty(document.querySelector('div'), {
  cancelButton: true,
  cancelPlace: 'right'
});
```

# Cancel off and Cancel On

Changes the on and off icon of the [cancel](#cancel) button.

```js
new Raty(document.querySelector('div'), {
  cancelButton: true,
  cancelOff: 'cancel-off.png',
  cancelOn: 'cancel-on.png'
});
```

# Icon Range

Is an array of objects where each one represents a custom icon.
The `range` attribute is where the icon will be displayed (out of the five stars).
The `on` attribute is the active icon when hovering.
The `off` attribute is the default icon.

<div id="iconRange"></div>

```js
new Raty(document.querySelector('div'), {
  iconRange: [
    { range: 1, on: '1.png', off: '0.png' },
    { range: 2, on: '2.png', off: '0.png' },
    { range: 3, on: '3.png', off: '0.png' },
    { range: 4, on: '4.png', off: '0.png' },
    { range: 5, on: '5.png', off: '0.png' }
  ]
});
```

You can use an interval of the same icon jumping some number.
The `range` attribute must be in ascending order.
If the value `on` or `off` is omitted then the attribute `starOn` and `starOff` will be used.

```js
new Raty(document.querySelector('div'), {
  starOff: '0.png',

  iconRange: [
    { range: 1, on: '1.png' },
    { range: 3, on: '3.png' },
    { range: 5, on: '5.png' }
  ]
});
```

Now we have all off icons as **0.png**, icons 1 and 2 as **1.png**, icon 3 as **3.png** and icons 4 and 5 as **5.png**.

# Icon Range Same

If you want to use the same icon as the selection in the prior icons, just enable this option.

```js
new Raty(document.querySelector('div'), {
  iconRange: [
    { range: 1, on: '1.png', off: '0.png' },
    { range: 2, on: '2.png', off: '0.png' },
    { range: 3, on: '3.png', off: '0.png' },
    { range: 4, on: '4.png', off: '0.png' },
    { range: 5, on: '5.png', off: '0.png' }
  ],

  iconRangeSame: true
});
```

# Target

Element to display the [hints](#hints) or the [cancelButtonHint](#cancel-button-hint).

```js
new Raty(document.querySelector('div'), {
  cancelButton: true,
  target: '[data-hint]'
});
```

Your target can be a `div`.

```html
<div data-hint></div>
```

Your target can be a `text` field.

```html
<input data-hint type="text" />
```

Your target can be a `textarea`.

```html
<textarea data-hint></textarea>
```

Your target can be a `select`.

```html
<select data-hint>
  <option value="">--</option>
  <option value="bad">bad</option>
  <option value="poor">poor</option>
  <option value="regular">regular</option>
  <option value="good">good</option>
  <option value="gorgeous">gorgeous</option>
</select>
```

# Target Type

You can choose `hint` or `score`:
If you choose to see the [score](#score) instead of the [hints](#hints) using the value `score` you will get the numerical value of the star.

For the [cancelButton](#cancel-button) the value is empty.

```js
new Raty(document.querySelector('div'), {
  cancelButton: true,
  target: '[data-hint]',
  targetType: 'score'
});
```

# Target Keep

If you want the [score](#score) to remain in the hint box after providing the rating, turn on this option.

```js
new Raty(document.querySelector('div'), {
  cancelButton: true,
  target: '[data-hint]',
  targetKeep: true
});
```

# Target Text

[Target](#target-div) will clear if you don't use the [targetKeep](#target-keep) option, after rolling the mouse away from the ratings. If you want a message to show by default you can use this option.

```js
new Raty(document.querySelector('div'), {
  target: '[data-hint]',
  targetText: '--'
});
```

# Target Format

You can choose a template to be merged with your hints and displayed in the [target](#target-div).

```js
new Raty(document.querySelector('div'), {
  target: '[data-hint]',
  targetFormat: 'Rating: {score}'
});
```

# Target Score

You can keep the score value inside the element, by default, or choose where to put it.
If you change the score target, the default score field won't be created.
It's not a [target](#target-div) option for display only, it's the real current score data.

```js
new Raty(document.querySelector('div'), {
  targetScore: '[data-target]'
});
```

# Mouseover

You can handle events on mouseover.
The arguments are the same as in the [click](#click) callback.
The options [target](#target-div), [targetFormat](#target-format), [targetKeep](#target-keep), [targetText](#target-text) and [targetType](#target-type) are abstractions of this callback. You can do it by yourself.

```js
new Raty(document.querySelector('div'), {
  mouseover: function(score, element, evt) {
    alert('score: ' + score + "\nID: " + element.id + "\nevent: " + evt);
  }
});
```

# Mouseout

You can handle the action on mouseout.
The arguments is the same of the [mouseover](#mouseover) callback.

```js
new Raty(document.querySelector('div'), {
  mouseout: function(score, element, evt) {
    alert('score: ' + score + "\nID: " + element.id + "\nevent: " + evt);
  }
});
```

# Precision

You can get the exact position of the cursor to get a precise [score](#score).
The score is still represented in full and half stars, but the [score](#score) is saved as a float.
When you enable this option the [half](#half) option is automatically enabled and [targetType](#target-type) is changed to `score`.

```js
new Raty(document.querySelector('div'), {
  cancelButton: true,
  cancelOff: 'cancel-off.png',
  cancelOn: 'cancel-on.png',
  path: 'raty/demo/images',
  starHalf: 'star-half.png',
  starOff: 'star-off.png',
  starOn: 'star-on.png',
  target: '#precision-hint',
  targetKeep: true,

  precision: true
});
```

# Space

You can remove excess space between stars.

```js
new Raty(document.querySelector('div'), { space: false });
```

# Single

With this option, only the overed star will be turned on, the previous will keep as off.

```js
new Raty(document.querySelector('div'), { single: true });
```

# Star Type

Let you to change the star element type. Changing it from `img` to `i`, for example, changes from an image to a glyph. There is a sample stylesheet (`src/raty.css`) using a sample fonts (`src/fonts/raty.[eot|svg|ttf|woff]`).

To be easier to use, we replaced the dot (.) extension to a hyphen (-), so you do not need to change the original names, just set the names to your fonts.

```js
new Raty(document.querySelector('div'), {
  cancelButton: true,
  half: true,
  starType: 'i'
});
```
