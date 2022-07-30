"use strict";(self.webpackChunkauth=self.webpackChunkauth||[]).push([[761],{5612:(R,O,n)=>{n.d(O,{G:()=>E});var a=n(9808),f=n(5245),p=n(7544),s=n(7423),m=n(5e3);let E=(()=>{class r{}return r.\u0275fac=function(_){return new(_||r)},r.\u0275mod=m.oAB({type:r}),r.\u0275inj=m.cJS({imports:[[a.ez,f.Ps,p.g,s.ot]]}),r})()},5277:(R,O,n)=>{n.d(O,{v:()=>E});var a=n(5e3),f=n(9922),p=n(7423),s=n(5245),m=n(7544);let E=(()=>{class r{constructor(_){this.menu=_,this.badge=0,this.observers={}}ngOnInit(){this.observers.badge=this.menu.badge.subscribe(_=>{this.badge=0,Object.keys(_).map(g=>{this.badge+=_[g]})})}ngOnDestroy(){this.observers.badge.unsubscribe()}}return r.\u0275fac=function(_){return new(_||r)(a.Y36(f.h))},r.\u0275cmp=a.Xpm({type:r,selectors:[["mat-menu-button"]],decls:3,vars:1,consts:[["mat-icon-button","",3,"click"],["matBadge","priority_high","matBadgeSize","medium","matBadgeColor","warn",3,"matBadgeHidden"]],template:function(_,g){1&_&&(a.TgZ(0,"button",0),a.NdJ("click",function(){return g.menu.toggle()}),a.TgZ(1,"mat-icon",1),a._uU(2," menu "),a.qZA(),a.qZA()),2&_&&(a.xp6(1),a.Q6J("matBadgeHidden",0==g.badge))},directives:[p.lW,s.Hw,m.k],styles:["mat-menu-button .mat-badge-content{font-weight:500!important;font-family:Material Icons}\n"],encapsulation:2}),r})()},7238:(R,O,n)=>{n.d(O,{gM:()=>H,AV:()=>Z});var a=n(9776),f=n(5664),p=n(9808),s=n(5e3),m=n(508),E=n(4115),r=n(3191),v=n(1159),_=n(5113),g=n(925),L=n(7429),A=n(7579),y=n(2722),Y=n(5698),h=n(1777),U=n(226);const K={tooltipState:(0,h.X$)("state",[(0,h.SB)("initial, void, hidden",(0,h.oB)({opacity:0,transform:"scale(0)"})),(0,h.SB)("visible",(0,h.oB)({transform:"scale(1)"})),(0,h.eR)("* => visible",(0,h.jt)("200ms cubic-bezier(0, 0, 0.2, 1)",(0,h.F4)([(0,h.oB)({opacity:0,transform:"scale(0)",offset:0}),(0,h.oB)({opacity:.5,transform:"scale(0.99)",offset:.5}),(0,h.oB)({opacity:1,transform:"scale(1)",offset:1})]))),(0,h.eR)("* => hidden",(0,h.jt)("100ms cubic-bezier(0, 0, 0.2, 1)",(0,h.oB)({opacity:0})))])},B="tooltip-panel",w=(0,g.i$)({passive:!0}),S=new s.OlP("mat-tooltip-scroll-strategy"),N={provide:S,deps:[a.aV],useFactory:function(o){return()=>o.scrollStrategies.reposition({scrollThrottle:20})}},F=new s.OlP("mat-tooltip-default-options",{providedIn:"root",factory:function(){return{showDelay:0,hideDelay:0,touchendHideDelay:1500}}});let V=(()=>{class o{constructor(t,e,i,d,l,T,M,b,I,D,u,C){this._overlay=t,this._elementRef=e,this._scrollDispatcher=i,this._viewContainerRef=d,this._ngZone=l,this._platform=T,this._ariaDescriber=M,this._focusMonitor=b,this._dir=D,this._defaultOptions=u,this._position="below",this._disabled=!1,this._viewInitialized=!1,this._pointerExitEventsInitialized=!1,this._viewportMargin=8,this._cssClassPrefix="mat",this._showDelay=this._defaultOptions.showDelay,this._hideDelay=this._defaultOptions.hideDelay,this.touchGestures="auto",this._message="",this._passiveListeners=[],this._destroyed=new A.x,this._handleKeydown=P=>{this._isTooltipVisible()&&P.keyCode===v.hY&&!(0,v.Vb)(P)&&(P.preventDefault(),P.stopPropagation(),this._ngZone.run(()=>this.hide(0)))},this._scrollStrategy=I,this._document=C,u&&(u.position&&(this.position=u.position),u.touchGestures&&(this.touchGestures=u.touchGestures)),D.change.pipe((0,y.R)(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)}),l.runOutsideAngular(()=>{e.nativeElement.addEventListener("keydown",this._handleKeydown)})}get position(){return this._position}set position(t){var e;t!==this._position&&(this._position=t,this._overlayRef&&(this._updatePosition(this._overlayRef),null===(e=this._tooltipInstance)||void 0===e||e.show(0),this._overlayRef.updatePosition()))}get disabled(){return this._disabled}set disabled(t){this._disabled=(0,r.Ig)(t),this._disabled?this.hide(0):this._setupPointerEnterEventsIfNeeded()}get showDelay(){return this._showDelay}set showDelay(t){this._showDelay=(0,r.su)(t)}get hideDelay(){return this._hideDelay}set hideDelay(t){this._hideDelay=(0,r.su)(t)}get message(){return this._message}set message(t){this._ariaDescriber.removeDescription(this._elementRef.nativeElement,this._message,"tooltip"),this._message=null!=t?String(t).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage(),this._ngZone.runOutsideAngular(()=>{Promise.resolve().then(()=>{this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")})}))}get tooltipClass(){return this._tooltipClass}set tooltipClass(t){this._tooltipClass=t,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe((0,y.R)(this._destroyed)).subscribe(t=>{t?"keyboard"===t&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){const t=this._elementRef.nativeElement;clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),t.removeEventListener("keydown",this._handleKeydown),this._passiveListeners.forEach(([e,i])=>{t.removeEventListener(e,i,w)}),this._passiveListeners.length=0,this._destroyed.next(),this._destroyed.complete(),this._ariaDescriber.removeDescription(t,this.message,"tooltip"),this._focusMonitor.stopMonitoring(t)}show(t=this.showDelay){if(this.disabled||!this.message||this._isTooltipVisible()&&!this._tooltipInstance._showTimeoutId&&!this._tooltipInstance._hideTimeoutId)return;const e=this._createOverlay();this._detach(),this._portal=this._portal||new L.C5(this._tooltipComponent,this._viewContainerRef),this._tooltipInstance=e.attach(this._portal).instance,this._tooltipInstance.afterHidden().pipe((0,y.R)(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),this._tooltipInstance.show(t)}hide(t=this.hideDelay){this._tooltipInstance&&this._tooltipInstance.hide(t)}toggle(){this._isTooltipVisible()?this.hide():this.show()}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(){if(this._overlayRef)return this._overlayRef;const t=this._scrollDispatcher.getAncestorScrollContainers(this._elementRef),e=this._overlay.position().flexibleConnectedTo(this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(t);return e.positionChanges.pipe((0,y.R)(this._destroyed)).subscribe(i=>{this._updateCurrentPositionClass(i.connectionPair),this._tooltipInstance&&i.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=this._overlay.create({direction:this._dir,positionStrategy:e,panelClass:`${this._cssClassPrefix}-${B}`,scrollStrategy:this._scrollStrategy()}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe((0,y.R)(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe((0,y.R)(this._destroyed)).subscribe(()=>{var i;return null===(i=this._tooltipInstance)||void 0===i?void 0:i._handleBodyInteraction()}),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(t){const e=t.getConfig().positionStrategy,i=this._getOrigin(),d=this._getOverlayPosition();e.withPositions([this._addOffset(Object.assign(Object.assign({},i.main),d.main)),this._addOffset(Object.assign(Object.assign({},i.fallback),d.fallback))])}_addOffset(t){return t}_getOrigin(){const t=!this._dir||"ltr"==this._dir.value,e=this.position;let i;"above"==e||"below"==e?i={originX:"center",originY:"above"==e?"top":"bottom"}:"before"==e||"left"==e&&t||"right"==e&&!t?i={originX:"start",originY:"center"}:("after"==e||"right"==e&&t||"left"==e&&!t)&&(i={originX:"end",originY:"center"});const{x:d,y:l}=this._invertPosition(i.originX,i.originY);return{main:i,fallback:{originX:d,originY:l}}}_getOverlayPosition(){const t=!this._dir||"ltr"==this._dir.value,e=this.position;let i;"above"==e?i={overlayX:"center",overlayY:"bottom"}:"below"==e?i={overlayX:"center",overlayY:"top"}:"before"==e||"left"==e&&t||"right"==e&&!t?i={overlayX:"end",overlayY:"center"}:("after"==e||"right"==e&&t||"left"==e&&!t)&&(i={overlayX:"start",overlayY:"center"});const{x:d,y:l}=this._invertPosition(i.overlayX,i.overlayY);return{main:i,fallback:{overlayX:d,overlayY:l}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),this._ngZone.onMicrotaskEmpty.pipe((0,Y.q)(1),(0,y.R)(this._destroyed)).subscribe(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()}))}_setTooltipClass(t){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=t,this._tooltipInstance._markForCheck())}_invertPosition(t,e){return"above"===this.position||"below"===this.position?"top"===e?e="bottom":"bottom"===e&&(e="top"):"end"===t?t="start":"start"===t&&(t="end"),{x:t,y:e}}_updateCurrentPositionClass(t){const{overlayY:e,originX:i,originY:d}=t;let l;if(l="center"===e?this._dir&&"rtl"===this._dir.value?"end"===i?"left":"right":"start"===i?"left":"right":"bottom"===e&&"top"===d?"above":"below",l!==this._currentPosition){const T=this._overlayRef;if(T){const M=`${this._cssClassPrefix}-${B}-`;T.removePanelClass(M+this._currentPosition),T.addPanelClass(M+l)}this._currentPosition=l}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._passiveListeners.length||(this._platformSupportsMouseEvents()?this._passiveListeners.push(["mouseenter",()=>{this._setupPointerExitEventsIfNeeded(),this.show()}]):"off"!==this.touchGestures&&(this._disableNativeGesturesIfNecessary(),this._passiveListeners.push(["touchstart",()=>{this._setupPointerExitEventsIfNeeded(),clearTimeout(this._touchstartTimeout),this._touchstartTimeout=setTimeout(()=>this.show(),500)}])),this._addListeners(this._passiveListeners))}_setupPointerExitEventsIfNeeded(){if(this._pointerExitEventsInitialized)return;this._pointerExitEventsInitialized=!0;const t=[];if(this._platformSupportsMouseEvents())t.push(["mouseleave",()=>this.hide()],["wheel",e=>this._wheelListener(e)]);else if("off"!==this.touchGestures){this._disableNativeGesturesIfNecessary();const e=()=>{clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions.touchendHideDelay)};t.push(["touchend",e],["touchcancel",e])}this._addListeners(t),this._passiveListeners.push(...t)}_addListeners(t){t.forEach(([e,i])=>{this._elementRef.nativeElement.addEventListener(e,i,w)})}_platformSupportsMouseEvents(){return!this._platform.IOS&&!this._platform.ANDROID}_wheelListener(t){if(this._isTooltipVisible()){const e=this._document.elementFromPoint(t.clientX,t.clientY),i=this._elementRef.nativeElement;e!==i&&!i.contains(e)&&this.hide()}}_disableNativeGesturesIfNecessary(){const t=this.touchGestures;if("off"!==t){const e=this._elementRef.nativeElement,i=e.style;("on"===t||"INPUT"!==e.nodeName&&"TEXTAREA"!==e.nodeName)&&(i.userSelect=i.msUserSelect=i.webkitUserSelect=i.MozUserSelect="none"),("on"===t||!e.draggable)&&(i.webkitUserDrag="none"),i.touchAction="none",i.webkitTapHighlightColor="transparent"}}}return o.\u0275fac=function(t){s.$Z()},o.\u0275dir=s.lG2({type:o,inputs:{position:["matTooltipPosition","position"],disabled:["matTooltipDisabled","disabled"],showDelay:["matTooltipShowDelay","showDelay"],hideDelay:["matTooltipHideDelay","hideDelay"],touchGestures:["matTooltipTouchGestures","touchGestures"],message:["matTooltip","message"],tooltipClass:["matTooltipClass","tooltipClass"]}}),o})(),H=(()=>{class o extends V{constructor(t,e,i,d,l,T,M,b,I,D,u,C){super(t,e,i,d,l,T,M,b,I,D,u,C),this._tooltipComponent=j}}return o.\u0275fac=function(t){return new(t||o)(s.Y36(a.aV),s.Y36(s.SBq),s.Y36(E.mF),s.Y36(s.s_b),s.Y36(s.R0b),s.Y36(g.t4),s.Y36(f.$s),s.Y36(f.tE),s.Y36(S),s.Y36(U.Is,8),s.Y36(F,8),s.Y36(p.K0))},o.\u0275dir=s.lG2({type:o,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-tooltip-trigger"],exportAs:["matTooltip"],features:[s.qOj]}),o})(),X=(()=>{class o{constructor(t){this._changeDetectorRef=t,this._visibility="initial",this._closeOnInteraction=!1,this._onHide=new A.x}show(t){clearTimeout(this._hideTimeoutId),this._closeOnInteraction=!0,this._showTimeoutId=setTimeout(()=>{this._visibility="visible",this._showTimeoutId=void 0,this._onShow(),this._markForCheck()},t)}hide(t){clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._visibility="hidden",this._hideTimeoutId=void 0,this._markForCheck()},t)}afterHidden(){return this._onHide}isVisible(){return"visible"===this._visibility}ngOnDestroy(){clearTimeout(this._showTimeoutId),clearTimeout(this._hideTimeoutId),this._onHide.complete()}_animationStart(){this._closeOnInteraction=!1}_animationDone(t){const e=t.toState;"hidden"===e&&!this.isVisible()&&this._onHide.next(),("visible"===e||"hidden"===e)&&(this._closeOnInteraction=!0)}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_onShow(){}}return o.\u0275fac=function(t){return new(t||o)(s.Y36(s.sBO))},o.\u0275dir=s.lG2({type:o}),o})(),j=(()=>{class o extends X{constructor(t,e){super(t),this._breakpointObserver=e,this._isHandset=this._breakpointObserver.observe(_.u3.Handset)}}return o.\u0275fac=function(t){return new(t||o)(s.Y36(s.sBO),s.Y36(_.Yg))},o.\u0275cmp=s.Xpm({type:o,selectors:[["mat-tooltip-component"]],hostAttrs:["aria-hidden","true"],hostVars:2,hostBindings:function(t,e){2&t&&s.Udp("zoom","visible"===e._visibility?1:null)},features:[s.qOj],decls:3,vars:7,consts:[[1,"mat-tooltip",3,"ngClass"]],template:function(t,e){if(1&t&&(s.TgZ(0,"div",0),s.NdJ("@state.start",function(){return e._animationStart()})("@state.done",function(d){return e._animationDone(d)}),s.ALo(1,"async"),s._uU(2),s.qZA()),2&t){let i;s.ekj("mat-tooltip-handset",null==(i=s.lcZ(1,5,e._isHandset))?null:i.matches),s.Q6J("ngClass",e.tooltipClass)("@state",e._visibility),s.xp6(2),s.Oqu(e.message)}},directives:[p.mk],pipes:[p.Ov],styles:[".mat-tooltip-panel{pointer-events:none !important}.mat-tooltip{color:#fff;border-radius:4px;margin:14px;max-width:250px;padding-left:8px;padding-right:8px;overflow:hidden;text-overflow:ellipsis}.cdk-high-contrast-active .mat-tooltip{outline:solid 1px}.mat-tooltip-handset{margin:24px;padding-left:16px;padding-right:16px}\n"],encapsulation:2,data:{animation:[K.tooltipState]},changeDetection:0}),o})(),Z=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=s.oAB({type:o}),o.\u0275inj=s.cJS({providers:[N],imports:[[f.rt,p.ez,a.U8,m.BQ],m.BQ,E.ZD]}),o})()}}]);