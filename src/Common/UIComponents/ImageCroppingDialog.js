import React, { Component } from 'react';
import './uicomponent.css';
import CloseIcon from '@material-ui/icons/Close';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonComponent from './ButtonComponent';
import Cropper from 'react-easy-crop';
import getCroppedImg from './CroppingFunctionality'
import { Slider } from '@material-ui/core';


const ImageCroppingDialog = (props) => {
    const [crop,setCrop] = React.useState({ x: 0, y: 0 })
    const [zoom,setZoom] = React.useState( 0.4 )
    const [aspect,setAspect] = React.useState(4/3)
    const [croppedAreaPixels,setcroppedAreaPixels] = React.useState(null)
    const [croppedimage,setcroppedimage] = React.useState(null)

  const showCroppedImage = async (Img) => {
        // useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                Img,
                croppedAreaPixels
            )
             console.log('donee', { croppedImage })
             setcroppedimage(croppedImage, () => {props.giveBackImage(croppedimage) })
        } catch (e) {
             console.error(e)
        }
        // }, [croppedAreaPixels])

    }

    const onCropChange = crop => {
        setCrop(crop)
    }

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setcroppedAreaPixels(croppedAreaPixels, () => { console.log(croppedAreaPixels) })
         console.log(croppedArea)
    }

    const onZoomChange = zoom => {
        setZoom(zoom)
    }
    return (
        <div className="globalcropperdialog">
            <Dialog
                className={props.dialogclass}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className="createalbumname-title">
                    {/* <p className="createtitletext"> */}
                        {props.croptitle}
                    {/* </p> */}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {/* {this.props.dialogdesc} */}
                        <Cropper
                            image={props.imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={aspect}
                            cropShape={props.cropShape}
                            showGrid={false}
                            onCropChange={onCropChange}
                            onCropComplete={onCropComplete}
                            onZoomChange={onZoomChange}
                            cropSize={props.cropSize}
                            restrictPosition={false}
                        />
                        <div className="zoomcontrols">
                            <p className="zoomslidertext">Zoom</p>
                            <Slider
                                label="Zoom"
                                value={zoom}
                                min={0.4}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e, zoom) => onZoomChange(zoom)}
                            />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="imagecropperaction">
                    <ButtonComponent
                        buttontext="Cancel" active={true}
                        handleButton={props.handleClose} buttonextraclass="dialogagreebtn dialogdisagreebtn" />
                    <ButtonComponent
                        buttontext="Crop" active={true}
                        handleButton={() => showCroppedImage(props.imageSrc)} buttonextraclass="dialogagreebtn" />
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default ImageCroppingDialog;
