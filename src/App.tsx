import React from 'react';
import logo from './logo.svg';
import './App.css';
import CharacterList from './components/CharacterList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CharacterDetail from './components/CharacterDetail';
import NoInfoPage from './components/NoInfoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CharacterList/>}/>
          {/* <Route index element={<Home />} /> */}
   

          <Route path="detail/:characterId" element={<CharacterDetail />} />
          <Route path="*" element={<NoInfoPage/>} /> 
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
