# C-compiler
A bare-bones C compiler built with nodeJS and GNU assembly  
Note that NodeJS v16 is needed along with xxoriso, GNU binutils, and QEMU  

compile with `./compile.sh example.c`

# Special Factors:
This compiler is slightly different than all others, please read this
* Returns statements must have brackets like a function call
* All mathematics equations must be placed in `eq(...)` and are evaluated left-to-right
  * Do not use parenthesis in these equations
  * Currently, multiplication and binary AND is not working
    * `x` can be use in place of a `*` symbol for multiplication however
  * Valid: `jon = eq(bob + 12)`
* Functions can be called with `int *` and do not need to be casted
  * An unlimited number of parameters is also supported
  * Do not worry about editor warnings


---
See notes.txt for things that are not currently working

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
* Math can now be expressed with "eq(...)"

## April 30
* Labels and goto statements

## May 5
* While statements included
* Strings no longer need to be passed with "&"

## May 8
* Pointer parameters
* String literals
* "If" and "If else" statements
* Unlimited amount of indirect references per line

## May 12
* Casting
* Calling functions from pointers

## May 14
* Pointer casting
* String literals with spaces in them
* sizeof
* static allocation "alloc"
