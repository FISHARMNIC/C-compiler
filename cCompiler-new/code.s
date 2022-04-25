
.intel_syntax
.org 0x100
.global main
.section .bss

bob: .fill 5, 1
_auto_0: .fill 10, 1
quandale: .long
_testFunction_num1_: .long
_testFunction_num2_: .long
_testFunction_num3_: .long

.section .data
_return_int_: .long 0
_return_char_: .byte 0 
_stack_d1_: .long 0
_stack_d2_: .long 0

jon: .long 10
foo: .asciz "foo"
dingle:
.long 1
.long 2
.long 3
.long 4
.long 5
jaquavious:
.byte 'a'
.byte 'b'
.byte 'c'
.include "../BODY/data.s"

.section .text


.include "../testRuntime/lib.s"

main:
mov %eax, %esp
sub %eax, 100
mov _stack_d2_, %eax


lea %eax, _auto_0
mov quandale, %eax

_shift_stack_left_
call kernel_entry
hlt

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

kernel_entry:
_shift_stack_right_

mov %edx, 1
push %edx
mov %edx, 2
push %edx
mov %edx, 3
push %edx

_shift_stack_left_
call testFunction
_shift_stack_right_

mov %edx, 0
mov _return_int_, %edx

_shift_stack_left_
ret
# ------ END FUNCTION ------

