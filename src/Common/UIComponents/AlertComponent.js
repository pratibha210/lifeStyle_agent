// AlertComponent
import React from 'react';
import './uicomponent.css';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonComponent from './ButtonComponent';
import trash from '../../Images/trashcolor.png'
import CloseIcon from '@material-ui/icons/Close';

const AlertComponent = (props) => {

    return (
        <div className={"alertComponent" + " " + props.extracls}>
            {/* <ButtonComponent buttontext="Button" handleButton={handleClickOpen} /> */}
            <Dialog
                className="alertDialog"
                // open={open}
                open={props.alertOpen}
                onClose={props.alertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className="alert-dialog-title">
                    <div className="alertTilteIcon">
                        {props.deleteAlert &&
                            <div className="deleteimgdiv">
                                <img src={trash} />
                            </div>
                        }
                        <p>Delete</p>
                    </div>
                    <CloseIcon className="closeIcon" onClick={props.alertClose} />

                </DialogTitle>
                <DialogContent className="dialogContentCls">
                    <DialogContentText id="alert-dialog-description">
                        {props.alertContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ButtonComponent 
                    buttonextraclass="alertCancelButn"
                    handleButton={props.alertClose} 
                    buttontext="Cancel" />

                    <ButtonComponent 
                    buttonextraclass="alertDeleteButn"
                    loading={props.loading}
                    handleButton={props.deleteButton} 
                    autoFocus 
                    buttontext="Delete"
                    loading={props.loading} />

                </DialogActions>
            </Dialog>
        </div>
    );

}

AlertComponent.prototype = {
    extracls: PropTypes.string,
    alertOpen: PropTypes.bool,
    alertClose: PropTypes.func,
    deleteAlert: PropTypes.bool,
    alertContent: PropTypes.string,
    dialogtitle: PropTypes.string,
    deleteButton: PropTypes.func
}


export default AlertComponent;
