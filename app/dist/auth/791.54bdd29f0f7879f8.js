"use strict";(self.webpackChunkauth=self.webpackChunkauth||[]).push([[791],{4791:(I,u,e)=>{e.r(u),e.d(u,{AllowAccessPageModule:()=>T});var c=e(5861),r=e(2340),t=e(5e3),h=e(649),l=e(6696),v=e(213),y=e(8939),P=e(4602),A=e(7635),w=e(8863),d=e(7093),g=e(9224),p=e(9808),m=e(7423),f=e(5899);function b(a,i){1&a&&t._UZ(0,"mat-progress-bar",9)}let x=(()=>{class a{constructor(n,o,s,N,U,Y,k){this.toast=n,this.route=o,this.tokens=s,this.router=N,this.config=U,this.account=Y,this.localstorage=k,this.app={icon:r.N.icon,name:r.N.name,privacyPolicy:r.N.privacyPolicy,termsAndConditions:r.N.termsAndConditions},this.loading=!1,this.observers={}}back(){return(0,c.Z)(function*(){window.history.back()})()}submit(){var n=this;return(0,c.Z)(function*(){n.loading=!0;const o=yield n.tokens.generate({appId:r.N.appId,expiry:new Date((new Date).setFullYear((new Date).getFullYear()+1)),description:r.N.name});o.ok?(n.url=[n.returl,"?email=",o.result.email,"&userId=",o.result.userId,"&tokenId=",o.result.tokenId].join(""),window.open(n.url,"_parent")):n.toast.show(o.error.message),n.loading=!1})()}switch(){var n=this;return(0,c.Z)(function*(){n.localstorage.clear(),n.router.navigate(["/signin"],{queryParams:{allowaccess:!0},queryParamsHandling:"merge"})})()}process(){var n=this;return(0,c.Z)(function*(){(yield n.account.validate())||n.router.navigate(["/signin"],{queryParams:{allowaccess:!0},queryParamsHandling:"merge"})})()}ngOnInit(){var n=this;this.observers.config=this.config.loaded.subscribe(function(){var o=(0,c.Z)(function*(s){s&&(n.app.icon=r.N.icon,n.app.name=r.N.name,n.app.privacyPolicy=r.N.privacyPolicy,n.app.termsAndConditions=r.N.termsAndConditions,void 0!==n.route.snapshot.queryParams.returl&&null!=n.route.snapshot.queryParams.returl?(n.returl=n.route.snapshot.queryParams.returl,yield n.process()):(yield window.alert("Please supply a return url in the query params of your request!"),window.history.back()))});return function(s){return o.apply(this,arguments)}}())}ngOnDestroy(){var n;null===(n=this.observers.config)||void 0===n||n.unsubscribe()}}return a.\u0275fac=function(n){return new(n||a)(t.Y36(h.k),t.Y36(l.gz),t.Y36(v.H),t.Y36(l.F0),t.Y36(y.E),t.Y36(P.B),t.Y36(A.n))},a.\u0275cmp=t.Xpm({type:a,selectors:[["allow-access-page"]],decls:20,vars:6,consts:[["fxLayout","column","fxLayoutAlign","center center"],["mode","indeterminate",4,"ngIf"],[1,"icon"],[1,"button-footer"],["type","button","mat-stroked-button","","color","primary",3,"click"],["type","button","mat-flat-button","","color","primary",3,"click"],[1,"row-below-card"],["href","https://www.bitid.co.za","target","_blank"],["target","_blank",3,"href"],["mode","indeterminate"]],template:function(n,o){1&n&&(t.TgZ(0,"mat-content",0),t.TgZ(1,"mat-card"),t.YNc(2,b,1,0,"mat-progress-bar",1),t._UZ(3,"div",2),t.TgZ(4,"h1"),t._uU(5," Grant Access "),t.qZA(),t.TgZ(6,"p"),t._uU(7),t.qZA(),t.TgZ(8,"div",3),t.TgZ(9,"button",4),t.NdJ("click",function(){return o.switch()}),t._uU(10," Switch Account "),t.qZA(),t.TgZ(11,"button",5),t.NdJ("click",function(){return o.submit()}),t._uU(12," Next "),t.qZA(),t.qZA(),t.TgZ(13,"div",6),t.TgZ(14,"a",7),t._uU(15," Powered by biTid "),t.qZA(),t.TgZ(16,"a",8),t._uU(17," Privacy Policy "),t.qZA(),t.TgZ(18,"a",8),t._uU(19," Terms & Conditions "),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&n&&(t.xp6(2),t.Q6J("ngIf",o.loading),t.xp6(1),t.Udp("background-image","url("+o.app.icon+")"),t.xp6(4),t.hij(" to continue to ",o.app.name," "),t.xp6(9),t.Q6J("href",o.app.privacyPolicy,t.LSH),t.xp6(2),t.Q6J("href",o.app.termsAndConditions,t.LSH))},directives:[w.s,d.xw,d.Wh,g.a8,p.O5,m.lW,f.pW],styles:["mat-card[_ngcontent-%COMP%]{width:calc(100% - 48px);max-width:400px}mat-card[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%]{top:0px;left:0px;right:0px;position:absolute;border-top-left-radius:4px;border-top-right-radius:4px}mat-card[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{width:100px;height:100px;margin:8px auto;display:block;background-size:cover;background-repeat:no-repeat;background-position:center center}mat-card[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], mat-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:8px!important;text-align:center}mat-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px}mat-card[_ngcontent-%COMP%]   .button-footer[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between}mat-card[_ngcontent-%COMP%]   .button-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:calc(50% - 8px)}mat-card[_ngcontent-%COMP%]   .row-below-card[_ngcontent-%COMP%]{top:calc(100% + 8px);left:0px;right:0px;height:10px;display:flex;padding:0 16px;position:absolute;flex-direction:row;justify-content:space-between}mat-card[_ngcontent-%COMP%]   .row-below-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#9e9e9e;font-size:12px;font-weight:500;text-decoration:none}mat-card[_ngcontent-%COMP%]   .row-below-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#3f51b5;text-decoration:underline}"]}),a})();var C=e(4594),Z=e(4274),M=e(2155);const O=[{path:"",component:x}];let T=(()=>{class a{}return a.\u0275fac=function(n){return new(n||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[[p.ez,g.QW,m.ot,C.g0,Z.X,M.o9,f.Cv,l.Bz.forChild(O)]]}),a})()}}]);