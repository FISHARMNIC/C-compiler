
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
# ------------------ ENDF ------------------
_escape_lib_: