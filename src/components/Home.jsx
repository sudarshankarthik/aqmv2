import React, { useEffect, useState } from "react";
import useRTDB from "../firebase/useRTDB";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Input,
  InputAdornment,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AirIcon from "@mui/icons-material/Air";
import { Label } from "@mui/icons-material";

const Home = () => {
  const [data, write] = useRTDB();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [isAuto, setIsAuto] = useState(true);
  const [isAC, setIsAC] = useState(false);
  const [isAP, setIsAP] = useState(true);

  // TO Do: refractor code seperate into functions so on user press RTDB changes
  useEffect(() => {
    console.log("effect runnning", isAuto);
    if (isAuto === true) {
      console.log("running ... ");
      if (data.Temperature > 30 || data.Humidity > 50) {
        console.log("ac on");
        write("/devices/AC", true);
        setIsAC(true);
      } else {
        console.log("ac off");
        write("/devices/AC", false);
        setIsAC(false);
      }
      if (data.Air_Quality > 150) {
        console.log("AP on");
        write("/devices/AP", true);
        setIsAP(true);
      } else {
        console.log("AP off");
        write("/devices/AP", false);
        setIsAP(false);
      }
    }
  }, [data, isAuto]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="50px"
      >
        <FormGroup>
          <Box>
            <FormControlLabel
              control={
                <Switch
                  onChange={() => setIsAuto((cntState) => !cntState)}
                  checked={isAuto}
                />
              }
              label="Auto Control"
            />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            padding="1rem"
            gap="0.5rem"
          >
            <FormControlLabel
              label="AC"
              control={
                <Checkbox
                  {...label}
                  icon={<AcUnitIcon />}
                  checkedIcon={<AcUnitIcon />}
                  checked={isAC}
                  onChange={() => setIsAC((cntState) => !cntState)}
                />
              }
            />
            <FormControlLabel
              label="Air Purifier"
              control={
                <Checkbox
                  {...label}
                  icon={<AirIcon />}
                  checkedIcon={<AirIcon />}
                  checked={isAP}
                  onChange={() => setIsAP((cntState) => !cntState)}
                />
              }
            />
          </Box>
        </FormGroup>
      </Box>
    </>
  );
};

export default Home;
