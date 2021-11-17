import client from './client';

export const login = ({
    email,
    password
}) => client.post('http://18.177.184.216/auth/login', {
    email,
    password
});

export const getUser = () => client.get('http://18.177.184.216/auth/get-user', {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const logout = () => client.post('http://18.177.184.216/auth/logout');