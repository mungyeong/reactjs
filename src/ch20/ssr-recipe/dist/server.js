!function(e){var t={};function r(n){if(t[n])return t[n].exports;var u=t[n]={i:n,l:!1,exports:{}};return e[n].call(u.exports,u,u.exports,r),u.l=!0,u.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var u in e)r.d(n,u,function(t){return e[t]}.bind(null,u));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=12)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("react-router-dom")},function(e,t,r){e.exports=r(11)},function(e,t){e.exports=require("redux")},function(e,t){e.exports=require("react-redux")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("react-dom/server")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("redux-thunk")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("regenerator-runtime")},function(e,t,r){"use strict";r.r(t);var n=r(2),u=r.n(n);function o(e,t,r,n,u,o,a){try{var c=e[o](a),i=c.value}catch(e){return void r(e)}c.done?t(i):Promise.resolve(i).then(n,u)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(n,u){var a=e.apply(t,r);function c(e){o(a,n,u,c,i,"next",e)}function i(e){o(a,n,u,c,i,"throw",e)}c(void 0)}))}}var c=r(5),i=r.n(c),s=r(8),l=r.n(s),f=r(6),p=r.n(f),d=r(0),m=r.n(d),v=r(7),E=r.n(v),b=r(4),y=r(1),h=r(3),O=r(9),g=r.n(O),x=function(){return m.a.createElement("ul",null,m.a.createElement("li",null,m.a.createElement(y.Link,{to:"/red"},"Red")),m.a.createElement("li",null,m.a.createElement(y.Link,{to:"/blue"},"Blue")),m.a.createElement("li",null,m.a.createElement(y.Link,{to:"/users"},"Users")))},S=function(){return m.a.createElement("div",{className:"Red"},"Red")},j=function(){return m.a.createElement(S,null)},P=function(){return m.a.createElement("div",{className:"Blue"},"Blue")},_=function(){return m.a.createElement(P,null)},w=function(e){var t=e.users;return t?m.a.createElement("div",null,m.a.createElement("ul",null,t.map((function(e){return m.a.createElement("li",{key:t.id},m.a.createElement(y.Link,{to:"/users/".concat(e.id)},e.username))})))):null},R=Object(d.createContext)(null),k=R,T=function(e){var t=e.resolve,r=Object(d.useContext)(R);return r?(r.done||r.promises.push(Promise.resolve(t())),null):null};function U(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function q(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function D(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?q(Object(r),!0).forEach((function(t){U(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):q(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var G=r(10),N=r.n(G),C=function(e){return{type:"users/GET_USERS_FAILURE",err:!0,payload:e}},L={users:null,user:null,loading:{users:!1,user:!1}};var M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"users/GET_USERS_PENDING":return D(D({},e),{},{loading:D(D({},e.loading),{},{users:!0})});case"users/GET_USERS_SUCCESS":return D(D({},e),{},{loading:D(D({},e.loading),{},{users:!1}),users:t.payload.data});case"users/GET_USERS_FAILURE":return D(D({},e),{},{loading:D(D({},e.loading),{},{users:!1}),error:D(D({},e.error),{},{users:t.payload})});default:return e}},A=Object(b.connect)((function(e){return{users:e.users.users}}),{getUsers:function(){return function(){var e=a(u.a.mark((function e(t){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t({type:"users/GET_USERS_PENDING"}),e.next=4,N.a.get("http://jsonplaceholder.typicode.com/users");case 4:r=e.sent,t({type:"users/GET_USERS_SUCCESS",payload:r}),e.next=12;break;case 8:throw e.prev=8,e.t0=e.catch(0),t(C(e.t0)),e.t0;case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()}})((function(e){var t=e.users,r=e.getUsers;return Object(d.useEffect)((function(){t||r()}),[r,t]),m.a.createElement(m.a.Fragment,null,m.a.createElement(w,{users:t}),m.a.createElement(T,{resolve:r}))})),F=function(){return m.a.createElement(A,null)},I=function(){return m.a.createElement("div",null,m.a.createElement(x,null),m.a.createElement("hr",null),m.a.createElement(y.Route,{path:"/red",component:j}),m.a.createElement(y.Route,{path:"/blue",component:_}),m.a.createElement(y.Route,{path:"/users",component:F}))},B=Object(h.combineReducers)({users:M}),J=JSON.parse(l.a.readFileSync(p.a.resolve("./build/asset-manifest.json"),"utf-8")),Y=Object.keys(J.files).filter((function(e){return/chunk\.js$/.exec(e)})).map((function(e){return'<script src="'.concat(J.files[e],'"><\/script>')})).join("");function $(e,t){return'<!DOCTYPE html>\n\t<html lang="ko">\n\t<head>\n\t\t<meta charset="UTF-8"/>\n\t\t<meta name="viewport" content="width=device-width,initial=scale=1,shrink-to-fit=no" />\n\t\t<meta name="theme-color" content="#000000" />\n\t\t<title>React App</title>\n\t\t<link href="'.concat(J.files["main.css"],'" rel="stylesheet"/>\n\t</head>\n\t<body>\n\t\t<div id="root">\n\t\t').concat(e,"\n\t\t</div>\n\t\t").concat(t,'\n\t\t<script src="').concat(J.files["runtime-main.js"],'" />\n\t\t').concat(Y,'\n\t\t<script src="').concat(J.files["main.js"],'" />\n\t</body>\n\t</html>\n\t')}var z=i()(),H=function(){var e=a(u.a.mark((function e(t,r,n){var o,a,c,i,s,l,f;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o={},a=Object(h.createStore)(B,Object(h.applyMiddleware)(g.a)),c={done:!1,promises:[]},i=m.a.createElement(k.Provider,{value:c},m.a.createElement(b.Provider,{store:a},m.a.createElement(y.StaticRouter,{location:t.url,context:o},m.a.createElement(I,null)))),E.a.renderToStaticMarkup(i),e.prev=5,e.next=8,Promise.all(c.promises);case 8:e.next=13;break;case 10:return e.prev=10,e.t0=e.catch(5),e.abrupt("return",r.status(500));case 13:c.done=!0,s=E.a.renderToString(i),l=JSON.stringify(a.getState()).replace(/</g,"\\u003c"),f="<script>__PRELOADED_STATE__ = ".concat(l,"<\/script>"),r.send($(s,f));case 18:case"end":return e.stop()}}),e,null,[[5,10]])})));return function(t,r,n){return e.apply(this,arguments)}}(),K=i.a.static(p.a.resolve("./build"),{index:!1});z.use(K),z.use(H),z.listen(5e3,(function(){console.log("Running on http://localhost:5000")}))}]);