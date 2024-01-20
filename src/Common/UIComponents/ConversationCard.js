import React, { Component } from "react";
import "./uicomponent.css";
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';


const ConversationCard = (props) => {


    const cardClicked = (data) => {
        console.log('>>>>>>>>>L1111111', data)
        props.cardClick(data)
    }


    return (
            <div className={(props.active && 'conversationactive') + ' ' + "conversationcardstart"}
                onClick={() => cardClicked(props.data)}
            // {props.showConversation(props)}
            >

                <div className="avatarsection">
                    <Avatar colors={['#fea34c', '#1b1f28', '#b9aafd', '#fecd3c', '#30b9b9', '#ef4d4a', '#f8a3d0']} name={props.name} size="40" />
                    {props.online &&
                        <div className="onlineindication"></div>
                    }
                </div>
                <div style={{ width: '100%' }} onClick={props.showConversation}>
                    <div className="coversationfirstline">
                        <p>{props.name}</p>
                        <span>
                            {props.time}
                        </span>
                    </div>
                    <div className="coversationsecondline">
                        <p>{props.firstmessage}</p>
                        <p className="messagenumber">
                            {props.messagenumber}
                        </p>
                    </div>
                </div>
            </div>
    );

}

ConversationCard.propTypes = {
    online: PropTypes.bool,
    active: PropTypes.bool,
    messagenumber: PropTypes.number,
    firstmessage: PropTypes.string,
    name: PropTypes.string,
    time: PropTypes.string,
    showConversation: PropTypes.func,
};

export default ConversationCard;
