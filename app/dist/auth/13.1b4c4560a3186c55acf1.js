(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"1Vod":function(t,e,r){"use strict";r.r(e),r.d(e,"AllowAccessModule",(function(){return D}));var s=r("mrSG"),n=r("3Pt+"),o=r("fXoL"),a=r("tyNb"),i=r("9ZKQ"),c=r("L7HW"),m=r("dWDE"),d=r("BhS5"),f=r("xyCQ"),p=r("WF9o"),l=r("4jEk"),h=r("ofXK"),g=r("kmnG"),u=r("qFsG"),b=r("bTqV"),k=r("fASB"),_=r("Xa2L");function w(t,e){if(1&t&&o.Nb(0,"img",10),2&t){const t=o.ec();o.kc("src",t.app.icon,o.sc)}}function A(t,e){if(1&t&&(o.Sb(0,"h1"),o.Bc(1),o.Rb()),2&t){const t=o.ec();o.Ab(1),o.Dc(" ",t.app.name," ")}}function S(t,e){if(1&t&&(o.Sb(0,"mat-error"),o.Bc(1),o.Rb()),2&t){const t=o.ec();o.Ab(1),o.Dc(" ",t.errors.email," ")}}function x(t,e){if(1&t&&(o.Sb(0,"mat-error"),o.Bc(1),o.Rb()),2&t){const t=o.ec();o.Ab(1),o.Dc(" ",t.errors.password," ")}}function y(t,e){1&t&&o.Nb(0,"mat-progress-spinner",11)}let v=(()=>{class t{constructor(t,e,r,s,o,a,i){this.route=t,this.toast=e,this.config=r,this.formerror=s,this.buttons=o,this.service=a,this.localstorage=i,this.form=new n.f({email:new n.c("",[n.w.email,n.w.required]),password:new n.c("",[n.w.required])}),this.errors={email:"",password:""},this.app={},this.subscriptions={}}load(){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.service.load({filter:["icon","name","scopes"],appId:this.appId});this.loading=!1,t.ok?this.app=t.result:this.toast.show("Issue loading app!")}))}submit(){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0,this.form.disable(),this.localstorage.set("email",this.form.value.email);const t=new Date((new Date).setFullYear((new Date).getFullYear()+1)),e=yield this.service.allowaccess({appId:this.appId,email:this.form.value.email,expiry:t,scopes:this.app.scopes,password:this.form.value.password,description:this.app.name+" (LOGIN)"});if(this.form.enable(),this.loading=!1,e.ok){const t=[this.returl,"?","email=",this.form.value.email,"&userId=",e.result.userId,"&tokenId=",e.result.tokenId].join("");window.open(t,"_parent")}else this.toast.show(e.error.message)}))}ngOnInit(){this.buttons.hide("add"),this.buttons.hide("close"),this.buttons.hide("filter"),this.buttons.hide("search"),this.subscriptions.form=this.form.valueChanges.subscribe(t=>{this.errors=this.formerror.validateForm(this.form,this.errors,!0)}),this.subscriptions.config=this.config.loaded.subscribe(t=>{if(t){const t=this.route.snapshot.queryParams;this.appId=t.appId,this.returl=t.returl,null!=t.email&&this.form.controls.email.setValue(t.email),this.load()}})}ngOnDestroy(){this.subscriptions.form.unsubscribe(),this.subscriptions.config.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(o.Mb(a.a),o.Mb(i.a),o.Mb(c.a),o.Mb(m.a),o.Mb(d.a),o.Mb(f.a),o.Mb(p.a))},t.\u0275cmp=o.Gb({type:t,selectors:[["allow-access-page"]],decls:21,vars:7,consts:[["alt","icon","width","100","height","100",3,"src",4,"ngIf"],[4,"ngIf"],[3,"formGroup","ngSubmit"],["appearance","outline"],["matInput","","type","email","name","email","placeholder","email","formControlName","email","required",""],["matInput","","type","password","name","password","placeholder","password","formControlName","password","required",""],["routerLink","/forgot-password","queryParamsHandling","preserve",1,"forgot-password"],["type","submit","mat-flat-button","","color","primary"],["mode","indeterminate","diameter","30",4,"ngIf"],["type","button","mat-stroked-button","","color","primary","back-button",""],["alt","icon","width","100","height","100",3,"src"],["mode","indeterminate","diameter","30"]],template:function(t,e){1&t&&(o.Sb(0,"mat-content"),o.zc(1,w,1,1,"img",0),o.zc(2,A,2,1,"h1",1),o.Sb(3,"form",2),o.ac("ngSubmit",(function(){return!e.form.invalid&&!e.loading&&e.submit()})),o.Sb(4,"mat-form-field",3),o.Sb(5,"mat-label"),o.Bc(6," Email "),o.Rb(),o.Nb(7,"input",4),o.zc(8,S,2,1,"mat-error",1),o.Rb(),o.Sb(9,"mat-form-field",3),o.Sb(10,"mat-label"),o.Bc(11," Password "),o.Rb(),o.Nb(12,"input",5),o.zc(13,x,2,1,"mat-error",1),o.Rb(),o.Sb(14,"a",6),o.Bc(15," Forgot Password? "),o.Rb(),o.Sb(16,"button",7),o.Bc(17),o.zc(18,y,1,0,"mat-progress-spinner",8),o.Rb(),o.Sb(19,"button",9),o.Bc(20," back "),o.Rb(),o.Rb(),o.Rb()),2&t&&(o.Ab(1),o.kc("ngIf",e.app.icon),o.Ab(1),o.kc("ngIf",e.app.name),o.Ab(1),o.kc("formGroup",e.form),o.Ab(5),o.kc("ngIf",e.errors.email),o.Ab(5),o.kc("ngIf",e.errors.password),o.Ab(4),o.Dc(" ",e.loading?"":"sign in"," "),o.Ab(1),o.kc("ngIf",e.loading))},directives:[l.a,h.l,n.x,n.p,n.g,g.c,g.g,u.a,n.b,n.o,n.e,n.v,a.f,b.a,k.a,g.b,_.a],styles:["mat-content[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column}mat-content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin:20px 0}mat-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{max-width:400px}.forgot-password[_ngcontent-%COMP%], mat-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:20px}.forgot-password[_ngcontent-%COMP%]{color:#2196f3;cursor:pointer;margin-left:auto}"]}),t})();var C=r("NFeN"),E=r("d3UM"),R=r("/t3+"),L=r("H0Zp"),M=r("pBNG");const N=[{path:"",component:v}];let D=(()=>{class t{}return t.\u0275mod=o.Kb({type:t}),t.\u0275inj=o.Jb({factory:function(e){return new(e||t)},imports:[[n.i,h.c,C.b,u.b,b.b,E.b,R.b,L.a,M.a,g.e,n.u,_.b,a.g.forChild(N)]]}),t})()},"4jEk":function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var s=r("fXoL");const n=["*"];let o=(()=>{class t{constructor(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=s.Gb({type:t,selectors:[["mat-content"]],ngContentSelectors:n,decls:1,vars:0,template:function(t,e){1&t&&(s.jc(),s.ic(0))},styles:["mat-content{flex:1 auto;height:calc(100vh - 100px);overflow-y:auto}"],encapsulation:2}),t})()},H0Zp:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var s=r("ofXK"),n=r("fXoL");let o=(()=>{class t{}return t.\u0275mod=n.Kb({type:t}),t.\u0275inj=n.Jb({factory:function(e){return new(e||t)},imports:[[s.c]]}),t})()},Xa2L:function(t,e,r){"use strict";r.d(e,"a",(function(){return b})),r.d(e,"b",(function(){return _})),r.d(e,"c",(function(){return k}));var s=r("fXoL"),n=r("ofXK"),o=r("FKr1"),a=r("8LU1"),i=r("nLfN"),c=r("R1ws");function m(t,e){if(1&t&&(s.dc(),s.Nb(0,"circle",3)),2&t){const t=s.ec();s.wc("animation-name","mat-progress-spinner-stroke-rotate-"+t._spinnerAnimationLabel)("stroke-dashoffset",t._getStrokeDashOffset(),"px")("stroke-dasharray",t._getStrokeCircumference(),"px")("stroke-width",t._getCircleStrokeWidth(),"%"),s.Bb("r",t._getCircleRadius())}}function d(t,e){if(1&t&&(s.dc(),s.Nb(0,"circle",3)),2&t){const t=s.ec();s.wc("stroke-dashoffset",t._getStrokeDashOffset(),"px")("stroke-dasharray",t._getStrokeCircumference(),"px")("stroke-width",t._getCircleStrokeWidth(),"%"),s.Bb("r",t._getCircleRadius())}}function f(t,e){if(1&t&&(s.dc(),s.Nb(0,"circle",3)),2&t){const t=s.ec();s.wc("animation-name","mat-progress-spinner-stroke-rotate-"+t._spinnerAnimationLabel)("stroke-dashoffset",t._getStrokeDashOffset(),"px")("stroke-dasharray",t._getStrokeCircumference(),"px")("stroke-width",t._getCircleStrokeWidth(),"%"),s.Bb("r",t._getCircleRadius())}}function p(t,e){if(1&t&&(s.dc(),s.Nb(0,"circle",3)),2&t){const t=s.ec();s.wc("stroke-dashoffset",t._getStrokeDashOffset(),"px")("stroke-dasharray",t._getStrokeCircumference(),"px")("stroke-width",t._getCircleStrokeWidth(),"%"),s.Bb("r",t._getCircleRadius())}}const l=".mat-progress-spinner{display:block;position:relative}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.cdk-high-contrast-active .mat-progress-spinner circle{stroke:currentColor}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:mat-progress-spinner-linear-rotate 2000ms linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4000ms;animation-timing-function:cubic-bezier(0.35, 0, 0.25, 1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:mat-progress-spinner-stroke-rotate-fallback 10000ms cubic-bezier(0.87, 0.03, 0.33, 1) infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.606171575px;transform:rotate(0)}12.5%{stroke-dashoffset:56.5486677px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.606171575px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.5486677px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.606171575px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.5486677px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.606171575px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.5486677px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0deg)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}\n";class h{constructor(t){this._elementRef=t}}const g=Object(o.t)(h,"primary"),u=new s.r("mat-progress-spinner-default-options",{providedIn:"root",factory:function(){return{diameter:100}}});let b=(()=>{class t extends g{constructor(e,r,s,n,o){super(e),this._elementRef=e,this._document=s,this._diameter=100,this._value=0,this._fallbackAnimation=!1,this.mode="determinate";const a=t._diameters;this._spinnerAnimationLabel=this._getSpinnerAnimationLabel(),a.has(s.head)||a.set(s.head,new Set([100])),this._fallbackAnimation=r.EDGE||r.TRIDENT,this._noopAnimations="NoopAnimations"===n&&!!o&&!o._forceAnimations,o&&(o.diameter&&(this.diameter=o.diameter),o.strokeWidth&&(this.strokeWidth=o.strokeWidth))}get diameter(){return this._diameter}set diameter(t){this._diameter=Object(a.f)(t),this._spinnerAnimationLabel=this._getSpinnerAnimationLabel(),!this._fallbackAnimation&&this._styleRoot&&this._attachStyleNode()}get strokeWidth(){return this._strokeWidth||this.diameter/10}set strokeWidth(t){this._strokeWidth=Object(a.f)(t)}get value(){return"determinate"===this.mode?this._value:0}set value(t){this._value=Math.max(0,Math.min(100,Object(a.f)(t)))}ngOnInit(){const t=this._elementRef.nativeElement;this._styleRoot=Object(i.c)(t)||this._document.head,this._attachStyleNode(),t.classList.add(`mat-progress-spinner-indeterminate${this._fallbackAnimation?"-fallback":""}-animation`)}_getCircleRadius(){return(this.diameter-10)/2}_getViewBox(){const t=2*this._getCircleRadius()+this.strokeWidth;return`0 0 ${t} ${t}`}_getStrokeCircumference(){return 2*Math.PI*this._getCircleRadius()}_getStrokeDashOffset(){return"determinate"===this.mode?this._getStrokeCircumference()*(100-this._value)/100:this._fallbackAnimation&&"indeterminate"===this.mode?.2*this._getStrokeCircumference():null}_getCircleStrokeWidth(){return this.strokeWidth/this.diameter*100}_attachStyleNode(){const e=this._styleRoot,r=this._diameter,s=t._diameters;let n=s.get(e);if(!n||!n.has(r)){const t=this._document.createElement("style");t.setAttribute("mat-spinner-animation",this._spinnerAnimationLabel),t.textContent=this._getAnimationText(),e.appendChild(t),n||(n=new Set,s.set(e,n)),n.add(r)}}_getAnimationText(){const t=this._getStrokeCircumference();return"\n @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {\n    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }\n    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }\n    12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }\n    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }\n\n    25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }\n    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }\n    37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }\n    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }\n\n    50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }\n    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }\n    62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }\n    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }\n\n    75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }\n    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }\n    87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }\n    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }\n  }\n".replace(/START_VALUE/g,""+.95*t).replace(/END_VALUE/g,""+.2*t).replace(/DIAMETER/g,""+this._spinnerAnimationLabel)}_getSpinnerAnimationLabel(){return this.diameter.toString().replace(".","_")}}return t.\u0275fac=function(e){return new(e||t)(s.Mb(s.l),s.Mb(i.a),s.Mb(n.d,8),s.Mb(c.a,8),s.Mb(u))},t.\u0275cmp=s.Gb({type:t,selectors:[["mat-progress-spinner"]],hostAttrs:["role","progressbar",1,"mat-progress-spinner"],hostVars:10,hostBindings:function(t,e){2&t&&(s.Bb("aria-valuemin","determinate"===e.mode?0:null)("aria-valuemax","determinate"===e.mode?100:null)("aria-valuenow","determinate"===e.mode?e.value:null)("mode",e.mode),s.wc("width",e.diameter,"px")("height",e.diameter,"px"),s.Eb("_mat-animation-noopable",e._noopAnimations))},inputs:{color:"color",mode:"mode",diameter:"diameter",strokeWidth:"strokeWidth",value:"value"},exportAs:["matProgressSpinner"],features:[s.xb],decls:3,vars:8,consts:[["preserveAspectRatio","xMidYMid meet","focusable","false",3,"ngSwitch"],["cx","50%","cy","50%",3,"animation-name","stroke-dashoffset","stroke-dasharray","stroke-width",4,"ngSwitchCase"],["cx","50%","cy","50%",3,"stroke-dashoffset","stroke-dasharray","stroke-width",4,"ngSwitchCase"],["cx","50%","cy","50%"]],template:function(t,e){1&t&&(s.dc(),s.Sb(0,"svg",0),s.zc(1,m,1,9,"circle",1),s.zc(2,d,1,7,"circle",2),s.Rb()),2&t&&(s.wc("width",e.diameter,"px")("height",e.diameter,"px"),s.kc("ngSwitch","indeterminate"===e.mode),s.Bb("viewBox",e._getViewBox()),s.Ab(1),s.kc("ngSwitchCase",!0),s.Ab(1),s.kc("ngSwitchCase",!1))},directives:[n.n,n.o],styles:[l],encapsulation:2,changeDetection:0}),t._diameters=new WeakMap,t})(),k=(()=>{class t extends b{constructor(t,e,r,s,n){super(t,e,r,s,n),this.mode="indeterminate"}}return t.\u0275fac=function(e){return new(e||t)(s.Mb(s.l),s.Mb(i.a),s.Mb(n.d,8),s.Mb(c.a,8),s.Mb(u))},t.\u0275cmp=s.Gb({type:t,selectors:[["mat-spinner"]],hostAttrs:["role","progressbar","mode","indeterminate",1,"mat-spinner","mat-progress-spinner"],hostVars:6,hostBindings:function(t,e){2&t&&(s.wc("width",e.diameter,"px")("height",e.diameter,"px"),s.Eb("_mat-animation-noopable",e._noopAnimations))},inputs:{color:"color"},features:[s.xb],decls:3,vars:8,consts:[["preserveAspectRatio","xMidYMid meet","focusable","false",3,"ngSwitch"],["cx","50%","cy","50%",3,"animation-name","stroke-dashoffset","stroke-dasharray","stroke-width",4,"ngSwitchCase"],["cx","50%","cy","50%",3,"stroke-dashoffset","stroke-dasharray","stroke-width",4,"ngSwitchCase"],["cx","50%","cy","50%"]],template:function(t,e){1&t&&(s.dc(),s.Sb(0,"svg",0),s.zc(1,f,1,9,"circle",1),s.zc(2,p,1,7,"circle",2),s.Rb()),2&t&&(s.wc("width",e.diameter,"px")("height",e.diameter,"px"),s.kc("ngSwitch","indeterminate"===e.mode),s.Bb("viewBox",e._getViewBox()),s.Ab(1),s.kc("ngSwitchCase",!0),s.Ab(1),s.kc("ngSwitchCase",!1))},directives:[n.n,n.o],styles:[l],encapsulation:2,changeDetection:0}),t})(),_=(()=>{class t{}return t.\u0275mod=s.Kb({type:t}),t.\u0275inj=s.Jb({factory:function(e){return new(e||t)},imports:[[o.h,n.c],o.h]}),t})()}}]);