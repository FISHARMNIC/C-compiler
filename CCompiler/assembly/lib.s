/*
************************************************************************
A middleware library connecting my basic i/o library with this compiler
************************************************************************
*/

# **************************** Stack Frame Handler ****************************
FRAME_OFFSET = 20

.include "../BODY/data.s"

.section .data
_stack_d1_: .long 0
_stack_d2_: .long 0

.macro _shift_stack_left_
    mov _stack_d1_, %esp # duplicate the current pos
    mov %esp, _stack_d2_ # duplicate the stack frame
.endm

.macro _shift_stack_right_
    mov _stack_d2_, %esp # duplicate the current pos
    mov %esp, _stack_d1_ # go back to the original base
.endm

char_map: .asciz "`^1234567890-=  qwertyuiop[]\  asdfghjkl;' ) zxcvbnm,./      "
keyboard_out: .byte 0

.section .text
jmp _escape_lib_
# **************************** Middleware Functions ****************************

# ************* Output *************

reset_tty:
    movw _lineNumber, 0
    ret

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

    _ps.lp:
        _put_char [%edx]
        inc %edx
        cmpb [%edx], 0
        jne _ps.lp
    _shift_stack_left_
    ret

    //mov %eax, %edx
    // mov %edx, _lineNumber
    // mov %esi, 0
    
    // call put_string_start

    _shift_stack_left_
    ret

# ************* Input *************
read_keyboard:
    xor %eax, %eax
    inb %al, KEYBOARD_PORT # store keycode in al
    mov keyboard_out, %al # save the resulting keycode
    mov _return_int_, %eax
    ret

getc:
    push %ebx
    _getc.ls:
    call read_keyboard
    cmpb keyboard_out, 0 # Read and compare keyboard
    jle _getc.ls # falling edge or no key pressed (-128 -> 0)
    get_char.fe:
    call read_keyboard
    cmpb keyboard_out, 0 
    jge get_char.fe # (0-128) means the key is still being held
    
    sub %al, 128
    subb keyboard_out, 128

    lea %ebx, char_map
    add %ebx, %eax
    xor %eax, %eax
    mov %al, [%ebx]

    mov _return_int_, %eax
    pop %ebx
    ret

gets:
    _shift_stack_right_
    pop %ebx # string addr
    push %eax
        _gets_entry:
            call getc
            // _put_char %al
            mov [%ebx], %al # move into pointer
            inc %ebx
            cmpb keyboard_out, KEY_BACKSPACE
            je _gets_DEL
            _gets_RET:
            cmpb keyboard_out, KEY_ENTER
            jne _gets_entry
        dec %ebx
        movb [%ebx], 0
        pop %eax
         
        _shift_stack_left_
        ret

        _gets_DEL:
            dec %ebx # back to type char
            movb [%ebx], 0 # clear
            dec %ebx # back to char before
            jmp _gets_RET

geti:
    xor %ebx, %ebx # stores number
    xor %ecx, %ecx # incase overflow
    call getc
    mov %al, keyboard_out # convert to number
    dec %al
    mov %bl, %al
    _gi_loop:
        call getc
        cmpb keyboard_out, KEY_ENTER
        je _gi_exit # exit on key enter
        mov %al, keyboard_out # convert to number
        dec %al
        mov %cl, %al # store entered
        mov %eax, 10
        mul %ebx # saved number
        add %eax, %ecx # shift and add
        mov %ebx, %eax
        jmp _gi_loop
    _gi_exit:
    _shift_stack_right_
    pop %edx # get pointer
    mov [%edx], %ebx
    _shift_stack_right_
    ret
    
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
