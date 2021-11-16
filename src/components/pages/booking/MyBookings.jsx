import React,{useEffect,useState} from 'react';

import {Container, Row, Col, Button} from "react-bootstrap";
import {getCurrentUser,verifietoken} from "../../outils/helpers";
import axios from 'axios';
import { Link,useHistory } from 'react-router-dom';


const MyBookings = () => {
    const history = useHistory();
    const [bookingsList, setBookingsList] = useState([]);
    const [isDisplay, setIsDisplay] = useState(true);
     const [getcandelete, setGetcandelete] = useState(true);
    const [canDelete, setCanDelete] = useState([]);
    const[detediff,setDatediff] = useState([])  ;
   
   
    //to get the reservation of current user
    useEffect(() => {
         let id = getCurrentUser()
         console.log(id)
        if(verifietoken()){
            
            axios({
                method: "get",
                url: `api/bookings?user=${id}`,
                headers: {  
                    'Authorization':'Bearer '+ localStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log(response);
                const availableBookings = response.data;
                setBookingsList(availableBookings);               
                setIsDisplay(false)
            })
        }
        else{
            localStorage.clear()
            alert("Votre session est expirer")
            history.push("/login");
        }
    },(isDisplay) );

    //to get days between the date start and register
    console.log("bookingsList",bookingsList)
    useEffect(()=>{
       if(bookingsList){
         bookingsList.map(bookingsList=>{
            let diff = {}
            let  date1 = new Date(bookingsList.createdAt);
            let date2 = new Date(bookingsList.dateStart);                                
            let tmp = date2 - date1;
            tmp = Math.floor(tmp/1000);             
            diff.sec = tmp % 60;                     
            tmp = Math.floor((tmp-diff.sec)/60);    
            diff.min = tmp % 60;                    
            tmp = Math.floor((tmp-diff.min)/60);    
            diff.hour = tmp % 24;                   
            tmp = Math.floor((tmp-diff.hour)/24);   
            diff.day = tmp;
              if(diff.day > 1){
                canDelete.push(true) 
                setCanDelete(canDelete)
             }
             else{
                canDelete.push(false) 
                setCanDelete(canDelete)
            }
            detediff.push(diff.day)  
            setDatediff(detediff)   
        }) 
       }
        console.log("diffday",detediff)          
    }) 
    console.log("diffday",detediff)
console.log(canDelete)
    return (

        <>
            <Container className="mb-5">
            
                <Row className="mt-5 form-box offset-md-1 col-md-10 p-3">
                    <h1 className="mt-5 mb-5 text-center blue">Mes reservations</h1>
                    {(bookingsList.map((bookingsList,id) => (
                    <Row>
                        <Col md={3}>
                            Date de début :<br />
                            {new Date(bookingsList.dateStart).getDate()+ '/'+(new Date(bookingsList.dateStart).getMonth()+1)+'/'+new Date(bookingsList.dateStart).getFullYear()}
                        </Col>
                        <Col md={3}>
                            Date de fin :<br />
                            {new Date(bookingsList.endDate).getDate()+ '/'+(new Date(bookingsList.endDate).getMonth()+1)+'/'+new Date(bookingsList.endDate).getFullYear()}
                        </Col>
                        <Col md={3}>
                            Nombre de chambre :<br />
                            {bookingsList.rooms.length}
                        </Col>
                        <Col md={3}>
                            <Button className="white" variant="dark btn-block">
                                <Link to={"/mybooking-view/"+ bookingsList.id}>CONSULTER</Link>
                            </Button>
                        

                        {canDelete[id] &&(
                            <Button className="cancel" variant="dark btn-block" >
                                <Link to={"/mybooking-delete/"+ bookingsList.id}>Annuler</Link>
                            </Button>
                        )}
                        </Col>
                        <hr />
                    </Row>
                    )))}

                </Row>
            </Container>
            
        </>
    );
};

export default MyBookings;