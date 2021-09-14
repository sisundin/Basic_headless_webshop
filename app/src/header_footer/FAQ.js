import React from 'react';

export default class Faq extends React.Component {
    render() {
      return (
        
        <div className='popup' >
            
          <div className='popup_inner'>
          <div className="divider"></div>
          <div className="divider"></div>
            <h1>Want to get in contact?</h1>
            <div className="divider"></div>
            <p className="copy2">Hero-ify transforms the traits of your chosen hero
              <br/>into corresponding genres. A hero with great intellect
              <br/>might enjoy jazz, right, while a very strong hero
              <br/>would listen to grunge when working out.
              <br/>The genres are then combined with the other choices
              <br/>you make - mood, energy and length - to create a 
              <br/>perfect playlist, based on what you usually enjoy
              <br/>listening to on Spotify.
            </p>
            <div className="divider"></div>
            <div className="divider"></div>
          <p className = "closeEx" onClick={this.props.closeFAQ}>x</p>
          
          </div>
        </div>
        
      );
    }
  }
