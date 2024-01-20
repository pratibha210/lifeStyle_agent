import React, { useState, useEffect } from "react";
import ConversationCard from "../../../Common/UIComponents/ConversationCard";
import "./conversation.css";
// import { useHistory } from 'react-router-dom';
import ButtonComponent from "../../../Common/UIComponents/ButtonComponent";
import PropTypes from "prop-types";
import home from "../../../Images/home.png";
import SearchFieldInput from "../../../Common/FormFields/SearchFieldInput";
import ConversationCardSkeleton from "../../../Common/UIComponents/ConversationCardSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { __DEV } from "../../../isDev";
var moment = require('moment');
const ConversationSideSection = props => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const [isTop, setIsTop] = useState(true);
  const [nPerPage,setNPerPage ]= useState(10);
  //Bad idea- Math.round(window.innerHeight/67)+2; //number of cards in sidebar
  const [managerMessages, setManagerMessages] = useState([]);
  const [searchText,setSearchText] = useState('');

  const [callMore, setCallMore] = React.useState(true); //boolean // initial true false when api response comes as empty array>>

  const [pageNumber, setPageNumber] = React.useState(1); // initially 1st page

  const recievedManagerMessages = useSelector(state => state.managerMessages);
  // console.log(recievedManagerMessages, "L22>>");
  const userDetails = useSelector(state => state.userDetail);

  useEffect(() => {
    setManagerMessages(recievedManagerMessages);

  }, [recievedManagerMessages]); // in didupdate

  useEffect(() => {
    // only when component mounts
    if (recievedManagerMessages.length > 0) {
      __DEV && console.log(recievedManagerMessages,'L35>>>')
      props.clickedCard(recievedManagerMessages[0]);
      setCallMore(false);
    } else {
      retrieveManagerMessagesApi('send','');
    }
  }, []);

  // call api /message/getAllForManger
  const retrieveManagerMessagesApi = (action) => {
    const reqValues = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("auth_token")
      }
    };
    fetch(
      process.env.REACT_APP_apiurl +
        "message/getAllForManger?resPerPage="+nPerPage+"&page=" +
        pageNumber +
        "&managerId=" +
        userDetails._id +"&text="+searchText,
      reqValues
    )
      .then(result => result.json())
      .then(result => {
        if (!result.error) {
          __DEV && console.log(result);
          if(action==='send')
          {
            props.clickedCard(result.result[0]);

          }
          let msgdata = [...recievedManagerMessages, ...result.result];
          dispatch({ type: "MANAGER_MESSAGES", data: msgdata });

          if (result.result.length === nPerPage) {
            // set for next page
            setPageNumber(pageNumber + 1);
            setCallMore(true);
          } else {
            setCallMore(false); //no more messages will be available over api call anymore
          }
        }
      })
      .catch(err => {
        __DEV && console.log(err);
        // show declarative ui [To-Do] that api call has failed!
      });
  };

  const divonScroll = event => {
    // console.log(window.innerHeight,'L79>>')
    // console.log(event.target.scrollTop);
    // console.log(event.target.scrollHeight, "L28>>");
    // passes two elemnts then select// alert- danger
    // Please dont try to extract logic from below, hahahahahah- Save yourself
    // let sideWindowHeight = window.innerHeight-130;

      let nBoxes = event.target.scrollTop/67;
      __DEV && console.log(parseInt(Math.round(nBoxes)/10))

       if(Math.round(nBoxes)===2&&pageNumber===1)
       {

        setPageNumber(pageNumber+1);
       } 

       else if( parseInt(Math.round(nBoxes)/10) > 2 && parseInt(Math.round(nBoxes)/10)> pageNumber ){


        setPageNumber(pageNumber+1);

       }

  };

    /////// onChange function ////////
    const handleChange = (e) => {

      if(e.length > 0){

        setSearchText(e);
      }
       

    }

    useEffect(()=>{

      retrieveManagerMessagesApi();


    },[searchText])

  useEffect(()=>{

    retrieveManagerMessagesApi();


  },[pageNumber])


  const cardClicked =(data)=>{
    __DEV && console.log(data)
    props.clickedCard(data)
  }

  let Positioning = isTop ? "static" : "fixed";
  let topPosition = isTop ? "0" : "0";
  //   let leftPosition = isTop ? '0' : '7.6%';
  let bgColor = isTop ? "transparent" : "white";
  //   let widthPosition = isTop ? 'unset' : '14%';
  //   let heightPosition = isTop ? '100%' : window.innerHeight;
  return (
    <div
      className="converstaionsidebarstart"
      // style={{
      //     position: Positioning,
      //     top: topPosition,
      //     backgroundColor: bgColor,
      //     // height: heightPosition

      // }}
    >
      <div className="conversationsidetop">
        <p className="conversationheading">
          Conversation
          <ButtonComponent
            buttontext="Home"
            buttonextraclass="homebtnstart"
            btnimg={home}
            handleButton={props.goBackHome}
          />
        </p>
        <SearchFieldInput onChange = {handleChange}/>
      </div>
      <div
        className="coversationcarddiv"
        onScroll={e => divonScroll(e)}
        style={{ height: parseInt(window.innerHeight) - 130 }}
      >
        {/* Conversation Card Skeleton Component Called here */}
        {/* <ConversationCardSkeleton /> */}
        {/* Conversation Card Skeleton end*/}
        {managerMessages.map(x => {
          return (
            <ConversationCard key={x._id}
              showConversation={props.showConversation}
              data={x}
              firstmessage={x.lastMessage.length>0?x.lastMessage[0].messageBody:null}
              time={x.lastMessage.length>0?moment(x.lastMessage[0].createdDate).format('HH:mm'):null}
              messagenumber={x.unSeenMsgs?x.unSeenMsgs:0}
              name={x.userDetails.length > 0 && x.userDetails[0].name}
              cardClick={cardClicked}
                // props.clickedCard(x)}
            />
          );
        })}
        {/* <ConversationCard
          firstmessage="The fallbacks are in the same order as the list above were Facebook has the highest priority."
          time="5:24 PM"
          messagenumber={13}
          name="Max Curl"
        />
        <ConversationCard
          firstmessage="The fallbacks are in the same order as the list above were Facebook has the highest priority."
          time="6:24 PM"
          messagenumber={2}
          name="Lore Ipsum"
        />
        <ConversationCard
          firstmessage="The fallbacks are in the same order as the list above were Facebook has the highest priority."
          time="8:24 PM"
          messagenumber={3}
          name="Jashon Anthony"
          online
          active
        />
        <ConversationCard
          firstmessage="The fallbacks are in the same order as the list above were Facebook has the highest priority."
          time="9:24 PM"
          messagenumber={5}
          name="John Lowe"
        />
        <ConversationCard
          firstmessage="The fallbacks are in the same order as the list above were Facebook has the highest priority."
          time="2:24 PM"
          messagenumber={6}
          name="Larry Bowles"
        />
        <ConversationCard
          firstmessage="The fallbacks are in the same order as the list above were Facebook has the highest priority."
          time="10:24 PM"
          messagenumber={8}
          name="Brrian Schwarz"
        />
        <ConversationCard
          firstmessage="The fallbacks are in the same order as the list above were Facebook has the highest priority."
          time="6:24 PM"
          messagenumber={2}
          name="Lore Ipsum"
        />
        <ConversationCard
          firstmessage="The fallbacks are in the same order as the list above were Facebook has the highest priority."
          time="8:24 PM"
          messagenumber={3}
          name="Jashon Anthony"
          online
          active
        />
        <ConversationCard
          firstmessage="The fallbacks are in the same order as the list above were Facebook has the highest priority."
          time="9:24 PM"
          messagenumber={5}
          name="John Lowe"
        />
        <ConversationCard
          firstmessage="The fallbacks are in the same order as the list above were Facebook has the highest priority."
          time="2:24 PM"
          messagenumber={6}
          name="Larry Bowles"
        />
        <ConversationCard
          firstmessage="The fallbacks are in the same order as the list above were Facebook has the highest priority."
          time="10:24 PM"
          messagenumber={8}
          name="Brrian Schwarz"
        />
        <ConversationCard
          firstmessage="The fallbacks are in the same order as the list above were Facebook has the highest priority."
          time="6:24 PM"
          messagenumber={2}
          name="Lore Ipsum"
        />
        <ConversationCard
          firstmessage="The fallbacks are in the same order as the list above were Facebook has the highest priority."
          time="8:24 PM"
          messagenumber={3}
          name="Jashon Anthony"
          online
          active
        />
        <ConversationCard
          firstmessage="The fallbacks are in the same order as the list above were Facebook has the highest priority."
          time="9:24 PM"
          messagenumber={5}
          name="John Lowe"
        />
        <ConversationCard
          firstmessage="The fallbacks are in the same order as the list above were Facebook has the highest priority."
          time="2:24 PM"
          messagenumber={6}
          name="Larry Bowles"
        />
        <ConversationCard
          firstmessage="The fallbacks are in the same order as the list above were Facebook has the highest priority."
          time="10:24 PM"
          messagenumber={8}
          name="Brrian Schwarz"
        /> */}
      </div>
    </div>
  );
};
ConversationSideSection.propTypes = {
  goBackHome: PropTypes.func,
  showConversation: PropTypes.func
};

export default ConversationSideSection;

/************************ dummy code*******************************/
    // if(Math.round(nBoxes) < 7 && Math.round(nBoxes)> 0){

    //   setPageNumber(pageNumber+1);
    //   setNPerPage(5);


    // }else if(Math.round(nBoxes) == 7){

    //   setPageNumber(pageNumber+1);
    //   setNPerPage(10);

    // }


 
    //  let nBoxes = sideWindowHeight/67; //

    //  console.log(nBoxes);
    // if(window.innerHeight-event.target.scrollTop>130) // passed two blocks
    // {

    //   let pageNumberN= Math.round(event.target.scrollTop/nBoxes)+2;
      
    //   console.log('called-91',pageNumberN,event.target.scrollTop,sideWindowHeight,window.innerHeight)
    //   console.log('called-94',(pageNumberN>pageNumber))
    //   if(pageNumberN>pageNumber)
    //    {
    //     console.log('called-94',pageNumberN)
    //      setPageNumber(pageNumberN);
    //     //  retrieveManagerMessagesApi();
    //    }
    //   console.log(pageNumberN,'L90')
    // }
