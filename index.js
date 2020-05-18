module.exports = function htmlToDominatorString(html, options) {

    options = options == null 
        ? {trim: false} 
        : options;

    return addNodes(
        htmlToElement(html), 
        {
            nodeDepth: 0,
            str: "",
            withComma: false,
            parentTag: "html"
        }
    );

    function addNodes(element, state) {

        const {tagName, attributes, nodeType} = element;
        let {nodeDepth, str, withComma} = state;

        // childNodes includes all child nodes—including non-element nodes like text and comment nodes. 
        // To get a collection of only elements, use ParentNode.children instead.
        // - https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
        const children = element.childNodes;


        const parentTag = element.tagName === "html" || element.tagName === "svg"
            ? element.tagName
            : state.parentTag;


        const writeLine = (lineDepth, text) => {
            str += makeIndent(lineDepth) + text + '\n';
        }

        // node types: https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        if(nodeType == 3) {
            const trimmedText = element.textContent == null ? "" : element.textContent.trim();

            if(trimmedText != "") {
                const text = options.trim ? trimmedText : element.textContent;
                writeLine(nodeDepth, `text("${text}"),`);
            }
            /*

            */

            if(children && children.length) {
                throw new Error("text nodes with children? very confusing!!");
            }
        } else if(nodeType == 1) {


            writeLine(nodeDepth, `${parentTag}!("${tagName.toLowerCase()}", {`);

            for(let i = 0; i < attributes.length; i++) {
                const {name, value} = attributes[i];
                if(name.toLowerCase() === "class") {
                    const classNames = value.split(" ");
                    if(classNames.length) {
                        if(classNames.length === 1) {
                            writeLine(nodeDepth + 1, `.class("${classNames[0]}")`);
                        } else {
                            const classString = classNames.map(x => `"${x}"`).join(",");
                            writeLine(nodeDepth + 1, `.class([${classString}])`);
                        }
                    }
                } else {
                    writeLine(nodeDepth + 1, `.attribute("${name}", "${value}")`);
                }
            }


            //for clarity - this is a separate if since the above check will ideally go away
            if(children.length) {

                writeLine(nodeDepth + 1, `.children(&mut [`);

                for(let i = 0; i < children.length; i++) {
                    str = addNodes(
                        children[i], 
                        {
                            nodeDepth: nodeDepth + 2, 
                            str, 
                            withComma: true,
                            parentTag,
                        });
                }

                writeLine(nodeDepth + 1, `])`);
            }

            if(withComma) {
                writeLine(nodeDepth, `}),`);
            } else {
                writeLine(nodeDepth, `})`);
            }
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

