/* eslint-disable no-lone-blocks */
import React, { Component, useEffect, useState } from "react";
import "./section.css";
import Grid from '@material-ui/core/Grid';
import pfimage from '../../Images/unnamed.png'
import menuicon from '../../Images/menumb.png'
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
import SearchFieldInput from "../../Common/FormFields/SearchFieldInput";
import ManagerUserCard from "../../Common/UIComponents/ManagerUserCard";
import ManagerListSkeleton from "../../Common/UIComponents/ManagerListSkeleton";
import GlobalPagination from "../../Common/UIComponents/GlobalPagination";
import { useDispatch, useSelector } from 'react-redux'
import NoDataFoundComponent from "../../Common/UIComponents/NoDataFoundComponent";
import { __DEV } from '../../isDev'

const ManagerList = (props) => {
    const [managersList, setManagerList] = useState(null);
    const [pageNumber, setPagenumber] = useState(1)
    const userDetail = useSelector(state => state.userDetail);
    const [searchText,setSearchText] = useState('');
    const [spage,setSpage]= useState(1);
    const [page,setPage]= useState(1);



    useEffect(() =>
    {
        // console.log(props.managerData);
        setManagerList(props.managerData)
    }, [props]);

    const [saveStoreData, setData] = useState([]);




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
                    setManagerList(result.result)
                }
                else {

                }
            })
            .catch(err =>
            {
                __DEV && console.log(err)
            });


    }




    {/* =============Pagination for userlist=============== */ }
    const changePage = (page) => {
        __DEV && console.log(page, 'L214')

        if (!(searchText.length > 0)) {

        setPagenumber(page);

        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + 'user/getUserList?role=manager&resPerPage=12&page=' + page, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {
                    setManagerList(result.result);
                }
                else {

                }
            })
            .catch(err =>
            {
                __DEV && console.log(err)
            });

        }else{

            setSpage(page);
        }

    }
    {/*================ Function for count total pages================= */ }

    const totalPages = () => {

        var mPages = userDetail.obj && userDetail.obj.nManagers

        let total = parseInt(mPages / 12);

        let rem = mPages % 12;

        if (rem > 0)
            return total + 1;

        else
            return total;
    }


    useEffect(() =>{

        searchManager(searchText);


    },[spage])




    // {==================Serach function start=====================}
    const onsearchChange = (e) => {

        __DEV && console.log(e);

        setSearchText(e);

        if (e.length > 0) {

            searchManager(e);

        } else {

            getAllManager();

        }

    }


    const searchManager = (data) => {
        __DEV && console.log(data, 'data')
        setData(null);

        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + "user/search?role=manager&searchString=" + data + "&resPerPage=12&page="+spage, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {

                    setManagerList(result.result)
                }
                else {

                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });


    }



    return (
        <div className={"marketinglistectionstart"}>
            <div className="marketinglistSection">
                <div className="marketingtitlesec">
                    <p>Manager List  <ButtonComponent
                        buttontext='Add Manager' buttonextraclass='addmaketing-btn' mainbuttonextra='hidden-md' handleButton={props.addFormCalled} /></p>
                    <div className="listtopheader">
                        <ButtonComponent
                            buttontext='Add Manager' buttonextraclass='addmaketing-btn' mainbuttonextra='hidden-xs' handleButton={props.addFormCalled} />
                        <SearchFieldInput onChange={onsearchChange}/>
                    </div>
                </div>
                <hr className="borderline" />
                <div className="marketinglist">

                    <div>
                        <Grid container spacing={2}>
                            {managersList && managersList.length > 0 ?
                                managersList.map(data => {
                                    return (

                                        <Grid item md={4} sm={6} xs={12}>
                                            <ManagerUserCard moreIcon 
                                            userName={data.name} 
                                            userAddress={data.address} 
                                            userPhone={data.phoneNumber}
                                            cardImg={data.profilePicture && Object.keys(data.profilePicture).length > 0 ? process.env.REACT_APP_apiurl + 'getFile?key=' + data.profilePicture.key : null} 
                                            userEmail={data.email}
                                            editOptionCalled={() => props.addFormCalled(data, 'true')}
                                            deleteCalled={() => props.deleteCalled(data)} />
                                            {/* <ManagerListSkeleton/> */}
                                        </Grid>
                                    )
                                }) 
                                
                                
                                : (managersList && managersList.length == 0) ? <div className='compnystorynodata'> <NoDataFoundComponent /></div> :
                                ( <Grid item md={4} sm={6} xs={12}>
                                    <ManagerListSkeleton />
                                </Grid>)}

                        </Grid>
                    </div>
                </div>
            </div>
            <GlobalPagination total={totalPages()} pageChange={changePage} />
        </div>
    );

}

ManagerList.propTypes = {

    addFormCalled: PropTypes.func,
    deleteCalled: PropTypes.func
};

export default ManagerList;
