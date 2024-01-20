import React from 'react';
import './uicomponent.css';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';


const ButtonComponent = (props) => {


        return (
            <div className={"buttoncomponent-start" + " " + props.mainbuttonextra}>
                <Button className={(props.inactive === true ? 'disabledclass' : ' ') + ' ' + "buttonclass" + " " + props.buttonextraclass}
                    onClick={props.handleButton}
                    disabled={props.disabled}
                >
                    {props.loading === true ?
                        null :
                        (props.btnimg &&
                            <img src={props.btnimg} className={"buttonimage" + " " + props.buttonimgextracls} alt="btnimg"/>
                        )}
                    {props.loading === true ?
                        null :
                        (props.btniconclass &&

                            <i className={props.btniconclass} aria-hidden="true"></i>
                        )
                    }
                    {props.loading === true ?
                        <CircularProgress size={15} className="buttonprogressdesign" color='white'/> :
                        props.buttontext
                    }
                </Button>
            </div>
        );

}

ButtonComponent.prototype={
    handleButton: PropTypes.func,
    buttonextraclass: PropTypes.string,
    disabled: PropTypes.bool,
    inactive:PropTypes.bool,
    loading: PropTypes.bool,
    buttontext: PropTypes.string,
    btnimg: PropTypes.string,
    buttonimgextracls: PropTypes.string,
    btniconclass: PropTypes.string,
}

export default ButtonComponent;
