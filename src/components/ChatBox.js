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
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      const uploadUrl = `${baseUrl}/chat/upload_img`;
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
    if (input.trim() && selectedFile) {
      if (!uploadImgResp) {
        alert("server no response!");
      }
      else {
        onSendMessage({key:Date.now(),text:input, type:'user', img_url:selectedFile, img_name:uploadImgResp.img_name});  // 发送消息
        setInput('');          // 清空输入框
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // 清空文件选择
        }
      }
    }
  };

  return (
    <div className="chat-box">
      

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="please input your question..."
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
          <img src={selectedFile} alt="Selected" style={{ maxWidth: '200px',margin: '10px' }} />
        </div>
      )}
      <button className='chat-addfile' onClick={() => fileInputRef.current.click()}>
      </button>
      
      <button onClick={handleSend}>send</button>
    </div>
  );
};

export default ChatBox;
