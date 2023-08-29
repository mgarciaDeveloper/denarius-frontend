// EventList.js

import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import api from '../api';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DefaultForm from './DefaultForm';

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

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Set initial isLoading to true

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/event');
                const sortedEvents = response.data.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
                setEvents(sortedEvents);
                setIsLoading(false); // Set isLoading to false after fetching data
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const formatDate = (dateString) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1); // Adiciona um dia à data
        return date.toLocaleDateString('pt-BR', options);
    };

    return (
        <div>
            <DefaultForm title={'Eventos Cadastrados'} isLoading={isLoading} isSuccess={false} errorMessage={''}>
            <StyledLink to="/event/create">Criar Evento</StyledLink>
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTh>Date</StyledTh>
                            <StyledTh>Type</StyledTh>
                            <StyledTh>Number of People</StyledTh>
                            <StyledTh>Location</StyledTh>
                            <StyledTh>Actions</StyledTh>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event._id}>
                                <StyledTd>{formatDate(event.eventDate)}</StyledTd>
                                <StyledTd>{event.eventType}</StyledTd>
                                <StyledTd>{event.numberOfPeople}</StyledTd>
                                <StyledTd>{event.location}</StyledTd>
                                <StyledTd>
                                    <Link to={`/event/${event._id}`}>
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

export default EventList;
