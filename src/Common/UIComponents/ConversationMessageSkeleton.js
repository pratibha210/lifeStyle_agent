
import React from 'react';
import './uicomponent.css';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';

const ConversationMessageSkeleton = (props) => {

    return (
        <div className=" messageSkeletoncls">
            <div className={(props.recieveSms ? ' ' : 'sendmessagecls') + ' ' + "agentmessagestart"}>
                {props.recieveSms &&
                    <div className="avatarskeleton">
                        <Skeleton />
                    </div>
                }
                <div className={
                    (props.recieveSms ?
                        "receiving" : "sending") + " " +
                    "messageSkeleton messagesection"}
                >
                    <Skeleton width={'95%'} />
                    <Skeleton width={'80%'} />
                    <Skeleton width={'35%'} />
                </div>
            </div>
        </div>
    );
}

ConversationMessageSkeleton.prototype = {
    recieveSms: PropTypes.bool,
}

export default ConversationMessageSkeleton;

