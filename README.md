# C-compiler
A bare-bones C compiler built with nodeJS  
Compiles into GNU assembly and ran independently on a virtual machine  
Note that NodeJS v16 is needed along with xxoriso, GNU binutils, and QEMU  

compile and run with `./compile.bash example.c`
Output assembly will in a file called `code.s`
# Special Features:
This compiler is slightly different than all others, please read this
* Returns statements must have brackets like a function call
  * Unless it is a void function
* All mathematics equations must be placed in `eq(...)` and are evaluated left-to-right in an accumulative manner
  * Do not use parenthesis in these equations
  * For multiplication use `x`
  * For `&` use `AND`
* Functions can be called a pointer (ex. `int *`) and do not need to be casted to a special type
  * An unlimited number of parameters is also supported
  * Do not worry about editor warnings
* Pointers can be operated on without casts
* There is no strict type checking
* There are 3 types:
  * char: `1 byte`
  * short: `2 bytes`
  * int: `4 bytes`

---
See notes.txt for things that are not currently working
---
# More Notes:
* All assembly runs standalone  
* This means I have built my own tty driver, keyboard handler etc.  
* This also means that many functions may not work properly  
* However, you can always make your own drivers
* Feel free to look into `CCompiler/BODY/data.s` or [here](https://wiki.osdev.org/Main_Page)
  * The libraries in place are old and *extremely* inefficient
  * A sample vga driver I have been working on can be found in `CCompiler/vga.c`
  * I have written new ones which can be found [here](https://github.com/FISHARMNIC/AssemblyOS/tree/main/BODY/libs)

# Changelog - 2022
## April 24
* First stge of the compiler is up and running
* Definition of variables, pointers, buffers, etc.

## April 27
* Functions with return types and parameters
* stdout is fully functional

## April 29
* Pointers fixed
* Pointer type arrays
* Math can now be expressed with `eq(...)`

## April 30
* Labels and goto statements

## May 5
* While statements included
* Strings no longer need to be passed with `&`

## May 8
* Pointer typed parameters
* String literals
* `If` and `If else` statements
* Unlimited amount of indirect memory references per line

## May 12
* Casting
* Calling functions from pointers

## May 14
* Pointer casting
* String literals with spaces in them
* sizeof
* static allocation `alloc(type, size)`

## July 6
* Fixed pointer casting
* Fixed crash on divide/remainder
* Allows indirect values on variable init

## July 7
* `&` now supported in `eq()` as `AND`
* Early returns
* Indirect array modification
* New precompiler/preprocessor
* `#define` replacement macros
* Comments with `//`

## July 9
* Reworked normal replacement macros
* Macros with parameters
