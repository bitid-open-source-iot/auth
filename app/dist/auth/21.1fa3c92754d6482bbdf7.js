(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{aDni:function(t,n,c){"use strict";c.r(n),c.d(n,"TokensModule",(function(){return j}));var i=c("mrSG"),e=c("+0xr"),o=c("fXoL"),a=c("RgeU"),r=c("znSr"),s=c("MutI"),l=c("ofXK"),b=c("bTqV"),m=c("NFeN"),p=c("FKr1");function d(t,n){1&t&&(o.Rb(0,"th",12),o.Ac(1," Icon "),o.Qb())}function f(t,n){if(1&t&&(o.Rb(0,"td",13),o.Mb(1,"img",14),o.Qb()),2&t){const t=n.$implicit;o.Ab(1),o.jc("src",t.app.icon,o.rc)("alt",t.app.name)}}function u(t,n){1&t&&(o.Rb(0,"th",12),o.Ac(1," App "),o.Qb())}function h(t,n){if(1&t&&(o.Rb(0,"td",13),o.Ac(1),o.Qb()),2&t){const t=n.$implicit;o.Ab(1),o.Cc(" ",t.app.name," ")}}function y(t,n){1&t&&(o.Rb(0,"th",12),o.Ac(1," Description "),o.Qb())}function g(t,n){if(1&t&&(o.Rb(0,"td",13),o.Ac(1),o.Qb()),2&t){const t=n.$implicit;o.Ab(1),o.Cc(" ",t.description," ")}}function w(t,n){1&t&&(o.Rb(0,"th",12),o.Ac(1," Expiry "),o.Qb())}function R(t,n){if(1&t&&(o.Rb(0,"td",13),o.Ac(1),o.ec(2,"date"),o.Qb()),2&t){const t=n.$implicit;o.Ab(1),o.Cc(" ",o.gc(2,1,t.expiry,"yyyy/MM/dd HH:mm")," ")}}function A(t,n){1&t&&o.Mb(0,"th",12)}function C(t,n){1&t&&(o.Rb(0,"td",13),o.Rb(1,"button",15),o.Rb(2,"mat-icon"),o.Ac(3," more_vert "),o.Qb(),o.Qb(),o.Qb())}function x(t,n){1&t&&o.Mb(0,"tr",16)}function O(t,n){1&t&&o.Mb(0,"tr",17)}function k(t,n){if(1&t){const t=o.Sb();o.Rb(0,"mat-list-item",18),o.Zb("click",(function(){o.qc(t);const c=n.$implicit;return o.dc().options(c)})),o.Mb(1,"img",19),o.Rb(2,"mat-label"),o.Rb(3,"h3"),o.Ac(4),o.Rb(5,"small"),o.Ac(6),o.Qb(),o.Qb(),o.Rb(7,"p"),o.Ac(8),o.ec(9,"date"),o.Qb(),o.Qb(),o.Qb()}if(2&t){const t=n.$implicit;o.Ab(1),o.jc("src",t.app.icon,o.rc)("alt",t.app.name),o.Ab(3),o.Cc(" ",t.description," "),o.Ab(2),o.Cc(" ",t.app.name," "),o.Ab(2),o.Cc(" ",o.gc(9,5,t.expiry,"yyyy/MM/dd HH:mm")," ")}}let M=(()=>{class t{constructor(t){this.service=t,this.tokens=new e.k,this.columns=["icon","app","description","expiry","options"]}list(){return Object(i.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.service.list({filter:["app","role","device","scopes","expiry","tokenId","description"]});this.tokens.data=t.ok?t.result:[],this.loading=!1}))}options(t){return Object(i.a)(this,void 0,void 0,(function*(){}))}ngOnInit(){this.list()}ngOnDestroy(){}}return t.\u0275fac=function(n){return new(n||t)(o.Lb(a.a))},t.\u0275cmp=o.Fb({type:t,selectors:[["tokens-page"]],decls:20,vars:5,consts:[["mat-table","","fxShow","","fxHide.xs","true",3,"dataSource"],["matColumnDef","icon"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","app"],["matColumnDef","description"],["matColumnDef","expiry"],["matColumnDef","options"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",4,"matRowDef","matRowDefColumns"],["fxHide","","fxShow.xs","true"],["lines","full","matRipple","",3,"click",4,"ngFor","ngForOf"],["mat-header-cell",""],["mat-cell",""],["width","40","height","40","draggable","false",3,"src","alt"],["mat-icon-button",""],["mat-header-row",""],["mat-row",""],["lines","full","matRipple","",3,"click"],["slot","start","width","40","height","40","draggable","false",3,"src","alt"]],template:function(t,n){1&t&&(o.Rb(0,"table",0),o.Pb(1,1),o.yc(2,d,2,0,"th",2),o.yc(3,f,2,2,"td",3),o.Ob(),o.Pb(4,4),o.yc(5,u,2,0,"th",2),o.yc(6,h,2,1,"td",3),o.Ob(),o.Pb(7,5),o.yc(8,y,2,0,"th",2),o.yc(9,g,2,1,"td",3),o.Ob(),o.Pb(10,6),o.yc(11,w,2,0,"th",2),o.yc(12,R,3,4,"td",3),o.Ob(),o.Pb(13,7),o.yc(14,A,1,0,"th",2),o.yc(15,C,4,0,"td",3),o.Ob(),o.yc(16,x,1,0,"tr",8),o.yc(17,O,1,0,"tr",9),o.Qb(),o.Rb(18,"mat-list",10),o.yc(19,k,10,8,"mat-list-item",11),o.Qb()),2&t&&(o.jc("dataSource",n.tokens),o.Ab(16),o.jc("matHeaderRowDef",n.columns)("matHeaderRowDefSticky",!0),o.Ab(1),o.jc("matRowDefColumns",n.columns),o.Ab(2),o.jc("ngForOf",n.tokens.data))},directives:[e.j,r.a,e.c,e.e,e.b,e.g,e.i,s.a,l.k,e.d,e.a,b.a,m.a,e.f,e.h,s.b,p.o],pipes:[l.e],styles:[".mat-column-icon[_ngcontent-%COMP%]{width:60px}.mat-column-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:4px}.mat-column-expiry[_ngcontent-%COMP%]{width:150px}.mat-column-options[_ngcontent-%COMP%]{width:40px;padding-right:16px!important}mat-list[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:row}"]}),t})();var Q=c("wZkO"),D=c("YUcS"),v=c("H0Zp"),H=c("tyNb");const P=[{path:"",component:M}];let j=(()=>{class t{}return t.\u0275mod=o.Jb({type:t}),t.\u0275inj=o.Ib({factory:function(n){return new(n||t)},imports:[[l.c,Q.a,m.b,s.c,e.l,p.p,b.b,v.a,D.a,H.f.forChild(P)]]}),t})()}}]);