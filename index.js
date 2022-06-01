module.exports = function htmlToDominatorString(html, opts) {

    opts = opts || {};

    const {attrKind} = opts;

    //white space collapsing is complicated. See: https://www.w3.org/TR/css-text-3/#white-space-processing
    //therefore we wrap it in a custom element, then process it via its innerText
    //the custom element behaves like a classless <span>
    //while also protecting us from global <span> CSS, just in case

    if(!customElements.get('html-to-dominator-string')) {
        class CustomTextElement extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({mode: 'closed'});

            }
        }

        customElements.define('html-to-dominator-string', CustomTextElement, {extends: "span"});
    }


    const [element, container] = htmlToElement(html);

    const str = addNodes(
        element, 
        {
            nodeDepth: 0,
            str: "",
            withComma: false,
            parentTag: "html"
        }
    );

    container.remove();

    return str;

    function addNodes(element, state) {
        let {nodeDepth, str, withComma} = state;
        if(element == null) {
            return str;
        }
        const {tagName, attributes, nodeType} = element;

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

        const writeTextNode = (nodeDepth, element) => {
            //See note above, about white space collapsing
            const textContent = element.textContent;

            if(textContent.trim() !== "") {

                //create the custom element
                const textElement = document.createElement("html-to-dominator-string");
                //append the text content as a new child text node
                textElement.appendChild(document.createTextNode(textContent));
                //swap the current (text node) element with the custom element
                element.replaceWith(textElement);
                //get the innerText (since the custom element extends span, it'll be formatted properly)
                const innerText = textElement.innerText;
                //write it out
                writeLine(nodeDepth, `.text("${innerText}")`);
            }
        }

        // node types: https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        if(nodeType == 3) {
            writeTextNode(nodeDepth, element);
            if(children && children.length) {
                throw new Error("text nodes with children? very confusing!!");
            }

        } else if(nodeType == 1) {


            writeLine(nodeDepth, `${parentTag}!("${tagName.toLowerCase()}", {`);

            const attrMacroPairs = [];
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
                    if(attrKind === "reg" || attrKind === "prop") {
                        const attributeMethod = attrKind === "reg" ? "attr" : "prop";
                        writeLine(nodeDepth + 1, `.${attributeMethod}("${name}", "${value}")`);
                    } else {
                        attrMacroPairs.push({name, value});
                    }
                }
            }
            if(attrMacroPairs.length) {
                let attrStr = attrMacroPairs.reduce((acc, curr, idx) => {
                    if(idx) {
                        acc += ", ";
                    }
                    const {name, value} = curr;
                    acc += `${name}="${value}"`;
                    return acc;
                }, "");
                writeLine(nodeDepth + 1, `.attrs!{${attrStr}}`);
            }


            const textChildren = [];
            const realChildren = [];
            for(let i = 0; i < children.length; i++) {
                const element = children[i];
                if(element.nodeType == 3) {
                    textChildren.push(element);
                } else {
                    realChildren.push(element);
                }
            }

            textChildren.forEach(child => writeTextNode(nodeDepth + 1, child));

            if(realChildren.length) {            
                if(realChildren.length === 1) {
                    writeLine(nodeDepth + 1, `.child(`);

                    for(let i = 0; i < realChildren.length; i++) {
                        str = addNodes(
                            realChildren[i], 
                            {
                                nodeDepth: nodeDepth + 2, 
                                str, 
                                parentTag,
                            });
                    }

                    writeLine(nodeDepth + 1, `)`);
                } else {
                    writeLine(nodeDepth + 1, `.children([`);

                    for(let i = 0; i < realChildren.length; i++) {
                        str = addNodes(
                            realChildren[i], 
                            {
                                nodeDepth: nodeDepth + 2, 
                                str, 
                                withComma: true,
                                parentTag,
                            });
                    }

                    writeLine(nodeDepth + 1, `])`);
                }
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
    
    function htmlToElement(html) {
        const hiddenContainer = document.createElement("div");
        const offScreenContainer = document.createElement("div");

        hiddenContainer.style.position = "relative";
        hiddenContainer.style.overflow = "hidden";

        offScreenContainer.innerHTML = html.trim();
        offScreenContainer.normalize();
        offScreenContainer.style.position = "absolute";
        offScreenContainer.style.left = "calc(100vw + 1em)";
        offScreenContainer.style.top= "0";
        
        hiddenContainer.appendChild(offScreenContainer);
        document.body.appendChild(hiddenContainer);

        return [offScreenContainer.firstChild, hiddenContainer];
    }

}

