(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"05Yv":function(t,e,i){"use strict";i.r(e),i.d(e,"AppsModule",(function(){return Pt}));var s=i("mrSG"),a=i("Ovx2"),n=i("Dh3D"),r=i("+0xr"),o=i("fXoL"),c=i("9ZKQ"),h=i("L7HW"),l=i("u0tM"),d=i("tyNb"),p=i("BhS5"),u=i("swrf"),b=i("xyCQ"),m=i("WF9o"),g=i("znSr"),f=i("MutI"),_=i("ofXK"),v=i("bTqV"),C=i("NFeN"),y=i("FKr1"),S=i("kmnG");function w(t,e){1&t&&(o.Sb(0,"th",11),o.Bc(1," Icon "),o.Rb())}function x(t,e){if(1&t&&(o.Sb(0,"td",12),o.Nb(1,"img",13),o.Rb()),2&t){const t=e.$implicit;o.Ab(1),o.kc("src",t.icon,o.sc)("alt",t.name)}}function k(t,e){1&t&&(o.Sb(0,"th",14),o.Bc(1," Name "),o.Rb())}function I(t,e){if(1&t&&(o.Sb(0,"td",12),o.Bc(1),o.Rb()),2&t){const t=e.$implicit;o.Ab(1),o.Dc(" ",t.name," ")}}function O(t,e){1&t&&o.Nb(0,"th",11)}function R(t,e){if(1&t){const t=o.Tb();o.Sb(0,"td",12),o.Sb(1,"button",15),o.ac("click",(function(){o.rc(t);const i=e.$implicit;return o.ec().options(i)})),o.Sb(2,"mat-icon"),o.Bc(3," more_vert "),o.Rb(),o.Rb(),o.Rb()}}function M(t,e){1&t&&o.Nb(0,"tr",16)}function A(t,e){1&t&&o.Nb(0,"tr",17)}function B(t,e){if(1&t){const t=o.Tb();o.Sb(0,"mat-list-item",18),o.ac("click",(function(){o.rc(t);const i=e.$implicit;return o.ec().options(i)})),o.Nb(1,"img",19),o.Sb(2,"mat-label"),o.Sb(3,"h3"),o.Bc(4),o.Rb(),o.Rb(),o.Rb()}if(2&t){const t=e.$implicit;o.Ab(1),o.kc("src",t.icon,o.sc)("alt",t.name),o.Ab(3),o.Dc(" ",t.name," ")}}let D=(()=>{class t{constructor(t,e,i,s,a,n,o,c){this.toast=t,this.config=e,this.sheet=i,this.router=s,this.buttons=a,this.confirm=n,this.service=o,this.localstorage=c,this.apps=new r.k,this.columns=["icon","name","options"],this.subscriptions={}}list(){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.service.list({filter:["icon","role","name","appId"]});this.apps.data=t.ok?t.result.map(t=>new a.a(t)):[],this.loading=!1}))}options(t){return Object(s.a)(this,void 0,void 0,(function*(){this.sheet.show({role:t.role,title:t.name,options:[{icon:"edit",title:"Edit",handler:()=>Object(s.a)(this,void 0,void 0,(function*(){this.router.navigate(["/apps","editor"],{queryParams:{mode:"update",appId:t.appId}})})),disabled:[0,1]},{icon:"content_copy",title:"Copy",handler:()=>Object(s.a)(this,void 0,void 0,(function*(){this.router.navigate(["/apps","editor"],{queryParams:{mode:"copy",appId:t.appId}})})),disabled:[0,1]},{icon:"people",title:"Subscribers",handler:()=>Object(s.a)(this,void 0,void 0,(function*(){this.router.navigate(["/subscribers"],{queryParams:{id:t.appId,type:"app"}})})),disabled:[0,1,2,3]},{icon:"remove",title:"Unubscribe",danger:!0,handler:()=>Object(s.a)(this,void 0,void 0,(function*(){this.confirm.show({message:"Are you sure you want to unsubscribe from "+t.name+"?",handler:()=>Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const e=yield this.service.unsubscribe({appId:t.appId,email:this.localstorage.get("email")});if(e.ok){for(let e=0;e<this.apps.data.length;e++)if(this.apps.data[e].appId==t.appId){this.apps.data.splice(e,1),this.toast.show("You were unsubscribed!");break}this.apps.data=JSON.parse(JSON.stringify(this.apps.data))}else this.toast.show(e.error.message);this.loading=!1}))})})),disabled:[5]},{icon:"delete",title:"Delete",danger:!0,handler:()=>Object(s.a)(this,void 0,void 0,(function*(){this.confirm.show({message:"Are you sure you want to delete "+t.name+"?",handler:()=>Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const e=yield this.service.delete({appId:t.appId});if(e.ok){for(let e=0;e<this.apps.data.length;e++)if(this.apps.data[e].appId==t.appId){this.apps.data.splice(e,1),this.toast.show("App was removed!");break}this.apps.data=JSON.parse(JSON.stringify(this.apps.data))}else this.toast.show(e.error.message);this.loading=!1}))})})),disabled:[0,1,2,3,4]}]})}))}ngOnInit(){this.buttons.show("add"),this.buttons.hide("close"),this.buttons.hide("filter"),this.buttons.hide("search"),this.apps.sort=this.sort,this.apps.sort.active="name",this.apps.sort.direction="asc",this.subscriptions.add=this.buttons.add.click.subscribe(t=>{this.router.navigate(["/apps","editor"],{queryParams:{mode:"add"}})}),this.subscriptions.loaded=this.config.loaded.subscribe(t=>{t&&this.list()})}ngOnDestroy(){this.subscriptions.add.unsubscribe(),this.subscriptions.loaded.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(o.Mb(c.a),o.Mb(h.a),o.Mb(l.a),o.Mb(d.b),o.Mb(p.a),o.Mb(u.a),o.Mb(b.a),o.Mb(m.a))},t.\u0275cmp=o.Gb({type:t,selectors:[["apps-page"]],viewQuery:function(t,e){var i;1&t&&o.vc(n.a,!0),2&t&&o.oc(i=o.bc())&&(e.sort=i.first)},decls:14,vars:5,consts:[["mat-table","","fxShow","","fxHide.xs","true","matSort","",3,"dataSource"],["matColumnDef","icon"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["matColumnDef","options"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",4,"matRowDef","matRowDefColumns"],["fxHide","","fxShow.xs","true"],["lines","full","matRipple","",3,"click",4,"ngFor","ngForOf"],["mat-header-cell",""],["mat-cell",""],["width","40","height","40","draggable","false",3,"src","alt"],["mat-header-cell","","mat-sort-header",""],["mat-icon-button","",3,"click"],["mat-header-row",""],["mat-row",""],["lines","full","matRipple","",3,"click"],["slot","start","width","40","height","40","draggable","false",3,"src","alt"]],template:function(t,e){1&t&&(o.Sb(0,"table",0),o.Qb(1,1),o.zc(2,w,2,0,"th",2),o.zc(3,x,2,2,"td",3),o.Pb(),o.Qb(4,4),o.zc(5,k,2,0,"th",5),o.zc(6,I,2,1,"td",3),o.Pb(),o.Qb(7,6),o.zc(8,O,1,0,"th",2),o.zc(9,R,4,0,"td",3),o.Pb(),o.zc(10,M,1,0,"tr",7),o.zc(11,A,1,0,"tr",8),o.Rb(),o.Sb(12,"mat-list",9),o.zc(13,B,5,3,"mat-list-item",10),o.Rb()),2&t&&(o.kc("dataSource",e.apps),o.Ab(10),o.kc("matHeaderRowDef",e.columns)("matHeaderRowDefSticky",!0),o.Ab(1),o.kc("matRowDefColumns",e.columns),o.Ab(2),o.kc("ngForOf",e.apps.data))},directives:[r.j,g.a,n.a,r.c,r.e,r.b,r.g,r.i,f.a,_.k,r.d,r.a,n.b,v.a,C.a,r.f,r.h,f.b,y.o,S.f],styles:[".mat-column-icon[_ngcontent-%COMP%]{width:60px}.mat-column-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:4px}.mat-column-options[_ngcontent-%COMP%]{width:40px;padding-right:16px!important}mat-list[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:row}"]}),t})();var F=i("FtGj"),E=i("3Pt+"),j=i("a6VE"),z=i("4jEk"),q=i("in+p"),L=i("qFsG"),N=i("d3UM"),T=i("WJ5W"),V=i("8LU1"),P=i("R1ws"),K=i("XNiG"),H=i("VRyK"),G=i("IzEk"),W=i("1G5W"),J=i("JX91"),Q=i("u47x"),Z=i("0EQZ"),U=i("nLfN"),$=i("cH1L");const X=["*"],Y=new o.r("MatChipRemove"),tt=new o.r("MatChipAvatar"),et=new o.r("MatChipTrailingIcon");class it{constructor(t){this._elementRef=t}}const st=Object(y.y)(Object(y.t)(Object(y.u)(it),"primary"),-1);let at=(()=>{class t extends st{constructor(t,e,i,s,a,n,r,c){super(t),this._elementRef=t,this._ngZone=e,this._changeDetectorRef=n,this._hasFocus=!1,this.chipListSelectable=!0,this._chipListMultiple=!1,this._chipListDisabled=!1,this._selected=!1,this._selectable=!0,this._disabled=!1,this._removable=!0,this._onFocus=new K.a,this._onBlur=new K.a,this.selectionChange=new o.o,this.destroyed=new o.o,this.removed=new o.o,this._addHostClassName(),this._chipRippleTarget=(c||document).createElement("div"),this._chipRippleTarget.classList.add("mat-chip-ripple"),this._elementRef.nativeElement.appendChild(this._chipRippleTarget),this._chipRipple=new y.q(this,e,this._chipRippleTarget,i),this._chipRipple.setupTriggerEvents(t),this.rippleConfig=s||{},this._animationsDisabled="NoopAnimations"===a,this.tabIndex=null!=r&&parseInt(r)||-1}get rippleDisabled(){return this.disabled||this.disableRipple||!!this.rippleConfig.disabled}get selected(){return this._selected}set selected(t){const e=Object(V.c)(t);e!==this._selected&&(this._selected=e,this._dispatchSelectionChange())}get value(){return void 0!==this._value?this._value:this._elementRef.nativeElement.textContent}set value(t){this._value=t}get selectable(){return this._selectable&&this.chipListSelectable}set selectable(t){this._selectable=Object(V.c)(t)}get disabled(){return this._chipListDisabled||this._disabled}set disabled(t){this._disabled=Object(V.c)(t)}get removable(){return this._removable}set removable(t){this._removable=Object(V.c)(t)}get ariaSelected(){return this.selectable&&(this._chipListMultiple||this.selected)?this.selected.toString():null}_addHostClassName(){const t="mat-basic-chip",e=this._elementRef.nativeElement;e.hasAttribute(t)||e.tagName.toLowerCase()===t?e.classList.add(t):e.classList.add("mat-standard-chip")}ngOnDestroy(){this.destroyed.emit({chip:this}),this._chipRipple._removeTriggerEvents()}select(){this._selected||(this._selected=!0,this._dispatchSelectionChange(),this._markForCheck())}deselect(){this._selected&&(this._selected=!1,this._dispatchSelectionChange(),this._markForCheck())}selectViaInteraction(){this._selected||(this._selected=!0,this._dispatchSelectionChange(!0),this._markForCheck())}toggleSelected(t=!1){return this._selected=!this.selected,this._dispatchSelectionChange(t),this._markForCheck(),this.selected}focus(){this._hasFocus||(this._elementRef.nativeElement.focus(),this._onFocus.next({chip:this})),this._hasFocus=!0}remove(){this.removable&&this.removed.emit({chip:this})}_handleClick(t){this.disabled?t.preventDefault():t.stopPropagation()}_handleKeydown(t){if(!this.disabled)switch(t.keyCode){case F.d:case F.b:this.remove(),t.preventDefault();break;case F.m:this.selectable&&this.toggleSelected(!0),t.preventDefault()}}_blur(){this._ngZone.onStable.pipe(Object(G.a)(1)).subscribe(()=>{this._ngZone.run(()=>{this._hasFocus=!1,this._onBlur.next({chip:this})})})}_dispatchSelectionChange(t=!1){this.selectionChange.emit({source:this,isUserInput:t,selected:this._selected})}_markForCheck(){this._changeDetectorRef&&this._changeDetectorRef.markForCheck()}}return t.\u0275fac=function(e){return new(e||t)(o.Mb(o.l),o.Mb(o.A),o.Mb(U.a),o.Mb(y.g,8),o.Mb(P.a,8),o.Mb(o.h),o.Xb("tabindex"),o.Mb(_.d,8))},t.\u0275dir=o.Hb({type:t,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(t,e,i){var s;1&t&&(o.Fb(i,tt,!0),o.Fb(i,et,!0),o.Fb(i,Y,!0)),2&t&&(o.oc(s=o.bc())&&(e.avatar=s.first),o.oc(s=o.bc())&&(e.trailingIcon=s.first),o.oc(s=o.bc())&&(e.removeIcon=s.first))},hostAttrs:["role","option",1,"mat-chip","mat-focus-indicator"],hostVars:14,hostBindings:function(t,e){1&t&&o.ac("click",(function(t){return e._handleClick(t)}))("keydown",(function(t){return e._handleKeydown(t)}))("focus",(function(){return e.focus()}))("blur",(function(){return e._blur()})),2&t&&(o.Bb("tabindex",e.disabled?null:e.tabIndex)("disabled",e.disabled||null)("aria-disabled",e.disabled.toString())("aria-selected",e.ariaSelected),o.Eb("mat-chip-selected",e.selected)("mat-chip-with-avatar",e.avatar)("mat-chip-with-trailing-icon",e.trailingIcon||e.removeIcon)("mat-chip-disabled",e.disabled)("_mat-animation-noopable",e._animationsDisabled))},inputs:{color:"color",disableRipple:"disableRipple",tabIndex:"tabIndex",selected:"selected",value:"value",selectable:"selectable",disabled:"disabled",removable:"removable"},outputs:{selectionChange:"selectionChange",destroyed:"destroyed",removed:"removed"},exportAs:["matChip"],features:[o.xb]}),t})(),nt=(()=>{class t{constructor(t,e){this._parentChip=t,e&&"BUTTON"===e.nativeElement.nodeName&&e.nativeElement.setAttribute("type","button")}_handleClick(t){const e=this._parentChip;e.removable&&!e.disabled&&e.remove(),t.stopPropagation()}}return t.\u0275fac=function(e){return new(e||t)(o.Mb(at),o.Mb(o.l))},t.\u0275dir=o.Hb({type:t,selectors:[["","matChipRemove",""]],hostAttrs:[1,"mat-chip-remove","mat-chip-trailing-icon"],hostBindings:function(t,e){1&t&&o.ac("click",(function(t){return e._handleClick(t)}))},features:[o.zb([{provide:Y,useExisting:t}])]}),t})();const rt=new o.r("mat-chips-default-options");class ot{constructor(t,e,i,s){this._defaultErrorStateMatcher=t,this._parentForm=e,this._parentFormGroup=i,this.ngControl=s}}const ct=Object(y.w)(ot);let ht=0;class lt{constructor(t,e){this.source=t,this.value=e}}let dt=(()=>{class t extends ct{constructor(t,e,i,s,a,n,r){super(n,s,a,r),this._elementRef=t,this._changeDetectorRef=e,this._dir=i,this.ngControl=r,this.controlType="mat-chip-list",this._lastDestroyedChipIndex=null,this._destroyed=new K.a,this._uid="mat-chip-list-"+ht++,this._tabIndex=0,this._userTabIndex=null,this._onTouched=()=>{},this._onChange=()=>{},this._multiple=!1,this._compareWith=(t,e)=>t===e,this._required=!1,this._disabled=!1,this.ariaOrientation="horizontal",this._selectable=!0,this.change=new o.o,this.valueChange=new o.o,this.ngControl&&(this.ngControl.valueAccessor=this)}get selected(){return this.multiple?this._selectionModel.selected:this._selectionModel.selected[0]}get role(){return this.empty?null:"listbox"}get multiple(){return this._multiple}set multiple(t){this._multiple=Object(V.c)(t),this._syncChipsState()}get compareWith(){return this._compareWith}set compareWith(t){this._compareWith=t,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(t){this.writeValue(t),this._value=t}get id(){return this._chipInput?this._chipInput.id:this._uid}get required(){return this._required}set required(t){this._required=Object(V.c)(t),this.stateChanges.next()}get placeholder(){return this._chipInput?this._chipInput.placeholder:this._placeholder}set placeholder(t){this._placeholder=t,this.stateChanges.next()}get focused(){return this._chipInput&&this._chipInput.focused||this._hasFocusedChip()}get empty(){return(!this._chipInput||this._chipInput.empty)&&(!this.chips||0===this.chips.length)}get shouldLabelFloat(){return!this.empty||this.focused}get disabled(){return this.ngControl?!!this.ngControl.disabled:this._disabled}set disabled(t){this._disabled=Object(V.c)(t),this._syncChipsState()}get selectable(){return this._selectable}set selectable(t){this._selectable=Object(V.c)(t),this.chips&&this.chips.forEach(t=>t.chipListSelectable=this._selectable)}set tabIndex(t){this._userTabIndex=t,this._tabIndex=t}get chipSelectionChanges(){return Object(H.a)(...this.chips.map(t=>t.selectionChange))}get chipFocusChanges(){return Object(H.a)(...this.chips.map(t=>t._onFocus))}get chipBlurChanges(){return Object(H.a)(...this.chips.map(t=>t._onBlur))}get chipRemoveChanges(){return Object(H.a)(...this.chips.map(t=>t.destroyed))}ngAfterContentInit(){this._keyManager=new Q.e(this.chips).withWrap().withVerticalOrientation().withHomeAndEnd().withHorizontalOrientation(this._dir?this._dir.value:"ltr"),this._dir&&this._dir.change.pipe(Object(W.a)(this._destroyed)).subscribe(t=>this._keyManager.withHorizontalOrientation(t)),this._keyManager.tabOut.pipe(Object(W.a)(this._destroyed)).subscribe(()=>{this._allowFocusEscape()}),this.chips.changes.pipe(Object(J.a)(null),Object(W.a)(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>{this._syncChipsState()}),this._resetChips(),this._initializeSelection(),this._updateTabIndex(),this._updateFocusForDestroyedChips(),this.stateChanges.next()})}ngOnInit(){this._selectionModel=new Z.c(this.multiple,void 0,!1),this.stateChanges.next()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==this._disabled&&(this.disabled=!!this.ngControl.disabled))}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.stateChanges.complete(),this._dropSubscriptions()}registerInput(t){this._chipInput=t,this._elementRef.nativeElement.setAttribute("data-mat-chip-input",t.id)}setDescribedByIds(t){this._ariaDescribedby=t.join(" ")}writeValue(t){this.chips&&this._setSelectionByValue(t,!1)}registerOnChange(t){this._onChange=t}registerOnTouched(t){this._onTouched=t}setDisabledState(t){this.disabled=t,this.stateChanges.next()}onContainerClick(t){this._originatesFromChip(t)||this.focus()}focus(t){this.disabled||this._chipInput&&this._chipInput.focused||(this.chips.length>0?(this._keyManager.setFirstItemActive(),this.stateChanges.next()):(this._focusInput(t),this.stateChanges.next()))}_focusInput(t){this._chipInput&&this._chipInput.focus(t)}_keydown(t){const e=t.target;t.keyCode===F.b&&this._isInputEmpty(e)?(this._keyManager.setLastItemActive(),t.preventDefault()):e&&e.classList.contains("mat-chip")&&(this._keyManager.onKeydown(t),this.stateChanges.next())}_updateTabIndex(){this._tabIndex=this._userTabIndex||(0===this.chips.length?-1:0)}_updateFocusForDestroyedChips(){if(null!=this._lastDestroyedChipIndex)if(this.chips.length){const t=Math.min(this._lastDestroyedChipIndex,this.chips.length-1);this._keyManager.setActiveItem(t)}else this.focus();this._lastDestroyedChipIndex=null}_isValidIndex(t){return t>=0&&t<this.chips.length}_isInputEmpty(t){return!(!t||"input"!==t.nodeName.toLowerCase()||t.value)}_setSelectionByValue(t,e=!0){if(this._clearSelection(),this.chips.forEach(t=>t.deselect()),Array.isArray(t))t.forEach(t=>this._selectValue(t,e)),this._sortValues();else{const i=this._selectValue(t,e);i&&e&&this._keyManager.setActiveItem(i)}}_selectValue(t,e=!0){const i=this.chips.find(e=>null!=e.value&&this._compareWith(e.value,t));return i&&(e?i.selectViaInteraction():i.select(),this._selectionModel.select(i)),i}_initializeSelection(){Promise.resolve().then(()=>{(this.ngControl||this._value)&&(this._setSelectionByValue(this.ngControl?this.ngControl.value:this._value,!1),this.stateChanges.next())})}_clearSelection(t){this._selectionModel.clear(),this.chips.forEach(e=>{e!==t&&e.deselect()}),this.stateChanges.next()}_sortValues(){this._multiple&&(this._selectionModel.clear(),this.chips.forEach(t=>{t.selected&&this._selectionModel.select(t)}),this.stateChanges.next())}_propagateChanges(t){let e=null;e=Array.isArray(this.selected)?this.selected.map(t=>t.value):this.selected?this.selected.value:t,this._value=e,this.change.emit(new lt(this,e)),this.valueChange.emit(e),this._onChange(e),this._changeDetectorRef.markForCheck()}_blur(){this._hasFocusedChip()||this._keyManager.setActiveItem(-1),this.disabled||(this._chipInput?setTimeout(()=>{this.focused||this._markAsTouched()}):this._markAsTouched())}_markAsTouched(){this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next()}_allowFocusEscape(){-1!==this._tabIndex&&(this._tabIndex=-1,setTimeout(()=>{this._tabIndex=this._userTabIndex||0,this._changeDetectorRef.markForCheck()}))}_resetChips(){this._dropSubscriptions(),this._listenToChipsFocus(),this._listenToChipsSelection(),this._listenToChipsRemoved()}_dropSubscriptions(){this._chipFocusSubscription&&(this._chipFocusSubscription.unsubscribe(),this._chipFocusSubscription=null),this._chipBlurSubscription&&(this._chipBlurSubscription.unsubscribe(),this._chipBlurSubscription=null),this._chipSelectionSubscription&&(this._chipSelectionSubscription.unsubscribe(),this._chipSelectionSubscription=null),this._chipRemoveSubscription&&(this._chipRemoveSubscription.unsubscribe(),this._chipRemoveSubscription=null)}_listenToChipsSelection(){this._chipSelectionSubscription=this.chipSelectionChanges.subscribe(t=>{t.source.selected?this._selectionModel.select(t.source):this._selectionModel.deselect(t.source),this.multiple||this.chips.forEach(t=>{!this._selectionModel.isSelected(t)&&t.selected&&t.deselect()}),t.isUserInput&&this._propagateChanges()})}_listenToChipsFocus(){this._chipFocusSubscription=this.chipFocusChanges.subscribe(t=>{let e=this.chips.toArray().indexOf(t.chip);this._isValidIndex(e)&&this._keyManager.updateActiveItem(e),this.stateChanges.next()}),this._chipBlurSubscription=this.chipBlurChanges.subscribe(()=>{this._blur(),this.stateChanges.next()})}_listenToChipsRemoved(){this._chipRemoveSubscription=this.chipRemoveChanges.subscribe(t=>{const e=t.chip,i=this.chips.toArray().indexOf(t.chip);this._isValidIndex(i)&&e._hasFocus&&(this._lastDestroyedChipIndex=i)})}_originatesFromChip(t){let e=t.target;for(;e&&e!==this._elementRef.nativeElement;){if(e.classList.contains("mat-chip"))return!0;e=e.parentElement}return!1}_hasFocusedChip(){return this.chips&&this.chips.some(t=>t._hasFocus)}_syncChipsState(){this.chips&&this.chips.forEach(t=>{t._chipListDisabled=this._disabled,t._chipListMultiple=this.multiple})}}return t.\u0275fac=function(e){return new(e||t)(o.Mb(o.l),o.Mb(o.h),o.Mb($.b,8),o.Mb(E.q,8),o.Mb(E.g,8),o.Mb(y.c),o.Mb(E.n,10))},t.\u0275cmp=o.Gb({type:t,selectors:[["mat-chip-list"]],contentQueries:function(t,e,i){var s;1&t&&o.Fb(i,at,!0),2&t&&o.oc(s=o.bc())&&(e.chips=s)},hostAttrs:[1,"mat-chip-list"],hostVars:15,hostBindings:function(t,e){1&t&&o.ac("focus",(function(){return e.focus()}))("blur",(function(){return e._blur()}))("keydown",(function(t){return e._keydown(t)})),2&t&&(o.Vb("id",e._uid),o.Bb("tabindex",e.disabled?null:e._tabIndex)("aria-describedby",e._ariaDescribedby||null)("aria-required",e.role?e.required:null)("aria-disabled",e.disabled.toString())("aria-invalid",e.errorState)("aria-multiselectable",e.multiple)("role",e.role)("aria-orientation",e.ariaOrientation),o.Eb("mat-chip-list-disabled",e.disabled)("mat-chip-list-invalid",e.errorState)("mat-chip-list-required",e.required))},inputs:{ariaOrientation:["aria-orientation","ariaOrientation"],multiple:"multiple",compareWith:"compareWith",value:"value",required:"required",placeholder:"placeholder",disabled:"disabled",selectable:"selectable",tabIndex:"tabIndex",errorStateMatcher:"errorStateMatcher"},outputs:{change:"change",valueChange:"valueChange"},exportAs:["matChipList"],features:[o.zb([{provide:S.d,useExisting:t}]),o.xb],ngContentSelectors:X,decls:2,vars:0,consts:[[1,"mat-chip-list-wrapper"]],template:function(t,e){1&t&&(o.jc(),o.Sb(0,"div",0),o.ic(1),o.Rb())},styles:['.mat-chip{position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;transform:translateZ(0);border:none;-webkit-appearance:none;-moz-appearance:none}.mat-standard-chip{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:inline-flex;padding:7px 12px;border-radius:16px;align-items:center;cursor:default;min-height:32px;height:1px}._mat-animation-noopable.mat-standard-chip{transition:none;animation:none}.mat-standard-chip .mat-chip-remove.mat-icon{width:18px;height:18px}.mat-standard-chip::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;opacity:0;content:"";pointer-events:none;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-standard-chip:hover::after{opacity:.12}.mat-standard-chip:focus{outline:none}.mat-standard-chip:focus::after{opacity:.16}.cdk-high-contrast-active .mat-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-standard-chip:focus{outline:dotted 2px}.mat-standard-chip.mat-chip-disabled::after{opacity:0}.mat-standard-chip.mat-chip-disabled .mat-chip-remove,.mat-standard-chip.mat-chip-disabled .mat-chip-trailing-icon{cursor:default}.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar,.mat-standard-chip.mat-chip-with-avatar{padding-top:0;padding-bottom:0}.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-right:8px;padding-left:0}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-left:8px;padding-right:0}.mat-standard-chip.mat-chip-with-trailing-icon{padding-top:7px;padding-bottom:7px;padding-right:8px;padding-left:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon{padding-left:8px;padding-right:12px}.mat-standard-chip.mat-chip-with-avatar{padding-left:0;padding-right:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-avatar{padding-right:0;padding-left:12px}.mat-standard-chip .mat-chip-avatar{width:24px;height:24px;margin-right:8px;margin-left:4px}[dir=rtl] .mat-standard-chip .mat-chip-avatar{margin-left:8px;margin-right:4px}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{width:18px;height:18px;cursor:pointer}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{margin-left:8px;margin-right:0}[dir=rtl] .mat-standard-chip .mat-chip-remove,[dir=rtl] .mat-standard-chip .mat-chip-trailing-icon{margin-right:8px;margin-left:0}.mat-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit;overflow:hidden}.mat-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;margin:-4px}.mat-chip-list-wrapper input.mat-input-element,.mat-chip-list-wrapper .mat-standard-chip{margin:4px}.mat-chip-list-stacked .mat-chip-list-wrapper{flex-direction:column;align-items:flex-start}.mat-chip-list-stacked .mat-chip-list-wrapper .mat-standard-chip{width:100%}.mat-chip-avatar{border-radius:50%;justify-content:center;align-items:center;display:flex;overflow:hidden;object-fit:cover}input.mat-chip-input{width:150px;margin:4px;flex:1 0 150px}\n'],encapsulation:2,changeDetection:0}),t})(),pt=0,ut=(()=>{class t{constructor(t,e){this._elementRef=t,this._defaultOptions=e,this.focused=!1,this._addOnBlur=!1,this.separatorKeyCodes=this._defaultOptions.separatorKeyCodes,this.chipEnd=new o.o,this.placeholder="",this.id="mat-chip-list-input-"+pt++,this._disabled=!1,this._inputElement=this._elementRef.nativeElement}set chipList(t){t&&(this._chipList=t,this._chipList.registerInput(this))}get addOnBlur(){return this._addOnBlur}set addOnBlur(t){this._addOnBlur=Object(V.c)(t)}get disabled(){return this._disabled||this._chipList&&this._chipList.disabled}set disabled(t){this._disabled=Object(V.c)(t)}get empty(){return!this._inputElement.value}ngOnChanges(){this._chipList.stateChanges.next()}_keydown(t){t&&t.keyCode===F.n&&!Object(F.r)(t,"shiftKey")&&this._chipList._allowFocusEscape(),this._emitChipEnd(t)}_blur(){this.addOnBlur&&this._emitChipEnd(),this.focused=!1,this._chipList.focused||this._chipList._blur(),this._chipList.stateChanges.next()}_focus(){this.focused=!0,this._chipList.stateChanges.next()}_emitChipEnd(t){!this._inputElement.value&&t&&this._chipList._keydown(t),t&&!this._isSeparatorKey(t)||(this.chipEnd.emit({input:this._inputElement,value:this._inputElement.value}),t&&t.preventDefault())}_onInput(){this._chipList.stateChanges.next()}focus(t){this._inputElement.focus(t)}_isSeparatorKey(t){return!Object(F.r)(t)&&new Set(this.separatorKeyCodes).has(t.keyCode)}}return t.\u0275fac=function(e){return new(e||t)(o.Mb(o.l),o.Mb(rt))},t.\u0275dir=o.Hb({type:t,selectors:[["input","matChipInputFor",""]],hostAttrs:[1,"mat-chip-input","mat-input-element"],hostVars:5,hostBindings:function(t,e){1&t&&o.ac("keydown",(function(t){return e._keydown(t)}))("blur",(function(){return e._blur()}))("focus",(function(){return e._focus()}))("input",(function(){return e._onInput()})),2&t&&(o.Vb("id",e.id),o.Bb("disabled",e.disabled||null)("placeholder",e.placeholder||null)("aria-invalid",e._chipList&&e._chipList.ngControl?e._chipList.ngControl.invalid:null)("aria-required",e._chipList&&e._chipList.required||null))},inputs:{separatorKeyCodes:["matChipInputSeparatorKeyCodes","separatorKeyCodes"],placeholder:"placeholder",id:"id",chipList:["matChipInputFor","chipList"],addOnBlur:["matChipInputAddOnBlur","addOnBlur"],disabled:"disabled"},outputs:{chipEnd:"matChipInputTokenEnd"},exportAs:["matChipInput","matChipInputFor"],features:[o.yb]}),t})();const bt={separatorKeyCodes:[F.g]};let mt=(()=>{class t{}return t.\u0275mod=o.Kb({type:t}),t.\u0275inj=o.Jb({factory:function(e){return new(e||t)},providers:[y.c,{provide:rt,useValue:bt}]}),t})();var gt=i("ihCf"),ft=i("ZRfb"),_t=i("AbOq");function vt(t,e){if(1&t&&(o.Sb(0,"mat-error"),o.Bc(1),o.Rb()),2&t){const t=o.ec();o.Ab(1),o.Dc(" ",t.errors.name," ")}}function Ct(t,e){if(1&t&&(o.Sb(0,"mat-error"),o.Bc(1),o.Rb()),2&t){const t=o.ec();o.Ab(1),o.Dc(" ",t.errors.secret," ")}}function yt(t,e){if(1&t&&(o.Sb(0,"mat-error"),o.Bc(1),o.Rb()),2&t){const t=o.ec();o.Ab(1),o.Dc(" ",t.errors.url," ")}}function St(t,e){if(1&t&&(o.Sb(0,"mat-option",22),o.Bc(1),o.Rb()),2&t){const t=e.$implicit;o.kc("value",t.url),o.Ab(1),o.Dc(" ",t.url," ")}}function wt(t,e){if(1&t&&(o.Sb(0,"mat-error"),o.Bc(1),o.Rb()),2&t){const t=o.ec();o.Ab(1),o.Dc(" ",t.errors.scopes," ")}}function xt(t,e){if(1&t){const t=o.Tb();o.Sb(0,"mat-chip",25),o.ac("removed",(function(){o.rc(t);const i=e.$implicit;return o.ec().remove(i)})),o.Bc(1),o.Sb(2,"mat-icon",26),o.Bc(3," cancel "),o.Rb(),o.Rb()}if(2&t){const t=e.$implicit;o.Ab(1),o.Dc(" ",t," ")}}function kt(t,e){if(1&t&&(o.Sb(0,"mat-error"),o.Bc(1),o.Rb()),2&t){const t=o.ec();o.Ab(1),o.Dc(" ",t.errors.theme.color," ")}}function It(t,e){if(1&t&&(o.Sb(0,"mat-error"),o.Bc(1),o.Rb()),2&t){const t=o.ec();o.Ab(1),o.Dc(" ",t.errors.theme.background," ")}}function Ot(t,e){if(1&t&&(o.Sb(0,"mat-error"),o.Bc(1),o.Rb()),2&t){const t=o.ec();o.Ab(1),o.Dc(" ",t.errors.google.database," ")}}function Rt(t,e){if(1&t&&(o.Sb(0,"mat-error"),o.Bc(1),o.Rb()),2&t){const t=o.ec();o.Ab(1),o.Dc(" ",t.errors.google.credentials," ")}}function Mt(t,e){if(1&t&&(o.Sb(0,"mat-error"),o.Bc(1),o.Rb()),2&t){const t=o.ec();o.Ab(1),o.Dc(" ",t.errors.private," ")}}function At(t,e){if(1&t&&(o.Sb(0,"mat-error"),o.Bc(1),o.Rb()),2&t){const t=o.ec();o.Ab(1),o.Dc(" ",t.errors.organizationOnly," ")}}const Bt=function(t){return{url:t}};let Dt=(()=>{class t{constructor(t,e,i,s,a,n,r){this.toast=t,this.route=e,this.scopes=i,this.config=s,this.router=a,this.buttons=n,this.service=r,this.form=new E.f({theme:new E.f({color:new E.c(null,[E.v.required]),background:new E.c(null,[E.v.required])}),google:new E.f({database:new E.c(null,[E.v.required]),credentials:new E.c(null,[E.v.required])}),url:new E.c(null,[E.v.required]),icon:new E.c(null,[E.v.required]),name:new E.c(null,[E.v.required]),secret:new E.c(null,[E.v.required]),scopes:new E.c([],[E.v.required]),domains:new E.c([],[E.v.required]),private:new E.c(null,[E.v.required]),organizationOnly:new E.c(null,[E.v.required])}),this.errors={theme:{color:"",background:""},google:{database:"",credentials:""},url:"",icon:"",name:"",secret:"",scopes:"",domains:"",private:"",organizationOnly:""},this.filter=new E.f({scopes:new E.c("",[E.v.required])}),this.subscriptions={},this.keycodes=[F.g,F.c]}get(){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.service.get({filter:["url","role","icon","name","theme","secret","google","scopes","domains","private","organizationOnly"],appId:this.appId});if(t.ok){const e=new a.a(t.result);e.role>1?(this.form.controls.url.setValue(e.url),this.form.controls.icon.setValue(e.icon),this.form.controls.name.setValue(e.name),this.form.controls.secret.setValue(e.secret),this.form.controls.scopes.setValue(e.scopes),this.form.controls.domains.setValue(e.domains),this.form.controls.private.setValue(e.private),this.form.controls.organizationOnly.setValue(e.organizationOnly),this.form.controls.theme.controls.color.setValue(e.theme.color),this.form.controls.theme.controls.background.setValue(e.theme.background),this.form.controls.google.controls.database.setValue(e.google.database),this.form.controls.google.controls.credentials.setValue(JSON.stringify(e.google.credentials,null,4))):(this.toast.show("You have insufficient rights to edit this app!"),this.router.navigate(["/apps"]))}else this.toast.show(t.error.message),this.router.navigate(["/apps"]);this.loading=!1}))}load(){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.scopes.load({filter:["url"]});t.ok?this.scopes.data=t.result.map(t=>t):(this.scopes.data=[],this.toast.show(t.error.message)),this.loading=!1}))}submit(){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;let t=this.mode;"copy"==t&&(t="add",delete this.appId);const e=yield this.service[t]({theme:{color:this.form.value.theme.color,background:this.form.value.theme.background},google:{database:this.form.value.google.database,credentials:this.form.value.google.credentials},url:this.form.value.url,icon:this.form.value.icon,name:this.form.value.name,appId:this.appId,secret:this.form.value.secret,scopes:this.form.value.scopes,private:this.form.value.private,domains:this.form.value.domains,organizationOnly:this.form.value.organizationOnly});e.ok?this.router.navigate(["/apps"]):this.toast.show(e.error.message),this.loading=!1}))}upload(t){return Object(s.a)(this,void 0,void 0,(function*(){this.form.controls.icon.setValue(t)}))}remove(t){return Object(s.a)(this,void 0,void 0,(function*(){this.form.value.domains.splice(this.form.value.domains.indexOf(t),1)}))}add(t){return Object(s.a)(this,void 0,void 0,(function*(){const e=this.form.value.domains;null==t.value||""==t.value||e.includes(t.value.trim())||(t.input.value="",e.push(t.value.trim()),this.form.controls.domains.setValue(e))}))}ngOnInit(){this.buttons.hide("add"),this.buttons.show("close"),this.buttons.hide("filter"),this.buttons.hide("search"),this.subscriptions.close=this.buttons.close.click.subscribe(t=>{this.router.navigate(["/apps"])}),this.subscriptions.loaded=this.config.loaded.subscribe(t=>Object(s.a)(this,void 0,void 0,(function*(){if(t){const t=this.route.snapshot.queryParams;this.mode=t.mode,this.appId=t.appId,"add"!=this.mode?(yield this.get(),yield this.load()):yield this.load()}})))}ngOnDestroy(){this.subscriptions.close.unsubscribe(),this.subscriptions.loaded.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(o.Mb(c.a),o.Mb(d.a),o.Mb(j.a),o.Mb(h.a),o.Mb(d.b),o.Mb(p.a),o.Mb(b.a))},t.\u0275cmp=o.Gb({type:t,selectors:[["apps-editor-page"]],decls:85,vars:31,consts:[[3,"formGroup","ngSubmit"],["upload","","upload-accept","image/*","matRipple","",3,"upload-src","upload-change"],["appearance","outline"],["matInput","","type","text","name","name","placeholder","name","formControlName","name","required",""],[4,"ngIf"],["matInput","","type","text","name","secret","placeholder","secret","formControlName","secret","required",""],["matInput","","type","text","name","url","placeholder","main url","formControlName","url","required",""],["name","scopes","placeholder","scopes","formControlName","scopes","required","","multiple",""],[3,"formGroup"],["placeholderLabel","filter scopes","noEntriesFoundLabel","no scopes found","formControlName","scopes"],[3,"value",4,"ngFor","ngForOf"],["aria-label","domain selection"],["domainlist",""],[3,"removed",4,"ngFor","ngForOf"],["placeholder","New domain...",3,"matChipInputFor","matChipInputSeparatorKeyCodes","matChipInputAddOnBlur","matChipInputTokenEnd"],["appearance","outline","formGroupName","theme"],["matInput","","type","color","name","color","placeholder","font color","formControlName","color","required",""],["matInput","","type","color","name","background","placeholder","background color","formControlName","background","required",""],["appearance","outline","formGroupName","google"],["matInput","","type","text","name","database","placeholder","database","formControlName","database","required",""],["matInput","","cdkTextareaAutosize","","name","credentials","placeholder","credentials","formControlName","credentials","required",""],["name","private","formControlName","private","required",""],[3,"value"],["name","organizationOnly","formControlName","organizationOnly","required",""],["type","button","mat-flat-button","","color","primary",3,"disabled","click"],[3,"removed"],["matChipRemove",""]],template:function(t,e){if(1&t&&(o.Sb(0,"mat-content"),o.Sb(1,"form",0),o.ac("ngSubmit",(function(){return!e.loading&&!e.form.invalid&&e.submit()})),o.Sb(2,"div",1),o.ac("upload-change",(function(t){return e.upload(t)})),o.Sb(3,"mat-icon"),o.Bc(4,"publish"),o.Rb(),o.Rb(),o.Sb(5,"h2"),o.Bc(6," Details "),o.Rb(),o.Sb(7,"mat-form-field",2),o.Sb(8,"mat-label"),o.Bc(9," Name "),o.Rb(),o.Nb(10,"input",3),o.zc(11,vt,2,1,"mat-error",4),o.Rb(),o.Sb(12,"mat-form-field",2),o.Sb(13,"mat-label"),o.Bc(14," Secret "),o.Rb(),o.Nb(15,"input",5),o.zc(16,Ct,2,1,"mat-error",4),o.Rb(),o.Sb(17,"mat-form-field",2),o.Sb(18,"mat-label"),o.Bc(19," Main Url "),o.Rb(),o.Nb(20,"input",6),o.zc(21,yt,2,1,"mat-error",4),o.Rb(),o.Sb(22,"mat-form-field",2),o.Sb(23,"mat-label"),o.Bc(24," Scopes "),o.Rb(),o.Sb(25,"mat-select",7),o.Sb(26,"mat-option",8),o.Nb(27,"ngx-mat-select-search",9),o.Rb(),o.zc(28,St,2,2,"mat-option",10),o.fc(29,"filterBy"),o.Rb(),o.zc(30,wt,2,1,"mat-error",4),o.Rb(),o.Sb(31,"mat-form-field",2),o.Sb(32,"mat-label"),o.Bc(33," Domains "),o.Rb(),o.Sb(34,"mat-chip-list",11,12),o.zc(36,xt,4,1,"mat-chip",13),o.Sb(37,"input",14),o.ac("matChipInputTokenEnd",(function(t){return e.add(t)})),o.Rb(),o.Rb(),o.Rb(),o.Sb(38,"h2"),o.Bc(39," Theme "),o.Rb(),o.Sb(40,"mat-form-field",15),o.Sb(41,"mat-label"),o.Bc(42," Font Color "),o.Rb(),o.Nb(43,"input",16),o.zc(44,kt,2,1,"mat-error",4),o.Rb(),o.Sb(45,"mat-form-field",15),o.Sb(46,"mat-label"),o.Bc(47," Background Color "),o.Rb(),o.Nb(48,"input",17),o.zc(49,It,2,1,"mat-error",4),o.Rb(),o.Sb(50,"h2"),o.Bc(51," Google "),o.Rb(),o.Sb(52,"mat-form-field",18),o.Sb(53,"mat-label"),o.Bc(54," Database "),o.Rb(),o.Nb(55,"input",19),o.zc(56,Ot,2,1,"mat-error",4),o.Rb(),o.Sb(57,"mat-form-field",18),o.Sb(58,"mat-label"),o.Bc(59," Credentials "),o.Rb(),o.Nb(60,"textarea",20),o.zc(61,Rt,2,1,"mat-error",4),o.Rb(),o.Sb(62,"h2"),o.Bc(63," Access Control "),o.Rb(),o.Sb(64,"mat-form-field",2),o.Sb(65,"mat-label"),o.Bc(66," Access Mode "),o.Rb(),o.Sb(67,"mat-select",21),o.Sb(68,"mat-option",22),o.Bc(69," Public "),o.Rb(),o.Sb(70,"mat-option",22),o.Bc(71," Private "),o.Rb(),o.Rb(),o.zc(72,Mt,2,1,"mat-error",4),o.Rb(),o.Sb(73,"mat-form-field",2),o.Sb(74,"mat-label"),o.Bc(75," Sharing Rules "),o.Rb(),o.Sb(76,"mat-select",23),o.Sb(77,"mat-option",22),o.Bc(78," Share To Anyone "),o.Rb(),o.Sb(79,"mat-option",22),o.Bc(80," In Organization Only "),o.Rb(),o.Rb(),o.zc(81,At,2,1,"mat-error",4),o.Rb(),o.Rb(),o.Rb(),o.Sb(82,"mat-footer"),o.Sb(83,"button",24),o.ac("click",(function(){return!e.loading&&!e.form.invalid&&e.submit()})),o.Bc(84),o.Rb(),o.Rb()),2&t){const t=o.pc(35);o.Ab(1),o.kc("formGroup",e.form),o.Ab(1),o.Eb("required",!e.form.value.icon),o.kc("upload-src",e.form.value.icon),o.Ab(9),o.kc("ngIf",e.errors.name),o.Ab(5),o.kc("ngIf",e.errors.secret),o.Ab(5),o.kc("ngIf",e.errors.url),o.Ab(5),o.kc("formGroup",e.filter),o.Ab(2),o.kc("ngForOf",o.hc(29,26,e.scopes.data,o.mc(29,Bt,e.filter.value.scopes))),o.Ab(2),o.kc("ngIf",e.errors.scopes),o.Ab(6),o.kc("ngForOf",e.form.value.domains),o.Ab(1),o.kc("matChipInputFor",t)("matChipInputSeparatorKeyCodes",e.keycodes)("matChipInputAddOnBlur",!0),o.Ab(7),o.kc("ngIf",e.errors.theme.color),o.Ab(5),o.kc("ngIf",e.errors.theme.background),o.Ab(7),o.kc("ngIf",e.errors.google.database),o.Ab(5),o.kc("ngIf",e.errors.google.credentials),o.Ab(7),o.kc("value",!1),o.Ab(2),o.kc("value",!0),o.Ab(2),o.kc("ngIf",e.errors.private),o.Ab(5),o.kc("value",0),o.Ab(2),o.kc("value",1),o.Ab(2),o.kc("ngIf",e.errors.organizationOnly),o.Ab(2),o.kc("disabled",e.form.invalid),o.Ab(1),o.Dc(" ",e.mode," ")}},directives:[z.a,E.w,E.p,E.g,q.a,y.o,C.a,S.c,S.f,L.a,E.b,E.o,E.e,E.u,_.l,N.a,y.k,T.a,_.k,dt,ut,E.h,gt.b,ft.a,v.a,S.b,at,nt],pipes:[_t.a],styles:["[upload][_ngcontent-%COMP%]{width:100px;margin:auto;height:100px;border:2px solid transparent;display:flex;align-items:center;border-radius:100%;justify-content:center;background-color:#eee}[upload].required[_ngcontent-%COMP%]{border-color:red}mat-content[_ngcontent-%COMP%], mat-footer[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column}mat-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%], mat-footer[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{max-width:400px;margin-top:20px}mat-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], mat-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;max-width:400px}mat-footer[_ngcontent-%COMP%]{justify-content:center}"]}),t})();var Ft=i("5Yg0"),Et=i("gyTc"),jt=i("R32p"),zt=i("wZkO"),qt=i("tVzd"),Lt=i("YUcS"),Nt=i("H0Zp"),Tt=i("p/0r");const Vt=[{path:"",component:D},{path:"editor",component:Dt}];let Pt=(()=>{class t{}return t.\u0275mod=o.Kb({type:t}),t.\u0275inj=o.Jb({factory:function(e){return new(e||t)},imports:[[E.i,_.c,Ft.a,n.c,Et.a,zt.a,C.b,f.c,jt.a,mt,r.l,L.b,N.b,y.p,v.b,qt.a,Nt.a,Lt.a,Tt.a,S.e,E.t,T.b,d.f.forChild(Vt)]]}),t})()}}]);