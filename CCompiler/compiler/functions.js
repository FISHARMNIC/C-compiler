global.function_createVariable = function ({ type, name, value, pointer = false }) {
    if (type.includes("*")) {
        type = type.slice(0, -1);
        pointer = true
    }

    variables[name] = { pointer, type };
    var useT = type
    if(pointer) {
        useT = "int"
    }
    console.log(clc.red(`--- DEFINED:`), clc.blue(`${pointer ? "pointer" : ""}`), clc.green(`${type} ${name}: ${value}`))
    if (isDefined(value)) { // if its defined, use .data
        data_section.push(`${name}: ${variableTypes[useT]} ${value}`)
    } else { // otherwise use .bss for the uninitialized data
        bss_section.push(`${name}: ${variableTypes[useT]}`)
    }
}

global.function_createBuffer = function ({ type, name, value, size = -1, pointer = false }) {
    if (type.includes("*")) {
        type = type.slice(0, -1);
        pointer = true
    }
    console.log(clc.red(`--- DEFINED BUFFER:`), clc.blue(`${pointer ? "pointer" : ""}`), clc.green(`${type} ${name} [${size}] : ${value}`))
    if (isDefined(value)) { // if its defined, use .data
        if (value[0] == '"' && value.at(-1) == '"') { //string literal
            data_section.push(`${name}: .asciz ${value}`)
        } else { // array initializer
            value = value.filter(x => x != ",")
            if (size == -1) { // no size given
                size = value.length
            }
            data_section.push(`${name}:`)
            for (i = 0; i < size; i++)
                data_section.push(`${variableTypes[type]} ${value[i]}`)
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
    console.log(clc.red("--- SETTING VARIABLE:"), clc.green(`${name} : ${value}`))
    text_section.push(
        `\nmov %edx, ${value}`,
        `mov ${name}, %edx`
    )
}

global.function_setPointer = function ({ name, value }) {
    text_section.push(
        `\nmov %edx, ${name}`,
        `mov %ecx, ${value}`,
        `mov [%edx], %ecx`
    )
}

global.function_createFunction = function ({ name, parameters, returnType }) {
    text_section.push(`${name}:`)
    //if(name != "main") {
    text_section.push(`_shift_stack_right_`)
    //}

    if (parameters != ["void"]) {
        for (i = parameters.length - 2; i >= 0; i -= 2) {
            var type = parameters[i]
            var sname = `_${name}_${parameters[i + 1]}_`
            text_section.push(
                `pop %edx`,
                `mov ${sname}, %edx`
            )
        }
    }

    var obuffer = []
    if (parameters != ["void"]) {
        for (i = 0; i < parameters.length; i += 2) {
            var type = parameters[i]

            var sname = `_${name}_${parameters[i + 1]}_`
            //var name = parameters[i + 1]
            if (isDefined(parameters[i + 1])) {
                obuffer.push(sname)
                function_createVariable({ name: sname, type, value: 0 })
            }
        }
    }
    inFunction = { isTrue: true, name, returnType, parameters: obuffer }
    variables[name] = { name, function: true, returnType, parameters: obuffer }
}

global.function_runFunction = function ({ name, parameters }) {
    text_section.push("")
    parameters.forEach(x => {
        text_section.push(
            `mov %edx, ${x}`,
            `push %edx`
        )
    })
    text_section.push(
        `\n_shift_stack_left_`,
        `call ${name}`,
        `_shift_stack_right_\n`
    )
}