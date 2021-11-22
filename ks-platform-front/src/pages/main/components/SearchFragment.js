import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import palette from '../../../lib/styles/palette';
import BottomlineInput from '../../components/common/BottomlineInput';
import search_outline from '../../../static/img/ionicons.designerpack/search-outline.svg';
import { changeField, initialize, searchPosts } from '../../../modules/posts';
import Swal from 'sweetalert2';

const Block = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    width: 100%;
    font-family: impact;
    display: flex;
    justify-content: center;
    font-size: 5rem;
    color: ${ palette.red[3] };
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

const SearchFragment = () => {
    const { 
        keyword, 
        posts,
    } = useSelector(({ posts }) => ({ 
        keyword: posts.keyword,
        posts: posts.posts
    }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onChangeKeyword = e => {
        e.preventDefault();

        const {
            name,
            value
        } = e.target;

        dispatch(changeField({
            key: name,
            value 
        }));
    };
    const onSearch = e => {
        if([keyword].includes('')) {
            Swal.fire({
                title: "Message",
                text: "Please check search input!",
                icon: 'error',
                confirmButtonColor: palette.red[2],
                confirmButtonText: 'OK'
            });
        }

        dispatch(searchPosts(keyword));
    };

    useEffect(() => {
        if(posts) {
            navigate('/na-docs/posts');
        }
    }, [dispatch, posts])

    useEffect(() => {
        dispatch(initialize('posts'));
    }, [dispatch]);
    
    return(
        <Block>
            <Title>
                Na DOCS
            </Title>
            <SearchForm>
                <BottomlineInput name="keyword"
                                 onChange={ onChangeKeyword } 
                />
                <SearchIcon src={ search_outline }
                            onClick={ onSearch }
                />
            </SearchForm>
        </Block>
    );
};

export default SearchFragment;