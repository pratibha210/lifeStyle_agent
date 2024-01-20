import React, { useState, useEffect } from "react";
import "./chat.css";
import Fade from "@material-ui/core/Fade";
import Popper from "@material-ui/core/Popper";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import CloseIcon from "@material-ui/icons/Close";
import AgentChatBoxSection from "./AgentChatBoxSection";
import Dialog from "@material-ui/core/Dialog";
import PreviewImageModal from "../../../Common/UIComponents/PreviewImageModal";
import socket from "../../../functions/socket";
import { useSelector, useDispatch } from "react-redux";
import { __DEV } from "../../../isDev";

const AgentChatSection = (props) => {
  // const [floatingOpen, setFloatingOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPreview, setOpenPreview] = React.useState(false);
  const dispatch = useDispatch();
  const userMessages = useSelector((state) => state.messages);

  const [messagesArray, setMessagesArray] = useState([]);
  const [fileArray, setFileArray] = useState([]);
  const handleOpen = (event) => {
    // setFloatingOpen(!floatingOpen);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const goToPreview = (fileArray) => {
    __DEV &&  console.log(fileArray)
    setFileArray(fileArray);

    setOpenPreview(!openPreview);
  };

  useEffect(() => {
    __DEV &&  console.log(props, 'L31>>')
    let listenToSocket = (socket, array) => {
      socket.on(`message`, (data) => {
        __DEV &&  console.log(userMessages, "L95>>");
        let cArray = [...userMessages, data.message]; //let- block scoped
        dispatch({ type: "USER_MESSAGES", data: cArray });
      });
    };
    if (props.data !== null) {
      listenToSocket(props.data, messagesArray);
    }
    return function cleanup() {
      //unmounting
      __DEV && console.log('CLEANUP-socket.js', props, messagesArray)

    };
  }, [props, messagesArray, userMessages, dispatch]);

  const sliderClose = () => {
    setOpenPreview(false)
  }

  const floatingOpen = Boolean(anchorEl);
  const id = floatingOpen ? 'simple-popper' : undefined;
  return (
    <div className="agentchatsection">
      <Popper
        open={floatingOpen}
        anchorEl={anchorEl}
        id={id}
        placement={"top-end"}
        className="agentchatpopper hidden-xs"
        disablePortal={false}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={100}>
            <AgentChatBoxSection goToPreview={goToPreview} socket={props.data} />
          </Fade>
        )}
      </Popper>
      <Dialog
        open={floatingOpen}
        onClose={handleOpen}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className="attachdialogstart hidden-md"
      >
        <AgentChatBoxSection goBack={handleOpen} goToPreview={goToPreview} socket={props.data} />
      </Dialog>
      <div className="agentfloatingchaticon" onClick={handleOpen} aria-describedby={id}>
        {floatingOpen === true ? <CloseIcon /> : <ModeCommentIcon />}
      </div>
      {openPreview && <PreviewImageModal fileArray={fileArray} sliderClose={sliderClose}/> }
    </div>
  );
};
export default socket(AgentChatSection);
