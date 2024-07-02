import React from "react";


const ImageGrid = ({ images }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
      {images.map((image) => (
        <div key={image.id}>
          <img
            src={image.url} // assuming each image object has a 'url' property
            alt={`Image ${image.id}`}
            style={{ width: "80%", height: "auto", borderRadius:5, boxShadow:'10%'}}
          />
          <p style={{fontSize:'12px', padding:0, marginTop:0}}>Confidence Score {image.id} %</p>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
