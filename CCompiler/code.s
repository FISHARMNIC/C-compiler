
.intel_syntax
.org 0x100
.global _kernel_entry
.section .bss



.section .data
_return_int_: .long 0
_return_char_: .byte 0
 
_cast_char_: .byte 0
_cast_short: .short 0
_cast_int_: .long 0

_mathResult: .long 0
__final_message__: .asciz "program exit with code: "


_callbackFN_done_: .byte 0
_func_callback_: .int 0
_temp_base_0_: .long 0

.include "../lib.s"
.section .text

_kernel_entry:
mov %eax, %esp
sub %eax, 100
mov _stack_d2_, %eax


_shift_stack_left_
call main
_put_string __final_message__, 1920
put_int _return_int_, 1944
_shift_stack_right_

hlt

callbackFN:
_shift_stack_right_
pop %edx
mov _callbackFN_done_, %dl

mov %edx, _callbackFN_done_
push %edx

_shift_stack_left_
call put_char
_shift_stack_right_


_shift_stack_left_
ret
# ------ END FUNCTION ------

func:
_shift_stack_right_
pop %edx
mov _func_callback_, %edx

mov %edx, 'A'
push %edx

_shift_stack_left_
call put_char
_shift_stack_right_


mov %edx, 'Z'
push %edx

_shift_stack_left_
mov %edx, _func_callback_
call %edx
_shift_stack_right_


_shift_stack_left_
ret
# ------ END FUNCTION ------

main:
_shift_stack_right_
lea %eax, callbackFN
mov _temp_base_0_, %eax

mov %edx, _temp_base_0_
push %edx

_shift_stack_left_
call func
_shift_stack_right_


_shift_stack_left_
ret
# ------ END FUNCTION ------

