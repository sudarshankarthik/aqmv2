import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Table from './components/Table';
import Chart from './components/Chart'; // Assuming you have a Chart component
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { firestoreDB } from './firebase/fb';
import Home from './components/Home';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [data, setData] = useState([]);
  const [cntPage, setCntPage] = useState('Home');

  const theme = isDarkMode ? 'dark' : 'light';
  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  const pages = ['Home', 'Chart', 'Table'];

  useEffect(() => {
    const getData = async () => {
      const db = firestoreDB;
      const dataRef = collection(db, 'sensor_data');

      const q = query(dataRef, orderBy('timestamp', 'desc'), limit(15));

      const querySnapshot = await getDocs(q);
      const docs = [];
      querySnapshot.forEach((doc) => docs.push(doc.data()));

      setData(docs);
      console.log("fetching data");
    };

    getData();
  }, []);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Paper>
          <Box minHeight="100vh">
            <Navbar
              mode={isDarkMode}
              changeMode={setIsDarkMode}
              pages={pages}
              changePage={setCntPage}
            />
            <Dashboard />
            {cntPage === 'Home' && <Home />}
            {cntPage === 'Table' && <Table data={data} />}
            {cntPage === 'Chart' && <Chart data={data} />}
          </Box>
        </Paper>
      </ThemeProvider>
    </>
  );
};

export default App;
