import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import MessageList from './components/MessageList';
import TitleBox  from './components/TitleBox';  
import ModelBox from './components/ModelBox'; // 引入模型选择组件

import './App.css';  // 引入CSS文件

const App = () => {
  const [messages, setMessages] = useState([]);
  const [selectedModel, setSelectedModel] = useState("default");

  // 发送消息
  const handleSendMessage = async (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);

  
    try {
      const formData = new FormData();
      if (message.img_name) {
        formData.append('img_name', message.img_name);
      }
      formData.append('text', message.text);
      formData.append('model', selectedModel);
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
      let msg_obj = { key: Date.now(), type: "robot" };
      if (!json_resp) {
        // 处理 json_resp 为空或 json_resp.text 不存在的情况
        console.warn("服务器返回的数据不正确:", json_resp);
        alert("服务器返回的数据不正确，请稍后再试。");
      } else {
        if (json_resp.text) {
          msg_obj.text = json_resp.text;
        }
        if (json_resp.img_url) {
          msg_obj.img_url = json_resp.img_url;
        }
        setMessages((prevMessages) => [...prevMessages, msg_obj]);
      }
    } catch (error) {
      console.error('上传出错:', error);
    }

  };

  return (
    <div className="chat-container" style={{backgroundImage: process.env.REACT_APP_API_BASE_URL+'/image/background.jpg',}} >
      <TitleBox />
      <ModelBox selectedModel={selectedModel} onModelChange={setSelectedModel} />
      <MessageList messages={messages} />
      <ChatBox onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;
