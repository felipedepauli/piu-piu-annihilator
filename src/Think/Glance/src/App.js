import React, { useEffect, useState, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import CommandButton from './components/CommandButtons.js'
import CustomModal from './components/Modal.js'
import Auth from "./components/Auth.js"
import PersonInfoCard from './components/PersonInfoCard.js';

// Importing css style
import './App.css';

// This component is responsible for rendering the frames received via WebSocket
const FrameRenderer = () => {
  // Create a ref to access the canvas
  const canvasRef = useRef(null);

  // Function to draw an image on the canvas from base64 data
  const drawImage = (base64Data) => {
    const img = new Image();
    img.src = `data:image/jpeg;base64,${base64Data}`;
    img.onload = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        // Adjust canvas width and height to match the image
        canvasRef.current.width = img.width;
        canvasRef.current.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      }
    };
  };

  // WebSocket URL
  const socketUrl = 'ws://localhost:8080/web';
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  // Effect to draw image whenever a new message arrives
  useEffect(() => {
    if (lastMessage) {
      const base64Data = lastMessage.data;
      drawImage(base64Data);
    }
  }, [lastMessage]);

  return <canvas ref={canvasRef} style={{ width: 640, height: 480 }} />;
};

// Main application component
const App = () => {
  // Create states for the person info, drone status and modal visibility
  const [personInfo, setPersonInfo] = useState({ name: "Tô tranquilo... mas atento!", description: '...' });
  const [droneStarted, setDroneStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle the drone status
  const toggleDrone = () => {
    setDroneStarted(!droneStarted);
  }

  return (
    <div className="main">
		<div className="program_name">
      <div className='program_logo'>
        <div className='piupiu'>
      <img 
          width={150}
          src="/Logo_ED-209.png"
          />
      </div>
      </div>
      		<h1>Piu Piu Aniquilador</h1>
		</div>
		
    <div className="program_image">	
				<FrameRenderer />
		</div>
  
    <div className="program_desc">
        <PersonInfoCard personInfo={personInfo} />
      </div>
		<div className='program_panel'>
          
        {/* <div className='controller__section controller__section--left'>
          <CommandButton command={droneStarted ? "stopDrone" : "startDrone"} text="Toggle eyes" icon="AiFillFire" toggleIcon="AiOutlineFire" onClick={toggleDrone}/>
        </div> */}
        <div></div>

          	<div className='controller__section controller__section--center'>
				<div className="controller__section--center__top">
					<CommandButton command="up" text="Go up" icon="BsFillArrowUpCircleFill"/>
				</div>
				<div className="controller__section--center__middle">
					<CommandButton command="left" text="Turn Left" icon="BsFillArrowLeftCircleFill"/>
					<CommandButton command="centralize" text="Centralize" icon="BsStopCircleFill"/>
					<CommandButton command="right" text="Turn Right" icon="BsFillArrowRightCircleFill"/>
				</div>
				<div className="controller__section--center__bottom">
					<CommandButton command="down" text="Down" icon="BsFillArrowDownCircleFill"/>
				</div>
			</div>

          	<div className='controller__section controller__section--right'>
                <div>
                  <Auth setPersonInfo={setPersonInfo} />
                </div>
          	</div>

		</div>

        
      </div>
  );
};

export default App;