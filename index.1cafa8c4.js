let e,t,o,r;const n=document.body.querySelector(".loading-container");function a(e,t,o,r){let n;"enter"===(t=t.toLowerCase())?void 0===o?function(e){let t=e[0].parentNode;for(let o of(t.classList.add("row-rejection"),e))o.classList.add("cell-rejection");setTimeout(()=>{for(let o of(t.classList.remove("row-rejection"),e))o.classList.remove("cell-rejection")},1e3)}(e):function(e,t,o){for(let r=0;r<t.length;r++){let n,a=e[r];for(let e of o)e.innerText.toUpperCase()===a.innerText.toUpperCase()&&(n=e);let s=t[r],l=document.querySelector(".switch__checkbox").getAttribute("data-theme");a.classList.add("game-board-validation"),n.classList.add("keyboard-validation"),a.style.animationDelay=`${.15*r}s`,n.style.animationDelay=`${.15*r}s`,setTimeout(()=>{(function(e,t,o,r){let n="game-board__letter",a="keyboard__letter";if(!0===o){let o=`${n}--correct`,s=`${a}--correct`;e.classList.add(o),t.classList.add(s),"dark"===r&&(e.classList.add(`${o}-dark`),t.classList.add(`${s}-dark`))}else if("close"===o){let o=`${n}--close`,s=`${a}--close`;e.classList.add(o),t.classList.add(s),"dark"===r&&(e.classList.add(`${o}-dark`),t.classList.add(`${s}-dark`))}else{let o=`${n}--missing`,s=`${a}--missing`;e.classList.add(o),t.classList.add(s),"dark"===r&&(e.classList.add(`${o}-dark`),t.classList.add(`${s}-dark`))}})(a,n,s,l)},500+150*r),setTimeout(()=>{n.classList.remove("keyboard-validation"),n.style.removeProperty("animation-delay")},1e3+150*r)}}(e,o,r):"backspace"===t?((n=e.querySelector(".letter-text")).classList.add("letter-removing"),setTimeout(()=>{n.innerText="",n.classList.remove("letter-removing")},200)):function(e){let t;for(let o of e)""!==o.innerText&&(t=o);let o=t.querySelector(".letter-text");o.classList.add("letter-adding"),setTimeout(()=>o.classList.remove("letter-adding"),200)}(e)}function s(e,t){let o;let r=t.toLowerCase();if("backspace"===r)(o=document.querySelector(".backspace-button")).classList.add("backspace-typing");else if("enter"===r)(o=document.querySelector(".enter-button")).classList.add("enter-typing");else{for(let t of e)if(t.innerHTML.toLowerCase()===r){o=t;break}o.classList.add("letter-typing")}if(void 0===o){l();return}}const l=()=>{console.log(`Know what the button said to the clicker? 
~crying in sadness~ 
it just feels like, you're always pushing me away 😢`)};function c(e){e.classList.add("dialog-entry")}function i(e){e.classList.remove("dialog-entry"),e.classList.add("dialog-exit"),setTimeout(()=>{e.classList.remove("dialog-exit")},500)}function d(e,t){return"backspace"===(t=t.toLowerCase())?function(e){for(let t=e.length-1;t>=0;t--)if(""!==e[t].innerText){a(e[t],"backspace");break}return!0}(e):"enter"===t||(u(t)?function(e,t){let o;for(let t of e)if(""===t.innerText){o=t;break}return void 0!==o&&(o.childNodes[0].innerText=t.toUpperCase(),!0)}(e,t):void 0)}const u=e=>/^[a-zA-Z]$/.test(e),f={currentRow:0,isSolved:!1},m=JSON.parse(null===localStorage.getItem("userProgress")||Y()?function(){let[e,t,o]=[[],[],[]];for(let o=0;o<6;o++)e[o]=[,,,,,].fill(""),t[o]=[,,,,,].fill("");let r=document.querySelectorAll(".keyboard__letter:not(.enter-button):not(.backspace-button)");for(let e=0;e<26;e++)o[e]=[r[e].innerText,""];return localStorage.setItem("userProgress",JSON.stringify({currentRow:-1,rowsData:e,rowsClasses:t,keyboardClasses:o,isSolved:!1})),localStorage.getItem("userProgress")}():localStorage.getItem("userProgress"));async function y(e){if(f.currentRow=e.currentRow+1,f.isSolved=e.isSolved,function(){let e=document.querySelectorAll(".game-board__row");for(let t=0;t<=m.currentRow;t++){let o=e[t],r=o.children;o.setAttribute("data-state","DONE");for(let e=0;e<r.length;e++){let o=r[e],n=o.childNodes[0];n.innerText=m.rowsData[t][e];let a=m.rowsClasses[t][e];o.classList.add("game-board-validation"),o.style.animationDelay=`${.03*t}s`,o.classList.add(a)}}}(),function(){let e=document.querySelectorAll(".keyboard__letter:not(.enter-button):not(.backspace-button)");for(let t=0;t<e.length;t++){let o=e[t],r=m.keyboardClasses[t][1];""!==r&&(o.classList.add("keyboard-validation"),o.style.animationDelay=`${.03*t}s`,o.classList.add(r),setTimeout(()=>{o.classList.remove("keyboard-validation"),o.style.removeProperty("animation-delay")},1e3+30*t))}}(),5!==e.currentRow||e.isSolved)e.isSolved&&U(`Excellent work!, You solved today's word in the ${["first","second","third","fourth","fifth","sixth"][e.currentRow]} row`,!0);else{let e=await K();U(`Correct word: ${e.toUpperCase()}`,!0)}}const g=document.querySelector(".settings-dialog"),h=document.querySelector(".how-to-play-dialog"),b=document.querySelector(".theme-switch"),k=b.querySelector(".switch__checkbox"),w=["feedback-message","header__title","keyboard","theme-switch"],v=[["game-board__letter--missing","game-board__letter--close","game-board__letter--correct","keyboard__letter--missing","keyboard__letter--close","keyboard__letter--correct","fake-letter--missing","fake-letter--close","fake-letter--correct"],["game-board__letter","keyboard__letter","row-separator","fake-letter","subheader-text","how-to-play__headings","how-to-play__list","loading-container","loading-spinner","source-notice"]],L=document.body.querySelectorAll(".light-theme__svg"),S=document.body.querySelectorAll(".dark-theme__svg");function p(o){"settings"===o?(c(g),g.showModal(),g.focus()):"howToPlay"===o&&(c(h),h.showModal(),h.focus()),document.addEventListener("keydown",e=e=>{"Escape"===e.key&&(e.preventDefault(),_(o))}),document.addEventListener("click",t=e=>{e.target instanceof HTMLDialogElement&&_(o)}),m.isSolved||M()}function _(o){if("settings"===o){let e=document.body.querySelector(".settings-btn");i(g),setTimeout(()=>{g.close(),e.blur()},450)}else if("howToPlay"===o){let e=document.body.querySelector(".how-to-play-btn");i(h),setTimeout(()=>{h.close(),e.blur()},450)}document.removeEventListener("keydown",e),document.removeEventListener("click",t),m.isSolved||P()}function T(){p("settings")}function E(){_("settings")}function $(){let e,t,o=k.getAttribute("data-theme"),r=(e=[],w.forEach(t=>{let o=document.body.querySelector(`.${t}`);e.push(o)}),e),n=(t=[],v.forEach(e=>{e.forEach(e=>{let o=document.body.querySelectorAll(`.${e}`);t.push(o)})}),t);"light"===o?function(e,t){localStorage.setItem("themePreference","dark"),k.setAttribute("data-theme","dark"),k.checked=!0,D(L,S,"dark");let o=document.body;o.classList.add("body--dark");let r=document.body.querySelector("header");r.classList.add("header--dark");let n=document.body.querySelectorAll("dialog");n.forEach(e=>{e.classList.add("dialog--dark")}),e.length>0&&q(e,"add"),t.length>0&&C(t,"add")}(r,n):function(e,t){localStorage.setItem("themePreference","light"),k.setAttribute("data-theme","light"),D(L,S,"light");let o=document.body;o.classList.remove("body--dark");let r=document.body.querySelector("header");r.classList.remove("header--dark");let n=document.body.querySelectorAll("dialog");n.forEach(e=>{e.classList.remove("dialog--dark")}),e.length>0&&q(e,"remove"),t.length>0&&C(t,"remove")}(r,n)}function q(e,t){e.forEach(e=>{for(let o of e.classList)w.includes(o)&&("add"===t?e.classList.add(`${o}--dark`):"remove"===t&&e.classList.remove(`${o}--dark`))})}function C(e,t){e.forEach(e=>{e.length>0&&e.forEach(e=>{for(let o of e.classList){let r=v[0],n=v[1];r.includes(o)?"add"===t?e.classList.add(`${o}-dark`):"remove"===t&&e.classList.remove(`${o}-dark`):n.includes(o)&&("add"===t?e.classList.add(`${o}--dark`):"remove"===t&&e.classList.remove(`${o}--dark`))}})})}function D(e,t,o){"light"===o?(e.forEach(e=>{e.removeAttribute("hidden")}),t.forEach(e=>{e.setAttribute("hidden","true")})):"dark"===o&&(t.forEach(e=>{e.removeAttribute("hidden")}),e.forEach(e=>{e.setAttribute("hidden","true")}))}function I(){p("howToPlay");let e=document.querySelector(".fake-game-row"),t=e.children;!function(e,t){let o=1,r=new IntersectionObserver(function(e){e.forEach(e=>{e.isIntersecting&&o>0&&(o--,function(e){for(let t=0;t<e.length;t++){let o=e[t];setTimeout(()=>{o.classList.add("game-board-validation")},200+150*t),setTimeout(()=>{o.classList.remove("game-board-validation")},1200+150*t)}}(t))})},{root:null,rootMargin:"0px",threshold:1});r.observe(e)}(e,t)}function A(){_("howToPlay")}const x=document.querySelector(".keyboard"),R=document.querySelectorAll(".keyboard__letter");function P(){N(),document.body.addEventListener("keyup",O),H()}function M(){document.body.removeEventListener("keydown",o),document.body.removeEventListener("keyup",O),x.removeEventListener("click",r)}async function N(){let e=await K();document.body.addEventListener("keydown",o=function(t){if(f.currentRow<6){let o=document.querySelectorAll(".game-board__row")[f.currentRow].children,r=t.key;if(d(o,r)&&("Backspace"!==r&&"Enter"!==r&&a(o,r),"Enter"!==r&&s(R,r),"Enter"===r)){let t=document.activeElement;(t instanceof HTMLBodyElement||t.classList.contains(".enter-button"))&&(s(R,r),B(o,R,e))}}})}function O(e){let t=e.key;!function(e,t){let o;let r=t.toLowerCase();if("backspace"===r)o=document.querySelector(".backspace-button");else if("enter"===r)o=document.querySelector(".enter-button");else for(let t of e)if(t.innerHTML.toLowerCase()===r){o=t;break}if(void 0===o){l();return}setTimeout(()=>{o.classList.contains("backspace-typing")?o.classList.remove("backspace-typing"):o.classList.contains("enter-typing")?o.classList.remove("enter-typing"):o.classList.contains("letter-typing")&&o.classList.remove("letter-typing")},150)}(R,t)}async function H(){let e=await K();x.addEventListener("click",r=function(t){if(f.currentRow<6){let o=document.querySelector(".game-board__row[data-state='TBD']").children,r=t.target;(r instanceof HTMLButtonElement||r instanceof HTMLImageElement)&&(r instanceof HTMLImageElement||r.classList.contains("backspace-button")?d(o,"Backspace"):r.classList.contains("enter-button")?(d(o,"Enter"),B(o,R,e)):d(o,r.innerHTML)&&a(o,r.innerHTML),r.blur())}})}let j=!1;function U(e,t,o){let r=document.querySelector(".feedback-message");r.innerHTML=`${e}`,j||(r.classList.add("fade-in-feedback"),j=!0,t||(setTimeout(()=>{r.classList.remove("fade-in-feedback"),r.classList.add("fade-out-feedback")},1e3*o),setTimeout(()=>{r.classList.remove("fade-out-feedback"),j=!1},1e3*o+500)))}async function B(e,t,o){if(function(e){let t=!1;for(let o=0;o<e.length;o++)if(""===e[o].innerText){U("Not Enough Letters",!1,1),a(e,"enter"),t=!1;break}else t=!0;return t}(e)){n.style.visibility="visible";let r=function(e){let t="";for(let o of e)t+=o.textContent;return t}(e),s=await J(o,r,e,t);n.style.visibility="hidden",!1===s?a(e,"enter"):(a(e,"enter",s,t),document.querySelectorAll(".game-board__row")[f.currentRow].dataset.state="DONE",setTimeout(()=>{m.currentRow=f.currentRow,function(e){for(let t=0;t<5;t++){m.rowsData[m.currentRow][t]=e[t].childNodes[0].innerText;let o=e[t].classList,r="game-board__letter--";o.contains(`${r}correct`)?m.rowsClasses[m.currentRow][t]=`${r}correct`:o.contains(`${r}close`)?m.rowsClasses[m.currentRow][t]=`${r}close`:o.contains(`${r}missing`)&&(m.rowsClasses[m.currentRow][t]=`${r}missing`)}}(e),function(){let e=document.querySelectorAll(".keyboard__letter:not(.enter-button):not(.backspace-button)"),t="keyboard__letter--";for(let o=0;o<26;o++){let r=e[o].classList;r.contains(`${t}correct`)?m.keyboardClasses[o][1]=`${t}correct`:r.contains(`${t}close`)?m.keyboardClasses[o][1]=`${t}close`:r.contains(`${t}missing`)&&(m.keyboardClasses[o][1]=`${t}missing`)}}(),f.isSolved&&(m.isSolved=!0),localStorage.setItem("userProgress",JSON.stringify(m))},1200)),!1!==s&&(f.isSolved?M():f.currentRow<6&&setTimeout(()=>{f.currentRow++},1200))}}async function J(e,t){if(void 0===e)return!1;let o=await z(e,t);if(!1===o)return!1;for(let e of o)if(!0===e)f.isSolved=!0;else{f.isSolved=!1;break}if(f.isSolved)switch(f.currentRow){case 0:U("Exceptional",!1,2.5);break;case 1:U("Incredible",!1,2.5);break;case 2:U("Impressive",!1,2.5);break;case 3:U("Great",!1,2.5);break;case 4:U("Nice",!1,2.5);break;default:U("Phew",!1,2.5)}else 5===f.currentRow&&U(`Correct word: ${e.toUpperCase()}`,!0);return o}async function z(e,t){let o=await G(t);if(!1===o)return U("Not In Word List",!1,1.5),!1;if(void 0===o)return!1;if(/\d/.test(e)||e.length!==t.length)return U("Server Error, Enjoy a cookie while we work on it \uD83D\uDE19",!0),!1;let r=Array.from(t,()=>!1);e=e.toLowerCase(),t=t.toLowerCase();for(let o=0;o<e.length;o++){var n;let a=function(e,t){let o=[],r=e.indexOf(t);for(;-1!==r;)o.push(r),r=e.indexOf(t,r+1);return o}(t,e[o]);1===a.length?(n=a[0],n===o?r[n]=!0:!1===r[n]&&(r[n]="close")):function(e,t,o){let r=new Map;e.forEach(e=>{let o=Math.abs(e-t);r.set(`${e}`,o)});let n=W(r);r.delete(n),Number(n)===t?o[n]=!0:!1===o[n]?o[n]="close":function(e,t){for(;e.size>0;){let o=W(e);if(e.delete(o),!1===t[o]){t[o]="close";break}}}(r,o)}(a,o,r)}return r}function W(e){return[...e.entries()].reduce((e,[t,o])=>o<e[1]?[t,o]:e,[null,1/0])[0]}async function G(e){let t=await fetch("https://words.dev-apis.com/validate-word",{method:"POST",body:JSON.stringify({word:`${e}`}),headers:{"Content-Type":"application/json",Connection:"keep-alive"}}).catch(()=>{U("Server Error, please check your internet connection \uD83D\uDE1E",!1,3)});if(void 0===t)return;let o=await t.json();return o.validWord}async function K(){let e=Y();return null===localStorage.getItem("wordOfTheDay")||e?await Z():function(e){let t=26,o="",r=[];for(;""!==e;)r.push(e.substring(0,t)),e=e.slice(t),t+=17;for(let e of r)o+=String.fromCharCode(e[11].charCodeAt(0)+64);return o}(localStorage.getItem("wordOfTheDay"))}function Y(){let e=null===localStorage.getItem("currentDay");if(e)return X(),Q(),!0;{let e=V();return e!==localStorage.getItem("currentDay")}}async function Z(){let e=await F();return localStorage.setItem("wordOfTheDay",function(e){let t=["!","$","7","&","?","p","q","r","/","<","g",".","5","i"," ","9","4","-",")","D","T","R","{","}","U","Z","t","K","P","~",";","|",":","z","V","W","X","+","=","G","H","I","@","#","%","3",">","^","c","d"],o=t.length,r=26,n="";for(let a of e){for(let e=0;e<r;e++)11===e?n+=String.fromCharCode(a.charCodeAt(0)-64):n+=t[parseInt(100*Math.random())%o];r+=17}return n}(e)),e}async function F(){let e=fetch("https://words.dev-apis.com/word-of-the-day");return e.then(e=>e.json()).then(e=>e.word).catch(()=>{U(`Server error 😐`,!1)})}function V(){let e=new Date,t=`${e.getUTCDate()}/${e.getUTCMonth()+1}/${e.getUTCFullYear()}`;return t}function X(){localStorage.setItem("currentDay",V())}async function Q(){let e=performance.now();await K();let t=performance.now(),o=2*(t-e);await new Promise(e=>setTimeout(e,o+500)),I()}!function(){let e=Y();-1===m.currentRow||e||y(m),"dark"===function(){if(null!==localStorage.getItem("themePreference"))return localStorage.getItem("themePreference");{let e=window.matchMedia("(prefers-color-scheme: dark)").matches;return e?localStorage.setItem("themePreference","dark"):localStorage.setItem("themePreference","light"),e&&"light"===k.getAttribute("data-theme")&&k.click(),localStorage.getItem("themePreference")}}()&&$(),m.isSolved||P(),function(){let e=document.querySelector(".settings-btn"),t=document.querySelector(".settings-close");e.addEventListener("click",T),t.addEventListener("click",E)}(),k.addEventListener("click",$),function(){let e=document.body.querySelector(".how-to-play-btn"),t=document.body.querySelector(".how-to-play-close");e.addEventListener("click",I),t.addEventListener("click",A)}(),e&&(localStorage.removeItem("currentDay"),X())}();
//# sourceMappingURL=index.1cafa8c4.js.map
