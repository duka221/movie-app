import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './components/Main';
import { Liked } from './components/Liked';
import { Watchlist } from './components/Watchlist';
import { Favorites } from './components/Favorites';
import { Header } from './components/Header';
import { Detailed } from './components/Detailed';
import { Typography } from '@mui/material';
function App() {
  return (
    <Header>
        <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/detailed/:id" element={<Detailed />} />
        <Route path="*" element={<> <Typography color="white" variant='h4'> 404 Not Found </Typography> </>} />
    </Routes>
    </Header>
    
  );
}

export default App;
