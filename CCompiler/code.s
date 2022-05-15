
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

_cast_pointer_char_: .byte 0
_cast_pointer_short_: .short 0
_cast_pointer_int_: .long 0

_mathResult: .long 0
__final_message__: .asciz "program exit with code: "


_literal_0: .asciz "hello space test"
space: .long 0

.include "../lib.s"
.section .text

_kernel_entry:
mov %eax, %esp
sub %eax, 100
mov _stack_d2_, %eax

lea %edx, _literal_0
mov space, %edx
_shift_stack_left_
call main
_put_string __final_message__, 1920
put_int _return_int_, 1944
_shift_stack_right_

hlt

main:
_shift_stack_right_

_shift_stack_left_
ret
# ------ END FUNCTION ------

