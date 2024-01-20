// EditProfileSection
import React, { useState, useEffect } from "react";
import "./profilesections.css";
import ButtonComponent from "../../../Common/UIComponents/ButtonComponent";
import edit from "../../../Images/editcoloricn.png";
import Grid from "@material-ui/core/Grid";
import usericn from "../../../Images/usericn.png";
import TextFieldInput from "../../../Common/FormFields/TextFieldInput";
import EmailFieldInput from "../../../Common/FormFields/EmailFieldInput";
import PhoneFieldInput from "../../../Common/FormFields/PhoneFieldInput";
import ZipcodeFieldInput from "../../../Common/FormFields/ZipcodeFieldInput";
import TextAreaFieldInput from "../../../Common/FormFields/TextAreaFieldInput";
import UploaderForm from "../../Forms/UploaderForm";
import pencil from "../../../Images/pencil_edit.png";
import NotifiedMessageComponent from "../../../Common/UIComponents/NotifiedMessageComponent";
import AlertComponent from "../../../Common/UIComponents/AlertComponent";
import ImageCroppingDialog from "../../../Common/UIComponents/ImageCroppingDialog";
import { useDispatch, useSelector } from "react-redux";
import { __DEV } from "../../../isDev";
import { RootRef } from "@material-ui/core";

