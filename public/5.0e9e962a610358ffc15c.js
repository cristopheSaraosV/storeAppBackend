(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{X3zk:function(e,o,t){"use strict";t.r(o),t.d(o,"LoginModule",function(){return P});var r=t("ofXK"),l=t("tyNb"),i=t("fXoL");const n=["loginPage"];let s=(()=>{class e{constructor(e){this.renderer2=e}ngAfterViewInit(){this.change()}ngOnInit(){}change(){const e=this.loginPageContainer.nativeElement;this.renderer2.setStyle(e,"background","#212529");let o=document.documentElement.clientHeight.toString()+"px";this.renderer2.setStyle(e,"height",o);let t=document.documentElement.clientWidth.toString()+"px";this.renderer2.setStyle(e,"width",t)}}return e.\u0275fac=function(o){return new(o||e)(i.Kb(i.E))},e.\u0275cmp=i.Eb({type:e,selectors:[["app-template-login"]],viewQuery:function(e,o){if(1&e&&i.xc(n,1),2&e){let e;i.lc(e=i.Yb())&&(o.loginPageContainer=e.first)}},decls:7,vars:0,consts:[["loginPage",""],[1,"row","justify-content-md-center","justify-content-lg-center"],[1,"col-sm-12","col-md-6","col-lg-6"],[1,"container","mt-5"],[1,"bg-white","p-5","rounded-container"]],template:function(e,o){1&e&&(i.Qb(0,"div",null,0),i.Qb(2,"div",1),i.Qb(3,"div",2),i.Qb(4,"div",3),i.Qb(5,"div",4),i.Lb(6,"router-outlet"),i.Pb(),i.Pb(),i.Pb(),i.Pb(),i.Pb())},directives:[l.f],styles:[".rounded-container[_ngcontent-%COMP%]{\n          border-radius:20px\n      }"]}),e})();var c=t("3Pt+"),a=t("7zfz"),b=t("lGQG"),d=t("Gxio");function m(e,o){1&e&&(i.Qb(0,"span",22),i.uc(1," The mail is required "),i.Pb())}function u(e,o){if(1&e&&(i.Qb(0,"span",22),i.uc(1),i.Pb()),2&e){const e=i.Zb();i.zb(1),i.wc(" The password is required, must have ",6-e.loginForm.controls.password.value.length," characters as a minimum ")}}const p=[{path:"",component:s,children:[{path:"login",component:(()=>{class e{constructor(e,o,t,r){this.fb=e,this.authService=o,this.router=t,this.messageService=r}ngOnInit(){this.loginForm=this.fb.group({email:["test1@gmail.com",[c.m.email,c.m.required]],password:["test1_pass",[c.m.required,c.m.minLength(6)]]})}login(){this.authService.login(this.loginForm.controls.email.value,this.loginForm.controls.password.value).subscribe(e=>{e.hasOwnProperty("error")&&this.messageService.add({severity:"error",summary:e.error.msg,detail:""}),1==e&&(this.messageService.add({severity:"success",summary:"Welcome!",detail:""}),this.router.navigateByUrl("/store/home"))})}fieldIsValid(e){return this.loginForm.controls[e].errors&&this.loginForm.controls[e].touched}}return e.\u0275fac=function(o){return new(o||e)(i.Kb(c.b),i.Kb(b.a),i.Kb(l.b),i.Kb(a.d))},e.\u0275cmp=i.Eb({type:e,selectors:[["app-login"]],features:[i.yb([a.d])],decls:34,vars:4,consts:[[3,"formGroup","ngSubmit"],[1,"mb-4"],[1,"row","justify-content-lg-center"],[1,"col-sm-12","col-md-8"],[1,"display-3"],[1,"display-6","text-secondary"],[1,"mb-3","row","justify-content-lg-center"],["for","staticEmail",1,"col-sm-12","col-md-4","col-lg-2","col-form-label"],[1,"col-sm-12","col-md-8","col-lg-6"],["type","email","id","staticEmail","formControlName","email","required","","placeholder","email@example.com",1,"form-control"],["class","input-group alert alert-danger mb-2 mt-3",4,"ngIf"],["for","inputPassword",1,"col-sm-12","col-md-4","col-lg-2","col-form-label"],["type","password","formControlName","password","id","inputPassword","required","","placeholder","Password",1,"form-control"],[1,"col-sm-12","col-md-8","col-lg-6","col-form-label"],[1,"text-muted"],["routerLink","/access/register",1,"link-warning","mx-"],[1,"col-sm-12","col-md-8","col-lg-2"],[1,"mb-3","row","mt-4"],["for","inputPassword",1,"col-sm-2","col-form-label"],[1,"col-sm-10"],[1,"d-grid","gap-2"],["type","submit","id","inputPassword",1,"btn","btn-warning","btn-lg","mx-sm-2",3,"disabled"],[1,"input-group","alert","alert-danger","mb-2","mt-3"]],template:function(e,o){1&e&&(i.Qb(0,"form",0),i.Xb("ngSubmit",function(){return o.login()}),i.Qb(1,"div",1),i.Qb(2,"div",2),i.Qb(3,"div",3),i.Qb(4,"h1",4),i.uc(5," MyStore "),i.Qb(6,"small",5),i.uc(7," 1.0"),i.Pb(),i.Pb(),i.Pb(),i.Pb(),i.Pb(),i.Qb(8,"div",6),i.Qb(9,"label",7),i.uc(10,"Email"),i.Pb(),i.Qb(11,"div",8),i.Lb(12,"input",9),i.sc(13,m,2,0,"span",10),i.Pb(),i.Pb(),i.Qb(14,"div",6),i.Qb(15,"label",11),i.uc(16,"Password"),i.Pb(),i.Qb(17,"div",8),i.Lb(18,"input",12),i.sc(19,u,2,1,"span",10),i.Pb(),i.Pb(),i.Qb(20,"div",6),i.Qb(21,"div",13),i.Qb(22,"small",14),i.uc(23,"You do not have an account? "),i.Qb(24,"a",15),i.uc(25,"Register here"),i.Pb(),i.Pb(),i.Pb(),i.Lb(26,"div",16),i.Pb(),i.Qb(27,"div",17),i.Lb(28,"label",18),i.Qb(29,"div",19),i.Qb(30,"div",20),i.Qb(31,"button",21),i.uc(32," Login "),i.Pb(),i.Pb(),i.Pb(),i.Pb(),i.Pb(),i.Lb(33,"p-toast")),2&e&&(i.gc("formGroup",o.loginForm),i.zb(13),i.gc("ngIf",o.fieldIsValid("email")),i.zb(6),i.gc("ngIf",o.fieldIsValid("password")),i.zb(12),i.gc("disabled",o.loginForm.invalid))},directives:[c.n,c.g,c.d,c.a,c.f,c.c,c.k,r.l,l.d,d.a],styles:[""]}),e})()},{path:"register",component:(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=i.Eb({type:e,selectors:[["app-register"]],decls:33,vars:0,consts:[["action",""],[1,"mb-3"],[1,"mb-3","row","justify-content-lg-center"],[1,"mb-4","col-sm-12","col-md-8","display-3"],["for","staticEmail",1,"col-sm-12","col-md-4","col-lg-2","col-form-label"],[1,"col-sm-12","col-md-8","col-lg-6"],["type","text","id","staticEmail","placeholder","email@example.com",1,"form-control"],["for","inputPassword",1,"col-form-label","col-sm-12","col-md-4","col-lg-2"],["type","password","id","inputPassword","placeholder","Password",1,"form-control"],["for","inputPassword",1,"col-sm-12","col-md-4","col-lg-2","col-form-label"],["type","password","id","inputPassword","placeholder","Repeat password",1,"form-control"],[1,"col-sm-12","col-md-8","col-lg-6","col-form-label"],[1,"text-muted"],["routerLink","/access/login",1,"link-warning","mx-"],[1,"col-sm-12","col-md-8","col-lg-2"],[1,"mb-3","row","mt-4"],["for","inputPassword",1,"col-sm-2","col-form-label"],[1,"col-sm-10"],[1,"d-grid","gap-2"],["type","password","id","inputPassword",1,"btn","btn-warning","btn-lg","mx-sm-2"]],template:function(e,o){1&e&&(i.Qb(0,"form",0),i.Lb(1,"div",1),i.Qb(2,"div",2),i.Qb(3,"h1",3),i.uc(4,"Register"),i.Pb(),i.Pb(),i.Qb(5,"div",2),i.Qb(6,"label",4),i.uc(7,"Email"),i.Pb(),i.Qb(8,"div",5),i.Lb(9,"input",6),i.Pb(),i.Pb(),i.Qb(10,"div",2),i.Qb(11,"label",7),i.uc(12,"Password"),i.Pb(),i.Qb(13,"div",5),i.Lb(14,"input",8),i.Pb(),i.Pb(),i.Qb(15,"div",2),i.Qb(16,"label",9),i.uc(17,"Repeat password"),i.Pb(),i.Qb(18,"div",5),i.Lb(19,"input",10),i.Pb(),i.Pb(),i.Qb(20,"div",2),i.Qb(21,"div",11),i.Qb(22,"small",12),i.uc(23,"You have an account? "),i.Qb(24,"a",13),i.uc(25,"Login"),i.Pb(),i.Pb(),i.Pb(),i.Lb(26,"div",14),i.Pb(),i.Qb(27,"div",15),i.Lb(28,"label",16),i.Qb(29,"div",17),i.Qb(30,"div",18),i.Qb(31,"button",19),i.uc(32," Login "),i.Pb(),i.Pb(),i.Pb(),i.Pb(),i.Pb())},directives:[c.n,c.g,l.d],encapsulation:2}),e})()},{path:"**",redirectTo:"login"}]}];let g=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=i.Ib({type:e}),e.\u0275inj=i.Hb({imports:[[l.e.forChild(p)],l.e]}),e})();var f=t("YOmw");let P=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=i.Ib({type:e}),e.\u0275inj=i.Hb({imports:[[r.b,g,c.j,f.a]]}),e})()}}]);