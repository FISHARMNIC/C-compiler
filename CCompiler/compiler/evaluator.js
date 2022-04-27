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
        token = line[itemNo];

        p1token = () => isDefined(line[itemNo - 1]) ? line[itemNo - 1] : false;
        p2token = () => isDefined(line[itemNo - 2]) ? line[itemNo - 2] : false;
        p3token = () => isDefined(line[itemNo - 3]) ? line[itemNo - 3] : false;

        n1token = () => isDefined(line[itemNo + 1]) ? line[itemNo + 1] : false;
        n2token = () => isDefined(line[itemNo + 2]) ? line[itemNo + 2] : false;
        n3token = () => isDefined(line[itemNo + 3]) ? line[itemNo + 3] : false;
        n4token = () => isDefined(line[itemNo + 4]) ? line[itemNo + 4] : false;

        if (inFunction.isTrue && inFunction.parameters.includes(`_${inFunction.name}_${token.phrase}_`)) {
            line[itemNo] = {
                phrase: `_${inFunction.name}_${token.phrase}_`,
                type: "assigned"
            }
            token = line[itemNo]
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
                }
                else {
                    console.log("undefined variable: ", p1token().phrase);
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
            if (p1token().type == "unassigned") { // |type unknown[...]| <- buffer definition
                // ADD ARRAY INITIALIZERS : ex. {1,2,3} 
                console.log(clc.red("QUANDLE"), n1token())
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
                text_section.push(`_index_array_ ${p1token().phrase}, ${variableSizes[variables[p1token().phrase].type]}, ${n1token().phrase}`)
                line[itemNo - 1] = {
                    phrase: `_temp_reg_`,
                    type: "assigned"
                }
                line.splice(itemNo, 3)
                // FINISH THIS !!!!!!!!!!!!!! 123 FIND ME ABC !@# QWERTY \
            }
        } else if (token.phrase == "*") { // ------------------- POINTERS -------------------
            //console.log("CALLING OBAMA #AM", p1token())
            if (n1token().type == "unassigned" && p1token().type == "type") { //creating pointer variable
                if (n2token().phrase == "=") { //with definiton
                    function_createVariable({
                        type: p1token().phrase,
                        name: n1token().phrase + "*",
                        value: n3token().phrase,
                    })
                } else { // without definiton
                    function_createVariable({
                        type: p1token().phrase + "*",
                        name: n1token().phrase,
                    })
                }
            } else if (n1token().type == "assigned") {
                text_section.push(
                    `mov %edx, ${n1token().phrase}`,
                    `mov %edx, [%edx]`,
                    `mov _temp_reg_, %edx`
                )
                line[itemNo] = {
                    phrase: `_temp_reg_`,
                    type: "assigned"
                }
                line.splice(itemNo + 1, 1)
                console.log("RIPBOZO", line)

            }
        }
        /*
        //else if (mathOperations.includes(token.phrase)) {
        //     console.log("eval:", p1token().phrase, token.phrase, n1token().phrase)
        //     switch(token.phrase) {
        //         case "+":
        //             text_section.push(
        //                 `mov %eax, ${p1token().phrase}`,
        //                 `add %eax, ${n1token().phrase}`,
        //             )
        //             break;
        // case "-":
        //     text_section.push(
        //         `mov %eax, ${p1token().phrase}`,
        //         `sub %eax, ${n1token().phrase}`,
        //     )
        //     break;
        // case "/":
        //     text_section.push(
        //         `mov %eax, ${p1token().phrase}`,
        //         `mov %ebx, ${n1token().phrase}`
        //         `div %ebx, ${n1token().phrase}`,
        //     )
        //     break;
        // case "x": // MAKE SYMBOL TABLE FOR STUPID POINTER IS MLT SIGN
        //     text_section.push(
        //         `mov %eax, ${p1token().phrase}`,
        //         `mov %ebx, ${n1token().phrase}`
        //         `mul %ebx, ${n1token().phrase}`,
        //         )
        //         break;
        //     case "|":
        //         break;
        //     // ALSO SYMBOL TABLE FOR "AND"
        // }
        // text_section.push(`mov _mathResult, %eax`)
        // line[itemNo - 1] = {phrase: "_mathResult", type: "assigned"}
        // line.splice(itemNo, 2)
        */
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
            line[itemNo] = {phrase:"_mathResult", type:"assigned"}
            line.splice(itemNo + 1, scanPos - itemNo)
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
        else if (isDefined(n1token()) ? n1token().phrase == "(" : false) {
            console.log("PFUNC ------", line)
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
                parenthesisStack.push("{")
            } else if ((isDefined(p1token()) ? true : false) && line.at(-2).phrase == ")" && line.at(-1).phrase == ";") {// |known(...);| <- function call
                function_runFunction({
                    name: token.phrase,
                    parameters: line.slice(itemNo + 2, -2).map(x => x.phrase).filter(x => x != ",")
                })
            }
        }
        else if (token.phrase == "}" && parenthesisStack.at(-1) == "{" && inFunction.isTrue) { // at the end of a function
            text_section.push(
                `\n_shift_stack_left_`,
                `ret`,
                `# ------ END FUNCTION ------\n`
            )
            inFunction = { isTrue: false };
            parenthesisStack.pop()
        }
        //console.log("PSTCK", parenthesisStack)
    }
}