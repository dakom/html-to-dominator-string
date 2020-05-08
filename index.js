module.exports = function htmlToDominatorString(html) {
    return addNodes(htmlToElement(html), 1, "", false);

    function addNodes(element, nodeDepth, str, withComma) {
        const {tagName, children, attributes} = element;

        const writeLine = (lineDepth, text) => {
            str += makeIndent(lineDepth) + text + '\n';
        }

        writeLine(nodeDepth, `html!("${tagName.toLowerCase()}", {`);

        for(let i = 0; i < attributes.length; i++) {
            const {name, value} = attributes[i];
            if(name.toLowerCase() === "class") {
                const classNames = value.split(" ");
                if(classNames.length) {
                    const classString = classNames.map(x => `"${x}"`).join(",");

                    classNames.forEach(className => {
                        writeLine(nodeDepth + 1, `.class(${classString})`);
                    });
                }
            } else {
                writeLine(nodeDepth + 1, `.attribute("${name}", "${value}")`);
            }
        }

        if(!children.length) {
            //textContent includes all the descendent's text too
            //not sure how to get just this node's
            //in the meantime, assume only leafs are valid text nodes
            //this is also a Dominator requirement atm it seems...
            const text = element.textContent == null ? "" : element.textContent.trim();
            if(text != "") {
                writeLine(nodeDepth + 1, `.text("${text}")`);
            }
        }

        if(children.length) {

            writeLine(nodeDepth + 1, `.children(&mut [`);

            for(let i = 0; i < children.length; i++) {
                str = addNodes(children[i], nodeDepth + 2, str, true);
            }

            writeLine(nodeDepth + 1, `])`);
        }

        if(withComma) {
            writeLine(nodeDepth, `}),`);
        } else {
            writeLine(nodeDepth, `})`);
        }

        return str;
    }
   
    function makeIndent(depth) {
        let indent = "";

        for(let i = 0; i < depth; i++) {
            indent += "\t";
        }

        return indent;
    }
    
    //https://stackoverflow.com/a/35385518/784519
    function htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }
}

