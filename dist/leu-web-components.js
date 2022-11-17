(()=>{var gt=Object.defineProperty,Ct=Object.defineProperties,At=Object.getOwnPropertyDescriptor,$t=Object.getOwnPropertyDescriptors;var yt=Object.getOwnPropertySymbols;var St=Object.prototype.hasOwnProperty,qt=Object.prototype.propertyIsEnumerable;var kt=(i,t,n)=>t in i?gt(i,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[t]=n,b=(i,t)=>{for(var n in t||(t={}))St.call(t,n)&&kt(i,n,t[n]);if(yt)for(var n of yt(t))qt.call(t,n)&&kt(i,n,t[n]);return i},B=(i,t)=>Ct(i,$t(t));var E=(i,t,n,l)=>{for(var a=l>1?void 0:l?At(t,n):t,s=i.length-1,d;s>=0;s--)(d=i[s])&&(a=(l?d(t,n,a):d(a))||a);return l&&a&&gt(t,n,a),a};var Et=(i,t,n)=>{if(!t.has(i))throw TypeError("Cannot "+n)};var c=(i,t,n)=>(Et(i,t,"read from private field"),n?n.call(i):t.get(i)),T=(i,t,n)=>{if(t.has(i))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(i):t.set(i,n)},g=(i,t,n,l)=>(Et(i,t,"write to private field"),l?l.call(i,n):t.set(i,n),n);var m=(i,t,n)=>new Promise((l,a)=>{var s=_=>{try{h(n.next(_))}catch(o){a(o)}},d=_=>{try{h(n.throw(_))}catch(o){a(o)}},h=_=>_.done?l(_.value):Promise.resolve(_.value).then(s,d);h((n=n.apply(i,t)).next())});function y(i){return m(this,null,function*(){return new Promise(t=>{window.setTimeout(()=>t(),i)})})}function x(i,t=null,n=null,l=null){let a=document.createElement(i);t===null&&(t={});for(let s in t)a.setAttribute(s,t[s]);if(Array.isArray(n))for(let s of n)a.appendChild(s);return l!==null&&l.appendChild(a),a}function L(){return m(this,null,function*(){return new Promise(i=>{if(document.readyState==="complete"||document.readyState==="interactive")return i("loaded");document.addEventListener("DOMContentLoaded",()=>i("DOMContentLoaded"))})})}function w(i){return function(t){return console.debug("registering custom element",t,i),customElements.define(i,t),t}}function v(stmt,__scope,e,__refs){stmt.endsWith(";")&&(stmt=stmt.slice(0,-1));let reserved=["var","null","let","const","function","class","in","of","for","true","false","await","$this"],r="var $this = e;";for(let i in __scope)if(reserved.indexOf(i)===-1){if(i.indexOf("-")!==-1)throw console.error(`Invalid scope key '${i}': Cannot contain - in scope:`,__scope),`eval() failed: Invalid scope key: '${i}': Cannot contain minus char '-'`;r+=`var ${i} = __scope['${i}'];`}typeof __scope.$scope=="undefined"&&(r+="var $scope = __scope;");try{return eval(r+"("+stmt+")")}catch(i){throw console.error("cannot eval() stmt: '"+stmt+"': "+i," on element ",e,i,"(context:",__scope,")"),"eval('"+stmt+"') failed: "+i}}function F(i,t,n=!1,l=!1){if(Array.isArray(i)&&(i.children=i),typeof i.children!="undefined"){if(l&&i instanceof HTMLElement&&t(i)===!1)return!1;for(let a of i.children)t(a)!==!1&&n&&typeof a.children!="undefined"&&F(a,t,n)}}function Y(i){return i.replace(/(?:^\w|[A-Z]|\b\w)/g,(t,n)=>n===0?t.toLowerCase():t.toUpperCase()).replace(/[^a-zA-Z0-9]+/g,"")}function nt(i,t,n=!1){typeof i=="string"&&(i=KaToolsV1.querySelector(i));let l={textcontent:"textContent",htmlcontent:"innerHTML",innerhtml:"innerHTML"};for(let a of i.getAttributeNames()){if(!a.startsWith("ka."))continue;let s=i.getAttribute(a),d=a.split(".")[1],h=a.split(".")[2];typeof h=="undefined"&&(h=null);let _=function(p,u,f,I){typeof p._ka_on=="undefined"&&(p._ka_on={}),typeof p._ka_on[u]=="undefined"&&p.addEventListener(u,N=>p._ka_on[u](N)),p._ka_on[u]=N=>m(this,null,function*(){return I.$event=N,typeof f=="function"?f(N,p,I):v(f,I,p)})};if(d==="on"){let p=b({$scope:t},t);if(h!==null)_(i,h,s,p);else{let u=KaToolsV1.eval(s,p,i);for(let f in u)_(i,f,u[f],p)}continue}let o=null;switch(typeof s!="undefined"&&typeof s!==null&&s!==""&&(o=v(s,t,i)),d){case"ref":typeof t.$ref=="undefined"&&(t.$ref={}),o!==null&&(t.$ref[o]=i),t.$ref.$last=i;break;case"classlist":if(h!==null){o===!0?i.classList.add(h):i.classList.remove(h);break}for(let u in o)o[u]===!0?i.classList.add(u):i.classList.remove(u);break;case"style":if(h!==null){let u=o;typeof u=="number"&&["left","top","height","width","bottom","right","line-height","font-size"].indexOf(h)!==-1&&(u=u+"px"),i.style[Y(h)]=u;break}for(let u in o){let f=o[u];typeof f=="number"&&["left","top","height","width","bottom","right","line-height","font-size"].indexOf(u)!==-1&&(f=f+"px"),i.style[Y(u)]=f}break;case"bindarray":if(h==="default")continue;if(typeof o=="undefined"&&i.hasAttribute("ka.bind.default")&&(t=b({$scope:t},t),t=B(b({$scope:t},t),{__curVal:v(i.getAttribute("ka.bind.default"),t,i)}),v(`${s} = __curVal`,t,i),o=t.__curVal),!Array.isArray(o)){console.error("kap:bindarr: Not an array!",o,i);return}o.indexOf(i.value)===-1?i.checked=!1:i.checked=!0,typeof i._kap_bind=="undefined"&&(i.addEventListener("change",u=>{let f=v(s,t,i);f.indexOf(i.value)===-1&&i.checked&&f.push(i.value),f.indexOf(i.value)!==-1&&!i.checked&&(f=f.filter(I=>I!==i.value)),t=B(b({$scope:t},t),{__curVal:f}),v(`${s} = __curVal`,t,i),t.$on&&t.$on.change&&t.$on.change(u)}),i._kap_bind=!0);break;case"bind":if(h==="default")continue;typeof o=="undefined"&&i.hasAttribute("ka.bind.default")&&(t=b({$scope:t},t),t=B(b({$scope:t},t),{__curVal:v(i.getAttribute("ka.bind.default"),t,i)}),v(`${s} = __curVal`,t,i),o=t.__curVal),i.type==="checkbox"||i.type==="radio"?i.hasAttribute("value")?o===i.getAttribute("value")?i.checked=!0:i.checked=!1:o===!0?i.checked=!0:i.checked=!1:i.value=typeof o!="undefined"?o:"",typeof i._kap_bind=="undefined"&&(i.addEventListener("change",u=>{let f=null;if(i.type==="checkbox"||i.type==="radio")if(i.hasAttribute("value")){if(i.checked===!1)return;f=i.getAttribute("value")}else f=i.checked;else f=i.value;t=B(b({$scope:t},t),{__curVal:f}),v(`${s} = __curVal`,t,i),t.$on&&t.$on.change&&t.$on.change(u)}),i.addEventListener("keyup",u=>{t=B(b({$scope:t},t),{__curVal:i.value}),v(`${s} = __curVal`,t,i),t.$on&&t.$on.change&&t.$on.change(u)}),i._kap_bind=!0);break;case"options":let p=i.value;i.innerHTML="";for(let u in o)isNaN(u)?i.appendChild(new Option(o[u],u)):typeof o[u].text!="undefined"?i.appendChild(new Option(o[u].text,o[u].value)):i.appendChild(new Option(o[u],o[u]));p!==null&&(i.value=p);break;case"attr":if(h!==null){o===null||o===!1?i.removeAttribute(h):i.setAttribute(h,o);break}for(let u in o)o[u]===null||o[u]===!1?i.removeAttribute(u):i.setAttribute(u,o[u]);break;case"prop":if(h!==null){i[Y(h)]=o;break}for(let u in o)i[Y(u)]=o[u];break;default:typeof l[d]!="undefined"&&(d=l[d]),typeof i[d]=="undefined"&&console.warn("apply(): trying to set undefined property ",d,"on element",i),i[d]=o;break}}if(n)for(let a of i.children)nt(a,t,n)}function M(i,t,n){typeof n=="undefined"&&(n=`querySelector '${i}' not found`),(typeof t=="undefined"||t===null)&&(t=document);let l=t.querySelectorAll(i);if(l.length===0)throw console.warn(n,"on parent: ",t),n;return l[0]}window._ka_el_idx=0;function A(i,t=!0){if(typeof i=="string"&&(i=M(i)),!(i instanceof Node))throw console.error("[ka-templatify] Parameter 1 is not a html element: ",i),`[ka-templify] Parameter 1 is not a html element: ${i}`;if(t){let l=document.createElement("template");return l.setAttribute("_kaidx",(window._ka_el_idx++).toString()),l.innerHTML=i.innerHTML.replace(/\[\[(.*?)\]\]/g,(a,s)=>`<span ka.textContent="${s}"></span>`),A(l.content,!1),l}i instanceof HTMLTemplateElement&&(i=i.content);let n=(l,a,s)=>{let d=document.createElement("template");d.setAttribute("_kaidx",(window._ka_el_idx++).toString());let h=l.cloneNode(!0);return h.removeAttribute(a),d.content.append(h),d.setAttribute(a,s),l.replaceWith(d),d};F(i,l=>{if(!(l instanceof HTMLElement))return;let a=null;for(let s of l.getAttributeNames()){if(s==="ka.for"){a=n(l,"ka.for",l.getAttribute("ka.for")),A(a,!1);break}if(s==="ka.if"){a=n(l,"ka.if",l.getAttribute("ka.if")),A(a,!1);break}}},!0,!1)}function wt(i){return m(this,null,function*(){let t=document.createElement("template"),n=yield fetch(i);if(!n.ok)throw console.error(`[loadHtml] failed to load '${i}'`),`[loadHtml] failed to load '${i}'`;let l=yield n.text();return t.innerHTML=l,t})}var lt=class{constructor(t){this.url=t;this.tpl=null}load(){return m(this,null,function*(){return this.tpl===null&&(this.tpl=yield wt(this.url)),this.tpl})}};var at=class extends HTMLElement{constructor(t){super(t);this.__tpl=null,this.__isConnected=!1}get $tpl(){return this.__tpl}isConnected(){return this.isConnected}connected(t,n){return m(this,null,function*(){console.warn("connected() method not overridden in",this)})}connectedCallback(){return m(this,null,function*(){let t=this.constructor.__callback;if(t===null||t.bind(this),this.constructor.__tpl!==null){let n=this.constructor.__tpl;n instanceof lt&&(n=yield n.load());let l=A(n);this.constructor.__options.shadowDom===!0?this.attachShadow(this.constructor.__options.shadowDomOptions).appendChild(l):this.appendChild(l),this.__tpl=new P(l)}if(this.constructor.__options.waitEvent!==null){let n=this.constructor.__options.waitEvent.split("@"),l=n[0],a=document;n.length===2&&(a=M(n[1])),a.addEventListener(l,s=>m(this,null,function*(){t(this.$tpl,this),this.__isConnected=!0}));return}if(t===null){yield this.connected(this.$tpl,this),this.__isConnected=!0;return}t(this.$tpl,this),this.__isConnected=!0})}};var P=class{constructor(t){this.template=t,typeof this.template.__kachilds=="undefined"&&(this.template.__kachilds=[]),typeof this.template.__kasibling=="undefined"&&(this.template.__kasibling=this.template.nextElementSibling),this.__renderCount=0,this.$scope={}}_error(t){throw console.error(`[ka-template] ${t} on element`,this.template),`[ka-template] ${t} on element`+this.template}_appendTemplate(){let t=this.template.content,n=[];for(let l of t.children)l=l.cloneNode(!0),l._ka_maintained_by=this.template.getAttribute("_kaidx"),n.push(l),this.template.parentNode.insertBefore(l,this.template.__kasibling);this.template.__kachilds.push(n)}_removeLastChild(){if(this.template.__kachilds.length===0)return;let t=this.template.__kachilds[this.template.__kachilds.length-1];for(let n of t)this.template.parentElement.removeChild(n);this.template.__kachilds.length=this.template.__kachilds.length-1}_renderFor(t,n){let l=n.match(/^(let)?\s*(?<target>.+)\s+(?<type>of|in|repeat)\s+(?<select>.+)$/);l===null&&this._error(`Can't parse ka.for='${n}'`);let a=v(l.groups.select,t,this.template);l.groups.type==="repeat"&&(typeof a!="number"&&this._error(`Error ka.for='${n}': Selected val must be number in repeat loop`),a=new Array(a).fill(null));let s=0;for(let d in a){let h=b({$scope:t},t);h[l.groups.target]=d,l.groups.type==="of"&&(h[l.groups.target]=a[d]),this.template.__kachilds.length<s+1&&this._appendTemplate(),this._maintain(h,this.template.__kachilds[s],s),s++}for(let d=s;d<this.template.__kachilds.length;)this._removeLastChild()}_maintain(t,n,l=0){for(let a of n)a._ka_for_index=l,F(a,s=>{if(s instanceof HTMLTemplateElement)return new this.constructor(s).render(t),!1;if(typeof s._ka_maintained_by!="undefined"&&s._ka_maintained_by!==this.template.getAttribute("_kaidx")||(nt(s,t),s instanceof HTMLElement&&(s.hasAttribute("ka.stop")||s instanceof at)))return!1},!0,!0)}_renderIf(t,n){v(n,t,this.template)===!0?(this.template.__kachilds.length===0&&this._appendTemplate(),this._maintain(t,this.template.__kachilds[0])):this._removeLastChild()}dispose(){for(;this.template.__kachilds.length>0;)this._removeLastChild()}render(t=null){t===null&&(t=this.$scope),this.$scope=t,this.__renderCount++,this.template.hasAttribute("ka.for")?this._renderFor(t,this.template.getAttribute("ka.for")):this.template.hasAttribute("ka.if")?this._renderIf(t,this.template.getAttribute("ka.if")):(typeof this.template._ka_active=="undefined"&&(this._appendTemplate(),this.template._ka_active=!0),this._maintain(t,this.template.__kachilds))}isFirstRender(){return this.__renderCount===1}};function J(i){let t=document.createElement("template");return t.innerHTML=i,t}var Z=class extends HTMLElement{constructor(t=null){super();this.shadowRootInit=t;this.addEventListener("load",n=>console.log(n))}connectedCallback(){return m(this,null,function*(){let t;typeof this.html=="function"&&(t=yield this.html(this)),typeof t=="string"&&(t=J(t));let n=this;if(this.shadowRootInit!==null&&(n=this.attachShadow(this.shadowRootInit)),this.html!==null){let l=A(t);this.$tpl=new P(l),n.appendChild(l)}this.connected()})}disconnectedCallback(){return m(this,null,function*(){this.disconnected()})}};var D,X,S,rt=class{constructor(t="ka-modal",n=null,l={}){T(this,D,void 0);this.$tpl=null;T(this,X,{parentElement:document.body,zIndex:9999,styleBase:"position:fixed; top:0; bottom:0; left:0; right:0;",styleBackdrop:"background-color: #999;opacity:0.5;",maxWidth:800});T(this,S,{promise:null,reject:null,resolve:null});let a=c(this,X);a=b(b({},a),l),this.element=x(t,{hidden:"hidden"},null,a.parentElement),this.backdrop=x("div",{style:`${a.styleBase};${a.styleBackdrop};z-index:${a.zIndex};`},null,this.element);let s=x("div",{style:`position:fixed;left:0;right:0;display:flex;justify-content:center;z-index:${a.zIndex+1};`},null,this.element);g(this,D,x("div",{style:";max-height:100%;max-width:100%;"},null,s)),this.adjustWidth(a),c(this,S).promise=new Promise((d,h)=>{c(this,S).resolve=d,c(this,S).reject=h})}adjustWidth(t){let n=window.innerWidth;n>t.maxWidth&&(n=t.maxWidth),c(this,D).style.width=n+"px"}render(t=null){if(this.$tpl===null){let n=this.html;typeof n=="string"&&(n=J(n));let l=A(n);c(this,D).appendChild(l),this.$tpl=new P(l)}console.log("render",this),this.$tpl.render(t)}resolve(...t){this.element.remove(),c(this,S).resolve(...t)}show(){return this.element.removeAttribute("hidden"),c(this,S).promise}};D=new WeakMap,X=new WeakMap,S=new WeakMap;var st=class{constructor(t=86){window.addEventListener("hashchange",n=>m(this,null,function*(){console.log(n),n.preventDefault(),yield y(1);let l=document.getElementById(window.location.hash.slice(1));if(l===null)return;let a=l.getBoundingClientRect().top+window.scrollY-t;console.log("scrollto",l,window.location.hash,l.getBoundingClientRect().top,a),window.scrollTo({top:a,behavior:"smooth"})}))}};var ot=class extends Z{constructor(){super(...arguments);this.html=()=>m(this,null,function*(){let t=this.innerHTML;return this.innerHTML="",t})}connected(){return m(this,null,function*(){yield L(),this.style.display="contents";let t={elements:[]};document.querySelectorAll("[data-leu-nav]").forEach(n=>{t.elements.push({el:n,title:n.getAttribute("data-leu-nav"),id:n.id,active:!1})}),window.addEventListener("scroll",()=>m(this,null,function*(){yield y(100);let n=!1;for(let l of t.elements)l.active=!1,l.el.getBoundingClientRect().top+window.scrollY+10>window.scrollY&&!n&&(n=!0,l.active=!0);this.$tpl.render()}),{passive:!0}),this.removeAttribute("hidden"),this.$tpl.render(t)})}disconnected(){return m(this,null,function*(){})}};ot=E([w("leu-data-nav")],ot);typeof window.LeuFormatConfig=="undefined"&&(window.LeuFormatConfig={h1:["fs-2","text-center","content-space-2"],h2:["fs-3","mt-5"],hr:["clearboth"],img:["float-start","w-lg-50","w-100","pt-2","pb-2","pe-4"]});var dt=class extends Z{constructor(){super(...arguments);this.html=null}connected(){return m(this,null,function*(){yield L(),yield y(1);let t=LeuFormatConfig;for(let a of this.getAttributeNames())t[a]=this.getAttribute(a).split(" ");for(let a in t)for(let s of Array.from(this.querySelectorAll(a))){let d=t[a];for(let h of d)s.classList.add(h)}let n=null,l=0;t:do{if(this.children.length<l+1)break;let a=this.children[l],s=a.querySelector("[container]");if(s!==null){n=s,l++;continue}if(n===null){l++;continue}n.append(a)}while(!0)})}disconnected(){return m(this,null,function*(){})}};dt=E([w("leu-format")],dt);function vt(i){let t={$:{},"@":{}},n=new RegExp("([@$])[^@^$]+","gi");return i.replace(n,(l,a)=>{if(l=l.substring(1),l.indexOf("=")===-1&&a==="@")typeof t[a].class=="undefined"&&(t[a].class=""),t[a].class+=" "+l,t[a].class=t[a].class.trim();else{let s=l.split("=");t[a][s.shift()]=s.join("=").trim()}return""}),t}function Vt(i,t="@"){let n={},l=new RegExp(`\\${t}[^${t}]+`,"gi");return i.replace(l,a=>{if(a=a.substring(1),a.indexOf("=")===-1)typeof n.class=="undefined"&&(n.class=""),n.class+=" "+a,n.class=n.class.trim();else{let s=a.split("=");n[s.shift()]=s.join("=").trim()}return""}),n}function ut(i){return Vt(i,"@")}function Tt(i){let t=i.trim(),n="div";t=t.replace(/^[a-z0-9_\:\-]+/ig,s=>(n=s,""));let l=ut(t);return x(n,l)}function ht(i,t){return t instanceof i?t:t.parentElement===null?null:ht(i,t.parentElement)}function R(i){return!(typeof i=="undefined"||i===null)}function tt(i,t,...n){throw console.error(`[${i}]: ${t}`,...n),`[${i}] ${t}`}var Q={},q,H,O,V,W,z,C,mt=class extends HTMLElement{constructor(){super(...arguments);T(this,q,null);T(this,H,null);T(this,O,null);T(this,V,null);T(this,W,null);T(this,z,new Map);T(this,C,b({},Q))}createElementTree(t){let n=null,l=null;for(let a of t.split(">")){let s=null;if(a=a.replace(/§([a-z0-9_\-]+)/,(h,_)=>(s=_,"")),a.trim().startsWith("|")){let h=document.createTextNode(a.trim().substring(1));l.appendChild(h);break}let d=Tt(a);s!==null&&(c(this,z)[s]=d),n===null?n=l=d:(l.appendChild(d),l=d)}return{start:n,leaf:l}}parseComment(t){c(this,H).append(t.cloneNode(!0));let n=t.textContent.split(`
`);for(let l of n){if(l=l.trim(),l==="")continue;let a=l.substring(1).trim();switch(l.substring(0,1)){case"/":let s=this.createElementTree(a);c(this,W).appendChild(s.start),g(this,O,s.start),g(this,q,g(this,H,s.leaf)),g(this,C,b({},Q));break;case"!":let d=a.trim().split(" ",1).join(),h=vt(a),_=document.querySelector(`template[id='${d}']`);if(_===null){console.error("<template id='",d,"'> not found. Selected in ",t);break}let o=document.createElement("div");if(Object.keys(h["@"]).length===0)o.style.display="contents";else for(let k in h["@"])o.setAttribute(k,h["@"][k]);let p=_.content.firstElementChild.outerHTML.replace(/\$\{(.*?)(\?(.*?))?\}/gi,(k,K,it,Ht)=>typeof h.$[K]!="undefined"?h.$[K]:Ht);p=p.replace(/([a-z\-]+)--=/ig,(k,K)=>K+"="),o.innerHTML=p,c(this,H).append(o);for(let k of o.querySelectorAll("script")){let K={};k.hasAttribute("src")&&(K={src:k.getAttribute("src")});let it=x("script",K);it.append(document.createTextNode(k.textContent)),k.parentElement.replaceChild(it,k)}let u=o.querySelectorAll("[attach]");for(let k of u)k.getAttribute("attach")===""?(g(this,H,k),g(this,q,k)):c(this,z)[k.getAttribute("attach")]=k;u.length===0&&console.warn("Template has no attach point",_,o);break;case">":let f=this.createElementTree(a);c(this,q).appendChild(f.start),g(this,H,f.leaf);break;case"~":let[I,...N]=a.split("=>"),Mt=ut(N.join(":"));c(this,C)[I]={attrs:Mt,line:l};break;case"?":let $=null,bt=!1;if(a.indexOf("***")!==-1&&(bt=!0,a=a.replace("***","")),a.startsWith("/"))$=c(this,V);else if(a.trim()==="\xA7\xA7")$=c(this,H);else if(a.startsWith("\xA7")){if($=c(this,z)[a.substring(1)],!R($)){console.error("Cannot select reference: '"+l+"': Not found in block",t);break}}else if($=c(this,O).querySelector(a),$===null){console.error(`Query Element '${a}': not found in `,t,"in",c(this,V));break}g(this,q,g(this,H,$)),bt&&g(this,W,$);break;case"#":case"*":break;default:throw console.error("Cannot parse sequence: "+l+" of block",t),"Cannot parse sequence: "+l}}}applyAttMap(t){let n=document.createElement("div");n.append(t);for(let l in c(this,C))try{let a=n.querySelectorAll(l);for(let s of Array.from(a))for(let d in c(this,C)[l].attrs)s.setAttribute(d,c(this,C)[l].attrs[d])}catch(a){console.error("Cannot evaluate: '"+c(this,C)[l].line+"' - ",a);continue}}connectedCallback(){return m(this,null,function*(){yield y(1),this.hasAttribute("default")||(yield y(1)),g(this,C,b({},Q)),g(this,V,g(this,W,g(this,O,g(this,H,g(this,q,x("div",{class:this.getAttribute("class")+" loading"},[])))))),this.parentElement.insertBefore(c(this,V),this.nextElementSibling);for(let t of Array.from(this.childNodes)){if(t instanceof Comment){this.parseComment(t);continue}let n=t.cloneNode(!0);t.remove(),this.applyAttMap(n),c(this,H).append(n)}this.hasAttribute("default")&&(Q=c(this,C),console.debug("Register default attribute map: ",Q,"from",this)),yield y(10),c(this,V).classList.remove("loading"),this.classList.remove("loading"),this.style.display="none"})}disconnectedCallback(){return m(this,null,function*(){})}};q=new WeakMap,H=new WeakMap,O=new WeakMap,V=new WeakMap,W=new WeakMap,z=new WeakMap,C=new WeakMap,mt=E([w("leu-content")],mt);var G=class extends HTMLElement{constructor(){super();this._oldHash=null;this.progressBarE=null;this.content=null;this.titleE=null;this.nextE=null;this.backE=null;this.curDivE=null;let t=this}_selectElement(t){let n=this.content.children[t];this.curDivE=n,this.progressBarE.ariaValueMin=0,this.progressBarE.ariaValueMax=this.content.childElementCount,this.progressBarE.ariaValueNow=t+1,this.progressBarE.style.width=(t+1)/this.content.childElementCount*100+"%",this.titleE.textContent=n.getAttribute("data-title"),n.classList.remove(et.config.switcher.hiddenClass),this.nextE.hidden=!1,t+1===this.content.childElementCount&&(this.nextE.hidden=!0),this.backE.hidden=!1,t===0&&(this.backE.hidden=!0)}_routeChange(){return m(this,null,function*(){let t=window.location.hash.substring(1),n=!1;for(let l=0;l<this.content.children.length;l++){let a=this.content.children[l];console.log("scan",a),a.classList.add(et.config.switcher.hiddenClass),(a.id===t||this.hasAttribute("show-all"))&&(this._selectElement(l),n=!0)}n===!1&&this._selectElement(0)})}next(t=null){return m(this,null,function*(){if(yield y(500),this.curDivE.nextElementSibling!==null)return history.pushState(null,null,"#"+this.curDivE.nextElementSibling.id),t!==null&&t.preventDefault(),console.log("next"),!1})}backClickCb(t){return history.pushState(null,null,"#"+this.curDivE.previousElementSibling.id),t.preventDefault(),!1}_locationListener(){return m(this,null,function*(){window.location.hash!==this._oldHash&&(this._oldHash=window.location.hash,yield this._routeChange(),this.hidden=!1)})}connectedCallback(){return m(this,null,function*(){yield L(),this.progressBarE=M("[data-leu-role='progress-bar']",this,"data-leu-role='progress-bar'"),this.content=M("[data-leu-role='content']",this,"data-leu-role='progress-bar'"),this.titleE=M("[data-leu-role='title']",this,"data-leu-role='title'"),this.nextE=M("[data-leu-role='next-btn']",this,"data-leu-role='next-btn'"),this.backE=M("[data-leu-role='back-btn']",this,"data-leu-role='back-btn'"),this.backE.addEventListener("click",t=>this.backClickCb(t)),this.nextE.addEventListener("click",t=>this.next(t)),window.setInterval(()=>this._locationListener(),200),window.setInterval(()=>{this.style.height=this.curDivE.offsetHeight+"px"},500),window.addEventListener("pushstate",()=>{console.log("State pushed")})})}};G=E([w("leu-switcher")],G);var j,ct=class extends HTMLElement{constructor(){super(...arguments);T(this,j,null)}evalIf(t=null){v(this.dataset.if,this,t,{})===!0?this.classList.remove(Leu.config.switcher.hiddenClass):this.classList.remove(Leu.config.switcher.hiddenClass)}connectedCallback(){this.style.display="contents",g(this,j,t=>this.evalIf(t)),document.addEventListener("click",c(this,j)),this.evalIf()}disconnectedCallback(){document.removeEventListener("click",c(this,j))}};j=new WeakMap,ct=E([w("leu-show")],ct);var U={},ft=class extends HTMLElement{connectedCallback(){return m(this,null,function*(){this.style.display="none",yield L(),R(this.dataset.value)&&(U[this.dataset.name]=this.dataset.value),R(this.dataset.increment)&&(R(U[this.dataset.name])||(U[this.dataset.name]=0),U[this.dataset.name]++);let t=new Comment(this.outerHTML);this.replaceWith(t)})}};ft=E([w("leu-var")],ft);var pt=class extends HTMLElement{connectedCallback(){return m(this,null,function*(){this.style.display="contents",yield L(),yield y(1);let t=this.dataset.tplId,n=M("template[id='"+t+"']",null,"leu-use: template with id '"+t+"' not found"),l=b(b({},U),this.dataset);console.log(l);let a=n.content.firstElementChild.outerHTML.replace(/\$\{(.*?)(\?(.*?))?}/gi,(o,p,u,f)=>typeof l[p]!="undefined"?l[p]:(typeof f=="undefined"&&console.error(`[<leu-use>] Data-Attribute missing: 'data-${p}' on <template id="${t}>" called by <leu-use></leu-use>`,this),f));a=a.replace(/([a-z\-]+)--=(["'])/ig,(o,p,u)=>p+"="+u);let s=this.innerHTML,d=document.createElement("div");d.innerHTML=a;let h=d.querySelector("*[attach]");h!==null&&(h.innerHTML=s),d.childNodes.forEach(o=>this.parentElement.insertBefore(o,this.nextElementSibling));let _=new Comment(this.outerHTML);this.replaceWith(_)})}};pt=E([w("leu-use")],pt);var It=`
<div class="modal-backdrop fade"></div>
<div class="modal fade d-block" tabindex="-1" data-leu-dismiss="modal" >

    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable %%classes%%" role="dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">%%title%%</h5>
                <button type="button" class="btn-close" data-leu-dismiss="modal" aria-label="Schlie\xDFen"></button>
            </div>
            <div class="modal-body">
                %%body%%
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-leu-dismiss="modal">Schlie\xDFen</button>
            </div>
        </div>
    </div>
</div>
`,_t=class extends HTMLElement{constructor(){super();this.origOverflow="";this.oldUrl=window.location.href.split("#")[0]}show(){return m(this,null,function*(){var s,d;let t=(s=this.getAttribute("data-leu-title"))!=null?s:"Unnamed [data-leu-title]",n=this.getAttribute("data-leu-template"),l=this.getAttribute("data-leu-class"),a=It;n!==null&&(a=(d=document.querySelector(n))==null?void 0:d.innerHTML),a===null&&tt("leu-modal",`template-selector in data-leu-template '${n}' not found`),this.origOverflow=document.body.style.overflow,document.body.style.overflow="hidden",a=a.replace("%%title%%",t).replace("%%body%%",this.innerHTML).replace("%%classes%%",l!=null?l:""),this.showElement.innerHTML=a,yield y(10),this.showElement.querySelectorAll(".fade").forEach(h=>h.classList.add("show"))})}hide(){return m(this,null,function*(){this.showElement.innerHTML!==""&&(document.body.style.overflow=this.origOverflow,this.showElement.querySelectorAll(".fade").forEach(t=>t.classList.remove("show")),yield y(200),this.showElement.innerHTML="")})}checkHref(t){window.location.hash==="#"+this.getAttribute("id")?(t&&(this.oldUrl=t.oldURL),this.show()):this.hide()}connectedCallback(){return m(this,null,function*(){this.style.display="none",yield L(),yield y(1),this.showElement=x("div",{owner:"leu-modal"}),document.body.append(this.showElement),this.showElement.addEventListener("click",t=>{t.target.hasAttribute("data-leu-dismiss")&&(history.pushState({},"",this.oldUrl),this.hide())}),window.addEventListener("hashchange",t=>this.checkHref(t)),this.checkHref(null)})}disconnectedCallback(){return m(this,null,function*(){window.removeEventListener("hashchange",this.checkHref),this.showElement.remove()})}};_t=E([w("leu-modal")],_t);var Lt=class extends rt{constructor(t){super();this.html="";this.html=t,this.element.addEventListener("click",n=>m(this,null,function*(){var a;!n.target.hasAttribute("data-leu-dismiss")||((a=this.element.querySelector(".fade"))==null||a.classList.remove("show"),yield y(200),this.resolve("dismiss"))}))}};function xt(i,t="#modal-default"){return m(this,null,function*(){var _;let n,l="Unnamed [unset data-leu-title]",a;if(i.startsWith("#")){let o=document.querySelector(i);n=o.innerHTML,l=o.getAttribute("data-leu-title")}else n=yield(yield fetch(i)).text();if(t!==null){let o=document.querySelector(t);o===null&&tt("leu-modal","templateSelector "+t+" not found"),a=o.innerHTML.replace("%%title%%",l).replace("%%body%%",n)}let s=new Lt(a);history.pushState({modal:!0},"Modal open","");let d=()=>{console.log("popstate"),s.resolve()};window.addEventListener("popstate",d),s.render({});let h=s.show().then(o=>{window.removeEventListener("popstate",d)});yield y(10),(_=s.element.querySelector(".fade"))==null||_.classList.add("show")})}var et={config:{switcher:{hiddenClass:"visually-hidden"}},findParent:ht,modal:xt,Switcher:G,SmoothScroll:st};typeof globalThis.Leu!="undefined"&&console.error("globalThis.Leu is already defined. Possibly double loaded library?");globalThis.Leu=et;})();
