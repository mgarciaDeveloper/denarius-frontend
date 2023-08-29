// components/ProductList.js

import React, { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DefaultForm from './DefaultForm';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';


const StyledLink = styled(Link)`
    display: inline-block;
    background-color: #007BFF;
    color: white;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ccc;
    margin-top: 1rem;
`;

const StyledTh = styled.th`
    background-color: #f2f2f2;
    padding: 0.5rem;
    text-align: left;
`;

const StyledTd = styled.td`
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;
`;

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Set initial isLoading to true

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/book');
                setProducts(response.data);
                setIsLoading(false); // Set isLoading to false after fetching data
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <DefaultForm title={'Lista de Produtos'} isLoading={isLoading} isSuccess={false} errorMessage={''}>
                <StyledLink to="/product/create">Criar Produto</StyledLink>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTh>Title</StyledTh>
                            <StyledTh>Description</StyledTh>
                            <StyledTh>Cost</StyledTh>
                            <StyledTh>Stock</StyledTh>
                            <StyledTh>Actions</StyledTh>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <StyledTd>{product.title}</StyledTd>
                                <StyledTd>{product.description}</StyledTd>
                                <StyledTd>R$ {product.cost ? product.cost.toFixed(2): '0,00'}</StyledTd>
                                <StyledTd>{product.stock}</StyledTd>
                                <StyledTd>
                                    <Link to={`/product/${product._id}`}>
                                    <IconButton><EditIcon /></IconButton>
                                    </Link>
                                </StyledTd>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </DefaultForm>
        </div>
    );
};

export default ProductList;
