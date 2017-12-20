# TypeMate
TypeMate is a little JavaScript module that fixes your typesetting woes automatically. Right now it only fixes widows, but the plan is to add more filters in the future that fix other typesetting issues such as line-length (rag).

## Getting started

You can use the dist version of this module by adding it to your page like so: 
```html
<script src="https://cdn.rawgit.com/hankchizljaw/typemate/f48a1e8f/dist/typemate.min.js" async defer></script>
```

You can also install it as a dependancy with npm:

```bash
npm install typemate --save-dev
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

You can also pass it a parent element to work with. This is really useful if you only want typemate to focus on a particular element, such as an article. 

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

Now only that `<p>` element within `article#content` will be affected by TypeMate.

## Settings
You can pass an object of settings as the second parameter when you construct TypeMate. Using the instantiation example from above, we'll add some settings like so:

```javascript
const articleElement = document.getElementById('content', { selector: 'h2, p' });
const typeMateInstance = new TypeMate(articleElement);

// Run it
typeMateInstance.apply();
```

That settings object now allows `<h2>` elements within `article#content` to be processed by TypeMate.

### Settings reference

| Property      | Type   | Description                              | Default Value         |
| ------------- | ------ | ---------------------------------------- | --------------------- |
| `minWords`    | Number | The minimum amount of words that have to be present in an element's content before TypeMate will process it | 4                     |
| `selector`    | String | The selector string that's passed to `querySelectorAll` | 'p'                   |
| `ignoreClass` | String | The CSS class that can be added to an element to mark itself as ignorable to TypeMate | 'js&#8288;-&#8288;typemate__ignore' |

## Codepen example

Check out an example of TypeMate over at CodePen: https://codepen.io/hankchizljaw/full/ae899f4d1f206d1a3231ff0fffb2c436

Made with ❤️ by [HankChizlJaw](https://twitter.com/hankchizljaw).