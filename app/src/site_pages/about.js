import React, { Component } from "react";
import about from './images/simonAboutImage.png';



export default class About extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
      }

  render() {
    return (
      <div className="pageWrapper">        
        <div className="pageTopDivider"></div>
        <div className="text-center">
        <p className="headerPageText">You can call me Simon!</p>
        <div className="siteShowCase">
            
            <ImageLoaderAbout/>
            
        </div> 
        
        </div>
        <div className="divider"></div>
        <div className="divider"></div>
      </div>
    );
  }
}
function ImageLoaderAbout() {
    // Import result is the URL of your image
    return <img className="showCaseImage" src={about} alt="Logo" />;
  }