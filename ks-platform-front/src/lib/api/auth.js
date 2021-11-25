import client from './client';

export const login = ({
    email,
    password
}) => client.post('http://18.177.184.216/auth/login', {
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
}) => client.post('http://18.177.184.216/auth/register', {
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

export const checkEmail = email => client.get(`http://18.177.184.216/auth/check/email/${email}`);

export const checkNickname = nickname => client.get(`http://18.177.184.216/auth/check/nickname/${nickname}`);

export const getUser = () => client.get('http://18.177.184.216/auth/get-user', {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const getUsers = () => client.get('http://18.177.184.216/auth/', {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const deleteUser = ({
    is_active,
    user_id
}) => client.put('http://18.177.184.216/auth/delete', {
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
}) => client.put('http://18.177.184.216/auth/modify', {
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
}) => client.put('http://18.177.184.216/auth/resurrect', {
    user_id,
    is_active
}, {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const logout = () => client.post('http://18.177.184.216/auth/logout');