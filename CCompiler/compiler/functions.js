

global.internal_macros = {
    // param length
    "goto": 1,
    "new_line": 0
}

global.function_createVariable = function ({ type, name, value, pointer = false }) {
    if (type.includes("*")) {
        type = type.slice(0, -1);
        pointer = true
    }

    variables[name] = { pointer, type };
    var useT = type
    if (pointer) {
        useT = "int"
    }
    console.log(clc.red(`--- DEFINED:`), clc.blue(`${pointer ? "pointer" : ""}`), clc.blue(type), clc.green(name), "==>", clc.blue(isDefined(value)? value : "undefined"))
    if (isDefined(value)) { // if its defined, use .data
        if(Object.keys(variables).includes(value) || String(value).includes("_literal_")) { // if you are setting to a dynamic value on initiation
            init_section.push(
                `mov %edx, ${value}`,
                `mov ${name}, %edx`
            )
            value = 0
        }
        data_section.push(`${name}: ${variableTypes[useT]} ${value}`)
    } else { // otherwise use .bss for the uninitialized data
        bss_section.push(`${name}: ${variableTypes[useT]} 0`)
    }
}

global.function_createBuffer = function ({ type, name, value, size = -1, pointer = false }) {
    if (type.includes("*")) {
        type = type.slice(0, -1);
        pointer = true
    }
    console.log(clc.red(`--- DEFINED BUFFER:`), clc.blue(`${pointer ? "pointer" : ""}`), clc.blue(type), clc.green(name), clc.red(`[${size}]`), "==>", clc.blue(isDefined(value)? value : "undefined"))
    if (isDefined(value)) { // if its defined, use .data
        if (value[0] == '"' && value.at(-1) == '"') { //string literal
            data_section.push(
                `${stringLiteralLabel()}: .asciz ${value}`,
                `${name}: .long 0`
            )
            init_section.push(
                `lea %edx, ${stringLiteralLabel(1)}`,
                `mov ${name}, %edx`
            )
        } else { // array initializer
            value = value.filter(x => x != ",")
            if (size == -1) { // no size given
                size = value.length
            }
            data_section.push(
                `${name}: .long 0`,
                `${stringLiteralLabel()}:`
            )
            for (i = 0; i < size; i++)
                data_section.push(`${variableTypes[type]} ${value[i]}`)

            init_section.push(
                `lea %edx, ${stringLiteralLabel(1)}`,
                `mov ${name}, %edx`
            )
            console.log(value)
        }

    } else { // otherwise use .bss for the uninitialized data
        if (size != -1) { //did give size
            if (pointer) {
                bss_section.push(`${getDynaLabel()}: .fill ${size}, ${variableSizes["int"]}`)
                init_section.push(
                    `\nlea %eax, ${getDynaLabel(1)}`,
                    `mov ${name}, %eax\n`
                )
                bss_section.push(`${name}: .long`)
            } else {
                bss_section.push(`${name}: .fill ${size}, ${variableSizes[type]}`)
            }
        } else {
            bss_section.push(`${name}: ${variableTypes[type]}`)
        }
    }
    variables[name] = { type, name, size, pointer }
}

global.function_setVariable = function ({ name, value }) {
    //console.log(clc.red("--- SETTING VARIABLE:"), clc.green(`${name} : ${value}`))
    text_section.push(
        `\nmov %edx, ${value}`,
        `mov ${name}, %edx`
    )
}

global.function_setPointer = function ({ name, value }) {
    var tempreg = "ecx"
    if (isDefined(variables[name])) {
        switch (variables[name].type) {
            case "char":
                tempreg = "cl"
                break
            case "short":
                tempreg = "cx"
        }
    }
    //console.log("----------- HERHENERFI ------------")
    text_section.push(
        `mov %edx, ${name}`,
        `mov %ecx, ${value}`,
        `mov [%edx], %${tempreg}`
    )
}

global.function_createFunction = function ({ name, parameters, returnType }) {
    text_section.push(`${name}:`)
    //if(name != "main") {
    text_section.push(`_shift_stack_right_`)
    //}
    var obuffer = []
    if (parameters != ["void"]) {
        for (i = 0; i < parameters.length; i += 2) {
            var type = parameters[i]


            var pointer = false
            if (parameters[i + 1] == "*") {
                pointer = true
                i++
            }

            var sname = `_${name}_${parameters[i + 1]}_`
            //var name = parameters[i + 1]
            if (isDefined(parameters[i + 1])) {
                obuffer.push(sname)
                function_createVariable({ name: sname, type, value: 0, pointer })
            }
        }
    }

    if (parameters != ["void"]) {
        for (i = parameters.length - 2; i >= 0; i -= 2) {
            var type = parameters[i]
            if (parameters[i + 2] == "*") {
                i--;
            }
            var sname = `_${name}_${parameters[i + 1]}_`
            var tempreg = "%edx"
            console.log(clc.blue("-> parameter"), sname)
            if (!variables[sname].pointer) {
                switch (variables[sname].type) {
                    case "char":
                        tempreg = "%dl"
                        break
                    case "short":
                        tempreg = "%dx"
                }
            }
            text_section.push(
                `pop %edx`,
                `mov ${sname}, ${tempreg}`
            )
        }
    }


    inFunction = { isTrue: true, name, returnType, parameters: obuffer }
    variables[name] = { name, function: true, returnType, parameters: obuffer }
}

global.function_runFunction = function ({ name, parameters, indirect = false }) {
    text_section.push("")
    parameters.forEach(x => {
        if (x[0] == '"' && x.at(-1) == '"') {
            var useLiteral = stringLiteralLabel(1)
            function_createBuffer({
                type: "char",
                name: useLiteral,
                value: x
            })
            text_section.push(
                `mov %edx, ${useLiteral}`,
                `push %edx`
            )
        } else {
            text_section.push(
                `mov %edx, ${x}`,
                `push %edx`
            )
        }
    })
    if (indirect) {
        text_section.push(
            `\n_shift_stack_left_`,
            `mov %edx, ${name}`,
            `call %edx`,
            `_shift_stack_right_\n`
        )
    } else {
        text_section.push(
            `\n_shift_stack_left_`,
            `call ${name}`,
            `_shift_stack_right_\n`
        )
    }
}

var tempbase_counter = 0
var highest_tempbase_used = 0
global.use_tempbase = function (amt = 0) {
    if (tempbase_counter + 1 > highest_tempbase_used) {
        function_createVariable({
            type: "long",
            name: `_temp_base_${tempbase_counter}_`,
            value: 0
        })
        highest_tempbase_used++
    }
    tempbase_counter += amt
    return `_temp_base_${tempbase_counter - amt}_`
}

var tempreg_counter = 0
var highest_tempreg_used = 0
global.use_tempreg = function (amt = 0) {
    if (tempreg_counter + 1 > highest_tempreg_used) {
        function_createVariable({
            type: "long",
            name: `_temp_reg_${tempreg_counter}_`,
            value: 0
        })
        highest_tempreg_used++ // fix
    }
    tempreg_counter += amt
    return `_temp_reg_${tempreg_counter - amt}_`
}

global.reset_tb_tr = function () {
    tempbase_counter = 0
    tempreg_counter = 0
}