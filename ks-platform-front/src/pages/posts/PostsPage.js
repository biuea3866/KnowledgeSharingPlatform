import React from 'react';
import HeaderTemplate from '../components/common/HeaderTemplate';
import PostsFragment from './components/PostsFragment';

const PostsPage = () => {
    return(
        <>
            <HeaderTemplate />
            <PostsFragment />
        </>
    );
};

export default PostsPage;