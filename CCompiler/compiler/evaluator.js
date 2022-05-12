require("./functions.js")

var gline;

function corresponding(line, item, access) {
    return line[item + access];
}

global.evaluate = function (line) {
    line = line.map(x => {
        if (!isDefined(x.type)) {
            x.type = "any"
        }
        return x
    })

    //if (`${line}` != "")
    // console.log(line);

    var token;
    var p1token;
    var p2token;
    var p3token;
    var n1token;
    var n2token;
    var n3token;
    var n4token;

    for (var itemNo = Object.keys(line).length - 1; itemNo >= 0; itemNo--) {
        if (line[itemNo].phrase == "//") {
            itemNo = -1
            return
        }
        token = line[itemNo];

        p1token = () => isDefined(line[itemNo - 1]) ? line[itemNo - 1] : false;
        p2token = () => isDefined(line[itemNo - 2]) ? line[itemNo - 2] : false;
        p3token = () => isDefined(line[itemNo - 3]) ? line[itemNo - 3] : false;

        n1token = () => isDefined(line[itemNo + 1]) ? line[itemNo + 1] : false;
        n2token = () => isDefined(line[itemNo + 2]) ? line[itemNo + 2] : false;
        n3token = () => isDefined(line[itemNo + 3]) ? line[itemNo + 3] : false;
        n4token = () => isDefined(line[itemNo + 4]) ? line[itemNo + 4] : false;

        function tryFunctionPar(word) {
            if (inFunction.isTrue && inFunction.parameters.includes(`_${inFunction.name}_${word}_`)) {
                return `_${inFunction.name}_${word}_`
            }
            return word

        }
        if(tryFunctionPar(token.phrase) != token.phrase) {
            line[itemNo] = {
                phrase: tryFunctionPar(token.phrase),
                type: "assigned"
            }
        }

        if (token.phrase == "=") { // ------------------- ASSIGNMENT -------------------
            if (p1token().type == "unassigned") { // |type unknown = ...| <- variable definition
                if (p2token().type == "type") {
                    function_createVariable({
                        type: p2token().phrase,
                        name: p1token().phrase,
                        value: n1token().phrase
                    })
                } else if (p2token().phrase == "*") {
                    function_createVariable({
                        type: p3token().phrase + "*",
                        name: p1token().phrase,
                        value: n1token().phrase
                    })
                } else if (inFunction.isTrue) { // @#$
                    if (Object.keys(variables).includes(`_${inFunction.name}_${p1token().phrase}_`)) {
                        if (isDefined(p2token()) && p2token().phrase == "*") { // |*known = ... | <- value at pointer redefinition
                            function_setPointer({
                                name: `_${inFunction.name}_${p1token().phrase}_`,
                                value: n1token().phrase
                            })
                        } else { // normal redefintion
                            function_setVariable({
                                name: `_${inFunction.name}_${p1token().phrase}_`,
                                value: n1token().phrase
                            })
                        }
                    }
                    //console.log("undefined variable: ", p1token().phrase);
                }
                else {
                    console.log("undefined:", p1token().phrase)
                }
            } else if (p1token().type == "assigned") { // |known = ...| <- variable definition
                if (isDefined(p2token()) && p2token().phrase == "*") { // |*known = ... | <- value at pointer redefinition
                    function_setPointer({
                        name: p1token().phrase,
                        value: n1token().phrase
                    })
                } else { // normal redefintion
                    function_setVariable({
                        name: p1token().phrase,
                        value: n1token().phrase
                    })
                }
            }

            if (p1token().phrase != "]") {
                return
            }
        } else if (token.phrase == "[") { // ------------------- BUFFER DEFINITION -------------------
            if ((!inFunction.isTrue && !isDefined(variables[`_${inFunction.name}_${p1token().phrase}_`])) && p1token().type == "unassigned") { // |type unknown[...]| <- buffer definition
                // ADD ARRAY INITIALIZERS : ex. {1,2,3} 
                console.log(clc.red("QUANDALE"), n1token())
                if (p2token().type == "type") {
                    if (n1token().phrase == "]") { // undefined length, ex. string
                        if (n3token().phrase == "{") {
                            function_createBuffer({
                                type: p2token().phrase,
                                name: p1token().phrase,
                                value: line.slice(itemNo + 4, -2).map(x => x.phrase)
                            })
                        } else {
                            function_createBuffer({
                                type: p2token().phrase,
                                name: p1token().phrase,
                                value: n3token().phrase,
                            })
                        }
                    } else { // defined length, ex. array
                        //console.log("CHECKKCKCKCKC",line, itemNo)
                        var truth = false;
                        try {
                            truth = n4token().phrase == "{"
                        } catch (e) {
                            //console.log("attmepted:", itemNo + 4)
                            truth = false
                        }
                        if (truth) {
                            function_createBuffer({
                                type: p2token().phrase,
                                name: p1token().phrase,
                                size: n1token().phrase,
                                value: line.slice(itemNo + 5, -2).map(x => x.phrase)
                            })
                        } else {
                            function_createBuffer({
                                type: p2token().phrase,
                                name: p1token().phrase,
                                size: n1token().phrase,
                            })
                        }
                    }
                } else if (p2token().phrase == "*") {
                    function_createBuffer({
                        type: p3token().phrase + "*",
                        name: p1token().phrase,
                        size: n1token().phrase,
                    })
                    return
                } else {
                    console.log("undefined variable: ", p1token());
                }
                return
            } else { // |known[...]| <- array accesss
                console.log(p1token().phrase, token.phrase, n1token().phrase, inFunction.isTrue)
                if (inFunction.isTrue && isDefined(variables[`_${inFunction.name}_${p1token().phrase}_`])) { // if in a function and you are accessing a parameter
                    var p1 = `_${inFunction.name}_${p1token().phrase}_`
                    console.log("hog rider")
                    text_section.push(`_index_array_ ${p1}, ${variableSizes[variables[p1].type]}, ${n1token().phrase}`)
                } else {
                    text_section.push(`_index_array_ ${p1token().phrase}, ${variableSizes[variables[p1token().phrase].type]}, ${n1token().phrase}`)
                }

                line[itemNo - 1] = {
                    phrase: `_temp_reg_`, //do not chage this one
                    type: "assigned"
                }
                line.splice(itemNo, 3)
                // FINISH THIS !!!!!!!!!!!!!! 123 FIND ME ABC !@# QWERTY \
            }
        } else if (token.type == "type" && p1token().phrase == "(" && n1token().phrase == ")" && token.phrase != "void") { // ------- CAST -----
            text_section.push( // HERE 
                `mov %edx, ${n2token().phrase}`,
                `mov _cast_${token.phrase}_, ${variableToRegister(token.phrase, "d")}`
            )
            line[--itemNo] = { phrase: `_cast_${token.phrase}_`, type: "assigned" }
            line.splice(itemNo + 1, 3)
        }


        // ------------------------------------------------------------ FUNCTIONS ------------------------------------------------------------
        else if (token.phrase == "eq") { //evaluation
            var scanPos = itemNo + 3
            text_section.push(`\npush %eax`, `mov %eax, ${line[itemNo + 2].phrase}`)
            while (line[scanPos].phrase != ")") {
                var item = {
                    current: line[scanPos].phrase,
                    previous: line[scanPos - 1].phrase,//parseInt(code[itemNum - 1]) ? code[itemNum - 1] : `[${code[itemNum - 1]}]`,
                    next: line[scanPos + 1].phrase//parseInt(code[itemNum + 1]) ? code[itemNum + 1] : `[${code[itemNum + 1]}]`
                }
                console.log("$$$$$$$", item)
                text_section.push(...((inD) => {
                    switch (inD.current) {
                        case "+":
                            return [`add %eax, ${inD.next}`]
                        case "-":
                            return [`sub %eax, ${inD.next}`]
                        case "x":
                            return [
                                `push %ebx`,
                                `mov %ebx, ${inD.next}`,
                                `mul %ebx`,
                                `pop %ebx`
                            ]
                        case "/":
                            return [
                                `push %ebx`,
                                `mov %ebx, ${inD.next}`,
                                `div %ebx`,
                                `pop %ebx`
                            ]
                        case "%":
                            return [
                                `push %ebx`,
                                `push %edx`,
                                `mov %ebx, ${inD.next}`,
                                `div %ebx`,
                                `mov %eax, %edx`,
                                `pop %edx`,
                                `pop %ebx`
                            ]
                        case "|":
                            return [
                                `push %ebx`,
                                `mov %ebx, ${inD.next}`,
                                `or %eax, %ebx`,
                                `pop %ebx`,
                            ]
                        case "<<":
                            return [
                                `push %ecx`,
                                `mov %cl, ${inD.next}`,
                                `shl %eax, %cl`,
                                `pop %ecx`,
                            ]
                        case ">>":
                            return [
                                `push %ecx`,
                                `mov %cl, ${inD.next}`,
                                `shr %eax, %cl`,
                                `pop %ecx`,
                            ]
                    }
                })(item))
                scanPos += 2;
            }
            text_section.push(`mov _mathResult, %eax`, `pop %eax\n`)
            line[itemNo] = { phrase: "_mathResult", type: "assigned" }
            line.splice(itemNo + 1, scanPos - itemNo)
        }

        else if (token.phrase == "if") {
            // if ( p1 cmp p2 ) {?
            // t n1 n2 n3  n4
            if (p1token().phrase == "else") { // else if

                var skip = endifLabel(1, 1)
                // when it's formatted like "} else if(...)" instead of "} \n else if(...)" it breaks HERE ME BROKEN !# 123
                text_section.splice(-2, 0, `jmp ${skip}`)

                text_section.push(
                    `mov %eax, ${n2token().phrase}`,
                    `mov %ebx, ${n4token().phrase}`,
                    `cmp %eax, %ebx`,
                    `${compares[n3token().phrase]} ${endifLabel(0, 1)}`, //jump to 1, true
                    `jmp ${endifLabel(0, 1)}`, // jump to 0, false
                    `${endifLabel(-2, 2)}:`,// label 1
                )
                parenthesisStack.push({
                    bracket: "{",
                    type: "conditional",
                    data: {
                        finish: endifLabel(-1, 3),
                        subType: "else if",
                        blockSkip: skip
                    }
                })
            } else {

                text_section.push(
                    `mov %eax, ${n2token().phrase}`,
                    `mov %ebx, ${n4token().phrase}`,
                    `cmp %eax, %ebx`,
                    `${compares[n3token().phrase]} ${endifLabel(0, 1)}`, //jump to 1, true
                    `jmp ${endifLabel(0, 1)}`, // jump to 0, false
                    `${endifLabel(-2, 2)}:`,// label 1
                )
                parenthesisStack.push({
                    bracket: "{",
                    type: "conditional",
                    data: {
                        finish: endifLabel(-1, 3),
                        subType: "if"
                    }
                })
            }

        }

        else if (token.phrase == "else") {
            parenthesisStack.push({
                bracket: "{",
                type: "conditional",
                data: {
                    subType: "else",
                    finsih
                }
            })
            // FINISH ELSE HERE BROKEN
            if (n1token().phrase != "if") {
                text_section.push(
                    `jmp ${ifTerm()}`,
                    `${endifLabel(1)}:`,
                )
            }
        }
        else if (token.phrase == "while") {
            inWhile = true
            console.log("while pp", line)
            text_section.push(
                `${whileLabel()}:`,
                `mov %edx, ${n2token().phrase}`,
                `push %edx`,
                `mov %edx, ${n4token().phrase}`,
                `push %edx`,
            )
            parenthesisStack.push({
                bracket: "{",
                type: "while",
                data: {
                    compareType: n3token().phrase,
                    label: whileLabel(1)
                }
            })
        }
        // -----------------------------------------------------------------------------------------------------------------------------------
        else if (token.phrase == "&") {
            text_section.push(
                `lea %eax, ${n1token().phrase}`,
                `mov ${use_tempbase()}, %eax`
            )
            line[itemNo] = { phrase: use_tempbase(1), type: "assinged" }
            line.splice(itemNo + 1, 1)
        }

        else if (token.phrase == ":") { // label
            text_section.push(p1token().phrase + ":")
        }

        else if (Object.keys(internal_macros).includes(token.phrase)) { // internal macro
            text_section.push(`${token.phrase} ${line.map(x => x.phrase).slice(itemNo + 1, internal_macros[token.phrase] + 1)}`)
        }


        //NEEDS TO BE AT THE END
        else if (token.phrase == "return") {
            text_section.push(
                `mov %edx, ${n2token().phrase}`,
                `mov _return_${inFunction.returnType}_, %edx`
            )
            console.log("RETURN", line.slice(itemNo + 2, -2).map(x => x.phrase).filter(x => x != ","))
            return;
        }
        else if (isDefined(n1token()) ? (n1token().phrase == "(" || (n1token().phrase == ")" && n2token().phrase == "(")) : false) { // current token is a unknown/function call
            console.log("PFUNC ------", line, itemNo)
            if (token.type == "unassigned" && p1token().type == "type") { // |type unknown(...)| <- function definition
                // add prototypes?
                console.log("BAAANNAAAAA", line.slice(itemNo + 2, -1).map(x => x.phrase).filter(x => x != ","))
                if (line.at(-1).phrase == ")") {
                    function_createFunction({
                        name: token.phrase,
                        returnType: p1token().phrase,
                        parameters: line.slice(itemNo + 2, -1).map(x => x.phrase).filter(x => x != ",")
                    })

                } else if (line.at(-1).phrase == "{") {
                    function_createFunction({
                        name: token.phrase,
                        returnType: p1token().phrase,
                        parameters: line.slice(itemNo + 2, -2).map(x => x.phrase).filter(x => x != ",")
                    })
                }
                line = [{ phrase: ';', type: 'any' }]
                parenthesisStack.push({ bracket: "{", type: "function", returnType: p1token().phrase })

            } else { // function call
                if (token.phrase == ")") { // |(variable)(...)| Function as pointer
                    
                    var cpos = itemNo + 1
                    while (true) {
                        if (line[cpos].phrase == ")") {
                            break
                        }
                        cpos++
                    }

                    var pars = line.slice(itemNo + 2, cpos).map(x => x.phrase).filter(x => x != ",")
                    console.log("******POINTER FUNC", String(pars))
                    if (String(pars) == "") {
                        console.log("yuh")
                        pars = []
                    }
                    
                    function_runFunction({
                        name: tryFunctionPar(p1token().phrase),
                        parameters: pars,
                        indirect: true
                    })
                    console.log("BSPLICE", line)
                    line[itemNo] = { phrase: `_return_int_`, type: "assigned" }
                    line.splice(itemNo + 1, pars.length + 2)
                    console.log("ASPLICE", line)
                } else { // normal function
                    var cpos = itemNo
                    while (true) {
                        if (line[cpos].phrase == ")") {
                            break
                        }
                        cpos++
                    }
                    var pars = line.slice(itemNo + 2, cpos).map(x => x.phrase).filter(x => x != ",")
                    console.log("******", pars.join())
                    if (pars == ")") {
                        console.log("yuh")
                        pars = []
                    }
                    function_runFunction({
                        name: token.phrase,
                        parameters: pars
                    })
                    if (isDefined(variables[token.phrase])) {
                        line[itemNo] = { phrase: `_return_${variables[token.phrase].returnType}_`, type: "assigned" }
                        line.splice(itemNo + 1, pars.length)
                    } else {
                        console.log("BSPLICE", line)
                        line[itemNo] = { phrase: `_return_int_`, type: "assigned" }
                        line.splice(itemNo + 1, pars.length + 2)
                        console.log("ASPLICE", line)
                    }
                }
            }

            /*else if (isDefined(p1token()) && line.at(-2).phrase == ")" && line.at(-1).phrase == ";") {   // |known(...)| <- function call
                var pars = line.slice(itemNo + 2, -2).map(x => x.phrase).filter(x => x != ",")
                console.log("******", pars.join())
                if (pars == ")") {
                    console.log("yuh")
                    pars = []
                }
                function_runFunction({
                    name: token.phrase,
                    parameters: pars
                })
                if (isDefined(variables[token.phrase])) {
                    line[itemNo] = { phrase: `_return_${variables[token.phrase].returnType}_`, type: "assigned" }
                    line.splice(itemNo + 1, pars.length)
                } else {
                    console.log("BSPLICE", line)
                    line[itemNo] = { phrase: `_return_int_`, type: "assigned" }
                    line.splice(itemNo + 1, pars.length + 2)
                    console.log("ASPLICE", line)
                }
            } */
        } else if (token.phrase == "*") { // ------------------- POINTERS -------------------
            //console.log("CALLING OBAMA #AM", p1token())
            function SYMBOLTEST() {
                var output = arrobj_includes(line, (x) => x.phrase == "eq")
                var is_times_symbol = false
                var substack = 1
                var returnFalse = false
                if (output != -1) {
                    var i = output;
                    while (i < line.length) {
                        if (line[i].phrase == ")") {
                            substack--
                        } else if (line[i].phrase == "(") {
                            substack++
                        } else if (line[i].phrase == "*") {
                        }
                        if (substack == 0) { // there is an equation on the line, but it is out of our area
                            i = itemNo //exit
                            returnFalse = true
                        }
                        i++
                    }
                    if (!returnFalse) { // didnt force exit, meainnig

                    }
                }
            }
            if (n1token().type == "unassigned" && p1token().type == "type") { //creating pointer variable
                if (!((isDefined(line[2]) ? line[2].phrase == "(" : false) && line[1].type == "unassigned" && line[0].type == "type")) { // if function  def
                    if (n2token().phrase == "=") { //with definiton
                        function_createVariable({
                            type: p1token().phrase + "*",
                            name: n1token().phrase,
                            value: n3token().phrase,
                        })
                    } else { // without definiton
                        function_createVariable({
                            type: p1token().phrase + "*",
                            name: n1token().phrase,
                        })
                    }
                }
            } else if (n1token().type == "assigned") {

                var tempreg = "%edx"
                switch (variables[n1token().phrase].type) {
                    case "char":
                        tempreg = "%dl"
                        break
                    case "short":
                        tempreg = "%dx"
                }
                // HERE COMPAING POINTER 
                text_section.push(
                    `mov %edx, ${n1token().phrase}`,
                    `mov ${tempreg}, [%edx]`,
                    `mov ${use_tempreg()}, ${tempreg}`
                )
                line[itemNo] = {
                    phrase: use_tempreg(1),
                    type: "assigned"
                }
                line.splice(itemNo + 1, 1)
                console.log("RIPBOZO", line)

            }
        }
        else if (token.phrase == "}") { // at the end of a function
            if (isDefined(parenthesisStack.at(-1)) && parenthesisStack.at(-1).bracket == "{") {
                if (parenthesisStack.at(-1).type == "while") { // end of while
                    //text_section.push("cokc")
                    text_section.push(
                        `\npop %edx`,
                        `pop %eax`,
                        `cmp %eax, %edx`,
                        `${compares[parenthesisStack.at(-1).data.compareType]} ${parenthesisStack.at(-1).data.label}`,
                    )
                    parenthesisStack.pop()
                }
                else if (inFunction.isTrue && parenthesisStack.at(-1).type == "function") { // end of function
                    text_section.push(
                        `\n_shift_stack_left_`,
                        `ret`,
                        `# ------ END FUNCTION ------\n`
                    )
                    inFunction = { isTrue: false };
                    parenthesisStack.pop()
                } else if (parenthesisStack.at(-1).type == "conditional") {
                    var recent = parenthesisStack.at(-1)
                    //console.log(recent)
                    if (recent.data.subType == "if") {
                        text_section.push(`${recent.data.finish}:`)
                    } else if (recent.data.subType == "else if") {
                        text_section.push(`${recent.data.blockSkip}:`)
                        text_section.push(`${recent.data.finish}:`)
                    }
                    leftOver_if_data = parenthesisStack.at(-1).data.finish
                    parenthesisStack.pop()
                }
            }
        }
        //console.log("PSTCK", parenthesisStack)
    }
}