## From v3 to v4

1. Replace your jQuery selector to a `Raty` instance receiving a DOM element:

```js
// From
$('[data-raty]').raty({ cancel: true });

// To
new Raty(document.querySelector('[data-raty]'), { cancel: true });
```

2. Replace your global configuration to a local configuration:

```js
// From

$.raty.path = 'assets/images';

$('[data-raty]').raty();

// To

new Raty(document.querySelector('[data-raty]'), { path: 'assets/images' });
```

3. Replace the usage of your arguments on `click` callback:

```js
// From

$('[data-raty]').raty({
  click: function(score, evt) {
    var element = this;
  }
});

// To

new Raty(document.querySelector('div'), {
  click: function(score, element, evt) {
    var objectInstance = this;
  }
});
```

4. Replace the usage of your arguments on `mouseover` callback:

```js
// From

$('[data-raty]').raty({
  mouseover: function(score, evt) {
    var element = this;
  }
});

// To

new Raty(document.querySelector('div'), {
  mouseover: function(score, element, evt) {
    var objectInstance = this;
  }
});
```

5. Replace the usage of your arguments on `mouseout` callback:

```js
// From

$('[data-raty]').raty({
  mouseout: function(score, evt) {
    var element = this;
  }
});

// To

new Raty(document.querySelector('div'), {
  mouseout: function(score, element, evt) {
    var objectInstance = this;
  }
});
```

6. Replace the functions call:

```js
// From

$('[data-raty]').data('raty').score();
$('[data-raty]').data('raty').score(number);
$('[data-raty]').data('raty').click(number);
$('[data-raty]').data('raty').readOnly(boolean);
$('[data-raty]').data('raty').cancel(boolean);
$('[data-raty]').data('raty').move(number);

// To

new Raty(document.querySelector('div')).score();
new Raty(document.querySelector('div')).score(number);
new Raty(document.querySelector('div')).click(number);
new Raty(document.querySelector('div')).readOnly(boolean);
new Raty(document.querySelector('div')).cancel(boolean);
new Raty(document.querySelector('div')).move(number);
```
