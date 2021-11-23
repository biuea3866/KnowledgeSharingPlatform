import client from './client';

export const write = ({
    title,
    contents,
    is_secret,
    user_id
}) => client.post('http://18.177.184.216/posts/write', {
    title,
    contents,
    is_secret,
    user_id
}, {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const search = keyword => client.get(`http://18.177.184.216/posts/search/${keyword}`, {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const getPost = post_id => client.get(`http://18.177.184.216/posts/${post_id}/post`, {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const addTag = ({
    post_id,
    tag
}) => client.put(`http://18.177.184.216/posts/${post_id}/tag`, {
    post_id,
    tag
}, {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});