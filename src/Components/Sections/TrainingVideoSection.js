import React, { useEffect, useState } from "react";
import './section.css';
import CardComponent from '../../Common/UIComponents/CardComponent'
import video from '../../Images/video1.jpg'
import ButtonComponent from '../../Common/UIComponents/ButtonComponent';
import PropTypes from 'prop-types';
import SearchFieldInput from '../../Common/FormFields/SearchFieldInput';
import { useDispatch, useSelector } from 'react-redux'
import NoDataFoundComponent from "../../Common/UIComponents/NoDataFoundComponent";
import Grid from '@material-ui/core/Grid';
import TrainingCardSkeleton from "../../Common/UIComponents/TrainingCardSkeleton";
import GlobalPagination from '../../Common/UIComponents/GlobalPagination';
import { useHistory, NavLink } from 'react-router-dom';
import UnauthorizedSection from "../Sections/CommonSection/UnauthorizedSection";
import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';
import { __DEV } from "../../isDev";
import filter from '../../Images/filter.png'
import DropDownFieldInput from '../../Common/FormFields/DropDownFieldInput';
import { DROPDOWN_MENU} from "../AppConfig";

var moment = require('moment');

const TrainingVideoSection = (props) => {
    const history = useHistory();
    const trainingVideos = useSelector(state => state.trainingVideos);
    const userDetail = useSelector(state => state.userDetail);
    const [saveVideoData, setData] = useState(null);
    const [page, setPagenumber] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [spage, setSpage] = useState(1);
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });
    const [filterstate, setFilterstate] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [filterOptions, setFilterOptions] = React.useState(DROPDOWN_MENU.filetr_dropdown)

    useEffect(() => {
        __DEV &&  console.log('486',props.videos)
        setData(props.videos);
    }, [props])

    const openDeailPage = (trainingId) => {
        history.push(`/trainingdetail/${trainingId}`);
    }
    const viewAllVideo = (category) => {
        history.push(`/trainingvideolist/${category}`);
    }

    const allTrainingVideo = () => {
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'training/getallcategories', reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result.result);
                if (!result.error) {
                    setData(result.result)
                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });

    }


    {/* =============Pagination for marketing list=============== */ }


    const changePage = (page) => {
        __DEV && console.log(page, 'L214');

        if (!(searchText.length > 0)) {


            const reqValues = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem('auth_token')
                }

            };
            fetch(process.env.REACT_APP_apiurl + 'training/get?resPerPage=12&page=' + page, reqValues)
                .then(result => result.json())
                .then(result => {

                    __DEV && console.log(result);

                    __DEV &&  console.log(result);
                    if (result.error) {
                        setData(result.result);
                    }
                    else {

                    }
                })
                .catch(err => {
                    __DEV && console.log(err)
                });

        } else {

            setSpage(page);
        }
    }



    useEffect(() => {

        if (searchText != '') {

            searchTraining(searchText);
        }


    }, [spage])

    // {==================Serach function start=====================}

    /////// onChange function ////////
    const onsearchChange = (e) => {

        __DEV && console.log(e);

        setSearchText(e);

        if (e.length > 0) {

            searchTraining(e);

        } else {

            allTrainingVideo();

        }

    }
    const searchTraining = (data) => {
        __DEV && console.log(data, 'data')
        setData(null);

        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + "training/search?searchString=" + data , reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {

                    setData(result.result)
                }
                else {

                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });

    }


    const notificationClose = () => {
        setAlertMessage({ open: false })
    }

    const openFilerDropdown = event => {
        setAnchorEl(event.currentTarget);
    };
    const closeFilterDropdown = event => {
        setAnchorEl(null);
    };

     

    return (
        <div className="trainingVideoSec">

            <div className="marketingtitlesec trainingTitleArea forsearchbaraligenment">
            <div className='marketingtitlesearchbardiv'>
                <p >Training Videos
                {userDetail.role != 'agent' && localStorage.getItem('auth_token') ?
                        <ButtonComponent buttontext='Add Videos'
                            buttonextraclass='addmaketing-btn ' mainbuttonextra='hidden-md hiddeniPad' handleButton={props.addFormCalled} />
                        : null}
                </p>
                  <SearchFieldInput onChange={onsearchChange} />
                  </div>
                <div className="listtopheader">
                    {userDetail.role != 'agent' && localStorage.getItem('auth_token') ?
                        <ButtonComponent buttontext='Add Videos'
                            buttonextraclass='addmaketing-btn' 
                            mainbuttonextra='hidden-xs visibleiPad' 
                            handleButton={props.addFormCalled} /> : null}
                            <div  aria-describedby={anchorEl ? "simple-popover" : ''}>

                   {/* <ButtonComponent
                            buttontext='filter' btnimg={filter} buttonextraclass='filterbutton' handleButton={event => openFilerDropdown(event)}
                        /> */}
                        </div>
                </div>

            </div>
            
            <DropDownFieldInput
                id={anchorEl ? "simple-popover" : ''}
                open={anchorEl}
                anchorEl={anchorEl}
                handleClose={closeFilterDropdown}
                dropdownOptions={filterOptions.options}
                // handleClick={handleDropDown}
                dropdownanchercls="filterdropdown"
            />

            <hr className="borderline" />
            {localStorage.getItem('auth_token') ? saveVideoData && saveVideoData.length > 0 ? saveVideoData.map(y =>
            <div className={"traningVideos"}>
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div className="categorysection">
                        <h2 className="categoryname">{y.name}</h2>
                        <div className="viewmorebtnarea">
                            <ButtonComponent buttontext='View All'
                                buttonextraclass='viewallvdo-btn'
                             handleButton={()=>viewAllVideo(y.name)}
                            />
                        </div>
                        </div>
                    </Grid>
                </Grid>
                
                    <Grid container spacing={2}>
                        {y.trainings && y.trainings.length > 0 ? y.trainings.map(x =>
                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                <CardComponent
                                    cardClick={() => x.transcoded == 1 ? openDeailPage(x._id) : setAlertMessage({ open: true, message: "Video transcoding is in progess.Kindly wait for status to be - PROCESSED", alertType: 'error' })}
                                    cardImg={x.images? process.env.REACT_APP_apiurl + 'getFile?key=' + x.images.key :
                                        null}
                                    cardHeading={x.title}
                                    cardDetl={x.description}
                                    options={userDetail.role!='agent'?true:false}
                                    videoDate={moment(x.createdDate).format("MMMM Do YYYY")}
                                    editOptionCalled={() => props.addFormCalled(x,"true")}
                                    deleteCalled={() => props.deleteCalled(x._id)}
                                    queued={userDetail.role != 'agent' ? x.transcoded == 2 : false}
                                    Processing={userDetail.role != 'agent' ? x.transcoded == 0 : false}
                                    Processed={userDetail.role != 'agent' ? x.transcoded == 1 : false}
                                    category='Category'
                                    files={x.documents}
                                />
                            </Grid>
                        )
                        : (y.trainings && y.trainings.length == 0) ? <NoDataFoundComponent /> :
                                (<Grid item lg={4} md={6} sm={6} xs={12}>
                                    <TrainingCardSkeleton extraCls="traningskeleton" />
                                </Grid>)
                        }
                    </Grid>
                   
            </div> ) : <div className='traingnodatafound'>
            <NoDataFoundComponent />
            </div>
            : 
            <div className='unauthorizetraing'><UnauthorizedSection /></div> }
             {/* <GlobalPagination total={10} pageChange={changePage} /> */}
            <NotifiedMessageComponent
                messageOpen={alertMessage.open}
                notifiactionText={alertMessage.message}
                messageClose={notificationClose}
                alertType={alertMessage.alertType} />
        </div>
    );

}

TrainingVideoSection.propTypes = {

    addFormCalled: PropTypes.func,

};
export default TrainingVideoSection;
