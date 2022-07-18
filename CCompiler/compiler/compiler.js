global.clc = require('cli-color');
const fs = require("fs");
require("./variables.js");
require("./tokenizer.js");
require("./evaluator.js");
require("./preprocessor.js")

global.code = String(fs.readFileSync(process.argv[2])).split("\n");
global.lineNumber = 0;
global.lineContents;

process.on('uncaughtException', err => {
    console.error(err)
    crit_error("Unsupported Instruction at location")
    process.exit(1) //mandatory (as per the Node.js docs)
  })


global.isDefined = function (thing) {
    return (typeof thing !== 'undefined');
}

for (; lineNumber < code.length; lineNumber++) {
    reset_tb_tr();
    lineContents = tokenize(code[lineNumber]);

    var preturn = preprocess()
    if (preturn != "skip") {

        if (preturn == "retoken") {
            lineContents = tokenize(lineContents)
            //console.log("retoken to", lineContents)
        }
        //console.log(lineContents)
        evaluate(lineContents);
    }
}
//console.log(variables)
fs.writeFileSync("../assembly/code.s",
    `
.intel_syntax
.org 0x100
.global _kernel_entry
.section .bss

${bss_section.join("\n")}

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

.include "../assembly/lib.s"

${data_section.join("\n")}

.section .text

_kernel_entry:
mov %eax, %esp
sub %eax, FRAME_OFFSET
mov _stack_d2_, %eax

${init_section.join("\n")}
_shift_stack_left_
call main
_shift_stack_right_

push _return_int_
lea %eax, __final_message__
push %eax
_shift_stack_left_

mov %eax, VGA_ADDR
mov _ttypos, %eax
addw _ttypos, 3840
call put_string
call put_int

_shift_stack_right_

hlt

${text_section.join("\n")}
`)
