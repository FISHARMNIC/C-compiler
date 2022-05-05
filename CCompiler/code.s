
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


pointer: .int 0xB8000
exampleString: .asciz "chicken"
_formatVGA_bgColor_: .int 0
_formatVGA_fgColor_: .int 0
_formatVGA_character_: .int 0
_putchar_character_: .int 0
_putstring_string_: .int 0

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

putchar:
_shift_stack_right_
pop %edx
mov _putchar_character_, %edx

mov %edx, 0
push %edx
mov %edx, 15
push %edx
mov %edx, _putchar_character_
push %edx

_shift_stack_left_
call formatVGA
_shift_stack_right_


mov %edx, pointer
mov %ecx, _return_int_
mov [%edx], %cl

push %eax
mov %eax, pointer
add %eax, 2
mov _mathResult, %eax
pop %eax


mov %edx, _mathResult
mov pointer, %edx

_shift_stack_left_
ret
# ------ END FUNCTION ------

putstring:
_shift_stack_right_
pop %edx
mov _putstring_string_, %edx
mov %edx, _putstring_string_
mov %edx, [%edx]
mov _temp_reg_, %edx
_while_0:
mov %edx, _temp_reg_
push %edx
mov %edx, 0
push %edx
mov %edx, _putstring_string_
mov %edx, [%edx]
mov _temp_reg_, %edx

mov %edx, _temp_reg_
push %edx

_shift_stack_left_
call put_char
_shift_stack_right_


push %eax
mov %eax, _putstring_string_
add %eax, 1
mov _mathResult, %eax
pop %eax


mov %edx, _mathResult
mov _putstring_string_, %edx

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

_shift_stack_left_
call putchar
_shift_stack_right_

new_line 
lea %eax, exampleString
mov _temp_base_, %eax

mov %edx, _temp_base_
push %edx

_shift_stack_left_
call putstring
_shift_stack_right_

mov %edx, 0
mov _return_int_, %edx

_shift_stack_left_
ret
# ------ END FUNCTION ------

