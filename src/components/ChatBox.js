import React, { useState } from 'react';

const ChatBox = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);  // 发送消息
      setInput('');          // 清空输入框
    }
  };

  return (
    <div className="chat-box">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="输入你的消息..."
        rows="3"  // 可以调整高度
      />
      <button onClick={handleSend}>发送</button>
    </div>
  );
};

export default ChatBox;
