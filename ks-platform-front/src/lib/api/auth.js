import client from './client';

export const login = ({
    email,
    password
}) => client.post('http://localhost/auth/login', {
    email,
    password
});

export const register = ({
    email,
    password,
    nickname,
    name,
    department,
    role,
    is_active
}) => client.post('http://localhost/auth/register', {
    email,
    password,
    nickname,
    name,
    department,
    role,
    is_active
}, {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const checkEmail = email => client.get(`http://localhost/auth/check/email/${email}`);

export const checkNickname = nickname => client.get(`http://localhost/auth/check/nickname/${nickname}`);

export const getUser = () => client.get('http://localhost/auth/get-user', {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const getUsers = () => client.get('http://localhost/auth/', {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const deleteUser = ({
    is_active,
    user_id
}) => client.put('http://localhost/auth/delete', {
    is_active,
    user_id
}, {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const modifyUser = ({
    user_id,
    password,
    nickname
}) => client.put('http://localhost/auth/modify', {
    user_id,
    password,
    nickname
}, {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const resurrectUser = ({
    user_id,
    is_active
}) => client.put('http://localhost/auth/resurrect', {
    user_id,
    is_active
}, {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const logout = () => client.post('http://localhost/auth/logout');