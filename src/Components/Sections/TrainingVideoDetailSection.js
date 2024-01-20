import React, { useEffect, useState } from 'react';
import './section.css';
import ButtonComponent from '../../Common/UIComponents/ButtonComponent';
import ReactPlayer from 'react-player'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { __DEV } from "../../isDev";
import * as moment from 'moment';
import download from '../../Images/download.png';

const TrainingVideoDetailSection = (props) => {

    const [playing, setPlaying] = React.useState(true);
    const [url, setUrl] = React.useState(null);
    const [pip, setPip] = React.useState(false);
    const [controls, setControls] = React.useState(true);
    const [light, setLIght] = React.useState(false);
    const [volume, setVolume] = React.useState(0.8);
    const [muted, setMuted] = React.useState(false);
    const [played, setPlayed] = React.useState(0);
    const [loaded, setLoaded] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [playbackRate, setPlayBackrate] = React.useState(1.0);
    const [loop, setLoop] = React.useState(false);
    const [trainingDetail, setTrainingDetail] = React.useState({});


    useEffect(() => {

        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'training/getById?trainingId=' + props.trainingId, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result.result);
                if (!result.error) {

                    setTrainingDetail(result.result)


                }
                else {


                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });



    }, [props.trainingId])

    const handleDuration = (duration) => {

        setDuration(duration);
    }

    const handlePlay = () => {

        __DEV && console.log('onPlay')
        setPlaying(true);

    }

    const load = (url) => {

        setUrl(url);
        setPlayed(0);
        setLoaded(0);
        setPip(false);
    }

    const handleEnablePIP = () => {
        setPip(true);
    }

    const handleDisablePIP = () => {
        setPip(false);
    }

    const handlePause = () => {
        __DEV && console.log('onPause')
        setPlaying(false);
    }

    const handleEnded = () => {
        __DEV && console.log('onEnded')
        setPlaying(loop);
    }

    const handleToggleMuted = () => {
        setMuted(!muted)
    }

    const downloadDoc = (file) =>{
    
        const url = process.env.REACT_APP_apiurl + "getFile?key=" + file.key;
        const a = document.createElement('a');
        a.href = url;
        a.download = file && file.name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }

    return (
        <div className="trainingVideoDetailSec">

            <Card>
                <div className='player-wrapper'>
                    <ReactPlayer
                        className='react-player'
                        url={trainingDetail.processedUrl}
                        width='100%'
                        height='100%'
                        playing
                        controls
                        playsinline
                        playbackRate={playbackRate}
                        volume={volume}
                        onDuration={handleDuration}
                        onEnded={handleEnded}
                        onReady={() => console.log('onReady')}
                        onStart={() => console.log('onStart')}
                        onPlay={handlePlay}
                        muted={muted}
                    />
                </div>
                <CardContent className="detailCardContent">
                    <h2 className="cardHeading">
                        {trainingDetail.title}
                        {/* {props.cardHeading} */}
                    </h2>
                    <ul className="videoViewDate">
                        {/* <li className="forBbullet">
                            151 views */}
                        {/* {props.viewrs} */}
                        {/* </li> */}
                        <li>
                            {moment(trainingDetail.createdDate).format('MMM Do , YYYY')}
                            {/* {props.videoDate} */}
                        </li>
                    </ul>
                    <hr className="lightBorder" />
                    <div>
                        <h3 className="subHeader">Video description</h3>
                        <p className="subTitle">{trainingDetail.description}</p>

                        {/* <p className="subTitle">It's great you have focused goal and that will help you a great deal.</p> */}
                        <ul className="descriptionList">
                            {/* <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                             standard dummy text ever since the 1500s</li>
                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</li>
                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s , when an unknown printer took a galley of type and scrambled
                             it to make a type specimen book.</li>
                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                             standard dummy text ever since the 1500s</li>
                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</li>
                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s , when an unknown printer took a galley of type and scrambled
                             it to make a type specimen book.</li> */}
                        </ul>
                        {/* <p className="subTitle">Good Luck</p> */}
                        <div className="detailfootersec">
                            <p className="attachtitle">Attachments</p>
                           
                            <div className="attachfiledtl">
                            {trainingDetail.documents && trainingDetail.documents.length > 0 && trainingDetail.documents.map(doc =>
                                <div className="detailattachment">
                                    <p className="attachfilename">{doc.name}</p>
                                    <div className="detaildownload">

                                        <ButtonComponent btnimg={download}
                                            buttontext='Download File'
                                            buttonextraclass='download-btn'
                                            handleButton={()=>downloadDoc(doc)}
                                        />
                                    </div>
                                </div>)}
                                {/* <div className="detailattachment">
                                    <p className="attachfilename"> files_close903242.doc </p>
                                    <div className="detaildownload">
                                        <ButtonComponent btnimg={download}
                                            buttontext='Download File'
                                            buttonextraclass='download-btn'
                                        // handleButton={downloads}
                                        />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

}

TrainingVideoDetailSection.prototype = {
    cardHeading: PropTypes.string,
    viewrs: PropTypes.number,
    videoDate: PropTypes.string,
}

export default TrainingVideoDetailSection;
