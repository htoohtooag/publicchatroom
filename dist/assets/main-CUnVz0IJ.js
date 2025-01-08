import{c as q,d as C,T as E,a as O,o as Y,q as $,b as A,w as H,g as F,e as N,f as R}from"./authorize-CUbDv9pM.js";import{t as g,n as T,g as I,m as _,a as y,e as U,b as z}from"./en-US-BUi-OY7y.js";/* empty css                */function j(r,t){let e=r,s=t;const n=q(C,"chats");let o=null;const i=async f=>{const c=new Date,l={username:s,room:e,message:f,created_at:E.fromDate(c)};try{return await O(n,l)}catch(u){throw console.log("Error addChar = ",u),u}},a=async f=>{o&&o(),o=Y($(n,H("room","==",e),A("created_at")),c=>{c.docChanges().forEach(l=>{l.type==="added"&&f(l.doc.data())})})},d=f=>{e=f,console.log(`Room changed to ${e}`)},m=f=>{s=f,localStorage.setItem("username",s),console.log(`Username changed to ${s}`)};return(()=>{const f=setInterval(async()=>{try{const c=await F(n);if(c.empty){console.log("No message to delete"),clearInterval(f);return}c.forEach(async l=>{await N(R(C,"chats",l.id))}),console.log("ALl Messages deleted successfully")}catch(c){console.log("Error deleting messages : ",c)}},15e3)})(),{addChat:i,getChats:a,updateChatroom:d,updateUsername:m}}function x(r,t){const e=+g(r)-+g(t);return e<0?-1:e>0?1:e}function k(r,t,e){const[s,n]=T(e==null?void 0:e.in,r,t),o=s.getFullYear()-n.getFullYear(),i=s.getMonth()-n.getMonth();return o*12+i}function G(r){return t=>{const s=(r?Math[r]:Math.trunc)(t);return s===0?0:s}}function B(r,t){return+g(r)-+g(t)}function J(r,t){const e=g(r,t==null?void 0:t.in);return e.setHours(23,59,59,999),e}function K(r,t){const e=g(r,t==null?void 0:t.in),s=e.getMonth();return e.setFullYear(e.getFullYear(),s+1,0),e.setHours(23,59,59,999),e}function P(r,t){const e=g(r,t==null?void 0:t.in);return+J(e,t)==+K(e,t)}function Q(r,t,e){const[s,n,o]=T(e==null?void 0:e.in,r,r,t),i=x(n,o),a=Math.abs(k(n,o));if(a<1)return 0;n.getMonth()===1&&n.getDate()>27&&n.setDate(30),n.setMonth(n.getMonth()-i*a);let d=x(n,o)===-i;P(s)&&a===1&&x(s,o)===1&&(d=!1);const m=i*(a-+d);return m===0?0:m}function V(r,t,e){const s=B(r,t)/1e3;return G(e==null?void 0:e.roundingMethod)(s)}function W(r,t,e){const s=z(),n=(e==null?void 0:e.locale)??s.locale??U,o=2520,i=x(r,t);if(isNaN(i))throw new RangeError("Invalid time value");const a=Object.assign({},e,{addSuffix:e==null?void 0:e.addSuffix,comparison:i}),[d,m]=T(e==null?void 0:e.in,...i>0?[t,r]:[r,t]),h=V(m,d),f=(I(m)-I(d))/1e3,c=Math.round((h-f)/60);let l;if(c<2)return e!=null&&e.includeSeconds?h<5?n.formatDistance("lessThanXSeconds",5,a):h<10?n.formatDistance("lessThanXSeconds",10,a):h<20?n.formatDistance("lessThanXSeconds",20,a):h<40?n.formatDistance("halfAMinute",0,a):h<60?n.formatDistance("lessThanXMinutes",1,a):n.formatDistance("xMinutes",1,a):c===0?n.formatDistance("lessThanXMinutes",1,a):n.formatDistance("xMinutes",c,a);if(c<45)return n.formatDistance("xMinutes",c,a);if(c<90)return n.formatDistance("aboutXHours",1,a);if(c<_){const u=Math.round(c/60);return n.formatDistance("aboutXHours",u,a)}else{if(c<o)return n.formatDistance("xDays",1,a);if(c<y){const u=Math.round(c/_);return n.formatDistance("xDays",u,a)}else if(c<y*2)return l=Math.round(c/y),n.formatDistance("aboutXMonths",l,a)}if(l=Q(m,d),l<12){const u=Math.round(c/y);return n.formatDistance("xMonths",u,a)}else{const u=l%12,S=Math.trunc(l/12);return u<3?n.formatDistance("aboutXYears",S,a):u<9?n.formatDistance("overXYears",S,a):n.formatDistance("almostXYears",S+1,a)}}function Z(r){return{newli:s=>{const n=W(s.created_at.toDate(),new Date,{addSuffix:!0}),o=`
            <li class="shadow rounded-lg px-4 py-2">
                <div class="flex justify-between">
                    <h5 class="text-gray-600 font-medium text-sm">${s.username}</h5>
                    <i class="text-gray-300 text-xs">${n}</i>
                </div>
                <p class="text-gray-600 text-sm">${s.message}</p>
        `;r.innerHTML+=o},resetli:()=>{r.innerHTML=""}}}const p=document.querySelector(".chatrooms"),ee=document.querySelector(".chat-ul"),w=document.querySelector(".chat-form"),D=document.querySelector(".user-form"),X=document.querySelector(".msg"),L=document.querySelector(".roomtitle"),b=localStorage.username?localStorage.username:"Guest";D.username.placeholder=b?`username is ${b}`:"";const M=j("general",b);L.textContent="General";const v=Z(ee);w.addEventListener("submit",r=>{r.preventDefault();const t=w.message.value.trim();M.addChat(t).then(()=>w.reset()).catch(e=>console.log(e))});D.addEventListener("submit",r=>{r.preventDefault();const t=D.username.value.trim();M.updateUsername(t),D.reset(),X.innerText=`New name updated to ${t}`,D.username.placeholder=`username is ${t}`,setTimeout(()=>X.innerText="",3e3)});p.addEventListener("click",r=>{r.preventDefault();const t=r.target.closest("button");if(t){v.resetli();const e=t.getAttribute("id"),s=t.querySelector("h3").innerText;L.textContent=s,M.updateChatroom(e),M.getChats(n=>{v.newli(n)})}});M.getChats(r=>{v.newli(r)});
