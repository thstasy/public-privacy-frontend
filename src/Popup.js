
import React, { useState } from 'react';
import '../src/App.css';


const Popup = () => {
  const [showPopup, setShowPopup] = useState(true);

  const dismissPopup = () => {
    setShowPopup(false);
  };


  return (
    <>
      {showPopup && (
        <div className="container">
          <div className="col-sm-8 text-left">
            <div className="popup-container">
              <div className="popup">
                <span className="dismiss-btn" onClick={dismissPopup}>X</span>
                <h2 className="popup-heading">p+p</h2>
                <div className="popup-content-title" style={{ maxWidth: '100%', wordBreak: 'break-word' }}>
                  INFO
                  <div className="popup-content" style={{ maxWidth: '66%', wordBreak: 'break-word' }}>
                    This is an anonymous-forum-centered website, focusing on "Gender Equality", "Health Care" and "Educational System."
                    <br/>
                    The website is made of black and white, like public and privacy, seemingly opposing standpoints. 
                    <br/>
                    As I am of the mind that, between public and privacy, there is a breathable gray space where we appreciate different opinions.
                    <br/>
                    <div className="index-box"></div>
                    <span style={{ color: "black" }}>Dear collaborators, a.k.a. registered users</span>, do share your own experiences on "Gender Equality", "Health Care" and "Educational System" on Opinion Section.
                    <br/>
                    <div className="index-box"></div>
                    <span style={{ color: "black" }}>Dear visitors</span>, <a href="https://public-privacy.xyz/#/collaborator/#motivation" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "black" }}> my Motivation </a> and <a href="https://public-privacy.xyz/#/selected-references" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "black" }}>the selected references</a> will hopefully give you an idea of the website's calling. 
                    <br/>
                  </div>
                </div>
                <div className="popup-content-title" style={{ maxWidth: '66%', wordBreak: 'break-word' }}>
                  Intended Bugs
                  <div className="popup-content-for-bugs">
                  <div className="index-box"></div>
                    All opinions remain anonymous.
                  </div>
                  <div className="popup-content-for-bugs">
                  <div className="index-box"></div>
                    All opinions are equal. No "liking" or "disliking" for the posts. 
                  </div>
                  <div className="popup-content-for-bugs">
                  <div className="index-box"></div>
                    That being said, feel free to disclose your own identities and your opinions regarding the other posts in your own post.
                  </div>
                  <div className="popup-content-for-bugs">
                  <div className="index-box"></div>
                    Feel free to talk about your own stories.
                  </div>
                </div>
                <div className="popup-content-title">
                  Complaints and Suggestions
                  <p className="popup-content"  style={{ maxWidth: '66%', wordBreak: 'break-word' }}>
                    Be my guest if you'd like to make some suggestions or constructive critique regarding the website : t.hsuanhsieh@gmail.com.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;

