
.intel_syntax
.org 0x100
.global _kernel_entry
.section .bss

bob: .fill 5, 1
quandale: .int 0

.section .data
_return_int_: .long 0
_return_char_: .byte 0
 
_cast_char_: .byte 0
_cast_short_: .short 0
_cast_int_: .long 0

_cast_pointer_char_: .byte 0
_cast_pointer_short_: .short 0
_cast_pointer_int_: .long 0

_mathResult: .long 0
__final_message__: .asciz "program exit with code: "


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
_testFunction_num1_: .int 0
_testFunction_num2_: .int 0
_testFunction_num3_: .int 0
_literal_3: .fill 4, ,
_temp_reg_0_: .long 0

.include "../lib.s"
.section .text

_kernel_entry:
mov %eax, %esp
sub %eax, 100
mov _stack_d2_, %eax

lea %edx, _literal_0
mov foo, %edx
lea %edx, _literal_1
mov dingle, %edx
lea %edx, _literal_2
mov jaquavious, %edx
_shift_stack_left_
call main
_put_string __final_message__, 1920
put_int _return_int_, 1944
_shift_stack_right_

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

main:
_shift_stack_right_

mov %edx, _literal_3
mov quandale, %edx

mov %edx, quandale
mov %ecx, 2
mov [%edx], %ecx

mov %edx, 3
mov jon, %edx
mov %edx, quandale
mov %edx, [%edx]
mov _temp_reg_0_, %edx
_index_array_ dingle, 4, 1

mov %edx, _temp_reg_
push %edx
mov %edx, _temp_reg_0_
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

