import './App.css'
import SideBar from './components/sideBar'
//import CreateReference from './components/create_reference'
import TopBar from './components/topBar'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Bibliography from './components/bibliography';
import React from 'react';

const handleLoad = async () => {
  const foo = await window.electronAPI.getStoreValue('foo')
  console.log(foo)
  
}
handleLoad()

// const foo = await window.electronAPI.setStoreValue(
//   {
//     projects: [
//       {
//         name: "test",
//         citations: [
//           {
//             title: undefined,
//             type: undefined,
//             authors: undefined,
//             published_date: undefined,
//             journal: undefined,
//             publisher: undefined,
//             volume_no: undefined,
//             issue_no: undefined,
//             pages_used: undefined,
//             doi: undefined,
//             database: undefined,
//             URL: undefined,
//             access_date: undefined,
//             html: undefined,
//           }
//         ]
//       }
//     ]
//   }
// )


const theme = createTheme({
  palette: {
    primary: {
      main: '#28572A',
    },
    secondary: {
      main: '#1E4721',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
        <div className="App">
          <TopBar />
          <SideBar />
          <Bibliography />
        </div>
    </ThemeProvider>
  )
}

export default App
