
.intel_syntax
.org 0x100
.global _kernel_entry
.section .bss

stack: .fill 10, 1

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


ttypos: .int 0xb8000
stackpointer: .int 0
BG_COLOR = 15
FG_COLOR = 0
_ocolor_chara_: .byte 0
_ocolor_fg_: .byte 0
_ocolor_bg_: .byte 0
_ochar_chara_: .byte 0
_ostring_string_: .int 0
t: .byte 1
_temp_reg_0_: .long 0
_osint_number_: .int 0
_temp_base_0_: .long 0
_temp_reg_1_: .long 0
_temp_base_1_: .long 0
relativetty: .int 0
temp: .int 0
_literal_1: .asciz "chicken"
_literal_0: .long 0

.include "../assembly/lib.s"
.section .text

_kernel_entry:
mov %eax, %esp
sub %eax, 100
mov _stack_d2_, %eax

mov %edx, _mathResult
mov temp, %edx
lea %edx, _literal_1
mov _literal_0, %edx
_shift_stack_left_
call main
_put_string __final_message__, 1920
put_int _return_int_, 1944
_shift_stack_right_

hlt

ocolor:
_shift_stack_right_
pop %edx
mov _ocolor_bg_, %dl
pop %edx
mov _ocolor_fg_, %dl
pop %edx
mov _ocolor_chara_, %dl
/* -------- here -------- */

pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, _ocolor_fg_
mov %cl, 4
shl %eax, %cl
mov %ebx, _ocolor_bg_
or %eax, %ebx
mov %cl, 8
shl %eax, %cl
mov %ebx, _ocolor_chara_
or %eax, %ebx
mov _mathResult, %eax
popa

mov %edx, _mathResult
mov _cast_short_, %dx
mov %edx, ttypos
mov %ecx, _cast_short_
mov [%edx], %ecx

pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, ttypos
add %eax, 2
mov _mathResult, %eax
popa


mov %edx, _mathResult
mov ttypos, %edx

_shift_stack_left_
ret
# ------ END FUNCTION ------

ochar:
_shift_stack_right_
pop %edx
mov _ochar_chara_, %dl

mov %edx, _ochar_chara_
push %edx
mov %edx, FG_COLOR
push %edx
mov %edx, BG_COLOR
push %edx

_shift_stack_left_
call ocolor
_shift_stack_right_


_shift_stack_left_
ret
# ------ END FUNCTION ------

ostring:
_shift_stack_right_
pop %edx
mov _ostring_string_, %edx
_while_0:
mov %edx, t
push %edx
mov %edx, 0
push %edx
movw _temp_reg_0_, 0
mov %edx, _ostring_string_
mov %dl, [%edx]
mov _temp_reg_0_, %dl

mov %edx, _temp_reg_0_
push %edx

_shift_stack_left_
call ochar
_shift_stack_right_


pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, _ostring_string_
add %eax, 1
mov _mathResult, %eax
popa


mov %edx, _mathResult
mov _ostring_string_, %edx

pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, _ostring_string_
add %eax, 1
mov _mathResult, %eax
popa

mov %edx, _mathResult
mov _cast_pointer_char_, %edx
movw _temp_reg_0_, 0
mov %edx, _cast_pointer_char_
mov %dl, [%edx]
mov _temp_reg_0_, %dl

mov %edx, _temp_reg_0_
mov t, %edx

pop %edx
pop %eax
cmp %eax, %edx
jne _while_0

_shift_stack_left_
ret
# ------ END FUNCTION ------

osint:
_shift_stack_right_
pop %edx
mov _osint_number_, %edx
mov %eax, _osint_number_
mov %ebx, 0
cmp %eax, %ebx
je _if_0
jmp _if_1
_if_0:

mov %edx, '0'
push %edx

_shift_stack_left_
call ochar
_shift_stack_right_


_shift_stack_left_
ret
# ------ EARLY EXIT FUNCTION ------

_if_1:
_while_1:
mov %edx, _osint_number_
push %edx
mov %edx, 0
push %edx
/* ----here---- */

pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, _osint_number_
mov %ebx, 10
xor %edx, %edx
div %ebx
mov %eax, %edx
add %eax, 48
mov _mathResult, %eax
popa

mov %edx, _mathResult
mov _cast_char_, %dl
_index_array_ stack, 1, stackpointer, _temp_reg_0_, _temp_base_0_
mov %edx, _temp_base_0_
push %ebx
mov %bl, _cast_char_
mov [%edx], %bl
pop %ebx
_index_array_ stack, 1, stackpointer, _temp_reg_1_, _temp_base_1_

pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, _osint_number_
mov %ebx, 10
xor %edx, %edx
div %ebx
mov _mathResult, %eax
popa


mov %edx, _mathResult
mov _osint_number_, %edx

pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, stackpointer
add %eax, 1
mov _mathResult, %eax
popa


mov %edx, _mathResult
mov stackpointer, %edx

pop %edx
pop %eax
cmp %eax, %edx
jg _while_1

pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, stackpointer
sub %eax, 1
mov _mathResult, %eax
popa


mov %edx, _mathResult
mov stackpointer, %edx
_while_2:
mov %edx, stackpointer
push %edx
mov %edx, 0
push %edx

pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, stackpointer
sub %eax, 1
mov _mathResult, %eax
popa


mov %edx, _mathResult
mov stackpointer, %edx
_index_array_ stack, 1, stackpointer, _temp_reg_0_, _temp_base_0_

mov %edx, _temp_reg_0_
push %edx

_shift_stack_left_
call ochar
_shift_stack_right_


pop %edx
pop %eax
cmp %eax, %edx
jg _while_2

_shift_stack_left_
ret
# ------ END FUNCTION ------

oline:
_shift_stack_right_
mov %edx, ttypos
mov _cast_int_, %edx

pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, _cast_int_
sub %eax, 0xb8000
mov %cl, 1
shr %eax, %cl
mov _mathResult, %eax
popa


mov %edx, _mathResult
mov relativetty, %edx
mov %eax, relativetty
mov %ebx, 1920
cmp %eax, %ebx
jg _if_4
jmp _if_5
_if_4:

mov %edx, 0xb8000
mov ttypos, %edx

_shift_stack_left_
ret
# ------ EARLY EXIT FUNCTION ------

_if_5:

pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, relativetty
mov %ebx, 80
xor %edx, %edx
div %ebx
mov %eax, %edx
mov _mathResult, %eax
popa

mov %edx, ttypos
mov _cast_int_, %edx

pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, 80
sub %eax, temp
add %eax, relativetty
mov %cl, 1
shl %eax, %cl
add %eax, _cast_int_
mov _mathResult, %eax
popa


mov %edx, _mathResult
mov ttypos, %edx

_shift_stack_left_
ret
# ------ END FUNCTION ------

main:
_shift_stack_right_

mov %edx, 'A'
push %edx

_shift_stack_left_
call ochar
_shift_stack_right_


mov %edx, _literal_0
push %edx

_shift_stack_left_
call ostring
_shift_stack_right_


mov %edx, 'Z'
push %edx

_shift_stack_left_
call ochar
_shift_stack_right_


mov %edx, 123
push %edx

_shift_stack_left_
call osint
_shift_stack_right_


_shift_stack_left_
ret
# ------ END FUNCTION ------

