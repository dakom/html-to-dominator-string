import {CodeJar} from 'codejar';
import {withLineNumbers} from 'codejar/linenumbers';
import Prism from 'prismjs';
import htmlToDominatorString from "../../index";
import {svgDefault, htmlDefault, fullDefault, textNodeDefault} from "./default";

const DEBUG = true;

const opts = {attrKind: "multiline"};

function setAttrKind(kind) {
    document.querySelector(`input[type='radio'][name=attr_kind][value=${kind}]`).checked = true;
}

function getAttrKind() {
    return document.querySelector("input[type='radio'][name=attr_kind]:checked").value;
}

function onAttrKindChange(f) {
    document.querySelectorAll("input[type='radio'][name=attr_kind]").forEach(input => {
        input.onchange = () => f(getAttrKind());
    });
}

setAttrKind(opts.attrKind);
onAttrKindChange(kind => {
    console.log(kind);
    render();
});


const inputEditor = document.querySelector('#input');
const inputJar = new CodeJar(
	inputEditor, 
	withLineNumbers(Prism.highlightElement), 
	{tab: '\t'}
);

inputEditor.style.resize = "none"

inputJar.updateCode(DEBUG ? fullDefault : "");

inputJar.onUpdate(code => {
	//just in case jar's toString is updated after this
	requestAnimationFrame(render);
});

const outputEditor = document.querySelector('#output');
const outputJar = new CodeJar(
	outputEditor, 
	withLineNumbers(Prism.highlightElement), 
	{tab: '\t'}
);

outputEditor.style.resize = "none"

document.querySelector("#copy").onclick = () => {
    copyTextToClipboard(outputJar.toString());
}

render();

function render() {
	const html = inputJar.toString();
        const opts = {
            attrKind: getAttrKind()
	};

	const dominator_string = htmlToDominatorString(html, opts);
	outputJar.updateCode(dominator_string);
}

// https://stackoverflow.com/a/30810322/784519
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            if(document.execCommand('copy')) {
                console.log('copied to clipboard');
            } else {
                console.error('Fallback copy to clipboard failed');
            }
        } catch (err) {
            console.error('Fallback copy to clipboard failed: ', err);
        }

        document.body.removeChild(textArea);
    } else {
        navigator.clipboard.writeText(text).then(function() {
            console.log('copied to clipboard');
        }, function(err) {
            console.error('could not copy to clipboard: ', err);
        });
    }
}
