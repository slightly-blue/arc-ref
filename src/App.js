import './App.css'
import SideBar from './components/sideBar'
//import CreateReference from './components/create_reference'
import TopBar from './components/topBar'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Bibliography from './components/bibliography';

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
        <Bibliography/>
        {/* <CreateReference /> */}
      </div>
    </ThemeProvider>
  )
}

export default App
