// ConversationCardSkeleton
import React from 'react';
import './uicomponent.css';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


const TrainingCardSkeleton = (props) => {


    return (


        <div className="cardComponent">

            <Card className={"trainingCard" + " " + props.extraCls}>

                <CardMedia className="cardMediaCls">
                    <div className="videoimagediv">
                        <Skeleton className="videoskeleton" />
                    </div>

                </CardMedia>
                <CardContent>

                    <Skeleton height={25} />
                    <Skeleton width="60%" height={25} />
                    <Skeleton width="40%" height={25} />
                </CardContent>
                <div className="cardFooter">
                    <Skeleton width={120} height={25} />

                </div>
            </Card>
        </div>

    );
}

export default TrainingCardSkeleton;
