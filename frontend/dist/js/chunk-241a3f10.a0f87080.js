(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-241a3f10"],{a55b:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container d-flex justify-content-center align-items-center min-vh-100"},[a("div",{staticClass:"row justify-content-center"},[a("div",{staticClass:"col-auto"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[t._v(" Авторизация ")]),a("div",{staticClass:"card-body"},[a("form",[a("div",{staticClass:"form-group"},[a("label",[t._v("Логин (Admin)")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.rpc.params.user,expression:"rpc.params.user"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.rpc.params.user},on:{input:function(e){e.target.composing||t.$set(t.rpc.params,"user",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",[t._v("Пароль (zabbix)")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.rpc.params.password,expression:"rpc.params.password"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.rpc.params.password},on:{input:function(e){e.target.composing||t.$set(t.rpc.params,"password",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("button",{staticClass:"btn btn-outline-success",attrs:{type:"button"},on:{click:t.onLogin}},[t._v(" Войти ")])])])])]),t.loginError?a("p",{staticClass:"text-danger"},[t._v(" "+t._s(t.errorMessage)+" ")]):t._e(),a("p",{directives:[{name:"show",rawName:"v-show",value:t.isAutorized,expression:"isAutorized"}],staticClass:"text-success"},[t._v(" Вы успешно авторизованы и можете перейти к списку хостов ")])])])])},s=[],o=a("d4ec"),i=a("bee2"),n=a("99de"),c=a("7e84"),u=a("262e"),l=a("9ab4"),p=a("60a3"),d=function(t){function e(){var t;return Object(o["a"])(this,e),t=Object(n["a"])(this,Object(c["a"])(e).apply(this,arguments)),t.errorMessage="",t.loginError=!1,t.isAutorized=!1,t.rpc={jsonrpc:"2.0",method:"user.login",params:{user:"",password:""},id:1},t}return Object(u["a"])(e,t),Object(i["a"])(e,[{key:"onLogin",value:function(){var t=this;this.$axios.post("http://localhost:8888/api_jsonrpc.php",this.rpc).then((function(e){e.data.error?(t.loginError=!0,t.errorMessage=e.data.error.data):(localStorage.setItem("token",e.data.result),localStorage.setItem("username",t.rpc.params.user),t.isAutorized=!0,t.$router.push("/device-list"))})).catch((function(t){console.log(t)}))}}]),e}(p["c"]);d=Object(l["a"])([p["a"]],d);var m=d,v=m,f=a("2877"),b=Object(f["a"])(v,r,s,!1,null,"d08de3d6",null);e["default"]=b.exports},bee2:function(t,e,a){"use strict";function r(t,e){for(var a=0;a<e.length;a++){var r=e[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e,a){return e&&r(t.prototype,e),a&&r(t,a),t}a.d(e,"a",(function(){return s}))}}]);
//# sourceMappingURL=chunk-241a3f10.a0f87080.js.map