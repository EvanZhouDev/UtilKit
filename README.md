# A light toolkit library to do useful things.
UtilKit is designed to make it simple to do things that JS makes complicated.
Each function is chosen for a reason and designed specifically to make JS more pleasing to use.



> **Warning**
> This module is still in development, probably not a good idea to use it in production!

## Installation:
It's pretty simple!
```bash
npm install utilkit-js
```

## Installation/Usage
UtilKit usage is slightly different than most `node` modules.

> **Warning**
> This module doesn't work with the `Bun` runtime as of now.

UtilKit is available in many flavors of JS!

There are two ways of usage
1. Inject functions directly into `global` (*Slightly* dangerous; probably safe)
2. Use UtilKit normally under a namespace

Choose your installation here:
* [CJS](#cjs)
	* [Expose Functions to Global](#expose-functions-to-global-for-cjs)
	* [Use Under Namespace](#use-under-namespace-for-cjs)
* [ESM](#esm)
	* [Expose Functions to Global](#expose-functions-to-global-for-esm)
	* [Use Under Namespace](#use-under-namespace-for-esm)
* [Thoughts/Safety about injecting to global and how it works](#thoughts-and-safety-of-injecting-to-global)

### CJS
#### Expose Functions to Global for CJS
To use, put this at the top of your JS code:
```javascript
require("utilkit-js")(global);
```

Now, you can use all of the functions as if they were native functions:
```javascript
console.log(len("Hello, world!")) // len() is a utilkit function
```

#### Use Under Namespace for CJS
To use, put this at the top of your JS code:
```javascript
let utk = require("utilkit-js")();
```

Now, you can use all of the functions like a normal `node` module
```javascript
console.log(utk.len("Hello, world!"))
```

### ESM
#### Expose Functions to Global for ESM
To use, put this at the top of your JS code:
```javascript
import utilkit from "utilkit-js"
utilkit(global);
```

Now, you can use all of the functions as if they were native functions:
```javascript
console.log(len("Hello, world!")) // len() is a utilkit function
```

#### Use Under Namespace for ESM
To use, put this at the top of your JS code:
```javascript
import utilkit from "utilkit-js"
let utk = utilkit();
```

Now, you can use all of the functions like a normal `node` module
```javascript
console.log(utk.len("Hello, world!"))
```

### Thoughts and Safety of Injecting to Global
(+ How it works!)

> TL;DR: Inject to global most of the time, but if you have a specific reason not to, then don't.

#### Why use it? (And why not?)
The pro side of this is the fact that your code will look cleaner, and be shorter.
The con side of this is that it may interfere with other modules and `node` itself.
I'd say that most of the time injecting to global is fine, but in that small percentage of time, UtilKit has you covered with the Use Under Namespace feature.

#### Here's how it works
Internally, when you are requiring/importing, it gives this callback for the `len()` function:
(Assume that `len()` has already been implemented in the UtilKit module code somewhere, and that it takes in one `obj` parameter)
```javascript
module.exports = function (target) {
    target.len = (obj) => len(obj)
}
```
Now, in the client's code, this is written:
```javascript
require("utilkit-js")(global)
```
It simply puts the functions into global so you can use them as if they were just your average function!

This allows the UtilKit functions to feel native. All it takes is one line of code!

So... is injecting to global safe?
Short Answer: It probably should be, but to be safe, put UtilKit last in your dependency list if you're using this method!
<details>
  <summary>Here's why...</summary>  
Javascript itself has a grand total of 6 top-level functions, and `node` does add a few more.

All other functions, however, are bundled under certain objects, like `console.log()` and others. Because theses methods are constantly modified and added in new releases, it is one reason why extending prototypes can be dangerous. However, the limited amount of top-level functions means that they're less likely to be added to. 
	
Thus, we can pretty much assume that these functions would rarely be added to or changed.
Because of this, UtilKit's implementation of injecting native functions **should** be safe for most of the time. *However, I do not guarentee it will be for all the time to come.*

Another thing that may happen is that functions implemented in UtilKit are used by some of your other dependencies. Because of the way `node` is structured and the way that UtilKit is implemented, your using the same function name as UtilKit in another dependency will cause conflicts. However, if you put it last, your code should be perfectly fine.

I do realize that this isn't necessarily an excuse, as all other modules can say "Put my module last!" and it would only work for theirs. However, because I do not know necessarily of other modules that have this implementation, it should be fine for now.
  
</details>


# Functions
All the goodies in UtilKit bundle!

### Length
The built-in length function has some problems, and, surprisingly, most major programming languages don't fix it.
The `len()` function is implemented so that the characters you see in a string is the length you get.
There are also changes for objects!

#### Usage:
The usage is pretty simple:
```javascript
const chalk = require("chalk");

// String w/ Emojis and Escape Codes
len(chalk.blue("👋 Hi!")) // Returns 5 correctly
chalk.blue("👋 Hi!").length // Returns 16 incorrectly

// Numbers
let x = 123; // Also works with BigInts and floats!
len(123) // Returns 3
x.length // Undefined

// Objects
let obj = {
    a: 1,
    b: 2,
    c: 3
}
len(obj) // Returns 3 (number of keys in the object)
obj.length // Undefined

// Arrays
len([1,2,3]) === [1,2,3].length // Still works the same!
```

### Trigonometric Functions
The built-in trig function are pretty simple; they take in the angle in radian and gives you the corresponding value. However, upon plugging in some common values in terms of `Math.PI`, you will notice a problem: there are some floating point errors.
The UtilKit functions fix this.

#### Usage:
Make sure that the pi approximation you use is `Math.PI` specifically. Other approximations may not work.
```javascript
let PI = Math.PI
sin(PI) // 0
Math.sin(PI) // 1.2246467991473532e-16 (VERY close to 0, but not 0?)

cos(PI/2) // 1
Math.cos(PI/2) // 6.123233995736766e-17 (Similar problem)

tan(PI/2) // Error
Math.tan(PI/2) // 16331239353195370 (There is no tangent of 90°)
```
Many floating point errors have been fixed, including tangent of 90° etc.

### `Reverse` and `Reversed`
Reversing anything that isn't a array in JS is a pain.
For an array, you can do `Array.reverse()`. For a string, you have to do `String.split("").reverse().join("")`. UtilKit fixes this.

#### Usage:
Reverse and reversed do essentially the same thing for everything that isn't an array (because arrays pass by reference and everything else passes by value).
`reverse` mutates the array, and `reversed` doesn't.
```javascript
let myArr = [1,2,3]
reverse(myArr) // [3,2,1]
myArr // [3,2,1]

let myArr2 = [1,2,3]
reversed(myArr) // [3,2,1]
myArr // [1,2,3]

reverse("hello") // "olleh"
reverse(123.4) // 4.321
```
