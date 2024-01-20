import React, { useEffect } from "react";
import "./chat.css";
import attachclip from "../../../Images/whiteattach.png";
import Avatar from "react-avatar";
import attachimg from "../../../Images/slide_2.jpg";
import file from "../../../Images/xls-file.png";
import TextAreaFieldInput from "../../../Common/FormFields/TextAreaFieldInput";
import sendimg from "../../../Images/send.png";
import ButtonComponent from "../../../Common/UIComponents/ButtonComponent";
import DropzoneComponentSection from "../../../Common/UIComponents/DropzoneComponentSection";
import ConversationCardSkeleton from "../../../Common/UIComponents/ConversationCardSkeleton";
import ConversationMessageSkeleton from "../../../Common/UIComponents/ConversationMessageSkeleton";
import next from "../../../Images/whitenext.png";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import socket from "../../../functions/socket";
import ErrorIcon from "@material-ui/icons/Error";
import PreviewImageModal from "../../../Common/UIComponents/PreviewImageModal";
import { __DEV } from "../../../isDev";
import ppt from '../../../Images/ppt.png';
import pdf from '../../../Images/pdf.png';
import doc from '../../../Images/doc.png';
import xls from '../../../Images/xls.png';
import txt from '../../../Images/txt.png';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import defultimg from '../../../Images/defutimgchat.jpg'

