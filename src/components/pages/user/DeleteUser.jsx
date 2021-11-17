import React, {useEffect} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import {verifietoken,deleteUser} from '../../outils/helpers';
import UserList from './UserList';





const DeleteUser = () => {

    const history = useHistory();
    const params = useParams();
    useEffect(()=> {
        if(verifietoken()){
            if (window.confirm('Vous voulez vraiment supprimer l`utilisateur?')) {
            deleteUser(params.id)
            }
            history.push("/user-list");
        }
        else{
            localStorage.clear()
            alert("Votre session est expirer")
            history.push("/login");
        }
    }, [params.id])
    return (
        <UserList/>
    );
};

export default DeleteUser;