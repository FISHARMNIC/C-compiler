global.clc = require('cli-color');
const fs = require("fs");
require("./variables.js");
require("./tokenizer.js");
require("./evaluator.js");

var code = String(fs.readFileSync(process.argv[2])).split("\n");

var lineNumber = 0;
var lineContents;

global.isDefined = function (thing) {
    return (typeof thing !== 'undefined');
}

for (; lineNumber < code.length; lineNumber++) {
    reset_tb_tr();
    if (!(code[lineNumber][0] == "/" && code[lineNumber][1] == "/")) {
        lineContents = tokenize(code[lineNumber]);
        evaluate(lineContents);
    }
}
fs.writeFileSync("../code.s",
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
_cast_short: .short 0
_cast_int_: .long 0

_mathResult: .long 0
__final_message__: .asciz "program exit with code: "


${data_section.join("\n")}

.include "../lib.s"
.section .text

_kernel_entry:
mov %eax, %esp
sub %eax, 100
mov _stack_d2_, %eax

${init_section.join("\n")}
_shift_stack_left_
call main
_put_string __final_message__, 1920
put_int _return_int_, 1944
_shift_stack_right_

hlt

${text_section.join("\n")}
`)
