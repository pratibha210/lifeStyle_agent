/* eslint-disable no-duplicate-case */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import './commonsection.css';
import { useHistory, NavLink } from 'react-router-dom';
import logo from '../../../Images/logo.png'
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { DROPDOWN_MENU, HEADER_MENU } from "../../AppConfig";
import { __DEV } from "../../../isDev";
const LeftSidebarSection = (props) =>
{
    const history = useHistory();
    const [link, setLink] = useState(false);
    const [activeindex, setActiveIndex] = React.useState(0);
    const userDetail = useSelector(state => state.userDetail);
    const [managerheaderMenu, setmanagerHeaderMenu] = React.useState(HEADER_MENU.managerHeaderMenu_Options)
    const [headerMenu, setHeaderMenu] = React.useState(HEADER_MENU.ledftsideMenu_Options)
    const [adminHeaderMenu, setAdminHeaderMenu] = React.useState(HEADER_MENU.ledftsideAdminMenu_Options)
    const isQuickLink = () =>
    {
        setLink(!link)
    }

    const handleActive = (item, idx) =>
    {
        __DEV &&  console.log(item, idx);
        setActiveIndex(idx)
        // setmobileDrawerState('mobileDrawerleft', false)
        switch (item.value) {
            // case "quicklink":
            //     break;
            case "home":
                history.push('/home')
                break;
            case "buyerbook":
                history.push('/buyerbooks')
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
            case "support":
                history.push('/contact')
                break;
            // case "contact":
            //     history.push('/contact')
            //     break;
            default: history.push('/home')

        }
    }

    
    const menuList = userDetail.role == 'admin' ? adminHeaderMenu :
                    userDetail.role=='manager'? managerheaderMenu : headerMenu
    // headerMenu
    return (
        <div className="leftSidebarStart leftsidebarScroll">
            {props.closeClick &&
                <div className="drawerCloseIcn">
                    <CloseIcon onClick={props.closeClick} />
                </div>
            }
            <div className="headeLogo">
                <NavLink to='/home'>
                    <img src={logo} alt="logo" />
                </NavLink>
            </div>
            <ul className="leftsideMenu">
                <li onClick={isQuickLink}>
                    <p className="singlemenu">
                        <i class="ri-links-fill"></i> Quick Links
                        {link === true ?
                            <i class="ri-arrow-up-s-line arrowicn"></i>
                            :
                            <i class="ri-arrow-down-s-line arrowicn"></i>
                        }
                    </p>
                    <div className={(link === true ? 'showSubMenu' : 'closeshowMenu') + ' ' + 'submenustart'}>

                        {link === true ?
                            <ul className="subQuickMenu">
                                <a href="https://www.lbar.com/" target="_blank">
                                    <li><p className="singlemenu subSingleMenu borderNone">
                                        <i class="ri-checkbox-blank-circle-fill"></i>LABR
                            </p></li>
                                </a>
                                <a href="https://www.dotloop.com/" target="_blank">
                                    <li><p className="singlemenu subSingleMenu borderNone">
                                        <i class="ri-checkbox-blank-circle-fill"></i>DotLoop
                            </p></li>
                                </a>
                                <a href="https://kvcore.com/" target="_blank">
                                    <li><p className="singlemenu subSingleMenu borderNone">
                                        <i class="ri-checkbox-blank-circle-fill"></i>kvCore
                            </p></li>
                                </a>
                                <a href="https://brokersumo.com/" target="_blank">
                                    <li><p className="singlemenu subSingleMenu">
                                        <i class="ri-checkbox-blank-circle-fill"></i>Broker Sumo
                            </p></li>
                                </a>
                            </ul>
                            :
                            null}
                    </div>
                </li>
                {menuList.options.map((item, idx) =>
                {
                    return (
                        <li key={idx} onClick={() => handleActive(item, idx)}>
                            <p onClick={props.closeClick} className={"singlemenu" + ' ' + (idx === activeindex && "activeSinglemenu")}>
                                <i class={item.icn}></i>
                                {item.label}
                            </p>
                        </li>
                    );
                })}
            </ul>
            <div class="cover-bar"></div>
        </div>
    );
}

export default LeftSidebarSection;