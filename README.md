# TypeMate
TypeMate is a little JavaScript module that fixes your typesetting woes automatically. Right now it only fixes orphans, but the plan is to add more filters in the future that fix other typesetting issues such as line-length.

## Getting started

Install it as a dependancy with npm:

```bash
npm install typemate
```

Then import it:

```javascript
import TypeMate from 'typemate';
```

At its most basic level, we create `TypeMate` instance and it'll look for all of the `<p>` elements on your page.

```javascript
const typeMateInstance = new TypeMate();

// Run it
typeMateInstance.apply();
```

You can also pass it a parent element to work with. This is really useful if you only want TypeMate to focus on a particular element, such as an article. 

Take this markup sample: 

```html
<article id="content">
    <p>Etiam porta sem malesuada magna mollis euismod.</p>
</article>
```

We can target that particular article's content like so: 

```javascript
const articleElement = document.getElementById('content');
const typeMateInstance = new TypeMate(articleElement);

// Run it
typeMateInstance.apply();
```

Now, only that `<p>` element within `article#content` will be affected by TypeMate.

## Settings
You can pass an object of settings as the second parameter when you construct TypeMate. Using the instantiation example from above, we'll add some settings like so:

```javascript
const articleElement = document.getElementById('content');
const typeMateInstance = new TypeMate(articleElement, { selector: 'h2, p' });

// Run it
typeMateInstance.apply();
```

That settings object now allows `<h2>` elements within `article#content` to be processed by TypeMate.

### Settings reference

| Property      | Type   | Description                              | Default Value                       |
| ------------- | ------ | ---------------------------------------- | ----------------------------------- |
| `minWords`    | Number | The minimum amount of words that have to be present in an element's content before TypeMate will process it | 4                                   |
| `selector`    | String | The selector string that's passed to `querySelectorAll` | 'p'                                 |
| `ignoreClass` | String | The CSS class that can be added to an element to mark itself as ignorable to TypeMate | 'js&#8288;-&#8288;typemate__ignore' |
| `ignoreExistingSpaceChars`    | Boolean | Determine if elements should be ignored if they already contain an `&nbsp;` character | false                                 |

## Codepen example

Check out an example of TypeMate over at CodePen: https://codepen.io/hankchizljaw/project/full/ZgpRNy

## Running tests

Tests are defined as simple test cases in `tests.json`.

Each test case can define:

| Key        | Type    | Description                             | Default Value |
| ---------- | ------- | --------------------------------------- | ------------- |
| `parent`   |  String | selector of the parent element to use   | `undefined`   |
| `settings` |  Object | settings object                         |  `null`       |
| `init`     |  String | initial HTML to test against            |               |
| `apply`    |  String | expected HTML after `apply()` is called | `this.init`   |
| `reset`    |  String | expected HTML after `reset()` is called | `this.init`   |

### Using NPM

```bash
npm i
npm run test
```

### Using Yarn

```bash
yarn
yarn test
```

---

Made with ❤️ by [HankChizlJaw](https://twitter.com/hankchizljaw) and [friends](https://github.com/hankchizljaw/typemate/graphs/contributors).