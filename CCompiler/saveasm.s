
.intel_syntax
.org 0x100
.global _kernel_entry
.section .bss



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
BG_COLOR: .byte 15
FG_COLOR: .byte 0
_ochar_chara_: .byte 0
_ochar_fg_: .byte 0
_ochar_bg_: .byte 0
_ostring_string_: .int 0
t: .byte 1
_temp_reg_0_: .long 0
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

ochar:
_shift_stack_right_
pop %edx
mov _ochar_bg_, %dl
pop %edx
mov _ochar_fg_, %dl
pop %edx
mov _ochar_chara_, %dl
/* -------- here -------- */

push %eax
mov %eax, _ochar_fg_
push %ecx
mov %cl, 4
shl %eax, %cl
pop %ecx
push %ebx
mov %ebx, _ochar_bg_
or %eax, %ebx
pop %ebx
push %ecx
mov %cl, 8
shl %eax, %cl
pop %ecx
push %ebx
mov %ebx, _ochar_chara_
or %eax, %ebx
pop %ebx
mov _mathResult, %eax
pop %eax

mov %edx, _mathResult
mov _cast_short_, %dx
mov %edx, ttypos
mov %ecx, _cast_short_
mov [%edx], %ecx

push %eax
mov %eax, ttypos
add %eax, 2
mov _mathResult, %eax
pop %eax


mov %edx, _mathResult
mov ttypos, %edx

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
mov %edx, FG_COLOR
push %edx
mov %edx, BG_COLOR
push %edx

_shift_stack_left_
call ochar
_shift_stack_right_


push %eax
mov %eax, _ostring_string_
add %eax, 1
mov _mathResult, %eax
pop %eax


mov %edx, _mathResult
mov _ostring_string_, %edx

push %eax
mov %eax, _ostring_string_
add %eax, 1
mov _mathResult, %eax
pop %eax

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

main:
_shift_stack_right_

mov %edx, 'A'
push %edx
mov %edx, 0
push %edx
mov %edx, 15
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
mov %edx, 0
push %edx
mov %edx, 15
push %edx

_shift_stack_left_
call ochar
_shift_stack_right_


_shift_stack_left_
ret
# ------ END FUNCTION ------

