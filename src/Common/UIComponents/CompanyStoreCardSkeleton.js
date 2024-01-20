// CompanyStoreCardSkeleton
import React from 'react';
import './uicomponent.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Skeleton from '@material-ui/lab/Skeleton';

const CompanyStoreCardSkeleton = (props) => {



    return (
        <div className="storeCardSkeleton">
            <Card className={"trainingCard" + " " + props.extraCls}>

                <CardMedia className="companycard-MediaCls">
                    <Skeleton width={'100%'} height={'100%'} />
                </CardMedia>
                <CardContent>
                    <div className='comapnycard-innerdiv'>
                        <Skeleton width={'98%'} height={20} />
                    </div>

                    <p className="company-deatail">
                        <Skeleton width={'85%'} height={15} />
                        <Skeleton width={'70%'} height={15} />
                    </p>
                </CardContent>
            </Card>
        </div>
    );

}


export default CompanyStoreCardSkeleton;
