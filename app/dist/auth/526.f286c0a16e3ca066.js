"use strict";(self.webpackChunkauth=self.webpackChunkauth||[]).push([[526],{9526:(Dt,J,n)=>{n.r(J),n.d(J,{FeaturesPageModule:()=>Jt});var u=n(5861),g=n(4847),f=n(4999),y=n(7046);class T{constructor(o){this.app={name:void 0,icon:void 0},this.role=0,void 0!==o&&null!=o&&(void 0!==o.app&&null!=o.app&&(void 0!==o.app.name&&null!=o.app.name&&(this.app.name=o.app.name),void 0!==o.app.icon&&null!=o.app.icon&&(this.app.icon=o.app.icon)),void 0!==o.role&&null!=o.role&&(this.role=o.role),void 0!==o.appId&&null!=o.appId&&(this.appId=o.appId),void 0!==o.title&&null!=o.title&&(this.title=o.title),void 0!==o.featureId&&null!=o.featureId&&(this.featureId=o.featureId),void 0!==o.description&&null!=o.description&&(this.description=o.description))}}var l=n(3075),I=n(8966),t=n(5e3),b=n(5358),S=n(2109),v=n(4594),Z=n(7423),_=n(5245),m=n(9808),x=n(5899),A=n(8863),c=n(7322),P=n(4107),N=n(508),C=n(1303),O=n(4080),M=n(4014),D=n(3711);function L(a,o){1&a&&t._UZ(0,"mat-progress-bar",13)}function R(a,o){if(1&a&&(t.TgZ(0,"mat-option",14),t._uU(1),t.qZA()),2&a){const e=o.$implicit;t.Q6J("value",e.appId),t.xp6(1),t.hij(" ",e.name," ")}}function G(a,o){if(1&a&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.hij(" ",e.errors.appId," ")}}const X=function(a){return{name:a}};let $=(()=>{class a{constructor(e,r,i,s){this.apps=e,this.dialog=r,this.config=i,this.formerror=s,this.form=new l.cw({appId:new l.NI([])}),this.errors={appId:""},this.filter=new l.cw({app:new l.NI("")}),this.loading=!1,this.observers={}}load(){var e=this;return(0,u.Z)(function*(){e.loading=!0;const r=yield e.apps.list({filter:["name","appId"]});e.apps.data=r.ok?r.result.map(i=>new y.g(i)):[],void 0!==e.config.appId&&null!=e.config.appId&&e.form.controls.appId.setValue(e.config.appId),e.loading=!1})()}close(){var e=this;return(0,u.Z)(function*(){e.dialog.close(!1)})()}submit(){var e=this;return(0,u.Z)(function*(){e.dialog.close(e.form.value)})()}ngOnInit(){this.observers.form=this.form.valueChanges.subscribe(e=>{this.errors=this.formerror.validateForm(this.form,this.errors,!0)}),this.load()}ngOnDestroy(){var e;null===(e=this.observers.form)||void 0===e||e.unsubscribe()}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(b.b),t.Y36(I.so),t.Y36(I.WI),t.Y36(S.J))},a.\u0275cmp=t.Xpm({type:a,selectors:[["features-filter-dialog"]],decls:25,vars:12,consts:[["for","filter features"],["mat-icon-button","",3,"click"],["mode","indeterminate",4,"ngIf"],[3,"formGroup","ngSubmit"],["appearance","outline"],["name","appId","formControlName","appId","multiple",""],["placeholderLabel","Filter apps...","noEntriesFoundLabel","There are no apps matching your query!"],["filter",""],[3,"value",4,"ngFor","ngForOf"],[4,"ngIf"],["type","submit",2,"display","none"],["button",""],["type","button","color","primary","mat-flat-button","",3,"click"],["mode","indeterminate"],[3,"value"]],template:function(e,r){if(1&e){const i=t.EpF();t.TgZ(0,"mat-toolbar"),t.TgZ(1,"label",0),t._uU(2," Filter Features "),t.qZA(),t.TgZ(3,"button",1),t.NdJ("click",function(){return r.close()}),t.TgZ(4,"mat-icon"),t._uU(5," close "),t.qZA(),t.qZA(),t.qZA(),t.YNc(6,L,1,0,"mat-progress-bar",2),t.TgZ(7,"mat-content"),t.TgZ(8,"form",3),t.NdJ("ngSubmit",function(){return!r.loading&&!r.form.invalid&&r.submit()}),t.TgZ(9,"mat-form-field",4),t.TgZ(10,"mat-label"),t._uU(11," App(s) "),t.qZA(),t.TgZ(12,"mat-select",5),t.TgZ(13,"mat-option"),t._UZ(14,"ngx-mat-select-search",6,7),t.qZA(),t.YNc(16,R,2,2,"mat-option",8),t.ALo(17,"filterBy"),t.ALo(18,"orderBy"),t.qZA(),t.YNc(19,G,2,1,"mat-error",9),t.qZA(),t._UZ(20,"button",10,11),t.qZA(),t.qZA(),t.TgZ(22,"mat-footer"),t.TgZ(23,"button",12),t.NdJ("click",function(){return t.CHM(i),t.MAs(21).click()}),t._uU(24," Apply "),t.qZA(),t.qZA()}if(2&e){const i=t.MAs(15);t.xp6(6),t.Q6J("ngIf",r.loading),t.xp6(2),t.Q6J("formGroup",r.form),t.xp6(8),t.Q6J("ngForOf",t.xi3(17,4,t.xi3(18,7,r.apps.data,"name"),t.VKq(10,X,i.value))),t.xp6(3),t.Q6J("ngIf",r.errors.appId)}},directives:[v.Ye,Z.lW,_.Hw,m.O5,x.pW,A.s,l._Y,l.JL,l.sg,c.KE,c.hX,P.gD,l.JJ,l.u,N.ey,C.nu,m.sg,c.TO,O.A],pipes:[M.g,D.T],styles:[".filter-dialog{width:500px!important}.filter-dialog .mat-dialog-container{padding:0!important}@media screen and (max-width: 600px){.filter-dialog .mat-dialog-container{inset:0;z-index:5000;position:fixed;border-radius:0}}\n"],encapsulation:2}),a})();var E=n(3065),q=n(649),B=n(7563),Q=n(8939),W=n(8188),h=n(6696),z=n(5167),w=n(6450),V=n(5277),F=n(6688),K=n(3322),Y=n(4449),k=n(8712);function tt(a,o){1&a&&t._UZ(0,"mat-progress-bar",15)}function et(a,o){if(1&a){const e=t.EpF();t.TgZ(0,"mat-chip",18),t.NdJ("removed",function(){const s=t.CHM(e).$implicit;return t.oxw(2).unfilter("appId",s)}),t.TgZ(1,"mat-icon"),t._uU(2," apps "),t.qZA(),t.TgZ(3,"mat-label"),t._uU(4),t.ALo(5,"describe"),t.qZA(),t.TgZ(6,"mat-icon",19),t._uU(7," cancel "),t.qZA(),t.qZA()}if(2&a){const e=o.$implicit,r=t.oxw(2);t.xp6(4),t.hij(" ",t.gM2(5,1,r.apps.data,"appId",e,"name")," ")}}function rt(a,o){if(1&a&&(t.TgZ(0,"mat-chip-list",16),t.YNc(1,et,8,6,"mat-chip",17),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.filter.appId)}}function at(a,o){1&a&&(t.TgZ(0,"th",20),t._uU(1," Title "),t.qZA())}function ot(a,o){if(1&a&&(t.TgZ(0,"td",21),t._uU(1),t.qZA()),2&a){const e=o.$implicit;t.xp6(1),t.hij(" ",e.title," ")}}function it(a,o){1&a&&(t.TgZ(0,"th",20),t._uU(1," Description "),t.qZA())}function nt(a,o){if(1&a&&(t.TgZ(0,"td",21),t._uU(1),t.qZA()),2&a){const e=o.$implicit;t.xp6(1),t.hij(" ",e.description," ")}}function st(a,o){1&a&&t._UZ(0,"tr",22)}function lt(a,o){if(1&a){const e=t.EpF();t.TgZ(0,"tr",23),t.NdJ("click",function(){const s=t.CHM(e).$implicit;return t.oxw().options(s)}),t.qZA()}}function ut(a,o){if(1&a){const e=t.EpF();t.TgZ(0,"mat-list-item",24),t.NdJ("click",function(){const s=t.CHM(e).$implicit;return t.oxw().options(s)}),t.TgZ(1,"mat-label"),t.TgZ(2,"h3"),t._uU(3),t.qZA(),t.TgZ(4,"p"),t._uU(5),t.qZA(),t.qZA(),t.qZA()}if(2&a){const e=o.$implicit;t.xp6(3),t.hij(" ",e.title," "),t.xp6(2),t.hij(" ",e.description," ")}}const H=function(){return["title","description"]},dt=function(){return{mode:"add"}};let ft=(()=>{class a{constructor(e,r,i,s,d,p,Nt,Ot,Mt){this.apps=e,this.toast=r,this.dialog=i,this.sheet=s,this.config=d,this.filters=p,this.router=Nt,this.confirm=Ot,this.service=Mt,this.sort=new g.YE,this.filter=this.filters.get({appId:[]}),this.loading=!1,this.features=new f.by,this.observers={}}list(){var e=this;return(0,u.Z)(function*(){e.loading=!0;const r=yield e.service.list({filter:["icon","role","title","featureId","description"],appId:e.filter.appId});e.features.data=r.ok?r.result.map(i=>new T(i)):[],e.loading=!1})()}load(){var e=this;return(0,u.Z)(function*(){e.loading=!0;const r=yield e.apps.list({filter:["name","appId"],private:[!0,!1]});e.apps.data=r.ok?r.result.map(i=>new y.g(i)):[],e.loading=!1})()}OpenFilter(){var e=this;return(0,u.Z)(function*(){yield(yield e.dialog.open($,{data:e.filter,panelClass:"filter-dialog"})).afterClosed().subscribe(function(){var i=(0,u.Z)(function*(s){s&&(Object.keys(s).map(d=>{e.filter[d]=s[d]}),e.filters.update(e.filter),e.list())});return function(s){return i.apply(this,arguments)}}())})()}options(e){var r=this;return(0,u.Z)(function*(){var i;r.sheet.show({role:e.role,title:e.title,options:[{icon:"edit",title:"Edit",handler:(i=(0,u.Z)(function*(){r.router.navigate(["/features","editor"],{queryParams:{mode:"update",featureId:e.featureId}})}),function(){return i.apply(this,arguments)}),disabled:[0,1]},{icon:"content_copy",title:"Copy",handler:function(){var i=(0,u.Z)(function*(){r.router.navigate(["/features","editor"],{queryParams:{mode:"copy",featureId:e.featureId}})});return function(){return i.apply(this,arguments)}}(),disabled:[0,1]},{icon:"delete",title:"Delete",danger:!0,handler:function(){var i=(0,u.Z)(function*(){var s;r.confirm.show({message:"Are you sure you want to delete "+e.title+"?",handler:(s=(0,u.Z)(function*(){r.loading=!0;const d=yield r.service.delete({featureId:e.featureId});if(d.ok){for(let p=0;p<r.features.data.length;p++)if(r.features.data[p].featureId==e.featureId){r.features.data.splice(p,1),r.toast.show("Feature was removed!");break}r.features.data=r.features.data.map(p=>new T(p))}else r.toast.show(d.error.message);r.loading=!1}),function(){return s.apply(this,arguments)})})});return function(){return i.apply(this,arguments)}}(),disabled:[0,1]}]})})()}unfilter(e,r){this.filter[e]=this.filter[e].filter(i=>i!=r),this.filters.update(this.filter),this.list()}ngOnInit(){var r,e=this;this.features.sort=this.sort,this.features.sort.active="title",this.features.sort.direction="asc",this.observers.loaded=this.config.loaded.subscribe(function(){var i=(0,u.Z)(function*(s){s&&(yield e.load(),yield e.list())});return function(s){return i.apply(this,arguments)}}()),this.observers.search=null===(r=this.search)||void 0===r?void 0:r.change.subscribe(i=>{this.features.filter=i})}ngOnDestroy(){var e,r;null===(e=this.observers.loaded)||void 0===e||e.unsubscribe(),null===(r=this.observers.search)||void 0===r||r.unsubscribe()}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(b.b),t.Y36(q.k),t.Y36(I.uw),t.Y36(B.I),t.Y36(Q.E),t.Y36(W.q),t.Y36(h.F0),t.Y36(z.z),t.Y36(w.k))},a.\u0275cmp=t.Xpm({type:a,selectors:[["features-page"]],viewQuery:function(e,r){if(1&e&&(t.Gf(g.YE,7),t.Gf(E.g,7)),2&e){let i;t.iGM(i=t.CRH())&&(r.sort=i.first),t.iGM(i=t.CRH())&&(r.search=i.first)}},decls:25,vars:11,consts:[["for","features"],["placeholder","Filter features.."],["mat-icon-button","",3,"click"],["mode","indeterminate",4,"ngIf"],["class","filterbar",4,"ngIf"],["mat-table","","fxShow","","fxHide.xs","true","matSort","",3,"dataSource"],["matColumnDef","title"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","description"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",3,"click",4,"matRowDef","matRowDefColumns"],["fxHide","","fxShow.xs","true"],["lines","full","matRipple","",3,"click",4,"ngFor","ngForOf"],["mat-fab","","color","primary","routerLink","editor",1,"add-floating-button",3,"queryParams"],["mode","indeterminate"],[1,"filterbar"],[3,"removed",4,"ngFor","ngForOf"],[3,"removed"],["matChipRemove",""],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-row",""],["mat-row","",3,"click"],["lines","full","matRipple","",3,"click"]],template:function(e,r){1&e&&(t.TgZ(0,"mat-toolbar"),t._UZ(1,"mat-menu-button"),t.TgZ(2,"label",0),t._uU(3," Features "),t.qZA(),t._UZ(4,"search",1),t.TgZ(5,"button",2),t.NdJ("click",function(){return r.OpenFilter()}),t.TgZ(6,"mat-icon"),t._uU(7," filter_list "),t.qZA(),t.qZA(),t.qZA(),t.YNc(8,tt,1,0,"mat-progress-bar",3),t.TgZ(9,"mat-content"),t.YNc(10,rt,2,1,"mat-chip-list",4),t.TgZ(11,"table",5),t.ynx(12,6),t.YNc(13,at,2,0,"th",7),t.YNc(14,ot,2,1,"td",8),t.BQk(),t.ynx(15,9),t.YNc(16,it,2,0,"th",7),t.YNc(17,nt,2,1,"td",8),t.BQk(),t.YNc(18,st,1,0,"tr",10),t.YNc(19,lt,1,0,"tr",11),t.qZA(),t.TgZ(20,"mat-list",12),t.YNc(21,ut,6,2,"mat-list-item",13),t.qZA(),t.qZA(),t.TgZ(22,"button",14),t.TgZ(23,"mat-icon"),t._uU(24," add "),t.qZA(),t.qZA()),2&e&&(t.xp6(8),t.Q6J("ngIf",r.loading),t.xp6(2),t.Q6J("ngIf",r.filter.appId.length>0),t.xp6(1),t.Q6J("dataSource",r.features),t.xp6(7),t.Q6J("matHeaderRowDef",t.DdM(8,H))("matHeaderRowDefSticky",!0),t.xp6(1),t.Q6J("matRowDefColumns",t.DdM(9,H)),t.xp6(2),t.Q6J("ngForOf",r.features.data),t.xp6(1),t.Q6J("queryParams",t.DdM(10,dt)))},directives:[v.Ye,V.v,E.g,Z.lW,_.Hw,m.O5,x.pW,A.s,F.qn,m.sg,F.HS,c.hX,F.qH,f.BZ,K.b8,g.YE,f.w1,f.fO,f.ge,g.nU,f.Dz,f.ev,f.as,f.XQ,f.nj,f.Gk,Y.i$,Y.Tg,h.rH],pipes:[k.z],styles:["mat-list[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:row}"]}),a})();var pt=n(7756),U=n(7093),j=n(8833);function ct(a,o){1&a&&t._UZ(0,"mat-progress-bar",15)}function mt(a,o){if(1&a&&(t.TgZ(0,"mat-option",16),t._uU(1),t.qZA()),2&a){const e=o.$implicit;t.Q6J("value",e.appId),t.xp6(1),t.hij(" ",e.name," ")}}function gt(a,o){if(1&a&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.hij(" ",e.errors.appId," ")}}function ht(a,o){if(1&a&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.hij(" ",e.errors.title," ")}}function vt(a,o){if(1&a&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.hij(" ",e.errors.description," ")}}const Zt=function(a){return{name:a}};let xt=(()=>{class a{constructor(e,r,i,s,d,p){this.apps=e,this.toast=r,this.route=i,this.config=s,this.router=d,this.service=p,this.form=new l.cw({appId:new l.NI(null,[l.kI.required]),title:new l.NI(null,[l.kI.required]),description:new l.NI(null,[l.kI.required])}),this.errors={appId:"",title:"",description:""},this.loading=!1,this.observers={}}get(){var e=this;return(0,u.Z)(function*(){e.loading=!0;const r=yield e.service.get({filter:["role","appId","title","description"],featureId:e.featureId});if(r.ok){const i=new T(r.result);i.role>=2?(e.form.controls.appId.setValue(i.appId),e.form.controls.title.setValue(i.title),e.form.controls.description.setValue(i.description)):(e.toast.show("You have insufficient rights to edit this feature!"),e.router.navigate(["/features"]))}else e.toast.show(r.error.message),e.router.navigate(["/features"]);e.loading=!1})()}load(){var e=this;return(0,u.Z)(function*(){e.loading=!0;const r=yield e.apps.list({filter:["role","name","icon","appId"]});r.ok?e.apps.data=r.result.map(i=>new y.g(i)).filter(i=>i.role>=2):(e.apps.data=[],e.toast.show(r.error.message)),e.loading=!1})()}submit(){var e=this;return(0,u.Z)(function*(){e.loading=!0;let r=e.mode;"copy"==r&&(r="add",delete e.featureId);const i=yield e.service[r]({appId:e.form.value.appId,title:e.form.value.title,featureId:e.featureId,description:e.form.value.description});i.ok?e.router.navigate(["/features"]):e.toast.show(i.error.message),e.loading=!1})()}ngOnInit(){var e=this;this.observers.loaded=this.config.loaded.subscribe(function(){var r=(0,u.Z)(function*(i){if(i){const s=e.route.snapshot.queryParams;e.mode=s.mode,e.featureId=s.featureId,yield e.load(),"add"!=e.mode&&(yield e.get())}});return function(i){return r.apply(this,arguments)}}())}ngOnDestroy(){var e;null===(e=this.observers.loaded)||void 0===e||e.unsubscribe()}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(b.b),t.Y36(q.k),t.Y36(h.gz),t.Y36(Q.E),t.Y36(h.F0),t.Y36(w.k))},a.\u0275cmp=t.Xpm({type:a,selectors:[["features-editor-page"]],decls:33,vars:17,consts:[["for","feature editor"],["mode","indeterminate",4,"ngIf"],["fxLayout","row","fxLayoutAlign","center flex-start"],["fxFlex","60","fxFlex.lg","70","fxFlex.md","80","fxFlex.sm","90","fxFlex.xs","100",3,"formGroup","ngSubmit"],["appearance","outline"],["name","appId","placeholder","appId","formControlName","appId","required",""],["placeholderLabel","Filter apps...","noEntriesFoundLabel","There are no apps matching your query!"],["filter",""],[3,"value",4,"ngFor","ngForOf"],[4,"ngIf"],["matInput","","type","text","name","title","placeholder","title","formControlName","title","required",""],["matInput","","type","text","name","description","placeholder","description","formControlName","description","required",""],["type","submit",2,"display","none"],["button",""],["type","button","mat-flat-button","","color","primary",3,"click"],["mode","indeterminate"],[3,"value"]],template:function(e,r){if(1&e){const i=t.EpF();t.TgZ(0,"mat-toolbar"),t._UZ(1,"mat-back-button"),t.TgZ(2,"label",0),t._uU(3),t.qZA(),t.qZA(),t.YNc(4,ct,1,0,"mat-progress-bar",1),t.TgZ(5,"mat-content",2),t.TgZ(6,"form",3),t.NdJ("ngSubmit",function(){return!r.loading&&!r.form.invalid&&r.submit()}),t.TgZ(7,"mat-form-field",4),t.TgZ(8,"mat-label"),t._uU(9," App "),t.qZA(),t.TgZ(10,"mat-select",5),t.TgZ(11,"mat-option"),t._UZ(12,"ngx-mat-select-search",6,7),t.qZA(),t.YNc(14,mt,2,2,"mat-option",8),t.ALo(15,"filterBy"),t.ALo(16,"orderBy"),t.qZA(),t.YNc(17,gt,2,1,"mat-error",9),t.qZA(),t.TgZ(18,"mat-form-field",4),t.TgZ(19,"mat-label"),t._uU(20," Title "),t.qZA(),t._UZ(21,"input",10),t.YNc(22,ht,2,1,"mat-error",9),t.qZA(),t.TgZ(23,"mat-form-field",4),t.TgZ(24,"mat-label"),t._uU(25," Description "),t.qZA(),t._UZ(26,"input",11),t.YNc(27,vt,2,1,"mat-error",9),t.qZA(),t._UZ(28,"button",12,13),t.qZA(),t.qZA(),t.TgZ(30,"mat-footer"),t.TgZ(31,"button",14),t.NdJ("click",function(){return t.CHM(i),t.MAs(29).click()}),t._uU(32," Submit "),t.qZA(),t.qZA()}if(2&e){const i=t.MAs(13);t.xp6(3),t.lnq(" ","add"==r.mode?"Create Feature":""," ","copy"==r.mode?"Copy Feature":""," ","update"==r.mode?"Edit Feature":""," "),t.xp6(1),t.Q6J("ngIf",r.loading),t.xp6(2),t.Q6J("formGroup",r.form),t.xp6(8),t.Q6J("ngForOf",t.xi3(15,9,t.xi3(16,12,r.apps.data,"name"),t.VKq(15,Zt,i.value))),t.xp6(3),t.Q6J("ngIf",r.errors.appId),t.xp6(5),t.Q6J("ngIf",r.errors.title),t.xp6(5),t.Q6J("ngIf",r.errors.description)}},directives:[v.Ye,pt.x,m.O5,x.pW,A.s,U.xw,U.Wh,l._Y,l.JL,U.yH,l.sg,c.KE,c.hX,P.gD,l.JJ,l.u,l.Q7,N.ey,C.nu,m.sg,c.TO,j.Nt,l.Fj,O.A,Z.lW],pipes:[M.g,D.T],styles:["[upload][_ngcontent-%COMP%]{width:100px;margin:auto;height:100px;border:2px solid transparent;display:flex;align-items:center;border-radius:100%;justify-content:center;background-color:#eee}[upload].required[_ngcontent-%COMP%]{border-color:red}mat-footer[_ngcontent-%COMP%], mat-content[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column}mat-footer[_ngcontent-%COMP%]   form[_ngcontent-%COMP%], mat-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{max-width:400px;margin-top:20px}mat-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], mat-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;max-width:400px}mat-footer[_ngcontent-%COMP%]{justify-content:center}"]}),a})();var Ft=n(949),yt=n(8248),Tt=n(2217),It=n(7375),bt=n(2155),_t=n(2604),At=n(4274),Pt=n(1065),Ct=n(5612),Yt=n(5896);const Ut=[{path:"",component:ft},{path:"editor",component:xt}];let Jt=(()=>{class a{}return a.\u0275fac=function(e){return new(e||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[[l.u5,m.ez,Ft.t,Y.ie,_.Ps,yt._,g.JX,j.c,F.Hi,f.p0,Tt.l,Z.ot,P.LD,It.M,bt.o9,_t.o,At.X,v.g0,c.lN,Pt.w,Yt.n,Ct.G,l.UX,x.Cv,C.Co,h.Bz.forChild(Ut)]]}),a})()}}]);