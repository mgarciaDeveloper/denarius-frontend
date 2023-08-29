import React from 'react';
import './Styles/styles.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventForm from './Components/EventForm';
import EventList from './Components/EventList';
import EventEdit from './Components/EventEdit';
import SaleForm from './Components/SaleForm';
import ProductForm from './Components/ProductForm';
import ProductList from './Components/ProductList';
import ProductEdit from './Components/ProductEdit';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EventList />} /> {/* Adicione a rota para a landing page */}
                <Route path="/event/create" element={<EventForm />} />
                <Route path="/event/:idt" exact element={<EventEdit />} /> {/* Add the route for EventEdit */}
              
                <Route path="/product" element={<ProductList />} />
                <Route path="/product/create" element={<ProductForm />} />
                <Route path="/product/:idt" element={<ProductEdit />} />
                <Route path="/sale" element={<SaleForm />} />
                {/*                 <Route path="/events" element={<EventList/>} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
