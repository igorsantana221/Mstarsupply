//C:\react-js\myreactdev\src\pages\CreateUser.js
import React, { useState  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './mercadoria.css'
 
export default function Mercadoria(){
  
    const navigate = useNavigate();
  
    const [inputs, setInputs] = useState([]);
  
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
  
        axios.post('http://127.0.0.1:5000/mercadorias', inputs)
            .then(function(response){
                console.log(response.data);
                alert('Dados enviados com sucesso!');
                navigate('/');
            })
            .catch(function(error){
                alert('Erro ao enviar os dados'); 
                console.error('Error making the request', error);
            });
    
    }
     
    return (
    <div>
        <div className="container h-100">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                <h1>Cadastrar Mercadoria</h1>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                      <label>Name</label>
                      <input type="text" className="form-control" name="name" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label>Numero Registro</label>
                      <input type="text" className="form-control" name="numero_registro" onChange={handleChange} />
                    </div>   
                    <div className="mb-3">
                      <label>Fabricante</label>
                      <input type="text" className="form-control" name="fabricante" onChange={handleChange} />
                    </div>   
                    <div className="mb-3">
                      <label>Tipo</label>
                      <input type="text" className="form-control" name="tipo" onChange={handleChange} />
                    </div>   
                    <div className="mb-3">
                      <label>Descrição</label>
                      <input type="text" className="form-control" name="descricao" onChange={handleChange} />
                    </div>   
                    <button type="submit" name="add" className="btn btn-primary">Save</button>
                </form>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    </div>
  );
}