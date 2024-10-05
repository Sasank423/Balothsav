import React from 'react';

import topImg from './props/logo.png';
import bottomImg from './props/bg.png';


import Form from './form';
import './form.css';


function App() {
  return (
    <>
      <div className='container'>
      <img src={topImg} className='top_img' alt='top'/>
      <img src={bottomImg} className='bottom_img' alt='bottom'/>
        <h1 className='heading'> VVIT BALOTSAV VVIT - 2K24</h1>
        <Form />
      </div>
    </>
    
  );
}

export default App;
