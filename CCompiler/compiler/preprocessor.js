global.preprocess = function () { // takes the current line and applies macros
    modded = 0
    var mylineC = tokenize(code[lineNumber] + ";")
    if (mylineC[0].phrase == "#define") {
        var name = mylineC[1].phrase
        if(!name.includes("(")) {
            console.log(clc.blue("-> macro"), clc.green(name), mylineC.slice(2, -1).map(x => x.phrase).join(" "))
            defines[name] = mylineC.slice(2, -1).map(x => x.phrase).join(" ")
        } else {
            console.error("Template Macros not yet supported")
        }
        return "skip"
    } else if (mylineC[0].phrase == "/" && mylineC[0].phrase == "/") {
        return "skip"
    }

    for (i = 0; i < lineContents.length; i++) {
        var curr = lineContents[i]
        Object.keys(defines).forEach(key => {
            if (curr.phrase == key && (isDefined(defines[key]))) {
                lineContents[i].phrase = defines[key]
                modded = 1
                //console.log("rep", lineContents)
            }
        })
    }
    if(modded) {
        lineContents = lineContents.map(x => x.phrase).join("")
        return "retoken"
    }
    return 1
}



