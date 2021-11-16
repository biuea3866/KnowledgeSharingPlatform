import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './pages/main/HomePage';
import LoginPage from './pages/users/LoginPage';

const App = () => {
    return(
        <Routes>
            <Route element={ <HomePage /> }
                   path="/na-docs"
                   exact
            />
            <Route element={ <LoginPage /> } 
                   path="/na-docs/login"
                   exact
            />
        </Routes>
    );
};

export default App;