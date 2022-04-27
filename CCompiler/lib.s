
FRAME_OFFSET = 20

.include "../BODY/data.s"

.macro _shift_stack_left_
    mov _stack_d1_, %esp # duplicate the current pos
    mov %esp, _stack_d2_ # duplicate the stack frame
.endm

.macro _shift_stack_right_
    mov _stack_d2_, %esp # duplicate the current pos
    mov %esp, _stack_d1_ # go back to the original base
.endm

.macro _index_array_ base, blockSize, address
    mov %eax, \blockSize
    mov %ebx, \address
    mul %ebx
    mov %ebx, \base
    add %ebx, %eax
    mov _temp_base_, %ebx
    mov %ebx, [%ebx]
    mov _temp_reg_, %ebx
.endm

jmp _escape_lib_
# ------------------ FUNCTIONS ------------------
put_int:
    _shift_stack_right_
    pop %edx# for later use 
    put_register %edx
    _shift_stack_left_
    ret

put_char:
    _shift_stack_right_
    pop %edx
    put_char %dl
    _shift_stack_left_
    ret

halt:
    _shift_stack_right_
    put_register %eax
    new_line
    put_register %ebx
    new_line
    put_register %ecx
    new_line
    put_register %edx
    new_line
    new_line
    put_register %esp
    new_line
    put_int _stack_d1_
    new_line
    put_int _stack_d2_
    new_line
    hlt
    _shift_stack_left_
    ret
# ------------------ ENDF ------------------
_escape_lib_:
