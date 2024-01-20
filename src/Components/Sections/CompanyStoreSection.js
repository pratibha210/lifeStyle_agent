import React, { useState, useEffect } from "react";
import './section.css';
import productimg from '../../Images/companyproduct.jpg'
import ButtonComponent from '../../Common/UIComponents/ButtonComponent';
import PropTypes from 'prop-types';
import SearchFieldInput from '../../Common/FormFields/SearchFieldInput';
import CompanyStoreCard from '../../Common/UIComponents/CompanyStoreCard';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import CompanyStoreCardSkeleton from '../../Common/UIComponents/CompanyStoreCardSkeleton';
import GlobalPagination from '../../Common/UIComponents/GlobalPagination';
import NoDataFoundComponent from "../../Common/UIComponents/NoDataFoundComponent";
import { __DEV } from "../../isDev";
import UnauthorizedSection from "../../Components/Sections/CommonSection/UnauthorizedSection";
import NotifiedMessageComponent from '../../Common/UIComponents/NotifiedMessageComponent';


const CompanyStoreSection = (props) => {

  const userDetail = useSelector(state => state.userDetail);
  const [flag, setFlag] = useState('true');
  const [saveStoreData, setData] = useState(null);
  const [spage, setSpage] = useState(1);
  const [searchText,setSearchText] = useState('');
  const [alertMessage, setAlertMessage] = useState({ open: false, message: '', alertType: '' });

  useEffect(() => {
    __DEV && console.log(props.storeData);
    setData(props.storeData);

  }, [props])


  const notificationClose = () =>
  {
      setAlertMessage({ open: false })
  }


  {/* =============Pagination for reference list=============== */ }
  const changePage = (page) =>
  // setPageNumber(page);
  {
    if(!(searchText.length > 0)){
      __DEV &&  console.log(page, 'L214');
    const reqValues = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem('auth_token')
      }

    };
    fetch(process.env.REACT_APP_apiurl + 'store/getAll?resPerPage=12&page=' + page, reqValues)
      .then(result => result.json())
      .then(result => {

        __DEV && console.log(result);
        if (!result.error) {
          setData(result.result);
        }
      })
      .catch(err => {
        __DEV && console.log(err);
      });
    }else{

      setSpage(page);
    }
  }


  useEffect(()=>{

    searchStore(searchText);


  },[spage])

  const getAllStoreList = () =>
  {
      const reqValues = {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              'Authorization': localStorage.getItem('auth_token')
          }

      };
      fetch(process.env.REACT_APP_apiurl + 'store/getAll?page=1&resPerPage=12', reqValues)
          .then(result => result.json())
          .then(result =>
          {

              __DEV && console.log(result.result);
              if (!result.error) {
                  setData(result.result)
              }
              else {
                  setAlertMessage({ open: true, message: 'Something went wrong.. Please try again', alertType: 'error' });



              }
          })
          .catch(err =>
          {
              __DEV && console.log(err)
          });

  }


  {/*================ Function for count total pages================= */ }
  const totalPages = () => {

    var mPages = userDetail.obj && userDetail.obj.nStoreItems

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

      searchStore(e);

    }else{

      getAllStoreList();

    }

}

const searchStore = (data) => {
    __DEV && console.log(data, 'data');

    setData(null);

    const reqValues = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': localStorage.getItem('auth_token')
        }

    };
    fetch(process.env.REACT_APP_apiurl + "store/search?searchString=" + data + "&resPerPage=12&page="+spage, reqValues)
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
    <div className="trainingVideoSec companylist">
      <div className="marketingtitlesec trainingTitleArea">
        <p >Company Store
        {userDetail.role === 'admin' || userDetail.role === 'manager' ?
            <ButtonComponent buttontext='Add Product'
              buttonextraclass='addmaketing-btn' mainbuttonextra='hidden-md' handleButton={props.addFormCalled} />
            : null}
        </p>
        <div className="listtopheader">
          {userDetail.role === 'admin' || userDetail.role === 'manager' ?
            <ButtonComponent buttontext='Add Product'
              buttonextraclass='addmaketing-btn' mainbuttonextra='hidden-xs' handleButton={props.addFormCalled} /> : null}
          <SearchFieldInput  onChange={handleChange}/>
        </div>

      </div>

      <hr className="borderline" />

      <div className="marketinglist ">
        {localStorage.getItem('auth_token') ?
          <Grid container spacing={4} className='companystoregrid'>
            {saveStoreData && saveStoreData.length > 0 ?
              (saveStoreData.map(x => {
                return (
                  <Grid item md={4} sm={6} xs={12}>
                    <CompanyStoreCard
                      extraCls="companystore-sectioncard"
                      cardImg={x.productImages.length > 0 ? process.env.REACT_APP_apiurl + 'getFile?key=' + x.productImages[0].key : null}
                      moreIcon
                      CompanyPrice={'$ ' + x.pricing}
                      CompanyTitle={x.productName}
                      ProductDertails={x.description}
                      editOptionCalled={() => props.addFormCalled(x, flag)}
                      deleteCalled={() => props.deleteCalled(x)}
                    />
                  </Grid>
                )
              })) : (saveStoreData && saveStoreData.length == 0)?
              <div className='compnystorynodata'><NoDataFoundComponent /></div> : (<Grid item md={4} sm={6} xs={12}>
                  <CompanyStoreCardSkeleton />
                </Grid>)}
          </Grid> : <UnauthorizedSection />}
      </div>
      {localStorage.getItem('auth_token') &&
        <GlobalPagination total={totalPages()} pageChange={changePage} />}

          <NotifiedMessageComponent
                messageOpen={alertMessage.open}
                notifiactionText={alertMessage.message}
                messageClose={notificationClose}
                alertType={alertMessage.alertType} />

    </div>
  );

}

CompanyStoreSection.propTypes = {

  addFormCalled: PropTypes.func,

};
export default CompanyStoreSection;




