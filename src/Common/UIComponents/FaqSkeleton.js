
import React from 'react';
import './uicomponent.css';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';

const FaqSkeleton = (props) => {

    return (
        <div className=" messageSkeletoncls">
           <div className="expansionheader">
             <Skeleton height={120} width={'100%'}/>
            </div>
        </div>
    );
}

FaqSkeleton.prototype = {
    recieveSms: PropTypes.bool,
}

export default FaqSkeleton;

