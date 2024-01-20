
import React, { useState, useEffect } from "react";
import "./form.css";
import TextFieldInput from "../../Common/FormFields/TextFieldInput";
import TextAreaFieldInput from "../../Common/FormFields/TextAreaFieldInput";
import EmailFieldInput from "../../Common/FormFields/EmailFieldInput";
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { __DEV } from "../../isDev";
import { useRadioGroup } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import FormHelperText from "@material-ui/core/FormHelperText";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";
import PhoneFieldInput from "../../Common/FormFields/PhoneFieldInput";
import PasswordFieldInput from "../../Common/FormFields/PasswordFieldInput";
import ZipcodeFieldInput from "../../Common/FormFields/ZipcodeFieldInput";
import AlertComponent from '../../Common/UIComponents/AlertComponent';
import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';
import ErrorComponent from "../../Common/UIComponents/ErrorComponent";


const AddManagerForm = (props) =>
{

    const userDetail = useSelector(state => state.userDetail);
    const [editData, setEditData] = useState({});
    const [imageData, setimageData] = useState({});
    const [file, setFile] = useState(null);
    const [editflag, setEditFlag] = useState(false);
    const [managerData, setData] = useState(props.getManager);


    const [userData, setManagerData] = useState({});
    const [error, setError] = useState({});
    const [loading, setloading] = useState(false);
    // const [err, setErr] = useState({ showtexterr: false, texterr: null });
    const [showJoinMessage, showMsg] = useState(false);
    const [emailMsg, showMail] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });
    // const [openAlert,] = useState(false);
    const [err, setErr] = useState({ showtexterr: false, texterr: false });
    const [openAlert, setOpenAlert] = useState(false)


    const closeDelete = () =>
    {
        setOpenAlert(false)
    }



    return (
        <div style={{ padding: '15px 25px', position: 'relative' }} className='addmanagerformstart'>
            <div className='uploaderformstart managerForm' >
                <div className='fileuploadsection'>
                    <div className='fileviewsection'>

                        {props.file ?
                            <img src={props.file} className='fileimagecss' />
                            :
                            props.data && props.data.profilePicture ?
                                <img src={Object.keys(props.data.profilePicture).length > 0 ? process.env.REACT_APP_apiurl + 'getFile?key=' + props.data.profilePicture.key : null} className='fileimagecss' />

                                : <CameraAltIcon className="cameraicon" />
                        }
                        <div className='fileinputwrapper'>
                            <p>Click here to choose file
                    <input type="file" className="uploaderimgtype" onChange={props.imageChange} />
                            </p>
                        </div>

                    </div>
                </div>

                <div className="formtextinputsection">
                    <TextFieldInput inputLabel='Name'
                        textnewclass='titletextfield'
                        textinputname='name'
                        onError={props.onError}
                        inputProps={{ maxLength: "40" }}
                        error={props.error}
                        errorText={props.errtextname}
                        clickLogin={props.clickLogin}
                        onChange={props.onChange}
                        defaultValue={props.data && props.data.name}
                    />
                    <EmailFieldInput textinputname='email' inputLabel='Email'
                        onChange={props.onChangeEmail} onError={props.onEmailError} inputProps={{ maxLength: "40" }}
                        error={props.errEmail}
                        errorText={props.errtextemail}

                        clickLogin={props.clickLoginEmail} defaultValue={props.data && props.data.email}
                    />
                </div>
            </div>
            <div className="margin_top">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <PasswordFieldInput textinputname='password' inputLabel='Password'
                            onChange={props.onpasswordChange}
                            inputProps={{ maxLength: "14" }}
                            onError={props.onpasswordError}
                            error={props.errpassword}
                            errorText={props.errtextpassword}
                            clickLogin={props.clickLoginpassword} 
                            defaultValue={props.data && props.data.password}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <PasswordFieldInput textinputname='confirmPassword' inputLabel='Confirm Password'
                            onChange={props.confirmPasswordChange}
                            inputProps={{ maxLength: "14" }}
                            onError={props.confirmPasswordError}
                            error={props.errconfirmPassword}
                            errorText={props.errtextconfirmPassword} clickLogin={props.clickconfirmPassword}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <PhoneFieldInput textinputname='phoneNumber' inputLabel='Phone'
                            onChange={props.onphoneNumber} onError={props.errChange}
                            error={props.phoneError}
                            errorText={props.phonetexterr} clickLogin={props.phoneClick} 
                            defaultValue={props.data && props.data.phoneNumber}
                        />
                    </Grid>
                    {/* <Grid item xs={8} sm={6} md={8}>
                        <TextAreaFieldInput textinputname='address' inputLabel='Address'
                            onChange={props.addressChange}
                            onError={props.errChange}
                            inputProps={{ maxLength: "60" }}
                            error={props.phoneError}
                            errorText={props.phonetexterr}
                            clickLogin={props.clickLoginAddress} defaultValue={props.data && props.data.address}
                        />
                    </Grid>
                    <Grid item xs={4} sm={6} md={4}>
                        <ZipcodeFieldInput textinputname='zipcode'
                            inputLabel='Zip Code' onChange={props.zipcodeChange}
                            onError={props.zipcodeError}
                            inputProps={{ maxLength: "60" }}
                            error={props.errzipcode}
                            errorText={props.errtextzipcode}
                            clickLogin={props.clickLoginzipcode} defaultValue={props.data && props.data.zipCode} />

                    </Grid> */}
                </Grid>
            </div>
            {props.errortext && props.errortext.showtexterr &&
                <ErrorComponent errorText={props.errortext.texterr} />

            }
            <div className="faqButnArea">
                <ButtonComponent
                    buttonextraclass="faqCancelButn"
                    buttontext="Cancel"
                    handleButton={props.onCloseData}
                />
                {/* {err.showtexterr&&<p>{err.texterr}</p>} */}
                <ButtonComponent buttontext='Submit' loading={props.loading} handleButton={props.handleButton}
                    inactive={props.inactive}
                />
                <AlertComponent alertOpen={openAlert} alertClose={closeDelete} />


            </div>
        </div >
    );
    AddManagerForm.propTypes = {

        document: PropTypes.bool,

    };
};
export default AddManagerForm;