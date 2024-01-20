// ConversationCardSkeleton
import React from 'react';
import './uicomponent.css';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';

const ConversationCardSkeleton = (props) => {

    return (
        <div className="conversationCardSkeleton-start conversationcardstart">
            {/* <Card> */}
            <div className="avatarskeleton">
                <Skeleton width={'100%'} height={'100%'} />
            </div>
            <div>
                <div className="firstlineSkeleton">
                    <Skeleton width={'100%'} height={'100%'} />
                </div>
                <div className="secondlineSkeleton">
                    <Skeleton width={'100%'} height={'100%'} />
                </div>
            </div>
            {/* </Card> */}
        </div>
    );
}

export default ConversationCardSkeleton;
