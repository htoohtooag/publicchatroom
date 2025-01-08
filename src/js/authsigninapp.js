import { Authorize } from "./authorize";
import '@fortawesome/fontawesome-free/css/all.min.css'

//UI 
const signinform = document.getElementById('signinform');
const googleloginbtn = document.getElementById("googleloginbtn");

// login
signinform.addEventListener("submit",(e)=>{
    e.preventDefault(); 

    const signinemail = document.getElementById('signinemail').value.trim(); 
    const signinpassword = document.getElementById('signinpassword').value.trim(); 

    // console.log(signinemail,signinpassword)

    const {loginUser} = Authorize(); 

    loginUser(signinemail,signinpassword);

})


// google login
googleloginbtn.addEventListener("click",(e)=>{
    e.preventDefault(); 


    const {googleLogin} = Authorize(); 
    googleLogin();

})