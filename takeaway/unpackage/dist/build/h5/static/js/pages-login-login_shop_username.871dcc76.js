(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login_shop_username"],{"0db5":function(e,t,a){"use strict";a.r(t);var o=a("1e40"),n=a("9ddf");for(var i in n)"default"!==i&&function(e){a.d(t,e,(function(){return n[e]}))}(i);a("3ebd");var s,r=a("f0c5"),c=Object(r["a"])(n["default"],o["b"],o["c"],!1,null,"746adac6",null,!1,o["a"],s);t["default"]=c.exports},"1e40":function(e,t,a){"use strict";var o;a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return o}));var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",[a("v-uni-view",{staticClass:"help"},[a("v-uni-text",{staticStyle:{color:"#8f8f94"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goto_help()}}},[e._v("帮助")])],1),a("v-uni-view",{staticClass:"welcome_block"},[a("v-uni-text",{staticClass:"welcome"},[e._v("欢迎登录小橘子")])],1),a("v-uni-view",[a("v-uni-view",{staticClass:"weui-input"},[a("v-uni-input",{staticClass:"input_style",attrs:{placeholder:"请输入商家名"},model:{value:e.account,callback:function(t){e.account=t},expression:"account"}})],1),a("v-uni-view",{staticClass:"weui-input"},["checkbox"===e.pwdType?a("v-uni-input",{staticClass:"input_style",attrs:{placeholder:"请输入密码",type:"checkbox"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}):"radio"===e.pwdType?a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"input_style",attrs:{placeholder:"请输入密码",type:"radio"},domProps:{checked:e._q(e.password,null)},on:{change:function(t){e.password=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"input_style",attrs:{placeholder:"请输入密码",type:e.pwdType},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),a("v-uni-view",[a("v-uni-image",{staticClass:"pic_pos",attrs:{src:e.seen?e.openeye:e.nopeneye},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.changeType.apply(void 0,arguments)}}})],1)],1)],1),a("v-uni-view",{staticClass:"agree_block"},[a("v-uni-view",{staticClass:"choose"},[a("v-uni-checkbox-group",{on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.checkChoose.apply(void 0,arguments)}}},[a("v-uni-label",[a("v-uni-checkbox",{attrs:{value:"cb"}})],1)],1)],1),a("v-uni-view",[a("div",{staticClass:"agree"},[a("p",{staticClass:"agree1",staticStyle:{position:"relative",left:"-35rpx"}},[e._v("我已阅读并同意")]),a("p",{staticClass:"agree2",staticStyle:{position:"relative",left:"210rpx",top:"-44rpx"}},[e._v("《小橘子协议》《个")]),a("p",{staticClass:"agree3",staticStyle:{position:"relative",left:"-18rpx",top:"-25rpx"}},[e._v("人信息保护协议》")])])])],1),a("v-uni-view",{staticClass:"btn_block"},[a("v-uni-button",{staticClass:"btn_style",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._check_register.apply(void 0,arguments)}}},[e._v("登录")])],1),a("v-uni-view",{staticClass:"flexs"},[a("a",{staticClass:"first",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.toRegister.apply(void 0,arguments)}}},[e._v("注册")]),a("a",{staticClass:"second",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.toLogin_Phone.apply(void 0,arguments)}}},[e._v("手机号登录")])])],1)},i=[]},"2c83":function(e,t,a){var o=a("5f74");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var n=a("4f06").default;n("aeb34c9c",o,!0,{sourceMap:!1,shadowMode:!1})},3767:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={data:function(){return{telephone:"",account:"",password:"",code:"0",msg:"",exprie:"",sure:!1,pwdType:"password",openeye:a("73ec"),nopeneye:a("c416"),seen:0,get_code:1}},methods:{onPullDownRefresh:function(){e("log","refresh"," at pages/login/login_shop_username.vue:75"),setTimeout((function(){uni.stopPullDownRefresh()}),1500)},goto_help:function(){uni.navigateTo({url:"/pages/help/help"})},changeType:function(){this.pwdType="password"===this.pwdType?"text":"password",this.seen=!this.seen},checkChoose:function(){this.sure=!this.sure},_check_register:function(){var t=this;""==this.account?uni.showToast({title:"用户名为空",icon:"error",duration:850}):""==this.password?uni.showToast({title:"密码为空",icon:"error",duration:850}):0==this.sure?uni.showToast({title:"请先阅读并同意协议",icon:"error",duration:850}):this.password.length<6?uni.showToast({title:"密码小于6位",icon:"error",duration:850}):uni.request({url:getApp().globalData.business_shopLogin,method:"POST",data:{phone:this.telephone,account:this.account,password:this.password,code:this.get_code},header:{},success:function(a){e("log","开始打印商铺用户名登录时返回的信息"," at pages/login/login_shop_username.vue:134"),e("log",a," at pages/login/login_shop_username.vue:135"),1==a.data.code?(t.code=a.data.code,t.msg=a.data.msg,getApp().globalData.token=a.data.data.token,getApp().globalData.cstm_or_sp=0,getApp().globalData.login_key=!0,e("log","开始打印登录信息"," at pages/login/login_shop_username.vue:142"),e("log",a," at pages/login/login_shop_username.vue:143"),e("log",a.data.data.token," at pages/login/login_shop_username.vue:144"),t.exprie=a.data.data.exprie,uni.reLaunch({url:"/pages/my/my"})):uni.showToast({title:"登录错误",icon:"error",duration:850})}})},toRegister:function(e){uni.navigateTo({url:"/pages/register/register"})},toLogin_Phone:function(e){uni.navigateTo({url:"/pages/login/login_shop_phone"})}}};t.default=o}).call(this,a("0de9")["log"])},"3ebd":function(e,t,a){"use strict";var o=a("2c83"),n=a.n(o);n.a},"5f74":function(e,t,a){var o=a("24fb");t=o(!1),t.push([e.i,".help[data-v-746adac6]{text-align:right;margin-top:%?30?%;margin-right:%?30?%}.welcome_block[data-v-746adac6]{margin-top:%?60?%;margin-left:%?100?%}.welcome[data-v-746adac6]{font-size:%?60?%;font-weight:bolder}.weui-input[data-v-746adac6]{display:flex;margin-left:%?100?%;margin-top:%?70?%}.input_style[data-v-746adac6]{width:%?540?%;border-bottom-style:solid;border-bottom-width:%?2?%;border-left-width:%?0?%;border-top-width:%?0?%;border-right-width:%?0?%;border-bottom-color:#afafaf;font-size:%?38?%}.pic_pos[data-v-746adac6]{width:%?50?%;height:%?50?%\n\t/* \t\tmargin-top: 60rpx;\n\tmargin-left: 100rpx; */}.agree_block[data-v-746adac6]{display:flex;text-align:center;margin-top:%?80?%;width:%?600?%}.choose[data-v-746adac6]{display:flex;margin-left:%?100?%}.agree2[data-v-746adac6]{color:#ffb400}.agree3[data-v-746adac6]{color:#ffb400}.flexs[data-v-746adac6]{display:flex;justify-content:space-between;align-items:center;margin-top:%?50?%}.first[data-v-746adac6]{left:0;margin-left:%?90?%;color:#8f8f94}.second[data-v-746adac6]{right:0;margin-right:%?90?%;color:#8f8f94}.btn_style[data-v-746adac6]{background-color:#fefa83;border-radius:%?20?%;width:%?500?%;box-shadow:%?4?% %?4?% %?2?% %?2?% #8f8f94}.btn_block[data-v-746adac6]{display:flex;margin-top:%?120?%}.text_style[data-v-746adac6]{display:flex;text-align:center}uni-button[data-v-746adac6]::after{border:none}",""]),e.exports=t},"73ec":function(e,t,a){e.exports=a.p+"static/img/eye.a93036d5.png"},"9ddf":function(e,t,a){"use strict";a.r(t);var o=a("3767"),n=a.n(o);for(var i in o)"default"!==i&&function(e){a.d(t,e,(function(){return o[e]}))}(i);t["default"]=n.a},c416:function(e,t,a){e.exports=a.p+"static/img/no_eye.85328a77.png"}}]);