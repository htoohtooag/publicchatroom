import { Authorize } from "./authorize";
import { UiElement } from "./uielement";

//UI 
const userinfodiv = document.getElementById('userinfo');
const logoutbtn = document.getElementById("logoutbtn");

// Authorize instance 
const authorize = Authorize(); 

// UiElement Instance
const uiele = UiElement(userinfodiv);

// Get info & render 
authorize.getUser((data)=>{
    console.log(data);
    uiele.infoUserEle(data)
})

// logout
logoutbtn.addEventListener("click",(e)=>{
    e.preventDefault(); 


    const {logoutUser} = Authorize(); 
    logoutUser();

})