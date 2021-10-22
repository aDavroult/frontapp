import axios from "axios";
import jwt_decode from "jwt-decode";

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
