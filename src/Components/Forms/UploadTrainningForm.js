

import React, { useState, useEffect, createRef } from "react";
import "./form.css";
import TextFieldInput from "../../Common/FormFields/TextFieldInput";
import TextAreaFieldInput from "../../Common/FormFields/TextAreaFieldInput";
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import PropTypes from 'prop-types';
import { __DEV } from "../../isDev";
import { useRadioGroup } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import VideocamIcon from '@material-ui/icons/Videocam';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import FormHelperText from "@material-ui/core/FormHelperText";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";
import InputAdornment from '@material-ui/core/InputAdornment';
import ppt from '../../Images/ppt.png';
import pdf from '../../Images/pdf.png';
import doc from '../../Images/doc.png';
import xls from '../../Images/xls.png';
import txt from '../../Images/txt.png';
import CreatableSelectInput from "../../Common/FormFields/CreatableSelectInput";
import PhoneFieldInput from "../../Common/FormFields/PhoneFieldInput";
import Grid from '@material-ui/core/Grid';
import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import file from '../../Images/file-line.png';
import close from '../../Images/close.svg';
import CloseIcon from '@material-ui/icons/Close';
import trainningupload from '../../Images/tranningupload.png';
import fileimgae from '../../Images/file.png';
import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
const axios = require('axios');



const UploadTrainningForm = (props) =>
{
    const [completed, setCompleted] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [uploadingDocs, setUploadingDocs] = useState(false);
    const [docUploadCompletion, setDocUploadCompletion] = useState(false);
    const [docFileData, setDocFileData] = useState({});
    const [completion, setCompletion] = useState(false);
    const [docList, setDocList] = useState([]);
    const [fileData, setFileData] = useState({})
    const [fileprogress, setfileprogress] = useState(0);
    const [docFileprogress, setDocFileprogress] = useState(0);
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });

    const userDetail = useSelector(state => state.userDetail);

    // console.log(userDetail, 'Lal la la al al al');

    // useEffect(() =>
    // {
    //     const timer = setInterval(() =>
    //     {
    //         setProgress((oldProgress) =>
    //         {
    //             if (oldProgress === 100) {
    //                 return 0;
    //             }
    //             const diff = Math.random() * 10;
    //             return Math.min(oldProgress + diff, 100);
    //         });
    //     }, 500);

    //     return () =>
    //     {
    //         clearInterval(timer);
    //     };
    // }, []);

    const cancelUpload = () =>
    {
        setFileData({});
        setCompletion(false);
        setUploading(false);
        setfileprogress(0);
    }

    const notificationClose = () =>
    {
        setAlertMessage({ open: false })
    }

    const imageChange = (e) =>
    {
        console.log(e.target.files[0], userDetail._id);
        setFileData(e.target.files[0]);

        setUploading(true);

        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        axios.request({
            method: "POST",
            url: process.env.REACT_APP_apiurl + "fileupload?entityId=" + userDetail._id,
            data: formData,
            onUploadProgress: (p) =>
            {
                // console.log(p, 'pppppp');

                let percentage = (p.loaded / p.total) * 100

                let finalValue = Math.trunc(percentage)
                console.log(finalValue);
                setfileprogress(finalValue)

            }

        }).then(data =>
        {
            console.log(data.data, 'Dattaa');

            if (data.data.error === false) {
                setUploading(false)
                setCompletion(true)
                props.uploadedData(data.data.result[0])
                setAlertMessage({ open: true, message: "Video uploaded Sucessfully", alertType: 'success' });
            }
        })
    }

    const docChange = (e) =>
    {
        console.log(e.target.files[0]);
        setDocFileData(e.target.files[0]);
        setUploadingDocs(true)

        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        axios.request({
            method: "POST",
            url: process.env.REACT_APP_apiurl + "fileupload?entityId=" + userDetail._id,
            data: formData,
            onUploadProgress: (p) =>
            {
                // console.log(p, 'pppppp');

                let percentage = (p.loaded / p.total) * 100

                let finalValue = Math.trunc(percentage)
                console.log(finalValue);
                setDocFileprogress(finalValue)

            }

        }).then(data =>
        {
            console.log(data.data, 'Dattaa');

            if (data.data.error === false) {
                setUploadingDocs(false);
                setDocUploadCompletion(true);
                setDocFileprogress(0);
                setTimeout(() =>
                {
                    setDocUploadCompletion(false)
                }, 5000);

                let arr = [];
                let obj = {};

                obj.name = data.data.result[0].originalname
                obj.key = data.data.result[0].key
                obj.mimetype = data.data.result[0].mimetype

                arr.push(obj);
                console.log(arr);
                setDocList(arr);
                props.documents(arr);

                setAlertMessage({ open: true, message: "Document uploaded Sucessfully", alertType: 'success' });
            }
        })
    }

    const removeDoc = (data) =>
    {
        console.log(data);

        let arr1 = docList;
        let newArr = arr1.filter(x =>
        {
            return x.originalname !== data.originalname
        })
        console.log(newArr);
        setDocList(newArr);
        setFileData({});
    }

    return (
        <div className="uploadFormCls trainningvideoformstart" >

            <div className={"uploaderformstart" + " " + props.extracls} >

                <Grid container spacing={2}>
                    <Grid item md={6} sm={12} xs={12}>
                        <p className='fileuploadtitle'>Upload Video</p>
                        <div className='videoattachmentsection'>
                            <div className='uploadsec'>
                                {fileData && fileData.name ?
                                    <div className='forLectureVideoUpload'>
                                        <div className='uploadFileListing'>
                                            <div className='uploadVideodiv'>
                                                <div className='trannningimgdiv'>
                                                    <img src={fileimgae} />
                                                </div>
                                                <p className="uploadFileName">{fileData.name}</p>
                                                {/* </Tooltip> */}
                                                <div className='uploadingStatus'>
                                                    {uploading === true ?

                                                        (
                                                            <div className="fileUploadProgress progressUploading">
                                                                <LinearProgress
                                                                    variant="determinate"
                                                                    value={fileprogress}
                                                                    className='linearProgressCls' />
                                                                <div className='uploadingbottompart'>
                                                                    <p><span>{fileprogress}%</span></p>
                                                                    <div onClick={cancelUpload}>
                                                                        <p className='canceltxt' >Cancel</p>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        )
                                                        : completion === true ?

                                                            (
                                                                <div>
                                                                    <p className='uploadComplete'>

                                                                        <LinearProgress
                                                                            variant="static"
                                                                            value={completed}
                                                                            className='linearProgressCls' />

                                                                    </p>
                                                                    <div className='uploadingbottompart'>
                                                                        <p><span>100% </span>Completed</p>
                                                                        <div onClick={cancelUpload}>
                                                                            <p className='canceltxt' >Cancel</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className='uploadVideodiv'>
                                        <div className='trannningimgdiv'>
                                            <img src={trainningupload} />
                                        </div>
                                        <p className='uplodFileTxt'>
                                            Click here to choose video
                                    </p>
                                        <div className='uploadVideoInput onlyforuploadvdo'>
                                            <ButtonComponent
                                                buttontext='Choose File'
                                                buttoncomponentectracls='uploadfilebtnui'
                                                active />
                                            <input type='file'
                                                accept='video/*,.mp4,.mkv,.avi,.mov'
                                                onChange={imageChange}
                                            />
                                        </div>

                                    </div>
                                }
                            </div>
                        </div>
                        {/* <DropzoneComponent
                                    config={props.componentConfig}
                                    eventHandlers={props.eventHandlers}
                                    djsConfig={props.djsConfig}

                                /> */}
                        {props.trainingvimeo && props.trainingvimeo.length > 0 &&
                            <div className='disablediv'>
                            </div>
                        }
                        {/* </div> */}
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <p className="fileuploadtitle">Upload Thumbnail Image</p>
                        <div className='fileuploadsection'>

                            <div className='fileviewsection'>
                                {
                                    props.imageData && props.imageData.length > 0 ?
                                        <img
                                            src={props.imageData[0].mimetype.includes('png') || props.imageData[0].mimetype.includes('jpeg')
                                                || props.imageData[0].mimetype.includes('svg+xml') ?
                                                process.env.REACT_APP_apiurl + 'getFile?key=' + props.imageData[0].key : props.imageData[0].mimetype.includes('application/msword') ? doc : props.imageData[0].mimetype.includes('pdf') ?
                                                    pdf : props.imageData[0].mimetype.includes('text/plain') ? txt :
                                                        props.imageData[0].mimetype.includes('application/vnd.ms-powerpoint') ? ppt :
                                                            props.imageData[0].mimetype.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ? xls :
                                                                props.imageData[0].mimetype.includes('word') ||
                                                                    props.imageData[0].mimetype.includes('doc') ? doc : null}
                                            className='fileimagecss'

                                        /> :
                                        props.uploadFile && props.uploadFile.length > 0 ?
                                            <img
                                                src={props.uploadFile[0].mimetype.includes('png') || props.uploadFile[0].mimetype.includes('jpeg') ||
                                                    props.uploadFile[0].mimetype.includes('svg+xml') ?
                                                    process.env.REACT_APP_apiurl + 'getFile?key=' + props.uploadFile[0].key : props.uploadFile[0].mimetype.includes('application/msword') ? doc : props.uploadFile[0].mimetype.includes('pdf') ?
                                                        pdf : props.uploadFile[0].mimetype.includes('text/plain') ? txt :
                                                            props.uploadFile[0].mimetype.includes('application/vnd.ms-powerpoint') ? ppt :
                                                                props.uploadFile[0].mimetype.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ? xls :
                                                                    props.uploadFile[0].mimetype.includes('word') ||
                                                                        props.uploadFile[0].mimetype.includes('doc') ? doc : null} className='fileimagecss'
                                            />
                                            :
                                            <CameraAltIcon className="cameraicon" />
                                }

                                <div className='fileinputwrapper'>
                                    {/* {props.uploadFile && props.uploadFile.flag!=="true" ? */}
                                    <p>Click here to choose file
                                       <input type="file"
                                            accept='image/*'
                                            className="uploaderimgtype"
                                            onChange={props.imageChange}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextFieldInput inputLabel='Title' textnewclass='titletextfield'
                            textinputname='title'
                            onChange={props.onChange}
                            onError={props.onError}
                            error={props.error}
                            inputProps={{ maxLength: '30' }}
                            errorText={props.errorText}
                            clickLogin={props.clickLogin}
                            defaultValue={props.titleValue}

                        //  onError={() => console.log('>>>')} onChange={() => console.log('>>>')}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <CreatableSelectInput
                            extacls='selectcategoryinput'
                            selectOption={props.categoryArray}
                            inputLabel='Select Category'
                            onChange={props.selectfunc}
                            defaultInputValue={props.tempcategory}
                        // onInputChange={props.addCategory}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <PhoneFieldInput
                            textinputname='index'
                            inputLabel='Index'
                            onChange={props.indexhandle} onError={props.onerrorChange}
                            error={props.indexerr}
                            errorText={props.indextexterr}

                        // clickLogin={signUpClick} 
                        // value={signUpData.phoneNumber}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextAreaFieldInput
                            inputLabel='Vimeo Link'
                            textinputname='vimeoLink'
                            onChange={props.linkOnChange}
                            onError={props.linkOnError}
                            error={props.linkError}
                            errorText={props.linkErrorText}
                            disabled={props.disabled}
                            // disabled={ props.uploadVideo && props.uploadVideo.length > 0 ? true:false}
                            // clickLogin={props.clickLogin}
                            defaultValue={props.linkValue && props.linkValue}
                        //  onError={() => console.log('function called')} onChange={() => console.log('function called')}
                        />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <TextAreaFieldInput rowsnumber={4} inputLabel='Description'
                            textinputname='description'
                            onChange={props.taOnChange} onError={props.taOnError}
                            error={props.taError}
                            errorText={props.taErrorText}
                            clickLogin={props.clickLogin}
                            defaultValue={props.desValue}
                        //  onError={() => console.log('function called')} onChange={() => console.log('function called')}
                        />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <p className='fileuploadtitle'> Attach Files</p>
                        <div className='attachmentsection forfileupload'>
                            <div className='dropzoneattachmentsection'>
                                <div>
                                    <div className='forLectureVideoUpload'>

                                        {docFileData.name ?
                                            <div>

                                                <div className='uploadingStatustwo'>

                                                    {uploadingDocs === true ?

                                                        (
                                                            <div className='uploadingfilediv'>
                                                                <p className="uploadFileName">{docFileData.name}</p>
                                                                {/* // ---uploading vdo start-- */}
                                                                <div className='uploadingStatus'>
                                                                    <div className="fileUploadProgress progressUploading">
                                                                        <p>Uploading</p>
                                                                        <LinearProgress
                                                                            variant="determinate"
                                                                            value={docFileprogress}
                                                                            className='linearProgressCls' />
                                                                        <div className='uploadingbottompart'>
                                                                            <p><span>{docFileprogress}%</span></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            // ---uploading vdo end--
                                                        )
                                                        : docUploadCompletion === true ?
                                                            // ---uploading vdo complete start--
                                                            (
                                                                <div className='uploadingfilediv'>
                                                                    <p className="uploadFileName">{docFileData.name}</p>
                                                                    <div className='uploadingStatus'>
                                                                        <p className='uploadComplete'>
                                                                            Completed
                                                                    <LinearProgress
                                                                                variant="static"
                                                                                value={completed}
                                                                                valueBuffer={100}
                                                                                className='linearProgressCls' />
                                                                            <CheckCircleRoundedIcon className='completedoneicon' />
                                                                        </p>

                                                                    </div>
                                                                </div>
                                                            )
                                                            //---uploading vdo complete end---//
                                                            : docList.length > 0 && docList.map(x =>
                                                            {
                                                                return (
                                                                    <div className='uploadedfilelisting'>
                                                                        <img src={file} className='afterimgfile' />
                                                                        <div className='fileuploadtext'>
                                                                            <div className='fileuploadtooltip'>
                                                                                <p className="uploadFileName uploadDocName">{x.name}</p>
                                                                                <div class="tooltipbottom">
                                                                                    <p>{x.name}</p>
                                                                                    <i></i>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <img src={close} onClick={() => removeDoc(x)} />
                                                                    </div>
                                                                )
                                                            })
                                                    }

                                                </div>
                                                {docList && docList.length > 0 &&


                                                    <div className='fileuploadbutton fileuploadbtnvdo'>
                                                        <ButtonComponent
                                                            buttontext='Select a file to upload'
                                                            extraclass='uploadfilebtnui' active

                                                        />
                                                        <input
                                                            type="file" accept="application/*,.csv,.xlsm,.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                                            onChange={docChange}
                                                        />
                                                    </div>
                                                }
                                            </div> : null}
                                        {uploadingDocs === false && docList.length === 0 ?
                                            <div className='uploadFileListing'>
                                                <div className='uploadVideoInput'>
                                                    <p className='uploadtexthead'>Select your file here to start uploading</p>
                                                    <p className='uploadtextsubhead'>For the most reliable operation, its best to keep your file under 1GB</p>
                                                    <div className='fileuploadbutton'>
                                                        <ButtonComponent
                                                            buttontext='Select a file to upload'
                                                            extraclass='uploadfilebtnui' active
                                                        />
                                                        <input
                                                            type="file" accept="application/*,.csv,.xlsm,.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                                            onChange={docChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div> : null}

                                    </div>
                                </div>

                                <div>

                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>

            </div>
            <div className="faqButnArea">
                {props.errorMessage ? (
                    <FormHelperText id="component-error-text" className="errormsg">
                        <ErrorOutlinedIcon className="erroricon" />
                        {props.errmessage}
                    </FormHelperText>


                ) : null}
                <ButtonComponent
                    buttonextraclass="faqCancelButn"
                    buttontext="Cancel"
                    handleButton={props.onClose}
                />
                <ButtonComponent buttontext='Submit'
                    handleButton={props.handleButton}
                    inactive={props.inactive}
                    loading={props.loading} />
            </div>
            <NotifiedMessageComponent
                messageOpen={alertMessage.open}
                notifiactionText={alertMessage.message}
                messageClose={notificationClose}
                alertType={alertMessage.alertType} />

        </div>
    )
};

UploadTrainningForm.propTypes = {

    document: PropTypes.bool,

};
export default UploadTrainningForm;



