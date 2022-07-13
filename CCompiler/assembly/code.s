
.intel_syntax
.org 0x100
.global _kernel_entry
.section .bss

_auto_0: .fill 50, 4
inputbuffer: .long

.section .data
_return_int_: .long 0
_return_char_: .byte 0
 
_cast_char_: .byte 0
_cast_short_: .short 0
_cast_int_: .long 0

_cast_pointer_char_: .long 0
_cast_pointer_short_: .long 0
_cast_pointer_int_: .long 0

_mathResult: .long 0
__final_message__: .asciz "program exit with code: "


character: .byte 0
number: .int 0

.include "../assembly/lib.s"
.section .text

_kernel_entry:
mov %eax, %esp
sub %eax, 100
mov _stack_d2_, %eax


lea %eax, _auto_0
mov inputbuffer, %eax

_shift_stack_left_
call main
_put_string __final_message__, 1920
put_int _return_int_, 1944
_shift_stack_right_

hlt

main:
_shift_stack_right_

mov %edx, inputbuffer
push %edx

_shift_stack_left_
call gets
_shift_stack_right_


mov %edx, inputbuffer
push %edx

_shift_stack_left_
call put_string
_shift_stack_right_

mov %edx, 0
mov _return_int_, %edx

_shift_stack_left_
ret
# ------ EARLY EXIT FUNCTION ------


_shift_stack_left_
ret
# ------ END FUNCTION ------

