
.intel_syntax
.org 0x100
.global _kernel_entry
.section .bss

_auto_0: .fill 5, 4
bob: .long
quandale: .int 0

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
jon: .int 10
_literal_0: .asciz "foo"
foo: .long 0
dingle: .long 0
_literal_1:
.int 0
.int 1
.int 2
.int 3
.int 4
jaquavious: .long 0
_literal_2:
.byte 'a'
.byte 'b'
.byte 'c'
AGE = 15
_testFunction_num1_: .int 0
_testFunction_num2_: .byte 0
_testFunction_num3_: .int 0
_testFunction_num4_: .int 0
_literal_4: .asciz " is greater than or equal to 1"
_literal_3: .long 0
_literal_6: .asciz " is less than or equal to 2"
_literal_5: .long 0
i: .int 65
.comm _literal_7, 4
_temp_reg_0_: .long 0
_temp_reg_1_: .long 0
_temp_base_0_: .long 0
_literal_9: .asciz "3"
_literal_8: .long 0
_literal_11: .asciz "3"
_literal_10: .long 0

.section .text

_kernel_entry:
mov %eax, %esp
sub %eax, FRAME_OFFSET
mov _stack_d2_, %eax

lea %edx, _literal_0
mov foo, %edx

lea %eax, _auto_0
mov bob, %eax

lea %edx, _literal_1
mov dingle, %edx
lea %edx, _literal_2
mov jaquavious, %edx
lea %edx, _literal_4
mov _literal_3, %edx
lea %edx, _literal_6
mov _literal_5, %edx
lea %edx, _literal_9
mov _literal_8, %edx
lea %edx, _literal_11
mov _literal_10, %edx
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

testFunction:
_shift_stack_right_
pop %edx
mov _testFunction_num4_, %edx
pop %edx
mov _testFunction_num3_, %edx
pop %edx
mov _testFunction_num2_, %dl
pop %edx
mov _testFunction_num1_, %edx
mov %edx, _testFunction_num1_
push %edx

_shift_stack_left_
call int_ln
_shift_stack_right_

mov %edx, _testFunction_num2_
push %edx

_shift_stack_left_
call char_ln
_shift_stack_right_

mov %edx, _testFunction_num3_
push %edx

_shift_stack_left_
call string_ln
_shift_stack_right_

mov %edx, _testFunction_num4_
push %edx

_shift_stack_left_
call int_ln
_shift_stack_right_


_shift_stack_left_
call new_line
_shift_stack_right_

mov %eax, _testFunction_num1_
mov %ebx, 2
cmp %eax, %ebx
jle _if_0
jmp _if_1
_if_0:
mov %eax, _testFunction_num1_
mov %ebx, 1
cmp %eax, %ebx
jge _if_4
jmp _if_5
_if_4:
mov %edx, _testFunction_num1_
push %edx

_shift_stack_left_
call put_int
_shift_stack_right_

mov %edx, _literal_3
push %edx

_shift_stack_left_
call string_ln
_shift_stack_right_

_if_5:
mov %edx, _testFunction_num1_
push %edx

_shift_stack_left_
call put_int
_shift_stack_right_

mov %edx, _literal_5
push %edx

_shift_stack_left_
call string_ln
_shift_stack_right_

_if_1:
_while_0:
mov %edx, i
push %edx
mov %edx, 75
push %edx
mov %edx, i
push %edx

_shift_stack_left_
call put_char
_shift_stack_right_


pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, i
add %eax, 1
mov _mathResult, %eax
popa


mov %edx, _mathResult
mov i, %edx

pop %edx
pop %eax
cmp %eax, %edx
jl _while_0

_shift_stack_left_
call new_line
_shift_stack_right_

mov %edx, 123
mov _return_int_, %edx

_shift_stack_left_
ret
# ------ EARLY EXIT FUNCTION ------


_shift_stack_left_
ret
# ------ END FUNCTION ------

main:
_shift_stack_right_
lea %edx, _literal_7
mov _literal_7, %edx

mov %edx, _literal_7
mov quandale, %edx
mov %edx, quandale
mov %ecx, '2'
mov [%edx], %cl

mov %edx, 20
mov jon, %edx

pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, jon
mov %ebx, 5
xor %edx, %edx
div %ebx
mov _mathResult, %eax
popa

movw _temp_reg_0_, 0
mov %edx, quandale
mov %dl, [%edx]
mov _temp_reg_0_, %dl
_index_array_ dingle, 4, 1, _temp_reg_1_, _temp_base_0_
mov %edx, _temp_reg_1_
push %edx
mov %edx, _temp_reg_0_
push %edx
mov %edx, _literal_8
push %edx
mov %edx, _mathResult
push %edx

_shift_stack_left_
call testFunction
_shift_stack_right_

mov %edx, _return_int_
push %edx
mov %edx, _literal_10
push %edx
mov %edx, _mathResult
push %edx

_shift_stack_left_
call put_int
_shift_stack_right_

mov %edx, 0
mov _return_int_, %edx

_shift_stack_left_
ret
# ------ EARLY EXIT FUNCTION ------


_shift_stack_left_
ret
# ------ END FUNCTION ------

