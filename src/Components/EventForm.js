import React, { useState } from 'react';
import api from '../api';
import DefaultForm from './DefaultForm';
import styled from 'styled-components';

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
`;

const EventForm = () => {
    const [eventData, setEventData] = useState({
        eventDate: "",
        eventType: "",
        meetingType: "",
        targetAudience: "",
        numberOfPeople: 0,
        location: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        // Concatenate meetingType and targetAudience to form eventType
        const eventType = `${eventData.meetingType} | ${eventData.targetAudience}`;
        
        try {
            await api.post('/event', { ...eventData, eventType });
            setIsLoading(false);
            setIsSuccess(true);
            setErrorMessage('');
            setTimeout(() => {
                setIsSuccess(false);
                setEventData({
                    eventDate: "",
                    eventType: "",
                    meetingType: "",
                    targetAudience: "",
                    numberOfPeople: 0,
                    location: ""
                });
            }, 2000);
        } catch (error) {
            setIsLoading(false);
            setIsSuccess(false);
            setErrorMessage('Error creating event. Please try again.');
        }
    };
    

    return (
        <DefaultForm title={'Cadastro de Evento'} isLoading={isLoading} isSuccess={isSuccess} errorMessage={errorMessage}>
            <form onSubmit={handleSubmit}>
                <StyledLabel htmlFor="eventDate">Event Date:</StyledLabel>
                <StyledInput
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={eventData.eventDate}
                    onChange={handleChange}
                />

                <StyledLabel htmlFor="meetingType">Tipo de Encontro:</StyledLabel>
                <StyledSelect
                    id="meetingType"
                    name="meetingType"
                    value={eventData.meetingType}
                    onChange={handleChange}
                >
                    <option value="">Selecione o tipo de encontro</option>
                    <option value="SEMINÁRIO">SEMINÁRIO</option>
                    <option value="ENCONTRO">ENCONTRO</option>
                    <option value="REUNIÃO">REUNIÃO</option>
                    <option value="EVANGELIZAÇÃO">EVANGELIZAÇÃO</option>
                </StyledSelect>

                <StyledLabel htmlFor="targetAudience">Público Alvo:</StyledLabel>
                <StyledSelect
                    id="targetAudience"
                    name="targetAudience"
                    value={eventData.targetAudience}
                    onChange={handleChange}
                >
                    <option value="">Selecione o público alvo</option>
                    <option value="principiantes">principiantes</option>
                    <option value="CIA's">CIA's</option>
                    <option value="jovens">jovens</option>
                    <option value="GL">GL</option>
                    <option value="senhoras">senhoras</option>
                    <option value="adultos">adultos</option>
                    <option value="casados">casados</option>
                    <option value="obreiros">obreiros</option>
                    <option value="pastores">pastores</option>
                    <option value="todos">todos</option>
                </StyledSelect>


                <StyledLabel htmlFor="numberOfPeople">Number of People:</StyledLabel>
                <StyledInput
                    type="number"
                    id="numberOfPeople"
                    name="numberOfPeople"
                    value={eventData.numberOfPeople}
                    onChange={handleChange}
                />

                <StyledLabel htmlFor="location">Location:</StyledLabel>
                <StyledInput
                    type="text"
                    id="location"
                    name="location"
                    value={eventData.location}
                    onChange={handleChange}
                />

                <StyledButton type="submit">Criar</StyledButton>
            </form>
        </DefaultForm>
    );
};

export default EventForm;
