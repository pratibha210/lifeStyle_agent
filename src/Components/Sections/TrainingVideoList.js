import React, { useEffect, useState } from "react";
import './section.css';
import CardComponent from '../../Common/UIComponents/CardComponent'
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import SearchFieldInput from '../../Common/FormFields/SearchFieldInput';
import { useDispatch, useSelector } from 'react-redux'
import NoDataFoundComponent from "../../Common/UIComponents/NoDataFoundComponent";
import Grid from '@material-ui/core/Grid';
import TrainingCardSkeleton from "../../Common/UIComponents/TrainingCardSkeleton";
import { useHistory, NavLink } from 'react-router-dom';
import UnauthorizedSection from "../Sections/CommonSection/UnauthorizedSection";
import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';
import { __DEV } from "../../isDev";
import SelectFieldInput from "../../Common/FormFields/SelectFieldInput";
import CloseIcon from '@material-ui/icons/Close';
import { getAllCategory, addCategory } from "../../redux/action";
import AlertComponent from '../../Common/UIComponents/AlertComponent';
import UploadTrainningForm from "../Forms/UploadTrainningForm";

var moment = require('moment');

const uploadtext = '<div className="uploadtextcss"><p class="firstuploadtextdrop">Drop your file here to start uploading</p><p class="seconduploadtextdrop">For the most reliable operation,its best to keep your file under 1GB</p><p class="dropzonebtn">Select a file to upload</p></div>';
const maxFile = 1;
const maxDocFile = 3;

