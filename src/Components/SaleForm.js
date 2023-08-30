import React, { useState, useEffect } from 'react';
import api from '../api';
import styled from 'styled-components';

import DefaultForm from './DefaultForm';

const StyledInput = styled.input`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    width: 100%;
    margin-bottom: 1rem;
`;

const StyledSelect = styled.select`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    width: 100%;
    margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
`;

const StyledButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
}`;

const StyledHelperText = styled.p`
    font-size: 12px;
    color: #888;
`;

const SaleForm = ({eventId}) => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        type: 'Livraria', // Define o valor padrão para 'Livraria'
        paymentMethod: 'Dinheiro', // Adicione a opção padrão aqui
        customerName: '',
        saleTime: new Date(), // Define a data e hora atual no formato do input
        description: '',
        amount: '',
        productId: '',
        eventId: eventId, // Se desejar adicionar um campo de evento
        product: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Fetch the list of products
        api.get('/book').then(response => {
            setProducts(response.data);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Se o campo alterado for 'productId', encontre o produto selecionado
        if (name === 'productId') {
            const selectedProduct = products.find(product => product._id === value);

            // Define o produto selecionado e suas propriedades
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
                product: selectedProduct,
                description: selectedProduct ? selectedProduct.description : '',
                type: selectedProduct ?
                    selectedProduct.description == 'Ficha de cantina'
                        ? 'Ficha de cantina'
                        : "Livraria"
                    : '',
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Create a new sale with the form data
            const response = await api.post('/sale', formData);

            // Update the product stock if the sale is of type 'book'
            if (formData.type === 'Livraria') {
                const productId = formData.productId;
                const amount = parseFloat(formData.amount);
                const product = products.find(product => product._id === productId);
                const updatedStock = product.stock - amount;

                // Update the product stock using the API
                await api.put(`/book/${productId}`, { ...product, stock: updatedStock });
            }

            setIsLoading(false);
            setIsSuccess(true);
            setErrorMessage('');

            // Clear the form data after successful submission
            setFormData({
                type: 'Livraria', // Define o valor padrão para 'Livraria'
                paymentMethod: 'Dinheiro', // Adicione a opção padrão aqui
                customerName: '',
                saleTime: new Date(), // Define novamente como a data e hora atual
                description: '',
                amount: '',
                productId: '',
                eventId: eventId, // Se desejar adicionar um campo de evento
                product: null,
            });

            setTimeout(() => {
                setIsSuccess(false);
            }, 2000);
        } catch (error) {
            setIsLoading(false);
            setIsSuccess(false);
            setErrorMessage('Error creating sale. Please try again.');
        }

    };


    return (
        <DefaultForm noHeader={true} title="Cadastro de Venda" isLoading={isLoading} isSuccess={isSuccess} errorMessage={errorMessage}>
    
            <form onSubmit={handleSubmit}>


                <StyledLabel htmlFor="productId">Product:</StyledLabel >
                <StyledSelect id="productId" name="productId" value={formData.productId} onChange={handleChange}>
                    <option value="">Select a product</option>
                    {products.map(product => (
                        <option key={product._id} value={product._id}>{product.title}</option>
                    ))}
                </StyledSelect>
                {formData.product && (
                    <StyledHelperText>
                        Este produto custa R${(formData.product ? formData.product.cost : 0).toFixed(2)}
                    </StyledHelperText>
                )}

                <StyledLabel htmlFor="description">Descrição:</StyledLabel>
                <StyledInput
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    disabled
                />
                <StyledLabel htmlFor="type">Tipo:</StyledLabel>
                <StyledInput id="type" name="type" value={formData.type} disabled />



                <StyledLabel htmlFor="customerName">Nome do Cliente:</StyledLabel>
                <StyledInput
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                />


                <StyledLabel htmlFor="paymentMethod">Método de Pagamento:</StyledLabel>
                <StyledSelect
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                >
                    <option value="">Selecione o método de pagamento</option>
                    <option value="PIX">PIX</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Cartão">Cartão</option>
                </StyledSelect>



                <StyledLabel htmlFor="amount">Quantidade:</StyledLabel>
                <StyledInput
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                />


                <StyledLabel>Valor Total da Venda: R${(formData.product ? formData.amount * formData.product.cost : 0).toFixed(2)}</StyledLabel>

                <StyledButton type="submit">Create Sale</StyledButton >
            </form>
        </DefaultForm>
    );
};

export default SaleForm;
