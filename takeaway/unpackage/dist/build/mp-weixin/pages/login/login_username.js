(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login_username"],{"0198":function(e,t,n){"use strict";n.r(t);var o=n("4c4a"),a=n("9e92");for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n("5e9e");var i,u=n("f0c5"),s=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);t["default"]=s.exports},"1dc1":function(e,t,n){},"22db":function(e,t,n){"use strict";(function(e){function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return o({telephone:"",account:"",password:"",code:"0",msg:"",exprie:"",sure:!1,pwdType:"password",openeye:n("8a2c"),nopeneye:n("07d4"),seen:0},"code",1)},methods:{goto_help:function(){e.navigateTo({url:"/pages/help/help"})},changeType:function(){this.pwdType="password"===this.pwdType?"text":"password",this.seen=!this.seen},checkChoose:function(){this.sure=!this.sure},_check_register:function(){var t=this;0==this.sure?e.showToast({title:"请先阅读并同意协议",icon:"error",duration:850}):this.password.length<6?e.showToast({title:"密码小于6位",icon:"error",duration:850}):e.request({url:"https://v3710z5658.oicp.vip/customer/customerLogin",method:"POST",data:{phone:this.telephone,account:this.account,password:this.password,code:this.code},header:{},success:function(n){t.code=n.data.code,t.msg=n.data.msg,getApp().globalData.token=n.data.data.Oauth_Token,t.exprie=n.data.data.exprie,getApp().globalData.login_key=!0,1==t.code?e.reLaunch({url:"/pages/my/my"}):e.showToast({title:"登录错误",icon:"error",duration:850})}})},toRegister:function(t){e.navigateTo({url:"/pages/register/register"})},toLogin_Phone:function(t){e.navigateTo({url:"/pages/login/login_phone"})}}};t.default=a}).call(this,n("543d")["default"])},"4c4a":function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}));var a=function(){var e=this,t=e.$createElement;e._self._c},r=[]},"5e9e":function(e,t,n){"use strict";var o=n("1dc1"),a=n.n(o);a.a},"7b6a":function(e,t,n){"use strict";(function(e){n("4d8d");o(n("66fd"));var t=o(n("0198"));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},"9e92":function(e,t,n){"use strict";n.r(t);var o=n("22db"),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=a.a}},[["7b6a","common/runtime","common/vendor"]]]);