import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, signInWithPopup,GoogleAuthProvider, sendPasswordResetEmail, onAuthStateChanged, updateProfile } from 'firebase/auth'
import {auth} from './firebase.js'


export  function Authorize() {

    // Signup
    const registerUser = async (fullname,email,password) => {

      const defualtprofileimg = 'https://png.pngtree.com/png-clipart/20191120/original/pngtree-user-icon-and-symbol-isolated-design-png-image_5045585.jpg';

      try{

        const userCredential = await createUserWithEmailAndPassword(auth, email, password); 
        // console.log(userCredential);
        const user = userCredential.user;
        // console.log(user);  

        await updateProfile(user, {

          displayName: fullname,
          photoURL:  defualtprofileimg

        }).then(() => {

          //set user name
          setLocalName(userCredential.user);
          

          //? Redirect to index.html 
          window.location.href = "../index.html";

        })

  

      }catch(error){
        console.log("erroror registering users : ", error)
      }
    }

    // Signin 
    const loginUser = (email,password)=>{

        signInWithEmailAndPassword(auth, email, password)

          .then((userCredential) => {

            //set user name
            setLocalName(userCredential.user)

            //? Redirect to index.html 
            window.location.href = "../index.html";

          })
          .catch((error) => {
            console.error("Error Logging users : ", error.message)
          });

    }

    // Signout
    const logoutUser = ()=>{

      signOut(auth)
      .then(() => {

          //* unset name from the local storage
          unsetLocalName();
          window.location.href="../signin.html"

      }).catch(error => {
          console.log("Error logging out = ", error.message)
      })

    }

    // Reset Password 
    const resetPassword = async(email,msg)=>{

        try{

          await sendPasswordResetEmail(auth,email); 

          msg.textContent = "Password reset email send. Please check your inbox.";
          msg.style.color = 'green';
          msg.style.fontSize = "11px"; 

        }catch{

          console.error("error sending password reset email = ",error.message); 

          msg.textContent = `Error : ${error.message}`;
          msg.style.color = 'red';
          msg.style.fontSize = "11px"; 
        }
    }

    // Google SignIn 

    const googleLogin = ()=>{
      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
        .then((result) => {

          setLocalName(result.user.displayName);

          window.location.href = "../index.html";

        }).catch((error) => {
          console.log("Error with Google sign-in = ", error.message)
        });

    }

    // Auth Check
    const isLoggedIn = ()=>{

      onAuthStateChanged(auth, (userdata) => {

        if(userdata) {
          return true;
        }else{
          // redirect ro sign.html 
          window.location.href = "../signin.html"
        }

      })
    }

    // get User Info 
    const getUser = (callback)=>{
      onAuthStateChanged(auth, (userdata)=>{
        if(userdata){
          callback(userdata);
        }
      })
    }

    const setLocalName = (userdata)=>{
      localStorage.setItem('username',userdata.displayName);
    }

    const unsetLocalName = ()=>{
      localStorage.removeItem('username');
    }


  return {registerUser,loginUser,logoutUser,resetPassword,googleLogin,isLoggedIn,getUser}
}
