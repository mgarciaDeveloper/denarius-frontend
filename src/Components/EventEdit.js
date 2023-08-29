import React, { useState, useEffect } from 'react';
import api from '../api';
import DefaultForm from './DefaultForm';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import SalesSection from './SalesSection'; // Novo componente

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

const EventEdit = () => {
    const { idt } = useParams();
    const [eventData, setEventData] = useState({
        eventDate: "",
        eventType: "",
        meetingType: "",
        targetAudience: "",
        numberOfPeople: 0,
        location: ""
    });
    const [formattedDate, setFormattedDate] = useState('');
    const [displayedDate, setDisplayedDate] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await api.get(`/event/${idt}`);
                const event = response.data;
                const [year, month, day] = event.eventDate.split('T')[0].split('-');
                setFormattedDate(`${year}-${month}-${day}`);
                setDisplayedDate(`${year}-${month}-${day}`);
                const [meetingType, targetAudience] = event.eventType.split(" | ");
                setEventData({ ...event, meetingType, targetAudience });
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };
        fetchEvent();
    }, [idt]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === 'eventDate') {
            setDisplayedDate(value);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const eventType = `${eventData.meetingType} | ${eventData.targetAudience}`;

        try {
            await api.put(`/event/${idt}`, { ...eventData, eventType });
            setIsLoading(false);
            setIsSuccess(true);
            setErrorMessage('');
        } catch (error) {
            setIsLoading(false);
            setIsSuccess(false);
            setErrorMessage('Error updating event. Please try again.');
        }
    };

    return (
        <DefaultForm title={'Editar Evento'} isLoading={isLoading} isSuccess={isSuccess} errorMessage={errorMessage}>
            <form onSubmit={handleUpdate}>
                <StyledLabel htmlFor="eventDate">Event Date:</StyledLabel>
                <StyledInput
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={displayedDate}
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

                <StyledButton type="submit">Editar Evento</StyledButton>
            </form>
            <hr/>
            <SalesSection eventId={idt} />
        </DefaultForm>
    );
};

export default EventEdit;
