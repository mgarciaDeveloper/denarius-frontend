import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import InventoryIcon from '@mui/icons-material/Inventory';
import Tooltip from '@mui/material/Tooltip';
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    position: relative;
`;

const FeedbackContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
`;

const StyledPaper = styled(Paper)`
    width: 90%;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TopDiv = styled(Stack)`
width:93%;
height: 9vh;
`;

const DefaultForm = ({ isLoading, isSuccess, errorMessage, children, title }) => {
    const navigate = useNavigate();

    return (
        <div>


            <FormContainer>
                <TopDiv direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2} >
                    <Tooltip title="Home"><IconButton onClick={() => navigate('/')}>
                        <HomeIcon />
                    </IconButton></Tooltip>

                    <h3>{title}</h3>
                    <Tooltip title="Estoque">
                        <IconButton onClick={() => navigate('/product')}>
                            <InventoryIcon />
                        </IconButton>
                    </Tooltip>
                </TopDiv>
                {isLoading && <div style={{ width: '80%' }}><LinearProgress /></div>}
                {isSuccess && (
                    <FeedbackContainer>
                        <CheckCircleOutlineIcon style={{ color: 'green', fontSize: 40 }} />
                        <p>Success!</p>
                    </FeedbackContainer>
                )}
                {errorMessage && (
                    <FeedbackContainer>
                        <ErrorOutlineIcon style={{ color: 'red', fontSize: 40 }} />
                        <p>{errorMessage}</p>
                    </FeedbackContainer>
                )}
                <StyledPaper>
                    {children}
                </StyledPaper>
            </FormContainer>
        </div>
    );
};

export default DefaultForm;
