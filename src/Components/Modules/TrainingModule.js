import React, { useState, useEffect } from 'react';
import TrainingVideoSection from '../Sections/TrainingVideoSection';
import BreadcrumbSection from '../../Common/UIComponents/BreadcrumbSection';
import UploaderForm from '../Forms/UploaderForm';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { __DEV } from "../../isDev";
import { useHistory, NavLink } from 'react-router-dom';
import AlertComponent from '../../Common/UIComponents/AlertComponent';
import TrainingCardSkeleton from '../../Common/UIComponents/TrainingCardSkeleton';
import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';
import { getAllCategory, addCategory } from "../../redux/action";
import TrainingVideoList from '../Sections/TrainingVideoList';
import UploadTrainningForm from '../Forms/UploadTrainningForm';
import 'dropzone/dist/min/dropzone.min.css';
import 'react-dropzone-component/styles/filepicker.css';



const TrainingModule = (props) =>
{


    const dispatch = useDispatch()
    const history = useHistory()
    const [addForm, setAddForm] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [err, setErr] = useState({ showtexterr: false, texterr: false });
    const [videoName, setVideoName] = React.useState(null);

    const [fileData, setFileData] = useState([]);
    const [trainingData, setTrainingData] = useState({});
    const [loading, setloading] = useState(false);
    const [error, setError] = useState({});
    const [deleteId, setdeleteId] = React.useState(null);
    const [openAlert, setOpenAlert] = React.useState(false)
    const [getTrainingVideos, getVideoData] = useState([]);
    const [tempeditData, seteditData] = useState({});
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });
    const [maxfilesreached, setmaxfilesreached] = useState([]);
    const [maxUploadFile, setmaxuploadfile] = useState([]);

    const [categoryData, setCategory] = useState('');
    const [tempflag, setflag] = useState('false');

    const [categoryArrData, setcategoryArr] = useState([]);
    const categoryArr = useSelector(state => state.categoryList);
    const [fileObject, setFileObject] = useState({});
    const [documentArr, setDocumentArr] = useState([]);
    const [dropzone, setDropzone] = useState(null);
    const [uploadzone, setuploadzone] = useState(null);

    const userDetail = useSelector(state => state.userDetail);

    const openDelete = (trainingId) =>
    {
        setdeleteId(trainingId)
        setOpenAlert(!openAlert)
    }

    const clodeDelete = () =>
    {
        setOpenAlert(false)
    }

    const addFormCalled = (data, flag) =>
    {

        if ('title' in data) {

            seteditData(data);
            setflag(flag);
        }


        setAddForm(!addForm)

    }

    useEffect(() =>
    {

        if (!addForm) {

            setVideoName(null);
            setFileData([]);
            seteditData({});
        }


    }, [addForm])


    const addFormClose = () =>
    {

        setVideoName(null);
        setFileData([]);
        seteditData({});
        setAddForm(false)


    }

    useEffect(() =>
    {

        if (dropzone)
            dropzone.removeFile(maxfilesreached)

    }, [maxfilesreached])

    useEffect(() =>
    {

        if (uploadzone)
            uploadzone.removeFile(maxUploadFile)

    }, [maxUploadFile])



    const onimageChange = (e) =>
    {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
        __DEV && console.log(e.target.files[0]);

        uploadImage(e.target.files[0], 'imageFile')
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

    ////// for button disabled true/false/////
    const disableChange = () =>
    {
        __DEV && console.log(error)
        if (Object.keys(error).find(x => error[x] !== null)) {
            return true;
        }

        return false;
    }


    // ///// upload image function ////
    const uploadImage = (fileData, params) =>
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


                    setFileData(result.result);
                    setAlertMessage({ open: true, message: "File uploaded Sucessfully", alertType: 'success' })


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
    ///////////DropZone function start form here/////////////







    useEffect(() =>
    {
        __DEV && console.log(documentArr);

    }, [documentArr])






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

    /////// select category function ////////////

    const selectcategory = (data) =>
    {
        __DEV && console.log(data);

        // setCategory(data.name);
        if (data !== null) {
            if (data !== null && data.__isNew__ == true) {


                setCategory(data.value);
                createCatgory(data.value);

            }
            else {

                setCategory(data.value);
                // createCatgory();

            }
        }

        else {
            setCategory('');
        }
    }


    useEffect(() =>
    {
        __DEV && console.log(categoryData);

    }, [categoryData])

    // const addCategoryFunc = (data) => {
    //     __DEV && console.log(data);
    //     if (data !== null) {
    //         setCategory(data);
    //     }
    //     // else {
    //     //     setCategory('');
    //     // }
    // }
    ///////////////////////////////////////////////

    useEffect(() =>
    {
        dispatch(getAllCategory("training"));

    }, [localStorage.getItem('auth_token')]);



    const createCatgory = (data) =>
    {

        __DEV && console.log(categoryData, data);

        dispatch(addCategory(data, "training"));


    };
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



    {/*==================== API for Add Training video======================== */ }
    const addTraining = () =>
    {

        if (tempflag === true) {

            editTrainingVideo();

        }
        else {
            __DEV && console.log(categoryData);
            if (Object.keys(trainingData).find(x => trainingData[x] !== null)) {


                __DEV && console.log(categoryData);
                setloading(true)
                const reqValues = {
                    method: "POST",
                    body: JSON.stringify({
                        title: trainingData.title,
                        category: categoryData,
                        index: parseInt(trainingData.index),
                        vimeoLink: trainingData.vimeoLink,
                        description: trainingData.description,
                        images: {
                            key: fileData && fileData.length > 0 && fileData[0].key,
                            name: fileData && fileData.length > 0 && fileData[0].metadata.fileName,
                            mimetype: fileData && fileData.length > 0 && fileData[0].metadata.mimetype
                        },
                        videoData: {

                            key: fileObject && fileObject.key,
                            name: fileObject && fileObject.originalname,
                            mimetype: fileObject && fileObject.mimetype
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
                            setFileObject({});
                            setFileData([]);
                            setVideoName(null);
                            setAlertMessage({ open: true, message: "Training uploaded Sucessfully...", alertType: 'success' })
                            setErr({

                                texterr: null,
                                showtexterr: false

                            })
                            // let arr = [...getTrainingVideos];
                            // let index = arr.findIndex(x => x.name === result.result.category)
                            // if (index > -1) {
                            //     arr[index].trainings.push(result.result);
                            // }
                            // else {
                            //     arr.push({ name: categoryData, trainings: [result.result] })
                            // }
                            // getVideoData(arr);

                            getTrainingAllCategories();

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


    useEffect(() =>
    {


        if (Object.keys(tempeditData).length > 0) {

            if (tempeditData.videoData != null) {

                if (Object.keys(tempeditData.videoData).length > 0) {


                    let mockFile = {

                        name: tempeditData.videoData.name,
                        key: tempeditData.videoData.key,
                        type: 'video',
                        dataURL: tempeditData.images && Object.keys(tempeditData.images).length > 0 ? process.env.REACT_APP_apiurl + 'getFile?key=' + tempeditData.images.key : null


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


    useEffect(() =>
    {

        if (Object.keys(tempeditData).length > 0) {

            if (tempeditData.videoData != null) {

                if (Object.keys(tempeditData.videoData).length > 0) {

                    setFileObject(tempeditData.videoData);

                }
            }
        }


    }, [tempeditData])




    {/*================== API call for edit store content ====================== */ }
    const editTrainingVideo = () =>
    {


        let data = {
            index: trainingData ? parseInt(trainingData.index) : tempeditData.index,
            vimeoLink: trainingData ? trainingData.vimeoLink : tempeditData.vimeoLink,
            title: trainingData ? trainingData.title : tempeditData && tempeditData.title,
            description: trainingData ? trainingData.description : tempeditData && tempeditData.description,
            images: {
                key: fileData && fileData.length > 0 ? fileData[0].key : tempeditData && tempeditData.images.key,
                name: fileData && fileData.length > 0 ? fileData[0].fileName : tempeditData && tempeditData.images.name,
                mimetype: fileData && fileData.length > 0 ? fileData[0].metadata.mimetype : tempeditData && tempeditData.images.mimetype
            },
            documents: documentArr

        }
        if (fileObject && Object.keys(fileObject).length > 0) {
            data.videoData = {

                key: fileObject && Object.keys(fileObject).length > 0 && fileObject.key,
                name: fileObject && Object.keys(fileObject).length > 0 && fileObject.name,
                mimetype: fileObject && Object.keys(fileObject).length > 0 && fileObject.mimetype
            }
        }


        if ((categoryData && categoryData !== tempeditData.category) || trainingData.index) {
            data.category = categoryData || tempeditData.category;
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
                    let oldIndex = -1;
                    let arr = [...getTrainingVideos];
                    let index = arr.findIndex(x => x.name === categoryData)
                    // Checking if category got updated
                    if (tempeditData.category !== categoryData) {
                        oldIndex = arr.findIndex(x => x.name === tempeditData.category)
                    }

                    __DEV && console.log(index, oldIndex, arr[oldIndex], arr[index], categoryData, tempeditData.category, "l11")
                    // if category was updated removing training video from old category
                    if (oldIndex > -1) {
                        let newArr = arr[oldIndex].trainings.filter(x => x._id !== result.result._id)
                        arr[oldIndex].trainings = newArr;
                    }

                    // if category is in list, update the training
                    if (index > -1) {
                        let trainingIndex = arr[index].trainings.findIndex(x => x._id === result.result._id)

                        if (trainingIndex > -1) // if category has the video, update the video
                            arr[index].trainings[trainingIndex] = result.result;
                        else // else add the video to the category
                            arr[index].trainings.push(result.result);
                    }
                    else { // if the category is not in list and has been added now, add the category plus the video to the list
                        arr.push({ name: result.result.category, trainings: [result.result] })
                    }

                    getVideoData(arr);

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

    {/* ============ Get all the training Videos ================ */ }

    useEffect(() =>
    {

        getTrainingAllCategories();


    }, [localStorage.getItem('auth_token')]);

    const getTrainingAllCategories = () =>
    {

        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'training/getallcategories', reqValues)
            .then(result => result.json())
            .then(result =>
            {

                __DEV && console.log("486", result);
                if (!result.error) {
                    getVideoData(result.result)
                }
                else {

                    getVideoData([]);

                }
            })
            .catch(err =>
            {
                __DEV && console.log(err)
            });

    }

    const notificationClose = () =>
    {
        setAlertMessage({ open: false })
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

                    // let arr = [...getTrainingVideos];
                    // let index = arr.findIndex(x => x.name === result.result.category)
                    // let newArr = arr[index].trainings.filter(x => x._id !== result.result._id)
                    // arr[index].trainings = newArr;
                    // getVideoData(arr);
                    getTrainingAllCategories();

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

    const viewAllVideo = (category) =>
    {


        history.push(`/trainingvideolist/${category}`);
    }

    const videoUploadedData = (data) =>
    {
        console.log(data);
        setFileObject(data)
    }

    const getDocumentsArray = (data) =>
    {
        console.log(data);
        setDocumentArr(data);
    }



    return (
        <div className="trainingModule bgcoloradjust">
            {/* <BreadcrumbSection breadcrumbtitle="Training" /> */}

            <TrainingVideoSection addFormCalled={addFormCalled} addOpen={addForm} deleteCalled={openDelete} videos={getTrainingVideos} viewAllVideo={viewAllVideo} />
            <Dialog className='addformdialogdiv xtraclforvdosec'
                onClose={addFormCalled} aria-labelledby="simple-dialog-title" open={addForm}>
                <div>
                    <div className="addformtitle">
                        <p>{tempflag ? "Update Videos" : "Add Videos"}</p>
                        <CloseIcon className="closeimg" onClick={addFormCalled} />
                    </div>
                    <UploadTrainningForm
                        fileObject={fileObject}
                        // componentConfig={componentConfig}
                        // eventHandlers={eventHandlers}
                        // djsConfig={djsConfig}
                        onClose={addFormClose}
                        onChange={handleChange}
                        taOnChange={handleChange}
                        onError={errorChange}
                        taOnError={errorChange}
                        indexerr={error.textField && error.textField === "index" ? true : false}
                        linkError={error.textField && error.textField === "vimeoLink" ? true : false}
                        error={error.textField && error.textField === "title" ? true : false}
                        taError={error.textField && error.textField === "description" ? true : false}
                        errorText={error['title']} taErrorText={error['description']}
                        indextexterr={error['index']}
                        linkErrorText={error['vimeoLink']}
                        linkValue={tempeditData.vimeoLink}
                        onerrorChange={errorChange} linkOnError={errorChange}
                        linkOnChange={handleChange}
                        indexhandle={handleChange}
                        errorMessage={err.showtexterr}
                        errmessage={err.texterr}
                        imageChange={(e) => onimageChange(e)}
                        handleButton={Object.keys(tempeditData).length > 0 ? editTrainingVideo : addTraining}
                        file={file} loading={loading}
                        clickLogin={addTraining}
                        disabled={fileObject && Object.keys(fileObject).length > 0 ? true : tempeditData.videoData && Object.keys(tempeditData.videoData).length > 0 ? true : false}
                        inactive={disableChange}
                        selectfunc={selectcategory}
                        tempcategory={tempeditData.category}
                        categoryArray={categoryArrData}
                        category extracls='forcategoryfield'
                        desValue={tempeditData.description}
                        titleValue={tempeditData.title}
                        uploadVideo={fileObject ? fileObject : tempeditData.videoData}
                        uploadFile={fileData && fileData.length > 0 ? fileData : tempeditData.images}
                        videoName={Object.keys(tempeditData).length > 0 && videoName == null ? tempeditData.videoData : videoName}
                        trainingvimeo={trainingData.vimeoLink || tempeditData.vimeoLink}
                        imageData={Object.keys(tempeditData).length > 0 && (fileData.length == 0) ? tempeditData.images : fileData}
                        // uploadConfig={uploadConfig}
                        // uploadEventHandlers={uploadEventHandlers}
                        // uploadDjsconfig={uploadDjsconfig}

                        documents={getDocumentsArray}

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
            <NotifiedMessageComponent
                messageOpen={alertMessage.open}
                notifiactionText={alertMessage.message}
                messageClose={notificationClose}
                alertType={alertMessage.alertType} />
        </div>
    );

}

export default TrainingModule;

    //////////////////////////////////////////////////////////


    // const linkHandleNewfunc =()=>{

    //     if(fileObject && fileObject.length >0 ){
    //        console.log('no edit option')
    //     }
    //     else{
    //         handleChange();
    //     }
    // }
