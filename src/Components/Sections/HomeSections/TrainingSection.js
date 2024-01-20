import React, { useState, useEffect } from "react"; import './homesections.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import video from '../../../Images/video1.jpg'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ButtonComponent from '../../../Common/UIComponents/ButtonComponent';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CardComponent from '../../../Common/UIComponents/CardComponent';
import { useDispatch, useSelector } from 'react-redux';
import { __DEV } from "../../../isDev";
import { useHistory } from 'react-router-dom';
import NotifiedMessageComponent from '../../../Common/UIComponents/NotifiedMessageComponent';



var moment = require('moment');


const TrainingSection = (props) =>
{

    const history = useHistory();
    const [getTrainingVideos, getVideoData] = useState([]);
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });
    const userDetail = useSelector(state => state.userDetail);
    const dispatch = useDispatch();


    const goToTraining = () =>
    {
        history.push('/training');
    }
    useEffect(() =>
    {
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'training/get?resPerPage=3&page=1', reqValues)
            .then(result => result.json())
            .then(result =>
            {

                __DEV && console.log(result,"394");
                if (result.error) {
                    getVideoData(result.result)
                    dispatch({ type: 'TRAINING_VIDEOS', data: result.result });
                }
                else {

                    getVideoData([]);

                }
            })
            .catch(err =>
            {
                __DEV && console.log(err)
            });


    }, [localStorage.getItem('auth_token')]);

    const openDetailPage = (trainingId) =>
    {
        history.push(`/trainingdetail/${trainingId}`);
    }

    const notificationClose = () =>
    {
        setAlertMessage({ open: false })
    }


    return (
        <div className="trainingsection">
            <h1>Training videos</h1>
            <Grid container spacing={2}>

                {getTrainingVideos && getTrainingVideos.map(x =>
                {

                    return (
                        <Grid item lg={4} md={4} sm={6} xs={12} className='hometraingsectiongrid'>
                            <CardComponent 
                                category='Category'
                                cardClick={() => x.transcoded == 1?  openDetailPage(x._id): setAlertMessage({ open: true, message: "Video transcoding is in progess.Kindly wait for status to be - PROCESSED", alertType: 'error' })}
                                cardImg={Object.keys(x.images).length > 0 ? process.env.REACT_APP_apiurl + 'getFile?key=' + x.images.key : null}
                                cardHeading={x.title}
                                options={userDetail.role!='agent'?true:false}
                                cardDetl={x.description}
                                videoDate={moment(x.createdDate).format("MMMM Do YYYY")}
                                deleteCalled={()=>props.deleteCalled(x._id)}
                                queued = {userDetail.role != 'agent'? x.transcoded == 2:false}
                                Processing = {userDetail.role != 'agent'? x.transcoded == 0:false}
                                Processed = {userDetail.role != 'agent'? x.transcoded == 1:false}
                                files={x.documents!=null && x.documents}

                            />
                        </Grid>
                    )

                })}
            </Grid>
            <ButtonComponent buttontext="See More" handleButton={goToTraining} />

              <NotifiedMessageComponent
                messageOpen={alertMessage.open}
                notifiactionText={alertMessage.message}
                messageClose={notificationClose}
                alertType={alertMessage.alertType} />
            
        </div>


    );

}

export default TrainingSection;
