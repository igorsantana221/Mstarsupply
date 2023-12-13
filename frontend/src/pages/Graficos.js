import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const App = () => {
    const [dadosEntradas, setDadosEntradas] = useState([]);
    const [dadosSaidas, setDadosSaidas] = useState([]);

    const getDados = async (ano, mes, tipo) => {
        try {
            const url = `http://localhost:5000/${tipo}/mes/${ano}/${mes}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar dados da API (${tipo})`, error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const dataAtual = new Date();
            const anoAtual = dataAtual.getFullYear();
            const mesAtual = dataAtual.getMonth() + 1;

            const dadosEntrada = await getDados(anoAtual, mesAtual, 'entradas');
            const dadosSaida = await getDados(anoAtual, mesAtual, 'saidas');

            setDadosEntradas(dadosEntrada);
            setDadosSaidas(dadosSaida);
        };

        fetchData();
    }, []);

    const downloadPdf = () => {
        const input = document.body; // Ou uma referência mais específica aos gráficos
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("graficos.pdf");
            });
    };

    const Grafico = ({ dados, titulo, corFundo }) => {
        const data = {
            labels: dados.map(d => d.local),
            datasets: [
                {
                    label: titulo,
                    data: dados.map(d => d.quantidade),
                    backgroundColor: corFundo,
                },
            ],
        };

        const options = {
            maintainAspectRatio: false,
        };

        return (
            <div style={{ width: '500px', height: '300px' }}>
                <Bar data={data} options={options} />
            </div>
        );
    };

    return (
        <div>
            <h1>Gráficos de Movimentações</h1>
            <div style={{ marginBottom: '20px' }}>
                <Grafico dados={dadosEntradas} titulo="Quantidade de Entradas" corFundo='rgba(54, 162, 235, 0.5)' />
            </div>
            <div>
                <Grafico dados={dadosSaidas} titulo="Quantidade de Saídas" corFundo='rgba(255, 99, 132, 0.5)' />
            </div>
            {/* Botão para baixar os gráficos como PDF */}
            <button onClick={downloadPdf}>Baixar Gráficos em PDF</button>
        </div>
    );
};

export default App;
