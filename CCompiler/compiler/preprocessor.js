global.preprocess = function () { // takes the current line and applies macros
    modded = 0
    var mylineC = tokenize(code[lineNumber] + ";")
    if (mylineC[0].phrase == "#define") {
        var name = mylineC[1].phrase
        if(mylineC[2].phrase == "(") {
            var buffer = []
            var item = 3;
            while(mylineC[item].phrase != ')') {
                buffer.push(mylineC[item++].phrase)
            }
            define_fmacros[name] = {
                replace: mylineC.slice(item + 1, -1).map(x => x.phrase).join("\\"),
                parameters: buffer
            }
            //crit_error("Template Macros not yet supported", define_fmacros[name].replace)

        }
        else {
            console.log(clc.blue("-> macro"), clc.green(name), mylineC.slice(2, -1).map(x => x.phrase).join(" "))
            data_section.push(name + " = " + mylineC.slice(2, -1).map(x => x.phrase).join(" "))
            
            defines[name] = mylineC.slice(2, -1).map(x => x.phrase).join(" ")
        }
        return "skip"
    } else if (mylineC[0].phrase == "/" && mylineC[0].phrase == "/") {
        return "skip"
    }

    for (var i = 0; i < lineContents.length; i++) {
        var curr = lineContents[i]
        // Object.keys(defines).forEach(key => { // normal replacement
        //     if (curr.phrase == key && (isDefined(defines[key]))) {
        //         lineContents[i].phrase = defines[key]
        //         modded = 1
        //         //console.log("rep", lineContents)
        //     }
        // })
        Object.keys(define_fmacros).forEach(key => { // template macro
            var stringArr = define_fmacros[key].replace.split("\\")
            var pbuffer = []
            if (curr.phrase == key && (isDefined(define_fmacros[key]))) {
                var oi = i++
                for(var s = 0; s < define_fmacros[key].parameters.length; s++) { // load each parameter
                    pbuffer.push(lineContents[++i].phrase)
                }
                pbuffer.forEach((x,ind) => {
                    //console.log(define_fmacros[key].parameters[ind], x)
                    stringArr = stringArr.map(v => v == define_fmacros[key].parameters[ind]? x : v)
                })
                //lineContents.splice(oi, 2, stringArr.join(" "))
                lineContents[oi].phrase = stringArr.join(" ")
                lineContents.splice(1, pbuffer.length + 2)

                // console.log(lineContents.map(x => x.phrase))
                // process.exit(1)
                modded = 1
            }
        })
    }
    if(modded) {
        lineContents = lineContents.map(x => x.phrase).join("")
        return "retoken"
    }
    return 1
}



