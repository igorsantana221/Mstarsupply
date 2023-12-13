// C:\react-js\myreactdev\src\App.js
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Mercadoria from "./pages/Mercadoria";
import Entradas from "./pages/Entradas"
import Saidas from "./pages/Saidas"
import Graficos from "./pages/Graficos"



function App() {
  return (
    <div className="vh-100 gradient-custom alieng ">
      <div className="container ">
        <h1 className="page-header">Projeto Logistica - MStarSupply</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />,
            <Route path="/" element={<Dashboard />} />,
            <Route path="/Mercadoria" element={<Mercadoria />} />
            <Route path="/Entradas" element={<Entradas />} />
            <Route path="/Saidas" element={<Saidas />} />
            <Route path="/Graficos" element={<Graficos />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
