import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import MessageList from './components/MessageList';

import './App.css';  // 引入CSS文件

const App = () => {
  const [messages, setMessages] = useState([]);

  // 发送消息
  const handleSendMessage = async (message) => {
    setMessages((prevMessages) => [message, ...prevMessages]);

    const formData = new FormData();
    formData.append('img_name', message.img_name);
    formData.append('text', message.text);

    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      const url = `${baseUrl}/chat/send_message`;
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json_resp = await response.json(); // 获取文本响应
      setMessages((prevMessages) => [{text: json_resp.text, type: "robot" }, ...prevMessages]);
      
    } catch (error) {
      console.error('上传出错:', error);
    }

  };

  return (
    <div className="chat-container">
      <MessageList messages={messages} />
      <ChatBox onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;
