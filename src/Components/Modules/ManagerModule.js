import React, { useState, useEffect } from "react";
import BreadcrumbSection from '../../Common/UIComponents/BreadcrumbSection';
import MarketingList from '../Sections/MarketingList';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import UploaderForm from '../Forms/UploaderForm';
import AddManagerForm from '../Forms/AddManagerForm';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { __DEV } from "../../isDev";
import ManagerList from "../Sections/ManagerList";
import AlertComponent from "../../Common/UIComponents/AlertComponent";
import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';

const ManagerModule = (props) =>
{
    const [loading, setloading] = useState(false);
    const [marketingData, setData] = useState([]);
    const [addForm, setAddForm] = React.useState(false);
    const [tempData, setTempdata] = React.useState({});
    const [flag, setflag] = React.useState('');
    const [openAlert, setOpenAlert] = React.useState(false)
    const [deleteId, setdeleteId] = React.useState({});
    const userDetail = useSelector(state => state.userDetail);
    const [err, setErr] = useState({ showtexterr: false, texterr: false });
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });


    const [editData, setEditData] = useState({});
    const [imageData, setimageData] = useState({});
    const [file, setFile] = useState(null);
    const [editflag, setEditFlag] = useState(false);



    const [userData, setManagerData] = useState({});
    const [error, setError] = useState({});

    const [showJoinMessage, showMsg] = useState(false);
    const [emailMsg, showMail] = useState(false);


    ///////delete data recevied function///////////
    const openDelete = (data) =>
    {
        __DEV && console.log(data);
        setdeleteId(data);
        setOpenAlert(!openAlert)
    }

    const closeDelete = () =>
    {
        setOpenAlert(false)
    }
    const setMessage = () =>
    {
        setAlertMessage({ open: true, message: "Manager Added Sucessfully ", alertType: 'success' })
    }

    //////edit data recevied function //////
    const addFormCalled = (data, tempflag) =>
    {
        __DEV && console.log(data, flag);
        setTempdata(data);
        setflag(tempflag);
        setAddForm(!addForm)
    }

    const addFormClosed = () =>
    {
        setAddForm(false)
    }

    const notificationClose = () =>
    {
        setAlertMessage({ open: false })
    }

    //////// API call function for delete Manager //////
    const deleteManager = () =>
    {
        setloading(true);
        const reqValues = {
            method: "DELETE",

            headers: {
                Authorization: localStorage.getItem('auth_token'),
                "Content-Type": "application/json"
            }

        };
        __DEV && console.log(reqValues.body);
        fetch(process.env.REACT_APP_apiurl + "user/deleteManager?managerId=" + deleteId._id, reqValues)
            .then(result => result.json())
            .then(result =>
            {

                __DEV && console.log(result);
                setloading(false)
                setOpenAlert(false)
                if (!result.error) {
                    __DEV && console.log(result);
                    setAlertMessage({ open: true, message: "Manager deleted Sucessfully ", alertType: 'success' })
                    setAddForm(false)
                    // getAllManager();

                    let arr = [...marketingData];
                    let newArr = arr.filter(x => x._id !== result.result._id)
                    setData(newArr);

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



    {/*=============== Get all Manager List ===================== */ }

    useEffect(() =>
    {
        getAllManager();

    }, [localStorage.getItem('auth_token')]);

    const getAllManager = () =>
    {
        __DEV && console.log('<<API Call for get Reference list>>');

        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'user/getUserList?role=manager&resPerPage=12&page=1', reqValues)
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



    ////// for choose file /////

    const imageChange = (e) =>
    {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
        __DEV && console.log(e.target.files[0]);

        // setFileData(e.target.files[0]);

        uploadImage(e.target.files[0])
    }


    useEffect(() =>
    {
        __DEV && console.log(props.getManager);
    }, [props.getManager])





    // ///// upload image function ////
    const uploadImage = (fileData) =>
    {

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
                //  setloading({ load: true })
                if (!result.error) {
                    __DEV && console.log(result);
                    setAlertMessage({ open: true, message: "Document Uploaded Sucessfully ", alertType: 'success' })
                    setimageData(result.result);
                    setErr({

                        texterr: "",
                        showtexterr: false

                    })

                } else {

                    ///// useState for show result's err message///
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
            })

    }



    ////////// onchange finction /////////

    const handleChange = (name, value) =>
    {


        __DEV && console.log(name, value);
        setManagerData(prev =>
        {
            return {
                ...prev,
                [name]: value
            }


        });
        __DEV && console.log(userData)

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



    useEffect(() =>
    {

        __DEV && console.log(userData);
    }, [userData])


    useEffect(() =>
    {
        __DEV && console.log(props.data);
        setEditData(props.data);
    }, [props.data]);

    useEffect(() =>
    {
        __DEV && console.log(editData);
        __DEV && console.log(props.sendFlag);
        setEditFlag(props.sendFlag);
    }, [props.sendFlag]);

    //////// API call function for signup /////////

    const createManager = () =>
    {
        __DEV && console.log(editflag);
        if (flag == 'true') {
            editManager();
        }


        else {
            __DEV && console.log(userData);

            if (Object.keys(userData).find(x => userData[x] !== null)) {



                if (userData.password == userData.confirmPassword) {

                    ///////// API call from here for create user //////////
                    setloading(true)

                    const reqValues = {
                        method: "POST",
                        body: JSON.stringify({

                            name: userData.name,
                            password: userData.password,
                            email: userData.email,
                            phoneNumber: userData.phoneNumber,
                            // address: userData.address,
                            // zipCode: userData.zipcode,
                            role: 'manager',
                            profilePicture: imageData && imageData.length > 0 ? {
                                key: imageData[0].key,
                                name: imageData[0].metadata.fileName,
                                mimetype: imageData[0].metadata.mimetype
                            } :{}

                        }),
                        headers: {
                            Authorization: localStorage.getItem('auth_token'),
                            "Content-Type": "application/json"
                        }
                    };
                    __DEV && console.log(reqValues.body);
                    fetch(process.env.REACT_APP_apiurl + "user/signup", reqValues)
                        .then(result => result.json())
                        .then(result =>
                        {
                            __DEV && console.log(result);
                            setloading(false)
                            if (!result.error) {
                                __DEV && console.log(result.result);

                                var obj = result.result
                                var arr = [obj,...marketingData];
                                // var obj = result.result
                                setData(arr);
                                setFile(null)
                                setimageData(null)
                                setAlertMessage({ open: true, message: "Manager Created Sucessfully ", alertType: 'success' })
                                // props.sucessMessage();

                                addFormClosed();
                                showMsg(true)
                                setErr({ texterr: null, showtexterr: false })


                            } else {

                                ///// useState for show result's err message///
                                setErr({
                                    texterr: result.message,
                                    showtexterr: true,

                                })
                                showMail(true);
                            }
                        })
                        .catch(err =>
                        {
                            setloading(false)

                            addFormClosed();
                        })
                } else {

                    setErr({
                        texterr: "Password and Confirm Password Should be Same.",
                        showtexterr: true,

                    })


                }

            } else {

                setErr({
                    texterr: "Please fill all the required field.",
                    showtexterr: true,

                })


            }
        }
        if (setloading !== true) {
            window.scrollTo(0, 0);
        }

    };





    //////// API call function for edit manager //////
    const editManager = () =>
    {
        setloading(true)
        /////////// for image update ////////
        let profileImage = {

            key: imageData.length > 0 ? imageData[0].key : null,
            name: imageData.length > 0 ? imageData[0].metadata.fileName : null,
            mimetype: imageData.length > 0 ? imageData[0].metadata.mimetype : null
        }


        let editProfileImage = {

            key: tempData.profilePicture.key,
            name: tempData.profilePicture.name,
            mimetype: tempData.profilePicture.mimetype

        }
        /////////////////////////////////

        const reqValues = {
            method: "PUT",
            body: JSON.stringify({
                name: userData.name ? userData.name : tempData && tempData.name,
                email: userData.email ? userData.email : tempData.email,
                phoneNumber: userData.phoneNumber ? userData.phoneNumber : tempData.phoneNumber.toString(),
                // zipCode: userData.zipcode ? userData.zipcode : tempData.zipCode,
                // address: userData.address ? userData.address : tempData.address,
                profilePicture:
                    imageData.length > 0 ? profileImage : editProfileImage


            }),

            headers: {
                Authorization: localStorage.getItem('auth_token'),
                "Content-Type": "application/json"
            }

        };
        __DEV && console.log(reqValues.body);
        fetch(process.env.REACT_APP_apiurl + "user/update?userId=" + tempData._id, reqValues)
            .then(result => result.json())
            .then(result =>
            {

                __DEV && console.log(result);
                setloading(false)
                addFormClosed();
                if (!result.error) {
                    // props.getManager();
                    // props.onCloseData();
                    __DEV && console.log(result.result);

                    let data = [...marketingData];


                    __DEV && console.log(data);
                    data.map((managerDATA, i) =>
                    {

                        __DEV && console.log(managerDATA);

                        if (managerDATA._id == result.result._id) {

                            data[i] = result.result
                            __DEV && console.log(data);
                            setData(data);
                        }
                    })
                    setFile(null)


                    setAlertMessage({ open: true, message: "Manager Updated Sucessfully", alertType: 'success' })

                    setErr({

                        texterr: null,
                        showtexterr: false

                    })

                } else {
                    ///// useState for show result's err message///
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
        addFormClosed();
    }

    return (
        <div className="marketingmodulestart bgcoloradjust">
            {/* <BreadcrumbSection breadcrumbtitle="Manager" /> */}

            <ManagerList addFormCalled={addFormCalled} managerData={marketingData} deleteCalled={openDelete} />
            <Dialog className='addformdialogdiv'
                onClose={addFormCalled} aria-labelledby="simple-dialog-title" open={addForm}>
                <div>
                    <div className="addformtitle">
                    {flag == "true" ? <p>Update Manager</p> :<p>Add Manager</p>}
                        
                        <CloseIcon className="closeimg" onClick={addFormCalled} />
                    </div>

                    <AddManagerForm
                    errortext={err}
                        data={tempData}
                        //////name///////
                        onCloseData={addFormCalled}
                        onChange={handleChange}
                        onError={errorChange} error={error.textField && error.textField === "name" ? true : false}
                        errtextname={error['name']} clickLogin={createManager}
                        ////////email//////

                        onChangeEmail={handleChange}
                        onEmailError={errorChange} errEmail={error.textField && error.textField === "email" ? true : false}
                        errtextemail={error['email']} clickLoginEmail={createManager}

                        //////password//////

                        onpasswordChange={handleChange}
                        onpasswordError={errorChange} errpassword={error.textField && error.textField === "password" ? true : false}
                        errtextpassword={error['password']} clickLoginpassword={createManager}

                        //////confirmPassword//////

                        confirmPasswordChange={handleChange}
                        confirmPasswordError={errorChange} errconfirmPassword={error.textField && error.textField === "confirmPassword" ? true : false}
                        errtextconfirmPassword={error['confirmPassword']} clickconfirmPassword={createManager}

                        //////address//////

                        // addressChange={handleChange}
                        // confirmPasswordError={errorChange}
                        // erraddress={error.textField && error.textField === "address" ? true : false}
                        // errtextaddress={error['address']}
                        // clickLoginAddress={createManager}

                        //////zipcode//////

                        // zipcodeChange={handleChange}
                        // zipcodeError={errorChange}
                        // errzipcode={error.textField && error.textField === "zipcode" ? true : false}
                        // errtextzipcode={error['zipcode']}
                        // clickLoginzipcode={createManager}

                        // //////phoneNumber//////

                        onphoneNumber={handleChange}
                        errChange={errorChange}
                        phoneError={error.textField && error.textField === "phoneNumber" ? true : false}
                        phonetexterr={error['phoneNumber']}
                        phoneClick={createManager}
                        handleButton={createManager}
                        loading={loading}
                        file={file}
                        imageChange={(e) => imageChange(e)}

                    />
                </div>
            </Dialog>
            <AlertComponent alertOpen={openAlert} alertClose={closeDelete} loading={loading}
                deleteAlert alertContent='Do you really want to delete?' deleteButton={deleteManager} />
            <NotifiedMessageComponent
                messageOpen={alertMessage.open}
                notifiactionText={alertMessage.message}
                alertType={alertMessage.alertType}
                messageClose={notificationClose} />

        </div>
    );

}

export default ManagerModule;
