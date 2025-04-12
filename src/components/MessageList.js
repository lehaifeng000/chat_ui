import React, { useEffect, useRef } from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  const messageEndRef = useRef(null);

  // 每次 messages 更新时滚动到底部
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message key={message.key} message={message}/>
      ))}
      {/* 用来自动滚动到最后一条消息 */}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;
