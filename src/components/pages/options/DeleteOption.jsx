import React, {useEffect} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import {verifietoken,deleteOption} from '../../outils/helpers';
import OptionList from './OptionList';





const DeleteOption = () => {

    const history = useHistory();
    const params = useParams();
    useEffect(()=> {
        if(verifietoken()){
            deleteOption(params.id)
            alert("l'option est bien supprimé'")
            history.push("/option-list");
        }
        else{
            localStorage.clear()
            alert("Votre session est expirer")
            history.push("/login");
        }
    }, [params.id])
    return (
        <OptionList/>
    );
};

export default DeleteOption;