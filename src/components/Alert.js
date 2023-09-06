import React from "react";
import "../../src/Alert.css";

const Alert = ({ message, type, onClose, onConfirm, onCancel }) => {
  return (
    <div className="alert-popup">
      <div className="alert-content">
        <div className="alert-message">{message}</div>
        <div className="button-container">
          {type === "notification" && (
            <div className="ok-button" onClick={onClose}>
              X
            </div>
          )}
          {type === "decision" && (
            <>
              <div className="yes-button" onClick={onConfirm}>
                O
              </div>
              <div className="no-button" onClick={onCancel}>
                X
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;

