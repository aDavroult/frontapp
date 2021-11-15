import React, {useEffect} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import {verifietoken,deleteRoom} from '../../outils/helpers';
import RoomList from './RoomList';





const DeleteRoom = () => {

    const history = useHistory();
    const params = useParams();
    useEffect(()=> {
        if(verifietoken()){
            if (window.confirm('Vous voulez vraiment supprimer la chambre?')) {
            deleteRoom(params.id)
            alert("la chambre est bien supprimé")
            }
            history.push("/room-list");
        }
        else{
            localStorage.clear()
            alert("Votre session est expirer")
            history.push("/login");
        }
    }, [params.id])
    return (
        <RoomList/>
    );
};

export default DeleteRoom;