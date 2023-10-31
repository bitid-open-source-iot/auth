"use strict";(self.webpackChunkauth=self.webpackChunkauth||[]).push([[983],{7983:(Le,N,n)=>{n.r(N),n.d(N,{AppsPageModule:()=>je});var c=n(5861),h=n(4847),p=n(4999),x=n(7046),a=n(3075),q=n(8966),e=n(5e3),D=n(2109),v=n(4594),A=n(7423),T=n(5245),g=n(9808),_=n(5899),y=n(8863),d=n(7322),b=n(4107),C=n(508),w=n(4080);function S(o,s){1&o&&e._UZ(0,"mat-progress-bar",11)}function M(o,s){if(1&o&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.hij(" ",t.errors.private," ")}}let H=(()=>{class o{constructor(t,r,i){this.dialog=t,this.config=r,this.formerror=i,this.form=new a.cw({private:new a.NI([])}),this.errors={private:""},this.loading=!1,this.observers={}}load(){var t=this;return(0,c.Z)(function*(){t.loading=!0,void 0!==t.config.private&&null!=t.config.private&&t.form.controls.private.setValue(t.config.private),t.loading=!1})()}close(){var t=this;return(0,c.Z)(function*(){t.dialog.close(!1)})()}submit(){var t=this;return(0,c.Z)(function*(){t.dialog.close(t.form.value)})()}ngOnInit(){this.observers.form=this.form.valueChanges.subscribe(t=>{this.errors=this.formerror.validateForm(this.form,this.errors,!0)}),this.load()}ngOnDestroy(){var t;null===(t=this.observers.form)||void 0===t||t.unsubscribe()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(q.so),e.Y36(q.WI),e.Y36(D.J))},o.\u0275cmp=e.Xpm({type:o,selectors:[["apps-filter-dialog"]],decls:23,vars:5,consts:[["for","filter apps"],["mat-icon-button","",3,"click"],["mode","indeterminate",4,"ngIf"],[3,"formGroup","ngSubmit"],["appearance","outline"],["name","private","formControlName","private","multiple",""],[3,"value"],[4,"ngIf"],["type","submit",2,"display","none"],["button",""],["type","button","color","primary","mat-flat-button","",3,"click"],["mode","indeterminate"]],template:function(t,r){if(1&t){const i=e.EpF();e.TgZ(0,"mat-toolbar"),e.TgZ(1,"label",0),e._uU(2," Filter Apps "),e.qZA(),e.TgZ(3,"button",1),e.NdJ("click",function(){return r.close()}),e.TgZ(4,"mat-icon"),e._uU(5," close "),e.qZA(),e.qZA(),e.qZA(),e.YNc(6,S,1,0,"mat-progress-bar",2),e.TgZ(7,"mat-content"),e.TgZ(8,"form",3),e.NdJ("ngSubmit",function(){return!r.loading&&!r.form.invalid&&r.submit()}),e.TgZ(9,"mat-form-field",4),e.TgZ(10,"mat-label"),e._uU(11," Access Mode "),e.qZA(),e.TgZ(12,"mat-select",5),e.TgZ(13,"mat-option",6),e._uU(14," Public "),e.qZA(),e.TgZ(15,"mat-option",6),e._uU(16," Private "),e.qZA(),e.qZA(),e.YNc(17,M,2,1,"mat-error",7),e.qZA(),e._UZ(18,"button",8,9),e.qZA(),e.qZA(),e.TgZ(20,"mat-footer"),e.TgZ(21,"button",10),e.NdJ("click",function(){return e.CHM(i),e.MAs(19).click()}),e._uU(22," Apply "),e.qZA(),e.qZA()}2&t&&(e.xp6(6),e.Q6J("ngIf",r.loading),e.xp6(2),e.Q6J("formGroup",r.form),e.xp6(5),e.Q6J("value",!1),e.xp6(2),e.Q6J("value",!0),e.xp6(2),e.Q6J("ngIf",r.errors.private))},directives:[v.Ye,A.lW,T.Hw,g.O5,_.pW,y.s,a._Y,a.JL,a.sg,d.KE,d.hX,b.gD,a.JJ,a.u,C.ey,d.TO,w.A],styles:[".filter-dialog{width:500px!important}.filter-dialog .mat-dialog-container{padding:0!important}@media screen and (max-width: 600px){.filter-dialog .mat-dialog-container{inset:0;z-index:5000;position:fixed;border-radius:0}}\n"],encapsulation:2}),o})();var P=n(3065),J=n(649),Y=n(8939),V=n(7563),Z=n(6696),j=n(8188),z=n(5167),Q=n(5358),G=n(7635),R=n(5277),f=n(6688),L=n(3322),I=n(4449);function B(o,s){1&o&&e._UZ(0,"mat-progress-bar",17)}function $(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"mat-chip",20),e.NdJ("removed",function(){const l=e.CHM(t).$implicit;return e.oxw(2).unfilter("private",l)}),e.TgZ(1,"mat-icon"),e._uU(2),e.qZA(),e.TgZ(3,"mat-label"),e._uU(4),e.qZA(),e.TgZ(5,"mat-icon",21),e._uU(6," cancel "),e.qZA(),e.qZA()}if(2&o){const t=s.$implicit;e.xp6(2),e.hij(" ",t?"vpn_lock":"public"," "),e.xp6(2),e.hij(" ",t?"Private":"Public"," ")}}function X(o,s){if(1&o&&(e.TgZ(0,"mat-chip-list",18),e.YNc(1,$,7,2,"mat-chip",19),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Q6J("ngForOf",t.filter.private)}}function W(o,s){1&o&&(e.TgZ(0,"th",22),e._uU(1," Icon "),e.qZA())}function K(o,s){if(1&o&&(e.TgZ(0,"td",23),e._UZ(1,"img",24),e.qZA()),2&o){const t=s.$implicit;e.xp6(1),e.Q6J("src",t.icon,e.LSH)("alt",t.name)}}function ee(o,s){1&o&&(e.TgZ(0,"th",25),e._uU(1," Name "),e.qZA())}function te(o,s){if(1&o&&(e.TgZ(0,"td",23),e._uU(1),e.qZA()),2&o){const t=s.$implicit;e.xp6(1),e.hij(" ",t.name," ")}}function re(o,s){1&o&&(e.TgZ(0,"th",25),e._uU(1," Access Mode "),e.qZA())}function oe(o,s){if(1&o&&(e.TgZ(0,"td",23),e._uU(1),e.qZA()),2&o){const t=s.$implicit;e.xp6(1),e.hij(" ",t.private?"Private":"Public"," ")}}function ie(o,s){1&o&&e._UZ(0,"tr",26)}function ae(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"tr",27),e.NdJ("click",function(){const l=e.CHM(t).$implicit;return e.oxw().options(l)}),e.qZA()}}function ne(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"mat-list-item",28),e.NdJ("click",function(){const l=e.CHM(t).$implicit;return e.oxw().options(l)}),e._UZ(1,"img",29),e.TgZ(2,"mat-label"),e.TgZ(3,"h3"),e._uU(4),e.qZA(),e.qZA(),e.qZA()}if(2&o){const t=s.$implicit;e.xp6(1),e.Q6J("src",t.icon,e.LSH)("alt",t.name),e.xp6(3),e.hij(" ",t.name," ")}}const O=function(){return["icon","name","private"]},se=function(){return{mode:"add"}};let le=(()=>{class o{constructor(t,r,i,l,m,u,ze,Ge,Re){this.toast=t,this.config=r,this.dialog=i,this.sheet=l,this.router=m,this.filters=u,this.confirm=ze,this.service=Ge,this.localstorage=Re,this.sort=new h.YE,this.apps=new p.by,this.filter=this.filters.get({private:[]}),this.columns=["icon","name","private","options"],this.loading=!1,this.observers={}}list(){var t=this;return(0,c.Z)(function*(){t.loading=!0;const r=yield t.service.list({filter:["icon","role","name","appId","private"],private:t.filter.private});t.apps.data=r.ok?r.result.map(i=>new x.g(i)):[],t.loading=!1})()}unfilter(t,r){this.filter[t]=this.filter[t].filter(i=>i!=r),this.filters.update(this.filter),this.list()}options(t){var r=this;return(0,c.Z)(function*(){var i;r.sheet.show({role:t.role,title:t.name,options:[{icon:"edit",title:"Edit",handler:(i=(0,c.Z)(function*(){r.router.navigate(["/apps","editor"],{queryParams:{mode:"update",appId:t.appId}})}),function(){return i.apply(this,arguments)}),disabled:[0,1]},{icon:"content_copy",title:"Copy",handler:function(){var i=(0,c.Z)(function*(){r.router.navigate(["/apps","editor"],{queryParams:{mode:"copy",appId:t.appId}})});return function(){return i.apply(this,arguments)}}(),disabled:[0,1]},{icon:"people",title:"Subscribers",handler:function(){var i=(0,c.Z)(function*(){r.router.navigate(["/subscribers","app",t.appId])});return function(){return i.apply(this,arguments)}}(),disabled:[0,1,2,3]},{icon:"remove",title:"Unubscribe",danger:!0,handler:function(){var i=(0,c.Z)(function*(){var l;r.confirm.show({message:"Are you sure you want to unsubscribe from "+t.name+"?",handler:(l=(0,c.Z)(function*(){r.loading=!0;const m=yield r.service.unsubscribe({id:r.localstorage.get("userId"),type:"user",appId:t.appId});if(m.ok){for(let u=0;u<r.apps.data.length;u++)if(r.apps.data[u].appId==t.appId){r.apps.data.splice(u,1),r.toast.show("You were unsubscribed!");break}r.apps.data=r.apps.data.map(u=>new x.g(u))}else r.toast.show(m.error.message);r.loading=!1}),function(){return l.apply(this,arguments)})})});return function(){return i.apply(this,arguments)}}(),disabled:[0,5]},{icon:"delete",title:"Delete",danger:!0,handler:function(){var i=(0,c.Z)(function*(){var l;r.confirm.show({message:"Are you sure you want to delete "+t.name+"?",handler:(l=(0,c.Z)(function*(){r.loading=!0;const m=yield r.service.delete({appId:t.appId});if(m.ok){for(let u=0;u<r.apps.data.length;u++)if(r.apps.data[u].appId==t.appId){r.apps.data.splice(u,1),r.toast.show("App was removed!");break}r.apps.data=r.apps.data.map(u=>new x.g(u))}else r.toast.show(m.error.message);r.loading=!1}),function(){return l.apply(this,arguments)})})});return function(){return i.apply(this,arguments)}}(),disabled:[0,1,2,3,4]}]})})()}OpenFilter(){var t=this;return(0,c.Z)(function*(){yield(yield t.dialog.open(H,{data:t.filter,panelClass:"filter-dialog"})).afterClosed().subscribe(function(){var i=(0,c.Z)(function*(l){l&&(Object.keys(l).map(m=>{t.filter[m]=l[m]}),t.filters.update(t.filter),t.list())});return function(l){return i.apply(this,arguments)}}())})()}ngOnInit(){var r,t=this;this.apps.sort=this.sort,this.apps.sort.active="name",this.apps.sort.direction="asc",this.observers.loaded=this.config.loaded.subscribe(function(){var i=(0,c.Z)(function*(l){l&&(yield t.list())});return function(l){return i.apply(this,arguments)}}()),this.observers.search=null===(r=this.search)||void 0===r?void 0:r.change.subscribe(i=>{this.apps.filter=i})}ngOnDestroy(){var t,r;null===(t=this.observers.loaded)||void 0===t||t.unsubscribe(),null===(r=this.observers.search)||void 0===r||r.unsubscribe()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(J.k),e.Y36(Y.E),e.Y36(q.uw),e.Y36(V.I),e.Y36(Z.F0),e.Y36(j.q),e.Y36(z.z),e.Y36(Q.b),e.Y36(G.n))},o.\u0275cmp=e.Xpm({type:o,selectors:[["apps-page"]],viewQuery:function(t,r){if(1&t&&(e.Gf(h.YE,7),e.Gf(P.g,7)),2&t){let i;e.iGM(i=e.CRH())&&(r.sort=i.first),e.iGM(i=e.CRH())&&(r.search=i.first)}},decls:28,vars:11,consts:[["for","apps"],["placeholder","Filter apps.."],["mat-icon-button","",3,"click"],["mode","indeterminate",4,"ngIf"],["class","filterbar",4,"ngIf"],["mat-table","","fxShow","","fxHide.xs","true","matSort","",3,"dataSource"],["matColumnDef","icon"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["matColumnDef","private"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",3,"click",4,"matRowDef","matRowDefColumns"],["fxHide","","fxShow.xs","true"],["lines","full","matRipple","",3,"click",4,"ngFor","ngForOf"],["mat-fab","","color","primary","routerLink","editor",1,"add-floating-button",3,"queryParams"],["mode","indeterminate"],[1,"filterbar"],[3,"removed",4,"ngFor","ngForOf"],[3,"removed"],["matChipRemove",""],["mat-header-cell",""],["mat-cell",""],["width","40","height","40","draggable","false",3,"src","alt"],["mat-header-cell","","mat-sort-header",""],["mat-header-row",""],["mat-row","",3,"click"],["lines","full","matRipple","",3,"click"],["slot","start","width","40","height","40","draggable","false",3,"src","alt"]],template:function(t,r){1&t&&(e.TgZ(0,"mat-toolbar"),e._UZ(1,"mat-menu-button"),e.TgZ(2,"label",0),e._uU(3," Apps "),e.qZA(),e._UZ(4,"search",1),e.TgZ(5,"button",2),e.NdJ("click",function(){return r.OpenFilter()}),e.TgZ(6,"mat-icon"),e._uU(7," filter_list "),e.qZA(),e.qZA(),e.qZA(),e.YNc(8,B,1,0,"mat-progress-bar",3),e.TgZ(9,"mat-content"),e.YNc(10,X,2,1,"mat-chip-list",4),e.TgZ(11,"table",5),e.ynx(12,6),e.YNc(13,W,2,0,"th",7),e.YNc(14,K,2,2,"td",8),e.BQk(),e.ynx(15,9),e.YNc(16,ee,2,0,"th",10),e.YNc(17,te,2,1,"td",8),e.BQk(),e.ynx(18,11),e.YNc(19,re,2,0,"th",10),e.YNc(20,oe,2,1,"td",8),e.BQk(),e.YNc(21,ie,1,0,"tr",12),e.YNc(22,ae,1,0,"tr",13),e.qZA(),e.TgZ(23,"mat-list",14),e.YNc(24,ne,5,3,"mat-list-item",15),e.qZA(),e.qZA(),e.TgZ(25,"button",16),e.TgZ(26,"mat-icon"),e._uU(27," add "),e.qZA(),e.qZA()),2&t&&(e.xp6(8),e.Q6J("ngIf",r.loading),e.xp6(2),e.Q6J("ngIf",r.filter.private.length>0),e.xp6(1),e.Q6J("dataSource",r.apps),e.xp6(10),e.Q6J("matHeaderRowDef",e.DdM(8,O))("matHeaderRowDefSticky",!0),e.xp6(1),e.Q6J("matRowDefColumns",e.DdM(9,O)),e.xp6(2),e.Q6J("ngForOf",r.apps.data),e.xp6(1),e.Q6J("queryParams",e.DdM(10,se)))},directives:[v.Ye,R.v,P.g,A.lW,T.Hw,g.O5,_.pW,y.s,f.qn,g.sg,f.HS,d.hX,f.qH,p.BZ,L.b8,h.YE,p.w1,p.fO,p.ge,p.Dz,p.ev,h.nU,p.as,p.XQ,p.nj,p.Gk,I.i$,I.Tg,Z.rH],styles:[".mat-column-icon[_ngcontent-%COMP%]{width:60px}.mat-column-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:4px}.mat-column-private[_ngcontent-%COMP%]{width:250px}.mat-column-options[_ngcontent-%COMP%]{width:40px;padding-right:16px!important}mat-list[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:row}"]}),o})();var F=n(1159),me=n(5628),ce=n(6907),ue=n(7756),U=n(7093),pe=n(5601),E=n(8833),k=n(1303),de=n(4533),fe=n(4014),ge=n(3711);function he(o,s){1&o&&e._UZ(0,"mat-progress-bar",43)}function Ze(o,s){if(1&o&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.hij(" ",t.errors.name," ")}}function xe(o,s){if(1&o&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.hij(" ",t.errors.secret," ")}}function ve(o,s){if(1&o&&(e.TgZ(0,"mat-option",27),e._uU(1),e.qZA()),2&o){const t=s.$implicit;e.Q6J("value",t.url),e.xp6(1),e.hij(" ",t.url," ")}}function Ae(o,s){if(1&o&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.hij(" ",t.errors.scopes," ")}}function Te(o,s){if(1&o&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.hij(" ",t.errors.url," ")}}function _e(o,s){if(1&o&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.hij(" ",t.errors.urlPrivacyPolicy," ")}}function qe(o,s){if(1&o&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.hij(" ",t.errors.urlTermsAndConditions," ")}}function ye(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"mat-chip",44),e.NdJ("removed",function(){const l=e.CHM(t).$implicit;return e.oxw().remove(l)}),e._uU(1),e.TgZ(2,"mat-icon",45),e._uU(3," cancel "),e.qZA(),e.qZA()}if(2&o){const t=s.$implicit;e.xp6(1),e.hij(" ",t," ")}}function be(o,s){if(1&o&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.hij(" ",t.errors.theme.color," ")}}function Ie(o,s){if(1&o&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.hij(" ",t.errors.theme.background," ")}}function Ue(o,s){if(1&o&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.hij(" ",t.errors.google.database," ")}}function Ne(o,s){if(1&o&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.hij(" ",t.errors.google.credentials," ")}}function Ce(o,s){if(1&o&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.hij(" ",t.errors.private," ")}}function we(o,s){if(1&o&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.hij(" ",t.errors.organizationOnly," ")}}function Pe(o,s){if(1&o&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.hij(" ",t.errors.config," ")}}const Je=function(o){return{url:o}};let Ye=(()=>{class o{constructor(t,r,i,l,m,u){this.toast=t,this.route=r,this.scopes=i,this.config=l,this.router=m,this.service=u,this.form=new a.cw({icons:new a.cw({icon72x72:new a.NI(null,[a.kI.required]),icon96x96:new a.NI(null,[a.kI.required]),icon128x128:new a.NI(null,[a.kI.required]),icon144x144:new a.NI(null,[a.kI.required]),icon152x152:new a.NI(null,[a.kI.required]),icon192x192:new a.NI(null,[a.kI.required]),icon384x384:new a.NI(null,[a.kI.required]),icon512x512:new a.NI(null,[a.kI.required])}),theme:new a.cw({color:new a.NI(null,[a.kI.required]),background:new a.NI(null,[a.kI.required])}),google:new a.cw({database:new a.NI(null,[a.kI.required]),credentials:new a.NI(null,[a.kI.required])}),url:new a.NI(null,[a.kI.required]),urlPrivacyPolicy:new a.NI(null,[a.kI.required]),urlTermsAndConditions:new a.NI(null,[a.kI.required]),icon:new a.NI(null,[a.kI.required]),name:new a.NI(null,[a.kI.required]),config:new a.NI(null,[a.kI.required]),secret:new a.NI(null,[a.kI.required]),scopes:new a.NI([],[a.kI.required]),domains:new a.NI([],[a.kI.required]),private:new a.NI(null,[a.kI.required]),favicon:new a.NI(null,[a.kI.required]),organizationOnly:new a.NI(null,[a.kI.required])}),this.mode="unset",this.errors={icons:{icon72x72:"",icon96x96:"",icon128x128:"",icon144x144:"",icon152x152:"",icon192x192:"",icon384x384:"",icon512x512:""},theme:{color:"",background:""},google:{database:"",credentials:""},url:"",urlPrivacyPolicy:"",urlTermsAndConditions:"",icon:"",name:"",config:"",secret:"",scopes:"",domains:"",private:"",favicon:"",organizationOnly:""},this.loading=!1,this.observers={},this.keycodes=[F.K5,F.OC]}get(){var t=this;return(0,c.Z)(function*(){t.loading=!0;const r=yield t.service.get({filter:["url","urlPrivacyPolicy","urlTermsAndConditions","role","icon","name","icons","theme","config","secret","google","scopes","domains","private","favicon","organizationOnly"],appId:t.appId});if(r.ok){const i=new x.g(r.result);i.role>1?(t.form.controls.url.setValue(i.url),t.form.controls.urlPrivacyPolicy.setValue(i.urlPrivacyPolicy),t.form.controls.urlTermsAndConditions.setValue(i.urlTermsAndConditions),t.form.controls.icon.setValue(i.icon),t.form.controls.name.setValue(i.name),t.form.controls.secret.setValue(i.secret),t.form.controls.config.setValue(JSON.stringify(i.config,null,4)),t.form.controls.scopes.setValue(i.scopes),t.form.controls.domains.setValue(i.domains),t.form.controls.private.setValue(i.private),t.form.controls.favicon.setValue(i.favicon),t.form.controls.organizationOnly.setValue(i.organizationOnly),t.form.controls.icons.controls.icon72x72.setValue(i.icons.icon72x72),t.form.controls.icons.controls.icon96x96.setValue(i.icons.icon96x96),t.form.controls.icons.controls.icon128x128.setValue(i.icons.icon128x128),t.form.controls.icons.controls.icon144x144.setValue(i.icons.icon144x144),t.form.controls.icons.controls.icon152x152.setValue(i.icons.icon152x152),t.form.controls.icons.controls.icon192x192.setValue(i.icons.icon192x192),t.form.controls.icons.controls.icon384x384.setValue(i.icons.icon384x384),t.form.controls.icons.controls.icon512x512.setValue(i.icons.icon512x512),t.form.controls.theme.controls.color.setValue(i.theme.color),t.form.controls.theme.controls.background.setValue(i.theme.background),t.form.controls.google.controls.database.setValue(i.google.database),t.form.controls.google.controls.credentials.setValue(JSON.stringify(i.google.credentials,null,4))):(t.toast.show("You have insufficient rights to edit this app!"),t.router.navigate(["/apps"]))}else t.toast.show(r.error.message),t.router.navigate(["/apps"]);t.loading=!1})()}load(){var t=this;return(0,c.Z)(function*(){t.loading=!0;const r=yield t.scopes.list({filter:["url"]});r.ok?t.scopes.data=r.result.map(i=>new me.s(i)):(t.scopes.data=[],t.toast.show(r.error.message)),t.loading=!1})()}submit(){var t=this;return(0,c.Z)(function*(){t.loading=!0;let r=t.mode;"copy"==r&&(r="add",delete t.appId);const i=yield t.service[r]({theme:{color:t.form.value.theme.color,background:t.form.value.theme.background},google:{database:t.form.value.google.database,credentials:t.form.value.google.credentials},url:t.form.value.url,urlPrivacyPolicy:t.form.value.urlPrivacyPolicy,urlTermsAndConditions:t.form.value.urlTermsAndConditions,icon:t.form.value.icon,name:t.form.value.name,appId:t.appId,icons:t.form.value.icons,secret:t.form.value.secret,config:JSON.parse(t.form.value.config),scopes:t.form.value.scopes,private:t.form.value.private,domains:t.form.value.domains,favicon:t.form.value.favicon,organizationOnly:t.form.value.organizationOnly});i.ok?t.router.navigate(["/apps"]):t.toast.show(i.error.message),t.loading=!1})()}upload(t){var r=this;return(0,c.Z)(function*(){r.form.controls.icon.setValue(t)})()}remove(t){var r=this;return(0,c.Z)(function*(){r.form.value.domains.splice(r.form.value.domains.indexOf(t),1)})()}add(t){var r=this;return(0,c.Z)(function*(){const i=r.form.value.domains;void 0!==t.value&&null!=t.value&&""!=t.value&&!i.includes(t.value.trim())&&(t.input.value="",i.push(t.value.trim()),r.form.controls.domains.setValue(i))})()}ngOnInit(){var t=this;const r=document.getElementById("config-text-area");r.addEventListener("keydown",i=>{i.shiftKey&&"Tab"===i.key?(i.preventDefault(),r.value=r.value.substring(0,r.selectionStart-1)+r.value.substring(r.selectionStart)):"Tab"===i.key&&(i.preventDefault(),r.setRangeText("\t",r.selectionStart,r.selectionStart,"end"))}),this.observers.config=this.form.controls.config.valueChanges.subscribe(function(){var i=(0,c.Z)(function*(l){try{JSON.parse(l),t.form.controls.config.setErrors(null)}catch(m){t.form.controls.config.setErrors({pattern:"Please enter valid JSON!"}),t.form.controls.config.markAsDirty(),t.errors.config="Please enter valid JSON!"}});return function(l){return i.apply(this,arguments)}}()),this.observers.loaded=this.config.loaded.subscribe(function(){var i=(0,c.Z)(function*(l){if(l){const m=t.route.snapshot.queryParams;t.mode=m.mode,t.appId=m.appId,yield t.load(),"add"!=t.mode&&(yield t.get())}});return function(l){return i.apply(this,arguments)}}())}ngOnDestroy(){var t,r;null===(t=this.observers.config)||void 0===t||t.unsubscribe(),null===(r=this.observers.loaded)||void 0===r||r.unsubscribe()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(J.k),e.Y36(Z.gz),e.Y36(ce.k),e.Y36(Y.E),e.Y36(Z.F0),e.Y36(Q.b))},o.\u0275cmp=e.Xpm({type:o,selectors:[["apps-editor-page"]],decls:158,vars:82,consts:[["for","app editor"],["mode","indeterminate",4,"ngIf"],["fxLayout","row","fxLayoutAlign","center flex-start"],["fxFlex","60","fxFlex.lg","70","fxFlex.md","80","fxFlex.sm","90","fxFlex.xs","100",3,"formGroup","ngSubmit"],["formControlName","icon"],["appearance","outline"],["matInput","","type","text","name","name","placeholder","name","formControlName","name","required",""],[4,"ngIf"],["matInput","","type","text","name","secret","placeholder","secret","formControlName","secret","required",""],["name","scopes","placeholder","scope(s)","formControlName","scopes","required","","multiple",""],["placeholderLabel","Filter scopes...","noEntriesFoundLabel","There are no scopes matching your query!"],["filter",""],[3,"value",4,"ngFor","ngForOf"],["matInput","","type","text","name","url","placeholder","main url","formControlName","url","required",""],["matInput","","type","text","name","urlPrivacyPolicy","placeholder","urlPrivacyPolicy","formControlName","urlPrivacyPolicy","required",""],["matInput","","type","text","name","urlTermsAndConditions","placeholder","urlTermsAndConditions","formControlName","urlTermsAndConditions","required",""],["aria-label","domain selection"],["domainlist",""],[3,"removed",4,"ngFor","ngForOf"],["placeholder","New domain...",3,"matChipInputFor","matChipInputSeparatorKeyCodes","matChipInputAddOnBlur","matChipInputTokenEnd"],["appearance","outline","formGroupName","theme"],["matInput","","type","color","name","color","placeholder","font color","formControlName","color","required",""],["matInput","","type","color","name","background","placeholder","background color","formControlName","background","required",""],["appearance","outline","formGroupName","google"],["matInput","","type","text","name","database","placeholder","database","formControlName","database","required",""],["matInput","","cdkTextareaAutosize","","name","credentials","placeholder","credentials","formControlName","credentials","required",""],["name","private","formControlName","private","required",""],[3,"value"],["name","organizationOnly","formControlName","organizationOnly","required",""],["id","config-text-area","matInput","","cdkTextareaAutosize","","name","config","placeholder","dynamic config","formControlName","config","required",""],["formControlName","favicon",3,"required","accept","min-width","max-width","min-height","max-height"],["formGroupName","icons"],["formControlName","icon72x72",3,"required","min-width","max-width","min-height","max-height"],["formControlName","icon96x96",3,"required","min-width","max-width","min-height","max-height"],["formControlName","icon128x128",3,"required","min-width","max-width","min-height","max-height"],["formControlName","icon144x144",3,"required","min-width","max-width","min-height","max-height"],["formControlName","icon152x152",3,"required","min-width","max-width","min-height","max-height"],["formControlName","icon192x192",3,"required","min-width","max-width","min-height","max-height"],["formControlName","icon384x384",3,"required","min-width","max-width","min-height","max-height"],["formControlName","icon512x512",3,"required","min-width","max-width","min-height","max-height"],["type","submit",2,"display","none"],["button",""],["type","button","mat-flat-button","","color","primary",3,"click"],["mode","indeterminate"],[3,"removed"],["matChipRemove",""]],template:function(t,r){if(1&t){const i=e.EpF();e.TgZ(0,"mat-toolbar"),e._UZ(1,"mat-back-button"),e.TgZ(2,"label",0),e._uU(3),e.qZA(),e.qZA(),e.YNc(4,he,1,0,"mat-progress-bar",1),e.TgZ(5,"mat-content",2),e.TgZ(6,"form",3),e.NdJ("ngSubmit",function(){return!r.loading&&!r.form.invalid&&r.submit()}),e.TgZ(7,"mat-file",4),e.TgZ(8,"mat-label"),e._uU(9," Icon "),e.TgZ(10,"span"),e._uU(11,"*"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(12,"mat-form-field",5),e.TgZ(13,"mat-label"),e._uU(14," Name "),e.qZA(),e._UZ(15,"input",6),e.YNc(16,Ze,2,1,"mat-error",7),e.qZA(),e.TgZ(17,"section"),e.TgZ(18,"mat-form-field",5),e.TgZ(19,"mat-label"),e._uU(20," Secret "),e.qZA(),e._UZ(21,"input",8),e.YNc(22,xe,2,1,"mat-error",7),e.qZA(),e.TgZ(23,"mat-form-field",5),e.TgZ(24,"mat-label"),e._uU(25," Scope(s) "),e.qZA(),e.TgZ(26,"mat-select",9),e.TgZ(27,"mat-option"),e._UZ(28,"ngx-mat-select-search",10,11),e.qZA(),e.YNc(30,ve,2,2,"mat-option",12),e.ALo(31,"filterBy"),e.ALo(32,"orderBy"),e.qZA(),e.YNc(33,Ae,2,1,"mat-error",7),e.qZA(),e.qZA(),e.TgZ(34,"mat-form-field",5),e.TgZ(35,"mat-label"),e._uU(36," Main Url "),e.qZA(),e._UZ(37,"input",13),e.YNc(38,Te,2,1,"mat-error",7),e.qZA(),e.TgZ(39,"mat-form-field",5),e.TgZ(40,"mat-label"),e._uU(41," Privacy Policy Url "),e.qZA(),e._UZ(42,"input",14),e.YNc(43,_e,2,1,"mat-error",7),e.qZA(),e.TgZ(44,"mat-form-field",5),e.TgZ(45,"mat-label"),e._uU(46," Terms and Conditions Url "),e.qZA(),e._UZ(47,"input",15),e.YNc(48,qe,2,1,"mat-error",7),e.qZA(),e.TgZ(49,"mat-form-field",5),e.TgZ(50,"mat-label"),e._uU(51," Domains "),e.qZA(),e.TgZ(52,"mat-chip-list",16,17),e.YNc(54,ye,4,1,"mat-chip",18),e.TgZ(55,"input",19),e.NdJ("matChipInputTokenEnd",function(m){return r.add(m)}),e.qZA(),e.qZA(),e.qZA(),e.TgZ(56,"h2"),e._uU(57," Theme "),e.qZA(),e.TgZ(58,"section"),e.TgZ(59,"mat-form-field",20),e.TgZ(60,"mat-label"),e._uU(61," Font Color "),e.qZA(),e._UZ(62,"input",21),e.YNc(63,be,2,1,"mat-error",7),e.qZA(),e.TgZ(64,"mat-form-field",20),e.TgZ(65,"mat-label"),e._uU(66," Background Color "),e.qZA(),e._UZ(67,"input",22),e.YNc(68,Ie,2,1,"mat-error",7),e.qZA(),e.qZA(),e.TgZ(69,"h2"),e._uU(70," Google "),e.qZA(),e.TgZ(71,"mat-form-field",23),e.TgZ(72,"mat-label"),e._uU(73," Database "),e.qZA(),e._UZ(74,"input",24),e.YNc(75,Ue,2,1,"mat-error",7),e.qZA(),e.TgZ(76,"mat-form-field",23),e.TgZ(77,"mat-label"),e._uU(78," Credentials "),e.qZA(),e._UZ(79,"textarea",25),e.YNc(80,Ne,2,1,"mat-error",7),e.qZA(),e.TgZ(81,"h2"),e._uU(82," Access Control "),e.qZA(),e.TgZ(83,"section"),e.TgZ(84,"mat-form-field",5),e.TgZ(85,"mat-label"),e._uU(86," Access Mode "),e.qZA(),e.TgZ(87,"mat-select",26),e.TgZ(88,"mat-option",27),e._uU(89," Public "),e.qZA(),e.TgZ(90,"mat-option",27),e._uU(91," Private "),e.qZA(),e.qZA(),e.YNc(92,Ce,2,1,"mat-error",7),e.qZA(),e.TgZ(93,"mat-form-field",5),e.TgZ(94,"mat-label"),e._uU(95," Sharing Rules "),e.qZA(),e.TgZ(96,"mat-select",28),e.TgZ(97,"mat-option",27),e._uU(98," Share To Anyone "),e.qZA(),e.TgZ(99,"mat-option",27),e._uU(100," In Organization Only "),e.qZA(),e.qZA(),e.YNc(101,we,2,1,"mat-error",7),e.qZA(),e.qZA(),e.TgZ(102,"mat-form-field",5),e.TgZ(103,"mat-label"),e._uU(104," Dynamic Config "),e.qZA(),e._UZ(105,"textarea",29),e.YNc(106,Pe,2,1,"mat-error",7),e.qZA(),e.TgZ(107,"mat-file",30),e.TgZ(108,"mat-label"),e._uU(109," Favicon (256x256) "),e.TgZ(110,"span"),e._uU(111,"*"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(112,"div",31),e.TgZ(113,"mat-file",32),e.TgZ(114,"mat-label"),e._uU(115," Icon (72x72) "),e.TgZ(116,"span"),e._uU(117,"*"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(118,"mat-file",33),e.TgZ(119,"mat-label"),e._uU(120," Icon (96x96) "),e.TgZ(121,"span"),e._uU(122,"*"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(123,"mat-file",34),e.TgZ(124,"mat-label"),e._uU(125," Icon (128x128) "),e.TgZ(126,"span"),e._uU(127,"*"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(128,"mat-file",35),e.TgZ(129,"mat-label"),e._uU(130," Icon (144x144) "),e.TgZ(131,"span"),e._uU(132,"*"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(133,"mat-file",36),e.TgZ(134,"mat-label"),e._uU(135," Icon (152x152) "),e.TgZ(136,"span"),e._uU(137,"*"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(138,"mat-file",37),e.TgZ(139,"mat-label"),e._uU(140," Icon (192x192) "),e.TgZ(141,"span"),e._uU(142,"*"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(143,"mat-file",38),e.TgZ(144,"mat-label"),e._uU(145," Icon (384x384) "),e.TgZ(146,"span"),e._uU(147,"*"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(148,"mat-file",39),e.TgZ(149,"mat-label"),e._uU(150," Icon (512x512) "),e.TgZ(151,"span"),e._uU(152,"*"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e._UZ(153,"button",40,41),e.qZA(),e.qZA(),e.TgZ(155,"mat-footer"),e.TgZ(156,"button",42),e.NdJ("click",function(){return e.CHM(i),e.MAs(154).click()}),e._uU(157," Submit "),e.qZA(),e.qZA()}if(2&t){const i=e.MAs(29),l=e.MAs(53);e.xp6(3),e.lnq(" ","add"==r.mode?"Create App":""," ","copy"==r.mode?"Copy App":""," ","update"==r.mode?"Edit App":""," "),e.xp6(1),e.Q6J("ngIf",r.loading),e.xp6(2),e.Q6J("formGroup",r.form),e.xp6(10),e.Q6J("ngIf",r.errors.name),e.xp6(6),e.Q6J("ngIf",r.errors.secret),e.xp6(8),e.Q6J("ngForOf",e.xi3(31,74,e.xi3(32,77,r.scopes.data,"url"),e.VKq(80,Je,i.value))),e.xp6(3),e.Q6J("ngIf",r.errors.scopes),e.xp6(5),e.Q6J("ngIf",r.errors.url),e.xp6(5),e.Q6J("ngIf",r.errors.urlPrivacyPolicy),e.xp6(5),e.Q6J("ngIf",r.errors.urlTermsAndConditions),e.xp6(6),e.Q6J("ngForOf",r.form.value.domains),e.xp6(1),e.Q6J("matChipInputFor",l)("matChipInputSeparatorKeyCodes",r.keycodes)("matChipInputAddOnBlur",!0),e.xp6(8),e.Q6J("ngIf",r.errors.theme.color),e.xp6(5),e.Q6J("ngIf",r.errors.theme.background),e.xp6(7),e.Q6J("ngIf",r.errors.google.database),e.xp6(5),e.Q6J("ngIf",r.errors.google.credentials),e.xp6(8),e.Q6J("value",!1),e.xp6(2),e.Q6J("value",!0),e.xp6(2),e.Q6J("ngIf",r.errors.private),e.xp6(5),e.Q6J("value",0),e.xp6(2),e.Q6J("value",1),e.xp6(2),e.Q6J("ngIf",r.errors.organizationOnly),e.xp6(5),e.Q6J("ngIf",r.errors.config),e.xp6(1),e.Q6J("required",!0)("accept","image/x-icon")("min-width",256)("max-width",256)("min-height",256)("max-height",256),e.xp6(6),e.Q6J("required",!0)("required",!0)("min-width",72)("max-width",72)("min-height",72)("max-height",72),e.xp6(5),e.Q6J("required",!0)("min-width",96)("max-width",96)("min-height",96)("max-height",96),e.xp6(5),e.Q6J("required",!0)("min-width",128)("max-width",128)("min-height",128)("max-height",128),e.xp6(5),e.Q6J("required",!0)("min-width",144)("max-width",144)("min-height",144)("max-height",144),e.xp6(5),e.Q6J("required",!0)("min-width",152)("max-width",152)("min-height",152)("max-height",152),e.xp6(5),e.Q6J("required",!0)("min-width",192)("max-width",192)("min-height",192)("max-height",192),e.xp6(5),e.Q6J("required",!0)("min-width",384)("max-width",384)("min-height",384)("max-height",384),e.xp6(5),e.Q6J("required",!0)("min-width",512)("max-width",512)("min-height",512)("max-height",512)}},directives:[v.Ye,ue.x,g.O5,_.pW,y.s,U.xw,U.Wh,a._Y,a.JL,U.yH,a.sg,pe.u,a.JJ,a.u,d.hX,d.KE,E.Nt,a.Fj,a.Q7,d.TO,b.gD,C.ey,k.nu,g.sg,f.qn,f.HS,T.Hw,f.qH,f.oH,a.x0,de.IC,w.A,A.lW],pipes:[fe.g,ge.T],styles:[""]}),o})();var Qe=n(949),Oe=n(8248),Fe=n(2217),Ee=n(7375),ke=n(2155),De=n(2604),Se=n(4274),Me=n(5612),He=n(5896);const Ve=[{path:"",component:le},{path:"editor",component:Ye}];let je=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[a.u5,g.ez,Qe.t,I.ie,T.Ps,Oe._,h.JX,E.c,f.Hi,p.p0,Fe.l,A.ot,b.LD,Ee.M,ke.o9,De.o,Se.X,v.g0,d.lN,He.n,Me.G,a.UX,_.Cv,k.Co,Z.Bz.forChild(Ve)]]}),o})()}}]);