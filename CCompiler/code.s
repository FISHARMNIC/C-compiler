
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

pointer: .long 0xB8000
_formatVGA_bgColor_: .byte 0
_formatVGA_fgColor_: .byte 0
_formatVGA_character_: .byte 0

.include "../lib.s"
.section .text

_kernel_entry:
mov %eax, %esp
sub %eax, 100
mov _stack_d2_, %eax


_shift_stack_left_
call main
hlt

formatVGA:
_shift_stack_right_
pop %edx
mov _formatVGA_character_, %edx
pop %edx
mov _formatVGA_fgColor_, %edx
pop %edx
mov _formatVGA_bgColor_, %edx

push %eax
mov %eax, _formatVGA_bgColor_
push %ecx
mov %cl, 4
shl %eax, %cl
pop %ecx
push %ebx
mov %ebx, _formatVGA_fgColor_
or %eax, %ebx
pop %ebx
push %ecx
mov %cl, 8
shl %eax, %cl
pop %ecx
push %ebx
mov %ebx, _formatVGA_character_
or %eax, %ebx
pop %ebx
mov _mathResult, %eax
pop %eax

mov %edx, _mathResult
mov _return_int_, %edx

_shift_stack_left_
ret
# ------ END FUNCTION ------

main:
_shift_stack_right_

mov %edx, 0
push %edx
mov %edx, 15
push %edx
mov %edx, 'A'
push %edx

_shift_stack_left_
call formatVGA
_shift_stack_right_


mov %edx, pointer
mov %ecx, formatVGA
mov [%edx], %ecx
mov %edx, 0
mov _return_int_, %edx

_shift_stack_left_
ret
# ------ END FUNCTION ------

