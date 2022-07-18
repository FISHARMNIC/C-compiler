
.intel_syntax
.org 0x100
.global _kernel_entry
.section .bss

_auto_0: .fill 5, 4
arr: .long

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

.include "../assembly/lib.s"

.include "libs/stdio.s"
_literal_1: .asciz "hello"
_literal_0: .long 0
_temp_reg_0_: .long 0
_temp_base_0_: .long 0
_temp_reg_1_: .long 0
_temp_base_1_: .long 0
_literal_3: .asciz "how"
_literal_2: .long 0
_literal_5: .asciz "are"
_literal_4: .long 0
_literal_7: .asciz "you"
_literal_6: .long 0
_literal_9: .asciz "today"
_literal_8: .long 0
index: .int 0

.section .text

_kernel_entry:
mov %eax, %esp
sub %eax, FRAME_OFFSET
mov _stack_d2_, %eax


lea %eax, _auto_0
mov arr, %eax

lea %edx, _literal_1
mov _literal_0, %edx
lea %edx, _literal_3
mov _literal_2, %edx
lea %edx, _literal_5
mov _literal_4, %edx
lea %edx, _literal_7
mov _literal_6, %edx
lea %edx, _literal_9
mov _literal_8, %edx
_shift_stack_left_
call main
_shift_stack_right_

push _return_int_
lea %eax, __final_message__
push %eax
_shift_stack_left_

mov %eax, VGA_ADDR
mov _ttypos, %eax
addw _ttypos, 3840
call put_string
call put_int

_shift_stack_right_

hlt

main:
_shift_stack_right_
_index_array_ arr, 4, 0, _temp_reg_0_, _temp_base_0_
mov %edx, _temp_base_0_
push %ebx
mov %ebx, _literal_0
mov [%edx], %ebx
pop %ebx
_index_array_ arr, 4, 0, _temp_reg_1_, _temp_base_1_
_index_array_ arr, 4, 1, _temp_reg_0_, _temp_base_0_
mov %edx, _temp_base_0_
push %ebx
mov %ebx, _literal_2
mov [%edx], %ebx
pop %ebx
_index_array_ arr, 4, 1, _temp_reg_1_, _temp_base_1_
_index_array_ arr, 4, 2, _temp_reg_0_, _temp_base_0_
mov %edx, _temp_base_0_
push %ebx
mov %ebx, _literal_4
mov [%edx], %ebx
pop %ebx
_index_array_ arr, 4, 2, _temp_reg_1_, _temp_base_1_
_index_array_ arr, 4, 3, _temp_reg_0_, _temp_base_0_
mov %edx, _temp_base_0_
push %ebx
mov %ebx, _literal_6
mov [%edx], %ebx
pop %ebx
_index_array_ arr, 4, 3, _temp_reg_1_, _temp_base_1_
_index_array_ arr, 4, 4, _temp_reg_0_, _temp_base_0_
mov %edx, _temp_base_0_
push %ebx
mov %ebx, _literal_8
mov [%edx], %ebx
pop %ebx
_index_array_ arr, 4, 4, _temp_reg_1_, _temp_base_1_
_while_0:
mov %edx, index
push %edx
mov %edx, 4
push %edx
_index_array_ arr, 4, index, _temp_reg_0_, _temp_base_0_
mov %edx, _temp_reg_0_
push %edx

_shift_stack_left_
call string_ln
_shift_stack_right_


pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, index
add %eax, 1
mov _mathResult, %eax
popa


mov %edx, _mathResult
mov index, %edx

pop %edx
pop %eax
cmp %eax, %edx
jl _while_0
mov %edx, 0
mov _return_int_, %edx

_shift_stack_left_
ret
# ------ EARLY EXIT FUNCTION ------


_shift_stack_left_
ret
# ------ END FUNCTION ------

