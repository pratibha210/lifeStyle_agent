import React, {useState, useEffect,useRef } from 'react';
import './conversation.css'
import Avatar from 'react-avatar';
import attachimg from '../../../Images/slide_2.jpg';
import TextAreaFieldInput from '../../../Common/FormFields/TextAreaFieldInput';
import ButtonComponent from '../../../Common/UIComponents/ButtonComponent';
import sendimg from '../../../Images/send.png';
import attachclip from '../../../Images/clip.png';
import next from '../../../Images/next.png';
import file from '../../../Images/xls-file.png';
import { useSelector, useDispatch } from "react-redux";
import socket from "../../../functions/socket";
import ErrorIcon from "@material-ui/icons/Error";
import ConversationMessageSkeleton from '../../../Common/UIComponents/ConversationMessageSkeleton';
import DropzoneComponentSection from '../../../Common/UIComponents/DropzoneComponentSection';
import ppt from '../../../Images/ppt.png';
import pdf from '../../../Images/pdf.png';
import doc from '../../../Images/doc.png';
import xls from '../../../Images/xls.png';
import txt from '../../../Images/txt.png';
import Tooltip from '@material-ui/core/Tooltip';
import { __DEV } from "../../../isDev";
var moment = require('moment');


const ConversationMainSection = (props) => {

  __DEV && console.log(props.scrollTop);

    const myRef = React.createRef();
    const [openAttach, setOpenAttach] = React.useState(false);
    const [cardData, setcardData] = React.useState({});
    const [message, setMessage] = React.useState("");;
    const [progress, setProgress] = React.useState(false);
    const [download, setDownload] = React.useState(false);

    const [clearText, setClearText] = React.useState("nope");
    const recievedMessages = useSelector(state => state.messages);

    const userDetails = useSelector(state => state.userDetail);
    const firstMessage = useSelector(state => state.firstChatMessage);
  
    const [callMore, setCallMore] = React.useState(true); //boolean // initial true false when api response comes as empty array>>
  
    const [pageNumber, setPageNumber] = React.useState(1); // initially 1st page
    const [rcdMessages, setrcdMessages] = React.useState([]); //works as didupdate
    const socket = props.socket;
    const dispatch = useDispatch();


    // function usePrevious(value) {
    //   const ref = useRef();
    //   useEffect(() => {
    //     ref.current = value;
    //   });
    //   return ref.current;
    // }

    // useEffect(()=>{

    //   if(prevScrollTop > scrollTop){

    //     console.log("top")

    //     // setToTop();


    //   }else{

    //     console.log("bottom")

    //     // setToBottom();


    //   }

    // },[scrollTop,prevScrollTop])

    const handleClickOpen = () => {
        setOpenAttach(true);
    };

    const handleClose = () => {
        setOpenAttach(false);
    };
     
    useEffect(()=>{

      setcardData(props.data)  //L31  //upon every change in data, i.e. 
     
      dispatch({ type: "USER_MESSAGES", data: [] });
      // setToBottom();
      setrcdMessages([]);
      retrieveMessagesApi(props.data._id,'clear');


    },[props.data])


    useEffect(()=>{

      setToBottom();


    },[])  

    useEffect(()=>{

      setrcdMessages(recievedMessages)

    },[recievedMessages])

    useEffect(()=>{

      if(firstMessage.length == 0){

        setToBottom();
      }else{

        setToTop();
      }
        
    },[recievedMessages])


    const setToTop = () =>{

      myRef.current.scrollIntoView({behavior: "smooth",inline:"nearest",block:"start"});


    }

    

    let retrieveMessagesApi = async (id,action) => {
        const reqValues = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("auth_token")
          }
        };
        fetch(
          process.env.REACT_APP_apiurl +
            "message/getAllByRoomId?resPerPage=10&page=" +
            (action==='clear'?1:pageNumber) +
            "&roomId=" +
            id,
          reqValues
        )
          .then(result => result.json())
          .then(result => {
            if (!result.error) {

                let msgdata ;
                if(action==='clear')
                  {
                    msgdata =result.result.reverse();

                    dispatch({ type: "FIRST_MESSAGE_LIST", data: msgdata });
                  }
                  else{
                   
                    msgdata = [ ...result.result.reverse(),...recievedMessages];

                    dispatch({ type: "FIRST_MESSAGE_LIST", data: ['second'] });
                  }
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
          .catch(err => {
            __DEV && console.log(err);
            // show declarative ui [To-Do] that api call has failed!
          });
      };

      const setToBottom=()=>{

          myRef.current.scrollIntoView({behavior: "auto", block: "center", inline: "end"});

      }


    useEffect(()=>{

        if(callMore&&props.scrollTop===0 && userDetails._id)
        {
          retrieveMessagesApi(cardData._id);
        }
       },[props.scrollTop])
 
       const messageEntered = (name, value) => {
        __DEV && console.log(name, value, "L27>>");
        setMessage(value);
      };
      const unResetMe = () => {
        setClearText("nope");
      };

      const sendButton =(fileArray) =>{

        if (fileArray.length > 0) {
          __DEV && console.log(fileArray, "fileArray");
  
  
            socket.emit(
              "incomingMessage",
              {
                roomId: cardData._id,
                files:fileArray,
      
                type: "message",
                Authorization: userDetails._id,
              },
              (data) => {
                __DEV && console.log(data, "data>>");
                if(!data.error)
                {
                    setProgress(false);

                    setOpenAttach(false);
                    
                  let resp ={...data.result}
                  resp.from= userDetails;
      
                  let msgdata = [...rcdMessages, resp];
                  dispatch({ type: "USER_MESSAGES", data: msgdata });
                }else{
                    setProgress(false);

                    setOpenAttach(false);
                  
                }
              }
            );
          }


      }

      const sendMessage = () => {
        // Call send message api
    
        if (message.length > 0) {
          __DEV && console.log(message, "L38>>");


          socket.emit(
            "incomingMessage",
            {
              roomId: cardData._id,
              messageBody: message,
    
              type: "message",
              Authorization: userDetails._id,
            },
            (data) => {
              __DEV && console.log(data, "L128> acknowledge");
              if(!data.error)
              {
                setClearText("yup");
                let resp ={...data.result}
                resp.from= userDetails;
    
                let msgdata = [...rcdMessages, resp];
                dispatch({ type: "USER_MESSAGES", data: msgdata });
              }
            }
          );
        }
    };

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
        <div className="conversationmainstart">
            <div className="conversationheader" >
                <div className='nextarrowimg hidden-md' onClick={props.goBack}>
                    <img src={next} />
                </div>
                <div>
                    <p className="coversationpersoname">{Object.keys(cardData).length>0?cardData.userDetails[0].name:null}</p>
                    <div className="personactiveindication">
                        <p></p><span>Active now</span></div>
                </div>
            </div>

             <div  > 
                <div className="messagessectiondiv">
                    {/* //// message from agent start*/}

                    {/*/////// Conversation MessageSkeleton Component Called here //////*/}


                    {/* <ConversationMessageSkeleton recieveSms />  */}
                { callMore&&
                    <ConversationMessageSkeleton recieveSms />}
                    {/*///// Conversation Message Skeleton Component end/////// */}
              {rcdMessages.map(x=>{
         
               return(
                   <div key={x._id}>
                     { (x.messageBody || x.files.find(file =>(!file.mimetype.includes('image') ))) &&
                    <div className={x.from._id===userDetails._id?'managermessagestart':"agentmessagestart"}>
                      {x.from._id!==userDetails._id &&

                      <Avatar colors={['#fea34c', '#1b1f28', '#b9aafd', '#fecd3c', '#30b9b9', '#ef4d4a', '#f8a3d0']} name={x.from.name} size="40" />}
                        
                    <div className={x.from._id===userDetails._id?"sending messagesection":"receiving messagesection" + ' ' +(props.error === true ? 'erroroccur' : ' ' )}>                        
                     <p className="receivingtimetext">
                     {moment(x.createdDate).format("MM DD YYYY  hh mm")}
                    </p>
                {x.messageBody ?<p>{x.messageBody}</p>:(x.files.map(file =>(!file.mimetype.includes('image') ) &&
                    <Tooltip title="Download" arrow>
                  <p className="documentnametext"   onClick={()=>downloadDoc(file)}>
                        <img src={ file.mimetype.includes('pdf') ? pdf : file.mimetype.includes('text/plain') ? txt : file.mimetype.includes('application/vnd.ms-powerpoint') ? ppt : (file.mimetype.includes('xls') || file.mimetype.includes('sheet')) ? xls : (file.mimetype.includes('doc') || file.mimetype.includes('word')) ? doc : file} />
                          {file.name}
                  </p>
                  </Tooltip>
                  ))}
                  {props.error && (
                    <p className="errormsgtxt">
                      <ErrorIcon />
                      Failed
                    </p>
                  )}
                    </div>
                </div>}
                 


                
            
                     {/* //// document from agent start*/}
               {/* { x.files.length>0&&
                    <div className="agentmessagestart">
                        <Avatar colors={['#fea34c', '#1b1f28', '#b9aafd', '#fecd3c', '#30b9b9', '#ef4d4a', '#f8a3d0']} name='Jason Anthony' size="40" />
                        <div className="receiving messagesection">
                            <p className="receivingtimetext">
                                12:12
                    </p>
                            <p className="documentnametext">
                                <img src={file} />
                                Screenshot54568900807
                       </p>
                        </div>
                    </div>
               } */}

                    {/* document from agent end */}

                    {/* message from manager end */}

                     {/* //// image attachement from agent start*/}
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
                      {x.files.map((file) => (file.mimetype.includes('image') ) &&
                        <li onClick={()=>props.goToPreview(x.files)}>
                          <div className="attachimgcls">
                            <img src={file.mimetype.includes('png') || file.mimetype.includes('jpeg') || file.mimetype.includes('jpg') ?process.env.REACT_APP_apiurl + 'getFile?key=' + file.key:attachimg} />
                          </div>
                          </li>
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


                    {/* image attachment from agent end */}

                    {/* //// loading from agent start*/}

                    {/* <div className="agentmessagestart">
                        <Avatar colors={['#fea34c', '#1b1f28', '#b9aafd', '#fecd3c', '#30b9b9', '#ef4d4a', '#f8a3d0']} name='Jason Anthony' size="40" />
                        <div className="receiving messagesection">
                            <div className="progress">
                                <span></span>
                                <span></span>
                                <span></span>

                            </div>
                        </div>
                    </div> */}

                    {/* loading from agent end */}
                    <div ref={myRef}>  {/*Dummy ref to scroll to bottom */}

                    </div>
                </div>
                <div className="tofixfootertext">
                    <div className="typingmessagediv">
                        <div className="textfieldinputdesign">
                            <TextAreaFieldInput placeholder="Type a message"
                            //   placeholder="Type a message"
                              textinputname="chatMessage"
                              onError={() => console.log("")}
                              onChange={messageEntered}
                              maxRowsnumber={1}
                              sendChat={sendMessage}
                              unResetMe={unResetMe}
                              reset={clearText}
                                maxRowsnumber={4} />
                            <div className="attachfileimg" onClick={handleClickOpen}>
                                <img src={attachclip} />
                            </div>
                        </div>
                        <ButtonComponent buttontext='Send' buttonextraclass='messagesendbtn'
                            btnimg={sendimg}
                            handleButton={sendMessage}
                            disabled={!message.length > 0} />
                    </div>
                </div>
            </div>

            {/* //////before starting a conversation section start////// */}


            {/* <div className='beforeacceptingconversation'>
                <div className='acceptionconfirmationcard'>
                    <div className='sendingagentprofile'>
                        <Avatar colors={['#fea34c', '#1b1f28', '#b9aafd', '#fecd3c', '#30b9b9', '#ef4d4a', '#f8a3d0']} name='Jason Anthony' size="75" />
                        <div className="onlineindication"></div>
                    </div>
                    <p>Jason Anthony</p>
                    <div className='acceptingcard'>
                        <p><span>Jason Anthony </span> wants to ask a question to you</p>
                        <div className='acceptingbtngroup'>
                            <ButtonComponent buttontext='Decline' buttonextraclass='declinemessagebtn'
                            />
                            <ButtonComponent buttontext='Answer' buttonextraclass='acceptmessagebtn'
                            />
                        </div>
                    </div>
                </div>
            </div> */}

            
            {/* //////before starting a conversation section end////// */}

            {openAttach && <DropzoneComponentSection openAttach={openAttach} handleClose={handleClose} sendButton={sendButton}
        loading={progress}/>}

        </div>
    );

}

export default ConversationMainSection;