var moment = require("moment");
const AgentChatBoxSection = (props) => {
  const recievedMessages = useSelector((state) => state.messages);

  const userDetails = useSelector((state) => state.userDetail);
  

  const dispatch = useDispatch();
  const myRef = React.createRef();
  const myScrollRef = React.createRef();
  const [btnActive, setBtnActive] = React.useState(false);
  const [download, setDownload] = React.useState(false);
  const [progress, setProgress] = React.useState(false);
  const [openAttach, setOpenAttach] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [clearText, setClearText] = React.useState("nope");
  const socket = props.socket;
  //pagination stuff

  // const [callApi, setCallApi] =  React.useState(true);  //boolean // initial true, false when message reducer contains messages>>

  const [callMore, setCallMore] = React.useState(true); //boolean // initial true false when api response comes as empty array>>

  const [pageNumber, setPageNumber] = React.useState(1); // initially 1st page

  // const [reachedEnd, setreachedEnd] =  React.useState(false); //if set to true, dont show loader at the top most
  // above state seems redundant , functionality identical to callMore
  const [rcdMessages, setrcdMessages] = React.useState([]); //works as didupdate


  useEffect(()=>{

    myScrollRef.current.scrollIntoView({behavior: "instant", block: "end", inline: "nearest"});


  },[recievedMessages])

  useEffect(() => {
    setrcdMessages(recievedMessages); 
    
  }, [recievedMessages, myScrollRef]);

  useEffect(() => {
    // only when component mounts
    if (recievedMessages.length > 0) {
      setCallMore(false);
    } else {
      retrieveMessagesApi();
    }
  }, []);

  let retrieveMessagesApi = async () => {
    const reqValues = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("auth_token"),
      },
    };
    fetch(
      process.env.REACT_APP_apiurl +
        "message/getAllByRoomId?resPerPage=10&page=" +
        pageNumber +
        "&roomId=" +
        userDetails.userChatRoom.chatRoomId,
      reqValues
    )
      .then((result) => result.json())
      .then((result) => {
        if (!result.error) {
          let msgdata = [...result.result.reverse(), ...recievedMessages];
          dispatch({ type: "USER_MESSAGES", data: msgdata });

          if (result.result.length === 10) {
            // set for next page
            setPageNumber(pageNumber + 1);
            setCallMore(true);
          } else {
            setCallMore(false); //no more messages will be available over api call anymore
          }
        }
      })
      .catch((err) => {
        __DEV &&  console.log(err);
        // show declarative ui [To-Do] that api call has failed!
      });
  };

  const handleClickOpen = () => {
    setOpenAttach(true);
  };

  const handleClose = () => {
    setOpenAttach(false);
  };
  const messageEntered = (name, value) => {
    __DEV && console.log(name, value, "L27>>");
    setMessage(value);
  };
  const unResetMe = () => {
    setClearText("nope");
  };
  const sendMessage = () => {
    // Call send message via socket

    if (message.length > 0) {
      __DEV &&  console.log(message, "L38>>");

      socket.emit(
        "incomingMessage",
        {
          roomId: userDetails.userChatRoom.chatRoomId,
          messageBody: message,

          type: "message",
          Authorization: userDetails._id,
        },
        (data) => {
          __DEV &&  console.log(data, "L128> acknowledge");
          if(!data.error)
          {
          setClearText("yup");
          let resp = { ...data.result };
          resp.from = userDetails;
          __DEV && console.log(recievedMessages, "L143>>");
          let msgdata = [...recievedMessages, resp];
          dispatch({ type: "USER_MESSAGES", data: msgdata });
          }
          //error handling!
        }
      );
    }
  };

  const divonScroll = () => {
    const scrollTop = myRef.current.scrollTop;
    __DEV && console.log(`myRef.scrollTop: ${scrollTop}`);
    if (scrollTop === 0 && callMore) {
      retrieveMessagesApi(); // call for more messages when user reaches top
    }
  };

  const sendButton = (fileArray)=>{

    __DEV && console.log(fileArray);
    setProgress(true);

    if (fileArray.length > 0) {
      __DEV &&  console.log(fileArray, "fileArray");

      socket.emit(
        "incomingMessage",
        {
          roomId: userDetails.userChatRoom.chatRoomId,
          files:fileArray,
          type: "message",
          Authorization: userDetails._id,
        },(data) => {
          __DEV &&  console.log(data, "data>>>>>>");
          if(!data.error){

            setProgress(false);

            setOpenAttach(false);
          
            let resp = { ...data.result };
            resp.from = userDetails;
            __DEV &&  console.log(recievedMessages, "received messages>>");
            let msgdata = [...recievedMessages, resp];
            dispatch({ type: "USER_MESSAGES", data: msgdata });

          }else{

            setProgress(false);
            setOpenAttach(false);
            
          }

        }
      );
    }


  }

  const downloadDoc = (file) =>{

    setDownload(true);

    const url = process.env.REACT_APP_apiurl + "getFile?key=" + file.key;
    setDownload(false);
    const a = document.createElement('a');
    a.href = url;
    a.download = file && file.name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    //rcdMessages - state holding messages

    <div className="agentchatboxsection">
      <div className="topheadersection">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="nextarrowimg hidden-md" onClick={props.goBack}>
            <img src={next} />
          </div>
          <div className="avatarholder">
            {/* <img src={}/> */}
            <Avatar
              colors={[
                "#fea34c",
                "#1b1f28",
                "#b9aafd",
                "#fecd3c",
                "#30b9b9",
                "#ef4d4a",
                "#f8a3d0",
              ]}
              name="Manager"
              size="40"
            />
          </div>
        </div>
        <div className="topsecondsec">
          <div>
            <p className="senderagenttext">Manager</p>
            <p className="senderagentsubtext">
              {/* <span>typing...</span> */}
            </p>
          </div>
          <div className="attachfilesec" onClick={handleClickOpen}>
            <img src={attachclip} />
          </div>
        </div>
      </div>
      <div className="agentchatareasection" ref={myRef} onScroll={divonScroll}>
        {/* ////for skeleton purpoese//// */}
        {callMore && <ConversationMessageSkeleton />}

        {/* //////received message section start/////*/}

        {rcdMessages.map((x) => {
          // console.log(x, "L197>>");
          return (
            <div key={x._id}>
              {/* <p className="dayseparationtext">
                <span>Today</span>
              </p> */}{" "}
              {/*Later*/}
              { (x.messageBody || x.files.find(file =>(!file.mimetype.includes('image') ))) &&
              <div
                className={
                  x.from._id === userDetails._id
                    ? "managermessagestart"
                    : "agentmessagestart"
                }
              >
                {x.from._id !== userDetails._id && (
                  <Avatar
                    colors={[
                      "#fea34c",
                      "#1b1f28",
                      "#b9aafd",
                      "#fecd3c",
                      "#30b9b9",
                      "#ef4d4a",
                      "#f8a3d0",
                    ]}
                    name={x.from.name}
                    size="40"
                  />
                )}
                <div
                  className={
                    (x.from._id === userDetails._id ? "sending" : "receiving") +
                    " " +
                    "messagesection" +
                    " " +
                    (props.error === true ? "erroroccur" : " ")
                  }
                >
                  <p className="receivingtimetext">
                    {moment(x.createdDate).format("MM DD YYYY hh : mm")}
                  </p>
                  <div className='fordownling'>
                  {x.messageBody ?<p>{x.messageBody}</p>:(x.files.map(file =>(!file.mimetype.includes('image')) &&
                   <Tooltip title="Download" arrow>
                  <p className="documentnametext" 
                  onClick={()=>downloadDoc(file)}>
                        <img src={ file.mimetype.includes('pdf') ? pdf : file.mimetype.includes('text/plain') ? txt : file.mimetype.includes('application/vnd.ms-powerpoint') ? ppt : (file.mimetype.includes('xls') || file.mimetype.includes('sheet')) ? xls : (file.mimetype.includes('doc') || file.mimetype.includes('word')) ? doc : file} />
                          {file.name}
                          </p>
                  </Tooltip>))}
                  {download && <CircularProgress className='downloadingprogress'/>}
                  
                  </div>
                  {props.error && (
                    <p className="errormsgtxt">
                      <ErrorIcon />
                      Failed
                    </p>
                  )}
                </div>
              </div>}
             
            {(x.files.length > 0 &&  x.files.find(file =>(file.mimetype.includes('image') ))) &&
                <div className={
                  x.from._id === userDetails._id
                    ? "managermessagestart"
                    : "agentmessagestart"
                }>
               {x.from._id !== userDetails._id &&
                    <Avatar
                      colors={[
                        "#fea34c",
                        "#1b1f28",
                        "#b9aafd",
                        "#fecd3c",
                        "#30b9b9",
                        "#ef4d4a",
                        "#f8a3d0",
                      ]}
                      name={x.from.name}
                      size="40"
                    />}
                  <div  className={
                    (x.from._id === userDetails._id ? "sending" : "receiving") +
                    " " +
                    "messagesection" +
                    " " +
                    (props.error === true ? "erroroccur" : " ")}>
                   <p className="receivingtimetext">
                      {moment(x.createdDate).format("MM DD YYYY  hh mm")}
                    </p>
                    <div className="sentattachmentsection">
                      <ul className="flex-wrap">
                      {x.files.map((file,index) => (file.mimetype.includes('image')) &&
                      (index <=2 ?
                        <li onClick={()=>props.goToPreview(x.files)}>
                          <div className="attachimgcls" >
                            <img src={file.mimetype.includes('png') || file.mimetype.includes('jpeg') || file.mimetype.includes('jpg') ?process.env.REACT_APP_apiurl + 'getFile?key=' + file.key:attachimg} />
                  {/* -----defult img tag start--- */}
                            {/* <img src={defultimg} /> */}
                  {/* -----defult img tag end--- */}
                          </div>
                          </li>: 
                        (index == 3 &&                        
                        <li onClick={()=>props.goToPreview(x.files)}>
                          <div className="attachimgcls">
                    {/* -----defult img tag start--- */}
                            {/* <img src={defultimg} /> */}
                 {/* -----defult img tag end--- */}
                          <img src={file.mimetype.includes('png') || file.mimetype.includes('jpeg') || file.mimetype.includes('jpg') ?process.env.REACT_APP_apiurl + 'getFile?key=' + file.key:attachimg} />
                           {x.files.length > 3 &&<p className="plusmoretext">+{x.files.length - 3}</p>}
                        </div>
                        </li>)
                        )
                      )}
                     </ul>
                    </div>
                  </div>
                  {props.error && (
                    <p className="errormsgtxt">
                      <ErrorIcon />
                      Failed
                    </p>
                  )}
                </div>
                }
             </div>
          );
        })}
        {/* image attachment receiving end */}
        {/* Starting with typing.. functionality-later */}

        <div ref={myScrollRef}> {/*Dummy ref to scroll to bottom */}</div>
      </div>
      <div className="sendfooterareasection">
        <TextAreaFieldInput
          placeholder="Type a message"
          textinputname="chatMessage"
          onError={() => console.log("")}
          onChange={messageEntered}
          maxRowsnumber={1}
          sendChat={sendMessage}
          unResetMe={unResetMe}
          reset={clearText}
        />

        <ButtonComponent
          buttonextraclass={
            "messagesendbtn" +
            " " +
            (!message.length > 0 ? "inactivesndbtn" : " ")
          }
          btnimg={sendimg}
          handleButton={sendMessage}
          disabled={!message.length > 0}
        />
      </div>
      {openAttach &&
      <DropzoneComponentSection
        openAttach={openAttach}
        handleClose={handleClose}
        sendButton={sendButton}
        loading={progress}
      />}
    </div>
  );
};

AgentChatBoxSection.propTypes = {
  goToPreview: PropTypes.func,
};

export default AgentChatBoxSection;

//***************dummy code ************************************************* */
              {/*//////// received message section end////////////// */}
              {/* //// send message section start//////*/}
              {/* /////// send message section end ///////*/}
              {/* //// document receiving start*/}
              
              {/* //// document receiving end*/}
              {/* //// document sending start*/}
              {/* {x.files.length > 0 && (
                <div className="managermessagestart">
                  <div className={"sending messagesection"}>
                    {" "}
                    {/*thok do*/}
                    {/* <p className="receivingtimetext">12:12</p>
                    <p className="documentnametext">
                      <img src={file} />
                      Screenshot54568900807
                    </p>
                  </div>
                </div>
              )} */} 
              {/* //// document sending end*/}
              {/* //// image attachement receiving start*/}
