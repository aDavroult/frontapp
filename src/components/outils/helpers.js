import jwt_decode from "jwt-decode";
import axios from 'axios'; 
import {useEffect} from 'react';

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
export function getRoles(){
    // get the token
    const token = localStorage.getItem('token');
    //decoded the token
    const decoded = jwt_decode(token);
    console.log(decoded);
    return decoded.roles;
}
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
export function getRoom(id,setPosts,setNumber,setType,setPrice,setImageFile){
    
    axios({
        method: "get",
        url: `api/rooms/${id}`,
        headers: {  
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
    })
    .then(res => {
        console.log(res)
        setPosts(res.data)
        setNumber(res.data.number)
        setType(res.data.type)
        setPrice(res.data.price)
    })
    .catch(err =>{
        console.log(err)
    })

return  {setPosts,setNumber,setType,setPrice}
}
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
export function editRoom(id,number,type,price,imageFile){
    editRoomWithoutImage(id,number,type,price);
    editImageRoom(id,imageFile);
}
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
