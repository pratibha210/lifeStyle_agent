import React,{ useState } from 'react';
import Preloading from './Common/UIComponents/PreLoader';

const LoaderComponent =()=>{


    return(
        <div>
        {/* <p>Loading..</p> */}
        <Preloading/>
        </div>
    )
}

export default LoaderComponent;