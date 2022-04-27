global.clc = require('cli-color');
const fs = require("fs");
require("./variables.js");
require("./tokenizer.js");
require("./evaluator.js");

var code = String(fs.readFileSync(process.argv[2])).split("\n");

var lineNumber = 0;
var lineContents;

global.isDefined = function(thing) {
    return (typeof thing !== 'undefined');
}

for (; lineNumber < code.length; lineNumber++) {
    lineContents = tokenize(code[lineNumber]);
    evaluate(lineContents);
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
_stack_d1_: .long 0
_stack_d2_: .long 0
_mathResult: .long 0

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
hlt

${text_section.join("\n")}
`)
}
