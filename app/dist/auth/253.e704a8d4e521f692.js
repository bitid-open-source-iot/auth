"use strict";(self.webpackChunkauth=self.webpackChunkauth||[]).push([[253],{1253:(Ht,U,a)=>{a.r(U),a.d(U,{GroupsPageModule:()=>Dt});var p=a(5861),f=a(4847),d=a(4999),I=a(7046),v=a(5607),l=a(3075),_=a(8966),t=a(5e3),A=a(5358),S=a(2109),Z=a(4594),x=a(7423),b=a(5245),g=a(9808),T=a(5899),P=a(8863),m=a(7322),G=a(4107),J=a(508),O=a(1303),N=a(4080),M=a(4014),q=a(3711);function L(r,i){1&r&&t._UZ(0,"mat-progress-bar",13)}function j(r,i){if(1&r&&(t.TgZ(0,"mat-option",14),t._uU(1),t.qZA()),2&r){const e=i.$implicit;t.Q6J("value",e.appId),t.xp6(1),t.hij(" ",e.name," ")}}function R(r,i){if(1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&r){const e=t.oxw();t.xp6(1),t.hij(" ",e.errors.appId," ")}}const $=function(r){return{name:r}};let X=(()=>{class r{constructor(e,o,n,s){this.apps=e,this.dialog=o,this.config=n,this.formerror=s,this.form=new l.cw({appId:new l.NI([])}),this.errors={appId:""},this.filter=new l.cw({app:new l.NI("")}),this.loading=!1,this.observers={}}load(){var e=this;return(0,p.Z)(function*(){e.loading=!0;const o=yield e.apps.list({filter:["name","appId"],private:[!0,!1]});e.apps.data=o.ok?o.result.map(n=>new I.g(n)):[],void 0!==e.config.appId&&null!=e.config.appId&&e.form.controls.appId.setValue(e.config.appId),e.loading=!1})()}close(){var e=this;return(0,p.Z)(function*(){e.dialog.close(!1)})()}submit(){var e=this;return(0,p.Z)(function*(){e.dialog.close(e.form.value)})()}ngOnInit(){this.observers.form=this.form.valueChanges.subscribe(e=>{this.errors=this.formerror.validateForm(this.form,this.errors,!0)}),this.load()}ngOnDestroy(){var e;null===(e=this.observers.form)||void 0===e||e.unsubscribe()}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(A.b),t.Y36(_.so),t.Y36(_.WI),t.Y36(S.J))},r.\u0275cmp=t.Xpm({type:r,selectors:[["groups-filter-dialog"]],decls:25,vars:12,consts:[["for","filter groups"],["mat-icon-button","",3,"click"],["mode","indeterminate",4,"ngIf"],[3,"formGroup","ngSubmit"],["appearance","outline"],["name","appId","formControlName","appId","multiple",""],["placeholderLabel","Filter apps...","noEntriesFoundLabel","There are no apps matching your query!"],["filter",""],[3,"value",4,"ngFor","ngForOf"],[4,"ngIf"],["type","submit",2,"display","none"],["button",""],["type","button","color","primary","mat-flat-button","",3,"click"],["mode","indeterminate"],[3,"value"]],template:function(e,o){if(1&e){const n=t.EpF();t.TgZ(0,"mat-toolbar"),t.TgZ(1,"label",0),t._uU(2," Filter Groups "),t.qZA(),t.TgZ(3,"button",1),t.NdJ("click",function(){return o.close()}),t.TgZ(4,"mat-icon"),t._uU(5," close "),t.qZA(),t.qZA(),t.qZA(),t.YNc(6,L,1,0,"mat-progress-bar",2),t.TgZ(7,"mat-content"),t.TgZ(8,"form",3),t.NdJ("ngSubmit",function(){return!o.loading&&!o.form.invalid&&o.submit()}),t.TgZ(9,"mat-form-field",4),t.TgZ(10,"mat-label"),t._uU(11," App(s) "),t.qZA(),t.TgZ(12,"mat-select",5),t.TgZ(13,"mat-option"),t._UZ(14,"ngx-mat-select-search",6,7),t.qZA(),t.YNc(16,j,2,2,"mat-option",8),t.ALo(17,"filterBy"),t.ALo(18,"orderBy"),t.qZA(),t.YNc(19,R,2,1,"mat-error",9),t.qZA(),t._UZ(20,"button",10,11),t.qZA(),t.qZA(),t.TgZ(22,"mat-footer"),t.TgZ(23,"button",12),t.NdJ("click",function(){return t.CHM(n),t.MAs(21).click()}),t._uU(24," Apply "),t.qZA(),t.qZA()}if(2&e){const n=t.MAs(15);t.xp6(6),t.Q6J("ngIf",o.loading),t.xp6(2),t.Q6J("formGroup",o.form),t.xp6(8),t.Q6J("ngForOf",t.xi3(17,4,t.xi3(18,7,o.apps.data,"name"),t.VKq(10,$,n.value))),t.xp6(3),t.Q6J("ngIf",o.errors.appId)}},directives:[Z.Ye,x.lW,b.Hw,g.O5,T.pW,P.s,l._Y,l.JL,l.sg,m.KE,m.hX,G.gD,l.JJ,l.u,J.ey,O.nu,g.sg,m.TO,N.A],pipes:[M.g,q.T],styles:[".filter-dialog{width:500px!important}.filter-dialog .mat-dialog-container{padding:0!important}@media screen and (max-width: 600px){.filter-dialog .mat-dialog-container{inset:0;z-index:5000;position:fixed;border-radius:0}}\n"],encapsulation:2}),r})();var D=a(3065),Q=a(649),w=a(8939),B=a(7563),h=a(6696),W=a(8188),V=a(5167),E=a(7660),K=a(7635),k=a(5277),y=a(6688),tt=a(3322),C=a(4449),et=a(8712);function ot(r,i){1&r&&t._UZ(0,"mat-progress-bar",15)}function rt(r,i){if(1&r){const e=t.EpF();t.TgZ(0,"mat-chip",18),t.NdJ("removed",function(){const s=t.CHM(e).$implicit;return t.oxw(2).unfilter("appId",s)}),t.TgZ(1,"mat-icon"),t._uU(2," apps "),t.qZA(),t.TgZ(3,"mat-label"),t._uU(4),t.ALo(5,"describe"),t.qZA(),t.TgZ(6,"mat-icon",19),t._uU(7," cancel "),t.qZA(),t.qZA()}if(2&r){const e=i.$implicit,o=t.oxw(2);t.xp6(4),t.hij(" ",t.gM2(5,1,o.apps.data,"appId",e,"name")," ")}}function nt(r,i){if(1&r&&(t.TgZ(0,"mat-chip-list",16),t.YNc(1,rt,8,6,"mat-chip",17),t.qZA()),2&r){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.filter.appId)}}function at(r,i){1&r&&(t.TgZ(0,"th",20),t._uU(1," Description "),t.qZA())}function it(r,i){if(1&r&&(t.TgZ(0,"td",21),t._uU(1),t.qZA()),2&r){const e=i.$implicit;t.xp6(1),t.hij(" ",e.description," ")}}function st(r,i){1&r&&(t.TgZ(0,"th",20),t._uU(1," App(s) "),t.qZA())}function lt(r,i){if(1&r&&(t.TgZ(0,"span",24),t._uU(1),t.ALo(2,"describe"),t.qZA()),2&r){const e=i.$implicit,o=t.oxw(2);t.xp6(1),t.hij(" ",t.gM2(2,1,o.apps.data,"appId",e,"name")," ")}}function pt(r,i){1&r&&(t.TgZ(0,"span"),t._uU(1," ALL "),t.qZA())}function ut(r,i){if(1&r&&(t.TgZ(0,"td",21),t.YNc(1,lt,3,6,"span",22),t.YNc(2,pt,2,0,"span",23),t.qZA()),2&r){const e=i.$implicit;t.xp6(1),t.Q6J("ngForOf",e.appId),t.xp6(1),t.Q6J("ngIf",0==(null==e.appId?null:e.appId.length))}}function ct(r,i){1&r&&t._UZ(0,"tr",25)}function dt(r,i){if(1&r){const e=t.EpF();t.TgZ(0,"tr",26),t.NdJ("click",function(){const s=t.CHM(e).$implicit;return t.oxw().options(s)}),t.qZA()}}function mt(r,i){if(1&r){const e=t.EpF();t.TgZ(0,"mat-list-item",27),t.NdJ("click",function(){const s=t.CHM(e).$implicit;return t.oxw().options(s)}),t.TgZ(1,"mat-label"),t.TgZ(2,"h3"),t._uU(3),t.qZA(),t.qZA(),t.qZA()}if(2&r){const e=i.$implicit;t.xp6(3),t.hij(" ",e.description," ")}}const H=function(){return["description","appId"]},gt=function(){return{mode:"add"}};let ft=(()=>{class r{constructor(e,o,n,s,u,c,F,Qt,wt,Et){this.apps=e,this.toast=o,this.config=n,this.dialog=s,this.sheet=u,this.router=c,this.filters=F,this.confirm=Qt,this.service=wt,this.localstorage=Et,this.sort=new f.YE,this.filter=this.filters.get({appId:[]}),this.groups=new d.by,this.loading=!1,this.observers={}}list(){var e=this;return(0,p.Z)(function*(){e.loading=!0;const o=yield e.service.list({filter:["role","appId","groupId","description"],appId:e.filter.appId});e.groups.data=o.ok?o.result.map(n=>new v.Z(n)):[],e.loading=!1})()}load(){var e=this;return(0,p.Z)(function*(){e.loading=!0;const o=yield e.apps.list({filter:["name","appId"],private:[!0,!1]});e.apps.data=o.ok?o.result.map(n=>new I.g(n)):[],e.loading=!1})()}unfilter(e,o){this.filter[e]=this.filter[e].filter(n=>n!=o),this.filters.update(this.filter),this.list()}options(e){var o=this;return(0,p.Z)(function*(){var n;o.sheet.show({role:e.role,title:e.description,options:[{icon:"edit",title:"Edit",handler:(n=(0,p.Z)(function*(){o.router.navigate(["/groups","editor"],{queryParams:{mode:"update",groupId:e.groupId}})}),function(){return n.apply(this,arguments)}),disabled:[0,1]},{icon:"content_copy",title:"Copy",handler:function(){var n=(0,p.Z)(function*(){o.router.navigate(["/groups","editor"],{queryParams:{mode:"copy",groupId:e.groupId}})});return function(){return n.apply(this,arguments)}}(),disabled:[0,1]},{icon:"people",title:"Subscribers",handler:function(){var n=(0,p.Z)(function*(){o.router.navigate(["/subscribers","group",e.groupId])});return function(){return n.apply(this,arguments)}}(),disabled:[0,1,2,3]},{icon:"remove",title:"Unubscribe",danger:!0,handler:function(){var n=(0,p.Z)(function*(){var s;o.confirm.show({message:"Are you sure you want to unsubscribe from "+e.description+"?",handler:(s=(0,p.Z)(function*(){o.loading=!0;const u=yield o.service.unsubscribe({id:o.localstorage.get("userId"),type:"user",groupId:e.groupId});if(u.ok){for(let c=0;c<o.groups.data.length;c++)if(o.groups.data[c].groupId==e.groupId){o.groups.data.splice(c,1),o.toast.show("You were unsubscribed!");break}o.groups.data=o.groups.data.map(c=>new v.Z(c))}else o.toast.show(u.error.message);o.loading=!1}),function(){return s.apply(this,arguments)})})});return function(){return n.apply(this,arguments)}}(),disabled:[5]},{icon:"delete",title:"Delete",danger:!0,handler:function(){var n=(0,p.Z)(function*(){var s;o.confirm.show({message:"Are you sure you want to delete "+e.description+"?",handler:(s=(0,p.Z)(function*(){o.loading=!0;const u=yield o.service.delete({groupId:e.groupId});if(u.ok){for(let c=0;c<o.groups.data.length;c++)if(o.groups.data[c].groupId==e.groupId){o.groups.data.splice(c,1),o.toast.show("Group was removed!");break}o.groups.data=o.groups.data.map(c=>new v.Z(c))}else o.toast.show(u.error.message);o.loading=!1}),function(){return s.apply(this,arguments)})})});return function(){return n.apply(this,arguments)}}(),disabled:[0,1,2,3,4]}]})})()}OpenFilter(){var e=this;return(0,p.Z)(function*(){yield(yield e.dialog.open(X,{data:e.filter,panelClass:"filter-dialog"})).afterClosed().subscribe(function(){var n=(0,p.Z)(function*(s){s&&(Object.keys(s).map(u=>{e.filter[u]=s[u]}),e.filters.update(e.filter),e.list())});return function(s){return n.apply(this,arguments)}}())})()}ngOnInit(){var o,e=this;this.groups.sort=this.sort,this.groups.sort.active="name",this.groups.sort.direction="asc",this.observers.loaded=this.config.loaded.subscribe(function(){var n=(0,p.Z)(function*(s){s&&(yield e.load(),yield e.list())});return function(s){return n.apply(this,arguments)}}()),this.observers.search=null===(o=this.search)||void 0===o?void 0:o.change.subscribe(n=>{this.groups.filter=n})}ngOnDestroy(){var e,o;null===(e=this.observers.loaded)||void 0===e||e.unsubscribe(),null===(o=this.observers.search)||void 0===o||o.unsubscribe()}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(A.b),t.Y36(Q.k),t.Y36(w.E),t.Y36(_.uw),t.Y36(B.I),t.Y36(h.F0),t.Y36(W.q),t.Y36(V.z),t.Y36(E.J),t.Y36(K.n))},r.\u0275cmp=t.Xpm({type:r,selectors:[["groups-page"]],viewQuery:function(e,o){if(1&e&&(t.Gf(f.YE,7),t.Gf(D.g,7)),2&e){let n;t.iGM(n=t.CRH())&&(o.sort=n.first),t.iGM(n=t.CRH())&&(o.search=n.first)}},decls:25,vars:11,consts:[["for","groups"],["placeholder","Filter groups.."],["mat-icon-button","",3,"click"],["mode","indeterminate",4,"ngIf"],["class","filterbar",4,"ngIf"],["mat-table","","fxShow","","fxHide.xs","true","matSort","",3,"dataSource"],["matColumnDef","description"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","appId"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",3,"click",4,"matRowDef","matRowDefColumns"],["fxHide","","fxShow.xs","true"],["lines","full","matRipple","",3,"click",4,"ngFor","ngForOf"],["mat-fab","","color","primary","routerLink","editor",1,"add-floating-button",3,"queryParams"],["mode","indeterminate"],[1,"filterbar"],[3,"removed",4,"ngFor","ngForOf"],[3,"removed"],["matChipRemove",""],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["class","app-item",4,"ngFor","ngForOf"],[4,"ngIf"],[1,"app-item"],["mat-header-row",""],["mat-row","",3,"click"],["lines","full","matRipple","",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"mat-toolbar"),t._UZ(1,"mat-menu-button"),t.TgZ(2,"label",0),t._uU(3," Groups "),t.qZA(),t._UZ(4,"search",1),t.TgZ(5,"button",2),t.NdJ("click",function(){return o.OpenFilter()}),t.TgZ(6,"mat-icon"),t._uU(7," filter_list "),t.qZA(),t.qZA(),t.qZA(),t.YNc(8,ot,1,0,"mat-progress-bar",3),t.TgZ(9,"mat-content"),t.YNc(10,nt,2,1,"mat-chip-list",4),t.TgZ(11,"table",5),t.ynx(12,6),t.YNc(13,at,2,0,"th",7),t.YNc(14,it,2,1,"td",8),t.BQk(),t.ynx(15,9),t.YNc(16,st,2,0,"th",7),t.YNc(17,ut,3,2,"td",8),t.BQk(),t.YNc(18,ct,1,0,"tr",10),t.YNc(19,dt,1,0,"tr",11),t.qZA(),t.TgZ(20,"mat-list",12),t.YNc(21,mt,4,1,"mat-list-item",13),t.qZA(),t.qZA(),t.TgZ(22,"button",14),t.TgZ(23,"mat-icon"),t._uU(24," add "),t.qZA(),t.qZA()),2&e&&(t.xp6(8),t.Q6J("ngIf",o.loading),t.xp6(2),t.Q6J("ngIf",o.filter.appId.length>0),t.xp6(1),t.Q6J("dataSource",o.groups),t.xp6(7),t.Q6J("matHeaderRowDef",t.DdM(8,H))("matHeaderRowDefSticky",!0),t.xp6(1),t.Q6J("matRowDefColumns",t.DdM(9,H)),t.xp6(2),t.Q6J("ngForOf",o.groups.data),t.xp6(1),t.Q6J("queryParams",t.DdM(10,gt)))},directives:[Z.Ye,k.v,D.g,x.lW,b.Hw,g.O5,T.pW,P.s,y.qn,g.sg,y.HS,m.hX,y.qH,d.BZ,tt.b8,f.YE,d.w1,d.fO,d.ge,f.nU,d.Dz,d.ev,d.as,d.XQ,d.nj,d.Gk,C.i$,C.Tg,h.rH],pipes:[et.z],styles:['.mat-column-icon[_ngcontent-%COMP%]{width:60px}.mat-column-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:4px}.mat-column-private[_ngcontent-%COMP%]{width:250px}.mat-column-options[_ngcontent-%COMP%]{width:40px;padding-right:16px!important}mat-list[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:row}.app-item[_ngcontent-%COMP%]:after{content:","}.app-item[_ngcontent-%COMP%]:last-child:after{content:""}']}),r})();var ht=a(6907),vt=a(7756),Y=a(7093),z=a(8833);function Zt(r,i){1&r&&t._UZ(0,"mat-progress-bar",17)}function xt(r,i){if(1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&r){const e=t.oxw();t.xp6(1),t.hij(" ",e.errors.description," ")}}function Tt(r,i){if(1&r&&(t.TgZ(0,"mat-option",12),t._uU(1),t.qZA()),2&r){const e=i.$implicit;t.Q6J("value",e.appId),t.xp6(1),t.hij(" ",e.name," ")}}function yt(r,i){if(1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&r){const e=t.oxw();t.xp6(1),t.hij(" ",e.errors.appId," ")}}function It(r,i){if(1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&r){const e=t.oxw();t.xp6(1),t.hij(" ",e.errors.private," ")}}function _t(r,i){if(1&r&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&r){const e=t.oxw();t.xp6(1),t.hij(" ",e.errors.organizationOnly," ")}}const At=function(r){return{name:r}};let bt=(()=>{class r{constructor(e,o,n,s,u,c,F){this.apps=e,this.toast=o,this.route=n,this.scopes=s,this.config=u,this.router=c,this.service=F,this.form=new l.cw({appId:new l.NI([]),private:new l.NI(!0,[l.kI.required]),description:new l.NI(null,[l.kI.required]),organizationOnly:new l.NI(0,[l.kI.required])}),this.errors={appId:"",private:"",description:"",organizationOnly:""},this.loading=!1,this.observers={}}get(){var e=this;return(0,p.Z)(function*(){e.loading=!0;const o=yield e.service.get({filter:["role","appId","private","description","organizationOnly"],groupId:e.groupId});if(o.ok){const n=new v.Z(o.result);n.role>1?(e.form.controls.appId.setValue(n.appId),e.form.controls.private.setValue(n.private),e.form.controls.description.setValue(n.description),e.form.controls.organizationOnly.setValue(n.organizationOnly)):(e.toast.show("You have insufficient rights to edit this group!"),e.router.navigate(["/groups"]))}else e.toast.show(o.error.message),e.router.navigate(["/groups"]);e.loading=!1})()}load(){var e=this;return(0,p.Z)(function*(){e.loading=!0;const o=yield e.apps.list({filter:["name","appId"],private:[!0,!1]});o.ok?e.apps.data=o.result.map(n=>new I.g(n)):(e.apps.data=[],e.toast.show(o.error.message)),e.loading=!1})()}submit(){var e=this;return(0,p.Z)(function*(){e.loading=!0;let o=e.mode;"copy"==o&&(o="add",delete e.groupId);const n=yield e.service[o]({appId:e.form.value.appId,groupId:e.groupId,description:e.form.value.description,organizationOnly:e.form.value.organizationOnly});n.ok?e.router.navigate(["/groups"]):e.toast.show(n.error.message),e.loading=!1})()}ngOnInit(){var e=this;this.observers.loaded=this.config.loaded.subscribe(function(){var o=(0,p.Z)(function*(n){if(n){const s=e.route.snapshot.queryParams;e.mode=s.mode,e.groupId=s.groupId,yield e.load(),"add"!=e.mode&&(yield e.get())}});return function(n){return o.apply(this,arguments)}}())}ngOnDestroy(){var e;null===(e=this.observers.loaded)||void 0===e||e.unsubscribe()}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(A.b),t.Y36(Q.k),t.Y36(h.gz),t.Y36(ht.k),t.Y36(w.E),t.Y36(h.F0),t.Y36(E.J))},r.\u0275cmp=t.Xpm({type:r,selectors:[["groups-editor-page"]],decls:49,vars:22,consts:[["for","group editor"],["mode","indeterminate",4,"ngIf"],["fxLayout","row","fxLayoutAlign","center flex-start"],["fxFlex","60","fxFlex.lg","70","fxFlex.md","80","fxFlex.sm","90","fxFlex.xs","100",3,"formGroup","ngSubmit"],["appearance","outline"],["matInput","","type","text","name","description","placeholder","description","formControlName","description","required",""],[4,"ngIf"],["name","appId","placeholder","appId","formControlName","appId","multiple",""],["placeholderLabel","Filter apps...","noEntriesFoundLabel","There are no apps matching your query!"],["filter",""],[3,"value",4,"ngFor","ngForOf"],["name","private","formControlName","private","required",""],[3,"value"],["name","organizationOnly","formControlName","organizationOnly","required",""],["type","submit",2,"display","none"],["button",""],["type","button","mat-flat-button","","color","primary",3,"click"],["mode","indeterminate"]],template:function(e,o){if(1&e){const n=t.EpF();t.TgZ(0,"mat-toolbar"),t._UZ(1,"mat-back-button"),t.TgZ(2,"label",0),t._uU(3),t.qZA(),t.qZA(),t.YNc(4,Zt,1,0,"mat-progress-bar",1),t.TgZ(5,"mat-content",2),t.TgZ(6,"form",3),t.NdJ("ngSubmit",function(){return!o.loading&&!o.form.invalid&&o.submit()}),t.TgZ(7,"mat-form-field",4),t.TgZ(8,"mat-label"),t._uU(9," Description "),t.qZA(),t._UZ(10,"input",5),t.YNc(11,xt,2,1,"mat-error",6),t.qZA(),t.TgZ(12,"mat-form-field",4),t.TgZ(13,"mat-label"),t._uU(14," App(s) "),t.qZA(),t.TgZ(15,"mat-select",7),t.TgZ(16,"mat-option"),t._UZ(17,"ngx-mat-select-search",8,9),t.qZA(),t.YNc(19,Tt,2,2,"mat-option",10),t.ALo(20,"filterBy"),t.ALo(21,"orderBy"),t.qZA(),t.YNc(22,yt,2,1,"mat-error",6),t.qZA(),t.TgZ(23,"h2"),t._uU(24," Access Control "),t.qZA(),t.TgZ(25,"section"),t.TgZ(26,"mat-form-field",4),t.TgZ(27,"mat-label"),t._uU(28," Access Mode "),t.qZA(),t.TgZ(29,"mat-select",11),t.TgZ(30,"mat-option",12),t._uU(31," Public "),t.qZA(),t.TgZ(32,"mat-option",12),t._uU(33," Private "),t.qZA(),t.qZA(),t.YNc(34,It,2,1,"mat-error",6),t.qZA(),t.TgZ(35,"mat-form-field",4),t.TgZ(36,"mat-label"),t._uU(37," Sharing Rules "),t.qZA(),t.TgZ(38,"mat-select",13),t.TgZ(39,"mat-option",12),t._uU(40," Share To Anyone "),t.qZA(),t.TgZ(41,"mat-option",12),t._uU(42," In Organization Only "),t.qZA(),t.qZA(),t.YNc(43,_t,2,1,"mat-error",6),t.qZA(),t.qZA(),t._UZ(44,"button",14,15),t.qZA(),t.qZA(),t.TgZ(46,"mat-footer"),t.TgZ(47,"button",16),t.NdJ("click",function(){return t.CHM(n),t.MAs(45).click()}),t._uU(48," Submit "),t.qZA(),t.qZA()}if(2&e){const n=t.MAs(18);t.xp6(3),t.lnq(" ","add"==o.mode?"Create Group":""," ","copy"==o.mode?"Copy Group":""," ","update"==o.mode?"Edit Group":""," "),t.xp6(1),t.Q6J("ngIf",o.loading),t.xp6(2),t.Q6J("formGroup",o.form),t.xp6(5),t.Q6J("ngIf",o.errors.description),t.xp6(8),t.Q6J("ngForOf",t.xi3(20,14,t.xi3(21,17,o.apps.data,"name"),t.VKq(20,At,n.value))),t.xp6(3),t.Q6J("ngIf",o.errors.appId),t.xp6(8),t.Q6J("value",!1),t.xp6(2),t.Q6J("value",!0),t.xp6(2),t.Q6J("ngIf",o.errors.private),t.xp6(5),t.Q6J("value",0),t.xp6(2),t.Q6J("value",1),t.xp6(2),t.Q6J("ngIf",o.errors.organizationOnly)}},directives:[Z.Ye,vt.x,g.O5,T.pW,P.s,Y.xw,Y.Wh,l._Y,l.JL,Y.yH,l.sg,m.KE,m.hX,z.Nt,l.Fj,l.JJ,l.u,l.Q7,m.TO,G.gD,J.ey,O.nu,g.sg,N.A,x.lW],pipes:[M.g,q.T],styles:["mat-footer[_ngcontent-%COMP%], mat-content[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column}mat-footer[_ngcontent-%COMP%]   form[_ngcontent-%COMP%], mat-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{max-width:400px;margin-top:20px}mat-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], mat-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;max-width:400px}mat-footer[_ngcontent-%COMP%]{justify-content:center}"]}),r})();var Pt=a(949),Gt=a(8248),Ot=a(2217),Ct=a(7375),Yt=a(2155),Ft=a(2604),Ut=a(4274),Jt=a(1065),Nt=a(5612),Mt=a(5896);const qt=[{path:"",component:ft},{path:"editor",component:bt}];let Dt=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[[l.u5,g.ez,Pt.t,C.ie,b.Ps,Gt._,f.JX,z.c,y.Hi,d.p0,Ot.l,x.ot,G.LD,Ct.M,Yt.o9,Ft.o,Ut.X,Z.g0,m.lN,Jt.w,Mt.n,Nt.G,l.UX,T.Cv,O.Co,h.Bz.forChild(qt)]]}),r})()}}]);