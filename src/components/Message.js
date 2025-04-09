import React from 'react';

const Message = ({ message}) => {
  if (message.type == "user") {
    return (
      <div className="message-user">
        <p>{message.text}</p>
        <img src={message.img_url} style={{ maxWidth: '200px' }} />
      </div>
    );
  } else {
    return (
      <div className="message">
        <p>{message.text}</p>
      </div>
    );
  }
  
};

export default Message;
