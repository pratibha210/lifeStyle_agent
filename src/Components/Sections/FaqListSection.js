import React, { Component, useEffect, useState } from "react";
import './section.css';
import video from '../../Images/video1.jpg'
import ButtonComponent from '../../Common/UIComponents/ButtonComponent';
import PropTypes from 'prop-types';
import SearchFieldInput from '../../Common/FormFields/SearchFieldInput';
import { useDispatch, useSelector } from 'react-redux'
import FaqCollapsibleComponent from '../../Common/UIComponents/FaqCollapsibleComponent';
import FaqSkeleton from '../../Common/UIComponents/FaqSkeleton';
import GlobalPagination from "../../Common/UIComponents/GlobalPagination";
import NoDataFoundComponent from "../../Common/UIComponents/NoDataFoundComponent";
import Grid from '@material-ui/core/Grid';
import { __DEV } from "../../isDev";

var moment = require('moment');

const FaqListSection = (props) => {

    const userDetail = useSelector(state => state.userDetail);
    const [faqData, setData] = useState(null);
    const [image, setimage] = useState(null);
    const [spage,setSpage] = useState(1);
    const [searchText,setSearchText] = useState('');


    useEffect(() => {

        __DEV &&  console.log(props.faqlist);
        setData(props.faqlist);
    }, [props.faqlist])


    {/* =============Pagination for marketing list=============== */ }
    const changePage = (page) => {
        __DEV &&  console.log(page, 'L214');


        if(!(searchText.length > 0)){

            props.getPage(page);
        }else{

            setSpage(page);

        }

    }

    useEffect(()=>{

      searchFaq(spage);

    },[spage])

    {/*================ Function for count total pages================= */ }

    const totalPages = () => {

        var mPages = userDetail.obj && userDetail.obj.nFaqs

        let total = parseInt(mPages / 12);

        let rem = mPages % 12;

        if (rem > 0)
            return total + 1;

        else
            return total;
    }



    /////// onChange function ////////
    const handleChange = (e) => {

        __DEV && console.log(e);

        setSearchText(e);

        if(e.length > 0){

          searchFaq(e);

        }else{

           props.getPage(1);

        }

    }

    const searchFaq = (data) => {
        __DEV && console.log(data, 'data')
        setData(null);
        const reqValues = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth_token')
            }

        };
        fetch(process.env.REACT_APP_apiurl + "user/search?searchString=" + data + "&resPerPage=1&page="+spage, reqValues)
            .then(result => result.json())
            .then(result => {

                __DEV && console.log(result);
                if (!result.error) {
                    
                    setData(result.result)
                }
                else {

                }
            })
            .catch(err => {
                __DEV && console.log(err)
            });


    }


    return (
        <div className='mainfaqstart faqListSec'>

            <div className="marketingtitlesec trainingTitleArea">
                <p >Question
                {userDetail.role === 'admin' || userDetail.role === 'manager' ?
                        <ButtonComponent buttontext='Add Questions'
                            buttonextraclass='addmaketing-btn' mainbuttonextra='hidden-md' handleButton={props.addFormCalled} />
                        : null}
                </p>
                <div className="listtopheader">
                    {userDetail.role === 'admin' || userDetail.role === 'manager' ?

                        <ButtonComponent buttontext='Add Questions'
                            buttonextraclass='addmaketing-btn' mainbuttonextra='hidden-xs' handleButton={props.addFormCalled} /> : null}
                    <SearchFieldInput  onChange = {handleChange}/>
                </div>

            </div>

            <hr className="borderline" />
            <div className="marketinglist">
            
                <div>
                    {faqData && faqData.length > 0 ? faqData.map(data => {
                        return (


                            <FaqCollapsibleComponent faq_question={data.question} imgsrc={image}
                                faq_answer={data.answer} moreIcon editOptionCalled={() => props.addFormCalled(data,'true')}
                                deleteCalled={() => props.deleteCalled(data)} textTime={moment(data.createdDate).format("DD-MMM-YYYY HH:mm")} />


                            //     {/* <FaqCollapsibleComponent /> */}
                            //     {/**
                            //     * @description: faq skeleton start
                            // */}
                            //                     {/* <FaqSkeleton/> */}
                            //                     {/**
                            //     * @description: faq skeleton end
                            // */}
                        )
                    }) : (faqData && faqData.length == 0) ? <NoDataFoundComponent /> : (<Grid item md={12} xs={12}>
                        <FaqSkeleton />
                    </Grid>)

                    }
                </div>
                 
            </div>
            {faqData && faqData.length > 0 &&
                <GlobalPagination total={totalPages()} pageChange={changePage} />}
        </div>
    );

}

FaqListSection.propTypes = {

    addFormCalled: PropTypes.func,
    deleteCalled: PropTypes.func

};
export default FaqListSection;
