global.bss_section = []
global.data_section = []
global.text_section = []
global.init_section = []

global.macros = ["sizeof"]

global.separators = [
    ' ',
    '(',
    ')',
    '{',
    '}',
    '[',
    ']',
    '&',
    '+',
    '-',
    '/',
    '*',
    ';',
    ',',
    ':'
]

global.variableTypes = {
    "int": ".int",
    "int*": 0,

    "char": ".byte",
    "char*":0,

    "void":0,
    "void*":0,

    "long": ".long",
    "long*":0,

    "short": ".short",
    "short*": 0
}
global.variableSizes = {
    "int": 4,
    "long": 8,
    "char": 1,
    "short": 2
}

global.variableToRegister = function(type, regName) {
    var outcome = `%e${regName}x`
    switch(type) {
        case "char":
            outcome = `%${regName}l`
            break
        case "short":
            outcome = `%${regName}x`
    }
    return outcome
}

global.mathOperations = [
    "+","/","x","-"
]

global.variables = {
    _temp_reg_: {type: "int", pointer: false},
    _temp_base_: {type: "int", pointer: false},
    _cast_short_: {type: "short", pointer: false},
    _cast_char_: {type: "char", pointer: false},
    _cast_int_: {type: "int", pointer: false},
    _cast_pointer_short_: {type: "short", pointer: true},
    _cast_pointer_char_: {type: "char", pointer: true},
    _cast_pointer_int_: {type: "int", pointer: true}
}

global.compares = {
    "==": "je",
    "<=": "jle",
    ">=": "jge",
    "<": "jl",
    ">": "jg",
    "!=": "jne",
}

global.dynamicLabel = 0;
global.getDynaLabel = function(amt = 0) {

    return `_auto_${(dynamicLabel += amt) - amt}`
}

global.DL_while = 0;
global.whileLabel = function(amt = 0) {

    return `_while_${(DL_while += amt) - amt}`
}

global.DL_literals = 0;
global.stringLiteralLabel = function(amt = 0) {

    return `_literal_${(DL_literals += amt) - amt}`
}


global.typeGuesses = {
    //if you modify these names, modify "expectations" too
    type: (p) => Object.keys(variableTypes).includes(p),
    operation: (p) => mathOperations.includes(p),
    assignment: (p) => p == "=",
    assigned: (p) => Object.keys(variables).includes(p),
    static_integer: (p) => p == parseInt(p),
    static_float: (p) => p == parseFloat(p),
    string_literal: (p) => p[0] == '"' && p.at(-1) == '"',
    unassigned: (p) => !Object.keys(variables).includes(p),
    unknown: (p) => true,
}

global.parenthesisStack = []

global.todoList = {}

global.inFunction = {isTrue: false, name: false}
global.inWhile = false

var stringLabelCounter4 = 0
global.endifLabel = function(increment = 0, postincrement = 0) {
    var old = stringLabelCounter4
    stringLabelCounter4 += increment + postincrement;
    return "_if_" + (old + increment)
}

var ifTermVar = 0
global.ifTerm = function(am = 0) {
    ret = `_ifEscape_${ifTermVar}`
    ifTermVar += am
    return ret
}

global.arrobj_includes = function(array, item) {
    for(var i = 0; i < array.length; i++){
        if(item(array[i])) {
            return i
        }
    }
    return -1
}

global.leftOver_if_data;
//arrobj_includes(jon, (x) => {x.phrase == "eq"})