import {CodeJar} from 'codejar';
import {withLineNumbers} from 'codejar/linenumbers';
import Prism from 'prismjs';
import htmlToDominatorString from "../../index";
import {svgDefault, htmlDefault, fullDefault} from "./default";

const inputEditor = document.querySelector('#input');
const inputJar = new CodeJar(
	inputEditor, 
	withLineNumbers(Prism.highlightElement), 
	{tab: '\t'}
);

inputEditor.style.resize = "none"

inputJar.updateCode(fullDefault);

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
	const dominator_string = htmlToDominatorString(html);
	outputJar.updateCode(dominator_string);
}