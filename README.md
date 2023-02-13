# A light toolkit library to do useful things.
UtilKit is designed to make it simple to do things that JS makes complicated.
Each function is chosen for a reason and designed specifically to make JS more pleasing to use.

## Installation:
It's pretty simple!
```bash
npm install utilkit
```

## Usage
UtilKit usage is slightly different than most `node` modules.

> **Warning**
> This module doesn't work with the `Bun` runtime as of now.

To use, put this at the top of your JS code:
```javascript
require("utilkit")();
```
Now, you can use all of the functions as if they were native functions:
```javascript
console.log(len("Hello, world!")) // len() is a utilkit function
```

Internally, when you are requiring, it returns this callback for the `len()` function:
(Assume that `len()` has already been implemented in this code, and that it takes in one `obj` parameter)
```javascript
module.exports = function () {
    this.len = (obj) => len(obj)
}
```
The reason this works is that when in a local funciton, `node` allows any method in  `this` to be executed normally outside as a function.

This allows the UtilKit functions to feel native. All it takes is one line of code!

Is this implementation of UtilKit safe?
Short Answer: Mostly, as long as you put it last in your dependency list.
<details>
  <summary>Here's why...</summary>
  
  Javascript has a grand total of 6 top-level functions:

| **Function Name** | **Description**                                                |
|-------------------|----------------------------------------------------------------|
| print             | Prints a string to the log file.                               |
| _dump             | Prints the string representation of an object to the log file. |
| eval              | Evaluates an expression or statements.                         |
| isNaN             | Evaluates an argument to determine if it is not a number.      |
| parseFloat        | Parses a string argument and returns a floating-point number.  |
| parseInt          | Parses a string argument and returns an integer.               |
	
All other functions are bundled under certain objects, like `console.log()` and others. Because theses methods are constantly modified and added in new releases, it is one reason why extending prototypes can be dangerous. However, the limited amount of top-level functions should make UtilKit safer. 
	
Thus, we can pretty much assume that these functions would never be added to or changed.
Because of this, UtilKit's implementation of injecting native functions **should** be safe for most of the time. *However, I do not guarentee it will be for all the time to come.*

Another risk that may happen is that functions implemented in UtilKit are used by some of your other dependencies. Because of the way `node` is structured and the way that UtilKit is implemented, your using the same function name as UtilKit in another dependency will cause conflicts. However, if you put it last, your code should be perfectly fine.

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
