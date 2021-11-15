import React, {useEffect} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import {verifietoken,deleteBooking} from '../../outils/helpers';
import MyBookings from './MyBookings';





const DeleteMyBooking = () => {

    const history = useHistory();
    const params = useParams();
    useEffect(()=> {
        if(verifietoken()){
            if (window.confirm('Vous voulez vraiment annuler la réservation?')) {
                deleteBooking(params.id)
                alert("la réservation est annulé")
 
            } else {
            console.log('Thing was not deleted to the database.');
            }
           
            history.push("/mes-reservations");
        }
        else{
            localStorage.clear()
            alert("Votre session est expirer")
            history.push("/login");
        }
    }, [params.id])
    return (
        <MyBookings/>
    );
};

export default DeleteMyBooking;