import React from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';

// Define the keyframes for the heartbeat animation

const DisplayCard = ({ val, min, max, label }) => {
  
  const heartbeat = keyframes`
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
  `;

    const percentage = ((val - min) / (max - min)) * 100;

    function perc2color(perc) {
        var r, g, b = 0;
        if(perc < 50) {
            r = 255;
            g = Math.round(5.1 * perc);
        }
        else {
            g = 255;
            r = Math.round(510 - 5.10 * perc);
        }
        var h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
    }

    function calculateDarkAndLight(hexColor) {
      // Remove '#' if it's included in the input
      hexColor = hexColor.replace('#', '');
  
      // Convert the hex color to RGB
      let r = parseInt(hexColor.substring(0, 2), 16);
      let g = parseInt(hexColor.substring(2, 4), 16);
      let b = parseInt(hexColor.substring(4, 6), 16);
  
      // Calculate darker color
      let darkR = Math.max(0, r - 50);
      let darkG = Math.max(0, g - 50);
      let darkB = Math.max(0, b - 50);
      let darkHex = '#' + (darkR * 65536 + darkG * 256 + darkB).toString(16).padStart(6, '0');
  
      // Calculate lighter color
      let lightR = Math.min(255, r + 50);
      let lightG = Math.min(255, g + 50);
      let lightB = Math.min(255, b + 50);
      let lightHex = '#' + (lightR * 65536 + lightG * 256 + lightB).toString(16).padStart(6, '0');
      
      let val = `linear-gradient(45deg, rgba(${darkR},${darkG},${darkB},1) 0%, rgba(${lightR},${lightG},${lightB},1) 100%);`;
      return val
    }
  


  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={200}
      flexDirection="column"
      minWidth={"20vw"}
      maxWidth={"400px"}
      borderRadius={10}
      sx={{
            background: calculateDarkAndLight(perc2color(percentage)),
            color: "#000",
            fontSize: "1.8rem",
            fontWeight: "250",
            fontFamily: "Fantasy",
            textAlign: "Center",
            "&:hover": {
              animation: `${heartbeat} ${percentage/100}s ease-in-out infinite`, // Apply heartbeat animation on hover
              cursor: "pointer"
            },
      }}
    > 
      {val} <br /> 
      {label}
    </Box>
  );
};

export default DisplayCard;
