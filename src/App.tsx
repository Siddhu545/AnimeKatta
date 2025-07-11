import React from 'react';
import { AnimeList } from './pages/AnimeList';
import { Route, Routes } from 'react-router-dom';
import { Anime } from './pages/Anime';
import { ErrorToast } from './componets/ErrorToast';

function App() {
  return (
    <><Routes>
      <Route path="/" element={<AnimeList />} />
      <Route path="/anime/:id" element={<Anime />} />
    </Routes><ErrorToast /></>
  );
}

export default App;
