import React, { useState } from 'react';
import axios from 'axios';
import api from '../api';

const SaleForm = () => {
    const [saleData, setSaleData] = useState({
        type: "book", // default to book sale
        paymentMethod: "",
        customerName: "",
        saleTime: new Date(),
        product: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/sale', saleData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={saleData.type} onChange={e => setSaleData({ ...saleData, type: e.target.value })}>
                <option value="book">Book</option>
                <option value="canteen">Canteen</option>
            </select>
            {/* Form fields for sale data */}
            <button type="submit">Create Sale</button>
        </form>
    );
};

export default SaleForm;
