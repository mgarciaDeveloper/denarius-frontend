// SalesSection.js

import React, { useState, useEffect } from 'react';
import api from '../api';

const SalesSection = ({ eventId }) => {
    const [sales, setSales] = useState([]);
    const [newSaleData, setNewSaleData] = useState({
        amount: 0,
        description: '',
    });
    const fetchSales = async () => {
        try {
            const response = await api.get(`/event/${eventId}/sales`);
            setSales(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {

        fetchSales();
    }, [eventId]);

    const handleNewSaleChange = (e) => {
        const { name, value } = e.target;
        setNewSaleData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNewSaleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/event/${eventId}/sales`, newSaleData);
            // Atualize as vendas após cadastrar uma nova venda
            fetchSales();
            // Limpe os dados do novo formulário de venda
            setNewSaleData({
                amount: 0,
                description: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    // SalesSection.js

    // ...

    return (
        <div>
            <h2>Lista de Vendas</h2>
            <ul>
                {sales.map(sale => (
                    <li key={sale._id}>
                        {sale.amount} - {sale.description}
                    </li>
                ))}
            </ul>
            <h2>Cadastrar Nova Venda</h2>
            <form onSubmit={handleNewSaleSubmit}>
                <input
                    type="number"
                    name="amount"
                    value={newSaleData.amount}
                    onChange={handleNewSaleChange}
                />
                <input
                    type="text"
                    name="description"
                    value={newSaleData.description}
                    onChange={handleNewSaleChange}
                />
                <button type="submit">Cadastrar Venda</button>
            </form>
        </div>
    );

};

export default SalesSection;
