// VerifyPage
import React, { Component, useEffect, useState } from 'react';
import './uicomponent.css';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slider from "react-slick";
import Skeleton from '@material-ui/lab/Skeleton';
import postedright from "../../Images/right-chevron.png";
import postedleft from "../../Images/left-chevron.png";
import CircularProgress from '@material-ui/core/CircularProgress';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import defultimg from '../../Images/defutimgchat.jpg'
import brokenimg from '../../Images/broken.png'

const PreviewImageModal = (props) => {

  const [files, setFiles] = useState(props.fileArray)

  const _handleImageError = (event) => {
    // if (defaultImage &&
    //   event.target.src.indexOf(brokenimg) === -1) {
    //   event.target.src = brokenimg;
    // }
  }

  const onDownloadClick = (item) => {
    const url = process.env.REACT_APP_apiurl + "getFile?key=" + item.key;
    const a = document.createElement('a');
    a.href = url;
    a.download = item && item.name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);


  }
  const _handleImageLoad = (event) => {
   
  }

  const _myImageGalleryRenderer = (item) => {
    // your own image error handling
    const onImageError = _handleImageError

    const onImageLoad =_handleImageLoad

    return (
      <div>
          <GetAppRoundedIcon className='downalodbtn' onClick={() => onDownloadClick(item)} />
        <div className='preimagedivstart' style={{ height: parseInt(window.innerHeight) - 88 }}>
          <img
            className='previewimgcls'
            src={process.env.REACT_APP_apiurl + 'getFile?key=' + item.key}
            alt={defultimg}
            onLoad={onImageLoad.bind(this)}       
            onError={onImageError.bind(this)}

          />
        {/* --Defult img tag start-- */}
          {/* <img src={defultimg} className='previewimgcls'/> */}
        {/* --Defult img tag end-- */}


        {/* ---For loading start-- */}
          {/* <CircularProgress className='loadinginslider'/> */}
        {/* ---For loading end-- */}
        
      {/* ----error start---- */}
      {/* <div className='previewimgerror'>
      <img src={brokenimg} />
      <p>This image has error</p>
      </div> */}
{/* ----error end---- */}
        </div>
      </div>
    )
  }
  const _mythumbnailRenderer = (item) => {
    // your own image error handling
    const onImageError = _handleImageError
    return (
      <div>
        <div className='thumbnaildiv'>
          <img
            className='thumbnailpreviewimgcls'
            src={process.env.REACT_APP_apiurl + 'getFile?key=' + item.key}
            alt={defultimg}
            onLoad={props.onImageLoad}
            onError={onImageError.bind(this)}

          />
      {/* --Defult img tag start-- */}
            {/* <img src={defultimg} className='thumbnailpreviewimgcls'/> */}
     {/* --Defult img tag end-- */}
        </div>
      </div>
    )
  }
  return (
    <div className="previewimagedivstart">
      <CloseRoundedIcon className='slidercloseicon' onClick={props.sliderClose} />
      <ImageGallery items={files} renderItem={_myImageGalleryRenderer.bind(this)}
        lazyLoad={true}
        showPlayButton={false}
        showFullscreenButton={false}
        renderThumbInner={_mythumbnailRenderer.bind(this)}
        lazyLoad={true}
        infinite={false}
      />
     
    </div>
  );
}

export default PreviewImageModal;
/*********************dummy code*********************************************************************** */

  // const settings = {
  //   dots: true,
  //   lazyLoad: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   initialSlide: files ? files : 0,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  //   // afterChange: (index) => { this.setState({ activeIndex: index }) },
  //   appendDots: dots => (

  //     <div className="posteddots">
  //       <ul className="imagesli"> {dots} </ul>
  //     </div>
  //   ),
  //   customPaging: i => {
  //     return(
  //     // let images = this.props.data.videoObjects ? (this.props.data.image ? [...this.props.data.image, ...this.props.data.videoObjects] : this.props.data.videoObjects) : this.props.data.image;
  //         <div
  //           className="thumbnailsdiv"
  //         >
  //           {files.length === 0 ?
  //             <Skeleton width={'100%'} height={'100%'} />
  //             :
  //             <img src={process.env.REACT_APP_apiurl + 'getFile?key=' + files.key} className="postedimgthumbnail " alt={"Post"} />

  //           }
  //         </div>
  //     )
  //         }
  // };
  // const onImageError = _handleImageError
// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={"postedrightarrowdiv" + " " + className}
//       onClick={onClick}>

//       <div className="rightarrowbg">
//         <img src={postedright} className="postedrightarrow" />
//       </div>

//     </div>
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={"postedleftarrowdiv" + " " + className}
//       onClick={onClick}>
//       <div className="leftarrowbg">
//         <img src={postedleft} className="postedleftarrow" />
//       </div>
//     </div>
//   );
// }

 {/* <Dialog onClose={props.sliderClose} open={props.open} className='previewdialogdesign'>
        <Slider {...settings}>
         {_myImageGalleryRenderer.bind(this)}
        </Slider>
      </Dialog> */}