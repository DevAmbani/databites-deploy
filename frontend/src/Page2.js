// import React, { useRef, useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Webcam from 'react-webcam';
// import png from './3.png';

// const CameraComponent = () => {
//   const [audio] = useState(new Audio('../test.mp3'));
//   const webcamRef = useRef(null);
//   const navigate = useNavigate();
//   const [isImageUploaded, setIsImageUploaded] = useState(false);
//   const [image, setImage] = useState();

//   const captureAndNavigate = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) {
//       await sendImageToBackend(imageSrc);
//     }
//     navigateToAnotherRoute();
//     audio.play(); // Always navigate after capturing
//   };

//   const sendImageToBackend = async (imageSrc) => {
//     // Convert base64 to a Blob
//     const base64Response = await fetch(imageSrc);
//     const blob = await base64Response.blob();
  
//     const formData = new FormData();
//     formData.append('file', blob, 'image.jpg');  // Append blob to formData with a filename
  
//     try {
//       const response = await fetch('http://127.0.0.1:5000/upload', {
//         method: 'POST',
//         body: formData,  // Send formData
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         console.log('Image uploaded successfully', data);
//         setIsImageUploaded(true);
//       } else {
//         console.error('Failed to upload image');
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   const navigateToAnotherRoute = () => {
//     navigate('/Page3');
//   };

//     useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.key === '2') {
//         const button = document.getElementById('myButton');
//         if (button) {
//           button.click();
//         }
//       }
//     };
//     document.addEventListener('keydown', handleKeyPress);
//     // Clean up event listener when component unmounts
//     return () => {
//       document.removeEventListener('keydown', handleKeyPress);
//     };
//   }, []); // Empty dependency array means this effect runs only once after the component mounts

//   const handleClick = () => {
//     // Handle button click
//     console.log('Button clicked!');
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//         const formData = new FormData();
//         formData.append('file', file); // Directly append the file object

//         sendImageToBackend(formData); // Reuse the sendImageToBackend function
//     }
// };

//   return (
//     <div>
//       <div>
//       <h1 style={{textAlign:'center', padding:0}}>
//       Create examples of what a sandwich or pizza looks like using the available ingredients and toppings.
//                 </h1>
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'center'}}>
//         <Webcam style={{top:0, width: '60%', height: '60%', justifyContent: 'center'}}
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           width={640}
//           height={480}
//         />
//         <img
//           src={png}
//           alt="Overlay Image"
//           style={{
//             position: 'absolute',
//             width: '60%', height: 'auto',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             pointerEvents: 'none' // Allow clicking through the image
//           }}
//         />
//       </div>
//       <div>
//         <h1 style={{textAlign:'center', padding:0, marginBottom: '10px'}}>
//       Tap the “Train” button once you feel ready to feed the created dataset into the computer.
//                 </h1>
//       </div>        
//       <div>
//       <input
//         type="file"
//         onChange={handleFileChange}
//         multiple ={false}
//         accept="image/png, image/jpeg, image/gif, image/jpeg"
//         style={{ width: '200px', height: '60px', marginLeft: '625px' }}
//       />
//       </div>
//       <button id="myButton" onClick={captureAndNavigate}></button>
//       {isImageUploaded && (
//         <Link to="/Page3"></Link>
//       )}
//     </div>
//   );
// };

// export default CameraComponent;

import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

