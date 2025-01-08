import { db } from './firebase.js'; 
import { collection,addDoc,Timestamp,onSnapshot, query, where, orderBy, getDocs,deleteDoc, doc } from 'firebase/firestore';

export function Chatroom(room,username){

    let curroom = room; 
    let curuser = username; 
    const dbRef = collection(db,'chats');
    let unsubscribe = null;

    const addChat = async (message)=>{

        const now = new Date(); 

        const chatdata = {
            username: curuser,
            room: curroom,
            message,
            created_at: Timestamp.fromDate(now)
        }

        try{
            const respone = await addDoc(dbRef,chatdata);
            return respone; 
        }catch(err){
            console.log("Error addChar = ",err);
            throw err; 
        }
    }

    const getChats = async (callback)=>{

        if(unsubscribe) unsubscribe(); 
        
        
        unsubscribe = onSnapshot( query(dbRef, where('room', '==',curroom), orderBy('created_at'))
        ,docSnap => {
            docSnap.docChanges().forEach(item => {
                // console.log(item); // type and other things 
                // console.log(item.doc.data()); 

                if(item.type === 'added'){
                    callback(item.doc.data());
                }
            })
        }); 

        // console.log(unsubscribe); // method or fucniton is return

    }

    const updateChatroom = (newroom) => {
        curroom = newroom;
        console.log(`Room changed to ${curroom}`);
    }

    const updateUsername = (newusername) => {
        curuser = newusername; 
        localStorage.setItem('username',curuser);

        console.log(`Username changed to ${curuser}`);
    }

    //? Delete all messages every 15s 
    const deleteAllMessages = ()=>{

        const deleteinter =setInterval(async()=>{

            try{
                const getdatas = await getDocs(dbRef); 

                //stop funciton call if no data in firebase 
                if(getdatas.empty){

                    console.log("No message to delete");
                    clearInterval(deleteinter); // stop the interval
                    return;  // no more work the under codes  
                }

                getdatas.forEach(async(getdata)=>{
                    await deleteDoc(doc(db,'chats',getdata.id))
                });

                console.log('ALl Messages deleted successfully'); 

            }catch(error){
                console.log("Error deleting messages : ", error)
            }

        },15000)
    }

    deleteAllMessages(); 


    return {addChat,getChats,updateChatroom,updateUsername}
}