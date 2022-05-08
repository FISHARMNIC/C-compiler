/*
************************************************************************
A middleware library connecting my basic i/o library with this compiler
************************************************************************
*/

# **************************** Stack Frame Handler ****************************
FRAME_OFFSET = 20

.include "../BODY/data.s"

.macro _shift_stack_left_
    mov _stack_d1_, %esp # duplicate the current pos
    mov %esp, _stack_d2_ # duplicate the stack frame
.endm

.macro _shift_stack_right_
    mov _stack_d2_, %esp # duplicate the current pos
    mov %esp, _stack_d1_ # go back to the original base
.endm

jmp _escape_lib_
# **************************** Middleware Functions ****************************

# ************* Output *************
# prints a number on the screen after reading it from the stack
put_int:
    _shift_stack_right_
    pop %edx# for later use 
    put_register %edx
    _shift_stack_left_
    ret

# prints a character on the screen after reading it from the stack
put_char:
    _shift_stack_right_
    pop %edx
    _put_char %dl
    _shift_stack_left_
    ret

# prints a series of characters until NULL from a base addres passed on the stack
put_string:
    _shift_stack_right_
    pop %edx
    mov %eax, %edx

    mov %edx, _lineNumber
    mov %esi, 0
    
    call put_string_start

    _shift_stack_left_
    ret

# ************* Input *************
get_char:
get_string:
get_int:
    
# Freezes the computer and shows all registers and the current stack frame
halt:
    _shift_stack_right_

    _put_char 'a'
    _put_char ' '
    put_register %eax
    new_line

    _put_char 'b'
    _put_char ' '
    put_register %ebx
    new_line

    _put_char 'c'
    _put_char ' '
    put_register %ecx
    new_line

    _put_char 'd'
    _put_char ' '
    put_register %edx
    new_line

    new_line
    _put_char 's'
    _put_char ' '
    put_register %esp
    new_line

    _put_char '1'
    _put_char ' '
    put_int _stack_d1_
    new_line

    _put_char '2'
    _put_char ' '
    put_int _stack_d2_
    new_line
    hlt
    _shift_stack_left_
    ret
# ------------------ ENDF ------------------
_escape_lib_:
