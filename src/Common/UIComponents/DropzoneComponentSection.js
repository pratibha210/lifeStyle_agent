import React, { useState, useEffect } from 'react';
import './uicomponent.css';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/dropzone.css';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonComponent from './ButtonComponent';
import { __DEV } from "../../isDev";
import { useDispatch, useSelector } from 'react-redux';

import LinearProgress from '@material-ui/core/LinearProgress';
import file from '../../Images/file-line.png';
import close from '../../Images/close.svg';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const axios = require("axios");


const Transition = React.forwardRef(function Transition(props, ref)
{

    return <Slide direction="up" ref={ref} {...props} />;

});
const uploadtext = '<div className="uploadtextcss"><p class="firstuploadtext">Drop your file here to start uploading</p><p class="seconduploadtext">For the most reliable operation,its best to keep your file under 1GB</p><p class="dropzonebtn">Select a file to upload</p></div>'
var ReactDOMServer = require('react-dom/server');



const DropzoneComponentSection = (props) =>
{

    const userDetail = useSelector(state => state.userDetail);

    const [fileArray, setFileArray] = useState([]);
    const [dropzone, setDropzone] = useState(null);
    const [maxfilesreached, setmaxfilesreached] = useState([]);
    const [fileprogress, setFileprogress] = useState(0);
    const [imagefiles, setImagefiles] = useState([]);
    const [fileData, setFileData] = useState({});
    // const [docFileprogress, setDocFileprogress] = useState(0);

    const [completed, setCompleted] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadingDocs, setUploadingDocs] = useState(false);
    const [doublecompletion, setDoubleCompletion] = useState(false, '');
    const [progress, setProgress] = useState(0);



    React.useEffect(() =>
    {
        const timer = setInterval(() =>
        {
            setProgress((oldProgress) =>
            {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () =>
        {
            clearInterval(timer);
        };
    }, []);




    useEffect(() =>
    {

        if (dropzone)
            dropzone.removeFile(maxfilesreached)

    }, [maxfilesreached])





    const removeFile = (fileKey) =>
    {

        const reqValues = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }

        };

        fetch(process.env.REACT_APP_apiurl + 'deletefromS3?key=' + fileKey, reqValues)
            .then(result => result.json())
            .then(result =>
            {

                __DEV && console.log(result);

                __DEV && console.log(result.result);
                if (!result.error) {

                }
            })
            .catch(err =>
            {
                __DEV && console.log(err)
            });


    }

    const sendButton = (e) =>
    {
        // props.e.preventDefault();
        props.sendButton(imagefiles);
    }

    // const docChange = (e) =>
    // {
    //     // this.showUploadingList()
    //     console.log(e.target.files[0], 'type files');
    //     setDocfileData(e.target.files[0]);

    //     let fileArray = [...imagefiles]
    //     console.log(fileArray, '123456');
    //     let newarr = fileArray.filter(x =>
    //     {
    //         return (
    //             x.name === e.target.files[0].name
    //         )
    //     })


    // }


    const docChange = (e) =>
    {
        console.log(e.target.files[0]);
        setFileData(e.target.files[0]);
        setUploading(true)

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
                setFileprogress(finalValue)

            }

        }).then(data =>
        {
            console.log(data.data, 'Dattaa');

            if (data.data.error === false) {
                setUploading(false);
                setCompleted(true);
                setTimeout(() =>
                {
                    setCompleted(false)
                }, 1000);

                let arr = [...imagefiles];
                arr.push(data.data.result[0]);
                console.log(arr);
                setImagefiles(arr);


            }
        })
    }

    return (
        <Dialog
            open={props.openAttach}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            className='attachdialogstart'
        >
            <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
                Attach Files
                <CloseIcon onClick={props.handleClose} />
            </DialogTitle>
            <DialogContent className='fileattachmentsection'>

                <div className='dropzoneattachmentsection'>
                    {fileData && fileData.name ?
                        <div>
                            <div className='forLectureVideoUpload'>
                                {/* <div className='uploadFileListing'> */}
                                <div className='uploadingStatustwo'>

                                    {uploading === true ?

                                        (
                                            <div className='uploadFileListing'>
                                                <p className="uploadFileName">{fileData.name}</p>
                                                <div className="fileUploadProgress progressUploading">
                                                    <p>Uploading</p>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={fileprogress}
                                                        className='linearProgressCls' />
                                                    <div className='uploadingbottompart'>
                                                        <p><span>{fileprogress}%</span></p>
                                                    </div>
                                                </div>

                                            </div>
                                        )

                                        : completed === true ?

                                            (
                                                <div className='uploadFileListing'>
                                                    <p className="uploadFileName">{fileData.name}</p>
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
                                            ) : imagefiles.length > 0 && imagefiles.map(x =>
                                            {
                                                return (
                                                    <div className='uploadedfilelisting'>
                                                        <img src={file} className='afterimgfile' />
                                                        <div className='fileuploadtext'>
                                                            <div className='fileuploadtooltip'>
                                                                <p className="uploadFileName uploadDocName">{x.originalname}</p>
                                                                <div class="tooltipbottom">
                                                                    <p>{x.originalname}</p>
                                                                    <i></i>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        {/* <CloseOutlined /> */}
                                                        <img src={close} onClick={() => removeFile(x.key)} />
                                                    </div>
                                                )
                                            })}
                                </div>

                                {/* </div> */}
                                {imagefiles && imagefiles.length > 0 &&
                                    <div>
                                        <div className='fileuploadbutton fileuploadbtnvdo'>
                                            <ButtonComponent
                                                buttontext='Select a file to upload'
                                                extraclass='uploadfilebtnui'
                                                active
                                            />
                                            <input
                                                type="file"
                                                accept="application/*,.csv,.xlsm,.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                                onChange={docChange}
                                            />
                                        </div>
                                    </div>}
                            </div>
                        </div>
                        : null}
                    {uploading === false && imagefiles.length === 0 ?
                        <div className='uploadVideoInput'>
                            <p className='uploadtexthead'>Select your file here to start uploading</p>
                            <p className='uploadtextsubhead'>For the most reliable operation, its best to keep your file under 1GB</p>
                            <div className='fileuploadbutton'>
                                <ButtonComponent
                                    buttontext='Select a file to upload'
                                    extraclass='uploadfilebtnui' active
                                />
                                <input
                                    type="file"
                                    accept="application/*,.csv,.xlsm,.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                    onChange={docChange}
                                />
                            </div>

                        </div> : null}
                </div>

            </DialogContent>
            <div className="fileattachmentsendsec">
                <ButtonComponent buttontext='Cancel' buttonextraclass='cancelfilebtn' handleButton={props.handleClose} />

                <ButtonComponent
                    buttontext='Send'
                    buttonextraclass='sendfilebtn'
                    active={imagefiles.length > 0 ? true : false}
                    loading={props.loading}
                    handleButton={sendButton} />
            </div>
        </Dialog>
    );

}

DropzoneComponentSection.prototype = {
    openAttach: PropTypes.bool,
    handleClose: PropTypes.func
}

export default DropzoneComponentSection;
