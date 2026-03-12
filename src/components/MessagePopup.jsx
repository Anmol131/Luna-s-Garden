import React from 'react';

const MessagePopup = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="message-popup__overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="message-popup" onClick={(event) => event.stopPropagation()}>
        <div className="message-popup__icon" aria-hidden="true">💌</div>
        <p className="message-popup__text">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="message-popup__button"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MessagePopup;