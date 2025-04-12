import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import MessageList from './components/MessageList';

import './App.css';  // 引入CSS文件

const App = () => {
  const [messages, setMessages] = useState([]);

  // 发送消息
  const handleSendMessage = async (message) => {
    setMessages((prevMessages) => [message, ...prevMessages]);

  
    try {
      const formData = new FormData();
      formData.append('img_name', message.img_name);
      formData.append('text', message.text);
      console.log(formData)
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      const url = `${baseUrl}/chat/send_message`;
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json_resp = await response.json(); // 获取 JSON 响应
      console.log(json_resp);

      if (json_resp && json_resp.text) {
        const text_resp = json_resp.text;
        console.log(text_resp);
        setMessages((prevMessages) => [{ key: Date.now(), text: text_resp, type: "robot" }, ...prevMessages]);
      } else {
        // 处理 json_resp 为空或 json_resp.text 不存在的情况
        console.warn("服务器返回的数据不正确:", json_resp);
        alert("服务器返回的数据不正确，请稍后再试。");
      }
      
    } catch (error) {
      console.error('上传出错:', error);
    }

  };

  return (
    <div className="chat-container" style={{backgroundImage: process.env.REACT_APP_API_BASE_URL+'/image/background.jpg',}} >
      <MessageList messages={messages} />
      <ChatBox onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;
