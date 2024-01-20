import React, { useEffect, useState } from 'react';
import './module.css';
import TrainingVideoDetailSection from '../Sections/TrainingVideoDetailSection';
import { __DEV } from "../../isDev";
import ButtonComponent from '../../Common/UIComponents/ButtonComponent';
import { useHistory } from 'react-router-dom';

const TrainingDetailModule = (props) => {
    const history = useHistory();

    __DEV && console.log(props.match.params);

    const goBack = () => {
        
        history.goBack();
    }
    const goNext = () =>{
        __DEV &&  console.log('next video linking')
    }
    return (
        <div className="triningDetailStart bgcoloradjust">
            <div className='previousnextbtndiv'>
                < ButtonComponent
                    buttontext='Back to Listing' buttonextraclass='previousbtn' 
                    handleButton={goBack} btniconclass='fa fa-long-arrow-left'/>
                < ButtonComponent
                    buttontext='Go to Next' buttonextraclass='nextbtn' 
                    handleButton={goNext} btniconclass='fa fa-long-arrow-right'/>
            </div>
            <TrainingVideoDetailSection trainingId={props.match.params.id} />
        </div>
    );

}

export default TrainingDetailModule;
