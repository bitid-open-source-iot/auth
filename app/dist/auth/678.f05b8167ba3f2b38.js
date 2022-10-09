"use strict";(self.webpackChunkauth=self.webpackChunkauth||[]).push([[678],{3678:(ce,L,r)=>{r.r(L),r.d(L,{SubscribersPageModule:()=>re});var h=r(5861),f=r(4999),m=r(3075),A=r(8966),t=r(5e3),B=r(5358),U=r(4733),H=r(7660),q=r(2109),C=r(4594),Z=r(7423),w=r(5245),y=r(9808),x=r(5899),N=r(8863),D=r(7093),_=r(7322),V=r(8833),tt=r(5664),E=r(3191),g=r(508),J=r(727),et=r(7579),ot=r(9770),T=r(6451),it=r(9646),P=r(4968),Q=r(925),O=r(9776),W=r(4115),v=r(1159),at=r(7429),st=r(8675),F=r(3900),I=r(5698),k=r(9300),nt=r(4004),rt=r(8505),lt=r(1005),ct=r(226);const pt=["panel"];function ut(a,l){if(1&a&&(t.TgZ(0,"div",0,1),t.Hsn(2),t.qZA()),2&a){const e=l.id,o=t.oxw();t.Q6J("id",o.id)("ngClass",o._classList),t.uIk("aria-label",o.ariaLabel||null)("aria-labelledby",o._getPanelAriaLabelledby(e))}}const dt=["*"];let mt=0;class ht{constructor(l,e){this.source=l,this.option=e}}const ft=(0,g.Kr)(class{}),G=new t.OlP("mat-autocomplete-default-options",{providedIn:"root",factory:function gt(){return{autoActiveFirstOption:!1}}});let vt=(()=>{class a extends ft{constructor(e,o,i,n){super(),this._changeDetectorRef=e,this._elementRef=o,this._activeOptionChanges=J.w0.EMPTY,this.showPanel=!1,this._isOpen=!1,this.displayWith=null,this.optionSelected=new t.vpe,this.opened=new t.vpe,this.closed=new t.vpe,this.optionActivated=new t.vpe,this._classList={},this.id="mat-autocomplete-"+mt++,this.inertGroups=(null==n?void 0:n.SAFARI)||!1,this._autoActiveFirstOption=!!i.autoActiveFirstOption}get isOpen(){return this._isOpen&&this.showPanel}get autoActiveFirstOption(){return this._autoActiveFirstOption}set autoActiveFirstOption(e){this._autoActiveFirstOption=(0,E.Ig)(e)}set classList(e){this._classList=e&&e.length?(0,E.du)(e).reduce((o,i)=>(o[i]=!0,o),{}):{},this._setVisibilityClasses(this._classList),this._elementRef.nativeElement.className=""}ngAfterContentInit(){this._keyManager=new tt.s1(this.options).withWrap(),this._activeOptionChanges=this._keyManager.change.subscribe(e=>{this.isOpen&&this.optionActivated.emit({source:this,option:this.options.toArray()[e]||null})}),this._setVisibility()}ngOnDestroy(){this._activeOptionChanges.unsubscribe()}_setScrollTop(e){this.panel&&(this.panel.nativeElement.scrollTop=e)}_getScrollTop(){return this.panel?this.panel.nativeElement.scrollTop:0}_setVisibility(){this.showPanel=!!this.options.length,this._setVisibilityClasses(this._classList),this._changeDetectorRef.markForCheck()}_emitSelectEvent(e){const o=new ht(this,e);this.optionSelected.emit(o)}_getPanelAriaLabelledby(e){return this.ariaLabel?null:this.ariaLabelledby?(e?e+" ":"")+this.ariaLabelledby:e}_setVisibilityClasses(e){e[this._visibleClass]=this.showPanel,e[this._hiddenClass]=!this.showPanel}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(t.sBO),t.Y36(t.SBq),t.Y36(G),t.Y36(Q.t4))},a.\u0275dir=t.lG2({type:a,viewQuery:function(e,o){if(1&e&&(t.Gf(t.Rgc,7),t.Gf(pt,5)),2&e){let i;t.iGM(i=t.CRH())&&(o.template=i.first),t.iGM(i=t.CRH())&&(o.panel=i.first)}},inputs:{ariaLabel:["aria-label","ariaLabel"],ariaLabelledby:["aria-labelledby","ariaLabelledby"],displayWith:"displayWith",autoActiveFirstOption:"autoActiveFirstOption",panelWidth:"panelWidth",classList:["class","classList"]},outputs:{optionSelected:"optionSelected",opened:"opened",closed:"closed",optionActivated:"optionActivated"},features:[t.qOj]}),a})(),bt=(()=>{class a extends vt{constructor(){super(...arguments),this._visibleClass="mat-autocomplete-visible",this._hiddenClass="mat-autocomplete-hidden"}}return a.\u0275fac=function(){let l;return function(o){return(l||(l=t.n5z(a)))(o||a)}}(),a.\u0275cmp=t.Xpm({type:a,selectors:[["mat-autocomplete"]],contentQueries:function(e,o,i){if(1&e&&(t.Suo(i,g.K7,5),t.Suo(i,g.ey,5)),2&e){let n;t.iGM(n=t.CRH())&&(o.optionGroups=n),t.iGM(n=t.CRH())&&(o.options=n)}},hostAttrs:[1,"mat-autocomplete"],inputs:{disableRipple:"disableRipple"},exportAs:["matAutocomplete"],features:[t._Bn([{provide:g.HF,useExisting:a}]),t.qOj],ngContentSelectors:dt,decls:1,vars:0,consts:[["role","listbox",1,"mat-autocomplete-panel",3,"id","ngClass"],["panel",""]],template:function(e,o){1&e&&(t.F$t(),t.YNc(0,ut,3,4,"ng-template"))},directives:[y.mk],styles:[".mat-autocomplete-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;visibility:hidden;max-width:none;max-height:256px;position:relative;width:100%;border-bottom-left-radius:4px;border-bottom-right-radius:4px}.mat-autocomplete-panel.mat-autocomplete-visible{visibility:visible}.mat-autocomplete-panel.mat-autocomplete-hidden{visibility:hidden}.mat-autocomplete-panel-above .mat-autocomplete-panel{border-radius:0;border-top-left-radius:4px;border-top-right-radius:4px}.mat-autocomplete-panel .mat-divider-horizontal{margin-top:-1px}.cdk-high-contrast-active .mat-autocomplete-panel{outline:solid 1px}mat-autocomplete{display:none}\n"],encapsulation:2,changeDetection:0}),a})();const j=new t.OlP("mat-autocomplete-scroll-strategy"),At={provide:j,deps:[O.aV],useFactory:function yt(a){return()=>a.scrollStrategies.reposition()}},_t={provide:m.JU,useExisting:(0,t.Gpc)(()=>z),multi:!0};let Tt=(()=>{class a{constructor(e,o,i,n,s,c,u,d,p,b,Y){this._element=e,this._overlay=o,this._viewContainerRef=i,this._zone=n,this._changeDetectorRef=s,this._dir=u,this._formField=d,this._document=p,this._viewportRuler=b,this._defaults=Y,this._componentDestroyed=!1,this._autocompleteDisabled=!1,this._manuallyFloatingLabel=!1,this._viewportSubscription=J.w0.EMPTY,this._canOpenOnNextFocus=!0,this._closeKeyEventStream=new et.x,this._windowBlurHandler=()=>{this._canOpenOnNextFocus=this._document.activeElement!==this._element.nativeElement||this.panelOpen},this._onChange=()=>{},this._onTouched=()=>{},this.position="auto",this.autocompleteAttribute="off",this._overlayAttached=!1,this.optionSelections=(0,ot.P)(()=>{const S=this.autocomplete?this.autocomplete.options:null;return S?S.changes.pipe((0,st.O)(S),(0,F.w)(()=>(0,T.T)(...S.map(le=>le.onSelectionChange)))):this._zone.onStable.pipe((0,I.q)(1),(0,F.w)(()=>this.optionSelections))}),this._scrollStrategy=c}get autocompleteDisabled(){return this._autocompleteDisabled}set autocompleteDisabled(e){this._autocompleteDisabled=(0,E.Ig)(e)}ngAfterViewInit(){const e=this._getWindow();void 0!==e&&this._zone.runOutsideAngular(()=>e.addEventListener("blur",this._windowBlurHandler))}ngOnChanges(e){e.position&&this._positionStrategy&&(this._setStrategyPositions(this._positionStrategy),this.panelOpen&&this._overlayRef.updatePosition())}ngOnDestroy(){const e=this._getWindow();void 0!==e&&e.removeEventListener("blur",this._windowBlurHandler),this._viewportSubscription.unsubscribe(),this._componentDestroyed=!0,this._destroyPanel(),this._closeKeyEventStream.complete()}get panelOpen(){return this._overlayAttached&&this.autocomplete.showPanel}openPanel(){this._attachOverlay(),this._floatLabel()}closePanel(){this._resetLabel(),this._overlayAttached&&(this.panelOpen&&this._zone.run(()=>{this.autocomplete.closed.emit()}),this.autocomplete._isOpen=this._overlayAttached=!1,this._overlayRef&&this._overlayRef.hasAttached()&&(this._overlayRef.detach(),this._closingActionsSubscription.unsubscribe()),this._componentDestroyed||this._changeDetectorRef.detectChanges())}updatePosition(){this._overlayAttached&&this._overlayRef.updatePosition()}get panelClosingActions(){return(0,T.T)(this.optionSelections,this.autocomplete._keyManager.tabOut.pipe((0,k.h)(()=>this._overlayAttached)),this._closeKeyEventStream,this._getOutsideClickStream(),this._overlayRef?this._overlayRef.detachments().pipe((0,k.h)(()=>this._overlayAttached)):(0,it.of)()).pipe((0,nt.U)(e=>e instanceof g.rN?e:null))}get activeOption(){return this.autocomplete&&this.autocomplete._keyManager?this.autocomplete._keyManager.activeItem:null}_getOutsideClickStream(){return(0,T.T)((0,P.R)(this._document,"click"),(0,P.R)(this._document,"auxclick"),(0,P.R)(this._document,"touchend")).pipe((0,k.h)(e=>{const o=(0,Q.sA)(e),i=this._formField?this._formField._elementRef.nativeElement:null,n=this.connectedTo?this.connectedTo.elementRef.nativeElement:null;return this._overlayAttached&&o!==this._element.nativeElement&&this._document.activeElement!==this._element.nativeElement&&(!i||!i.contains(o))&&(!n||!n.contains(o))&&!!this._overlayRef&&!this._overlayRef.overlayElement.contains(o)}))}writeValue(e){Promise.resolve().then(()=>this._setTriggerValue(e))}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this._element.nativeElement.disabled=e}_handleKeydown(e){const o=e.keyCode,i=(0,v.Vb)(e);if(o===v.hY&&!i&&e.preventDefault(),this.activeOption&&o===v.K5&&this.panelOpen&&!i)this.activeOption._selectViaInteraction(),this._resetActiveItem(),e.preventDefault();else if(this.autocomplete){const n=this.autocomplete._keyManager.activeItem,s=o===v.LH||o===v.JH;o===v.Mf||s&&!i&&this.panelOpen?this.autocomplete._keyManager.onKeydown(e):s&&this._canOpen()&&this.openPanel(),(s||this.autocomplete._keyManager.activeItem!==n)&&this._scrollToOption(this.autocomplete._keyManager.activeItemIndex||0)}}_handleInput(e){let o=e.target,i=o.value;"number"===o.type&&(i=""==i?null:parseFloat(i)),this._previousValue!==i&&(this._previousValue=i,this._onChange(i),this._canOpen()&&this._document.activeElement===e.target&&this.openPanel())}_handleFocus(){this._canOpenOnNextFocus?this._canOpen()&&(this._previousValue=this._element.nativeElement.value,this._attachOverlay(),this._floatLabel(!0)):this._canOpenOnNextFocus=!0}_handleClick(){this._canOpen()&&!this.panelOpen&&this.openPanel()}_floatLabel(e=!1){this._formField&&"auto"===this._formField.floatLabel&&(e?this._formField._animateAndLockLabel():this._formField.floatLabel="always",this._manuallyFloatingLabel=!0)}_resetLabel(){this._manuallyFloatingLabel&&(this._formField.floatLabel="auto",this._manuallyFloatingLabel=!1)}_subscribeToClosingActions(){const e=this._zone.onStable.pipe((0,I.q)(1)),o=this.autocomplete.options.changes.pipe((0,rt.b)(()=>this._positionStrategy.reapplyLastPosition()),(0,lt.g)(0));return(0,T.T)(e,o).pipe((0,F.w)(()=>(this._zone.run(()=>{const i=this.panelOpen;this._resetActiveItem(),this.autocomplete._setVisibility(),this._changeDetectorRef.detectChanges(),this.panelOpen&&(this._overlayRef.updatePosition(),i!==this.panelOpen&&this.autocomplete.opened.emit())}),this.panelClosingActions)),(0,I.q)(1)).subscribe(i=>this._setValueAndClose(i))}_destroyPanel(){this._overlayRef&&(this.closePanel(),this._overlayRef.dispose(),this._overlayRef=null)}_setTriggerValue(e){const o=this.autocomplete&&this.autocomplete.displayWith?this.autocomplete.displayWith(e):e,i=null!=o?o:"";this._formField?this._formField._control.value=i:this._element.nativeElement.value=i,this._previousValue=i}_setValueAndClose(e){const o=e&&e.source;o&&(this._clearPreviousSelectedOption(o),this._setTriggerValue(o.value),this._onChange(o.value),this.autocomplete._emitSelectEvent(o),this._element.nativeElement.focus()),this.closePanel()}_clearPreviousSelectedOption(e){this.autocomplete.options.forEach(o=>{o!==e&&o.selected&&o.deselect()})}_attachOverlay(){var e;let o=this._overlayRef;o?(this._positionStrategy.setOrigin(this._getConnectedElement()),o.updateSize({width:this._getPanelWidth()})):(this._portal=new at.UE(this.autocomplete.template,this._viewContainerRef,{id:null===(e=this._formField)||void 0===e?void 0:e.getLabelId()}),o=this._overlay.create(this._getOverlayConfig()),this._overlayRef=o,o.keydownEvents().subscribe(n=>{(n.keyCode===v.hY&&!(0,v.Vb)(n)||n.keyCode===v.LH&&(0,v.Vb)(n,"altKey"))&&(this._closeKeyEventStream.next(),this._resetActiveItem(),n.stopPropagation(),n.preventDefault())}),this._viewportSubscription=this._viewportRuler.change().subscribe(()=>{this.panelOpen&&o&&o.updateSize({width:this._getPanelWidth()})})),o&&!o.hasAttached()&&(o.attach(this._portal),this._closingActionsSubscription=this._subscribeToClosingActions());const i=this.panelOpen;this.autocomplete._setVisibility(),this.autocomplete._isOpen=this._overlayAttached=!0,this.panelOpen&&i!==this.panelOpen&&this.autocomplete.opened.emit()}_getOverlayConfig(){var e;return new O.X_({positionStrategy:this._getOverlayPosition(),scrollStrategy:this._scrollStrategy(),width:this._getPanelWidth(),direction:this._dir,panelClass:null===(e=this._defaults)||void 0===e?void 0:e.overlayPanelClass})}_getOverlayPosition(){const e=this._overlay.position().flexibleConnectedTo(this._getConnectedElement()).withFlexibleDimensions(!1).withPush(!1);return this._setStrategyPositions(e),this._positionStrategy=e,e}_setStrategyPositions(e){const o=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"}],i=this._aboveClass,n=[{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:i},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:i}];let s;s="above"===this.position?n:"below"===this.position?o:[...o,...n],e.withPositions(s)}_getConnectedElement(){return this.connectedTo?this.connectedTo.elementRef:this._formField?this._formField.getConnectedOverlayOrigin():this._element}_getPanelWidth(){return this.autocomplete.panelWidth||this._getHostWidth()}_getHostWidth(){return this._getConnectedElement().nativeElement.getBoundingClientRect().width}_resetActiveItem(){const e=this.autocomplete;e.autoActiveFirstOption?e._keyManager.setFirstItemActive():e._keyManager.setActiveItem(-1)}_canOpen(){const e=this._element.nativeElement;return!e.readOnly&&!e.disabled&&!this._autocompleteDisabled}_getWindow(){var e;return(null===(e=this._document)||void 0===e?void 0:e.defaultView)||window}_scrollToOption(e){const o=this.autocomplete,i=(0,g.CB)(e,o.options,o.optionGroups);if(0===e&&1===i)o._setScrollTop(0);else if(o.panel){const n=o.options.toArray()[e];if(n){const s=n._getHostElement(),c=(0,g.jH)(s.offsetTop,s.offsetHeight,o._getScrollTop(),o.panel.nativeElement.offsetHeight);o._setScrollTop(c)}}}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(t.SBq),t.Y36(O.aV),t.Y36(t.s_b),t.Y36(t.R0b),t.Y36(t.sBO),t.Y36(j),t.Y36(ct.Is,8),t.Y36(_.G_,9),t.Y36(y.K0,8),t.Y36(W.rL),t.Y36(G,8))},a.\u0275dir=t.lG2({type:a,inputs:{autocomplete:["matAutocomplete","autocomplete"],position:["matAutocompletePosition","position"],connectedTo:["matAutocompleteConnectedTo","connectedTo"],autocompleteAttribute:["autocomplete","autocompleteAttribute"],autocompleteDisabled:["matAutocompleteDisabled","autocompleteDisabled"]},features:[t.TTD]}),a})(),z=(()=>{class a extends Tt{constructor(){super(...arguments),this._aboveClass="mat-autocomplete-panel-above"}}return a.\u0275fac=function(){let l;return function(o){return(l||(l=t.n5z(a)))(o||a)}}(),a.\u0275dir=t.lG2({type:a,selectors:[["input","matAutocomplete",""],["textarea","matAutocomplete",""]],hostAttrs:[1,"mat-autocomplete-trigger"],hostVars:7,hostBindings:function(e,o){1&e&&t.NdJ("focusin",function(){return o._handleFocus()})("blur",function(){return o._onTouched()})("input",function(n){return o._handleInput(n)})("keydown",function(n){return o._handleKeydown(n)})("click",function(){return o._handleClick()}),2&e&&t.uIk("autocomplete",o.autocompleteAttribute)("role",o.autocompleteDisabled?null:"combobox")("aria-autocomplete",o.autocompleteDisabled?null:"list")("aria-activedescendant",o.panelOpen&&o.activeOption?o.activeOption.id:null)("aria-expanded",o.autocompleteDisabled?null:o.panelOpen.toString())("aria-owns",o.autocompleteDisabled||!o.panelOpen||null==o.autocomplete?null:o.autocomplete.id)("aria-haspopup",o.autocompleteDisabled?null:"listbox")},exportAs:["matAutocompleteTrigger"],features:[t._Bn([_t]),t.qOj]}),a})(),Ot=(()=>{class a{}return a.\u0275fac=function(e){return new(e||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({providers:[At],imports:[[O.U8,g.Ng,g.BQ,y.ez],W.ZD,g.Ng,g.BQ]}),a})(),X=(()=>{class a{constructor(e,o){this.el=e,this.renderer=o}ngOnChanges(){this.renderer.setStyle(this.el.nativeElement,"background-image",["url(",this.src,")"].join(""))}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(t.SBq),t.Y36(t.Qsj))},a.\u0275cmp=t.Xpm({type:a,selectors:[["mat-avatar"]],inputs:{src:"src"},features:[t.TTD],decls:0,vars:0,template:function(e,o){},styles:["mat-avatar{width:40px;height:40px;display:block;border-radius:100%;background-size:cover;background-color:#fafafa;background-repeat:no-repeat;background-position:center center}\n"],encapsulation:2}),a})();var K=r(4107),Mt=r(4080),St=r(3711);function Ct(a,l){1&a&&t._UZ(0,"mat-progress-bar",20)}function Zt(a,l){if(1&a){const e=t.EpF();t.TgZ(0,"mat-option",21),t.NdJ("click",function(){const n=t.CHM(e).$implicit;return t.oxw().setSearchValue(n.id)}),t._UZ(1,"mat-avatar",22),t._uU(2),t.qZA()}if(2&a){const e=l.$implicit;t.Q6J("value",e.description),t.xp6(1),t.Q6J("src",e.icon),t.xp6(1),t.hij(" ",e.description," ")}}function wt(a,l){if(1&a&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.hij(" ",e.errors.type," ")}}function xt(a,l){if(1&a&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.hij(" ",e.errors.role," ")}}let Dt=(()=>{class a{constructor(e,o,i,n,s,c){this.apps=e,this.users=o,this.dialog=i,this.groups=n,this.config=s,this.formerror=c,this.form=new m.cw({id:new m.NI(null,[m.kI.required]),role:new m.NI(1,[m.kI.required]),type:new m.NI("app",[m.kI.required]),search:new m.NI(null)}),this.errors={id:"",role:"",type:"",search:""},this.options=[],this.loading=!1,this.searching=!1,this.observers={}}submit(){var e=this;return(0,h.Z)(function*(){delete e.form.value.search,e.form.controls.id.enable(),e.form.controls.type.enable(),e.form.controls.search.enable(),e.dialog.close(e.form.value)})()}search(){var e=this;return(0,h.Z)(function*(){e.searching=!0;let i,o={limit:5};switch(e.form.value.type){case"app":o.filter=["name","icon","appId"],o.name=e.form.value.search,o.private=[!0,!1],i=e.apps;break;case"user":o.filter=["name","userId","picture"],o.name=e.form.value.search,i=e.users;break;case"group":o.filter=["groupId","description"],o.private=[!0,!1],o.description=e.form.value.search,i=e.groups}const n=yield i.list(o);if(n.ok)switch(e.form.value.type){case"app":e.options=n.result.map(s=>({id:s.appId,icon:s.icon,description:s.name}));break;case"user":e.options=n.result.map(s=>({id:s.userId,icon:s.picture,description:[s.name.first,s.name.last].join(" ")}));break;case"group":e.options=n.result.map(s=>({id:s.groupId,icon:"./assets/icons/icon-512x512.png",description:s.description}))}else e.options=[];e.searching=!1})()}setSearchValue(e){this.form.controls.id.setValue(e)}ngOnDestroy(){var e,o;null===(e=this.observers.form)||void 0===e||e.unsubscribe(),null===(o=this.observers.search)||void 0===o||o.unsubscribe()}ngAfterViewInit(){this.mode=this.config.mode;let e=this.config.accesor;"update"==this.config.mode&&(this.form.controls.id.setValue(null==e?void 0:e.id),this.form.controls.id.disable(),this.form.controls.type.setValue(null==e?void 0:e.type),this.form.controls.type.disable(),this.form.controls.role.setValue(null==e?void 0:e.role),this.form.controls.search.setValue(null==e?void 0:e.description),this.form.controls.search.disable()),this.observers.form=this.form.valueChanges.subscribe(o=>{this.errors=this.formerror.validateForm(this.form,this.errors,!0)}),this.observers.search=this.form.controls.search.valueChanges.subscribe(o=>{void 0!==o&&null!=o&&(null==o?void 0:o.length)>0?setTimeout(()=>this.search(),250):this.options=[]})}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(B.b),t.Y36(U.f),t.Y36(A.so),t.Y36(H.J),t.Y36(A.WI),t.Y36(q.J))},a.\u0275cmp=t.Xpm({type:a,selectors:[["subscribers-editor-dialog"]],decls:46,vars:16,consts:[["mat-icon-button","","mat-dialog-close",""],["for","subscriber editor"],["mode","indeterminate",4,"ngIf"],["fxLayout","row","fxLayoutAlign","center flex-start"],["fxFlex","60","fxFlex.lg","70","fxFlex.md","80","fxFlex.sm","90","fxFlex.xs","100",3,"formGroup","ngSubmit"],["appearance","outline"],["text-capitalize",""],["matInput","","type","text","placeholder","Start typing...","formControlName","search",3,"matAutocomplete"],["search","matAutocomplete"],[3,"value","click",4,"ngFor","ngForOf"],["name","type","placeholder","type","formControlName","type","required",""],["value","app"],["value","user"],["value","group"],[4,"ngIf"],["name","role","placeholder","role","formControlName","role","required",""],[3,"value"],["type","submit",2,"display","none"],["button",""],["type","button","mat-flat-button","","color","primary",3,"click"],["mode","indeterminate"],[3,"value","click"],[1,"autocomplete-item",3,"src"]],template:function(e,o){if(1&e){const i=t.EpF();t.TgZ(0,"mat-toolbar"),t.TgZ(1,"button",0),t.TgZ(2,"mat-icon"),t._uU(3," arrow_back "),t.qZA(),t.qZA(),t.TgZ(4,"label",1),t._uU(5),t.qZA(),t.qZA(),t.YNc(6,Ct,1,0,"mat-progress-bar",2),t.TgZ(7,"mat-content",3),t.TgZ(8,"form",4),t.NdJ("ngSubmit",function(){return!o.loading&&!o.form.invalid&&o.submit()}),t.TgZ(9,"mat-form-field",5),t.TgZ(10,"mat-label",6),t._uU(11),t.qZA(),t._UZ(12,"input",7),t.TgZ(13,"mat-autocomplete",null,8),t.YNc(15,Zt,3,3,"mat-option",9),t.ALo(16,"orderBy"),t.qZA(),t.qZA(),t.TgZ(17,"mat-form-field",5),t.TgZ(18,"mat-label"),t._uU(19," Type "),t.qZA(),t.TgZ(20,"mat-select",10),t.TgZ(21,"mat-option",11),t._uU(22," App "),t.qZA(),t.TgZ(23,"mat-option",12),t._uU(24," User "),t.qZA(),t.TgZ(25,"mat-option",13),t._uU(26," Group "),t.qZA(),t.qZA(),t.YNc(27,wt,2,1,"mat-error",14),t.qZA(),t.TgZ(28,"mat-form-field",5),t.TgZ(29,"mat-label"),t._uU(30," Role "),t.qZA(),t.TgZ(31,"mat-select",15),t.TgZ(32,"mat-option",16),t._uU(33," Read "),t.qZA(),t.TgZ(34,"mat-option",16),t._uU(35," Write "),t.qZA(),t.TgZ(36,"mat-option",16),t._uU(37," Read/Write "),t.qZA(),t.TgZ(38,"mat-option",16),t._uU(39," Admin "),t.qZA(),t.qZA(),t.YNc(40,xt,2,1,"mat-error",14),t.qZA(),t._UZ(41,"button",17,18),t.qZA(),t.qZA(),t.TgZ(43,"mat-footer"),t.TgZ(44,"button",19),t.NdJ("click",function(){return t.CHM(i),t.MAs(42).click()}),t._uU(45," Submit "),t.qZA(),t.qZA()}if(2&e){const i=t.MAs(14);t.xp6(5),t.AsE(" ","add"==o.mode?"Add Subscriber":""," ","update"==o.mode?"Edit Subscriber":""," "),t.xp6(1),t.Q6J("ngIf",o.loading),t.xp6(2),t.Q6J("formGroup",o.form),t.xp6(3),t.hij(" Search ",o.form.value.type," "),t.xp6(1),t.Q6J("matAutocomplete",i),t.xp6(3),t.Q6J("ngForOf",t.xi3(16,13,o.options,"description")),t.xp6(12),t.Q6J("ngIf",o.errors.type),t.xp6(5),t.Q6J("value",1),t.xp6(2),t.Q6J("value",2),t.xp6(2),t.Q6J("value",3),t.xp6(2),t.Q6J("value",4),t.xp6(2),t.Q6J("ngIf",o.errors.role)}},directives:[C.Ye,Z.lW,A.ZT,w.Hw,y.O5,x.pW,N.s,D.xw,D.Wh,m._Y,m.JL,D.yH,m.sg,_.KE,_.hX,V.Nt,m.Fj,z,m.JJ,m.u,bt,y.sg,g.ey,X,K.gD,m.Q7,_.TO,Mt.A],pipes:[St.T],styles:[""]}),a})();var Et=r(7046),Pt=r(2064),Ft=r(5607),M=r(1444),It=r(213),kt=r(649),R=r(6696),Rt=r(7563),Yt=r(8939),Lt=r(5167),Bt=r(7756);function Ut(a,l){1&a&&t._UZ(0,"mat-progress-bar",12)}function Ht(a,l){1&a&&t._UZ(0,"th",13)}function Nt(a,l){if(1&a&&(t.TgZ(0,"td",14),t._UZ(1,"mat-avatar",15),t.qZA()),2&a){const e=l.$implicit;t.xp6(1),t.Q6J("src",e.avatar)}}function Vt(a,l){1&a&&(t.TgZ(0,"th",13),t._uU(1," Description "),t.qZA())}function Jt(a,l){if(1&a&&(t.TgZ(0,"td",14),t._uU(1),t.qZA()),2&a){const e=l.$implicit;t.xp6(1),t.hij(" ",e.description," ")}}function Qt(a,l){1&a&&(t.TgZ(0,"th",13),t._uU(1," Type "),t.qZA())}function Wt(a,l){if(1&a&&(t.TgZ(0,"td",14),t.TgZ(1,"span"),t._uU(2),t.qZA(),t.qZA()),2&a){const e=l.$implicit;t.xp6(1),t.Tol(e.type),t.xp6(1),t.hij(" ",e.type," ")}}function Gt(a,l){1&a&&(t.TgZ(0,"th",13),t._uU(1," Role "),t.qZA())}function jt(a,l){if(1&a&&(t.TgZ(0,"td",14),t._uU(1),t.qZA()),2&a){const e=l.$implicit;t.xp6(1),t.xDo(" ",1==e.role?"Read":""," ",2==e.role?"Write":""," ",3==e.role?"Write/Read":""," ",4==e.role?"Admin":""," ",5==e.role?"Owner":""," ")}}function zt(a,l){1&a&&t._UZ(0,"tr",16)}function Xt(a,l){if(1&a){const e=t.EpF();t.TgZ(0,"tr",17),t.NdJ("click",function(){const n=t.CHM(e).$implicit;return t.oxw().options(n)}),t.qZA()}}const $=function(){return["avatar","description","type","role"]};let Kt=(()=>{class a{constructor(e,o,i,n,s,c,u,d,p,b,Y){this.apps=e,this.users=o,this.groups=i,this.tokens=n,this.dialog=s,this.toast=c,this.route=u,this.sheet=d,this.config=p,this.router=b,this.confirm=Y,this.id="unset",this.role=0,this.type="unset",this.table=new f.by,this.loading=!1,this.observers={}}get(){var e=this;return(0,h.Z)(function*(){e.loading=!0;let i,o={filter:["role","apps","users","groups"]};switch(e.type){case"app":i=e.apps,o.appId=e.id;break;case"group":i=e.groups,o.groupId=e.id;break;case"token":i=e.tokens,o.tokenId=e.id}const n=yield i.get(o);n.ok?(e.table.data=[],e.role=n.result.role,n.result.apps.map(s=>e.table.data.push({id:s.id,type:"app",role:s.role,avatar:"./assets/icons/icon-512x512.png",description:"-"})),n.result.users.map(s=>e.table.data.push({id:s.id,type:"user",role:s.role,avatar:"./assets/icons/icon-512x512.png",description:"-"})),n.result.groups.map(s=>e.table.data.push({id:s.id,type:"group",role:s.role,avatar:"./assets/icons/icon-512x512.png",description:"-"})),e.table.data=e.table.data.map(s=>new M.U(s))):e.toast.show(n.error.message),e.loading=!1})()}load(){var e=this;return(0,h.Z)(function*(){e.loading=!0;const o=yield e.apps.list({filter:["name","icon","appId"],appId:e.table.data.filter(s=>"app"==s.type).map(s=>s.id),private:[!0,!1]});o.ok?(e.apps.data=o.result.map(s=>new Et.g(s)),e.apps.data.map(s=>{for(let c=0;c<e.table.data.length;c++)e.table.data[c].id==s.appId&&"app"==e.table.data[c].type&&(e.table.data[c].avatar=s.icon,e.table.data[c].description=s.name)})):e.apps.data=[];const i=yield e.users.list({filter:["name","userId","picture"],userId:e.table.data.filter(s=>"user"==s.type).map(s=>s.id)});i.ok?(e.users.data=i.result.map(s=>new Pt.n(s)),e.users.data.map(s=>{for(let c=0;c<e.table.data.length;c++)e.table.data[c].id==s.userId&&"user"==e.table.data[c].type&&(e.table.data[c].avatar=s.picture,e.table.data[c].description=[s.name.first,s.name.last].join(" "))})):e.users.data=[];const n=yield e.groups.list({filter:["groupId","description"],groupId:e.table.data.filter(s=>"group"==s.type).map(s=>s.id),private:[!0,!1]});n.ok?(e.groups.data=n.result.map(s=>new Ft.Z(s)),e.groups.data.map(s=>{for(let c=0;c<e.table.data.length;c++)e.table.data[c].id==s.groupId&&"group"==e.table.data[c].type&&(e.table.data[c].avatar="./assets/group.png",e.table.data[c].description=s.description)})):e.groups.data=[],e.loading=!1})()}options(e){var o=this;return(0,h.Z)(function*(){let i={edit:!1,delete:!1,makeOwner:!1};var n;(o.role<4||o.role<=e.role)&&(i.edit=!0,i.delete=!0),(o.role<5||5==e.role||"user"!=e.type)&&(i.makeOwner=!0),o.sheet.show({role:o.role,title:e.description,options:[{icon:"edit",title:"Edit",handler:(n=(0,h.Z)(function*(){return o.editor("update",e)}),function(){return n.apply(this,arguments)}),disabled:i.edit?[o.role]:[]},{icon:"remove",title:"Unsubscribe",danger:!0,handler:function(){var n=(0,h.Z)(function*(){var s;o.confirm.show({message:"Are you sure you want to unsubscribe "+e.description+"?",handler:(s=(0,h.Z)(function*(){o.loading=!0;let u,c={id:e.id,type:e.type};switch(o.type){case"app":u=o.apps,c.appId=o.id;break;case"group":u=o.groups,c.groupId=o.id;break;case"token":u=o.tokens,c.tokenId=o.id}const d=yield u.unsubscribe(c);if(d.ok)if(d.result.updated>0){for(let p=0;p<o.table.data.length;p++)if(o.table.data[p].id==e.id&&o.table.data[p].type==e.type){o.table.data.splice(p,1);break}o.table.data=o.table.data.map(p=>new M.U(p))}else o.toast.show("Accesor was not unsubscribed from "+o.type+"!");else o.toast.show(d.error.message);o.loading=!1}),function(){return s.apply(this,arguments)})})});return function(){return n.apply(this,arguments)}}(),disabled:i.delete?[o.role]:[]},{icon:"vpn_key",title:"Make Owner",danger:!0,handler:function(){var n=(0,h.Z)(function*(){var s;o.confirm.show({message:"Are you sure you want to change ownership to "+e.description+"?",handler:(s=(0,h.Z)(function*(){o.loading=!0;let u,c={id:e.id,type:e.type};switch(o.type){case"app":u=o.apps,c.appId=o.id;break;case"group":u=o.groups,c.groupId=o.id;break;case"token":u=o.tokens,c.tokenId=o.id}const d=yield u.changeowner(c);if(d.ok)if(d.result.updated>0){o.table.data.map(p=>{5==p.role&&(p.role=4)});for(let p=0;p<o.table.data.length;p++)if(o.table.data[p].id==e.id&&o.table.data[p].type==e.type){o.table.data[p].role=5;break}o.table.data=o.table.data.map(p=>new M.U(p))}else o.toast.show("Accesor was not set as owner on "+o.type+"!");else o.toast.show(d.error.message);o.loading=!1}),function(){return s.apply(this,arguments)})})});return function(){return n.apply(this,arguments)}}(),disabled:i.makeOwner?[o.role]:[]}]})})()}editor(e,o){var i=this;return(0,h.Z)(function*(){yield(yield i.dialog.open(Dt,{data:{id:i.id,mode:e,type:i.type,accesor:o},panelClass:"fullscreen-dialog"})).afterClosed().subscribe(function(){var s=(0,h.Z)(function*(c){if(c){if("add"==e){i.loading=!0;let d,u={id:c.id,type:c.type,role:c.role};switch(i.type){case"app":d=i.apps,u.appId=i.id;break;case"group":d=i.groups,u.groupId=i.id;break;case"token":d=i.tokens,u.tokenId=i.id}const p=yield d.share(u);p.ok?p.result.updated>0?(i.table.data.push({id:c.id,type:c.type,role:c.role,avatar:"-",description:"-"}),yield i.load()):i.toast.show("Accesor was not added to "+i.type+"!"):i.toast.show(p.error.message),i.loading=!1}else{i.loading=!0;let d,u={id:c.id,type:c.type,role:c.role};switch(i.type){case"app":d=i.apps,u.appId=i.id;break;case"group":d=i.groups,u.groupId=i.id;break;case"token":d=i.tokens,u.tokenId=i.id}const p=yield d.updatesubscriber(u);if(p.ok){for(let b=0;b<i.table.data.length;b++)if(i.table.data[b].id==(null==o?void 0:o.id)&&i.table.data[b].type==(null==o?void 0:o.type)){i.table.data[b].role=c.role;break}}else i.toast.show(p.error.message);i.loading=!1}i.table.data=i.table.data.map(u=>new M.U(u))}});return function(c){return s.apply(this,arguments)}}())})()}ngOnInit(){var e=this;this.observers.loaded=this.config.loaded.subscribe(function(){var o=(0,h.Z)(function*(i){if(i){const n=e.route.snapshot.params;e.id=n.id,e.type=n.type,yield e.get(),yield e.load()}});return function(i){return o.apply(this,arguments)}}())}ngOnDestroy(){var e;null===(e=this.observers.loaded)||void 0===e||e.unsubscribe()}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(B.b),t.Y36(U.f),t.Y36(H.J),t.Y36(It.H),t.Y36(A.uw),t.Y36(kt.k),t.Y36(R.gz),t.Y36(Rt.I),t.Y36(Yt.E),t.Y36(R.F0),t.Y36(Lt.z))},a.\u0275cmp=t.Xpm({type:a,selectors:[["subscribers-page"]],decls:24,vars:7,consts:[["for","subscribers"],["mode","indeterminate",4,"ngIf"],["mat-table","",3,"dataSource"],["matColumnDef","avatar"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","description"],["matColumnDef","type"],["matColumnDef","role"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",3,"click",4,"matRowDef","matRowDefColumns"],["mat-fab","","color","primary",1,"add-floating-button",3,"click"],["mode","indeterminate"],["mat-header-cell",""],["mat-cell",""],[3,"src"],["mat-header-row",""],["mat-row","",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"mat-toolbar"),t._UZ(1,"mat-back-button"),t.TgZ(2,"label",0),t._uU(3," Subscribers "),t.qZA(),t.qZA(),t.YNc(4,Ut,1,0,"mat-progress-bar",1),t.TgZ(5,"mat-content"),t.TgZ(6,"table",2),t.ynx(7,3),t.YNc(8,Ht,1,0,"th",4),t.YNc(9,Nt,2,1,"td",5),t.BQk(),t.ynx(10,6),t.YNc(11,Vt,2,0,"th",4),t.YNc(12,Jt,2,1,"td",5),t.BQk(),t.ynx(13,7),t.YNc(14,Qt,2,0,"th",4),t.YNc(15,Wt,3,3,"td",5),t.BQk(),t.ynx(16,8),t.YNc(17,Gt,2,0,"th",4),t.YNc(18,jt,2,5,"td",5),t.BQk(),t.YNc(19,zt,1,0,"tr",9),t.YNc(20,Xt,1,0,"tr",10),t.qZA(),t.qZA(),t.TgZ(21,"button",11),t.NdJ("click",function(){return o.editor("add")}),t.TgZ(22,"mat-icon"),t._uU(23," add "),t.qZA(),t.qZA()),2&e&&(t.xp6(4),t.Q6J("ngIf",o.loading),t.xp6(2),t.Q6J("dataSource",o.table),t.xp6(13),t.Q6J("matHeaderRowDef",t.DdM(5,$))("matHeaderRowDefSticky",!0),t.xp6(1),t.Q6J("matRowDefColumns",t.DdM(6,$)))},directives:[C.Ye,Bt.x,y.O5,x.pW,N.s,f.BZ,f.w1,f.fO,f.ge,f.Dz,f.ev,X,f.as,f.XQ,f.nj,f.Gk,Z.lW,w.Hw],styles:[".mat-column-avatar[_ngcontent-%COMP%]{width:60px}span[_ngcontent-%COMP%]{padding:4px 8px;font-size:12px;border-radius:12px;background-color:#fafafa}span.app[_ngcontent-%COMP%]{color:#fff;background-color:#f44336}span.user[_ngcontent-%COMP%]{color:#fff;background-color:#4caf50}span.group[_ngcontent-%COMP%]{color:#fff;background-color:#2196f3}"]}),a})();var $t=r(7375);let qt=(()=>{class a{}return a.\u0275fac=function(e){return new(e||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[[y.ez]]}),a})();var te=r(2217),ee=r(2604),oe=r(2155),ie=r(4274),ae=r(1065),se=r(5896);const ne=[{path:":type/:id",component:Kt}];let re=(()=>{class a{}return a.\u0275fac=function(e){return new(e||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[[m.u5,y.ez,w.Ps,f.p0,V.c,A.Is,qt,Z.ot,te.l,K.LD,$t.M,ee.o,ie.X,C.g0,oe.o9,ae.w,_.lN,se.n,m.UX,x.Cv,Ot,R.Bz.forChild(ne)]]}),a})()}}]);