import { Box, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DisplayCard from './DisplayCard'
import {app} from "../firebase/fb"
import { getDatabase, ref, onValue } from "firebase/database";
import useRTDB from '../firebase/useRTDB';


const Dashboard = () => {

    const [data, write] = useRTDB()
    

  return (
    <Paper>

    <Box
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        p="100px"
        borderRadius={0}
        >
        <DisplayCard min="60" max="15" val={data.Temperature} label = "Temperature" />
        <DisplayCard min="140" max="0" val={data.Humidity}  label = "Humidity" />
        <DisplayCard min="500" max="60" val={data.Air_Quality} label = "Air Quality" />
    </Box>
    </Paper>
  )
}

export default Dashboard