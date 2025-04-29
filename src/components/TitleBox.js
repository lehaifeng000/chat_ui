import React, { useState, useRef  } from 'react';
import ModelBox from './ModelBox'; // 引入模型选择组件

const TitleBox = () => {
  const [selectedModel, setSelectedModel] = useState("default");

    return (
        <div className="title-box">
          {/* <ModelBox selectedModel={selectedModel} onModelChange={setSelectedModel} /> */}
          <img className='icon' src='/icon11.png' alt='sss'/>
          {/* <span style={{fontSize: 60}}>⛰️</span> */}
          <span className='title-txt'>Shine</span>
          <span className='title-txt-chinese' style={{fontSize: 21}}>(小山)</span>

        </div>
      );
};

export default TitleBox;