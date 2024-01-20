import React, { Component, useEffect, useState } from "react";
import "./section.css";
import Grid from '@material-ui/core/Grid';
import pfimage from '../../Images/unnamed.png'
import menuicon from '../../Images/menumb.png'
import SearchFieldInput from "../../Common/FormFields/SearchFieldInput";
import ManagerUserCard from "../../Common/UIComponents/ManagerUserCard";
import ManagerListSkeleton from "../../Common/UIComponents/ManagerListSkeleton";
import GlobalPagination from "../../Common/UIComponents/GlobalPagination";
import NoDataFoundComponent from "../../Common/UIComponents/NoDataFoundComponent";
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import ButtonComponent from "../../Common/UIComponents/ButtonComponent";
import { __DEV } from "../../isDev";


const UserList = (props) => {
    // const userDetail = useSelector(state => state.userDetail);
    const [searchData, setSearchData] = useState(null);
    const [userData, setData] = useState(null);
    const [page, setPagenumber] = useState(1);
    const userDetail = useSelector(state => state.userDetail);
    const [saveStoreData] = useState([]);
    const [spage, setSpage] = useState(1);
    const [searchText, setSearchText] = useState('');

    

    useEffect(() => {
        __DEV && console.log(props.userData);
       setData(props.userData);
    },[props.userData]);



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
        fetch(process.env.REACT_APP_apiurl + 'user/getUserList?role=agent&resPerPage=12&page=' + page, reqValues)
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
            fetch(process.env.REACT_APP_apiurl + 'user/getUserList?role=agent&resPerPage=12&page=' + page, reqValues)
                .then(result => result.json())
                .then(result => {

                    __DEV && console.log(result);
                    if (!result.error) {
                        setData(result.result);
                    }
                    else {

                    }
                })
                .catch(err => {
                    __DEV && console.log(err)
                });

        } else {

            setSpage(page);
        }


    }

    {/*================ Function for count total pages================= */ }

    const totalPages = () => {

        var mPages = userDetail.obj && userDetail.obj.nUsers

        let total = parseInt(mPages / 12);

        let rem = mPages % 12;


        if (rem > 0)
            return total + 1;

        else
            return total;
    }

    // {==================Serach function start=====================}

    useEffect(() => {

        searchUser(searchText);


    }, [spage])


    /////// onChange function ////////
    const handleChange = (e) => {

        __DEV && console.log(e);

        setSearchText(e);

        if (e.length > 0) {

            searchUser(e);

        } else {

            userList();

        }

    }


    const searchUser = (data) => {
        __DEV && console.log(data, 'data')
        setData(null);
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + "user/search?searchString=" + data + "&resPerPage=12&page="+spage, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {

                    setData(result.result)
                }
                else {
                    userList();
                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });


    }





    return (
        <div className={"marketinglistectionstart userListSectionStart"}>
            <div className="marketinglistSection">
                <div className="marketingtitlesec">
                    <p>User List  <ButtonComponent
                        buttontext='Add User' buttonextraclass='addmaketing-btn' mainbuttonextra='hidden-md' handleButton={props.addFormCalled} /></p>
                    <div className="listtopheader">
                        <ButtonComponent
                            buttontext='Add User' buttonextraclass='addmaketing-btn' mainbuttonextra='hidden-xs' handleButton={props.addFormCalled} />
                        <SearchFieldInput onChange={handleChange} />
                    </div>
                </div>
                <hr className="borderline" />
                <div className="marketinglist">
                    <div>
                        <Grid container spacing={2}>
                            {userData && userData.length > 0 ?
                                userData.map(data => {
                                    return (
                                        <Grid item md={4} sm={6} xs={12}>
                                            <ManagerUserCard
                                                editCalled={()=>props.addFormCalled(data,'true')}
                                                userName={data.name}
                                                userAddress={data.address}
                                                userPhone={data.phoneNumber}
                                                // cardImg={data.documents.length > 0 ? process.env.REACT_APP_apiurl + 'getFile?key=' + data.document[0].key : pfimage} 
                                                userEmail={data.email}
                                                cardImg={data.profilePicture && Object.keys(data.profilePicture).length > 0 ? process.env.REACT_APP_apiurl + 'getFile?key=' + data.profilePicture.key : null}
                                                editOptionCalled={props.addFormCalled} UserToggle />

                                        </Grid>

                                    )
                                })
                                : (userData && userData.length == 0) ? <div className='compnystorynodata'> <NoDataFoundComponent /></div> :
                                    (<Grid item md={4} sm={6} xs={12}>
                                        <ManagerListSkeleton />
                                    </Grid>)
                            }

                        </Grid>
                    </div>
                </div>
            </div>
            <GlobalPagination total={totalPages()} pageChange={changePage} />
        </div>
    );
}
UserList.propTypes = {

    addFormCalled: PropTypes.func,
    deleteCalled: PropTypes.func
};
export default UserList;