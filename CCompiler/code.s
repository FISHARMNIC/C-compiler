
.intel_syntax
.org 0x100
.global _kernel_entry
.section .bss



.section .data
_return_int_: .long 0
_return_char_: .byte 0 
_stack_d1_: .long 0
_stack_d2_: .long 0
_mathResult: .long 0
__final_message__: .asciz "program exit with code: "


_use_string_string_: .int 0
_use_string_test_: .int 0
_literal_1: .asciz "hello"
_literal_0: .long 0

.include "../lib.s"
.section .text

_kernel_entry:
mov %eax, %esp
sub %eax, 100
mov _stack_d2_, %eax

lea %edx, _literal_1
mov _literal_0, %edx
_shift_stack_left_
call main
_put_string __final_message__, 1920
put_int _return_int_, 1944
_shift_stack_right_

hlt

use_string:
_shift_stack_right_
pop %edx
mov _use_string_test_, %edx
pop %edx
mov _use_string_string_, %edx

mov %edx, 2
mov _use_string_test_, %edx
_index_array_ _use_string_string_, 1, 1

mov %edx, _temp_reg_
push %edx

_shift_stack_left_
call put_char
_shift_stack_right_


mov %edx, _use_string_test_
push %edx

_shift_stack_left_
call put_int
_shift_stack_right_


_shift_stack_left_
ret
# ------ END FUNCTION ------

main:
_shift_stack_right_

mov %edx, _literal_0
push %edx
mov %edx, 1
push %edx

_shift_stack_left_
call use_string
_shift_stack_right_

mov %edx, 0
mov _return_int_, %edx

_shift_stack_left_
ret
# ------ END FUNCTION ------

