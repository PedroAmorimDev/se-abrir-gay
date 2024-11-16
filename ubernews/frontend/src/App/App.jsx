import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cadastro from '../components/Cadastro';
import Lista from '../components/Lista';
import Sobre from '../components/Sobre';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/"><h1>UBERNEWS</h1></Link>
          <div id='menu'>
            <Link to="/sobre">Sobre</Link>
            <Link to="/lista">Eventos</Link>
            <Link to="/cadastro">Cadastro</Link>
          </div>
            <div id='menu2'>
              <Link to="/lista">Contato</Link>
              <Link to="/lista">Carreira</Link>
            </div>
        </nav>
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/lista" element={<Lista />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
