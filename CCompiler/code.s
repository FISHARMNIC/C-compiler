
.intel_syntax
.org 0x100
.global _kernel_entry
.section .bss

bob: .fill 5, 1
quandale: .int 0

.section .data
_return_int_: .long 0
_return_char_: .byte 0 
_stack_d1_: .long 0
_stack_d2_: .long 0
_mathResult: .long 0


jon: .int 10
foo: .asciz "foo"
dingle:
.int 1
.int 2
.int 3
.int 4
.int 5
jaquavious:
.byte 'a'
.byte 'b'
.byte 'c'
_testFunction_num1_: .int 0
_testFunction_num2_: .int 0
_testFunction_num3_: .int 0

.include "../lib.s"
.section .text

_kernel_entry:
mov %eax, %esp
sub %eax, 100
mov _stack_d2_, %eax


_shift_stack_left_
call main
_shift_stack_right_
hlt

NOtes:
testFunction:
_shift_stack_right_
pop %edx
mov _testFunction_num3_, %edx
pop %edx
mov _testFunction_num2_, %edx
pop %edx
mov _testFunction_num1_, %edx

mov %edx, _testFunction_num1_
push %edx

_shift_stack_left_
call put_int
_shift_stack_right_

broken:

mov %edx, _testFunction_num2_
push %edx

_shift_stack_left_
call put_int
_shift_stack_right_


mov %edx, _testFunction_num3_
push %edx

_shift_stack_left_
call put_int
_shift_stack_right_


_shift_stack_left_
ret
# ------ END FUNCTION ------

main:
_shift_stack_right_

mov %edx, 100
mov quandale, %edx

mov %edx, quandale
mov %ecx, 2
mov [%edx], %ecx

mov %edx, 3
mov jon, %edx
mov %edx, quandale
mov %edx, [%edx]
mov _temp_reg_, %edx

mov %edx, 1
push %edx
mov %edx, _temp_reg_
push %edx
mov %edx, jon
push %edx

_shift_stack_left_
call testFunction
_shift_stack_right_

mov %edx, 0
mov _return_int_, %edx

_shift_stack_left_
ret
# ------ END FUNCTION ------

