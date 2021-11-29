import client from './client';

export const write = ({
    title,
    contents,
    is_secret,
    user_id
}) => client.post('http://localhost/posts/write', {
    title,
    contents,
    is_secret,
    user_id
}, {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const search = keyword => client.get(`http://localhost/posts/search/${keyword}`, {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const getPost = post_id => client.get(`http://localhost/posts/${post_id}/post`, {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const addTag = ({
    post_id,
    tag
}) => client.put(`http://localhost/posts/${post_id}/tag`, {
    post_id,
    tag
}, {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const addComment = ({
    content,
    name,
    is_secret,
    post_id
}) => client.put(`http://localhost/posts/${post_id}/comment`, {
    content,
    name,
    is_secret,
    post_id
}, {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});

export const edit = ({
    title,
    contents,
    is_secret,
    post_id
}) => client.put(`http://localhost/posts/${post_id}/modify`, {
    title,
    contents,
    is_secret,
    post_id
}, {
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('token'))
    }
});