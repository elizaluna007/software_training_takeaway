(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login_phone"],{"0aa7":function(t,e,a){t.exports=a.p+"static/img/orange4.ea377db6.png"},"1de5":function(t,e,a){"use strict";t.exports=function(t,e){return e||(e={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},"2a81":function(t,e,a){var n=a("8376");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=a("4f06").default;o("a28bb72c",n,!0,{sourceMap:!1,shadowMode:!1})},"30d1":function(t,e,a){"use strict";a.r(e);var n=a("497c"),o=a("a208");for(var i in o)"default"!==i&&function(t){a.d(e,t,(function(){return o[t]}))}(i);a("44e4");var s,r=a("f0c5"),l=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,"0b286295",null,!1,n["a"],s);e["default"]=l.exports},"44e4":function(t,e,a){"use strict";var n=a("2a81"),o=a.n(n);o.a},"497c":function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return n}));var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"orange"},[a("v-uni-view",{staticClass:"help"},[a("v-uni-text",{staticStyle:{color:"#8f8f94","margin-right":"20rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goto_shop()}}},[t._v("商家登录")]),a("v-uni-text",{staticStyle:{color:"#8f8f94"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goto_help()}}},[t._v("帮助")])],1),a("v-uni-view",{staticClass:"welcome_block"},[a("v-uni-text",{staticClass:"welcome"},[t._v("欢迎登录小橘子")])],1),a("v-uni-view",[a("v-uni-view",{staticClass:"weui-input"},[a("v-uni-input",{staticClass:"input_style",attrs:{type:"number",placeholder:"请输入手机号",maxlength:"11"},model:{value:t.telephone,callback:function(e){t.telephone=e},expression:"telephone"}})],1),a("v-uni-view",{staticClass:"weui-input"},["checkbox"===t.pwdType?a("v-uni-input",{staticClass:"input_style",attrs:{placeholder:"请输入密码",type:"checkbox"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}):"radio"===t.pwdType?a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"input_style",attrs:{placeholder:"请输入密码",type:"radio"},domProps:{checked:t._q(t.password,null)},on:{change:function(e){t.password=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"input_style",attrs:{placeholder:"请输入密码",type:t.pwdType},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),a("v-uni-view",[a("v-uni-image",{staticClass:"pic_pos",attrs:{src:t.seen?t.openeye:t.nopeneye},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeType.apply(void 0,arguments)}}})],1)],1)],1),a("v-uni-view",{staticClass:"agree_block"},[a("v-uni-view",{staticClass:"choose"},[a("v-uni-checkbox-group",{on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.checkChoose.apply(void 0,arguments)}}},[a("v-uni-label",[a("v-uni-checkbox",{attrs:{value:"cb"}})],1)],1)],1),a("v-uni-view",[a("div",{staticClass:"agree",staticStyle:{display:"flex"}},[a("p",{staticClass:"agree1",staticStyle:{position:"relative",left:"5rpx",width:"530rpx"}},[t._v("我已阅读并同意"),a("span",[t._v("《小橘子协议》《个人信息保护协议》")])])])])],1),a("v-uni-view",{staticClass:"btn_block"},[a("v-uni-button",{staticClass:"btn_style",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._check_register.apply(void 0,arguments)}}},[t._v("登录")])],1),a("v-uni-view",{staticClass:"flexs"},[a("a",{staticClass:"first",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toRegister.apply(void 0,arguments)}}},[t._v("注册")]),a("a",{staticClass:"second",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toLogin_Username.apply(void 0,arguments)}}},[t._v("用户名登录")])])],1)},i=[]},"73ec":function(t,e,a){t.exports=a.p+"static/img/eye.a93036d5.png"},8376:function(t,e,a){var n=a("24fb"),o=a("1de5"),i=a("0aa7");e=n(!1);var s=o(i);e.push([t.i,".orange[data-v-0b286295]{background-image:url("+s+");background-size:%?200?%;background-repeat:no-repeat;background-position:%?550?% %?40?%}.help[data-v-0b286295]{text-align:right;margin-top:%?30?%;margin-right:%?30?%}.welcome_block[data-v-0b286295]{margin-top:%?60?%;margin-left:%?100?%}.welcome[data-v-0b286295]{font-size:%?60?%;font-weight:bolder}.weui-input[data-v-0b286295]{display:flex;margin-left:%?100?%;margin-top:%?70?%}.input_style[data-v-0b286295]{width:%?540?%;border-bottom-style:solid;border-bottom-width:%?2?%;border-left-width:%?0?%;border-top-width:%?0?%;border-right-width:%?0?%;border-bottom-color:#afafaf;font-size:%?38?%}.pic_pos[data-v-0b286295]{width:%?50?%;height:%?50?%\n\t/* \t\tmargin-top: 60rpx;\n\tmargin-left: 100rpx; */}.agree_block[data-v-0b286295]{display:flex;text-align:center;margin-top:%?80?%;width:%?600?%}.choose[data-v-0b286295]{display:flex;margin-left:%?100?%}.agree1[data-v-0b286295]{text-align:left}.agree span[data-v-0b286295]{color:#ffb400}.agree2[data-v-0b286295]{color:#ffb400}.agree3[data-v-0b286295]{color:#ffb400}.flexs[data-v-0b286295]{display:flex;justify-content:space-between;align-items:center;margin-top:%?50?%}.first[data-v-0b286295]{left:0;margin-left:%?90?%;color:#8f8f94}.second[data-v-0b286295]{right:0;margin-right:%?90?%;color:#8f8f94}.btn_style[data-v-0b286295]{background-color:#fefa83;border-radius:%?20?%;width:%?500?%;box-shadow:%?4?% %?4?% %?2?% %?2?% #8f8f94}.btn_block[data-v-0b286295]{display:flex;margin-top:%?120?%}.text_style[data-v-0b286295]{display:flex;text-align:center}uni-button[data-v-0b286295]::after{border:none}",""]),t.exports=e},"97df":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{telephone:"",account:"",password:"",code:"",msg:"",Data:"",sure:!1,pwdType:"password",openeye:a("73ec"),nopeneye:a("c416"),seen:0,get_code:0}},methods:{onPullDownRefresh:function(){t("log","refresh"," at pages/login/login_phone.vue:81"),setTimeout((function(){uni.stopPullDownRefresh()}),1500)},_check_register:function(){var e=this;""==this.telephone?uni.showToast({title:"手机号为空",icon:"error",duration:850}):""==this.password?uni.showToast({title:"密码为空",icon:"error",duration:850}):0==this.sure?uni.showToast({title:"请先阅读并同意协议",icon:"error",duration:850}):11!=this.telephone.length?uni.showToast({title:"手机号错误",icon:"error",duration:850}):this.password.length<6?uni.showToast({title:"密码小于6位",icon:"error",duration:850}):uni.request({url:getApp().globalData.customer_customerLogin,method:"POST",data:{phone:this.telephone,account:this.account,password:this.password,code:this.get_code},header:{},success:function(a){t("log",a," at pages/login/login_phone.vue:133"),e.code=a.data.code,e.msg=a.data.msg,e.Data=a.data,getApp().globalData.token=a.data.data.Oauth_Token,getApp().globalData.login_key=!0,getApp().globalData.cstm_or_sp=1,1==a.data.code?uni.reLaunch({url:"/pages/my/my"}):uni.showToast({title:e.msg,icon:"error",duration:850})}})},goto_help:function(){uni.navigateTo({url:"/pages/help/help"})},toRegister:function(t){uni.navigateTo({url:"/pages/register/register"})},goto_shop:function(){uni.navigateTo({url:"/pages/login/login_shop_phone"})},checkChoose:function(){this.sure=!this.sure},toLogin_Username:function(t){uni.navigateTo({url:"/pages/login/login_username"})},changeType:function(){this.pwdType="password"===this.pwdType?"text":"password",this.seen=!this.seen}}};e.default=n}).call(this,a("0de9")["log"])},a208:function(t,e,a){"use strict";a.r(e);var n=a("97df"),o=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=o.a},c416:function(t,e,a){t.exports=a.p+"static/img/no_eye.85328a77.png"}}]);