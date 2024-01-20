import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import ConversationSideSection from "../Sections/Conversation/ConversationSideSection";
import "./module.css";
import Drawer from "@material-ui/core/Drawer";
import ConversationMainSection from "../Sections/Conversation/ConversationMainSection";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import socket from "../../functions/socket"; //export socket to all protected routes
import { useSelector, useDispatch } from 'react-redux';
import PreviewImageModal from "../../Common/UIComponents/PreviewImageModal";

import { __DEV } from "../../isDev";

const MangerCoversationModule = props => {
  // const myRef = React.createRef();
  const [selectedCard, setselectedCard] = useState({});
  
  const [mobileDrawerstate, setmobileDrawerState] = React.useState({
    mobileDrawerleft: false
  });


  // DEV TEAM state declaration starts- red carpet roll start please//
  const dispatch = useDispatch();
  const userDetail = useSelector(state => state.userDetail); 
// Code comment: userDetail indicates the details of properly authenticated and authorised user as returned to us by the holier than us- BACKEND!
// format: JSON, stored in redux store;


  // console.log(userDetail);
  const [managerMessagesArray,setManagerMessagesArray] = useState([]) //  for rendering in sidebar
 
  const managerMessages = useSelector(state => state.managerMessages);
  const userMessages = useSelector(state=>state.messages);

  const [messagesArray, setMessagesArray] = useState([]);
  const [fileArray, setFileArray] = useState([]);
  const [openPreview, setOpenPreview] = React.useState(false);
  
  // console.log(userDetail, 'L29>>')

  useEffect(()=>{
    __DEV && console.log(managerMessages,'L41>>')
    setManagerMessagesArray(managerMessages)
  },[managerMessages])
  useEffect(()=>{
    __DEV && console.log(managerMessagesArray,'L45')

  },[managerMessagesArray])
  useEffect(()=>{
    __DEV && console.log(userMessages,'L49>>')
    setMessagesArray(userMessages)
  },[userMessages])

  useEffect(() => {

    __DEV && console.log(props.data, 'L61>>')
    let listenToSocket = (socket,managerMessagesArray) => {

      if (userDetail.role === 'manager') {
        socket.on(`newRoom`, (data) => {
          __DEV && console.log(data, 'from newRoom 35')
          socket.emit('joinRoomFromManager', { roomId: data.roomId })
        })
      }
  
      socket.on(`message`, (data) => {
        __DEV && console.log(data, 'L71>>') // incoming message for manager and 
        __DEV && console.log(userDetail.role,'L54>>')
        if(userDetail.role==='manager')
        {
          //At first check wether agent has opened message tab or not
          // console.log(managerMessagesArray)
          __DEV &&   console.log(managerMessagesArray.length,managerMessagesArray,'L57')
           if(managerMessagesArray.length>0) 
           {
              
            let copiedArr =[...managerMessagesArray]
             let roomIndex= copiedArr.findIndex(x=>{return x._id===data.room});
             copiedArr[roomIndex].lastMessage= [data.message]; // last message in an array
             copiedArr[roomIndex].lastSentOn= data.message.createdDate;
             copiedArr[roomIndex].unSeenMsgs =  managerMessages[roomIndex].unSeenMsgs?managerMessages[roomIndex].unSeenMsgs+1:1;
            //left to do push it to top
            let obj ={...copiedArr[roomIndex]};
           
            
            copiedArr.splice(roomIndex,1);
  
            copiedArr.unshift(obj);      //O(n) till now.
  
            __DEV && console.log(copiedArr,'L74>>')
  
            dispatch({type: 'MANAGER_MESSAGES', data: copiedArr})
  
           }
            // send message at bottom of top section, if that's the message box that is open currently
            __DEV &&  console.log(userMessages,'L95>>')
           let cArray =[...userMessages,data.message];
          //  cArray.push(data.message)
          dispatch({type: 'USER_MESSAGES', data: cArray});
        }
        // else{  // for agent // No agent here
  
        //   console.log(userMessages,'L95>>')
        //   let cArray =[...userMessages,data.message]; //let- block scoped
        //  //  cArray.push(data.message)
        //  dispatch({type: 'USER_MESSAGES', data: cArray});
  
        // }
      })
  
    }

    if (props.data !== null) {
      listenToSocket(props.data,managerMessagesArray)
    }
  }, [props.data,managerMessagesArray,userMessages]); //props.data indicates socket connection

  useEffect(()=>{
    __DEV && console.log("MOUNT")
    return function cleanup(){
      __DEV && console.log('stupid unmount')
    }

  },[])


  //DEV_TEAM- state declarations end- red carpet rolls back up//
  const mobileToggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setmobileDrawerState({ ...mobileDrawerstate, [side]: open });
  };

  const cardClickInSideSection=(data)=>{
    __DEV &&  console.log(data,'child Data');
    setselectedCard(data);
  }

  const goToPreview = (fileArray) => {

    setFileArray(fileArray);

    setOpenPreview(!openPreview);
  };

  const sliderClose = () => {
    setOpenPreview(false)
  }

  return (
    <div className="managerconversationmodulestart">
      <Grid container spacing={0}>
        <Grid
          item
          md={4}
          xs={12}
          lg={3}
          // ref={myRef}
          // onScroll={e => divonScroll(e)}
        >
          <ConversationSideSection
            goBackHome={props.goBackHome}
            showConversation={mobileToggleDrawer("mobileDrawerleft", true)}
            clickedCard={cardClickInSideSection}
          />
        </Grid>
        <Grid item md={8} xs={12} lg={9} className="hidden-xs">
          <ConversationMainSection
          goToPreview={goToPreview}
          scrollTop={props.scrollTop}   //testing remove later
          data={selectedCard}
          socket={props.data} />
        </Grid>
      </Grid>
      <Drawer
        anchor="right"
        width={"100%"}
        open={mobileDrawerstate.mobileDrawerleft}
        onClose={mobileToggleDrawer("mobileDrawerleft", false)}
        className="conversationdrawer hidden-md"
      >
        <ConversationMainSection
        goToPreview={goToPreview}
         data={selectedCard} 
         scrollTop={props.scrollTop}  // testing remove later
          goBack={mobileToggleDrawer("mobileDrawerleft", false)}
          socket={props.data}
        />
      </Drawer>
      {openPreview && <PreviewImageModal fileArray={fileArray} sliderClose={sliderClose}/> }
    </div>
  );
};
MangerCoversationModule.propTypes = {
  goBackHome: PropTypes.func
};

export default socket(MangerCoversationModule);
