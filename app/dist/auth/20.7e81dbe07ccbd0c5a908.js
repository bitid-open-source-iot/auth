(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{"05Yv":function(t,e,i){"use strict";i.r(e),i.d(e,"AppsModule",(function(){return Nt}));var o=i("mrSG"),r=i("Ovx2"),n=i("Dh3D"),a=i("3Pt+"),s=i("0IaG"),c=i("fXoL"),l=i("dWDE"),m=i("/t3+"),b=i("kmnG"),h=i("bTqV"),d=i("NFeN"),u=i("4jEk"),p=i("ofXK"),f=i("d3UM"),g=i("FKr1"),v=i("bv9b");function x(t,e){1&t&&c.Nb(0,"mat-progress-bar",9)}function S(t,e){if(1&t&&(c.Sb(0,"mat-error"),c.Bc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Dc(" ",t.errors.private," ")}}let w=(()=>{class t{constructor(t,e,i){this.dialog=t,this.config=e,this.formerror=i,this.form=new a.f({private:new a.c([])}),this.errors={private:""},this.subscriptions={}}load(){return Object(o.a)(this,void 0,void 0,(function*(){this.loading=!0,void 0!==this.config.private&&null!=this.config.private&&this.form.controls.private.setValue(this.config.private),this.loading=!1}))}close(){return Object(o.a)(this,void 0,void 0,(function*(){this.dialog.close(!1)}))}submit(){return Object(o.a)(this,void 0,void 0,(function*(){this.dialog.close(this.form.value)}))}ngOnInit(){this.subscriptions.form=this.form.valueChanges.subscribe(t=>{this.errors=this.formerror.validateForm(this.form,this.errors,!0)}),this.load()}ngOnDestroy(){this.subscriptions.form.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(c.Mb(s.d),c.Mb(s.a),c.Mb(l.a))},t.\u0275cmp=c.Gb({type:t,selectors:[["apps-filter-dialog"]],decls:20,vars:5,consts:[[1,"spacer"],["mat-icon-button","",3,"click"],["mode","indeterminate",4,"ngIf"],[3,"formGroup","ngSubmit"],["appearance","outline"],["name","private","formControlName","private","multiple",""],[3,"value"],[4,"ngIf"],["type","submit","color","primary","mat-flat-button",""],["mode","indeterminate"]],template:function(t,e){1&t&&(c.Sb(0,"mat-toolbar"),c.Sb(1,"mat-label",0),c.Bc(2," Filter Apps "),c.Rb(),c.Sb(3,"button",1),c.ac("click",(function(){return e.close()})),c.Sb(4,"mat-icon"),c.Bc(5," close "),c.Rb(),c.Rb(),c.Rb(),c.Sb(6,"mat-content"),c.zc(7,x,1,0,"mat-progress-bar",2),c.Sb(8,"form",3),c.ac("ngSubmit",(function(){return!e.loading&&!e.form.invalid&&e.submit()})),c.Sb(9,"mat-form-field",4),c.Sb(10,"mat-label"),c.Bc(11," Access Mode "),c.Rb(),c.Sb(12,"mat-select",5),c.Sb(13,"mat-option",6),c.Bc(14," Public "),c.Rb(),c.Sb(15,"mat-option",6),c.Bc(16," Private "),c.Rb(),c.Rb(),c.zc(17,S,2,1,"mat-error",7),c.Rb(),c.Sb(18,"button",8),c.Bc(19," submit "),c.Rb(),c.Rb(),c.Rb()),2&t&&(c.Ab(7),c.kc("ngIf",e.loading),c.Ab(1),c.kc("formGroup",e.form),c.Ab(5),c.kc("value",!1),c.Ab(2),c.kc("value",!0),c.Ab(2),c.kc("ngIf",e.errors.private))},directives:[m.a,b.g,h.a,d.a,u.a,p.l,a.w,a.p,a.g,b.c,f.a,a.o,a.e,g.k,v.a,b.b],styles:[".filter-dialog{width:500px!important}.filter-dialog .mat-dialog-container{padding:0!important}@media screen and (max-width:600px){.filter-dialog .mat-dialog-container{top:0;left:0;right:0;bottom:0;z-index:5000;position:fixed;border-radius:0}}"],encapsulation:2}),t})();var R=i("+0xr"),k=i("9ZKQ"),y=i("L7HW"),O=i("u0tM"),C=i("tyNb"),A=i("bS1C"),I=i("BhS5"),B=i("swrf"),q=i("xyCQ"),N=i("WF9o"),M=i("znSr"),z=i("MutI"),D=i("A5z7");function P(t,e){1&t&&c.Nb(0,"mat-progress-bar",14)}function j(t,e){if(1&t){const t=c.Tb();c.Sb(0,"mat-chip",17),c.ac("removed",(function(){c.rc(t);const i=e.$implicit;return c.ec(2).unfilter("private",i)})),c.Sb(1,"mat-icon"),c.Bc(2," accessibility_new "),c.Rb(),c.Sb(3,"mat-label"),c.Bc(4),c.Rb(),c.Sb(5,"mat-icon",18),c.Bc(6," cancel "),c.Rb(),c.Rb()}if(2&t){const t=e.$implicit;c.Ab(4),c.Dc(" ",t?"Private":"Public"," ")}}function F(t,e){if(1&t&&(c.Sb(0,"mat-chip-list",15),c.zc(1,j,7,1,"mat-chip",16),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.kc("ngForOf",t.filter.private)}}function V(t,e){1&t&&(c.Sb(0,"th",19),c.Bc(1," Icon "),c.Rb())}function H(t,e){if(1&t&&(c.Sb(0,"td",20),c.Nb(1,"img",21),c.Rb()),2&t){const t=e.$implicit;c.Ab(1),c.kc("src",t.icon,c.sc)("alt",t.name)}}function _(t,e){1&t&&(c.Sb(0,"th",22),c.Bc(1," Name "),c.Rb())}function T(t,e){if(1&t&&(c.Sb(0,"td",20),c.Bc(1),c.Rb()),2&t){const t=e.$implicit;c.Ab(1),c.Dc(" ",t.name," ")}}function E(t,e){1&t&&(c.Sb(0,"th",22),c.Bc(1," Access Mode "),c.Rb())}function G(t,e){if(1&t&&(c.Sb(0,"td",20),c.Bc(1),c.Rb()),2&t){const t=e.$implicit;c.Ab(1),c.Dc(" ",t.private?"Private":"Public"," ")}}function W(t,e){1&t&&c.Nb(0,"th",19)}function J(t,e){if(1&t){const t=c.Tb();c.Sb(0,"td",20),c.Sb(1,"button",23),c.ac("click",(function(){c.rc(t);const i=e.$implicit;return c.ec().options(i)})),c.Sb(2,"mat-icon"),c.Bc(3," more_vert "),c.Rb(),c.Rb(),c.Rb()}}function $(t,e){1&t&&c.Nb(0,"tr",24)}function L(t,e){1&t&&c.Nb(0,"tr",25)}function U(t,e){if(1&t){const t=c.Tb();c.Sb(0,"mat-list-item",26),c.ac("click",(function(){c.rc(t);const i=e.$implicit;return c.ec().options(i)})),c.Nb(1,"img",27),c.Sb(2,"mat-label"),c.Sb(3,"h3"),c.Bc(4),c.Rb(),c.Rb(),c.Rb()}if(2&t){const t=e.$implicit;c.Ab(1),c.kc("src",t.icon,c.sc)("alt",t.name),c.Ab(3),c.Dc(" ",t.name," ")}}let K=(()=>{class t{constructor(t,e,i,o,r,n,a,s,c,l){this.toast=t,this.config=e,this.dialog=i,this.sheet=o,this.router=r,this.filters=n,this.buttons=a,this.confirm=s,this.service=c,this.localstorage=l,this.apps=new R.k,this.filter=this.filters.get({private:[]}),this.columns=["icon","name","private","options"],this.subscriptions={}}list(){return Object(o.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.service.list({filter:["icon","role","name","appId","private"],private:this.filter.private});this.apps.data=t.ok?t.result.map(t=>new r.a(t)):[],this.loading=!1}))}unfilter(t,e){this.filter[t]=this.filter[t].filter(t=>t!=e),this.filters.update(this.filter),this.list()}options(t){return Object(o.a)(this,void 0,void 0,(function*(){this.sheet.show({role:t.role,title:t.name,options:[{icon:"edit",title:"Edit",handler:()=>Object(o.a)(this,void 0,void 0,(function*(){this.router.navigate(["/apps","editor"],{queryParams:{mode:"update",appId:t.appId}})})),disabled:[0,1]},{icon:"content_copy",title:"Copy",handler:()=>Object(o.a)(this,void 0,void 0,(function*(){this.router.navigate(["/apps","editor"],{queryParams:{mode:"copy",appId:t.appId}})})),disabled:[0,1]},{icon:"people",title:"Subscribers",handler:()=>Object(o.a)(this,void 0,void 0,(function*(){this.router.navigate(["/subscribers"],{queryParams:{id:t.appId,type:"app"}})})),disabled:[0,1,2,3]},{icon:"remove",title:"Unubscribe",danger:!0,handler:()=>Object(o.a)(this,void 0,void 0,(function*(){this.confirm.show({message:"Are you sure you want to unsubscribe from "+t.name+"?",handler:()=>Object(o.a)(this,void 0,void 0,(function*(){this.loading=!0;const e=yield this.service.unsubscribe({appId:t.appId,email:this.localstorage.get("email")});if(e.ok){for(let e=0;e<this.apps.data.length;e++)if(this.apps.data[e].appId==t.appId){this.apps.data.splice(e,1),this.toast.show("You were unsubscribed!");break}this.apps.data=JSON.parse(JSON.stringify(this.apps.data))}else this.toast.show(e.error.message);this.loading=!1}))})})),disabled:[5]},{icon:"delete",title:"Delete",danger:!0,handler:()=>Object(o.a)(this,void 0,void 0,(function*(){this.confirm.show({message:"Are you sure you want to delete "+t.name+"?",handler:()=>Object(o.a)(this,void 0,void 0,(function*(){this.loading=!0;const e=yield this.service.delete({appId:t.appId});if(e.ok){for(let e=0;e<this.apps.data.length;e++)if(this.apps.data[e].appId==t.appId){this.apps.data.splice(e,1),this.toast.show("App was removed!");break}this.apps.data=JSON.parse(JSON.stringify(this.apps.data))}else this.toast.show(e.error.message);this.loading=!1}))})})),disabled:[0,1,2,3,4]}]})}))}describe(t,e,i){let o="-";return t.map(t=>{t[e]==i&&(o=t.description)}),o}ngOnInit(){this.buttons.show("add"),this.buttons.hide("close"),this.buttons.show("filter"),this.buttons.show("search"),this.apps.sort=this.sort,this.apps.sort.active="name",this.apps.sort.direction="asc",this.subscriptions.add=this.buttons.add.click.subscribe(t=>{this.router.navigate(["/apps","editor"],{queryParams:{mode:"add"}})}),this.subscriptions.loaded=this.config.loaded.subscribe(t=>{t&&this.list()}),this.subscriptions.search=this.buttons.search.value.subscribe(t=>{this.apps.filter=t}),this.subscriptions.filter=this.buttons.filter.click.subscribe(t=>Object(o.a)(this,void 0,void 0,(function*(){const t=yield this.dialog.open(w,{data:this.filter,panelClass:"filter-dialog"});yield t.afterClosed().subscribe(t=>Object(o.a)(this,void 0,void 0,(function*(){t&&(Object.keys(t).map(e=>{this.filter[e]=t[e]}),this.filters.update(this.filter),this.list())})))})))}ngOnDestroy(){this.buttons.reset("search"),this.subscriptions.add.unsubscribe(),this.subscriptions.loaded.unsubscribe(),this.subscriptions.search.unsubscribe(),this.subscriptions.filter.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(c.Mb(k.a),c.Mb(y.a),c.Mb(s.b),c.Mb(O.a),c.Mb(C.c),c.Mb(A.a),c.Mb(I.a),c.Mb(B.a),c.Mb(q.a),c.Mb(N.a))},t.\u0275cmp=c.Gb({type:t,selectors:[["apps-page"]],viewQuery:function(t,e){var i;1&t&&c.vc(n.a,!0),2&t&&c.oc(i=c.bc())&&(e.sort=i.first)},decls:19,vars:7,consts:[["mode","indeterminate",4,"ngIf"],["class","filterbar",4,"ngIf"],["mat-table","","fxShow","","fxHide.xs","true","matSort","",3,"dataSource"],["matColumnDef","icon"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["matColumnDef","private"],["matColumnDef","options"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",4,"matRowDef","matRowDefColumns"],["fxHide","","fxShow.xs","true"],["lines","full","matRipple","",3,"click",4,"ngFor","ngForOf"],["mode","indeterminate"],[1,"filterbar"],[3,"removed",4,"ngFor","ngForOf"],[3,"removed"],["matChipRemove",""],["mat-header-cell",""],["mat-cell",""],["width","40","height","40","draggable","false",3,"src","alt"],["mat-header-cell","","mat-sort-header",""],["mat-icon-button","",3,"click"],["mat-header-row",""],["mat-row",""],["lines","full","matRipple","",3,"click"],["slot","start","width","40","height","40","draggable","false",3,"src","alt"]],template:function(t,e){1&t&&(c.zc(0,P,1,0,"mat-progress-bar",0),c.zc(1,F,2,1,"mat-chip-list",1),c.Sb(2,"table",2),c.Qb(3,3),c.zc(4,V,2,0,"th",4),c.zc(5,H,2,2,"td",5),c.Pb(),c.Qb(6,6),c.zc(7,_,2,0,"th",7),c.zc(8,T,2,1,"td",5),c.Pb(),c.Qb(9,8),c.zc(10,E,2,0,"th",7),c.zc(11,G,2,1,"td",5),c.Pb(),c.Qb(12,9),c.zc(13,W,1,0,"th",4),c.zc(14,J,4,0,"td",5),c.Pb(),c.zc(15,$,1,0,"tr",10),c.zc(16,L,1,0,"tr",11),c.Rb(),c.Sb(17,"mat-list",12),c.zc(18,U,5,3,"mat-list-item",13),c.Rb()),2&t&&(c.kc("ngIf",e.loading),c.Ab(1),c.kc("ngIf",e.filter.private.length>0),c.Ab(1),c.kc("dataSource",e.apps),c.Ab(13),c.kc("matHeaderRowDef",e.columns)("matHeaderRowDefSticky",!0),c.Ab(1),c.kc("matRowDefColumns",e.columns),c.Ab(2),c.kc("ngForOf",e.apps.data))},directives:[p.l,R.j,M.a,n.a,R.c,R.e,R.b,R.g,R.i,z.a,p.k,v.a,D.c,D.a,d.a,b.g,D.d,R.d,R.a,n.b,h.a,R.f,R.h,z.b,g.o],styles:[".mat-column-icon[_ngcontent-%COMP%]{width:60px}.mat-column-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:4px}.mat-column-private[_ngcontent-%COMP%]{width:250px}.mat-column-options[_ngcontent-%COMP%]{width:40px;padding-right:16px!important}mat-list[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:row}"]}),t})();var Q=i("FtGj"),Y=i("a6VE"),Z=i("AytR");function X(t,e){if(1&t&&c.Nb(0,"div",2),2&t){const t=c.ec();c.wc("background-image","url("+t.src+")")}}const tt=["*"];let et=(()=>{class t{constructor(t,e,i,o){this.el=t,this.toast=e,this.renderer=i,this.localstorage=o,this.accept="image/*",this.minWidth=0,this.maxWidth=0,this.minHeight=0,this.maxHeight=0,this.onChange=t=>{},this.onTouched=()=>{},this.touched=!1,this.disabled=!1}markAsTouched(){this.touched||(this.onTouched(),this.touched=!0)}writeValue(t){this.src=t}registerOnChange(t){this.onChange=t}registerOnTouched(t){this.onTouched=t}setDisabledState(t){this.disabled=t}ngOnInit(){this.required&&!this.src?(this.renderer.setStyle(this.el.nativeElement,"color","#F44336"),this.renderer.setStyle(this.el.nativeElement,"border-width","2px"),this.renderer.setStyle(this.el.nativeElement,"border-color","#F44336")):(this.renderer.setStyle(this.el.nativeElement,"color","#000000"),this.renderer.setStyle(this.el.nativeElement,"border-width","1px"),this.renderer.setStyle(this.el.nativeElement,"border-color","#e0e0e0")),this.renderer.listen(this.el.nativeElement,"click",()=>{const t=document.createElement("input");t.type="file",t.accept=this.accept,t.multiple=!1,t.onchange=t=>{const e=t.target.files;if(e.length>0){const t=new Image;var i=window.URL||window.webkitURL,o=i.createObjectURL(e[0]);t.onload=t=>t.target.width<this.minWidth&&this.minWidth>0?(this.toast.show("The width of your image must be greater than "+this.minWidth+"px"),!1):t.target.width>this.maxWidth&&this.maxWidth>0?(this.toast.show("The width of your image must be less than "+this.maxWidth+"px"),!1):t.target.height<this.minHeight&&this.minHeight>0?(this.toast.show("The height of your image must be greater than "+this.minHeight+"px"),!1):t.target.height>this.maxHeight&&this.maxHeight>0?(this.toast.show("The height of your image must be less than "+this.maxHeight+"px"),!1):void i.revokeObjectURL(o),t.src=o;const r=new FormData,n=new XMLHttpRequest;for(let i=0;i<e.length;i++)r.append("uploads[]",e[i],e[i].name);n.onreadystatechange=()=>{if(4==n.readyState&&200==n.status){const t=JSON.parse(n.response);this.src=[Z.a.drive,"/drive/files/get?fileId=",t.fileId,"&token=",t.token].join(""),this.renderer.setStyle(this.el.nativeElement,"color","#000000"),this.renderer.setStyle(this.el.nativeElement,"border-width","1px"),this.renderer.setStyle(this.el.nativeElement,"border-color","#e0e0e0"),this.onChange(this.src)}};const a=[Z.a.drive,"/drive/files/upload?","email","=",this.localstorage.get("email"),"&","appId","=",Z.a.appId].join("");n.open("POST",a,!0),n.setRequestHeader("Authorization",this.localstorage.get("token")),n.send(r)}},t.click()})}}return t.\u0275fac=function(e){return new(e||t)(c.Mb(c.l),c.Mb(k.a),c.Mb(c.F),c.Mb(N.a))},t.\u0275cmp=c.Gb({type:t,selectors:[["mat-file"]],inputs:{src:"src",accept:"accept",required:"required",minWidth:["min-width","minWidth"],maxWidth:["max-width","maxWidth"],minHeight:["min-height","minHeight"],maxHeight:["max-height","maxHeight"]},features:[c.zb([{multi:!0,provide:a.m,useExisting:t}])],ngContentSelectors:tt,decls:3,vars:1,consts:[["matRipple",""],["class","src","matRipple","",3,"background-image",4,"ngIf"],["matRipple","",1,"src"]],template:function(t,e){1&t&&(c.jc(),c.ic(0),c.Nb(1,"div",0),c.zc(2,X,1,2,"div",1)),2&t&&(c.Ab(2),c.kc("ngIf",e.src))},directives:[g.o,p.l],styles:["mat-file{width:150px;height:150px;border:1px solid #e0e0e0;display:flex;position:relative;align-items:center;border-radius:5px;margin:4px auto 20px;justify-content:center}mat-file mat-label{top:-5px;left:5px;height:10px;z-index:50;padding:0 3px;position:absolute;font-size:10px;line-height:10px;background-color:#fff}mat-file mat-label span{color:#2196f3}mat-file .src,mat-file [matRipple]{top:0;left:0;right:0;bottom:0;z-index:100;position:absolute;border-radius:2px}mat-file .src{background-size:cover;background-repeat:no-repeat;background-position:50%}mat-file:hover{border:2px solid #000;margin-top:3px;margin-bottom:19px}"],encapsulation:2}),t})();var it=i("qFsG"),ot=i("WJ5W"),rt=i("ihCf"),nt=i("ZRfb"),at=i("AbOq");function st(t,e){if(1&t&&(c.Sb(0,"mat-error"),c.Bc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Dc(" ",t.errors.name," ")}}function ct(t,e){if(1&t&&(c.Sb(0,"mat-error"),c.Bc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Dc(" ",t.errors.secret," ")}}function lt(t,e){if(1&t&&(c.Sb(0,"mat-error"),c.Bc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Dc(" ",t.errors.url," ")}}function mt(t,e){if(1&t&&(c.Sb(0,"mat-option",22),c.Bc(1),c.Rb()),2&t){const t=e.$implicit;c.kc("value",t.url),c.Ab(1),c.Dc(" ",t.url," ")}}function bt(t,e){if(1&t&&(c.Sb(0,"mat-error"),c.Bc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Dc(" ",t.errors.scopes," ")}}function ht(t,e){if(1&t){const t=c.Tb();c.Sb(0,"mat-chip",35),c.ac("removed",(function(){c.rc(t);const i=e.$implicit;return c.ec().remove(i)})),c.Bc(1),c.Sb(2,"mat-icon",36),c.Bc(3," cancel "),c.Rb(),c.Rb()}if(2&t){const t=e.$implicit;c.Ab(1),c.Dc(" ",t," ")}}function dt(t,e){if(1&t&&(c.Sb(0,"mat-error"),c.Bc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Dc(" ",t.errors.theme.color," ")}}function ut(t,e){if(1&t&&(c.Sb(0,"mat-error"),c.Bc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Dc(" ",t.errors.theme.background," ")}}function pt(t,e){if(1&t&&(c.Sb(0,"mat-error"),c.Bc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Dc(" ",t.errors.google.database," ")}}function ft(t,e){if(1&t&&(c.Sb(0,"mat-error"),c.Bc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Dc(" ",t.errors.google.credentials," ")}}function gt(t,e){if(1&t&&(c.Sb(0,"mat-error"),c.Bc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Dc(" ",t.errors.private," ")}}function vt(t,e){if(1&t&&(c.Sb(0,"mat-error"),c.Bc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Dc(" ",t.errors.organizationOnly," ")}}const xt=function(t){return{url:t}};let St=(()=>{class t{constructor(t,e,i,o,r,n,s){this.toast=t,this.route=e,this.scopes=i,this.config=o,this.router=r,this.buttons=n,this.service=s,this.form=new a.f({icons:new a.f({icon72x72:new a.c(null,[a.v.required]),icon96x96:new a.c(null,[a.v.required]),icon128x128:new a.c(null,[a.v.required]),icon144x144:new a.c(null,[a.v.required]),icon152x152:new a.c(null,[a.v.required]),icon192x192:new a.c(null,[a.v.required]),icon384x384:new a.c(null,[a.v.required]),icon512x512:new a.c(null,[a.v.required])}),theme:new a.f({color:new a.c(null,[a.v.required]),background:new a.c(null,[a.v.required])}),google:new a.f({database:new a.c(null,[a.v.required]),credentials:new a.c(null,[a.v.required])}),url:new a.c(null,[a.v.required]),icon:new a.c(null,[a.v.required]),name:new a.c(null,[a.v.required]),secret:new a.c(null,[a.v.required]),scopes:new a.c([],[a.v.required]),domains:new a.c([],[a.v.required]),private:new a.c(null,[a.v.required]),favicon:new a.c(null,[a.v.required]),organizationOnly:new a.c(null,[a.v.required])}),this.errors={icons:{icon72x72:"",icon96x96:"",icon128x128:"",icon144x144:"",icon152x152:"",icon192x192:"",icon384x384:"",icon512x512:""},theme:{color:"",background:""},google:{database:"",credentials:""},url:"",icon:"",name:"",secret:"",scopes:"",domains:"",private:"",favicon:"",organizationOnly:""},this.filter=new a.f({scopes:new a.c("",[a.v.required])}),this.subscriptions={},this.keycodes=[Q.g,Q.c]}get(){return Object(o.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.service.get({filter:["url","role","icon","name","icons","theme","secret","google","scopes","domains","private","favicon","organizationOnly"],appId:this.appId});if(t.ok){const e=new r.a(t.result);e.role>1?(this.form.controls.url.setValue(e.url),this.form.controls.icon.setValue(e.icon),this.form.controls.name.setValue(e.name),this.form.controls.secret.setValue(e.secret),this.form.controls.scopes.setValue(e.scopes),this.form.controls.domains.setValue(e.domains),this.form.controls.private.setValue(e.private),this.form.controls.favicon.setValue(e.favicon),this.form.controls.organizationOnly.setValue(e.organizationOnly),this.form.controls.icons.controls.icon72x72.setValue(e.icons.icon72x72),this.form.controls.icons.controls.icon96x96.setValue(e.icons.icon96x96),this.form.controls.icons.controls.icon128x128.setValue(e.icons.icon128x128),this.form.controls.icons.controls.icon144x144.setValue(e.icons.icon144x144),this.form.controls.icons.controls.icon152x152.setValue(e.icons.icon152x152),this.form.controls.icons.controls.icon192x192.setValue(e.icons.icon192x192),this.form.controls.icons.controls.icon384x384.setValue(e.icons.icon384x384),this.form.controls.icons.controls.icon512x512.setValue(e.icons.icon512x512),this.form.controls.theme.controls.color.setValue(e.theme.color),this.form.controls.theme.controls.background.setValue(e.theme.background),this.form.controls.google.controls.database.setValue(e.google.database),this.form.controls.google.controls.credentials.setValue(JSON.stringify(e.google.credentials,null,4))):(this.toast.show("You have insufficient rights to edit this app!"),this.router.navigate(["/apps"]))}else this.toast.show(t.error.message),this.router.navigate(["/apps"]);this.loading=!1}))}load(){return Object(o.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.scopes.load({filter:["url"]});t.ok?this.scopes.data=t.result.map(t=>t):(this.scopes.data=[],this.toast.show(t.error.message)),this.loading=!1}))}submit(){return Object(o.a)(this,void 0,void 0,(function*(){this.loading=!0;let t=this.mode;"copy"==t&&(t="add",delete this.appId);const e=yield this.service[t]({theme:{color:this.form.value.theme.color,background:this.form.value.theme.background},google:{database:this.form.value.google.database,credentials:this.form.value.google.credentials},url:this.form.value.url,icon:this.form.value.icon,name:this.form.value.name,appId:this.appId,icons:this.form.value.icons,secret:this.form.value.secret,scopes:this.form.value.scopes,private:this.form.value.private,domains:this.form.value.domains,favicon:this.form.value.favicon,organizationOnly:this.form.value.organizationOnly});e.ok?this.router.navigate(["/apps"]):this.toast.show(e.error.message),this.loading=!1}))}upload(t){return Object(o.a)(this,void 0,void 0,(function*(){this.form.controls.icon.setValue(t)}))}remove(t){return Object(o.a)(this,void 0,void 0,(function*(){this.form.value.domains.splice(this.form.value.domains.indexOf(t),1)}))}add(t){return Object(o.a)(this,void 0,void 0,(function*(){const e=this.form.value.domains;null==t.value||""==t.value||e.includes(t.value.trim())||(t.input.value="",e.push(t.value.trim()),this.form.controls.domains.setValue(e))}))}ngOnInit(){this.buttons.hide("add"),this.buttons.show("close"),this.buttons.hide("filter"),this.buttons.hide("search"),this.subscriptions.close=this.buttons.close.click.subscribe(t=>{this.router.navigate(["/apps"])}),this.subscriptions.loaded=this.config.loaded.subscribe(t=>Object(o.a)(this,void 0,void 0,(function*(){if(t){const t=this.route.snapshot.queryParams;this.mode=t.mode,this.appId=t.appId,"add"!=this.mode?(yield this.get(),yield this.load()):yield this.load()}})))}ngOnDestroy(){this.subscriptions.close.unsubscribe(),this.subscriptions.loaded.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(c.Mb(k.a),c.Mb(C.a),c.Mb(Y.a),c.Mb(y.a),c.Mb(C.c),c.Mb(I.a),c.Mb(q.a))},t.\u0275cmp=c.Gb({type:t,selectors:[["apps-editor-page"]],decls:133,vars:65,consts:[[3,"formGroup","ngSubmit"],["formControlName","icon"],["appearance","outline"],["matInput","","type","text","name","name","placeholder","name","formControlName","name","required",""],[4,"ngIf"],["matInput","","type","text","name","secret","placeholder","secret","formControlName","secret","required",""],["matInput","","type","text","name","url","placeholder","main url","formControlName","url","required",""],["name","scopes","placeholder","scopes","formControlName","scopes","required","","multiple",""],[3,"formGroup"],["placeholderLabel","filter scopes","noEntriesFoundLabel","no scopes found","formControlName","scopes"],[3,"value",4,"ngFor","ngForOf"],["aria-label","domain selection"],["domainlist",""],[3,"removed",4,"ngFor","ngForOf"],["placeholder","New domain...",3,"matChipInputFor","matChipInputSeparatorKeyCodes","matChipInputAddOnBlur","matChipInputTokenEnd"],["appearance","outline","formGroupName","theme"],["matInput","","type","color","name","color","placeholder","font color","formControlName","color","required",""],["matInput","","type","color","name","background","placeholder","background color","formControlName","background","required",""],["appearance","outline","formGroupName","google"],["matInput","","type","text","name","database","placeholder","database","formControlName","database","required",""],["matInput","","cdkTextareaAutosize","","name","credentials","placeholder","credentials","formControlName","credentials","required",""],["name","private","formControlName","private","required",""],[3,"value"],["name","organizationOnly","formControlName","organizationOnly","required",""],["required","true","formControlName","favicon",3,"accept","min-width","max-width","min-height","max-height"],["formGroupName","icons"],["required","true","formControlName","icon72x72",3,"min-width","max-width","min-height","max-height"],["required","true","formControlName","icon96x96",3,"min-width","max-width","min-height","max-height"],["required","true","formControlName","icon128x128",3,"min-width","max-width","min-height","max-height"],["required","true","formControlName","icon144x144",3,"min-width","max-width","min-height","max-height"],["required","true","formControlName","icon152x152",3,"min-width","max-width","min-height","max-height"],["required","true","formControlName","icon192x192",3,"min-width","max-width","min-height","max-height"],["required","true","formControlName","icon384x384",3,"min-width","max-width","min-height","max-height"],["required","true","formControlName","icon512x512",3,"min-width","max-width","min-height","max-height"],["type","button","mat-flat-button","","color","primary",3,"disabled","click"],[3,"removed"],["matChipRemove",""]],template:function(t,e){if(1&t&&(c.Sb(0,"mat-content"),c.Sb(1,"form",0),c.ac("ngSubmit",(function(){return!e.loading&&!e.form.invalid&&e.submit()})),c.Sb(2,"mat-file",1),c.Sb(3,"mat-label"),c.Bc(4," Icon "),c.Sb(5,"span"),c.Bc(6,"*"),c.Rb(),c.Rb(),c.Rb(),c.Sb(7,"h2"),c.Bc(8," Details "),c.Rb(),c.Sb(9,"mat-form-field",2),c.Sb(10,"mat-label"),c.Bc(11," Name "),c.Rb(),c.Nb(12,"input",3),c.zc(13,st,2,1,"mat-error",4),c.Rb(),c.Sb(14,"mat-form-field",2),c.Sb(15,"mat-label"),c.Bc(16," Secret "),c.Rb(),c.Nb(17,"input",5),c.zc(18,ct,2,1,"mat-error",4),c.Rb(),c.Sb(19,"mat-form-field",2),c.Sb(20,"mat-label"),c.Bc(21," Main Url "),c.Rb(),c.Nb(22,"input",6),c.zc(23,lt,2,1,"mat-error",4),c.Rb(),c.Sb(24,"mat-form-field",2),c.Sb(25,"mat-label"),c.Bc(26," Scopes "),c.Rb(),c.Sb(27,"mat-select",7),c.Sb(28,"mat-option",8),c.Nb(29,"ngx-mat-select-search",9),c.Rb(),c.zc(30,mt,2,2,"mat-option",10),c.fc(31,"filterBy"),c.Rb(),c.zc(32,bt,2,1,"mat-error",4),c.Rb(),c.Sb(33,"mat-form-field",2),c.Sb(34,"mat-label"),c.Bc(35," Domains "),c.Rb(),c.Sb(36,"mat-chip-list",11,12),c.zc(38,ht,4,1,"mat-chip",13),c.Sb(39,"input",14),c.ac("matChipInputTokenEnd",(function(t){return e.add(t)})),c.Rb(),c.Rb(),c.Rb(),c.Sb(40,"h2"),c.Bc(41," Theme "),c.Rb(),c.Sb(42,"mat-form-field",15),c.Sb(43,"mat-label"),c.Bc(44," Font Color "),c.Rb(),c.Nb(45,"input",16),c.zc(46,dt,2,1,"mat-error",4),c.Rb(),c.Sb(47,"mat-form-field",15),c.Sb(48,"mat-label"),c.Bc(49," Background Color "),c.Rb(),c.Nb(50,"input",17),c.zc(51,ut,2,1,"mat-error",4),c.Rb(),c.Sb(52,"h2"),c.Bc(53," Google "),c.Rb(),c.Sb(54,"mat-form-field",18),c.Sb(55,"mat-label"),c.Bc(56," Database "),c.Rb(),c.Nb(57,"input",19),c.zc(58,pt,2,1,"mat-error",4),c.Rb(),c.Sb(59,"mat-form-field",18),c.Sb(60,"mat-label"),c.Bc(61," Credentials "),c.Rb(),c.Nb(62,"textarea",20),c.zc(63,ft,2,1,"mat-error",4),c.Rb(),c.Sb(64,"h2"),c.Bc(65," Access Control "),c.Rb(),c.Sb(66,"mat-form-field",2),c.Sb(67,"mat-label"),c.Bc(68," Access Mode "),c.Rb(),c.Sb(69,"mat-select",21),c.Sb(70,"mat-option",22),c.Bc(71," Public "),c.Rb(),c.Sb(72,"mat-option",22),c.Bc(73," Private "),c.Rb(),c.Rb(),c.zc(74,gt,2,1,"mat-error",4),c.Rb(),c.Sb(75,"mat-form-field",2),c.Sb(76,"mat-label"),c.Bc(77," Sharing Rules "),c.Rb(),c.Sb(78,"mat-select",23),c.Sb(79,"mat-option",22),c.Bc(80," Share To Anyone "),c.Rb(),c.Sb(81,"mat-option",22),c.Bc(82," In Organization Only "),c.Rb(),c.Rb(),c.zc(83,vt,2,1,"mat-error",4),c.Rb(),c.Sb(84,"mat-file",24),c.Sb(85,"mat-label"),c.Bc(86," Favicon (256x256) "),c.Sb(87,"span"),c.Bc(88,"*"),c.Rb(),c.Rb(),c.Rb(),c.Sb(89,"div",25),c.Sb(90,"mat-file",26),c.Sb(91,"mat-label"),c.Bc(92," Icon (72x72) "),c.Sb(93,"span"),c.Bc(94,"*"),c.Rb(),c.Rb(),c.Rb(),c.Sb(95,"mat-file",27),c.Sb(96,"mat-label"),c.Bc(97," Icon (96x96) "),c.Sb(98,"span"),c.Bc(99,"*"),c.Rb(),c.Rb(),c.Rb(),c.Sb(100,"mat-file",28),c.Sb(101,"mat-label"),c.Bc(102," Icon (128x128) "),c.Sb(103,"span"),c.Bc(104,"*"),c.Rb(),c.Rb(),c.Rb(),c.Sb(105,"mat-file",29),c.Sb(106,"mat-label"),c.Bc(107," Icon (144x144) "),c.Sb(108,"span"),c.Bc(109,"*"),c.Rb(),c.Rb(),c.Rb(),c.Sb(110,"mat-file",30),c.Sb(111,"mat-label"),c.Bc(112," Icon (152x152) "),c.Sb(113,"span"),c.Bc(114,"*"),c.Rb(),c.Rb(),c.Rb(),c.Sb(115,"mat-file",31),c.Sb(116,"mat-label"),c.Bc(117," Icon (192x192) "),c.Sb(118,"span"),c.Bc(119,"*"),c.Rb(),c.Rb(),c.Rb(),c.Sb(120,"mat-file",32),c.Sb(121,"mat-label"),c.Bc(122," Icon (384x384) "),c.Sb(123,"span"),c.Bc(124,"*"),c.Rb(),c.Rb(),c.Rb(),c.Sb(125,"mat-file",33),c.Sb(126,"mat-label"),c.Bc(127," Icon (512x512) "),c.Sb(128,"span"),c.Bc(129,"*"),c.Rb(),c.Rb(),c.Rb(),c.Rb(),c.Rb(),c.Rb(),c.Sb(130,"mat-footer"),c.Sb(131,"button",34),c.ac("click",(function(){return!e.loading&&!e.form.invalid&&e.submit()})),c.Bc(132),c.Rb(),c.Rb()),2&t){const t=c.pc(37);c.Ab(1),c.kc("formGroup",e.form),c.Ab(12),c.kc("ngIf",e.errors.name),c.Ab(5),c.kc("ngIf",e.errors.secret),c.Ab(5),c.kc("ngIf",e.errors.url),c.Ab(5),c.kc("formGroup",e.filter),c.Ab(2),c.kc("ngForOf",c.hc(31,60,e.scopes.data,c.mc(63,xt,e.filter.value.scopes))),c.Ab(2),c.kc("ngIf",e.errors.scopes),c.Ab(6),c.kc("ngForOf",e.form.value.domains),c.Ab(1),c.kc("matChipInputFor",t)("matChipInputSeparatorKeyCodes",e.keycodes)("matChipInputAddOnBlur",!0),c.Ab(7),c.kc("ngIf",e.errors.theme.color),c.Ab(5),c.kc("ngIf",e.errors.theme.background),c.Ab(7),c.kc("ngIf",e.errors.google.database),c.Ab(5),c.kc("ngIf",e.errors.google.credentials),c.Ab(7),c.kc("value",!1),c.Ab(2),c.kc("value",!0),c.Ab(2),c.kc("ngIf",e.errors.private),c.Ab(5),c.kc("value",0),c.Ab(2),c.kc("value",1),c.Ab(2),c.kc("ngIf",e.errors.organizationOnly),c.Ab(1),c.kc("accept","image/x-icon")("min-width",256)("max-width",256)("min-height",256)("max-height",256),c.Ab(6),c.kc("min-width",72)("max-width",72)("min-height",72)("max-height",72),c.Ab(5),c.kc("min-width",96)("max-width",96)("min-height",96)("max-height",96),c.Ab(5),c.kc("min-width",128)("max-width",128)("min-height",128)("max-height",128),c.Ab(5),c.kc("min-width",144)("max-width",144)("min-height",144)("max-height",144),c.Ab(5),c.kc("min-width",152)("max-width",152)("min-height",152)("max-height",152),c.Ab(5),c.kc("min-width",192)("max-width",192)("min-height",192)("max-height",192),c.Ab(5),c.kc("min-width",384)("max-width",384)("min-height",384)("max-height",384),c.Ab(5),c.kc("min-width",512)("max-width",512)("min-height",512)("max-height",512),c.Ab(6),c.kc("disabled",e.form.invalid),c.Ab(1),c.Dc(" ",e.mode," ")}},directives:[u.a,a.w,a.p,a.g,et,a.o,a.e,b.g,b.c,it.a,a.b,a.u,p.l,f.a,g.k,ot.a,p.k,D.c,D.b,a.h,rt.b,nt.a,h.a,b.b,D.a,d.a,D.d],pipes:[at.a],styles:["[upload][_ngcontent-%COMP%]{width:100px;margin:auto;height:100px;border:2px solid transparent;display:flex;align-items:center;border-radius:100%;justify-content:center;background-color:#eee}[upload].required[_ngcontent-%COMP%]{border-color:red}mat-content[_ngcontent-%COMP%], mat-footer[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column}mat-content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%], mat-footer[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{max-width:400px;margin-top:20px}mat-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], mat-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;max-width:400px}mat-footer[_ngcontent-%COMP%]{justify-content:center}"]}),t})();var wt=i("5Yg0");let Rt=(()=>{class t{}return t.\u0275mod=c.Kb({type:t}),t.\u0275inj=c.Jb({factory:function(e){return new(e||t)},imports:[[p.c,g.p]]}),t})();var kt=i("gyTc"),yt=i("R32p"),Ot=i("wZkO"),Ct=i("tVzd"),At=i("YUcS"),It=i("H0Zp"),Bt=i("p/0r");const qt=[{path:"",component:K},{path:"editor",component:St}];let Nt=(()=>{class t{}return t.\u0275mod=c.Kb({type:t}),t.\u0275inj=c.Jb({factory:function(e){return new(e||t)},imports:[[a.i,p.c,wt.a,n.c,kt.a,Ot.a,d.b,z.c,Rt,yt.a,D.e,R.l,it.b,s.c,f.b,g.p,h.b,Ct.a,m.b,It.a,At.a,Bt.a,b.e,a.t,v.b,ot.b,C.g.forChild(qt)]]}),t})()}}]);