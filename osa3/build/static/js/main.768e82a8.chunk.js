(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,n,t){e.exports=t(38)},18:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(2),r=t(0),c=t.n(r),u=t(11),o=t.n(u),i=(t(18),function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement("label",{htmlFor:"search"},"rajaa n\xe4ytett\xe4vi\xe4 "),c.a.createElement("input",{id:"search",value:e.search,onChange:e.handleChange}))}),l=function(e){return c.a.createElement("form",{onSubmit:e.handleSubmit},c.a.createElement("div",null,c.a.createElement("label",{htmlFor:"name"},"Nimi:"),c.a.createElement("input",{id:"name",value:e.name,onChange:e.handleNameChange})),c.a.createElement("div",null,c.a.createElement("label",{htmlFor:"phone"},"Numero: "),c.a.createElement("input",{id:"phone",value:e.number,onChange:e.handleNumberChange})),c.a.createElement("div",null,c.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},m=function(e){var n=e.persons,t=e.search,a=e.handleRemove;return c.a.createElement("ul",null,n.filter(function(e){return 0===t.length||e.name.toLowerCase().match(t.toLowerCase())}).map(function(e){return c.a.createElement("li",{key:e.name},e.name," ",e.number,c.a.createElement("button",{key:e.name,onClick:function(){return a(e)}},"Poista"))}))},s=function(e){var n=e.notification;return c.a.createElement("div",{className:n.type},c.a.createElement("p",null,n.message))},f=t(3),h=t.n(f),d="/api",p=function(){return h.a.get("".concat(d,"/persons")).then(function(e){return e.data})},b=function(e){return h.a.post("".concat(d,"/persons"),e).then(function(e){return e.data})},E=function(e,n){return h.a.put("".concat(d,"/persons/").concat(e),n).then(function(e){return e.data})},v=function(e){return h.a.delete("".concat(d,"/persons/").concat(e)).then(function(e){return e.data})};o.a.render(c.a.createElement(function(){var e=Object(r.useState)([{name:"Arto Hellas",number:"1234"}]),n=Object(a.a)(e,2),t=n[0],u=n[1],o=Object(r.useState)(""),f=Object(a.a)(o,2),h=f[0],d=f[1],g=Object(r.useState)(""),j=Object(a.a)(g,2),w=j[0],C=j[1],O=Object(r.useState)(""),k=Object(a.a)(O,2),y=k[0],N=k[1],S=Object(r.useState)(""),F=Object(a.a)(S,2),P=F[0],H=F[1];Object(r.useEffect)(function(){p().then(function(e){return u(e)}).catch(function(e){return alert("error error")})},[]);var L=function(e,n){n(e.target.value)};return c.a.createElement("div",null,c.a.createElement("h2",null,"Puhelinluettelo"),P&&c.a.createElement(s,{notification:P}),c.a.createElement(i,{value:y,handleChange:function(e){return L(e,N)}}),c.a.createElement("h3",null,"Lis\xe4\xe4 uusi"),c.a.createElement(l,{name:h,number:w,handleSubmit:function(e){e.preventDefault();var n={name:h,number:w},a=t.find(function(e){return e.name===n.name});a&&window.confirm("P\xe4ivitet\xe4\xe4nk\xf6 ".concat(n.name,"?"))?E(a.id,n).then(function(e){return u(t.map(function(n){return n.id!==a.id?n:e}))}):b(n).then(function(){u(t.concat(n)),H({type:"success",message:"Henkil\xf6 ".concat(n.name," lis\xe4tty")}),setTimeout(function(){return H("")},1e3)}),d(""),C("")},handleNameChange:function(e){return L(e,d)},handleNumberChange:function(e){return L(e,C)}}),c.a.createElement("h3",null,"Numerot"),c.a.createElement(m,{search:y,persons:t,handleRemove:function(e){window.confirm("Poistetaanko ".concat(e.name))&&v(e.id).then(function(){u(t.filter(function(n){return n.id!==e.id}).map(function(e){return e}))}).catch(function(){H({type:"error",message:"Henkil\xf6 ".concat(e.name," oli jo poistettu")}),setTimeout(function(){return H("")},1e3)})}}))},null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.768e82a8.chunk.js.map