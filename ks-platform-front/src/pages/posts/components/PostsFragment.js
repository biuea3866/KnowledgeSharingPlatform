import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import search_outline from '../../../static/img/ionicons.designerpack/search-outline.svg';
import BottomlineInput from '../../components/common/BottomlineInput';
import PostCard from './PostCard';

const Block = styled.div`
    padding-top: 200px;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SearchForm = styled.form`
    width: 70%;
    display: flex;
    justify-content: center;
`;

const SearchIcon = styled.img`
    width: 35x;
    height: 35px;
    cursor: pointer;
`;

const PostsTable = styled.div`
    display: flex;
    width: 90%;
    margin: 50px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const Article = styled.div`
    float: left;
    width: 70%;
    font-weight: bold;
    text-align: left;
`;

const PostsFragment = () => {
    const { posts } = useSelector(({ posts }) => ({ posts: posts.posts }));
    
    return(
        <Block>
            <SearchForm>
                <BottomlineInput />
                <SearchIcon src={ search_outline } />
            </SearchForm>
            <Article>
                { posts.length } 개의 검색 결과
            </Article>
            <PostsTable>
                { 
                    posts.map(post => {
                        return <PostCard post={ post } />
                    })
                }
            </PostsTable>
        </Block>
    );
};

export default PostsFragment;