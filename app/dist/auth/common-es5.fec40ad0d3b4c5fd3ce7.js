function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(e){var t=_isNativeReflectConstruct();return function(){var r,n=_getPrototypeOf(e);if(t){var o=_getPrototypeOf(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return _possibleConstructorReturn(this,r)}}function _possibleConstructorReturn(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"1mZA":function(e,t,r){"use strict";r.d(t,"a",(function(){return f}));var n=r("ofXK"),o=r("NFeN"),a=r("+0xr"),i=r("bTqV"),s=r("d3UM"),c=r("0IaG"),u=r("/t3+"),l=r("fXoL"),f=function(){var e=function e(){_classCallCheck(this,e)};return e.\u0275mod=l.Mb({type:e}),e.\u0275inj=l.Lb({factory:function(t){return new(t||e)},imports:[[n.c,o.b,a.l,c.c,s.b,i.b,u.b]]}),e}()},"2xuv":function(e,t,r){"use strict";r.d(t,"a",(function(){return d}));var n=r("ofXK"),o=r("NFeN"),a=r("qFsG"),i=r("0IaG"),s=r("bTqV"),c=r("d3UM"),u=r("/t3+"),l=r("kmnG"),f=r("3Pt+"),m=r("fXoL"),d=function(){var e=function e(){_classCallCheck(this,e)};return e.\u0275mod=m.Mb({type:e}),e.\u0275inj=m.Lb({factory:function(t){return new(t||e)},imports:[[f.f,n.c,o.b,a.b,c.b,i.c,s.b,u.b,l.e,f.n]]}),e}()},"5ghV":function(e,t,r){"use strict";r.d(t,"a",(function(){return v}));var n=r("AytR"),o=r("3Pt+"),a=r("fXoL"),i=r("0IaG"),s=r("dWDE"),c=r("/t3+"),u=r("bTqV"),l=r("NFeN"),f=r("kmnG"),m=r("qFsG"),d=r("ofXK"),b=r("d3UM"),p=r("FKr1");function h(e,t){if(1&e&&(a.Ub(0,"mat-error"),a.yc(1),a.Tb()),2&e){var r=a.gc();a.Cb(1),a.Ac(" ",r.errors.email," ")}}function g(e,t){if(1&e&&(a.Ub(0,"mat-option",10),a.yc(1),a.Tb()),2&e){var r=t.$implicit;a.nc("value",r.value)("disabled",5==r.value),a.Cb(1),a.Ac(" ",r.title," ")}}function k(e,t){if(1&e&&(a.Ub(0,"mat-error"),a.yc(1),a.Tb()),2&e){var r=a.gc();a.Cb(1),a.Ac(" ",r.errors.role," ")}}var v=function(){var e=function(){function e(t,r){_classCallCheck(this,e),this.dialog=t,this.formerror=r,this.form=new o.d({role:new o.b(1,[o.p.required]),email:new o.b("",[o.p.required,o.p.email])}),this.roles=n.a.roles,this.errors={role:"",email:""},this.subscriptions={}}return _createClass(e,[{key:"close",value:function(){this.dialog.close(!1)}},{key:"submit",value:function(){this.dialog.close(this.form.value)}},{key:"ngOnInit",value:function(){var e=this;this.subscriptions.form=this.form.valueChanges.subscribe((function(t){e.errors=e.formerror.validateForm(e.form,e.errors,!0)}))}},{key:"ngOnDestroy",value:function(){this.subscriptions.form.unsubscribe()}}]),e}();return e.\u0275fac=function(t){return new(t||e)(a.Ob(i.d),a.Ob(s.a))},e.\u0275cmp=a.Ib({type:e,selectors:[["app-share"]],decls:20,vars:4,consts:[["color","primary"],[1,"spacer"],["type","button","mat-icon-button","",3,"click"],[3,"formGroup","ngSubmit"],["appearance","outline"],["matInput","","type","email","name","email","placeholder","email","formControlName","email","required",""],[4,"ngIf"],["name","role","placeholder","role","formControlName","role","required",""],[3,"value","disabled",4,"ngFor","ngForOf"],["type","submit","mat-flat-button","","color","primary"],[3,"value","disabled"]],template:function(e,t){1&e&&(a.Ub(0,"mat-toolbar",0),a.Ub(1,"div",1),a.yc(2," share "),a.Tb(),a.Ub(3,"button",2),a.cc("click",(function(){return t.close()})),a.Ub(4,"mat-icon"),a.yc(5,"close"),a.Tb(),a.Tb(),a.Tb(),a.Ub(6,"form",3),a.cc("ngSubmit",(function(){return!t.form.invalid&&t.submit()})),a.Ub(7,"mat-form-field",4),a.Ub(8,"mat-label"),a.yc(9," Email "),a.Tb(),a.Pb(10,"input",5),a.xc(11,h,2,1,"mat-error",6),a.Tb(),a.Ub(12,"mat-form-field",4),a.Ub(13,"mat-label"),a.yc(14," Role "),a.Tb(),a.Ub(15,"mat-select",7),a.xc(16,g,2,3,"mat-option",8),a.Tb(),a.xc(17,k,2,1,"mat-error",6),a.Tb(),a.Ub(18,"button",9),a.yc(19," submit "),a.Tb(),a.Tb()),2&e&&(a.Cb(6),a.nc("formGroup",t.form),a.Cb(5),a.nc("ngIf",t.errors.email),a.Cb(5),a.nc("ngForOf",t.roles),a.Cb(1),a.nc("ngIf",t.errors.role))},directives:[c.a,u.a,l.a,o.q,o.j,o.e,f.c,f.g,m.a,o.a,o.i,o.c,o.o,d.l,b.a,d.k,f.b,p.k],styles:[""]}),e}()},EkoT:function(e,t,r){"use strict";r.d(t,"a",(function(){return m}));var n=r("ofXK"),o=r("NFeN"),a=r("bTqV"),i=r("0IaG"),s=r("d3UM"),c=r("/t3+"),u=r("kmnG"),l=r("3Pt+"),f=r("fXoL"),m=function(){var e=function e(){_classCallCheck(this,e)};return e.\u0275mod=f.Mb({type:e}),e.\u0275inj=f.Lb({factory:function(t){return new(t||e)},imports:[[l.f,n.c,o.b,s.b,i.c,a.b,c.b,u.e,l.n]]}),e}()},O5Os:function(e,t,r){"use strict";r.d(t,"a",(function(){return f}));var n=r("mrSG"),o=r("XNiG"),a=r("AytR"),i=r("fXoL"),s=r("WF9o"),c=r("ofXK"),u=r("FKr1");function l(e,t){if(1&e&&i.Pb(0,"img",4),2&e){var r=i.gc();i.nc("src",r.value,i.sc)}}var f=function(){var e=function(){function e(t){_classCallCheck(this,e),this.localstorage=t,this.label="icon",this.change=new o.a}return _createClass(e,[{key:"upload",value:function(){return Object(n.a)(this,void 0,void 0,regeneratorRuntime.mark((function e(){var t,r=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(t=document.createElement("input")).type="file",t.accept="image/*",t.onchange=function(e){var t=e.target.files;if(t.length>0){for(var n=new FormData,o=new XMLHttpRequest,i=0;i<t.length;i++)n.append("uploads[]",t[i],t[i].name);o.onreadystatechange=function(e){if(4==o.readyState&&200==o.status){var t=JSON.parse(o.response);r.change.next(a.a.drive+"/drive/files/get?fileId="+t.fileId+"&token="+t.token)}};var s=[a.a.drive,"/drive/files/upload?","email","=",r.localstorage.get("email"),"&","appId","=",a.a.appId].join("");o.open("POST",s,!0),o.setRequestHeader("Authorization",r.localstorage.get("token")),o.send(n)}},t.click();case 2:case"end":return e.stop()}}),e)})))}}]),e}();return e.\u0275fac=function(t){return new(t||e)(i.Ob(s.a))},e.\u0275cmp=i.Ib({type:e,selectors:[["app-image-upload"]],inputs:{value:"value",label:"label",required:"required"},decls:7,vars:4,consts:[[1,"image-upload",3,"click"],["text-uppercase",""],["alt","image","draggable","false",3,"src",4,"ngIf"],["matRipple","",1,"ripple"],["alt","image","draggable","false",3,"src"]],template:function(e,t){1&e&&(i.Ub(0,"div",0),i.cc("click",(function(){return t.upload()})),i.Ub(1,"label",1),i.yc(2),i.Ub(3,"span"),i.yc(4,"*"),i.Tb(),i.Tb(),i.xc(5,l,1,1,"img",2),i.Pb(6,"div",3),i.Tb()),2&e&&(i.Fb("required",t.required),i.Cb(2),i.Ac(" ",t.label," "),i.Cb(3),i.nc("ngIf",t.value&&!t.loading))},directives:[c.l,u.p],styles:[".image-upload[_ngcontent-%COMP%]{width:150px;height:150px;border:1px solid #e0e0e0;display:flex;position:relative;align-items:center;margin:auto auto 15px;border-radius:4px;justify-content:center}.image-upload[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:140px;max-height:140px}.image-upload[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{top:-6px;left:5px;color:#616161;padding:0 5px;position:absolute;font-size:11px;line-height:11px;background-color:#fafafa}.image-upload[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{display:none}.image-upload[_ngcontent-%COMP%]   .ripple[_ngcontent-%COMP%]{top:0;left:0;right:0;bottom:0;z-index:1;position:absolute}.image-upload[_ngcontent-%COMP%]:hover{border:2px solid #000;margin-top:-1px;margin-bottom:14px}.image-upload[_ngcontent-%COMP%]:hover   label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#2196f3!important}.image-upload.required[_ngcontent-%COMP%]{color:#f44336!important;border:2px solid #f44336;margin-top:-1px;margin-bottom:14px}"]}),e}()},Rxhi:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r("ofXK"),o=r("FKr1"),a=r("fXoL"),i=function(){var e=function e(){_classCallCheck(this,e)};return e.\u0275mod=a.Mb({type:e}),e.\u0275inj=a.Lb({factory:function(t){return new(t||e)},imports:[[n.c,o.q]]}),e}()},V6vf:function(e,t,r){"use strict";r.d(t,"a",(function(){return p}));var n=r("3Pt+"),o=r("fXoL"),a=r("0IaG"),i=r("dWDE"),s=r("/t3+"),c=r("bTqV"),u=r("NFeN"),l=r("kmnG"),f=r("d3UM"),m=r("FKr1"),d=r("ofXK");function b(e,t){if(1&e&&(o.Ub(0,"mat-error"),o.yc(1),o.Tb()),2&e){var r=o.gc();o.Cb(1),o.Ac(" ",r.errors.confirm," ")}}var p=function(){var e=function(){function e(t,r){_classCallCheck(this,e),this.dialog=t,this.formerror=r,this.form=new n.d({confirm:new n.b(!1,[n.p.required])}),this.errors={confirm:""},this.subscriptions={}}return _createClass(e,[{key:"close",value:function(){this.dialog.close(!1)}},{key:"submit",value:function(){this.dialog.close(this.form.value.confirm)}},{key:"ngOnInit",value:function(){var e=this;this.subscriptions.form=this.form.valueChanges.subscribe((function(t){e.errors=e.formerror.validateForm(e.form,e.errors,!0)}))}},{key:"ngOnDestroy",value:function(){this.subscriptions.form.unsubscribe()}}]),e}();return e.\u0275fac=function(t){return new(t||e)(o.Ob(a.d),o.Ob(i.a))},e.\u0275cmp=o.Ib({type:e,selectors:[["app-unsubscribe"]],decls:18,vars:5,consts:[["color","primary"],[1,"spacer"],["type","button","mat-icon-button","",3,"click"],[3,"formGroup","ngSubmit"],["appearance","outline"],["name","confirm","placeholder","confirm","formControlName","confirm","required",""],[3,"value"],[4,"ngIf"],["type","submit","mat-flat-button","","color","primary",3,"disabled"]],template:function(e,t){1&e&&(o.Ub(0,"mat-toolbar",0),o.Ub(1,"div",1),o.yc(2," unsubscribe "),o.Tb(),o.Ub(3,"button",2),o.cc("click",(function(){return t.close()})),o.Ub(4,"mat-icon"),o.yc(5,"close"),o.Tb(),o.Tb(),o.Tb(),o.Ub(6,"form",3),o.cc("ngSubmit",(function(){return!t.form.invalid&&t.submit()})),o.Ub(7,"mat-form-field",4),o.Ub(8,"mat-label"),o.yc(9," Confirm Unsubscribe "),o.Tb(),o.Ub(10,"mat-select",5),o.Ub(11,"mat-option",6),o.yc(12," Unsubscribe Now "),o.Tb(),o.Ub(13,"mat-option",6),o.yc(14," Don't Unsubscribe "),o.Tb(),o.Tb(),o.xc(15,b,2,1,"mat-error",7),o.Tb(),o.Ub(16,"button",8),o.yc(17," submit "),o.Tb(),o.Tb()),2&e&&(o.Cb(6),o.nc("formGroup",t.form),o.Cb(5),o.nc("value",!0),o.Cb(2),o.nc("value",!1),o.Cb(2),o.nc("ngIf",t.errors.confirm),o.Cb(1),o.nc("disabled",!t.form.value.confirm))},directives:[s.a,c.a,u.a,n.q,n.j,n.e,l.c,l.g,f.a,n.i,n.c,n.o,m.k,d.l,l.b],styles:[""]}),e}()},Xa2L:function(e,t,r){"use strict";r.d(t,"a",(function(){return d})),r.d(t,"b",(function(){return b}));var n=r("fXoL"),o=r("ofXK"),a=r("FKr1"),i=r("8LU1"),s=r("nLfN"),c=r("R1ws");function u(e,t){if(1&e&&(n.fc(),n.Pb(0,"circle",3)),2&e){var r=n.gc();n.wc("animation-name","mat-progress-spinner-stroke-rotate-"+r.diameter)("stroke-dashoffset",r._strokeDashOffset,"px")("stroke-dasharray",r._strokeCircumference,"px")("stroke-width",r._circleStrokeWidth,"%"),n.Db("r",r._circleRadius)}}function l(e,t){if(1&e&&(n.fc(),n.Pb(0,"circle",3)),2&e){var r=n.gc();n.wc("stroke-dashoffset",r._strokeDashOffset,"px")("stroke-dasharray",r._strokeCircumference,"px")("stroke-width",r._circleStrokeWidth,"%"),n.Db("r",r._circleRadius)}}var f=Object(a.u)((function e(t){_classCallCheck(this,e),this._elementRef=t}),"primary"),m=new n.r("mat-progress-spinner-default-options",{providedIn:"root",factory:function(){return{diameter:100}}}),d=function(){var e=function(e){_inherits(r,e);var t=_createSuper(r);function r(e,n,o,a,i){var s;_classCallCheck(this,r),(s=t.call(this,e))._elementRef=e,s._document=o,s._diameter=100,s._value=0,s._fallbackAnimation=!1,s.mode="determinate";var c=r._diameters;return c.has(o.head)||c.set(o.head,new Set([100])),s._fallbackAnimation=n.EDGE||n.TRIDENT,s._noopAnimations="NoopAnimations"===a&&!!i&&!i._forceAnimations,i&&(i.diameter&&(s.diameter=i.diameter),i.strokeWidth&&(s.strokeWidth=i.strokeWidth)),s}return _createClass(r,[{key:"ngOnInit",value:function(){var e=this._elementRef.nativeElement;this._styleRoot=Object(s.c)(e)||this._document.head,this._attachStyleNode(),e.classList.add("mat-progress-spinner-indeterminate".concat(this._fallbackAnimation?"-fallback":"","-animation"))}},{key:"_attachStyleNode",value:function(){var e=this._styleRoot,t=this._diameter,n=r._diameters,o=n.get(e);if(!o||!o.has(t)){var a=this._document.createElement("style");a.setAttribute("mat-spinner-animation",t+""),a.textContent=this._getAnimationText(),e.appendChild(a),o||(o=new Set,n.set(e,o)),o.add(t)}}},{key:"_getAnimationText",value:function(){return"\n @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {\n    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }\n    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }\n    12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }\n    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }\n\n    25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }\n    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }\n    37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }\n    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }\n\n    50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }\n    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }\n    62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }\n    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }\n\n    75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }\n    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }\n    87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }\n    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }\n  }\n".replace(/START_VALUE/g,"".concat(.95*this._strokeCircumference)).replace(/END_VALUE/g,"".concat(.2*this._strokeCircumference)).replace(/DIAMETER/g,"".concat(this.diameter))}},{key:"diameter",get:function(){return this._diameter},set:function(e){this._diameter=Object(i.f)(e),!this._fallbackAnimation&&this._styleRoot&&this._attachStyleNode()}},{key:"strokeWidth",get:function(){return this._strokeWidth||this.diameter/10},set:function(e){this._strokeWidth=Object(i.f)(e)}},{key:"value",get:function(){return"determinate"===this.mode?this._value:0},set:function(e){this._value=Math.max(0,Math.min(100,Object(i.f)(e)))}},{key:"_circleRadius",get:function(){return(this.diameter-10)/2}},{key:"_viewBox",get:function(){var e=2*this._circleRadius+this.strokeWidth;return"0 0 ".concat(e," ").concat(e)}},{key:"_strokeCircumference",get:function(){return 2*Math.PI*this._circleRadius}},{key:"_strokeDashOffset",get:function(){return"determinate"===this.mode?this._strokeCircumference*(100-this._value)/100:this._fallbackAnimation&&"indeterminate"===this.mode?.2*this._strokeCircumference:null}},{key:"_circleStrokeWidth",get:function(){return this.strokeWidth/this.diameter*100}}]),r}(f);return e.\u0275fac=function(t){return new(t||e)(n.Ob(n.l),n.Ob(s.a),n.Ob(o.d,8),n.Ob(c.a,8),n.Ob(m))},e.\u0275cmp=n.Ib({type:e,selectors:[["mat-progress-spinner"]],hostAttrs:["role","progressbar",1,"mat-progress-spinner"],hostVars:10,hostBindings:function(e,t){2&e&&(n.Db("aria-valuemin","determinate"===t.mode?0:null)("aria-valuemax","determinate"===t.mode?100:null)("aria-valuenow","determinate"===t.mode?t.value:null)("mode",t.mode),n.wc("width",t.diameter,"px")("height",t.diameter,"px"),n.Fb("_mat-animation-noopable",t._noopAnimations))},inputs:{color:"color",mode:"mode",diameter:"diameter",strokeWidth:"strokeWidth",value:"value"},exportAs:["matProgressSpinner"],features:[n.zb],decls:3,vars:8,consts:[["preserveAspectRatio","xMidYMid meet","focusable","false",3,"ngSwitch"],["cx","50%","cy","50%",3,"animation-name","stroke-dashoffset","stroke-dasharray","stroke-width",4,"ngSwitchCase"],["cx","50%","cy","50%",3,"stroke-dashoffset","stroke-dasharray","stroke-width",4,"ngSwitchCase"],["cx","50%","cy","50%"]],template:function(e,t){1&e&&(n.fc(),n.Ub(0,"svg",0),n.xc(1,u,1,9,"circle",1),n.xc(2,l,1,7,"circle",2),n.Tb()),2&e&&(n.wc("width",t.diameter,"px")("height",t.diameter,"px"),n.nc("ngSwitch","indeterminate"===t.mode),n.Db("viewBox",t._viewBox),n.Cb(1),n.nc("ngSwitchCase",!0),n.Cb(1),n.nc("ngSwitchCase",!1))},directives:[o.n,o.o],styles:[".mat-progress-spinner{display:block;position:relative}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:mat-progress-spinner-linear-rotate 2000ms linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4000ms;animation-timing-function:cubic-bezier(0.35, 0, 0.25, 1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:mat-progress-spinner-stroke-rotate-fallback 10000ms cubic-bezier(0.87, 0.03, 0.33, 1) infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.606171575px;transform:rotate(0)}12.5%{stroke-dashoffset:56.5486677px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.606171575px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.5486677px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.606171575px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.5486677px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.606171575px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.5486677px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0deg)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}\n"],encapsulation:2,changeDetection:0}),e._diameters=new WeakMap,e}(),b=function(){var e=function e(){_classCallCheck(this,e)};return e.\u0275mod=n.Mb({type:e}),e.\u0275inj=n.Lb({factory:function(t){return new(t||e)},imports:[[a.g,o.c],a.g]}),e}()},eui8:function(e,t,r){"use strict";r.d(t,"a",(function(){return T}));var n=r("mrSG"),o=r("AytR"),a=r("+0xr"),i=r("0IaG"),s=r("fXoL"),c=r("9ZKQ"),u=r("WF9o"),l=r("/t3+"),f=r("bTqV"),m=r("NFeN"),d=r("d3UM"),b=r("ofXK"),p=r("FKr1");function h(e,t){1&e&&(s.Ub(0,"th",11),s.yc(1," Email "),s.Tb())}function g(e,t){if(1&e&&(s.Ub(0,"td",12),s.yc(1),s.Tb()),2&e){var r=t.$implicit;s.Cb(1),s.Ac(" ",r.email," ")}}function k(e,t){1&e&&(s.Ub(0,"th",11),s.yc(1," Role "),s.Tb())}function v(e,t){if(1&e&&(s.Ub(0,"mat-option",15),s.yc(1),s.Tb()),2&e){var r=t.$implicit;s.nc("value",r.value)("disabled",r.value<r||5==r.value),s.Cb(1),s.Ac(" ",r.title," ")}}function y(e,t){if(1&e){var r=s.Vb();s.Ub(0,"td",12),s.Ub(1,"mat-select",13),s.cc("selectionChange",(function(e){s.rc(r);var n=t.$implicit;return s.gc().updatesubscriber(n.email,e)})),s.xc(2,v,2,3,"mat-option",14),s.Tb(),s.Tb()}if(2&e){var n=t.$implicit,o=s.gc();s.Cb(1),s.nc("value",n.role)("disabled",o.email==n.email||o.role<4||o.role<=n.role),s.Cb(1),s.nc("ngForOf",o.roles)}}function _(e,t){1&e&&s.Pb(0,"th",11)}function C(e,t){if(1&e){var r=s.Vb();s.Ub(0,"td",12),s.Ub(1,"button",16),s.cc("click",(function(){s.rc(r);var e=t.$implicit;return s.gc().unsubscribe(e.email)})),s.Ub(2,"mat-icon"),s.yc(3,"remove"),s.Tb(),s.Tb(),s.Tb()}if(2&e){var n=t.$implicit,o=s.gc();s.Cb(1),s.nc("disabled",o.email==n.email||o.role<=n.role||o.role<4||5==n.role)}}function x(e,t){1&e&&s.Pb(0,"tr",17)}function w(e,t){1&e&&s.Pb(0,"tr",18)}var T=function(){var e=function(){function e(t,r,n,i){_classCallCheck(this,e),this.toast=t,this.dialog=r,this.config=n,this.localstorage=i,this.role=0,this.email=this.localstorage.get("email"),this.roles=o.a.roles,this.users=new a.k,this.columns=["email","role","remove"]}return _createClass(e,[{key:"close",value:function(){this.dialog.close()}},{key:"get",value:function(){return Object(n.a)(this,void 0,void 0,regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.loading=!0,t={filter:["role","users"]},e.t0=this.config.type,e.next="app"===e.t0?5:"token"===e.t0?7:8;break;case 5:return t.appId=this.config.id,e.abrupt("break",8);case 7:t.tokenId=this.config.id;case 8:return e.next=10,this.config.service.get(t);case 10:r=e.sent,this.loading=!1,r.ok?(this.role=r.result.role,this.role<4?(this.close(),this.toast.error("insufficient role")):(this.role=r.result.role,this.users.data=r.result.users)):this.toast.error("issue loading users");case 12:case"end":return e.stop()}}),e,this)})))}},{key:"unsubscribe",value:function(e){return Object(n.a)(this,void 0,void 0,regeneratorRuntime.mark((function t(){var r,n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.loading=!0,r={email:e},t.t0=this.config.type,t.next="app"===t.t0?5:"token"===t.t0?7:8;break;case 5:return r.appId=this.config.id,t.abrupt("break",8);case 7:r.tokenId=this.config.id;case 8:return t.next=10,this.config.service.unsubscribe(r);case 10:if(n=t.sent,this.loading=!1,!n.ok){t.next=23;break}o=0;case 13:if(!(o<this.users.data.length)){t.next=20;break}if(this.users.data[o].email!=e){t.next=17;break}return this.users.data.splice(o,1),t.abrupt("break",20);case 17:o++,t.next=13;break;case 20:this.users.data=JSON.parse(JSON.stringify(this.users.data)),this.toast.success("user was unsubscribed"),t.next=24;break;case 23:this.toast.error("issue unsubscribing user");case 24:case"end":return t.stop()}}),t,this)})))}},{key:"updatesubscriber",value:function(e,t){return Object(n.a)(this,void 0,void 0,regeneratorRuntime.mark((function r(){var n,o;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:this.loading=!0,n={role:t.value,email:e},r.t0=this.config.type,r.next="app"===r.t0?5:"token"===r.t0?7:8;break;case 5:return n.appId=this.config.id,r.abrupt("break",8);case 7:n.tokenId=this.config.id;case 8:return r.next=10,this.config.service.updatesubscriber(n);case 10:o=r.sent,this.loading=!1,o.ok?this.toast.success("user role updated"):this.toast.error("issue updating user role");case 12:case"end":return r.stop()}}),r,this)})))}},{key:"ngOnInit",value:function(){this.get()}}]),e}();return e.\u0275fac=function(t){return new(t||e)(s.Ob(c.a),s.Ob(i.d),s.Ob(i.a),s.Ob(u.a))},e.\u0275cmp=s.Ib({type:e,selectors:[["app-subscribers"]],decls:18,vars:4,consts:[["color","primary"],[1,"spacer"],["type","button","mat-icon-button","",3,"click"],["mat-table","",3,"dataSource"],["matColumnDef","email"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","role"],["matColumnDef","remove"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell",""],["mat-cell",""],[3,"value","disabled","selectionChange"],[3,"value","disabled",4,"ngFor","ngForOf"],[3,"value","disabled"],["type","button","color","warn","mat-icon-button","",3,"disabled","click"],["mat-header-row",""],["mat-row",""]],template:function(e,t){1&e&&(s.Ub(0,"mat-toolbar",0),s.Ub(1,"div",1),s.yc(2," subscribers "),s.Tb(),s.Ub(3,"button",2),s.cc("click",(function(){return t.close()})),s.Ub(4,"mat-icon"),s.yc(5,"close"),s.Tb(),s.Tb(),s.Tb(),s.Ub(6,"table",3),s.Sb(7,4),s.xc(8,h,2,0,"th",5),s.xc(9,g,2,1,"td",6),s.Rb(),s.Sb(10,7),s.xc(11,k,2,0,"th",5),s.xc(12,y,3,3,"td",6),s.Rb(),s.Sb(13,8),s.xc(14,_,1,0,"th",5),s.xc(15,C,4,1,"td",6),s.Rb(),s.xc(16,x,1,0,"tr",9),s.xc(17,w,1,0,"tr",10),s.Tb()),2&e&&(s.Cb(6),s.nc("dataSource",t.users),s.Cb(10),s.nc("matHeaderRowDef",t.columns)("matHeaderRowDefSticky",!0),s.Cb(1),s.nc("matRowDefColumns",t.columns))},directives:[l.a,f.a,m.a,a.j,a.c,a.e,a.b,a.g,a.i,a.d,a.a,d.a,b.k,p.k,a.f,a.h],styles:["table[_ngcontent-%COMP%]{width:100%}.mat-column-role[_ngcontent-%COMP%]{flex:1 150px;width:150px}.mat-column-remove[_ngcontent-%COMP%]{flex:1 40px;width:40px}.mat-select-disabled[_ngcontent-%COMP%]{background:transparent!important}"]}),e}()},roMP:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r("fXoL"),o=function(){var e=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"transform",value:function(e,t,r){return e.sort((function(e,n){return e[t]<n[t]?r?1:-1:e[t]>n[t]?r?-1:1:0}))}}]),e}();return e.\u0275fac=function(t){return new(t||e)},e.\u0275pipe=n.Nb({name:"orderBy",type:e,pure:!0}),e}()}}]);