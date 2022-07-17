.section .data

_internalRegCpy: .long 0
_temp_reg_: .long 0
_temp_base_: .long 0

_stack_d1_: .long 0
_stack_d2_: .long 0

FRAME_OFFSET = 100
.macro _shift_stack_left_
    mov _stack_d1_, %esp # duplicate the current pos
    mov %esp, _stack_d2_ # duplicate the stack frame
.endm

.macro _shift_stack_right_
    mov _stack_d2_, %esp # duplicate the current pos
    mov %esp, _stack_d1_ # go back to the original base
.endm

.macro _index_array_ base, blockSize, address, reg_register, base_register
    mov %eax, \blockSize
    mov %ebx, \address
    mul %ebx
    mov %ebx, \base
    add %ebx, %eax
    mov \base_register, %ebx
    mov %ebx, [%ebx]
    mov \reg_register, %ebx
.endm