import React, {useEffect} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import {verifietoken,deleteBooking} from '../../outils/helpers';
import BookingList from './BookingList';

const DeleteBooking = () => {

    const history = useHistory();
    const params = useParams();
    useEffect(()=> {
        if(verifietoken()){
              if (window.confirm('Vous voulez vraiment annuler la réservation?')) {
                deleteBooking(params.id)
                alert("la réservation est bien supprimé")
            } else {
                console.log('Thing was not deleted to the database.');
            }
          
            history.push("/booking-list");
        }
        else{
            localStorage.clear()
            alert("Votre session a expirée")
            history.push("/login");
        }
    }, [params.id])
    return (
        <BookingList/>
    );
};

export default DeleteBooking;