import {CodeJar} from 'codejar';
import {withLineNumbers} from 'codejar/linenumbers';
import Prism from 'prismjs';
import htmlToDominatorString from "../../index";

const inputEditor = document.querySelector('#input');
const inputJar = new CodeJar(
	inputEditor, 
	withLineNumbers(Prism.highlightElement), 
	{tab: '\t'}
);

inputEditor.style.resize = "none"

inputJar.updateCode(

`<header class="fancy">
  <div class="flex mb-4">
    <div class="cell">
        One of three columns
    </div>
    <div class="cell bg-indigo-100">
        <div class="green text-4xl">Two of three columns</div>
    </div>
    <div class="cell">
        Profile
    </div>
  </div>
</header>`
);

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