(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"4+IK":function(t,r,e){"use strict";e.r(r),e.d(r,"AccountModule",(function(){return S}));var o=e("ofXK"),n=e("NFeN"),a=e("STbY"),s=e("qFsG"),i=e("d3UM"),c=e("bTqV"),m=e("/t3+"),u=e("Rxhi"),b=e("kmnG"),l=e("mrSG"),f=e("O5Os"),p=e("3Pt+"),d=e("fXoL"),h=e("d3yR"),g=e("9ZKQ"),w=e("IRyT"),v=e("tyNb"),C=e("bv9b");function T(t,r){1&t&&d.Pb(0,"mat-progress-bar",16)}function y(t,r){if(1&t&&(d.Ub(0,"mat-error"),d.Ac(1),d.Tb()),2&t){const t=d.gc();d.Cb(1),d.Cc(" ",t.errors.name_first," ")}}function U(t,r){if(1&t&&(d.Ub(0,"mat-error"),d.Ac(1),d.Tb()),2&t){const t=d.gc();d.Cb(1),d.Cc(" ",t.errors.name_last," ")}}function O(t,r){if(1&t&&(d.Ub(0,"mat-error"),d.Ac(1),d.Tb()),2&t){const t=d.gc();d.Cb(1),d.Cc(" ",t.errors.username," ")}}let x=(()=>{class t{constructor(t,r,e){this.menu=t,this.toast=r,this.service=e,this.form=new p.d({picture:new p.b("",[p.p.required]),username:new p.b("",[p.p.required]),name_last:new p.b("",[p.p.required]),name_first:new p.b("",[p.p.required])}),this.errors={picture:"",username:"",name_last:"",name_first:""},this.subscriptions={}}submit(){return Object(l.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.service.update({name:{last:this.form.value.name_last,first:this.form.value.name_first},picture:this.form.value.picture,username:this.form.value.username});this.loading=!1,this.toast.success(t.ok?"account was updated!":"issue updating account!")}))}ngOnInit(){this.subscriptions.user=this.service.user.subscribe(t=>{this.form.controls.picture.setValue(t.picture),this.form.controls.username.setValue(t.username),this.form.controls.name_last.setValue(t.name.last),this.form.controls.name_first.setValue(t.name.first)}),this.subscriptions.uplaod=this.uplaod.change.subscribe(t=>{this.form.controls.picture.setValue(t)})}ngOnDestroy(){this.subscriptions.user.unsubscribe(),this.subscriptions.uplaod.unsubscribe()}}return t.\u0275fac=function(r){return new(r||t)(d.Ob(h.a),d.Ob(g.a),d.Ob(w.a))},t.\u0275cmp=d.Ib({type:t,selectors:[["app-account-page"]],viewQuery:function(t,r){var e;1&t&&d.xc(f.a,!0),2&t&&d.qc(e=d.dc())&&(r.uplaod=e.first)},decls:32,vars:7,consts:[["color","primary"],["mat-icon-button","",1,"menu-toggle",3,"click"],[1,"page-label","spacer"],["mode","indeterminate","color","accent",4,"ngIf"],[1,"page-body"],[3,"formGroup","ngSubmit"],["label","picture",3,"value","required"],["appearance","outline"],["text-uppercase",""],["matInput","","type","text","name","name_first","placeholder","first name","formControlName","name_first","required",""],[4,"ngIf"],["matInput","","type","text","name","name_last","placeholder","last name","formControlName","name_last","required",""],["matInput","","type","text","name","username","placeholder","username","formControlName","username","required",""],["type","submit","mat-flat-button","","color","primary"],["type","button","mat-flat-button","","color","accent","margin-top","","routerLink","change-password"],["type","button","mat-flat-button","","color","warn","margin-top","","routerLink","remove-account"],["mode","indeterminate","color","accent"]],template:function(t,r){1&t&&(d.Ub(0,"mat-toolbar",0),d.Ub(1,"button",1),d.cc("click",(function(){return r.menu.toggle()})),d.Ub(2,"mat-icon"),d.Ac(3," menu "),d.Tb(),d.Tb(),d.Ub(4,"div",2),d.Ac(5," account "),d.Tb(),d.Tb(),d.zc(6,T,1,0,"mat-progress-bar",3),d.Ub(7,"div",4),d.Ub(8,"form",5),d.cc("ngSubmit",(function(){return!r.form.invalid&&r.submit()})),d.Pb(9,"app-image-upload",6),d.Ub(10,"section"),d.Ub(11,"mat-form-field",7),d.Ub(12,"mat-label",8),d.Ac(13," first name "),d.Tb(),d.Pb(14,"input",9),d.zc(15,y,2,1,"mat-error",10),d.Tb(),d.Ub(16,"mat-form-field",7),d.Ub(17,"mat-label",8),d.Ac(18," last name "),d.Tb(),d.Pb(19,"input",11),d.zc(20,U,2,1,"mat-error",10),d.Tb(),d.Tb(),d.Ub(21,"mat-form-field",7),d.Ub(22,"mat-label",8),d.Ac(23," username "),d.Tb(),d.Pb(24,"input",12),d.zc(25,O,2,1,"mat-error",10),d.Tb(),d.Ub(26,"button",13),d.Ac(27," update "),d.Tb(),d.Ub(28,"button",14),d.Ac(29," change password "),d.Tb(),d.Ub(30,"button",15),d.Ac(31," remove account "),d.Tb(),d.Tb(),d.Tb()),2&t&&(d.Cb(6),d.nc("ngIf",r.loading),d.Cb(2),d.nc("formGroup",r.form),d.Cb(1),d.nc("value",r.form.value.picture)("required",!r.form.value.picture||r.errors.picture),d.Cb(6),d.nc("ngIf",r.errors.name_first),d.Cb(5),d.nc("ngIf",r.errors.name_last),d.Cb(5),d.nc("ngIf",r.errors.username))},directives:[m.a,c.a,n.a,o.l,p.q,p.j,p.e,f.a,b.c,b.g,s.a,p.a,p.i,p.c,p.o,v.d,C.a,b.b],styles:["form[_ngcontent-%COMP%]{width:400px;margin:auto}form[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{display:flex;flex-direction:row}form[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]:last-child{width:calc(50% - 5px);margin-left:5px}form[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]:first-child{width:calc(50% - 5px);margin-right:5px}@media screen and (max-width:420px){form[_ngcontent-%COMP%]{width:calc(100% - 20px)}}"]}),t})();var I=e("dWDE");function _(t,r){1&t&&d.Pb(0,"mat-progress-bar",11)}function P(t,r){if(1&t&&(d.Ub(0,"mat-error"),d.Ac(1),d.Tb()),2&t){const t=d.gc();d.Cb(1),d.Cc(" ",t.errors.password," ")}}let A=(()=>{class t{constructor(t,r,e,o){this.toast=t,this.router=r,this.service=e,this.formerror=o,this.form=new p.d({password:new p.b("",[p.p.required])}),this.errors={password:""},this.subscriptions={}}submit(){return Object(l.a)(this,void 0,void 0,(function*(){this.loading=!0,this.form.disable();const t=yield this.service.removeaccount({password:this.form.value.password});this.form.enable(),this.loading=!1,t.ok?(this.service.logout(),this.toast.success("account was removed!")):this.toast.error("there was an issue removing account!")}))}ngOnInit(){this.subscriptions.form=this.form.valueChanges.subscribe(t=>{this.errors=this.formerror.validateForm(this.form,this.errors,!0)})}ngOnDestroy(){this.subscriptions.form.unsubscribe()}}return t.\u0275fac=function(r){return new(r||t)(d.Ob(g.a),d.Ob(v.c),d.Ob(w.a),d.Ob(I.a))},t.\u0275cmp=d.Ib({type:t,selectors:[["app-remove-account"]],decls:17,vars:3,consts:[["color","primary"],[1,"page-label","spacer"],["mat-icon-button","","routerLink","/account"],["mode","indeterminate","color","accent",4,"ngIf"],[3,"formGroup","ngSubmit"],[1,"notice"],["appearance","outline"],["text-uppercase",""],["matInput","","type","password","name","password","placeholder","password","formControlName","password","required",""],[4,"ngIf"],["type","submit","mat-flat-button","","color","warn"],["mode","indeterminate","color","accent"]],template:function(t,r){1&t&&(d.Ub(0,"mat-toolbar",0),d.Ub(1,"div",1),d.Ac(2," remove account "),d.Tb(),d.Ub(3,"button",2),d.Ub(4,"mat-icon"),d.Ac(5," close "),d.Tb(),d.Tb(),d.Tb(),d.zc(6,_,1,0,"mat-progress-bar",3),d.Ub(7,"form",4),d.cc("ngSubmit",(function(){return!r.form.invalid&&r.submit()})),d.Ub(8,"div",5),d.Ac(9," The removal of your account will mean you can no longer sign in to the bitid platform. This does not remove the assets you have created in the time you have had an account with us and if you wish to signup again your assets will be available to you once again! "),d.Tb(),d.Ub(10,"mat-form-field",6),d.Ub(11,"mat-label",7),d.Ac(12," password "),d.Tb(),d.Pb(13,"input",8),d.zc(14,P,2,1,"mat-error",9),d.Tb(),d.Ub(15,"button",10),d.Ac(16," confirm & remove "),d.Tb(),d.Tb()),2&t&&(d.Cb(6),d.nc("ngIf",r.loading),d.Cb(1),d.nc("formGroup",r.form),d.Cb(7),d.nc("ngIf",r.errors.password))},directives:[m.a,c.a,v.d,n.a,o.l,p.q,p.j,p.e,b.c,b.g,s.a,p.a,p.i,p.c,p.o,C.a,b.b],styles:["form[_ngcontent-%COMP%]{width:400px;margin:auto}.notice[_ngcontent-%COMP%]{padding:0 5px;font-size:12px;text-align:justify;line-height:12px;border-left:4px solid #2196f3;margin-bottom:15px;text-transform:uppercase}@media screen and (max-width:420px){form[_ngcontent-%COMP%]{width:calc(100% - 20px)}}"]}),t})();var q=e("WF9o");function M(t,r){1&t&&d.Pb(0,"mat-progress-bar",12)}function k(t,r){if(1&t&&(d.Ub(0,"mat-error"),d.Ac(1),d.Tb()),2&t){const t=d.gc();d.Cb(1),d.Cc(" ",t.errors.old," ")}}function z(t,r){if(1&t&&(d.Ub(0,"mat-error"),d.Ac(1),d.Tb()),2&t){const t=d.gc();d.Cb(1),d.Cc(" ",t.errors.new," ")}}function N(t,r){if(1&t&&(d.Ub(0,"mat-error"),d.Ac(1),d.Tb()),2&t){const t=d.gc();d.Cb(1),d.Ec(" ",t.errors.confirm," ",t.errors.confirm&&t.form.value.new!=t.form.value.confirm?" & ":""," ",t.form.value.new!=t.form.value.confirm?"Passwords do not match":""," ")}}const j=[{path:"",component:x},{path:"remove-account",component:A},{path:"change-password",component:(()=>{class t{constructor(t,r,e,o,n){this.toast=t,this.router=r,this.service=e,this.formerror=o,this.localstorage=n,this.form=new p.d({old:new p.b("",[p.p.required]),new:new p.b("",[p.p.required]),confirm:new p.b("",[p.p.required])}),this.errors={old:"",new:"",confirm:""},this.subscriptions={}}submit(){return Object(l.a)(this,void 0,void 0,(function*(){this.loading=!0,this.form.disable();const t=yield this.service.changepassword({old:this.form.value.old,new:this.form.value.new,email:this.localstorage.get("email"),confirm:this.form.value.confirm});this.form.enable(),this.loading=!1,t.ok?(this.router.navigate(["/account"]),this.toast.success("password was changed!")):this.toast.error("there was an issue changing password!")}))}ngOnInit(){this.subscriptions.form=this.form.valueChanges.subscribe(t=>{this.errors=this.formerror.validateForm(this.form,this.errors,!0)})}ngOnDestroy(){this.subscriptions.form.unsubscribe()}}return t.\u0275fac=function(r){return new(r||t)(d.Ob(g.a),d.Ob(v.c),d.Ob(w.a),d.Ob(I.a),d.Ob(q.a))},t.\u0275cmp=d.Ib({type:t,selectors:[["app-change-password"]],decls:25,vars:5,consts:[["color","primary"],[1,"page-label","spacer"],["mat-icon-button","","routerLink","/account"],["mode","indeterminate","color","accent",4,"ngIf"],[3,"formGroup","ngSubmit"],["appearance","outline"],["text-uppercase",""],["matInput","","type","password","name","old","placeholder","old","formControlName","old","required",""],[4,"ngIf"],["matInput","","type","password","name","new","placeholder","new","formControlName","new","required",""],["matInput","","type","password","name","confirm","placeholder","confirm","formControlName","confirm","required",""],["type","submit","mat-flat-button","","color","primary"],["mode","indeterminate","color","accent"]],template:function(t,r){1&t&&(d.Ub(0,"mat-toolbar",0),d.Ub(1,"div",1),d.Ac(2," change password "),d.Tb(),d.Ub(3,"button",2),d.Ub(4,"mat-icon"),d.Ac(5," close "),d.Tb(),d.Tb(),d.Tb(),d.zc(6,M,1,0,"mat-progress-bar",3),d.Ub(7,"form",4),d.cc("ngSubmit",(function(){return!r.form.invalid&&r.form.value.new==r.form.value.confirm&&r.submit()})),d.Ub(8,"mat-form-field",5),d.Ub(9,"mat-label",6),d.Ac(10," old "),d.Tb(),d.Pb(11,"input",7),d.zc(12,k,2,1,"mat-error",8),d.Tb(),d.Ub(13,"mat-form-field",5),d.Ub(14,"mat-label",6),d.Ac(15," new "),d.Tb(),d.Pb(16,"input",9),d.zc(17,z,2,1,"mat-error",8),d.Tb(),d.Ub(18,"mat-form-field",5),d.Ub(19,"mat-label",6),d.Ac(20," confirm "),d.Tb(),d.Pb(21,"input",10),d.zc(22,N,2,3,"mat-error",8),d.Tb(),d.Ub(23,"button",11),d.Ac(24," submit "),d.Tb(),d.Tb()),2&t&&(d.Cb(6),d.nc("ngIf",r.loading),d.Cb(1),d.nc("formGroup",r.form),d.Cb(5),d.nc("ngIf",r.errors.old),d.Cb(5),d.nc("ngIf",r.errors.new),d.Cb(5),d.nc("ngIf",r.errors.confirm||r.form.value.new!=r.form.value.confirm))},directives:[m.a,c.a,v.d,n.a,o.l,p.q,p.j,p.e,b.c,b.g,s.a,p.a,p.i,p.c,p.o,C.a,b.b],styles:["form[_ngcontent-%COMP%]{width:400px;margin:auto}@media screen and (max-width:420px){form[_ngcontent-%COMP%]{width:calc(100% - 20px)}}"]}),t})()}];let G=(()=>{class t{}return t.\u0275mod=d.Mb({type:t}),t.\u0275inj=d.Lb({factory:function(r){return new(r||t)},imports:[[v.g.forChild(j)],v.g]}),t})(),S=(()=>{class t{}return t.\u0275mod=d.Mb({type:t}),t.\u0275inj=d.Lb({factory:function(r){return new(r||t)},imports:[[p.f,o.c,n.b,a.a,s.b,i.b,c.b,m.b,u.a,b.e,p.n,G,C.b]]}),t})()}}]);