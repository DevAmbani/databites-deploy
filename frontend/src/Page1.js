// Page1.js
import React from 'react';
import { Link } from 'react-router-dom';
import  { useEffect, useState } from 'react';
import image1 from './1.png';
import Typography from '@mui/material/Typography'; 
import Container from '@mui/material/Container'; 
import { Paper } from '@mui/material'; 


const Page1 = () => {
  const [audio] = useState(new Audio('../test.mp3'));
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '1') {
        // Assuming the button has an id or unique selector
        const button = document.getElementById('myButton');
        if (button) {
          button.click();
        }
      }
      audio.play();
    };

    // Add event listener for key press
    document.addEventListener('keydown', handleKeyPress);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  // const handleClick = () => {
  //   // Handle button click
  //   console.log('Button clicked!');
  // };
  

//   return (
        
//           <div>
//               <div>
//                 <h1 style={{textAlign:'center', padding:30, marginBottom: '10px'}}>
//                   Welcome to DataBites! Explore the world of machine learning, where computers learn
// from examples to identify patterns, empowering them to make informed decisions.
//                 </h1>
//               </div>
//               <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <img src={image1} alt='img1' style={{ display: 'block', width: '45vw', height: 'auto'}}></img>
//               </div>
//               <div>
//                 <h1 style={{textAlign:'center', padding:30, marginBottom: '10px'}}>Tap the “Start” button to begin creating a dataset.</h1></div>
//               <div>
//         <Link to="/Page2">
//             <button id="myButton" ></button>
//         </Link>
//         </div>
//       </div>
//     );
//   };
  
  return (   
    <div> 
        <div>
        <Paper
  id="hero"
  sx={(theme) => ({
  width: '100%',
  height: '1200px',
  backgroundImage: 'linear-gradient(180deg, #FFFFFF, #FDDA4B)',
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  })}
  >

      <Container
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pt: { xs: 4, sm: 8 },
    pb: { xs: 4, sm: 8 },
  }}
  >

    <Typography
      variant="h1"
      fontWeight="bold"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 'clamp(3.5rem, 10vw, 4rem)',
        color : '#262128',
      }}
    >
      Welcome to&nbsp;
      <Typography
        component="span"
        variant="h1"
        fontWeight="bold"
        sx={{
          fontSize: 'clamp(3rem, 10vw, 4rem)',
          color : '#FF9D00',
        }}
      >
        DataBites!
      </Typography>
    </Typography>
    <Typography
      textAlign="center"
      color="text.secondary"
      fontSize= 'clamp(2rem, 1vw, 5rem)'
      fontWeight="bold"
      sx={{ alignSelf: 'center', width: { sm: '100%', md: '100%' } }}
    >
      Explore the world of machine learning, where computers learn
  from examples to identify patterns, empowering them to make informed decisions.
    </Typography>


  <img src={image1} alt='img1' style={{ width: '50vw', height: 'auto'}}></img>


      </Container>

  </Paper>
  <Link to="/Page2">
      <button id="myButton" ></button>
  </Link>
  </div>
  </div>
  );
  };
  

export default Page1;
