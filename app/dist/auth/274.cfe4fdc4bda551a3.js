"use strict";(self.webpackChunkauth=self.webpackChunkauth||[]).push([[274],{5274:(J,d,a)=>{a.r(d),a.d(d,{SignUpPageModule:()=>Y});var m=a(5861),n=a(3075),c=a(2340),e=a(5e3),A=a(649),l=a(6696),w=a(8939),P=a(5358),b=a(4602),U=a(2109),S=a(8863),h=a(7093),f=a(9224),g=a(9808),y=a(5899),p=a(7322),v=a(8833),T=a(7446),Z=a(7423);function I(t,i){1&t&&e._UZ(0,"mat-progress-bar",21)}function C(t,i){if(1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&t){const o=e.oxw();e.xp6(1),e.hij(" ",o.errors.name.first," ")}}function q(t,i){if(1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&t){const o=e.oxw();e.xp6(1),e.hij(" ",o.errors.name.last," ")}}function O(t,i){if(1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&t){const o=e.oxw();e.xp6(1),e.hij(" ",o.errors.email," ")}}function N(t,i){if(1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&t){const o=e.oxw();e.xp6(1),e.hij(" ",o.errors.password," ")}}function x(t,i){if(1&t&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&t){const o=e.oxw();e.xp6(1),e.hij(" ",o.errors.confirm," ")}}let _=(()=>{class t{constructor(o,r,s,u,W,R,H){this.toast=o,this.route=r,this.config=s,this.router=u,this.apps=W,this.service=R,this.formerror=H,this.app={icon:c.N.icon,name:c.N.name,privacyPolicy:c.N.urlPrivacyPolicy,termsAndConditions:c.N.urlTermsAndConditions},this.form=new n.cw({name:new n.cw({last:new n.NI(null,[n.kI.required]),first:new n.NI(null,[n.kI.required])}),email:new n.NI(null,[n.kI.email,n.kI.required]),confirm:new n.NI(null,[n.kI.required]),password:new n.NI(null,[n.kI.required]),privacyPolicy:new n.NI(!1,[n.kI.required]),newsAndChanges:new n.NI(!0,[n.kI.required]),termsAndConditions:new n.NI(!1,[n.kI.required])}),this.errors={name:{last:"",first:""},email:"",confirm:"",password:"",privacyPolicy:"",newsAndChanges:"",termsAndConditions:""},this.loading=!1,this.observers={}}submit(){var o=this;return(0,m.Z)(function*(){o.loading=!0;const r=o.route.snapshot.queryParams,s=yield o.service.register({name:{last:o.form.value.name.last,first:o.form.value.name.first},appId:r.appId,email:o.form.value.email,confirm:o.form.value.confirm,password:o.form.value.password,privacyPolicy:o.form.value.privacyPolicy,newsAndChanges:o.form.value.newsAndChanges,termsAndConditions:o.form.value.termsAndConditions});s.ok?(o.toast.show("Sign up successfull!"),o.router.navigate(["/verify-account"],{queryParams:{email:o.form.value.email},replaceUrl:!0,queryParamsHandling:"merge"})):(o.toast.show(s.error.message),72==s.error.code&&o.router.navigate(["/verify-account"],{queryParams:{email:o.form.value.email},replaceUrl:!0,queryParamsHandling:"merge"})),o.loading=!1})()}ngOnInit(){var o=this;this.observers.form=this.form.valueChanges.subscribe(r=>{this.errors=this.formerror.validateForm(this.form,this.errors,!0)}),this.observers.loaded=this.config.loaded.subscribe(function(){var r=(0,m.Z)(function*(s){s&&(o.app.icon=c.N.icon,o.app.name=c.N.name,o.app.privacyPolicy=c.N.urlPrivacyPolicy,o.app.termsAndConditions=c.N.urlTermsAndConditions)});return function(s){return r.apply(this,arguments)}}()),this.observers.confirm=this.form.controls.confirm.valueChanges.subscribe(r=>{void 0!==r&&null!=r&&void 0!==this.form.value.password&&null!=this.form.value.password&&r!=this.form.value.password&&(this.errors.confirm="Passwords do not match!",this.form.controls.confirm.setErrors({noMatch:"Passwords do not match!"}))}),this.observers.password=this.form.controls.password.valueChanges.subscribe(r=>{void 0!==r&&null!=r&&void 0!==this.form.value.confirm&&null!=this.form.value.confirm&&r!=this.form.value.confirm&&(this.errors.password="Passwords do not match!",this.form.controls.password.setErrors({noMatch:"Passwords do not match!"}))})}ngOnDestroy(){var o,r,s,u;null===(o=this.observers.form)||void 0===o||o.unsubscribe(),null===(r=this.observers.loaded)||void 0===r||r.unsubscribe(),null===(s=this.observers.confirm)||void 0===s||s.unsubscribe(),null===(u=this.observers.password)||void 0===u||u.unsubscribe()}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(A.k),e.Y36(l.gz),e.Y36(w.E),e.Y36(l.F0),e.Y36(P.b),e.Y36(b.B),e.Y36(U.J))},t.\u0275cmp=e.Xpm({type:t,selectors:[["signup-page"]],decls:57,vars:12,consts:[["fxLayout","column","fxLayoutAlign","center center"],["mode","indeterminate",4,"ngIf"],[1,"icon"],[3,"formGroup","ngSubmit"],["formGroupName","name"],["appearance","outline"],["matInput","","type","text","name","first name","placeholder","first name","formControlName","first","required",""],[4,"ngIf"],["matInput","","type","text","name","last name","placeholder","last name","formControlName","last","required",""],["matInput","","type","email","name","email","placeholder","email","formControlName","email","required",""],["matInput","","type","password","name","password","placeholder","password","formControlName","password","required",""],["matInput","","type","password","name","confirm password","placeholder","confirm password","formControlName","confirm","required",""],["color","primary","formControlName","newsAndChanges"],["color","primary","formControlName","privacyPolicy"],["color","primary","formControlName","termsAndConditions"],[1,"button-footer"],["type","button","mat-stroked-button","","color","primary","routerLink","/signin","queryParamsHandling","preserve"],["type","submit","mat-flat-button","","color","primary"],[1,"row-below-card"],["href","https://www.bitid.co.za","target","_blank"],["target","_blank",3,"href"],["mode","indeterminate"]],template:function(o,r){1&o&&(e.TgZ(0,"mat-content",0),e.TgZ(1,"mat-card"),e.YNc(2,I,1,0,"mat-progress-bar",1),e._UZ(3,"div",2),e.TgZ(4,"h1"),e._uU(5," Sign Up "),e.qZA(),e.TgZ(6,"p"),e._uU(7),e.qZA(),e.TgZ(8,"form",3),e.NdJ("ngSubmit",function(){return r.form.value.confirm==r.form.value.password&&!r.loading&&!r.form.invalid&&r.submit()}),e.TgZ(9,"section",4),e.TgZ(10,"mat-form-field",5),e.TgZ(11,"mat-label"),e._uU(12," First Name "),e.qZA(),e._UZ(13,"input",6),e.YNc(14,C,2,1,"mat-error",7),e.qZA(),e.TgZ(15,"mat-form-field",5),e.TgZ(16,"mat-label"),e._uU(17," Last Name "),e.qZA(),e._UZ(18,"input",8),e.YNc(19,q,2,1,"mat-error",7),e.qZA(),e.qZA(),e.TgZ(20,"mat-form-field",5),e.TgZ(21,"mat-label"),e._uU(22," Email "),e.qZA(),e._UZ(23,"input",9),e.YNc(24,O,2,1,"mat-error",7),e.qZA(),e.TgZ(25,"mat-form-field",5),e.TgZ(26,"mat-label"),e._uU(27," Password "),e.qZA(),e._UZ(28,"input",10),e.YNc(29,N,2,1,"mat-error",7),e.qZA(),e.TgZ(30,"mat-form-field",5),e.TgZ(31,"mat-label"),e._uU(32," Confirm Password "),e.qZA(),e._UZ(33,"input",11),e.YNc(34,x,2,1,"mat-error",7),e.qZA(),e.TgZ(35,"mat-checkbox",12),e._uU(36," I want to receive news & changes "),e.qZA(),e.TgZ(37,"mat-checkbox",13),e._uU(38," I have read and agree to the privacy policy "),e.TgZ(39,"b"),e._uU(40," Required to continue! "),e.qZA(),e.qZA(),e.TgZ(41,"mat-checkbox",14),e._uU(42," I have read and agree to the terms & conditions "),e.TgZ(43,"b"),e._uU(44," Required to continue! "),e.qZA(),e.qZA(),e.TgZ(45,"div",15),e.TgZ(46,"button",16),e._uU(47," Sign In "),e.qZA(),e.TgZ(48,"button",17),e._uU(49," Next "),e.qZA(),e.qZA(),e.qZA(),e.TgZ(50,"div",18),e.TgZ(51,"a",19),e._uU(52," Powered by biTid "),e.qZA(),e.TgZ(53,"a",20),e._uU(54," Privacy Policy "),e.qZA(),e.TgZ(55,"a",20),e._uU(56," Terms & Conditions "),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&o&&(e.xp6(2),e.Q6J("ngIf",r.loading),e.xp6(1),e.Udp("background-image","url("+r.app.icon+")"),e.xp6(4),e.hij(" to use ",r.app.name," "),e.xp6(1),e.Q6J("formGroup",r.form),e.xp6(6),e.Q6J("ngIf",r.errors.name.first),e.xp6(5),e.Q6J("ngIf",r.errors.name.last),e.xp6(5),e.Q6J("ngIf",r.errors.email),e.xp6(5),e.Q6J("ngIf",r.errors.password),e.xp6(5),e.Q6J("ngIf",r.errors.confirm),e.xp6(19),e.Q6J("href",r.app.privacyPolicy,e.LSH),e.xp6(2),e.Q6J("href",r.app.termsAndConditions,e.LSH))},directives:[S.s,h.xw,h.Wh,f.a8,g.O5,y.pW,n._Y,n.JL,n.sg,n.x0,p.KE,p.hX,v.Nt,n.Fj,n.JJ,n.u,n.Q7,p.TO,T.oG,Z.lW,l.rH],styles:["mat-card[_ngcontent-%COMP%]{width:calc(100% - 48px);max-width:400px}mat-card[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%]{top:0;left:0;right:0;position:absolute;border-top-left-radius:4px;border-top-right-radius:4px}mat-card[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{width:100px;height:100px;margin:8px auto;display:block;background-size:cover;background-repeat:no-repeat;background-position:center center}mat-card[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], mat-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:8px!important;text-align:center}mat-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px}mat-card[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%]{position:relative;margin-bottom:12px}mat-card[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{top:16px;left:24px;color:#9e9e9e;position:absolute;font-size:12px;font-weight:500}mat-card[_ngcontent-%COMP%]   .button-footer[_ngcontent-%COMP%]{display:flex;margin-top:8px;justify-content:space-between;flex-direction:row}mat-card[_ngcontent-%COMP%]   .button-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:calc(50% - 8px)}mat-card[_ngcontent-%COMP%]   .row-below-card[_ngcontent-%COMP%]{top:calc(100% + 8px);left:0;right:0;height:10px;display:flex;padding:0 16px;position:absolute;flex-direction:row;justify-content:space-between}mat-card[_ngcontent-%COMP%]   .row-below-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#9e9e9e;font-size:12px;font-weight:500;text-decoration:none}mat-card[_ngcontent-%COMP%]   .row-below-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#3f51b5;text-decoration:underline}"]}),t})();const E=["class","page"];let M=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-terms-and-conditions",8,"page"]],attrs:E,decls:46,vars:0,template:function(o,r){1&o&&(e.TgZ(0,"h1"),e._uU(1,"Terms & Conditions"),e.qZA(),e.TgZ(2,"h2"),e._uU(3,"Limitation of Liability"),e.qZA(),e.TgZ(4,"p"),e._uU(5," IN NO EVENT SHALL FS-SYSTEMS OR ITS AFFILIATES OR SUPPLIERS BE LIABLE FOR ANY DAMAGES WHATSOEVER, INCLUDING, WITHOUT LIMITATION, INCIDENTAL, DIRECT, INDIRECT, SPECIAL, AND CONSEQUENTIAL DAMAGES, DAMAGES FOR LOSS OF BUSINESS PROFITS, BUSINESS INTERRUPTION, LOSS OF BUSINESS INFORMATION, OR OTHER PECUNIARY LOSS ARISING OUT OF THE USE OR INABILITY TO USE THE SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, AND NOTWITHSTANDING FAULT, NEGLIGENCE, AND THE FAILURE OF THE ESSENTIAL PURPOSE.\n"),e.qZA(),e.TgZ(6,"h2"),e._uU(7,"Acceptance of Terms"),e.qZA(),e.TgZ(8,"p"),e._uU(9," By downloading or using the app, these terms automatically apply to you. It is essential to read them carefully before using the app. You are not allowed to copy, modify the app, or our trademarks in any way. You are also prohibited from attempting to extract the source code of the app, translating the app into other languages, or making derivative versions. The app and all related trademarks, copyrights, database rights, and other intellectual property rights remain the property of FS-Systems. "),e.qZA(),e.TgZ(10,"h2"),e._uU(11,"Changes to the App"),e.qZA(),e.TgZ(12,"p"),e._uU(13," FS-Systems is committed to ensuring the app's usefulness and efficiency. Therefore, we reserve the right to make changes to the app or to charge for its services at any time and for any reason. We will always make it clear to you what you are paying for before charging you for the app or its services. "),e.qZA(),e.TgZ(14,"h2"),e._uU(15,"Personal Data and Security"),e.qZA(),e.TgZ(16,"p"),e._uU(17," The FS-Systems Open Source IoT Platform app stores and processes personal data that you have provided to us to provide our Service. It is your responsibility to keep your phone and access to the app secure. We recommend that you do not jailbreak or root your phone, as it may compromise your phone's security and the app's functionality. "),e.qZA(),e.TgZ(18,"h2"),e._uU(19,"Third-Party Services"),e.qZA(),e.TgZ(20,"p"),e._uU(21," The app uses third-party services that have their own Terms and Conditions. Links to the Terms and Conditions of third-party service providers used by the app are provided, and you should review them. Flowgear - https://www.flowgear.net/terms-and-conditions/ "),e.qZA(),e.TgZ(22,"h2"),e._uU(23,"Internet Connection and Data Charges"),e.qZA(),e.TgZ(24,"p"),e._uU(25," Certain app functions require an active internet connection. FS-Systems is not responsible for the app's full functionality if you lack access to Wi-Fi or have exhausted your data allowance. You may be charged by your mobile provider for data or other third-party charges. By using the app, you accept responsibility for such charges, including roaming data charges if applicable. "),e.qZA(),e.TgZ(26,"h2"),e._uU(27,"Device Maintenance"),e.qZA(),e.TgZ(28,"p"),e._uU(29," You are responsible for ensuring your device stays charged. FS-Systems cannot accept responsibility if your device runs out of battery and you cannot access the Service. "),e.qZA(),e.TgZ(30,"h2"),e._uU(31,"Reliance on Third-Party Information"),e.qZA(),e.TgZ(32,"p"),e._uU(33," While we strive to ensure the app is updated and correct, we rely on third parties for information. FS-Systems accepts no liability for any direct or indirect loss resulting from relying solely on the app's functionality. "),e.qZA(),e.TgZ(34,"h2"),e._uU(35,"App Updates and Termination"),e.qZA(),e.TgZ(36,"p"),e._uU(37," We may update the app, and you must accept updates to continue using it. We may also terminate the app's use at any time without notice. Upon termination, the rights and licenses granted to you will end, and you must stop using and, if necessary, delete the app from your device. "),e.qZA(),e.TgZ(38,"h2"),e._uU(39,"Changes to Terms & Conditions"),e.qZA(),e.TgZ(40,"p"),e._uU(41," We may update our Terms & Conditions from time to time. You are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Terms & Conditions on this page. These terms and conditions are effective as of November 1, 2023. "),e.qZA(),e.TgZ(42,"h2"),e._uU(43,"Contact Us"),e.qZA(),e.TgZ(44,"p"),e._uU(45," If you have any questions or suggestions about our Terms & Conditions, please do not hesitate to contact us at v.support@fs-systems.co.za. "),e.qZA())},styles:[""]}),t})();var F=a(2155),L=a(4274);const k=["class","page"],D=[{path:"",component:_},{path:"terms-and-conditions",component:M},{path:"privacy-policy",component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-privacy-policy",8,"page"]],attrs:k,decls:40,vars:0,template:function(o,r){1&o&&(e.TgZ(0,"h1"),e._uU(1,"Privacy Policy"),e.qZA(),e.TgZ(2,"p"),e._uU(3," FS-Systems has developed the Dijital IoT Platform app as an Open Source application. This service is provided by FS-Systems at no cost and is intended for use as is. This page is used to inform visitors regarding our policies concerning the collection, use, and disclosure of Personal Information should anyone choose to use our Service. By using our Service, you agree to the collection and use of information in accordance with this policy. The Personal Information we collect is used to provide and enhance the Service, and we will not use or share your information with anyone except as described in this Privacy Policy. The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at FS-Systems Open Source IoT Platform unless otherwise defined in this Privacy Policy. "),e.qZA(),e.TgZ(4,"h2"),e._uU(5,"Information Collection and Use"),e.qZA(),e.TgZ(6,"p"),e._uU(7," For an improved experience while using our Service, we may request you to provide specific personally identifiable information, including but not limited to email, phone number, and name. The information we request will be retained by us and used as described in this privacy policy. The app may also use third-party services that may collect information used to identify you. "),e.qZA(),e.TgZ(8,"h2"),e._uU(9,"Log Data"),e.qZA(),e.TgZ(10,"p"),e._uU(11," Please be aware that when you use our Service and in the event of an error in the app, we collect data and information (through third-party products) on your device, known as Log Data. Log Data may include information such as your device's Internet Protocol (\u201cIP\u201d) address, device name, operating system version, the configuration of the app when using our Service, the time and date of your use of the Service, and other statistics.\n"),e.qZA(),e.TgZ(12,"h2"),e._uU(13,"Cookies"),e.qZA(),e.TgZ(14,"p"),e._uU(15," Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory. This Service does not use these \u201ccookies\u201d explicitly. However, the app may use third party code and libraries that use \u201ccookies\u201d to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service. "),e.qZA(),e.TgZ(16,"h2"),e._uU(17,"Service Providers"),e.qZA(),e.TgZ(18,"p"),e._uU(19," We may engage third-party companies and individuals for the following purposes: To facilitate our Service To provide the Service on our behalf To perform Service-related services To assist us in analyzing how our Service is used We want to inform users of this Service that these third parties have access to your Personal Information. The reason for this access is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose. "),e.qZA(),e.TgZ(20,"h2"),e._uU(21,"Security"),e.qZA(),e.TgZ(22,"p"),e._uU(23," We value your trust in providing us with your Personal Information, and we strive to use commercially acceptable means to protect it. However, it's important to note that no method of transmission over the internet or electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security. "),e.qZA(),e.TgZ(24,"h2"),e._uU(25,"Links to Other Sites"),e.qZA(),e.TgZ(26,"p"),e._uU(27," Our Service may contain links to other websites. If you click on a third-party link, you will be directed to that site. Please note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. "),e.qZA(),e.TgZ(28,"h2"),e._uU(29,"Children\u2019s Privacy"),e.qZA(),e.TgZ(30,"p"),e._uU(31," Our Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If we discover that a child under 13 has provided us with personal information, we will immediately delete it from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take the necessary actions. "),e.qZA(),e.TgZ(32,"h2"),e._uU(33,"Changes to This Privacy Policy"),e.qZA(),e.TgZ(34,"p"),e._uU(35," We may update our Privacy Policy from time to time. We advise you to periodically review this page for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. This policy is effective as of November 1, 2023. "),e.qZA(),e.TgZ(36,"h2"),e._uU(37,"Contact Us"),e.qZA(),e.TgZ(38,"p"),e._uU(39," If you have any questions or suggestions about our Privacy Policy, please do not hesitate to contact us at v.support@fs-systems.co.za. "),e.qZA())},styles:[""]}),t})()}];let Y=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[n.u5,g.ez,f.QW,v.c,Z.ot,L.X,F.o9,T.p9,p.lN,n.UX,y.Cv,l.Bz.forChild(D)]]}),t})()}}]);