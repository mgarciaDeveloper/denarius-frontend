// SalesSection.js

import React, { useState, useEffect } from 'react';
import api from '../api';
import SaleForm from './SaleForm';
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
            <SaleForm eventId={eventId} />
        </div>
    );

};

export default SalesSection;
