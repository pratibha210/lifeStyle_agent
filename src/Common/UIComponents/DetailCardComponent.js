import React, { Component, useState, useEffect } from "react";
import './uicomponent.css';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import pfimage from '../../Images/profileimg.jpg'
import menuicon from '../../Images/menumb.png'
import ButtonComponent from './ButtonComponent';
import download from '../../Images/download-white.png';
import { useDispatch, useSelector } from 'react-redux';
import { __DEV } from "../../isDev";
import ppt from '../../Images/ppt.png';
import pdf from '../../Images/pdf.png';
import doc from '../../Images/doc.png';
import xls from '../../Images/xls.png';
import txt from '../../Images/txt.png';
import CloseIcon from '@material-ui/icons/Close';

const DetailCardComponent = (props) =>
{

    console.log(props.cardData);

    const [collapse, setCollapse] = React.useState(false);
    const userDetail = useSelector(state => state.userDetail);
    const [tempCardData, setCardData] = useState(null);

    const moreBtnClick = () =>
    {
        setCollapse(true);
    }
    const lessBtnClick = () =>
    {
        setCollapse(false);
    }
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event =>
    {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () =>
    {
        setAnchorEl(null);
    };


    useEffect(() =>
    {
        __DEV && console.log(props.cardData);
        setCardData(props.cardData);

    }, [props]);

    useEffect(() =>
    {
        __DEV && console.log(tempCardData);


    }, [tempCardData]);


    // process.env.REACT_APP_apiurl + 'getFile?key=' + x.document[0].key

    const downloads = () =>
    {
        console.log(tempCardData.document[0].name, 'L99>>');

        // https://api.lifeagent.agiantidea.com/getFile?key='key_here

        const url = process.env.REACT_APP_apiurl + "getFile?key=" + tempCardData.document[0].key;
        const a = document.createElement('a');
        a.href = url;
        a.download = tempCardData.document[0].name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // const downloadFile = () =>
    // {
    //     console.log(tempCardData.document[0].key, 'L99>>');
    //     // const url = process.env.REACT_APP_apiurl + "/getFile?key=" + tempCardData.document[0].key;
    //     // const a = document.createElement('a');
    //     // a.href = url;
    //     // a.download = tempCardData.document[0].name;
    //     // document.body.appendChild(a);
    //     // a.click();
    //     // window.URL.revokeObjectURL(url);
    // }

    return (
        <div className="marketingdetailcardstart">
            <p className="closeArea"><CloseIcon className="closeimg" onClick={props.deatilsClose} /></p>
            <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                    <div className="deatilheadersec">
                        <div className="managerdeatilsimgdiv">
                            {tempCardData && tempCardData.document ?
                            (tempCardData.document[0].mimetype.includes('png') || tempCardData.document[0].mimetype.includes('jpeg') || tempCardData.document[0].mimetype.includes('jpg') ?
                                <img
                                    alt=""
                                    // src={tempCardData && tempCardData.document ? process.env.REACT_APP_apiurl + 'getFile?key=' + tempCardData.document[0].key : null}
                                    className="mangerimg-card"
                                    src={
                                        process.env.REACT_APP_apiurl + 'getFile?key=' + tempCardData.document[0].key}

                                /> :
                                <img
                                alt=""
                                // src={tempCardData && tempCardData.document ? process.env.REACT_APP_apiurl + 'getFile?key=' + tempCardData.document[0].key : null}
                                className="mangerimg-card docfilesimg"
                                src={tempCardData.document[0].mimetype.includes('pdf') ?
                                        pdf : tempCardData.document[0].mimetype.includes('text/plain') ? txt : tempCardData.document[0].mimetype.includes('application/vnd.ms-powerpoint') ? ppt : (tempCardData.document[0].mimetype.includes('xls') || tempCardData.document[0].mimetype.includes('sheet')) ? xls : (tempCardData.document[0].mimetype.includes('doc') || tempCardData.document[0].mimetype.includes('word')) ? doc : null}

                            /> )
                                : null}
                        </div>
                        {props.downloadbutton &&
                           
                                <ButtonComponent
                                    mainbuttonextra='downloadbtnextracls'
                                    btnimg={download} buttontext='Download File' buttonextraclass='download-btn marketingdeatilsbtn' handleButton={downloads} />
                            
                        }
                    </div>
                </Grid>
                <Grid item md={8} xs={12}>
                    <p className="detailtitletext"> {tempCardData && tempCardData.title}</p>
                    <p className='detailtitledesc'>
                        {tempCardData && tempCardData.description}
                    </p>
                </Grid>
            </Grid>


            {/* <div className="cardfooterdiv">
                <p className="uploadeddate">Dec 20th, 2020</p>
                <ButtonComponent btnimg={download} buttontext='Download' buttonextraclass='download-btn' />
            </div> */}
        </div >

    );

}

DetailCardComponent.prototype = {
    errorText: PropTypes.string,
    openCard: PropTypes.func
}

export default DetailCardComponent;
