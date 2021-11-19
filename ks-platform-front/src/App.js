import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router';
import AdminPage from './pages/admin/AdminPage';
import RegisterPage from './pages/admin/RegisterPage';
import HomePage from './pages/main/HomePage';
import PostPage from './pages/posts/PostPage';
import LoginPage from './pages/users/LoginPage';
import ModifyPage from './pages/users/ModifyPage';

const App = () => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    const navigate = useNavigate();

    useEffect(() => {
        if(user === null) {
            navigate('/na-docs/login');    
        }
    }, [user])

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
            <Route element={ <AdminPage /> }
                   path="/na-docs/admin"
                   exact
            />
            <Route element={ <RegisterPage /> }
                   path="/na-docs/admin/register"
                   exact
            />
            <Route element={ <ModifyPage /> }
                   path="/na-docs/user/my-page"
                   exact
            />
            <Route element={ <PostPage /> }
                   path="/na-docs/posts"
                   exact
            />
        </Routes>
    );
};

export default App;