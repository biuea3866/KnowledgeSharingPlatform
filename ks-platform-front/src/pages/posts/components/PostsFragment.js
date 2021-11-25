import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import search_outline from '../../../static/img/ionicons.designerpack/search-outline.svg';
import BottomlineInput from '../../components/common/BottomlineInput';
import PostCard from './PostCard';
import { useLocation, useNavigate } from 'react-router';
import { changeField, initialize, searchPosts } from '../../../modules/posts';
import Loading from '../../components/common/Loading';
import Swal from 'sweetalert2';
import palette from '../../../lib/styles/palette';

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
    const { 
        keyword,
        posts,
        postsError 
    } = useSelector(({ posts }) => ({ 
        keyword: posts.keyword,
        posts: posts.posts,
        postsError: posts.postsError 
    }));
    const { state } = useLocation();
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

            return;
        }

        navigate('/na-docs/posts', {
            state: keyword
        });
    };

    useEffect(() => {
        dispatch(searchPosts(state))
    }, [dispatch, state])

    useEffect(() => {
        if(postsError) {
            Swal.fire({
                title: "Message",
                text: "게시글이 존재하지 않습니다!",
                icon: 'error',
                confirmButtonColor: palette.red[2],
                confirmButtonText: 'OK'
            });

            dispatch(initialize('postsError'));

            navigate(-1);
        }
    }, [dispatch, postsError]);

    return(
        <Block>
            {
                !posts ?
                <Loading /> :
                <>
                    <SearchForm>
                        <BottomlineInput name="keyword"
                                         onChange={ onChangeKeyword }
                        />
                        <SearchIcon src={ search_outline } 
                                    onClick={ onSearch }
                        />
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
                </>
            }
        </Block>
    );
};

export default PostsFragment;