import jwt_decode from "jwt-decode";
import axios from 'axios'; 
import {useEffect} from 'react';

//to make verification of token if is valid

export function verifietoken(){
    // get the token
    const token = localStorage.getItem('token');
    //decoded the token
    const decoded = jwt_decode(token);
    console.log(decoded);
    //get the current date in timestamp
    const now = new Date().getTime();
    //get the current date in string
    const nowm = new Date(now);
    //get the exipiration date in timestamp
    const endTime = decoded.exp*1000; 
     //get the exipiration date in string
    const endTimem = new Date(endTime);
    console.log(now);
    console.log(endTime);
    
    if (endTime < now) {
        console.log("Token expired.");
        return false
    } else {
        console.log("Valid token");  
        return true
    }
}
//get the id of user connected
export function getCurrentUser(){
    // get the token
    const token = localStorage.getItem('token');
    //decoded the token
    const decoded = jwt_decode(token);
    // console.log(decoded.id);
    return decoded.id

}
//to get the Role from token
export function getRoles(){
    // get the token
    const token = localStorage.getItem('token');
    //decoded the token
    const decoded = jwt_decode(token);
    console.log(decoded);
    return decoded.roles;
}
//edit image of the room
export function editImageRoom(id,imageFile){
        console.log(imageFile);
        const data = new FormData();
        data.append('imageFile', imageFile);
        axios({
            method: "post",
            url: `api/rooms/${id}/add/or/edit/image`,
            data: data,
            headers: {  
                'Content-Type': 'multipart/form-data',
                'Authorization':'Bearer '+ localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            
            console.log(err)
        })
}
//get the room and to change the state i have to send also setType,setPrice?setImageUrl
export function getRoom(id,setNumber,setType,setPrice,setImageUrl){
    
    axios({
        method: "get",
        url: `api/rooms/${id}`,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {
        console.log(res)
        setNumber(res.data.number)
        setType(res.data.type)
        setPrice(res.data.price)
        setImageUrl(res.data.imageUrl)
    })
    .catch(err =>{
        console.log(err)
    })

return  {setNumber,setType,setPrice,setImageUrl}
}
//edit the room without image
export function editRoomWithoutImage(id,number,type,price){
    const data = {
        number:number,
        type:type,
        price:price
    }
    axios({
        method: "put",
        url: `api/rooms/${id}`,
        data: data,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {
        
        console.log(res.data)
    })
    .catch(err => {
        
        console.log(err)
    })
}

//edit all field of room
export function editRoom(id,number,type,price,imageFile){
    editRoomWithoutImage(id,number,type,price);
    editImageRoom(id,imageFile);
}
//delete room
export function deleteRoom(id){
    axios({
        method: "delete",
        url: `api/rooms/${id}`,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {
        console.log(res)
    })
    .catch(err =>{
        console.log(err)
    })

}
//get all room
export function getAllRoom(){
    
    axios({
        method: "get",
        url: `api/rooms`,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {
    
        console.log(res)
    
    })
    .catch(err =>{
        console.log(err)
    })


}
//delete option 
export function deleteOption(id){
    axios({
        method: "delete",
        url: `api/options/${id}`,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {
        console.log(res)
    })
    .catch(err =>{
        console.log(err)
    })

}
//edit option and send the name and price
export function editOption(id,name,price){
    const data = {
        name:name,
        price:price
    }
    axios({
        method: "put",
        url: `api/options/${id}`,
        data: data,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {
        
        console.log(res.data)
    })
    .catch(err => {
        
        console.log(err)
    })  
}
//get option and to change the state i have to send also setName,setPrice
export function getOption(id,setName,setPrice){
    
    axios({
        method: "get",
        url: `api/options/${id}`,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {
        console.log(res)
        setName(res.data.name)
        setPrice(res.data.price)
        
    })
    .catch(err =>{
        console.log(err)
    })

return  {setName,setPrice}
}
//get user
export function getUser(id,setEmail,setRoles){
    
    axios({
        method: "get",
        url: `api/users/${id}`,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {
        console.log(res)
        setEmail(res.data.email)
        setRoles(res.data.roles)        
    })
    .catch(err =>{
        console.log(err)
    })

    return  {setEmail,setRoles}
}

//get userData
export function getUserData(id,setEmail,setFirstName,setLastName,setPhone){
    
    axios({
        method: "get",
        url: `api/users/${id}`,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {
        console.log(res)
        setEmail(res.data.email)
        setFirstName(res.data.firstName)
        setLastName(res.data.lastName)
        setPhone(res.data.phone)        
    })
    .catch(err =>{
        console.log(err)
    })

    return  {setEmail,setFirstName,setLastName,setPhone}
}

//edit user from admin dashboard
export function editUser(id,email,roles){

    const data = {    
        email:email,
        roles:roles,
    }
    axios({
        method: "put",
        url: `api/users/${id}`,
        data: data,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {    
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    })   
}

//edit user's Data from My account section
export function editUserData(id, email, plainPassword, firstName, lastName, phone){

    const data = {    
        email:email,
        plainPassword:plainPassword,
        firstName:firstName,
        lastName:lastName,
        phone:phone
    }
    axios({
        method: "put",
        url: `api/users/${id}`,
        data: data,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token") 
        }
    })
    .then(res => {    
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    })   
}
//delete user 
export function deleteUser(id){
    axios({
        method: "delete",
        url: `api/users/${id}`,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {
        console.log(res)
        alert("utilisateur est bien supprimé")
    })
    .catch(err =>{
        console.log(err)
        alert("vous ne pouvez pas le supprimé car il a des réservations")
    })

}

//get the price of selected room
export function getPriceOfSelectedRooms(id){
    axios({
        method: "get",
        url: `api/rooms/${id}`,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {
        const selectedPrice = res.data.price;
        console.log(selectedPrice);
        return selectedPrice;
    })
    .catch(err => {
        console.log(err)
    })

}
////////add booking/////
export function addBooking(dateStart,endDate,totalPrice,rooms,options){
    const data = {
        dateStart:dateStart,
        endDate:endDate,
        totalPrice:totalPrice,
        rooms:rooms,
        options:options
    }
    axios({
        method: "post",
        url: "api/bookings",
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        },
        data:data
    })
    .then((response) => {
        console.log(response);
    })
}
//delete booking

//delete room
export function deleteBooking(id){
    axios({
        method: "delete",
        url: `api/bookings/${id}`,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {
        console.log(res)
    })
    .catch(err =>{
        console.log(err)
    })

}
//get user from booking
//get user
export function getUserForBooking(url, setFirstName, setLastName){
    
    axios({
        method: "get",
        url: url,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {
        console.log(res.totalPrice)  

        setFirstName(res.data.totalPrice)    
        setLastName(res.data.lastName)       
    })
    .catch(err =>{
        console.log(err)
    })


return  {setFirstName,setLastName}
}
//add booking
/* export function addBookingf(){ */
/*      //add booking */
/*  useEffect(()=>{ */
/*     console.log("finish",prices);  */
/*     if(totalPrice && prices.length==idsForBooking.length){ */
/*         addBooking(dateStart,endDate,totalPrice,rooms[0],checkedValues) */
/*         alert(`La réservation est bien rajoutée` ) */
/*         history.push("/mes-reservations"); */
/*     } */
/* },[totalPrice]) */
/* } */
/*  */
//payment
export function payment(token,totalPrice){
    
    axios({
        method: "post",
        url: `booking/payment/${token}/${totalPrice}`,
    })
    .then(res => {
        console.log(res)   
    })
    .catch(err =>{
        console.log(err)
    })

    return true
}
