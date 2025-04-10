import React, { useState, useRef  } from 'react';



const ChatBox = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadImgResp, setUploadImgResp] = useState(null);
  const fileInputRef = useRef(null); // 使用 useRef

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return; // 用户取消选择文件
    }
    setSelectedFile(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('img', file); // 'image' 是后端接收文件的字段名，根据你的 API 修改

    try {
      const uploadUrl = `http://localhost:8000/chat/upload_img`;
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.json(); // 获取文本响应
      console.log('上传成功，返回数据：', text);
      setUploadImgResp(text); 
    } catch (error) {
      console.error('上传出错:', error);
    }

  };

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage({text:input, type:'user', img_url:selectedFile, img_name:uploadImgResp.img_name});  // 发送消息
      setInput('');          // 清空输入框
      setSelectedFile('');
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
      <input
        type="file"
        onChange={handleFileSelect}
        style={{ display: 'none' }} // 隐藏默认的文件选择按钮
        ref={fileInputRef}
      />
      {selectedFile && (
        <div>
          <img src={selectedFile} alt="Selected" style={{ maxWidth: '200px' }} />
        </div>
      )}
      <button onClick={() => fileInputRef.current.click()}>
        选择文件
      </button>
      <button onClick={handleSend}>发送</button>
    </div>
  );
};

export default ChatBox;
