!function(){"use strict";const e=window;function t(t,n,a){const r=Object.assign({tab:"\t",indentOn:/[({\[]$/,moveToNewLine:/^[)}\]]/,spellcheck:!1,catchTab:!0,preserveIdent:!0,addClosing:!0,history:!0,window:e},a),o=r.window,s=o.document;let i,l,u=[],c=[],d=-1,g=!1;t.setAttribute("contenteditable","plaintext-only"),t.setAttribute("spellcheck",r.spellcheck?"true":"false"),t.style.outline="none",t.style.overflowWrap="break-word",t.style.overflowY="auto",t.style.whiteSpace="pre-wrap";let p=!1;n(t),"plaintext-only"!==t.contentEditable&&(p=!0),p&&t.setAttribute("contenteditable","true");const f=N((()=>{const e=b();n(t,e),x(e)}),30);let h=!1;const m=e=>!C(e)&&!S(e)&&"Meta"!==e.key&&"Control"!==e.key&&"Alt"!==e.key&&!e.key.startsWith("Arrow"),y=N((e=>{m(e)&&(A(),h=!1)}),300),v=(e,n)=>{u.push([e,n]),t.addEventListener(e,n)};function b(){const e=j(),n={start:0,end:0,dir:void 0};let{anchorNode:a,anchorOffset:r,focusNode:o,focusOffset:i}=e;if(!a||!o)throw"error1";if(a.nodeType===Node.ELEMENT_NODE){const e=s.createTextNode("");a.insertBefore(e,a.childNodes[r]),a=e,r=0}if(o.nodeType===Node.ELEMENT_NODE){const e=s.createTextNode("");o.insertBefore(e,o.childNodes[i]),o=e,i=0}return E(t,(e=>{if(e===a&&e===o)return n.start+=r,n.end+=i,n.dir=r<=i?"->":"<-","stop";if(e===a){if(n.start+=r,n.dir)return"stop";n.dir="->"}else if(e===o){if(n.end+=i,n.dir)return"stop";n.dir="<-"}e.nodeType===Node.TEXT_NODE&&("->"!=n.dir&&(n.start+=e.nodeValue.length),"<-"!=n.dir&&(n.end+=e.nodeValue.length))})),t.normalize(),n}function x(e){const n=j();let a,r,o=0,s=0;if(e.dir||(e.dir="->"),e.start<0&&(e.start=0),e.end<0&&(e.end=0),"<-"==e.dir){const{start:t,end:n}=e;e.start=n,e.end=t}let i=0;E(t,(t=>{if(t.nodeType!==Node.TEXT_NODE)return;const n=(t.nodeValue||"").length;if(i+n>e.start&&(a||(a=t,o=e.start-i),i+n>e.end))return r=t,s=e.end-i,"stop";i+=n})),a||(a=t,o=t.childNodes.length),r||(r=t,s=t.childNodes.length),"<-"==e.dir&&([a,o,r,s]=[r,s,a,o]),n.setBaseAndExtent(a,o,r,s)}function w(){const e=j().getRangeAt(0),n=s.createRange();return n.selectNodeContents(t),n.setEnd(e.startContainer,e.startOffset),n.toString()}function k(){const e=j().getRangeAt(0),n=s.createRange();return n.selectNodeContents(t),n.setStart(e.endContainer,e.endOffset),n.toString()}function F(e){if(p&&"Enter"===e.key)if(O(e),e.stopPropagation(),""==k()){T("\n ");const e=b();e.start=--e.end,x(e)}else T("\n")}function A(){if(!g)return;const e=t.innerHTML,n=b(),a=c[d];if(a&&a.html===e&&a.pos.start===n.start&&a.pos.end===n.end)return;d++,c[d]={html:e,pos:n},c.splice(d+1);d>300&&(d=300,c.splice(0,1))}function E(e,t){const n=[];e.firstChild&&n.push(e.firstChild);let a=n.pop();for(;a&&"stop"!==t(a);)a.nextSibling&&n.push(a.nextSibling),a.firstChild&&n.push(a.firstChild),a=n.pop()}function $(e){return e.metaKey||e.ctrlKey}function C(e){return $(e)&&!e.shiftKey&&"KeyZ"===e.code}function S(e){return $(e)&&e.shiftKey&&"KeyZ"===e.code}function T(e){e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),s.execCommand("insertHTML",!1,e)}function N(e,t){let n=0;return(...a)=>{clearTimeout(n),n=o.setTimeout((()=>e(...a)),t)}}function L(e){let t=e.length-1;for(;t>=0&&"\n"!==e[t];)t--;t++;let n=t;for(;n<e.length&&/[ \t]/.test(e[n]);)n++;return[e.substring(t,n)||"",t,n]}function _(){return t.textContent||""}function O(e){e.preventDefault()}function j(){var e;return(null===(e=t.parentNode)||void 0===e?void 0:e.nodeType)==Node.DOCUMENT_FRAGMENT_NODE?t.parentNode.getSelection():o.getSelection()}return v("keydown",(e=>{e.defaultPrevented||(l=_(),r.preserveIdent?function(e){if("Enter"===e.key){const t=w(),n=k();let[a]=L(t),o=a;if(r.indentOn.test(t)&&(o+=r.tab),o.length>0?(O(e),e.stopPropagation(),T("\n"+o)):F(e),o!==a&&r.moveToNewLine.test(n)){const e=b();T("\n"+a),x(e)}}}(e):F(e),r.catchTab&&function(e){if("Tab"===e.key)if(O(e),e.shiftKey){const e=w();let[t,n]=L(e);if(t.length>0){const e=b(),a=Math.min(r.tab.length,t.length);x({start:n,end:n+a}),s.execCommand("delete"),e.start-=a,e.end-=a,x(e)}}else T(r.tab)}(e),r.addClosing&&function(e){const t="([{'\"",n=")]}'\"",a=k(),r=w(),o="\\"===r.substr(r.length-1),s=a.substr(0,1);if(n.includes(e.key)&&!o&&s===e.key){const t=b();O(e),t.start=++t.end,x(t)}else if(t.includes(e.key)&&!o&&("\"'".includes(e.key)||[""," ","\n"].includes(s))){O(e);const a=b(),r=a.start==a.end?"":j().toString();T(e.key+r+n[t.indexOf(e.key)]),a.start++,a.end++,x(a)}}(e),r.history&&(!function(e){if(C(e)){O(e),d--;const n=c[d];n&&(t.innerHTML=n.html,x(n.pos)),d<0&&(d=0)}if(S(e)){O(e),d++;const n=c[d];n&&(t.innerHTML=n.html,x(n.pos)),d>=c.length&&d--}}(e),m(e)&&!h&&(A(),h=!0)),p&&x(b()))})),v("keyup",(e=>{e.defaultPrevented||e.isComposing||(l!==_()&&f(),y(e),i&&i(_()))})),v("focus",(e=>{g=!0})),v("blur",(e=>{g=!1})),v("paste",(e=>{A(),function(e){O(e);const a=(e.originalEvent||e).clipboardData.getData("text/plain").replace(/\r/g,""),r=b();T(a),n(t),x({start:Math.min(r.start,r.end)+a.length,end:Math.min(r.start,r.end)+a.length,dir:"<-"})}(e),A(),i&&i(_())})),{updateOptions(e){Object.assign(r,e)},updateCode(e){t.textContent=e,n(t)},onUpdate(e){i=e},toString:_,save:b,restore:x,recordHistory:A,destroy(){for(let[e,n]of u)t.removeEventListener(e,n)}}}function n(e,t={}){const n=Object.assign({class:"codejar-linenumbers",wrapClass:"codejar-wrap",width:"35px",backgroundColor:"rgba(128, 128, 128, 0.15)",color:""},t);let a;return function(t){e(t),a||(a=function(e,t){const n=getComputedStyle(e),a=document.createElement("div");a.className=t.wrapClass,a.style.position="relative";const r=document.createElement("div");r.className=t.class,a.appendChild(r),r.style.position="absolute",r.style.top="0px",r.style.left="0px",r.style.bottom="0px",r.style.width=t.width,r.style.overflow="hidden",r.style.backgroundColor=t.backgroundColor,r.style.color=t.color||n.color,r.style.setProperty("mix-blend-mode","difference"),r.style.fontFamily=n.fontFamily,r.style.fontSize=n.fontSize,r.style.lineHeight=n.lineHeight,r.style.paddingTop=n.paddingTop,r.style.paddingLeft=n.paddingLeft,r.style.borderTopLeftRadius=n.borderTopLeftRadius,r.style.borderBottomLeftRadius=n.borderBottomLeftRadius;const o=document.createElement("div");return o.style.position="relative",o.style.top="0px",r.appendChild(o),e.style.paddingLeft=`calc(${t.width} + ${r.style.paddingLeft})`,e.style.whiteSpace="pre",e.parentNode.insertBefore(a,e),a.appendChild(e),o}(t,n),t.addEventListener("scroll",(()=>a.style.top=`-${t.scrollTop}px`)));const r=(t.textContent||"").replace(/\n+$/,"\n").split("\n").length+1;let o="";for(let e=1;e<r;e++)o+=`${e}\n`;a.innerText=o}}var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},r={exports:{}};!function(e){var t=function(e){var t=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,n=0,a={},r={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function e(t){return t instanceof o?new o(t.type,e(t.content),t.alias):Array.isArray(t)?t.map(e):t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function e(t,n){var a,o;switch(n=n||{},r.util.type(t)){case"Object":if(o=r.util.objId(t),n[o])return n[o];for(var s in a={},n[o]=a,t)t.hasOwnProperty(s)&&(a[s]=e(t[s],n));return a;case"Array":return o=r.util.objId(t),n[o]?n[o]:(a=[],n[o]=a,t.forEach((function(t,r){a[r]=e(t,n)})),a);default:return t}},getLanguage:function(e){for(;e;){var n=t.exec(e.className);if(n)return n[1].toLowerCase();e=e.parentElement}return"none"},setLanguage:function(e,n){e.className=e.className.replace(RegExp(t,"gi"),""),e.classList.add("language-"+n)},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(a){var e=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(a.stack)||[])[1];if(e){var t=document.getElementsByTagName("script");for(var n in t)if(t[n].src==e)return t[n]}return null}},isActive:function(e,t,n){for(var a="no-"+t;e;){var r=e.classList;if(r.contains(t))return!0;if(r.contains(a))return!1;e=e.parentElement}return!!n}},languages:{plain:a,plaintext:a,text:a,txt:a,extend:function(e,t){var n=r.util.clone(r.languages[e]);for(var a in t)n[a]=t[a];return n},insertBefore:function(e,t,n,a){var o=(a=a||r.languages)[e],s={};for(var i in o)if(o.hasOwnProperty(i)){if(i==t)for(var l in n)n.hasOwnProperty(l)&&(s[l]=n[l]);n.hasOwnProperty(i)||(s[i]=o[i])}var u=a[e];return a[e]=s,r.languages.DFS(r.languages,(function(t,n){n===u&&t!=e&&(this[t]=s)})),s},DFS:function e(t,n,a,o){o=o||{};var s=r.util.objId;for(var i in t)if(t.hasOwnProperty(i)){n.call(t,i,t[i],a||i);var l=t[i],u=r.util.type(l);"Object"!==u||o[s(l)]?"Array"!==u||o[s(l)]||(o[s(l)]=!0,e(l,n,i,o)):(o[s(l)]=!0,e(l,n,null,o))}}},plugins:{},highlightAll:function(e,t){r.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var a={callback:n,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};r.hooks.run("before-highlightall",a),a.elements=Array.prototype.slice.apply(a.container.querySelectorAll(a.selector)),r.hooks.run("before-all-elements-highlight",a);for(var o,s=0;o=a.elements[s++];)r.highlightElement(o,!0===t,a.callback)},highlightElement:function(t,n,a){var o=r.util.getLanguage(t),s=r.languages[o];r.util.setLanguage(t,o);var i=t.parentElement;i&&"pre"===i.nodeName.toLowerCase()&&r.util.setLanguage(i,o);var l={element:t,language:o,grammar:s,code:t.textContent};function u(e){l.highlightedCode=e,r.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,r.hooks.run("after-highlight",l),r.hooks.run("complete",l),a&&a.call(l.element)}if(r.hooks.run("before-sanity-check",l),(i=l.element.parentElement)&&"pre"===i.nodeName.toLowerCase()&&!i.hasAttribute("tabindex")&&i.setAttribute("tabindex","0"),!l.code)return r.hooks.run("complete",l),void(a&&a.call(l.element));if(r.hooks.run("before-highlight",l),l.grammar)if(n&&e.Worker){var c=new Worker(r.filename);c.onmessage=function(e){u(e.data)},c.postMessage(JSON.stringify({language:l.language,code:l.code,immediateClose:!0}))}else u(r.highlight(l.code,l.grammar,l.language));else u(r.util.encode(l.code))},highlight:function(e,t,n){var a={code:e,grammar:t,language:n};if(r.hooks.run("before-tokenize",a),!a.grammar)throw new Error('The language "'+a.language+'" has no grammar.');return a.tokens=r.tokenize(a.code,a.grammar),r.hooks.run("after-tokenize",a),o.stringify(r.util.encode(a.tokens),a.language)},tokenize:function(e,t){var n=t.rest;if(n){for(var a in n)t[a]=n[a];delete t.rest}var r=new l;return u(r,r.head,e),i(e,r,t,r.head,0),function(e){var t=[],n=e.head.next;for(;n!==e.tail;)t.push(n.value),n=n.next;return t}(r)},hooks:{all:{},add:function(e,t){var n=r.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=r.hooks.all[e];if(n&&n.length)for(var a,o=0;a=n[o++];)a(t)}},Token:o};function o(e,t,n,a){this.type=e,this.content=t,this.alias=n,this.length=0|(a||"").length}function s(e,t,n,a){e.lastIndex=t;var r=e.exec(n);if(r&&a&&r[1]){var o=r[1].length;r.index+=o,r[0]=r[0].slice(o)}return r}function i(e,t,n,a,l,d){for(var g in n)if(n.hasOwnProperty(g)&&n[g]){var p=n[g];p=Array.isArray(p)?p:[p];for(var f=0;f<p.length;++f){if(d&&d.cause==g+","+f)return;var h=p[f],m=h.inside,y=!!h.lookbehind,v=!!h.greedy,b=h.alias;if(v&&!h.pattern.global){var x=h.pattern.toString().match(/[imsuy]*$/)[0];h.pattern=RegExp(h.pattern.source,x+"g")}for(var w=h.pattern||h,k=a.next,F=l;k!==t.tail&&!(d&&F>=d.reach);F+=k.value.length,k=k.next){var A=k.value;if(t.length>e.length)return;if(!(A instanceof o)){var E,$=1;if(v){if(!(E=s(w,F,e,y))||E.index>=e.length)break;var C=E.index,S=E.index+E[0].length,T=F;for(T+=k.value.length;C>=T;)T+=(k=k.next).value.length;if(F=T-=k.value.length,k.value instanceof o)continue;for(var N=k;N!==t.tail&&(T<S||"string"==typeof N.value);N=N.next)$++,T+=N.value.length;$--,A=e.slice(F,T),E.index-=F}else if(!(E=s(w,0,A,y)))continue;C=E.index;var L=E[0],_=A.slice(0,C),O=A.slice(C+L.length),j=F+A.length;d&&j>d.reach&&(d.reach=j);var z=k.prev;if(_&&(z=u(t,z,_),F+=_.length),c(t,z,$),k=u(t,z,new o(g,m?r.tokenize(L,m):L,b,L)),O&&u(t,k,O),$>1){var M={cause:g+","+f,reach:j};i(e,t,n,k.prev,F,M),d&&M.reach>d.reach&&(d.reach=M.reach)}}}}}}function l(){var e={value:null,prev:null,next:null},t={value:null,prev:e,next:null};e.next=t,this.head=e,this.tail=t,this.length=0}function u(e,t,n){var a=t.next,r={value:n,prev:t,next:a};return t.next=r,a.prev=r,e.length++,r}function c(e,t,n){for(var a=t.next,r=0;r<n&&a!==e.tail;r++)a=a.next;t.next=a,a.prev=t,e.length-=r}if(e.Prism=r,o.stringify=function e(t,n){if("string"==typeof t)return t;if(Array.isArray(t)){var a="";return t.forEach((function(t){a+=e(t,n)})),a}var o={type:t.type,content:e(t.content,n),tag:"span",classes:["token",t.type],attributes:{},language:n},s=t.alias;s&&(Array.isArray(s)?Array.prototype.push.apply(o.classes,s):o.classes.push(s)),r.hooks.run("wrap",o);var i="";for(var l in o.attributes)i+=" "+l+'="'+(o.attributes[l]||"").replace(/"/g,"&quot;")+'"';return"<"+o.tag+' class="'+o.classes.join(" ")+'"'+i+">"+o.content+"</"+o.tag+">"},!e.document)return e.addEventListener?(r.disableWorkerMessageHandler||e.addEventListener("message",(function(t){var n=JSON.parse(t.data),a=n.language,o=n.code,s=n.immediateClose;e.postMessage(r.highlight(o,r.languages[a],a)),s&&e.close()}),!1),r):r;var d=r.util.currentScript();function g(){r.manual||r.highlightAll()}if(d&&(r.filename=d.src,d.hasAttribute("data-manual")&&(r.manual=!0)),!r.manual){var p=document.readyState;"loading"===p||"interactive"===p&&d&&d.defer?document.addEventListener("DOMContentLoaded",g):window.requestAnimationFrame?window.requestAnimationFrame(g):window.setTimeout(g,16)}return r}("undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{});
/**
    	 * Prism: Lightweight, robust, elegant syntax highlighting
    	 *
    	 * @license MIT <https://opensource.org/licenses/MIT>
    	 * @author Lea Verou <https://lea.verou.me>
    	 * @namespace
    	 * @public
    	 */e.exports&&(e.exports=t),void 0!==a&&(a.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",(function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))})),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(e,n){var a={};a["language-"+n]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[n]},a.cdata=/^<!\[CDATA\[|\]\]>$/i;var r={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:a}};r["language-"+n]={pattern:/[\s\S]+/,inside:t.languages[n]};var o={};o[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,(function(){return e})),"i"),lookbehind:!0,greedy:!0,inside:r},t.languages.insertBefore("markup","cdata",o)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(e,n){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+e+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[n,"language-"+n],inside:t.languages[n]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,function(e){var t=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+t.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+t.source+"$"),alias:"url"}}},selector:{pattern:RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|"+t.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:t,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css;var n=e.languages.markup;n&&(n.tag.addInlined("style","css"),n.tag.addAttribute("style","css"))}(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,function(){if(void 0!==t&&"undefined"!=typeof document){Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var e={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},n="data-src-status",a="loading",r="loaded",o='pre[data-src]:not([data-src-status="loaded"]):not([data-src-status="loading"])';t.hooks.add("before-highlightall",(function(e){e.selector+=", "+o})),t.hooks.add("before-sanity-check",(function(s){var i=s.element;if(i.matches(o)){s.code="",i.setAttribute(n,a);var l=i.appendChild(document.createElement("CODE"));l.textContent="Loading…";var u=i.getAttribute("data-src"),c=s.language;if("none"===c){var d=(/\.(\w+)$/.exec(u)||[,"none"])[1];c=e[d]||d}t.util.setLanguage(l,c),t.util.setLanguage(i,c);var g=t.plugins.autoloader;g&&g.loadLanguages(c),function(e,t,n){var a=new XMLHttpRequest;a.open("GET",e,!0),a.onreadystatechange=function(){4==a.readyState&&(a.status<400&&a.responseText?t(a.responseText):a.status>=400?n("✖ Error "+a.status+" while fetching file: "+a.statusText):n("✖ Error: File does not exist or is empty"))},a.send(null)}(u,(function(e){i.setAttribute(n,r);var a=function(e){var t=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(e||"");if(t){var n=Number(t[1]),a=t[2],r=t[3];return a?r?[n,Number(r)]:[n,void 0]:[n,n]}}(i.getAttribute("data-range"));if(a){var o=e.split(/\r\n?|\n/g),s=a[0],u=null==a[1]?o.length:a[1];s<0&&(s+=o.length),s=Math.max(0,Math.min(s-1,o.length)),u<0&&(u+=o.length),u=Math.max(0,Math.min(u,o.length)),e=o.slice(s,u).join("\n"),i.hasAttribute("data-start")||i.setAttribute("data-start",String(s+1))}l.textContent=e,t.highlightElement(l)}),(function(e){i.setAttribute(n,"failed"),l.textContent=e}))}})),t.plugins.fileHighlight={highlight:function(e){for(var n,a=(e||document).querySelectorAll(o),r=0;n=a[r++];)t.highlightElement(n)}};var s=!1;t.fileHighlight=function(){s||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),s=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}}}()}(r);var o=r.exports;function s(){return document.querySelector("input[type='radio'][name=attr_kind]:checked").value}var i,l;i="multiline",document.querySelector(`input[type='radio'][name=attr_kind][value=${i}]`).checked=!0,l=e=>{console.log(e),p()},document.querySelectorAll("input[type='radio'][name=attr_kind]").forEach((e=>{e.onchange=()=>l(s())}));const u=document.querySelector("#input"),c=new t(u,n(o.highlightElement),{tab:"\t"});u.style.resize="none",c.updateCode('<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">\n<div class="max-w-md w-full">\n  <div>\n    <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg" alt="Workflow" />\n    <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">\n      Sign in to your account\n    </h2>\n    <p class="mt-2 text-center text-sm leading-5 text-gray-600">\n      Or\n      <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">\n        start your 14-day free trial\n      </a>\n    </p>\n  </div>\n  <form class="mt-8" action="#" method="POST">\n    <input type="hidden" name="remember" value="true" />\n    <div class="rounded-md shadow-sm">\n      <div>\n        <input aria-label="Email address" name="email" type="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Email address" />\n      </div>\n      <div class="-mt-px">\n        <input aria-label="Password" name="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Password" />\n      </div>\n    </div>\n\n    <div class="mt-6 flex items-center justify-between">\n      <div class="flex items-center">\n        <input id="remember_me" type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" checked />\n        <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900">\n          Remember me\n        </label>\n      </div>\n\n      <div class="text-sm leading-5">\n        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">\n          Forgot your password?\n        </a>\n      </div>\n    </div>\n\n    <div class="mt-6">\n      <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">\n        <span class="absolute left-0 inset-y-0 flex items-center pl-3">\n          <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">\n            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />\n          </svg>\n        </span>\n        Sign in\n      </button>\n    </div>\n  </form>\n</div>\n</div>'),c.onUpdate((e=>{requestAnimationFrame(p)}));const d=document.querySelector("#output"),g=new t(d,n(o.highlightElement),{tab:"\t"});function p(){const e=function(e,t){t=t||{};const{attrKind:n,emptyAttrIsBooleanProp:a}=t;if(!customElements.get("html-to-dominator-string")){class e extends HTMLElement{constructor(){super(),this.attachShadow({mode:"closed"})}}customElements.define("html-to-dominator-string",e,{extends:"span"})}const[r,o]=function(e){const t=document.createElement("div"),n=document.createElement("div");return t.style.position="relative",t.style.overflow="hidden",n.innerHTML=e.trim(),n.normalize(),n.style.position="absolute",n.style.left="calc(100vw + 1em)",n.style.top="0",t.appendChild(n),document.body.appendChild(t),[n.firstChild,t]}(e),s=function e(t,r){let{nodeDepth:o,str:s,withComma:i}=r;if(null==t)return s;const{tagName:l,attributes:u,nodeType:c}=t,d=t.childNodes,g="html"===t.tagName||"svg"===t.tagName?t.tagName:r.parentTag,p=(e,t)=>{f(e,t+"\n")},f=(e,t)=>{s+=function(e){let t="";for(let n=0;n<e;n++)t+="\t";return t}(e)+t},h=(e,t)=>{const n=t.textContent;if(""!==n.trim()){const a=document.createElement("html-to-dominator-string");a.appendChild(document.createTextNode(n)),t.replaceWith(a);const r=a.innerText;p(e,`.text("${r}")`)}if(t.childNodes&&t.childNodes.length)throw new Error("text nodes with children? very confusing!!")},m=(e,t)=>{const a=Array.from(e.entries());if(1===e.size){const[e,n]=a[0];p(o+1,"attr"===t?`.attr("${e}", "${n}")`:`.prop("${e}", ${n})`)}else if(e.size)if("oneline"===n){let e=`.${t}s!{`;a.forEach((n=>{const[a,r]=n;e+="attr"===t?` "${a}": "${r}",`:` "${a}": ${r},`}),""),e+="}",p(o+1,e)}else p(o+1,`.${t}s!{`),a.forEach((e=>{const[n,a]=e;p(o+2,"attr"===t?`"${n}": "${a}",`:`"${n}": ${a},`)}),""),p(o+1,"}")};if(3==c)h(o,t);else if(1==c){p(o,`${g}!("${l.toLowerCase()}", {`);const t=new Map,n=new Map;for(let e=0;e<u.length;e++){const{name:r,value:s}=u[e];if("class"===r.toLowerCase()){const e=s.split(" ");if(e.length)if(1===e.length)p(o+1,`.class("${e[0]}")`);else{const t=e.map((e=>`"${e}"`)).join(",");p(o+1,`.class([${t}])`)}}else""===s&&a?n.set(r,!0):t.set(r,s)}m(t,"attr"),m(n,"prop");const r=[],c=[];for(let e=0;e<d.length;e++){const t=d[e];3==t.nodeType?r.push(t):c.push(t)}if(r.forEach((e=>h(o+1,e))),c.length)if(1===c.length)p(o+1,".child("),s=e(c[0],{nodeDepth:o+2,str:s,parentTag:g}),p(o+1,")");else{p(o+1,".children([");for(let t=0;t<c.length;t++)s=e(c[t],{nodeDepth:o+2,str:s,withComma:!0,parentTag:g});p(o+1,"])")}p(o,i?"}),":"})")}return s}(r,{nodeDepth:0,str:"",withComma:!1,parentTag:"html"});return o.remove(),s}(c.toString(),{attrKind:s()});g.updateCode(e)}d.style.resize="none",document.querySelector("#copy").onclick=()=>{!function(e){if(navigator.clipboard)navigator.clipboard.writeText(e).then((function(){console.log("copied to clipboard")}),(function(e){console.error("could not copy to clipboard: ",e)}));else{var t=document.createElement("textarea");t.value=e,t.style.top="0",t.style.left="0",t.style.position="fixed",document.body.appendChild(t),t.focus(),t.select();try{document.execCommand("copy")?console.log("copied to clipboard"):console.error("Fallback copy to clipboard failed")}catch(e){console.error("Fallback copy to clipboard failed: ",e)}document.body.removeChild(t)}}(g.toString())},p()}();
//# sourceMappingURL=bundle.js.map