import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../api';
import DefaultForm from './DefaultForm';
import styled from 'styled-components';
import BRCurrencyInput from './UI/BRCurrencyInput';
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

const ProductEdit = () => {
    const { idt } = useParams();

    const [productData, setProductData] = useState({
        title: '',
        description: '',
        cost: 0,
        stock: 0,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/book/${idt}`);
                setProductData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
                setErrorMessage('Error fetching product data.');
            }
        };
        fetchProduct();
    }, [idt]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateProduct = async () => {
        setIsLoading(true);
        try {
            await api.put(`/book/${idt}`, productData);
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
            }, 2000);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setErrorMessage('Error updating product data.');
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
        <DefaultForm title={'Editar Produto'} isLoading={isLoading} isSuccess={isSuccess} errorMessage={errorMessage}>
            <form>
                <StyledLabel htmlFor="title">Título:</StyledLabel>
                <StyledInput
                    type="text"
                    id="title"
                    name="title"
                    value={productData.title}
                    
                    onChange={handleInputChange}
                />

                <StyledLabel htmlFor="description">Descrição:</StyledLabel>
                <StyledInput
                    type="text"
                    id="description"
                    name="description"
                    value={productData.description}
                    
                    onChange={handleInputChange}
                />

                <StyledLabel htmlFor="cost">Custo Unitário (R$):</StyledLabel>
                <BRCurrencyInput
                id="cost"
                name="cost"
                    mudaValor={(valor) => { handleInputChange({target:{ name:'cost', value:valor }}) }}
                    valorReal={productData.cost}
                    brValor={productData.cost && currencyNumber(productData.cost)} />
                <StyledLabel htmlFor="stock">Estoque:</StyledLabel>
                <StyledInput
                    type="number"
                    id="stock"
                    name="stock"
                    value={productData.stock}
                    
                    onChange={handleInputChange}
                />

                <StyledButton type="button" onClick={handleUpdateProduct}>
                    Atualizar
                </StyledButton>
            </form>
        </DefaultForm>
    );
};

export default ProductEdit;
