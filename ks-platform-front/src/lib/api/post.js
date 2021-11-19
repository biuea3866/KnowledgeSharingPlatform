import client from './client';

export const write = ({
    title,
    contents,
    is_secret,
    user_id
}) => client.post('http://18.177.184.216/posts/write', ({
    title,
    contents,
    is_secret,
    user_id
}) => ({
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
}));