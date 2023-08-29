// components/ProductForm.js

import React, { useState, useEffect } from 'react';
import api from '../api';
import BRCurrencyInput from './UI/BRCurrencyInput';
import DefaultForm from './DefaultForm';
import styled from 'styled-components';
import { useParams } from "react-router-dom";

const StyledInput = styled.input`
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
`;

const ProductForm = () => {
    const { idt } = useParams();
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        cost: 0,
        stock: 0,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (idt) {
            const fetchProduct = async () => {
                try {
                    const response = await api.get(`/book/${idt}`);
                    setProductData(response.data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchProduct();
        }
    }, [idt]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (idt) {
                await api.put(`/book/${idt}`, productData);
            } else {
                await api.post('/book', productData);
            }
            setIsLoading(false);
            setIsSuccess(true);
            setErrorMessage('');
        } catch (error) {
            setIsLoading(false);
            setIsSuccess(false);
            setErrorMessage('Erro ao salvar produto. Por favor, tente novamente.');
        }
    };
    function currencyNumber(value) {
        var formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    
        return formatter.format(1 * value)
    }
    return (
        <DefaultForm title={idt ? 'Editar Produto' : 'Criar Produto'} isLoading={isLoading} isSuccess={isSuccess} errorMessage={errorMessage}>
            <form onSubmit={handleSubmit}>
                <StyledLabel htmlFor="title">Título:</StyledLabel>
                <StyledInput
                    type="text"
                    id="title"
                    name="title"
                    value={productData.title}
                    onChange={handleChange}
                />

                <StyledLabel htmlFor="description">Descrição:</StyledLabel>
                <StyledInput
                    type="text"
                    id="description"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                />

                <StyledLabel htmlFor="cost">Custo Unitário (R$):</StyledLabel>
{/*                 <StyledInput
                    type="number"
                    step="0.01"
                    id="cost"
                    name="cost"
                    value={productData.cost}
                    onChange={handleChange}
                /> */}

                <BRCurrencyInput
                id="cost"
                name="cost"
                    mudaValor={(valor) => { handleChange({target:{ name:'cost', value:valor }}) }}
                    valorReal={productData.cost}
                    brValor={productData.cost && currencyNumber(productData.cost)} />


                <StyledLabel htmlFor="stock">Estoque:</StyledLabel>
                <StyledInput
                    type="number"
                    id="stock"
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
                />

                <StyledButton type="submit">{idt ? 'Salvar' : 'Criar'}</StyledButton>
            </form>
        </DefaultForm>
    );
};

export default ProductForm;