import Stack from '@mui/material/Stack';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// CameraComponent: Component to handle webcam interactions and navigation
const CameraComponent = () => {
  // State and ref setup
  const [audio] = useState(new Audio('../test.mp3')); // Loading an audio file to be played
  const webcamRef = useRef(null); // Reference to the webcam component
  const navigate = useNavigate(); // Hook to navigate between routes
  const [isImageUploaded, setIsImageUploaded] = useState(false); // State to track if the image has been uploaded
  const [showProgressBar, setShowProgressBar] = useState(false);

  // Function to capture an image from the webcam and navigate to another page
  const captureAndNavigate = async () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture screenshot from webcam
    if (imageSrc) {
      await sendImageToBackend(imageSrc); // Send captured image to backend
    }
    navigate('/Page3'); // Navigate to another route
    audio.play(); // Play audio after navigation
  };

  // Function to send image to backend
  const sendImageToBackend = async (imageSrc) => {
    const base64Response = await fetch(imageSrc);
    const blob = await base64Response.blob(); // Convert base64 image URL to blob

    const formData = new FormData();
    formData.append('file', blob, 'image.jpg'); // Append blob to form data with filename

    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData, // Send formData via POST
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully', data);
        setIsImageUploaded(true); // Update state to reflect successful upload
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // // useEffect to attach and clean up the keyboard event listener
  // useEffect(() => {
  //   const handleKeyPress = (event) => {
  //     if (event.key === '2') {
  //       captureAndNavigate(); // Call captureAndNavigate function on pressing '2'
  //     }
  //   };
  //   document.addEventListener('keydown', handleKeyPress); // Add event listener for key press

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyPress); // Clean up event listener
  //   };
  // }, [captureAndNavigate]); // Ensure function dependency is handled correctly

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '2') {
        setShowProgressBar(true); // Show progress bar
        captureAndNavigate(); // Capture and navigate immediately
        setTimeout(() => {
          setShowProgressBar(false); // Hide progress bar after 3 seconds
        }, 3000);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Added empty dependency array to ensure the effect runs only once

//   return (
//     <div>
//       <h1 style={{textAlign:'center'}}>Create examples of sandwiches or pizzas using available ingredients and toppings.</h1>
//       <div style={{ display: 'flex', justifyContent: 'center'}}>
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           width={640}
//           height={480}
//           style={{ width: '60%', height: '60%', justifyContent: 'center' }}
//         />
//       </div>
//       <h1 style={{textAlign:'center', marginBottom: '10px'}}>Tap the “Train” button once you are ready.</h1>
//       {/* <input
//         type="file"
//         onChange={(event) => {
//           const file = event.target.files[0];
//           if (file) {
//             const formData = new FormData();
//             formData.append('file', file);
//             sendImageToBackend(formData); // Reuse sendImageToBackend function for file input
//           }3
//         }}
//         accept="image/png, image/jpeg, image/gif, image/jpeg"
//         style={{ width: '200px', height: '60px', marginLeft: '625px' }}
//       /> */}
//       {isImageUploaded && (
//         <button onClick={() => navigate('/Page3')}>Go to Page 3</button> // Button to navigate manually (optional)
//       )}
//     </div>
//   );
// };

  return (
    <div>
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Paper
          id="hero"
          sx={{
            width: '100%',
            height: '1200px',
            backgroundImage: 'linear-gradient(180deg, #FFFFFF, #FDDA4B)',
            backgroundSize: '100% 120%',
            backgroundRepeat: 'no-repeat',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Stack useFlexGap sx={{ width: { xs: '100%', sm: '100%' } }}>
            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: '#FF9D00',
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  fontWeight: "bold",
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontSize: 'clamp(1.9rem, 10vw, 1.5rem)',
                  color: '#FFFFFF',
                  
                }}
              >
                Create examples of what a &nbsp;
                <Typography
                  component="span"
                  sx={{
                    fontSize: 'clamp(1.9rem, 10vw, 1.5rem)',
                    fontWeight: "bold",
                    color: '#000000',
                  }}
                >
                  Sandwich or Pizza&nbsp;
                </Typography>
                looks like using the available ingredients and toppings.
              </Typography>
            </Paper>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Webcam
                style={{ top: 0, width: '70%', height: '70%', justifyContent: 'center', padding: '10px' }}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={640}
                height={480}
              />
            </div>
            <Paper
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontWeight: "bold",
                  fontSize: 'clamp(1.9rem, 10vw, 1.5rem)',
                  color: '#000000',
                }}
              >
                Tap the&nbsp;
                <Typography
                  component="span"
                  sx={{
                    fontSize: 'clamp(1.9rem, 10vw, 1.5rem)',
                    color: '#FF9D00',
                    fontWeight: "bold",
                  }}
                >
                  “Train”&nbsp;
                </Typography>
                button once you feel ready to feed the created dataset into the computer.
              </Typography>
            </Paper>
          </Stack>
        </Paper>
      </Box>
      <button id="myButton" onClick={captureAndNavigate}>Train</button>
      {isImageUploaded && (
        <button onClick={() => navigate('/Page3')}>Go to Page 3</button>
      )}
    </div>
  );
  };

export default CameraComponent;
