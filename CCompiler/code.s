
.intel_syntax
.org 0x100
.global main
.section .bss



.section .data
_return_int_: .long 0
_return_char_: .byte 0 
_stack_d1_: .long 0
_stack_d2_: .long 0

pointer: .long 0xB8000

.include "../lib.s"
.section .text

main:
mov %eax, %esp
sub %eax, 100
mov _stack_d2_, %eax


_shift_stack_left_
call kernel_entry
hlt

kernel_entry:
_shift_stack_right_

mov %edx, pointer
mov %ecx, 777
mov [%edx], %ecx
mov %edx, 0
mov _return_int_, %edx

_shift_stack_left_
ret
# ------ END FUNCTION ------