const EditProfileSection = props => {
    const [impageCropOpen, setImpageCropOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [blobImage, setBlobImage] = useState(null);
    const userDetail = useSelector(state => state.userDetail)
    const [open, setOpen] = React.useState(false);
    const [user, userUpdate] = useState([]);
    const [editData, setEditData] = useState({});
    const [err, setErr] = useState({ showtexterr: false, texterr: false });
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });
    const [imageData, setimageData] = useState([]);
    const [loading, setloading] = useState(false);
    // const [err, setErr] = useState({ showtexterr: false, texterr: false });
    const dispatch = useDispatch()
    __DEV &&  console.log(userDetail);

    useEffect(() => {
        __DEV &&   console.log(userDetail.profilePicture, '37L');
    }, []);



    const imageChange = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
        // setImpageCropOpen(true);

        uploadImage(e.target.files[0])
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChange = (name, value) => {
        __DEV && console.log(name, value);
        setEditData(prev => {
            return {
                ...prev,
                [name]: value
            };
        });
        __DEV && console.log(editData);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const closeCrop = () => {
        setImpageCropOpen(false);
    };
    const giveBackImage = async blob => {
        __DEV &&  console.log(blob, ">>>>>>>L41");
        setBlobImage(blob);
        closeCrop();
    };

    const notificationClose = () => {
        setAlertMessage({ open: false })
    }





    // ///// upload image function ////
    const uploadImage = (fileData) => {

        const formData = new FormData();
        formData.append('file', fileData);

        const config = {
            method: "POST",
            body: formData
        };

        fetch(process.env.REACT_APP_apiurl + "fileupload?entityId=" + userDetail._id, config)
            .then(result => result.json())
            .then(result => {
                __DEV && console.log(result);
                //  setloading({ load: true })
                if (!result.error) {
                    __DEV && console.log(result);
                    setAlertMessage({ open: true, message: "Image Uploaded Sucessfully ", alertType: 'success' })

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
            .catch(err => {
                __DEV && console.log(err);
            })

    }


    const editUser = () => {
        console.log(userDetail.profilePicture.key, '145L');
       
        setloading(true);
        const reqValue = {
            method: "PUT",
            body: JSON.stringify({
                name: editData && editData.name ? editData.name : userDetail && userDetail.name,
                email: editData && editData.email ? editData.email : userDetail && userDetail.email,
                // address: editData && editData.address ? editData.address : userDetail && userDetail.address,
                phoneNumber: editData && editData.phoneNumber ? editData.phoneNumber.toString() : userDetail && userDetail.phoneNumber.toString(),
                // zipCode: editData && editData.zipCode ? editData.zipCode : userDetail && userDetail.zipCode,
                profilePicture: {
                    key: imageData && imageData.length > 0? imageData[0].key  :
                    userDetail.profilePicture && userDetail.profilePicture.key ,
                        
                    name: imageData && imageData.length > 0 ? imageData[0].metadata.fileName :
                        userDetail.profilePicture && userDetail.profilePicture.name,

                    mimetype: imageData && imageData.length > 0 ? imageData[0].metadata.mimetype

                        : userDetail.profilePicture && userDetail.profilePicture.mimetype

                }

            }),
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("auth_token")
            }
        };
        __DEV &&  console.log(reqValue);
        fetch(process.env.REACT_APP_apiurl + 'user/update', reqValue)
            .then(result => result.json())
            .then(result => {
                __DEV && console.log(result.result.userChatRoom);
                if (!result.error) {
                    setloading(false);
                    __DEV &&  console.log(userDetail.userChatRoom.pageDataRespObj, '174L');
                    result.result.userChatRoom = userDetail.userChatRoom
                    __DEV &&  console.log(result.result, '176L');
                    dispatch({ type: 'LOGGED_USER_DETAILS', data: result.result });
                    props.closeEditSection()
                } else {
                    setloading(false);
                }
            })
            .catch(err => {
                setloading(false);
                __DEV && console.log(err);
            });
       
    };
useEffect(()=>{
    __DEV &&   console.log(imageData);
},[imageData]);





    return (
        <div className="editprofile-strat">
            <form>
                <Grid container spacing={2}>
                    <Grid item md={3} xs={12}>
                        <div className="userImgArea uploadProfileimg">
                            <div className="profiledpuploader">
                                {imageData && imageData.length> 0 ?
                                    <div className="profiledpview">
                                        <img
                                        src={process.env.REACT_APP_apiurl + 'getFile?key=' + imageData[0].key} className="profileimgcss"
                                            // src={userDetail.profilePicture && userDetail.profilePicture.key && process.env.REACT_APP_apiurl + 'getFile?key=' + userDetail.profilePicture.key} className="profileimgcss"
                                        />
                                    </div> : <div className="profiledpview">
                                        <img
                                         src={userDetail.profilePicture && userDetail.profilePicture.key && process.env.REACT_APP_apiurl + 'getFile?key=' + userDetail.profilePicture.key} className="profileimgcss"
                                            
                                        />
                                    </div>}

                                <div className="inputfilehovereffect">
                                    <div className="inputfilewrapper">
                                        <span className="editTxtShow">Edit</span>
                                        <img src={pencil} className="editpencilcss" alt="pencil" />
                                        <input
                                            type="file"
                                            className="uploaderimgtype"
                                            onChange={e => imageChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* {impageCropOpen ? (
                            <ImageCroppingDialog
                                open={impageCropOpen}
                                croptitle="Set Image"
                                imageSrc={file}
                                giveBackImage={giveBackImage}
                                handleClose={closeCrop}
                                cropSize={{ width: 220, height: 220 }}
                                cropShape="rect"
                                dialogclass="imagecropperappear"
                            />
                        ) : null} */}
                    </Grid>
                    {/* <div className="profileDetail-rightPart"> */}
                    <Grid item md={9} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <div className="singleDetailField">
                                    <TextFieldInput
                                        inputLabel="Name"
                                        textinputname="name"
                                        defaultValue={userDetail.name}
                                        onChange={handleChange}
                                        onError={() => console.log("fvxdhnj")}
                                        handleButton={editUser}
                                    />
                                </div>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className="singleDetailField rightborderNone">
                                    <EmailFieldInput
                                        inputLabel="Email"
                                        textinputname="email"
                                        defaultValue={userDetail.email}
                                        onChange={handleChange}
                                        onError={() => console.log("fvxdhnj")}
                                        handleButton={editUser}
                                    />
                                </div>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className="singleDetailField">
                                    <PhoneFieldInput
                                        inputLabel="Phone No"
                                        textinputname="phoneNumber"
                                        defaultValue={userDetail.phoneNumber}
                                        onChange={handleChange}
                                        onError={() => console.log("fvxdhnj")}
                                        handleButton={editUser}
                                    />
                                </div>
                            </Grid>
                            {/* <Grid item md={6} xs={12}>
                                <div className="singleDetailField rightborderNone">
                                    <ZipcodeFieldInput
                                        inputLabel="ZIP"
                                        textinputname="zip"
                                        defaultValue={userDetail.zipCode}
                                        onChange={handleChange}
                                        onError={() => console.log("fvxdhnj")}
                                        handleButton={editUser}
                                    />
                                </div>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <div className="singleDetailField rightborderNone">
                                    <TextAreaFieldInput
                                        inputLabel="Address"
                                        textinputname="name"
                                        defaultValue={userDetail.address}
                                        onChange={handleChange}
                                        onError={() => console.log("fvxdhnj")}
                                        handleButton={editUser}
                                    />
                                </div>
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Grid>

                <div className="profileButnAtea">
                    <ButtonComponent
                        buttontext="Cancel"
                        handleButton={props.closeEditSection}
                        buttonextraclass="editProfile-saveButn profileCancelButn"
                    />
                    <ButtonComponent
                        buttontext="Save"
                        // handleClose={props.handleChange}
                        // onClick={handleSubmit}
                        loading={loading}
                        buttonextraclass="editProfile-saveButn"
                        handleButton={editUser}
                    />
                    {/* <AlertComponent 
                            dialogtitle="Delete the Document ?"
                             alertOpen={open}
                            alertContent="If you delete, the document will be gone forever. Are you sure you want to proceed?"
                            deleteAlert 
                            alertClose={handleClose}/> */}

                    <NotifiedMessageComponent
                        messageOpen={alertMessage.open}
                        notifiactionText={alertMessage.message}
                        messageClose={notificationClose}
                        alertType={alertMessage.alertType} />
                </div>
            </form>
        </div>
    );
};

export default EditProfileSection;
