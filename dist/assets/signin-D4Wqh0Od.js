import{A as t}from"./authorize-DgNMVWZu.js";/* empty css                */const s=document.getElementById("signinform"),g=document.getElementById("googleloginbtn");s.addEventListener("submit",n=>{n.preventDefault();const e=document.getElementById("signinemail").value.trim(),o=document.getElementById("signinpassword").value.trim(),{loginUser:i}=t();i(e,o)});g.addEventListener("click",n=>{n.preventDefault();const{googleLogin:e}=t();e()});
