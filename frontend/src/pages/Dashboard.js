import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';

function App() {

  const navigate = useNavigate();

  const handleCadastrarMercadoria = () => {
    navigate('/mercadoria');
    console.log('Cadastrar Mercadoria');
  };

  const handleCadastrarEntrada = () => {
    // Adicione a lógica para lidar com o botão "Cadastrar Entrada"
    console.log('Cadastrar Entrada');
    navigate('/Entradas');
  };

  const handleCadastrarSaida = () => {
    // Adicione a lógica para lidar com o botão "Cadastrar Saída"
    console.log('Cadastrar Saída');
    navigate('/Saidas');
  };


  const handleAnalisarGraficos = () => {
    // Adicione a lógica para lidar com o botão "Cadastrar Saída"
    console.log('Cadastrar Saída');
    navigate('/Graficos');
  };

  const listmenu = [{
    itemlist: 'Cadastrar Mercadoria',
    func: handleCadastrarMercadoria,
  },{
    itemlist: 'Cadastrar Entrada',
    func: handleCadastrarEntrada,
  },{
    itemlist: 'Cadastrar Saída',
    func: handleCadastrarSaida,
  },{
    itemlist: 'Analise de Graficos',
    func: handleAnalisarGraficos,
  }
]

  return (
    <div className="App">
      <h1>Menu</h1>
      {listmenu.map(item => (
        <Button onClick={item.func} props={item.itemlist}/>
      ))}
    </div>
  );
}

export default App;
