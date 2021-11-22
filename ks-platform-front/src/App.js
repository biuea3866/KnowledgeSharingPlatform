import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router';
import AdminPage from './pages/admin/AdminPage';
import RegisterPage from './pages/admin/RegisterPage';
import HomePage from './pages/main/HomePage';
import WritePage from './pages/posts/WritePage';
import PostsPage from './pages/posts/PostsPage';
import LoginPage from './pages/users/LoginPage';
import ModifyPage from './pages/users/ModifyPage';
import PostPage from './pages/posts/WritePage';

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
            <Route element={ <WritePage /> }
                   path="/na-docs/posts/write"
                   exact
            />
            <Route element={ <PostsPage /> }
                   path="/na-docs/posts/"
                   exact
            />
            <Route element={ <PostPage /> }
                   path="/na-docs/post/:post_id"
                   exact
            />
        </Routes>
    );
};

export default App;