(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"4jEk":function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r("fXoL");const s=["*"];let o=(()=>{class t{constructor(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n.Gb({type:t,selectors:[["mat-content"]],ngContentSelectors:s,decls:1,vars:0,template:function(t,e){1&t&&(n.jc(),n.ic(0))},styles:["mat-content{flex:1 auto;height:calc(100vh - 100px);overflow-y:auto}"],encapsulation:2}),t})()},"9nUT":function(t,e,r){"use strict";r.r(e),r.d(e,"ResetPasswordModule",(function(){return M}));var n=r("ofXK"),s=r("NFeN"),o=r("qFsG"),a=r("d3UM"),i=r("bTqV"),c=r("/t3+"),m=r("pBNG"),d=r("YUcS"),f=r("H0Zp"),p=r("mrSG"),h=r("3Pt+"),l=r("fXoL"),u=r("xyCQ"),g=r("tyNb"),b=r("9ZKQ"),k=r("L7HW"),_=r("IRyT"),w=r("dWDE"),v=r("4jEk"),A=r("kmnG"),S=r("fASB"),x=r("Xa2L");function y(t,e){if(1&t&&(l.Sb(0,"mat-error"),l.Bc(1),l.Rb()),2&t){const t=l.ec();l.Ab(1),l.Dc(" ",t.errors.new," ")}}function C(t,e){if(1&t&&(l.Sb(0,"mat-error"),l.Bc(1),l.Rb()),2&t){const t=l.ec();l.Ab(1),l.Fc(" ",t.errors.confirm," ",t.form.value.new!=t.form.value.confirm&&t.errors.confirm?" & ":""," ",t.form.value.new!=t.form.value.confirm?"Passwords do not match!":""," ")}}function R(t,e){1&t&&l.Nb(0,"mat-progress-spinner",9)}const E=[{path:"",component:(()=>{class t{constructor(t,e,r,n,s,o,a){this.apps=t,this.route=e,this.toast=r,this.config=n,this.router=s,this.service=o,this.formerror=a,this.form=new h.f({old:new h.c("",[h.v.required]),new:new h.c("",[h.v.required]),userId:new h.c("",[h.v.required]),confirm:new h.c("",[h.v.required])}),this.app={},this.errors={old:"",new:"",userId:"",confirm:""},this.subscriptions={}}load(){return Object(p.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.apps.load({filter:["url","icon","name","appId"],appId:this.appId});this.loading=!1,t.ok?this.app=t.result:this.toast.show("Issue loading app!")}))}submit(){return Object(p.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.service.changepassword({old:this.form.value.old,new:this.form.value.new,userId:this.form.value.userId});this.loading=!1,t.ok?(Object.keys(this.app).includes("url")?this.router.navigate(["/allow-access"],{queryParams:{appId:this.app.appId,userId:this.form.value.userId,returl:this.app.url+"/authenticate"},replaceUrl:!0}):this.router.navigate(["/signin"],{queryParams:{userId:this.form.value.userId},replaceUrl:!0}),this.toast.show("Password was changed!")):this.toast.show(t.error.message)}))}ngOnInit(){this.subscriptions.form=this.form.valueChanges.subscribe(t=>{this.errors=this.formerror.validateForm(this.form,this.errors,!0)}),this.subscriptions.loaded=this.config.loaded.subscribe(t=>{if(t){const t=this.route.snapshot.queryParams;void 0!==t.userId&&this.form.controls.userId.setValue(t.userId),void 0!==t.password&&this.form.controls.old.setValue(t.password),null!=t.appId&&(this.appId=t.appId,this.load()),""!=t.userId&&null!=t.userId&&void 0!==t.userId&&""!=t.password&&null!=t.password&&void 0!==t.password||this.router.navigate(["/"])}})}ngOnDestroy(){this.subscriptions.form.unsubscribe(),this.subscriptions.loaded.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(l.Mb(u.a),l.Mb(g.a),l.Mb(b.a),l.Mb(k.a),l.Mb(g.c),l.Mb(_.a),l.Mb(w.a))},t.\u0275cmp=l.Gb({type:t,selectors:[["reset-password-page"]],decls:22,vars:7,consts:[["alt","icon","width","100","height","100",3,"src"],[3,"formGroup","ngSubmit"],["appearance","outline"],["matInput","","type","password","name","new","placeholder","new","formControlName","new","required",""],[4,"ngIf"],["matInput","","type","password","name","confirm password","placeholder","confirm password","formControlName","confirm","required",""],["type","submit","mat-flat-button","","color","primary"],["mode","indeterminate","diameter","30",4,"ngIf"],["type","button","mat-stroked-button","","color","primary","back-button",""],["mode","indeterminate","diameter","30"]],template:function(t,e){1&t&&(l.Sb(0,"mat-content"),l.Nb(1,"img",0),l.Sb(2,"h1"),l.Bc(3),l.Rb(),l.Sb(4,"h2"),l.Bc(5," Reset Password "),l.Rb(),l.Sb(6,"form",1),l.ac("ngSubmit",(function(){return e.form.value.new==e.form.value.confirm&&!e.form.invalid&&e.submit()})),l.Sb(7,"mat-form-field",2),l.Sb(8,"mat-label"),l.Bc(9," Password "),l.Rb(),l.Nb(10,"input",3),l.zc(11,y,2,1,"mat-error",4),l.Rb(),l.Sb(12,"mat-form-field",2),l.Sb(13,"mat-label"),l.Bc(14," Confirm Password "),l.Rb(),l.Nb(15,"input",5),l.zc(16,C,2,3,"mat-error",4),l.Rb(),l.Sb(17,"button",6),l.Bc(18),l.zc(19,R,1,0,"mat-progress-spinner",7),l.Rb(),l.Sb(20,"button",8),l.Bc(21," back "),l.Rb(),l.Rb(),l.Rb()),2&t&&(l.Ab(1),l.kc("src",e.app.icon?e.app.icon:"./assets/icons/icon-512x512.png",l.sc),l.Ab(2),l.Dc(" ",e.app.name?e.app.name:"Auth"," "),l.Ab(3),l.kc("formGroup",e.form),l.Ab(5),l.kc("ngIf",e.errors.new),l.Ab(5),l.kc("ngIf",e.errors.confirm||e.form.value.new!=e.form.value.confirm),l.Ab(2),l.Dc(" ",e.loading?"":"change password"," "),l.Ab(1),l.kc("ngIf",e.loading))},directives:[v.a,h.w,h.p,h.g,A.c,A.f,o.a,h.b,h.o,h.e,h.u,n.l,i.a,S.a,A.b,x.a],styles:["mat-content[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column}mat-content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin:20px 0}mat-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{max-width:400px}mat-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:12px;text-align:justify;line-height:16px}mat-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#2196f3}"]}),t})()}];let M=(()=>{class t{}return t.\u0275mod=l.Kb({type:t}),t.\u0275inj=l.Jb({factory:function(e){return new(e||t)},imports:[[h.i,n.c,s.b,o.b,i.b,a.b,f.a,f.a,c.b,d.a,m.a,A.e,h.t,x.b,g.g.forChild(E)]]}),t})()},H0Zp:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r("ofXK"),s=r("fXoL");let o=(()=>{class t{}return t.\u0275mod=s.Kb({type:t}),t.\u0275inj=s.Jb({factory:function(e){return new(e||t)},imports:[[n.c]]}),t})()},Xa2L:function(t,e,r){"use strict";r.d(e,"a",(function(){return b})),r.d(e,"b",(function(){return _})),r.d(e,"c",(function(){return k}));var n=r("fXoL"),s=r("ofXK"),o=r("FKr1"),a=r("8LU1"),i=r("nLfN"),c=r("R1ws");function m(t,e){if(1&t&&(n.dc(),n.Nb(0,"circle",3)),2&t){const t=n.ec();n.wc("animation-name","mat-progress-spinner-stroke-rotate-"+t._spinnerAnimationLabel)("stroke-dashoffset",t._getStrokeDashOffset(),"px")("stroke-dasharray",t._getStrokeCircumference(),"px")("stroke-width",t._getCircleStrokeWidth(),"%"),n.Bb("r",t._getCircleRadius())}}function d(t,e){if(1&t&&(n.dc(),n.Nb(0,"circle",3)),2&t){const t=n.ec();n.wc("stroke-dashoffset",t._getStrokeDashOffset(),"px")("stroke-dasharray",t._getStrokeCircumference(),"px")("stroke-width",t._getCircleStrokeWidth(),"%"),n.Bb("r",t._getCircleRadius())}}function f(t,e){if(1&t&&(n.dc(),n.Nb(0,"circle",3)),2&t){const t=n.ec();n.wc("animation-name","mat-progress-spinner-stroke-rotate-"+t._spinnerAnimationLabel)("stroke-dashoffset",t._getStrokeDashOffset(),"px")("stroke-dasharray",t._getStrokeCircumference(),"px")("stroke-width",t._getCircleStrokeWidth(),"%"),n.Bb("r",t._getCircleRadius())}}function p(t,e){if(1&t&&(n.dc(),n.Nb(0,"circle",3)),2&t){const t=n.ec();n.wc("stroke-dashoffset",t._getStrokeDashOffset(),"px")("stroke-dasharray",t._getStrokeCircumference(),"px")("stroke-width",t._getCircleStrokeWidth(),"%"),n.Bb("r",t._getCircleRadius())}}const h=".mat-progress-spinner{display:block;position:relative}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.cdk-high-contrast-active .mat-progress-spinner circle{stroke:currentColor}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:mat-progress-spinner-linear-rotate 2000ms linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4000ms;animation-timing-function:cubic-bezier(0.35, 0, 0.25, 1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:mat-progress-spinner-stroke-rotate-fallback 10000ms cubic-bezier(0.87, 0.03, 0.33, 1) infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.606171575px;transform:rotate(0)}12.5%{stroke-dashoffset:56.5486677px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.606171575px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.5486677px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.606171575px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.5486677px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.606171575px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.5486677px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0deg)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}\n";class l{constructor(t){this._elementRef=t}}const u=Object(o.t)(l,"primary"),g=new n.r("mat-progress-spinner-default-options",{providedIn:"root",factory:function(){return{diameter:100}}});let b=(()=>{class t extends u{constructor(e,r,n,s,o){super(e),this._elementRef=e,this._document=n,this._diameter=100,this._value=0,this._fallbackAnimation=!1,this.mode="determinate";const a=t._diameters;this._spinnerAnimationLabel=this._getSpinnerAnimationLabel(),a.has(n.head)||a.set(n.head,new Set([100])),this._fallbackAnimation=r.EDGE||r.TRIDENT,this._noopAnimations="NoopAnimations"===s&&!!o&&!o._forceAnimations,o&&(o.diameter&&(this.diameter=o.diameter),o.strokeWidth&&(this.strokeWidth=o.strokeWidth))}get diameter(){return this._diameter}set diameter(t){this._diameter=Object(a.f)(t),this._spinnerAnimationLabel=this._getSpinnerAnimationLabel(),!this._fallbackAnimation&&this._styleRoot&&this._attachStyleNode()}get strokeWidth(){return this._strokeWidth||this.diameter/10}set strokeWidth(t){this._strokeWidth=Object(a.f)(t)}get value(){return"determinate"===this.mode?this._value:0}set value(t){this._value=Math.max(0,Math.min(100,Object(a.f)(t)))}ngOnInit(){const t=this._elementRef.nativeElement;this._styleRoot=Object(i.c)(t)||this._document.head,this._attachStyleNode(),t.classList.add(`mat-progress-spinner-indeterminate${this._fallbackAnimation?"-fallback":""}-animation`)}_getCircleRadius(){return(this.diameter-10)/2}_getViewBox(){const t=2*this._getCircleRadius()+this.strokeWidth;return`0 0 ${t} ${t}`}_getStrokeCircumference(){return 2*Math.PI*this._getCircleRadius()}_getStrokeDashOffset(){return"determinate"===this.mode?this._getStrokeCircumference()*(100-this._value)/100:this._fallbackAnimation&&"indeterminate"===this.mode?.2*this._getStrokeCircumference():null}_getCircleStrokeWidth(){return this.strokeWidth/this.diameter*100}_attachStyleNode(){const e=this._styleRoot,r=this._diameter,n=t._diameters;let s=n.get(e);if(!s||!s.has(r)){const t=this._document.createElement("style");t.setAttribute("mat-spinner-animation",this._spinnerAnimationLabel),t.textContent=this._getAnimationText(),e.appendChild(t),s||(s=new Set,n.set(e,s)),s.add(r)}}_getAnimationText(){const t=this._getStrokeCircumference();return"\n @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {\n    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }\n    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }\n    12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }\n    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }\n\n    25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }\n    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }\n    37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }\n    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }\n\n    50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }\n    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }\n    62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }\n    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }\n\n    75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }\n    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }\n    87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }\n    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }\n  }\n".replace(/START_VALUE/g,""+.95*t).replace(/END_VALUE/g,""+.2*t).replace(/DIAMETER/g,""+this._spinnerAnimationLabel)}_getSpinnerAnimationLabel(){return this.diameter.toString().replace(".","_")}}return t.\u0275fac=function(e){return new(e||t)(n.Mb(n.l),n.Mb(i.a),n.Mb(s.d,8),n.Mb(c.a,8),n.Mb(g))},t.\u0275cmp=n.Gb({type:t,selectors:[["mat-progress-spinner"]],hostAttrs:["role","progressbar",1,"mat-progress-spinner"],hostVars:10,hostBindings:function(t,e){2&t&&(n.Bb("aria-valuemin","determinate"===e.mode?0:null)("aria-valuemax","determinate"===e.mode?100:null)("aria-valuenow","determinate"===e.mode?e.value:null)("mode",e.mode),n.wc("width",e.diameter,"px")("height",e.diameter,"px"),n.Eb("_mat-animation-noopable",e._noopAnimations))},inputs:{color:"color",mode:"mode",diameter:"diameter",strokeWidth:"strokeWidth",value:"value"},exportAs:["matProgressSpinner"],features:[n.xb],decls:3,vars:8,consts:[["preserveAspectRatio","xMidYMid meet","focusable","false",3,"ngSwitch"],["cx","50%","cy","50%",3,"animation-name","stroke-dashoffset","stroke-dasharray","stroke-width",4,"ngSwitchCase"],["cx","50%","cy","50%",3,"stroke-dashoffset","stroke-dasharray","stroke-width",4,"ngSwitchCase"],["cx","50%","cy","50%"]],template:function(t,e){1&t&&(n.dc(),n.Sb(0,"svg",0),n.zc(1,m,1,9,"circle",1),n.zc(2,d,1,7,"circle",2),n.Rb()),2&t&&(n.wc("width",e.diameter,"px")("height",e.diameter,"px"),n.kc("ngSwitch","indeterminate"===e.mode),n.Bb("viewBox",e._getViewBox()),n.Ab(1),n.kc("ngSwitchCase",!0),n.Ab(1),n.kc("ngSwitchCase",!1))},directives:[s.n,s.o],styles:[h],encapsulation:2,changeDetection:0}),t._diameters=new WeakMap,t})(),k=(()=>{class t extends b{constructor(t,e,r,n,s){super(t,e,r,n,s),this.mode="indeterminate"}}return t.\u0275fac=function(e){return new(e||t)(n.Mb(n.l),n.Mb(i.a),n.Mb(s.d,8),n.Mb(c.a,8),n.Mb(g))},t.\u0275cmp=n.Gb({type:t,selectors:[["mat-spinner"]],hostAttrs:["role","progressbar","mode","indeterminate",1,"mat-spinner","mat-progress-spinner"],hostVars:6,hostBindings:function(t,e){2&t&&(n.wc("width",e.diameter,"px")("height",e.diameter,"px"),n.Eb("_mat-animation-noopable",e._noopAnimations))},inputs:{color:"color"},features:[n.xb],decls:3,vars:8,consts:[["preserveAspectRatio","xMidYMid meet","focusable","false",3,"ngSwitch"],["cx","50%","cy","50%",3,"animation-name","stroke-dashoffset","stroke-dasharray","stroke-width",4,"ngSwitchCase"],["cx","50%","cy","50%",3,"stroke-dashoffset","stroke-dasharray","stroke-width",4,"ngSwitchCase"],["cx","50%","cy","50%"]],template:function(t,e){1&t&&(n.dc(),n.Sb(0,"svg",0),n.zc(1,f,1,9,"circle",1),n.zc(2,p,1,7,"circle",2),n.Rb()),2&t&&(n.wc("width",e.diameter,"px")("height",e.diameter,"px"),n.kc("ngSwitch","indeterminate"===e.mode),n.Bb("viewBox",e._getViewBox()),n.Ab(1),n.kc("ngSwitchCase",!0),n.Ab(1),n.kc("ngSwitchCase",!1))},directives:[s.n,s.o],styles:[h],encapsulation:2,changeDetection:0}),t})(),_=(()=>{class t{}return t.\u0275mod=n.Kb({type:t}),t.\u0275inj=n.Jb({factory:function(e){return new(e||t)},imports:[[o.h,s.c],o.h]}),t})()}}]);