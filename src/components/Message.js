import React from 'react';

const Message = ({ message }) => {
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
        {message.text && (
          <p
            dangerouslySetInnerHTML={{
              __html: message.text.replace(/\n/g, '<br />')
            }}
          />
        )}
        {message.img_url && (
          <img src={message.img_url} alt="message image" style={{ maxWidth: '200px' }} />
        )}
      </div>
    );
  }

};

export default Message;