const TrainingVideoList = (props) =>
{
    const history = useHistory();
    const dispatch = useDispatch()
    const trainingVideos = useSelector(state => state.trainingVideos);

    const [file, setFile] = React.useState(null);
    const userDetail = useSelector(state => state.userDetail);
    const [saveVideoData, setData] = useState(null);
    const [videoData, setVideoData] = useState({});
    const [page, setPagenumber] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [spage, setSpage] = useState(1);
    const [videoFile, setVideoFile] = React.useState(null);
    const [addForm, setAddForm] = React.useState(false);
    const [loading, setloading] = useState(false);
    const [tempflag, setflag] = useState(false);
    const [tempeditData, seteditData] = useState({});
    const [trainingData, setTrainingData] = useState({});
    const [videoName, setVideoName] = React.useState(null);
    const [fileData, setFileData] = useState([]);
    const [error, setError] = useState({});
    const [categoryData, setCategoryData] = useState('');
    const [deleteId, setdeleteId] = React.useState(null);
    const [openAlert, setOpenAlert] = React.useState(false)
    const [err, setErr] = useState({ showtexterr: false, texterr: false });
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });
    const [categoryArrData, setcategoryArr] = useState([]);
    const [category, setCategory] = useState(1);
    const [maxfilesreached, setmaxfilesreached] = useState([]);
    const [maxUploadFile, setmaxuploadfile] = useState([]);
    const [dropzone, setDropzone] = useState(null);
    const categoryArr = useSelector(state => state.categoryList);
    const [documentArr, setDocumentArr] = useState([]);
    const [uploadzone, setuploadzone] = useState(null);


    useEffect(() =>
    {
        if (props.match.params.id) {
            allTrainingVideo();

        }

    }, [props])

    useEffect(() =>
    {
        dispatch(getAllCategory("training"));

    }, [localStorage.getItem('auth_token')]);

    const openDeailPage = (trainingId) =>
    {
        history.push(`/trainingdetail/${trainingId}`);
    }

    const openDelete = (trainingId) =>
    {
        setdeleteId(trainingId)
        setOpenAlert(!openAlert)
    }

    const clodeDelete = () =>
    {
        setOpenAlert(false)
    }


    const allTrainingVideo = () =>
    {
        setloading(true);
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'training/getbycategory?category=' + props.match.params.id, reqValues)
            .then(result => result.json())
            .then(result =>
            {

                __DEV && console.log(result.result);
                if (!result.error) {

                    setData(result.result)
                    setloading(false);


                }
                else {
                    setloading(false);


                }
            })
            .catch(err =>
            {
                __DEV && console.log(err)
                setloading(false);

            });


    }

    useEffect(() =>
    {

        if (Object.keys(tempeditData).length > 0) {

            if (tempeditData.videoData != null) {

                if (Object.keys(tempeditData.videoData).length > 0) {

                    setVideoData(tempeditData.videoData);

                }
            }
        }


    }, [tempeditData])


    {/* =============Pagination for marketing list=============== */ }


    const changePage = (page) =>
    {
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
                .then(result =>
                {

                    __DEV && console.log(result);

                    __DEV && console.log(result);
                    if (result.error) {
                        setData(result.result);
                    }
                    else {

                    }
                })
                .catch(err =>
                {
                    __DEV && console.log(err)
                });

        } else {

            setSpage(page);
        }
    }



    useEffect(() =>
    {

        if (searchText != '') {

            searchTraining(searchText);
        }


    }, [spage])

    // {==================Serach function start=====================}

    /////// onChange function ////////
    const onsearchChange = (e) =>
    {

        __DEV && console.log(e);

        setSearchText(e);

        if (e.length > 0) {

            searchTraining(e);

        } else {

            allTrainingVideo();

        }

    }
    const searchTraining = (data) =>
    {
        __DEV && console.log(data, 'data')
        setData(null);

        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + "training/search?category=" + props.match.params.id + "&searchString=" + data, reqValues)
            .then(result => result.json())
            .then(result =>
            {

                __DEV && console.log(result);
                if (!result.error) {

                    setData(result.result)
                }
                else {

                }
            })
            .catch(err =>
            {
                __DEV && console.log(err)
            });

    }

    const selectfunc = (x) =>
    {
        __DEV && console.log(x)
        history.push(`/trainingvideolist/${x.value}`);
    }


    const notificationClose = () =>
    {
        setAlertMessage({ open: false })
    }

    const addFormCalled = (data, flag) =>
    {

        __DEV && console.log(flag, data);
        if ('title' in data) {

            seteditData(data);
            setflag(flag);
        }


        setAddForm(!addForm)

    }

    const addFormClose = () =>
    {
        setVideoName(null);
        setFileData([]);
        seteditData({});
        setAddForm(false)


    }

    /////// onChange function ////////
    const handleChange = (name, value) =>
    {


        __DEV && console.log(name, value);
        setTrainingData(prev =>
        {
            return {
                ...prev,
                [name]: value
            }


        });
        __DEV && console.log(trainingData);

    }

    ////////// onchange finction /////////
    const errorChange = (name, value) =>
    {

        setError(prev =>
        {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    const onimageChange = (e) =>
    {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
        __DEV && console.log(e.target.files[0]);

        uploadImage(e.target.files[0])
    }

    useEffect(() =>
    {

        // console.log(tempeditData);

        if (Object.keys(tempeditData).length > 0) {

            if (tempeditData.videoData != null) {

                if (Object.keys(tempeditData.videoData).length > 0) {


                    let mockFile = {

                        name: tempeditData.videoData.name,
                        key: tempeditData.videoData.key,
                        type: 'video',
                        dataURL: tempeditData.images && tempeditData.images.length > 0 ? process.env.REACT_APP_apiurl + 'getFile?key=' + tempeditData.images.key : null


                    }

                    dropzone.files.push(mockFile);
                    dropzone.emit('addedfile', mockFile);
                    dropzone.emit('complete', mockFile);
                    dropzone.emit('thumbnail', mockFile, mockFile.dataURL);
                }
            }

        }

    }, [dropzone])

    useEffect(() =>
    {

        if (uploadzone)
            uploadzone.removeFile(maxUploadFile)

    }, [maxUploadFile])


    useEffect(() =>
    {

        if (Object.keys(tempeditData).length > 0) {

            if (tempeditData.documents != null) {

                if (tempeditData.documents.length > 0) {

                    let documents = tempeditData.documents.map((x, idx) =>
                    {
                        return {
                            name: x.name,
                            type: x.mimetype,
                            key: x.key,
                            dataURL: tempeditData.documents && Object.keys(tempeditData.documents).length > 0 ? process.env.REACT_APP_apiurl + 'getFile?key=' + x.key : null
                        };
                    });

                    documents.map(mockFile =>
                    {
                        uploadzone.files.push(mockFile);
                        uploadzone.emit('addedfile', mockFile);
                        uploadzone.emit('thumbnail', mockFile, mockFile.dataURL);
                        uploadzone.emit('complete', mockFile);
                    });
                }
            }


        }



    }, [uploadzone])

    // ///// upload image function ////
    const uploadImage = (fileData) =>
    {

        setloading(true);

        const formData = new FormData();
        formData.append('file', fileData);

        const config = {
            method: "POST",
            body: formData
        };

        fetch(process.env.REACT_APP_apiurl + "fileupload?entityId=" + userDetail._id, config)
            .then(result => result.json())
            .then(result =>
            {
                __DEV && console.log(result);
                setloading(false);

                if (!result.error) {
                    __DEV && console.log(result);
                    // setAlertMessage({ open: true, message: "File uploaded Sucessfully", alertType: 'success' })


                    // if (params == 'videoFile') {

                    //     setVideoData(result.result);
                    //     setAlertMessage({ open: true, message: "Video uploaded Sucessfully", alertType: 'success' })

                    // } else {

                    setFileData(result.result);
                    setAlertMessage({ open: true, message: "File uploaded Sucessfully", alertType: 'success' })

                    // }
                    setErr({

                        texterr: "",
                        showtexterr: false

                    })

                } else {

                    /// useState for show result's err message///
                    let data = {
                        message: "no data found!!"
                    }
                    setErr({

                        texterr: data.message,
                        showtexterr: true,

                    })
                }
            })
            .catch(err =>
            {
                __DEV && console.log(err);
                setloading(false);
            })

    }

    {/*================== API call for edit store content ====================== */ }
    const editTrainingVideo = () =>
    {

        // console.log(tempeditData);

        let data = {
            title: trainingData ? trainingData.title : tempeditData && tempeditData.title,
            index: trainingData ? parseInt(trainingData.index) : tempeditData.index,
            vimeoLink: trainingData ? trainingData.vimeoLink : tempeditData.vimeoLink,
            category: categoryData ? categoryData : tempeditData.category,
            description: trainingData ? trainingData.description : tempeditData && tempeditData.description,
            images: {
                key: fileData && fileData.length > 0 ? fileData[0].key : tempeditData && tempeditData.images.key,
                name: fileData && fileData.length > 0 ? fileData[0].fileName : tempeditData && tempeditData.images.name,
                mimetype: fileData && fileData.length > 0 ? fileData[0].metadata.mimetype : tempeditData && tempeditData.images.mimetype
            },
            documents: documentArr
        }
        if (videoData && Object.keys(videoData).length > 0) {
            data.videoData = {

                key: videoData && Object.keys(videoData).length > 0 && videoData[0].key,
                name: videoData && Object.keys(videoData).length > 0 && videoData[0].metadata.fileName,
                mimetype: videoData && Object.keys(videoData).length > 0 && videoData[0].metadata.mimetype
            }
        }

        if (categoryData && categoryData !== tempeditData.category) {
            data.category = categoryData;
        }


        const reqValues = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: localStorage.getItem('auth_token'),
                "Content-Type": "application/json"
            }

        };
        __DEV && console.log(reqValues.body);
        setloading(true)
        fetch(process.env.REACT_APP_apiurl + "training/update?trainingId=" + tempeditData._id + "&documentId=" + tempeditData.images._id, reqValues)
            .then(result => result.json())
            .then(result =>
            {

                __DEV && console.log(result);
                setloading(false)
                if (!result.error) {
                    __DEV && console.log(result.result);
                    setAlertMessage({ open: true, message: "Training updated Sucessfully...", alertType: 'success' });
                    setAddForm(false);
                    seteditData({});
                    setFileData([]);
                    setVideoName(null);


                    allTrainingVideo();

                    setErr({

                        texterr: null,
                        showtexterr: false

                    })

                } else {
                    ///// useState for show result's err message///
                    setAlertMessage({ open: true, message: "Something went wrong... Please try again.", alertType: 'error' });
                    setErr({

                        texterr: 'Something Went Wrong!!',
                        showtexterr: true

                    })

                }
            })
            .catch(err =>
            {
                setloading(false)
                ///// useState for show  err message///
                setErr({

                    texterr: "Network Error",
                    showtexterr: true

                })
                __DEV && console.log(err)
            });
    }

    const createCatgory = (data) =>
    {

        __DEV && console.log(categoryData, data);

        dispatch(addCategory(data, "training"));


    };

    /////// select category function ////////////

    const selectcategory = (data) =>
    {
        __DEV && console.log(data);

        if (data !== null) {
            if (data !== null && data.__isNew__ == true) {


                setCategoryData(data.value);
                createCatgory(data.value);

            }
            else {

                setCategoryData(data.value);
                // createCatgory();

            }
        }

        else {
            setCategoryData('');
        }
    }

    {/*==================== API for Add Training video======================== */ }
    const addTraining = () =>
    {

        if (tempflag) {

            editTrainingVideo();

        }
        else {
            __DEV && console.log(categoryData);
            if (Object.keys(trainingData).find(x => trainingData[x] !== null) && fileData && fileData.length > 0 && videoData && videoData.length > 0) {

                console.log(categoryData);
                setloading(true)
                const reqValues = {
                    method: "POST",
                    body: JSON.stringify({
                        title: trainingData.title,
                        category: categoryData,
                        description: trainingData.description,
                        index: parseInt(trainingData.index),
                        vimeoLink: trainingData.vimeoLink,
                        images: {
                            key: fileData[0].key,
                            name: fileData[0].metadata.fileName,
                            mimetype: fileData[0].metadata.mimetype
                        },
                        videoData: {

                            key: videoData[0].key,
                            name: videoData[0].metadata.fileName,
                            mimetype: videoData[0].metadata.mimetype
                        },
                        documents: documentArr
                    }),
                    headers: {
                        Authorization: localStorage.getItem('auth_token'),
                        "Content-Type": "application/json"
                    }

                };
                __DEV && console.log(reqValues.body);
                fetch(process.env.REACT_APP_apiurl + "training/add", reqValues)
                    .then(result => result.json())
                    .then(result =>
                    {
                        __DEV && console.log(result);
                        setloading(false)
                        if (!result.error) {
                            __DEV && console.log(result.result);
                            setAddForm(false)
                            setFileData([]);
                            setVideoName(null);
                            setErr({

                                texterr: null,
                                showtexterr: false

                            })
                            let arr = [...saveVideoData];
                            let index = arr.findIndex(x => x._id === result.result.category)
                            if (index > -1) {
                                arr[index].training.push(result.result);
                            }
                            else {
                                arr.push({ _id: result.result.category, training: [result.result] })
                            }
                            setData(arr);

                        } else {

                            setErr({

                                texterr: 'Something Went Wrong!!',
                                showtexterr: true

                            })

                        }
                    })
                    .catch(err =>
                    {
                        setloading(false)
                        ///// useState for show  err message///
                        setErr({

                            texterr: "Network Error",
                            showtexterr: true

                        })
                        __DEV && console.log(err)
                    });
            } else {

                ///// useState for show  err message///
                setErr({

                    texterr: "Please Fill All The Fields",
                    showtexterr: true

                })
            }

        }

    };

    ////// for button disabled true/false/////
    const disableChange = () =>
    {
        __DEV && console.log(error)
        if (Object.keys(error).find(x => error[x] !== null)) {
            return true;
        }

        return false;
    }

    const handleVideoChange = (e) =>
    {
        console.log(e, 'ERERERERERR');
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        setVideoFile(URL.createObjectURL(e.target.files[0]));
        __DEV && console.log(e.target.files[0]);
        setVideoName(e.target.files[0]);
        uploadImage(e.target.files[0])
    }


    //////// API call function for delete Manager //////
    const deleteTraining = () =>
    {
        __DEV && console.log(deleteId);
        setloading(true);
        const reqValues = {
            method: "DELETE",

            headers: {
                Authorization: localStorage.getItem('auth_token'),
                "Content-Type": "application/json"
            }

        };
        __DEV && console.log(reqValues.body);
        fetch(process.env.REACT_APP_apiurl + "training/delete?trainingId=" + deleteId, reqValues)
            .then(result => result.json())
            .then(result =>
            {

                __DEV && console.log(result);
                setloading(false)
                setOpenAlert(false)
                if (!result.error) {
                    __DEV && console.log(result);
                    setAlertMessage({ open: true, message: "Training deleted Sucessfully ", alertType: 'success' })
                    setAddForm(false);

                    allTrainingVideo();

                    setErr({

                        texterr: null,
                        showtexterr: false

                    })

                } else {
                    ///// useState for show result's err message///

                    setAlertMessage({ open: true, message: "Something went wrong !!", alertType: 'error' })

                }
            })
            .catch(err =>
            {
                setloading(false)
                setOpenAlert(false)
                ///// useState for show  err message///
                setErr({

                    texterr: "Network Error",
                    showtexterr: true

                })
                __DEV && console.log(err)
            });

    }

    useEffect(() =>
    {

        if (categoryArr.length > 0) {
            let arr = [...categoryArr];
            arr.map(x =>
            {
                x.label = x.name;
                x.value = x.name
            })
            setcategoryArr(arr);
        }
    }, [!addForm]);

    useEffect(() =>
    {

        if (dropzone)
            dropzone.removeFile(maxfilesreached)

    }, [maxfilesreached])
    var FiledjsConfig = {
        // errormessage:false
        maxFiles: 1,
        maxFileSize: 1000,
        addRemoveLinks: true,
        acceptedFiles: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        autoProcessQueue: true,
        dictDefaultMessage: uploadtext,
        maxFiles: maxFile,
    }
    var djsConfig = {
        // errormessage:false
        maxFiles: 1,
        maxFileSize: 1000,
        addRemoveLinks: true,
        acceptedFiles: "video/mp4,video/x-m4v,video/*",
        autoProcessQueue: true,
        dictDefaultMessage: uploadtext,
        maxFiles: maxFile,
    }
    var componentConfig = {

        maxFiles: 1,
        maxFileSize: 1000,
        iconFiletypes: ['.jpg', '.png', '.gif', '.pdf', '.docx', '.xlsx'],
        showFiletypeIcon: false,
        postUrl: process.env.REACT_APP_apiurl + "fileupload?entityId=" + userDetail._id,
        acceptedFiles: "video/mp4,video/x-m4v,video/*"
    };


    var uploadDjsconfig = {

        maxFiles: 3,
        addRemoveLinks: true,
        acceptedFiles: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf",
        autoProcessQueue: true,
        dictDefaultMessage: uploadtext,
        maxFiles: maxDocFile,


    }

    var uploadConfig = {

        maxFiles: 3,
        iconFiletypes: ['.jpg', '.png', '.gif', '.pdf', '.docx', '.xlsx'],
        showFiletypeIcon: false,
        postUrl: process.env.REACT_APP_apiurl + "fileupload?entityId=" + userDetail._id,
        acceptedFiles: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf",


    };


    const eventHandlers = {
        init: dz =>
        {
            setDropzone(dz);
            __DEV && console.log('dropzone', dz);

        },
        error: (e) =>
        {
            __DEV && console.log(e, "error occured!");
        },
        success: (file) =>
        {

            __DEV && console.log(JSON.parse(file.xhr.response));
            let response = JSON.parse(file.xhr.response);
            if (!file.xhr.response.error) {
                setAlertMessage({ open: true, message: "Video uploaded Sucessfully", alertType: 'success' })

            }

            setVideoData(response.result);

        },

        addedfile: (file) => { console.log(file) },
        maxfilesreached: (e) => { console.log(e, "max file limit reached!") },
        maxfilesexceeded: (e) =>
        {
            setmaxfilesreached(e);
            __DEV && console.log(e, "max file limit exceeded!")
        },
        removedfile: (file) =>
        {

            if (file.xhr) {
                let response = JSON.parse(file.xhr.response);
                setVideoData(response.result[0].key);
                removeFile(response.result[0].key);
            } else {

                setVideoData({});
                if (Object.keys(videoData).length == 0 < maxFile) {
                    dropzone.enable();
                }

            }

        },
        thumbnail: (file, type) =>
        {
            __DEV && console.log(file, type)

        },


    }

    useEffect(() =>
    {

        __DEV && console.log(documentArr);

    }, [documentArr])


    const uploadEventHandlers = {

        init: dz =>
        {
            setuploadzone(dz);
            __DEV && console.log('dropzone', dz);

        },
        error: (e) =>
        {
            __DEV && console.log(e, "error occured!");
        },
        success: (file) =>
        {

            __DEV && console.log(JSON.parse(file.xhr.response));
            let response = JSON.parse(file.xhr.response);

            if (!file.xhr.response.error) {

                setAlertMessage({ open: true, message: "Documents uploaded Sucessfully", alertType: 'success' })

            }


            if (documentArr.length > maxFile) {
                uploadzone.disable();
            }
            let data = {

                key: response.result[0].key,
                name: response.result[0].metadata.fileName,
                mimetype: response.result[0].metadata.mimetype
            }

            __DEV && console.log(data);

            setDocumentArr(documentArr => [...documentArr, data]);

        },

        addedfile: (file) => { console.log("added file", file) },
        maxfilesreached: (e) => { console.log(e, "max file limit reached!") },

        maxfilesexceeded: (e) =>
        {
            setmaxuploadfile(e);
            __DEV && console.log(e, "max file limit exceeded!")
        },

        removedfile: (file) =>
        {

            console.log(file);

            // if(file.xhr){

            //     __DEV && console.log(JSON.parse(file.xhr.response));
            //     let response = JSON.parse(file.xhr.response);
            //     setDocumentArr(documentArr => documentArr.filter(x => x.key === response.result[0].key))
            //     removeDocs(response.result[0].key);
            // }else{

            //     setDocumentArr([]);
            //     if(documentArr.length == 0 < maxFile){

            //         uploadzone.enable();
            //     }
            // }


        },
        thumbnail: (file, type) =>
        {
            __DEV && console.log(file, type)

        },
    }

    const removeDocs = (docKey) =>
    {

        const reqValues = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }

        };

        fetch(process.env.REACT_APP_apiurl + 'deletefromS3?key=' + docKey, reqValues)
            .then(result => result.json())
            .then(result =>
            {

                __DEV && console.log(result);

                __DEV && console.log(result.result);
                if (!result.error) {
                    setDocumentArr(documentArr => [...documentArr, result.result]);
                    uploadzone.enable();


                }
            })
            .catch(err =>
            {
                __DEV && console.log(err)
            });


    }

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

                    dropzone.enable();
                }
            })
            .catch(err =>
            {
                __DEV && console.log(err)
            });


    }

    const videoUploadedData = (data) =>
    {
        console.log(data, '1215478');
    }




    return (
        <div className="trainingVideoSec tainingallvdosec" >

            <div className="marketingtitlesec trainingTitleArea">

                <p >{props.match.params.id}</p>

                <div className="listtopheader">
                    <SelectFieldInput
                        slelectOptions={categoryArr.map(x => { return { label: x.name, value: x.name } })}
                        onChange={selectfunc} value={props.match.params.id} />


                    <SearchFieldInput onChange={onsearchChange} />
                </div>

            </div>

            <hr className="borderline" />
            <div className={"traningVideos"}>
                {localStorage.getItem('auth_token') ?
                    <Grid container spacing={2}>
                        {saveVideoData && saveVideoData.length > 0 ? saveVideoData.map(x =>
                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                <CardComponent
                                    cardClick={() => x.transcoded == 1 ? openDeailPage(x._id) : setAlertMessage({ open: true, message: "Video transcoding is in progess.Kindly wait for status to be - PROCESSED", alertType: 'error' })}
                                    cardImg={x.images ? process.env.REACT_APP_apiurl + 'getFile?key=' + x.images.key : null}
                                    options={userDetail.role != 'agent' ? true : false}
                                    cardHeading={x.title}
                                    cardDetl={x.description}
                                    videoDate={moment(x.createdDate).format("MMMM Do YYYY")}
                                    editOptionCalled={() => addFormCalled(x)}
                                    deleteCalled={() => openDelete(x._id)}
                                    queued={userDetail.role != 'agent' ? x.transcoded == 2 : false}
                                    Processing={userDetail.role != 'agent' ? x.transcoded == 0 : false}
                                    Processed={userDetail.role != 'agent' ? x.transcoded == 1 : false}
                                    category='Category'
                                    files={x.documents}
                                />
                            </Grid>
                        )
                            : (saveVideoData && saveVideoData.length == 0 && !loading) ? <NoDataFoundComponent /> :
                                (<Grid item lg={4} md={6} sm={6} xs={12}>
                                    <TrainingCardSkeleton extraCls="traningskeleton" />
                                </Grid>)
                        }

                        {/* <Grid item md={4} xs={12}>
                      <TrainingCardSkeleton extraCls="traningskeleton" />
                      </Grid>
                    */}
                    </Grid>
                    :

                    <UnauthorizedSection />
                }
            </div>

            <Dialog className='addformdialogdiv xtraclforvdosec'
                onClose={addFormCalled} aria-labelledby="simple-dialog-title" open={addForm}>
                <div>
                    <div className="addformtitle">
                        <p>{Object.keys(tempeditData).length > 0 ? "Add Videos" : "Update Videos"}</p>
                        <CloseIcon className="closeimg" onClick={addFormCalled} />
                    </div>
                    <UploadTrainningForm
                        componentConfig={componentConfig}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig}
                        djsConfig={FiledjsConfig}
                        onClose={addFormClose}
                        onChange={handleChange}
                        taOnChange={handleChange}
                        onError={errorChange}
                        taOnError={errorChange}
                        error={error.textField && error.textField === "title" ? true : false}
                        taError={error.textField && error.textField === "description" ? true : false}
                        indexerr={error.textField && error.textField === "index" ? true : false}
                        linkError={error.textField && error.textField === "vimeoLink" ? true : false}
                        errorText={error['title']} taErrorText={error['description']}
                        indextexterr={error['index']}
                        linkErrorText={error['vimeoLink']}
                        linkValue={tempeditData.vimeoLink}
                        linkOnChange={handleChange}
                        linkOnError={errorChange}
                        onerrorChange={errorChange}
                        indexhandle={handleChange}
                        errorMessage={err.showtexterr}
                        errmessage={err.texterr}
                        imageChange={(e) => onimageChange(e)}
                        handleButton={Object.keys(tempeditData).length > 0 ? editTrainingVideo : addTraining}
                        file={file}
                        loading={loading}
                        clickLogin={addTraining}

                        disabled={videoData && Object.keys(videoData).length > 0 ? true : tempeditData.videoData && Object.keys(tempeditData.videoData).length > 0 ? true : false}
                        inactive={disableChange}
                        // videoChange={(e) => onimageChange(e)}
                        video
                        selectfunc={selectcategory}
                        tempcategory={tempeditData.category}
                        categoryArray={categoryArrData}
                        category extracls='forcategoryfield'
                        desValue={tempeditData.description}
                        titleValue={tempeditData.title}
                        uploadVideo={videoData ? videoData : tempeditData.videoData}
                        uploadFile={fileData && fileData.length > 0 ? fileData : tempeditData.images}
                        videoName={Object.keys(tempeditData).length > 0 && videoName == null ? tempeditData.videoData : videoName}
                        trainingvimeo={trainingData.vimeoLink || tempeditData.vimeoLink}
                        imageData={Object.keys(tempeditData).length > 0 && (fileData.length == 0) ? tempeditData.images : fileData}
                        uploadConfig={uploadConfig}
                        uploadEventHandlers={uploadEventHandlers}
                        uploadDjsconfig={uploadDjsconfig}

                        uploadedData={videoUploadedData}
                    />

                </div>
            </Dialog>
            <AlertComponent alertOpen={openAlert}
                alertClose={clodeDelete}
                deleteAlert
                alertContent='Do you really want to delete?'
                deleteButton={deleteTraining}
                loading={loading} />
            {/* <GlobalPagination total={10} pageChange={changePage} /> */}
            <NotifiedMessageComponent
                messageOpen={alertMessage.open}
                notifiactionText={alertMessage.message}
                messageClose={notificationClose}
                alertType={alertMessage.alertType} />
        </div>
    );

}

TrainingVideoList.propTypes = {

    addFormCalled: PropTypes.func,

};
export default TrainingVideoList;
