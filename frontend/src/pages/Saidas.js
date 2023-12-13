//C:\react-js\myreactdev\src\pages\CreateUser.js
import React, { useState  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
export default function CreateUser(){
  
    const navigate = useNavigate();
  
    const [inputs, setInputs] = useState([]);
  
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
  
        axios.post('http://127.0.0.1:5000/saidas', inputs)
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
                <h1>Saida de Materiais</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label>Quantidade</label>
                      <input type="text" className="form-control" name="quantidade" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label>Local</label>
                      <input type="text" className="form-control" name="local" onChange={handleChange} />
                    </div>   
                    <div className="mb-3">
                      <label>Mercadoria_id</label>
                      <input type="text" className="form-control" name="mercadoria_id" onChange={handleChange} />
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