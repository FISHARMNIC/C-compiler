
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


outer: .int 0
inner: .int 0

.include "../assembly/lib.s"
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

main:
_shift_stack_right_
_while_0:
mov %edx, outer
push %edx
mov %edx, 10
push %edx

mov %edx, outer
push %edx

_shift_stack_left_
call put_int
_shift_stack_right_


mov %edx, 0
mov inner, %edx
_while_1:
mov %edx, inner
push %edx
mov %edx, 2
push %edx

pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, inner
add %eax, 65
mov _mathResult, %eax
popa


mov %edx, _mathResult
push %edx

_shift_stack_left_
call put_char
_shift_stack_right_


pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, inner
add %eax, 1
mov _mathResult, %eax
popa


mov %edx, _mathResult
mov inner, %edx

pop %edx
pop %eax
cmp %eax, %edx
jl _while_1

pusha
xor %eax, %eax
xor %ebx, %ebx
xor %ecx, %ecx
mov %eax, outer
add %eax, 1
mov _mathResult, %eax
popa


mov %edx, _mathResult
mov outer, %edx

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

