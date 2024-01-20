
import React from 'react';
import './uicomponent.css';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const ManagerListSkeleton = (props) => {

    return (
        <div className="managerlistcard skeletonxtracls" >

            <div className="dpimagediv">
                <Skeleton />
            </div>
            <Grid container spacing={2}>
                <Grid item md={10} sm={12} xs={12} className='managerleft-card'>
                    <Skeleton height={30} width={'95%'} />
                    <Skeleton height={25} width={'75%'} />
                    <Skeleton height={25} width={'65%'} />
                    <Skeleton height={25} width={'55%'} />
                </Grid>
            </Grid>

        </div >
    );
}

ManagerListSkeleton.prototype = {
    recieveSms: PropTypes.bool,
}

export default ManagerListSkeleton;

