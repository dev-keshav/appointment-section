import React,{useState,useEffect} from 'react'
import { Timestamp } from '@firebase/firestore';
import './Appointments.css';
import config from '../../Config';



import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore, collection, query,  getDocs} from "firebase/firestore";
const appConfig = firebase.initializeApp(config);
const db = getFirestore(appConfig);




const  Appointments = () =>{
  let cusData = `
  <div class="outer-wrapper3">
  <h3 class="heading-Appo">Appointments</h3>
  <div class="table-wrapper3">

  <table class="tableAppo"
  <thead>
          <tr>
            <th class="thAppo">Sr. No.</th>
            <th class="thAppo">User ID</th>
            <th class="thAppo">User Name</th>
            <th class="thAppo">User Mobile</th>
            <th class="thAppo">Gender</th>
            <th class="thAppo">Booking ID</th>
            <th class="thAppo">Transaction ID</th>
            <th class="thAppo">Appointment Time</th>
            <th class="thAppo">Booked At</th>
            <th class="thAppo">Salon ID</th>
            <th class="thAppo">Salon Name</th>
            <th class="thAppo">Salon Address</th>
            <th class="thAppo">Service Type</th>
            <th class="thAppo">Total Price in INR</th>
            <th class="thAppo">Status</th>
          </tr>
          </thead>
          <tbody>
        `;
  let id=1;
  useEffect(() =>{
  const q = query(collection(db,"appointment"));
  getDocs(q).then((doc)=> {
    doc.forEach((da) => {
    const appDate= new Date(da.data().appTime).toLocaleDateString();
    const appTime= new Date(da.data().appTime).toLocaleTimeString();
    const bookDate = new Date(da.data().bookedAt).toLocaleDateString(); 
    const bookTime = new Date(da.data().bookedAt).toLocaleTimeString();
    console.log(appTime);

      // var statusColor;
      // const status = da.data().status;
      // if(status === 'waiting'){
      //   statusColor = "yellow";
      // }
      // else if(status === 'accept'){
      //   statusColor = 'green';
      // }
      // else if(status === 'cancelled'){
      //   statusColor = 'black'; 
      // }
      // else if(status === 'reject'){
      //   statusColor = 'red';
      // }




      const row = ` <tr
      key=${da.data().userUid}
    ><td class="tdAppo">${id++}
      </td>
      <td class="tdAppo">${da.data().userUid}</td>
      <td class="tdAppo">${da.data().userName}</td>
      <td class="tdAppo">${da.data().userMobile}</td>
      <td class="tdAppo">${da.data().userGender}</td>
      <td class="tdAppo">${da.data().bookingId}</td>
      <td class="tdAppo">${da.data().transactionId}</td>
      <td class="tdAppo">${appTime} on ${appDate}</td>
      <td class="tdAppo">${bookTime} on ${bookDate}</td>     
      <td class="tdAppo">${da.data().clUid}</td>
      <td class="tdAppo">${da.data().clName}</td>
      <td class="tdAppo">${da.data().clAddress}</td>
      <td class="tdAppo">${da.data().serviceType}</td>
      <td class="tdAppo">${da.data().totalPrice}</td>
      <td class="tdAppo">${da.data().status}</td>

    </tr>`
    ;
   
   cusData += row;
   
  });
  cusData +=`
  </tbody>
 </table>
</div>`;
document.getElementById('test12343').innerHTML=cusData;
})
  },[])


  return(<div id="test12343"></div> )
}
export default Appointments;
