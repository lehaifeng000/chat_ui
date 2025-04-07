import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import MessageList from './components/MessageList';

import './App.css';  // 引入CSS文件

const App = () => {
  const [messages, setMessages] = useState([]);

  // 发送消息
  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [{ id: Date.now(), text: message }, ...prevMessages]);

    // 在状态更新完成后发送 HTTP GET 请求
    const url = `http://localhost:8000/chat`;

    // 将 fetch 请求的 Promise 存储在 requestPromise 变量中
    const requestPromise = fetch(url, {
      method: 'GET',
    });
    console.log("aaaaa");
    // 你可以在这里对 requestPromise 做一些操作，例如记录它
    // console.log('发送请求的 Promise 对象：', requestPromise);

    // 然后你可以像之前一样处理 Promise 的结果
    requestPromise
      .then((response) => {
        if (!response.ok) {
          console.log("请求失败");
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('请求成功，返回数据：', data);
        setMessages((prevMessages) => [{ id: Date.now(), text: data }, ...prevMessages]);
      })
      .catch((error) => {
        console.error('发送消息失败：', error);
      });

    

  };

  return (
    <div className="chat-container">
      <MessageList messages={messages} />
      <ChatBox onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;
