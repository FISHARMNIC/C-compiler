global.bss_section = []
global.data_section = []
global.text_section = []
global.init_section = []

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
global.mathOperations = [
    "+","/","x","-"
]

global.variables = {
    _temp_reg_: {type: "int", pointer: false},
    _temp_base_: {type: "int", pointer: false}
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

var stringLabelCounter4 = 0
global.endifLabel = function(increment = 0) {
    stringLabelCounter4 += increment;
    return "_if_" + (stringLabelCounter4 - increment)
}