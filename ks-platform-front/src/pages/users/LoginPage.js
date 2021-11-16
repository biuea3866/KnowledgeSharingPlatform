import React from 'react';
import LoginForm from './components/LoginForm';
import LoginFragment from './components/LoginFragment';

const LoginPage = () => {
    return(
        <>
            <LoginFragment>
                <LoginForm />
            </LoginFragment>
        </>
    );
};

export default LoginPage;