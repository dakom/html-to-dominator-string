import {CodeJar} from 'codejar';
import {withLineNumbers} from 'codejar/linenumbers';
import Prism from 'prismjs';
import htmlToDominatorString from "../../index";
import {svgDefault, htmlDefault, fullDefault, textNodeDefault} from "./default";

const DEBUG = true;

const opts = {attrKind: "reg"};

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

render();

function render() {
	const html = inputJar.toString();
        const opts = {
            attrKind: getAttrKind()
	};

	const dominator_string = htmlToDominatorString(html, opts);
	outputJar.updateCode(dominator_string);
}
