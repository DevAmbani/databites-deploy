import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageGrid from "./ImageGrid";
import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from "@mui/material";

const ImageGallery = () => {
  const [images1, setImages1] = useState([]);
  const [images2, setImages2] = useState([]);
  const [audio] = useState(new Audio('../test.mp3'));
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const { data } = await axios.post("http://127.0.0.1:5000/upload", {
  //         image: "/backend/TrialImage.jpg" // Ensure to provide the image data
  //       });
  //       setImages1(data.pr); // Assuming 'pr' is a list of image data for pizzas
  //       setImages2(data.sr); // Assuming 'sr' is a list of image data for sandwiches
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //     }
  //   };
  //   fetchImages();
  // }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:5000/results"); 
        console.log(data)
        setImages1(data.pizza_results); 
        setImages2(data.sandwich_results);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);


  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '3') {
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

  const handleClick = () => {
    // Handle button click
    console.log('Button clicked!');
  };
  const verticalLineStyle = {
    borderLeft: '50px solid black', // Adjust thickness and color as needed
    height: '100%' // Adjust height as needed
  };

  const getBackgroundColor = (confidence) => {
    if (confidence > 75) {
      return 'orange';
    } else if (confidence >= 70 && confidence <= 75) {
      return 'orange';
    } else {
      return 'orange';
    }
  };

  console.log(images1)
  console.log(images2)

//   return (
//     <div >
//       <div style={{textAlign:'center', padding:0}}>
//         <h1>Based on your dataset, the computer has classified these images as sandwiches or pizzas.</h1>
//       </div>
//       <div style={{ display: "flex" }}>
//         {/* <div style={{ flex: 1 }}>
//           <h2 style={{textAlign:'center', padding:0}}>Pizzas</h2>
//           <ImageGrid images={images1} />
//         </div> */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
//           {images1.map((item, index) => (
//             <div key={index} style={{ marginBottom: '20px' }}>
//               <img src={`http://127.0.0.1:5000/images/${item[0].split('/')[1]}`} alt={`Result ${index}`} style={{ width: '100%', height: 'auto' }} />
//               <p>Confidence: {item[1]}%</p> 
//             </div>
//           ))}
//         </div>

//         <div style={verticalLineStyle}></div>
//         {/* <div style={{ flex: 1 }}>
//           <h2 style={{textAlign:'center', padding:0}}>Sandwiches</h2>
//           <ImageGrid images={images2} />
//         </div> */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
//         {images2.map((item, index) => (
//             <div key={index} style={{ marginBottom: '20px' }}>
//               <img src={`http://127.0.0.1:5000/images/${item[0].split('/')[1]}`} alt={`Result ${index}`} style={{ width: '100%', height: 'auto' }} />
//               <p>Confidence: {item[1]}%</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div style={{textAlign:'center', padding:0}}>
//         <h1>Tap the “Refresh” button to test out a new dataset.</h1>
//       </div>
//       <div>
//         <Link to="/Page1">
//             <button id="myButton"> </button>
//         </Link>
//         </div>
//     </div>
//   );
// };


  // return (
  //   <div>
  //     <Paper
  //       id="hero"
  //       sx={(theme) => ({
  //         width: '100%',
  //         height: '1000px',
  //         backgroundImage: 'linear-gradient(180deg, #FFFFFF, #FDDA4B)',
  //         backgroundSize: '100% 120%',
  //         backgroundRepeat: 'no-repeat',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         textAlign: 'center',
  //       })}
  //     >
  //       <Container
  //         sx={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //           alignItems: 'center',
  //         }}
  //       >
  //         <div style={{textAlign:'center', padding:0}}>
  //           <Paper> 
  //             <Typography
  //               sx={{
  //                 display: 'flex',
  //                 fontWeight: "bold",
  //                 alignSelf: 'center',
  //                 textAlign: 'center',
  //                 fontSize: 'clamp(1.6rem, 10vw, 1.6rem)',
  //                 color: '#FFFFFF',
  //                 backgroundColor: '#FF9D00'
  //               }}
  //             >
  //               Based on your dataset, the computer has classified these images as&nbsp;
  //               <Typography
  //                 component="span"
  //                 sx={{
  //                   fontSize: 'clamp(1.6rem, 10vw, 1.6rem)',
  //                   alignSelf: 'center',
  //                   textAlign: 'center',
  //                   fontWeight: "bold",
  //                   color: '#000000',
  //                 }}
  //               >
  //                 Sandwiches or Pizzas.&nbsp; 
  //               </Typography>
  //             </Typography>
  //           </Paper> 
  //         </div>

  //         <div style={{ display: "flex" }}>
  //           <div style={{ flex: 1 }}>
  //             <Typography variant="h6" style={{textAlign:'center', padding:0}}>Pizzas</Typography>
  //             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
  //               {images1.map((item, index) => (
  //                 <div key={index} style={{ marginBottom: '20px' }}>
  //                   <img src={`http://127.0.0.1:5000/images/${item[0].split('/')[1]}`} alt={`Result ${index}`} style={{ width: '100%', height: 'auto' }} />
  //                   <p>Confidence: {item[1]}%</p>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //           <div style={verticalLineStyle}></div>
  //           <div style={{ flex: 1 }}>
  //             <Typography variant="h6" style={{textAlign:'center', padding:0}}>Sandwiches</Typography>
  //             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
  //               {images2.map((item, index) => (
  //                 <div key={index} style={{ marginBottom: '20px' }}>
  //                   <img src={`http://127.0.0.1:5000/images/${item[0].split('/')[1]}`} alt={`Result ${index}`} style={{ width: '100%', height: 'auto' }} />
  //                   <p>Confidence: {item[1]}%</p>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </div>
  //         <div style={{textAlign:'center', padding:0}}>
  //           <Paper>   
  //             <Typography
  //               sx={{
  //                 display: 'flex',
  //                 fontWeight: "bold",
  //                 alignSelf: 'center',
  //                 textAlign: 'center',
  //                 fontSize: 'clamp(1rem, 10vw, 1.6rem)',
  //                 color: '#262128',
  //               }}
  //             >
  //               Tap the&nbsp;
  //               <Typography
  //                 component="span"
  //                 sx={{
  //                   fontSize: 'clamp(1rem, 10vw, 1.6rem)',
  //                   alignSelf: 'center',
  //                   textAlign: 'center',
  //                   fontWeight: "bold",
  //                   color: '#FF9D00',
  //                 }}
  //               >
  //                 “Refresh”&nbsp; 
  //               </Typography>
  //               button to test out a new dataset.
  //             </Typography>
  //           </Paper>
  //         </div>
  //         <div>
  //           <Link to="/Page1">
  //             <button id="myButton" onClick={handleClick}> </button>
  //           </Link>
  //         </div>
  //       </Container>
  //     </Paper>
  //   </div>
  // );
  // };

  return (
    <div>
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
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ textAlign: 'center', padding: 0 }}>
            <Paper>
              <Typography
                sx={{
                  display: 'flex',
                  fontWeight: "bold",
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontSize: 'clamp(1.6rem, 10vw, 1.6rem)',
                  color: '#FFFFFF',
                  backgroundColor: '#FF9D00'
                }}
              >
                Based on your dataset, the computer has classified these images as&nbsp;
                <Typography
                  component="span"
                  sx={{
                    fontSize: 'clamp(1.6rem, 10vw, 1.6rem)',
                    alignSelf: 'center',
                    textAlign: 'center',
                    fontWeight: "bold",
                    color: '#000000',
                  }}
                >
                  Sandwiches or Pizzas.&nbsp;
                </Typography>
              </Typography>
            </Paper>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <Typography variant="h6" style={{ textAlign: 'center', padding: 0 }}>Sandwiches</Typography>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {images1.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: '20px',
                      backgroundColor: getBackgroundColor(item[1]),
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                  >
                    <img src={`http://127.0.0.1:5000/images/${item[0].split('/')[1]}`} alt={`Result ${index}`} style={{ width: '100%', height: 'auto' }} />
                    <p>Confidence: {item[1]}%</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={verticalLineStyle}></div>
            <div style={{ flex: 1 }}>
              <Typography variant="h6" style={{ textAlign: 'center', padding: 0 }}>Pizzas</Typography>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {images2.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: '20px',
                      backgroundColor: getBackgroundColor(item[1]),
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                  >
                    <img src={`http://127.0.0.1:5000/images/${item[0].split('/')[1]}`} alt={`Result ${index}`} style={{ width: '100%', height: 'auto' }} />
                    <p>Confidence: {item[1]}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: 0 }}>
            <Paper>
              <Typography
                sx={{
                  display: 'flex',
                  fontWeight: "bold",
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontSize: 'clamp(1rem, 10vw, 1.6rem)',
                  color: '#262128',
                }}
              >
                Tap the&nbsp;
                <Typography
                  component="span"
                  sx={{
                    fontSize: 'clamp(1rem, 10vw, 1.6rem)',
                    alignSelf: 'center',
                    textAlign: 'center',
                    fontWeight: "bold",
                    color: '#FF9D00',
                  }}
                >
                  “Refresh”&nbsp;
                </Typography>
                button to test out a new dataset.
              </Typography>
            </Paper>
          </div>
          <div>
            <Link to="/Page1">
              <button id="myButton" onClick={handleClick}> </button>
            </Link>
          </div>
        </Container>
      </Paper>
    </div>
  );
};

export default ImageGallery;