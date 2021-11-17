import client from './client';

export const login = ({
    email,
    password
}) => client.post('http://18.177.184.216/auth/login', {
    email,
    password
}, { 
    withCredentails: true 
}).then((Response) => {
    console.log(Response.headers['set-cookie']);
    console.log(Response.headers['set-cookie']['token']);

    localStorage.setItem('token', Response.headers['set-cookie']['token']);
});

export const getUser = () => client.get('http://18.177.184.216/auth/get-user', {
    headers: {
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    }
});

export const logout = () => client.post('http://18.177.184.216/auth/logout');