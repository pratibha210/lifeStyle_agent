import React from 'react';
import './uicomponent.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ButtonComponent from './ButtonComponent';
import CircularProgress from '@material-ui/core/CircularProgress';

function Alert(props)
{
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NotifiedMessageComponent = (props) =>
{

    return (
        <div className={"notifiactionmessage-component" + " " + props.extracls}>
            {/* <ButtonComponent buttontext="Button"
            handleButton={notificationClick({ vertical: 'top', horizontal: 'right' })}/> */}

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={props.messageOpen}
                // open={open}
                autoHideDuration={3000}
                onClose={props.messageClose}
                action={

                    <IconButton size="small" aria-label="close" color="inherit" onClick={props.messageClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
           {props.downloading ?
               <div className='downloadsnackbar'>              
               <CircularProgress className='snackbarprogrs'/> Downloading
               </div>
                :
                <Alert
                    onClose={props.messageClose}
                    // {alertClose}
                    variant="filled"
                    severity={props.alertType}
                >
                    {props.notifiactionText}
                </Alert>
           }

                
            </Snackbar>
        </div>
    );

}

NotifiedMessageComponent.prototype = {
    extracls: PropTypes.string,
    messageOpen: PropTypes.bool,
    alertOnClose: PropTypes.func,
    notifiactionText: PropTypes.string,
    alertType: PropTypes.string,
}


export default NotifiedMessageComponent;
