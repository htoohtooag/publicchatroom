import { format } from "date-fns";

export function UiElement(divele){

    const infoUserEle = (data) => {

        const uid = data.uid; 
        const email = data.email;
        const fullname = data.displayName;
        const photourl = data.photoURL; 
        const createdtime = data.metadata.creationTime;

        // const getdata = new Date(createdtime).getDate(); 
        // const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","sep","Oct","Nov","Dec"]
        // const getmonth = new Date(createdtime).getMonth(); 
        // const getyear = new Date(createdtime).getFullYear();
        // const formatteddate = `${getdata} ${months[getmonth]} ${getyear}`;

        // const formatteddate = dateFns.format(new Date(createdtime),"do MMM yyyy");
        const formatteddate = format(new Date(createdtime),"do MMM yyyy");



        const html = `
            <img src="${photourl}" width="80" alt="profile icon">
            <p>UID: ${uid}</p>
            <p>Display Name: ${fullname}</p>
            <p>Email: ${email}</p>
            <p>Created At: ${formatteddate}</p>
        `;

        divele.innerHTML = html; 
    }

    return {infoUserEle}
}
