/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import './commonsection.css';
import logo from '../../../Images/logo.png'
import ButtonComponent from '../../../Common/UIComponents/ButtonComponent';
import { useHistory, NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import MangerCoversationModule from '../../Modules/MangerCoversationModule';
import DropDownFieldInput from '../../../Common/FormFields/DropDownFieldInput';
import Avatar from 'react-avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DROPDOWN_MENU, HEADER_MENU } from "../../AppConfig";
import { useSelector, useDispatch } from 'react-redux';
import logout from '../../../Images/turn-off.png';
import profile from '../../../Images/user.png';
import { __DEV } from '../../../isDev';
import NotifiedMessageComponent from '../../../Common/UIComponents/NotifiedMessageComponent';
import socket from "../../../functions/socket"; //export socket to all protected routes
import adminimg from '../../../Images/shortlogo.png';
import DehazeIcon from '@material-ui/icons/Dehaze';
import LeftSidebarSection from "./LeftSidebarSection";

const HeaderSection = (props) => {

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const history = useHistory();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userDetail);
    const [userDetail, setUserDetail] = useState({});
    const [activeindex, setActiveIndex] = React.useState(0)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [profileOption, setProfileOption] = React.useState(DROPDOWN_MENU.profile_dropdown)
    // console.log(userDetail);
    const [headerMenu, setHeaderMenu] = React.useState(HEADER_MENU.headerMenu_Options)
    
    const [managerheaderMenu, setmanagerHeaderMenu] = React.useState(HEADER_MENU.managerHeaderMenu_Options)
    const [adminHeaderMenu, setAdminHeaderMenu] = React.useState(HEADER_MENU.adminHeaderMenu_Options)
    const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });
    const [upPosition, setupPosition] = useState(0);
    // __DEV && console.log(userDetail);

    useEffect(() => {
        setUserDetail(userData);
    }, [userData])

    const openProfileDropdown = event => {
        setAnchorEl(event.currentTarget);
    };
    const closeProfileDropdown = event => {
        setAnchorEl(null);
    };

    const [mobileDrawerstate, setmobileDrawerState] = React.useState({
        mobileDrawerleft: false,
    });
    const [open, setOpen] = React.useState(true);
    const [openChat, setOpenChat] = React.useState(false);
    const handleClickOpen = () => {
        __DEV &&  console.log('let chat clicked')
        setOpenChat(true);
    };

    const handleClose = () => {
        setOpenChat(false);
    };
    const mobileToggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setmobileDrawerState({ ...mobileDrawerstate, [side]: open });
    };
    // const handleActive = (e) => {
    //     setActiveIndex(e)
    // }

    const handleActive = (item, idx) => {
        setActiveIndex(idx)
        // setmobileDrawerState('mobileDrawerleft', false)
        switch (item.value) {
            case "home":
                history.push('/home')
                break;
            case "marketing":
                history.push('/marketing')
                break;
            case "training":
                history.push('/training')
                break;
            case "manager":
                history.push('/manager')
                break;
            case "user":
                history.push('/user')
                break;
            case "reference":
                history.push('/reference')
                break;
            case "company_store":
                history.push('/companystore')
                break;
            case "faq":
                history.push('/faq')
                break;
            case "contact":
                history.push('/contact')
                break;
            default: history.push('/home')

        }
    }
    const notificationClose = () => {
        setAlertMessage({ open: false })
    }


    const handleDropDown = (value) => {

        __DEV && console.log(value);

        if (value === "logout") {

            localStorage.clear();
            dispatch({ type: 'LOGGED_USER_DETAILS', data: {} });
            dispatch({ type: 'USER_MESSAGES', data: [] });
            closeProfileDropdown();
            history.push('/');
            setActiveIndex(0)
            setAlertMessage({ open: true, message: "Logged Out Successfully", alertType: 'success' })

        } else if (value === "profile") {
            setActiveIndex('')
            closeProfileDropdown();
            history.push('/profile');
        }
        handleClose()
    }

    const onScroll = (e) => {

        __DEV &&  console.log(e.target.scrollTop, 'L134>>')
        setupPosition(e.target.scrollTop)
    }
    useEffect(() => {
        return function cleanup() {
            __DEV &&  console.log('stupid unmount')
        }
    }, [])

    const openProfile = { anchorEl };
    const id = openProfile ? "simple-popover" : undefined;
    const menuList = userDetail.role == 'admin' ? adminHeaderMenu : userDetail.role=='manager'?managerheaderMenu: headerMenu
    return (
        <>
            {/* *********** TopHeader start here ************* */}
            <div className="headerStart">
                <div className="headerTopbar">

                    {/* Before login/signup section to be viewed */}


                    {/*************** for newLayout header part start here***************/}



                    <div className="mobileLeftsideTopbar hidden-md">
                        <div className="bergerMenuIcn">
                            <DehazeIcon onClick={mobileToggleDrawer('mobileDrawerleft', true)} />
                        </div>


                        <Drawer width={200} open={mobileDrawerstate.mobileDrawerleft}
                            onClose={mobileToggleDrawer('mobileDrawerleft', false)} >
                            <LeftSidebarSection closeClick={mobileToggleDrawer('mobileDrawerleft', false)} />

                        </Drawer>
                        <div className="headeLogo">
                            <NavLink to='/home'>
                                <img src={logo} alt="logo" />
                            </NavLink>
                        </div>
                    </div>


                    {/*************** for newLayout header part end here***************/}

                    {/* ************* TopHeader end here ************* */}

                    {!Object.keys(userDetail).length > 0 ?

                        (<div className='headertopbtngroup'>
                            <ButtonComponent buttontext="Login" buttonextraclass="tobarButn firstButn" handleButton={() => { history.push('/login'); setActiveIndex('') }} />
                            <ButtonComponent buttontext="Signup" buttonextraclass="tobarButn" handleButton={() => { history.push('/signup'); setActiveIndex('') }} />
                        </div>) :


                        (<div className='afterloginsec'>
                            <div className="headerprofilediv" aria-describedby={anchorEl ? "simple-popover" : ''}
                                onClick={event => openProfileDropdown(event)}>
                                {userDetail.role == 'admin' ?
                                <div className='onlyforadminprofile'>
                                <img src={adminimg} />
                                </div>:
                                <Avatar
                                    colors={['#fea34c', '#1b1f28', '#b9aafd', '#fecd3c', '#30b9b9', '#ef4d4a', '#f8a3d0']}
                                    name={userDetail.name} size="30" style={{ borderRadius: '50%' }} />}
                                {/* {/* <img src={profile}/>/*} */}
                                <p>{userDetail.name}</p>
                                <ExpandMoreIcon />
                            </div>
                            {userDetail.role === 'manager' &&
                            <div className="chatButn">
                                <ButtonComponent buttontext="Lets Chat" handleButton={handleClickOpen} />
                            </div>
                            }
                        </div>)}

                    {/* After login section to be viewed end*/}


                </div>



            </div>

            {/* *********** TopHeader end here ************* */}

            {/*}
            <div className="headerSection">
                <div className="headeLogo">
                    <NavLink to='/home'>
                        <img src={logo} alt="logo" />
                    </NavLink>
                </div>
                <div className="hidden-md" >

                    <MenuIcon onClick={mobileToggleDrawer('mobileDrawerleft', true)} className='menu-drawer' />
                    <Drawer width={200} open={mobileDrawerstate.mobileDrawerleft} onClose={mobileToggleDrawer('mobileDrawerleft', false)} className='header-drawer'>
                        <CloseIcon className="drawercloseimg" onClick={mobileToggleDrawer('mobileDrawerleft', false)} />
                        <ul className="headerMenu header-menuformobile">
                            {menuList.options.map((item, idx) =>
                            {
                                return (
                                    <li onClick={() => handleActive(item, idx)} className={"navmenu" + ' ' + (idx === activeindex && "active-menu")}>
                                        {item.label}
                                    </li>
                                );
                            })}
                            {/*<li className="chatButn">
                                <ButtonComponent buttontext="Lets Chat" handleButton={handleClickOpen} />
                        </li>*/}
            {/* </div> */}

            {
                (Object.keys(userDetail).length > 0 && userDetail.role === 'manager') &&
                <Dialog fullScreen open={openChat} onClose={handleClose}
                    onScroll={(e) => { onScroll(e) }}
                // TransitionComponent={Transition}
                >
                    <MangerCoversationModule goBackHome={handleClose} scrollTop={upPosition} />
                </Dialog>
            }
             {/* <Dialog fullScreen open={openChat} onClose={handleClose}
                    onScroll={(e) => { onScroll(e) }}
                // TransitionComponent={Transition}
                >
                    <MangerCoversationModule goBackHome={handleClose} scrollTop={upPosition} />
                </Dialog> */}
            <DropDownFieldInput
                id={anchorEl ? "simple-popover" : ''}
                open={anchorEl}
                anchorEl={anchorEl}
                handleClose={closeProfileDropdown}
                dropdownOptions={
                    userDetail.role === 'manager' || userDetail.role === 'agent' ?
                        [
                            { label: 'My Profile', value: 'profile', imgsrc: profile },
                            { label: 'Logout', value: 'logout', imgsrc: logout },
                        ]
                        :
                        [
                            { label: 'Logout', value: 'logout', imgsrc: logout },
                        ]
                }
                handleClick={handleDropDown}
                // dropdownOptions={[
                //     { label: 'My Account' },
                //     { label: 'Logout' }
                // ]}
                dropdownextracls="headerdropdown"
            // dropdownanchercls="profilredropdown"
            // dropdownextracls="dropdownnavbar albumdropdownextra"
            // dropdownanchercls="navbarancher albumdropdownancher"
            />
            <NotifiedMessageComponent
                messageOpen={alertMessage.open}
                notifiactionText={alertMessage.message}
                alertType={alertMessage.alertType}
                messageClose={notificationClose} />

        </>
    );

}

export default (HeaderSection);
