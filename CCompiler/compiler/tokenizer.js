global.tokenize = function (lineContents) {
    var lineBuffer = new Array();
    var buildBuffer = new Array();
    var lastFrontSeparator = ' ';

    if (lineContents == []) return [];

    /*
    return: 
    {
        phrase: token,
        type: treatment
    }
    */
    var inquote = false
    for (var i = 0; i < lineContents.length; i++) {
        if (separators.includes(lineContents[i])) {
            if (lineContents[i] = ' ' && !inquote) {
                if (buildBuffer != [" "]) {
                    if (buildBuffer.length != 0) {
                        lineBuffer.push(
                            {
                                phrase: buildBuffer.join(""),
                                type: (function (bb) {
                                    var _fin;
                                    Object.entries(typeGuesses).every((item, index) => {
                                        if (item[1](bb)) {
                                            _fin = item[0]
                                            //console.log("found", _fin)
                                            return false
                                        }
                                        return true
                                    })
                                    return _fin == undefined ? "any" : _fin
                                })(buildBuffer.join(""))
                            }
                        )
                    }
                    if (lineContents[i] != " " && lineContents[i] != "" && lineContents[i].length > 0) {
                        lineBuffer.push(
                            {
                                phrase: lineContents[i],
                                type: "any"
                            }
                        )
                    }
                }
                buildBuffer = []
                lastFrontSeparator = lineContents[i];
            } else {
                buildBuffer.push(lineContents[i]);
            }
        } else {
            buildBuffer.push(lineContents[i]);
            if (lineContents[i] == '"')
                inquote = !inquote
        }
    }
    return lineBuffer;
}