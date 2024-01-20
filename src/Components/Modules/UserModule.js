import React, { useState, useEffect } from "react";
import BreadcrumbSection from '../../Common/UIComponents/BreadcrumbSection';
import MarketingList from '../Sections/MarketingList';
import UserList from "../Sections/UserList";
import AddManagerForm from '../Forms/AddManagerForm';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import { __DEV } from "../../isDev";
import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';
import { useDispatch, useSelector } from 'react-redux';

const UserModule = (props) => {
    const [addForm, setAddForm] = React.useState(false);
    const [flag, setflag] = React.useState('');
    const [userData, setData] = useState([]);
    const [loading, setloading] = useState(false);
    const [adduserData, setuserData] = useState({});
    const [error, setError] = useState({});
    const [file, setFile] = useState(null);
    const [imageData, setimageData] = useState({});
    const userDetail = useSelector(state => state.userDetail);
    const [err, setErr] = useState({ showtexterr: false, texterr: null });
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });
    const [showJoinMessage, showMsg] = useState(false);
    const [emailMsg, showMail] = useState(false);
    const [tempData, setTempdata] = useState(null);

    const addFormCalled = (data, tempflag) =>
    {
        __DEV && console.log(data, tempflag);
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



    useEffect(() => {
        userList();

    },[localStorage.getItem('auth_token')]);


    const userList = () => {
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'user/getUserList?role=agent&resPerPage=12&page=' + 1, reqValues)
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
        setuserData(prev =>
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

        __DEV && console.log(adduserData);
    }, [adduserData])

    const createUser = () =>
    {
        __DEV && console.log(flag);
        if (flag == 'true') {
            editUser();
        }


        else {
            __DEV && console.log(adduserData);

            if (Object.keys(adduserData).find(x => adduserData[x] !== null)) {



                if (adduserData.password == adduserData.confirmPassword) {

                    ///////// API call from here for create user //////////
                    setloading(true)

                    const reqValues = {
                        method: "POST",
                        body: JSON.stringify({

                            name: adduserData.name,
                            password: adduserData.password,
                            email: adduserData.email,
                            phoneNumber: adduserData.phoneNumber,
                            // address: userData.address,
                            // zipCode: userData.zipcode,
                            role: 'agent',
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
                    fetch(process.env.REACT_APP_apiurl + "user/signup?id="+userDetail._id, reqValues)
                        .then(result => result.json())
                        .then(result =>
                        {
                            __DEV && console.log(result);
                            setloading(false)
                            if (!result.error) {
                                __DEV && console.log(result.result);

                                var obj = result.result
                                var arr = [obj,...userData];
                                // var obj = result.result
                                setData(arr);
                                setFile(null)
                                setuserData(null);
                                setimageData(null)
                                setAlertMessage({ open: true, message: "User Created Sucessfully ", alertType: 'success' })
                                // props.sucessMessage();

                                addFormClosed();
                                showMsg(true)
                                setErr({ texterr: null, showtexterr: false })


                            } else {

                                ///// useState for show result's err message///
                                setErr({
                                    texterr: result.message,
                                    showtexterr: true,
                                    textField: "confirmPassword",

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
    const editUser = () =>
    {
        setloading(true)
       
        const reqValues = {
            method: "PUT",
            body: JSON.stringify({
                name: adduserData&& adduserData.name ? adduserData.name : tempData && tempData.name,
                email: adduserData&&  adduserData.email ? adduserData.email : tempData.email,
                phoneNumber: adduserData&&  adduserData.phoneNumber ? adduserData.phoneNumber : tempData.phoneNumber.toString(),
                // zipCode: userData.zipcode ? userData.zipcode : tempData.zipCode,
                // address: userData.address ? userData.address : tempData.address,
                profilePicture: {
                    key: imageData && imageData.length > 0? imageData[0].key  :
                    tempData.profilePicture && tempData.profilePicture.key ,
                        
                    name: imageData && imageData.length > 0 ? imageData[0].metadata.fileName :
                    tempData.profilePicture && tempData.profilePicture.name,

                    mimetype: imageData && imageData.length > 0 ? imageData[0].metadata.mimetype

                        : tempData.profilePicture && tempData.profilePicture.mimetype

                }

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

                    let data = [...userData];


                    __DEV && console.log(data);
                    data.map((userDATA, i) =>
                    {

                        __DEV && console.log(userDATA);

                        if (userDATA._id == result.result._id) {

                            data[i] = result.result
                            __DEV && console.log(data);
                            setData(data);
                        }
                    })
                    setFile(null)


                    setAlertMessage({ open: true, message: "User Updated Sucessfully", alertType: 'success' })

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
            {/* <BreadcrumbSection breadcrumbtitle="User" /> */}
            <UserList addFormCalled={addFormCalled}  userData={userData}/>
            <Dialog className='addformdialogdiv'
                onClose={addFormCalled} aria-labelledby="simple-dialog-title" open={addForm}>
                <div>
                    <div className="addformtitle">
                    {flag == "true" ? <p>Update User</p> :<p>Add User</p>}
                        
                        <CloseIcon className="closeimg" onClick={addFormCalled} />
                    </div>

                    <AddManagerForm errortext={err}
                        // data={tempData}
                        //////name///////
                        data={tempData}
                        onCloseData={addFormCalled}
                        onCloseData={addFormCalled}
                        onChange={handleChange}
                        onError={errorChange} error={error.textField && error.textField === "name" ? true : false}
                        errtextname={error['name']} 
                        // clickLogin={createManager}
                        ////////email//////

                        onChangeEmail={handleChange}
                        onEmailError={errorChange} errEmail={error.textField && error.textField === "email" ? true : false}
                        errtextemail={error['email']}
                        //  clickLoginEmail={createManager}

                        //////password//////

                        onpasswordChange={handleChange}
                        onpasswordError={errorChange} errpassword={error.textField && error.textField === "password" ? true : false}
                        errtextpassword={error['password']} 
                        // clickLoginpassword={createManager}

                        //////confirmPassword//////

                        confirmPasswordChange={handleChange}
                        confirmPasswordError={errorChange} errconfirmPassword={error.textField && error.textField === "confirmPassword" ? true : false}
                        errtextconfirmPassword={error['confirmPassword']} 
                        // clickconfirmPassword={createManager}



                        onphoneNumber={handleChange}
                        errChange={errorChange}
                        phoneError={error.textField && error.textField === "phoneNumber" ? true : false}
                        phonetexterr={error['phoneNumber']}
                        // phoneClick={createManager}
                        handleButton={createUser}
                        loading={loading}
                        file={file}
                        imageChange={(e) => imageChange(e)}
                       
                    />
                </div>
            </Dialog>
            <NotifiedMessageComponent
                messageOpen={alertMessage.open}
                notifiactionText={alertMessage.message}
                alertType={alertMessage.alertType}
                messageClose={notificationClose} />
        </div>
    );

}

export default UserModule;
