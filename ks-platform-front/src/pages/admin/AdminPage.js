import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import HeaderTemplate from '../components/common/HeaderTemplate';
import AdminFragment from './components/AdminFragment';
import Loading from '../components/common/Loading';

const AdminPage = () => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.role.includes('ADMIN')) {
            alert('Not had admin role!');

            navigate('/na-docs');
        }
    }, [user]);

    return(
        <>
            <HeaderTemplate />
            {
                user?
                <AdminFragment /> : <Loading />
            }
        </>
    );
};

export default AdminPage;