import React from 'react';
import './profilesections.css';
import ButtonComponent from '../../../Common/UIComponents/ButtonComponent'
import edit from '../../../Images/editcoloricn.png'
import Grid from '@material-ui/core/Grid';
import userimg  from '../../../Images/userimg.jpg'
import { useDispatch, useSelector } from 'react-redux'
import EditProfileSection from './EditProfileSection';
import PasswordFieldInput from '../../../Common/FormFields/PasswordFieldInput';
import profileimg from '../../../Images/unnamed.png'

const ProfileDetailSection = (props) =>
{

    const userDetail = useSelector(state => state.userDetail)
    const [editProfile, setEditProfile] = React.useState(false);
    const [editPassword, setEditPassword] = React.useState(false);

    // console.log(userDetail);
    const openEditProfile = () =>
    {
        setEditProfile(true)
    }
    const openEditPassword = () =>
    {
        // console.log('content');
        setEditPassword(true)
    }
    const cancelEditPassword = () =>
    {
        setEditPassword(false)
    }
    const closeEditSection = () =>
    {
        setEditProfile(false)
    }
    
   

    return (
        <div className="profileDetailCls">
            <div className="innerProfiesec">
                <h1> My Account</h1>
                {editProfile !== true ?
                    <div className="profileSubTitlebar">
                        <p>Profile Details</p>
                        <ButtonComponent buttontext="Edit" btnimg={edit}
                            buttonextraclass="profileEditButtn"
                            handleButton={openEditProfile} />
                    </div>
                    :
                    <div className="profileSubTitlebar editProfiletitle">
                        <p>Edit Profile</p>
                    </div>
                }
                {/* Profile Basic Detail start */}
                <div className="profileDetilinner">
                    {editProfile !== true ?
                        <Grid container spacing={8}>
                            <Grid item md={3} sm={3} xs={12} className="spacingCls">
                                <div className="userImgArea">
                                    <img src={userDetail && userDetail.profilePicture?
                                    process.env.REACT_APP_apiurl + 'getFile?key=' + userDetail.profilePicture.key: profileimg}
                                       />
                                </div>
                            </Grid>
                            {/* <div className="profileDetail-rightPart"> */}
                            <Grid item md={9} sm={9} xs={12}>
                                <Grid container spacing={4}>
                                    <Grid item md={4} sm={4} xs={12}>
                                        <div className="singleDetailField">
                                            <p>Name</p>
                                            <span>{userDetail.name}</span>
                                        </div>
                                    </Grid>
                                    <Grid item md={4} sm={4} xs={12}>
                                        <div className="singleDetailField">
                                            <p>Email</p>
                                            <span>{userDetail.email}</span>
                                        </div>
                                    </Grid>
                                    <Grid item md={4} sm={4} xs={12}>
                                        <div className="singleDetailField rightborderNone">
                                            <p>Phone No</p>
                                            <span>{userDetail.phoneNumber}</span>
                                        </div>
                                    </Grid>
                                    {/* <Grid item md={4} sm={4} xs={12}>
                                        <div className="singleDetailField">
                                            <p>ZIP</p>
                                            <span>{userDetail.zipCode}</span>
                                        </div>
                                    </Grid>
                                    <Grid item md={4} sm={4} xs={12}>
                                        <div className="singleDetailField">
                                            <p>Address</p>
                                            <span>{userDetail.address}</span>
                                        </div>
                                    </Grid> */}
                                </Grid>
                            </Grid>
                            {/* </div> */}
                        </Grid>
                        :
                        <EditProfileSection closeEditSection={closeEditSection} />
                    }
                </div>
                {/* Profile Basic Detail end */}


                {/* Password Detail start */}
                {editPassword !== true ?
                    <div className="profileSubTitlebar profilepasswordtitle">
                        <p>Password [********]</p>

                        <ButtonComponent buttontext="Change" btnimg={edit}
                            buttonextraclass="profileEditButtn"
                            handleButton={openEditPassword} />
                    </div>
                    :
                    <div className="profileSubTitlebar profileEditTitle">
                        <p>Password [********]</p>
                    </div>
                }
                <div className="editprofile-strat">
                    {editPassword !== true ?
                        null :
                        <div className="profileDetilinner">
                            <form>
                                <Grid container spacing={2}>
                                    <Grid item md={4} sm={4} xs={12}>
                                        <div className="singleDetailField">
                                            <PasswordFieldInput inputLabel="Old Password" />
                                        </div>
                                    </Grid>
                                    <Grid item md={4} sm={4} xs={12}>
                                        <div className="singleDetailField">
                                            <PasswordFieldInput inputLabel="New Password" />
                                        </div>
                                    </Grid>
                                    <Grid item md={4} sm={4} xs={12}>
                                        <div className="singleDetailField rightborderNone">
                                            <PasswordFieldInput inputLabel="Confirm Password" />
                                        </div>
                                    </Grid>
                                </Grid>
                                <div className="profileButnAtea">
                                    <ButtonComponent buttontext="Cancel" handleButton={cancelEditPassword}
                                        buttonextraclass="editProfile-saveButn profileCancelButn" />
                                    <ButtonComponent buttontext="Save"
                                        buttonextraclass="editProfile-saveButn" />
                                </div>
                            </form>
                        </div>
                    }
                </div>
                {/* Profile Password Detail end */}
            </div>
        </div >
    );

}

export default ProfileDetailSection;
