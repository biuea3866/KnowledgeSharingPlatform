import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import { getPost, initialize, unloadPost } from '../../../modules/post';
import BorderButton from '../../components/common/BorderButton';
import Loading from '../../components/common/Loading';
import CommentBox from './CommentBox';
import TagBox from './TagBox';

const Block = styled.div`
    padding-top: 150px;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Nav = styled.div`
    width: 90%;
    float: left;
    display: flex;
    justify-content: flex-end;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 100px;
`;

const EditButton = styled(BorderButton)`
    width: 130px;
    margin-left: 20px;
    cursor: pointer;
`;

const Article = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-start;
    border: none;
    border-bottom: 1px solid ${ palette.gray[2] };
    padding-bottom: 10px;
`;

const Title = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-start;
    font-size: 4rem;
    font-weight: bold;
    margin-top: 50px;
    border: none;
    border-bottom: 1px solid ${ palette.gray[2] };
    padding-bottom: 10px;
`;

const Contents = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-start;
    margin-top: 100px;
    border: none;
    border-bottom: 1px solid ${ palette.gray[2] };
    padding-bottom: 10px;
`;

const PostFragment = () => {
    const { 
        post,
        user
    } = useSelector(({ 
        post,
        user
    }) => ({ 
        post: post.post,
        user: user.user
    }));
    const match = useMatch('/na-docs/post/:post_id');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toEdit = e => {
        navigate(`/na-docs/post/edit/${post.post_id}`);
    };

    useEffect(() => {
        const { post_id } = match.params;
        
        dispatch(getPost(post_id));

        return () => {
            dispatch(unloadPost());
        }
    }, []);

    return(
        <Block>
            {
                post ?
                <>
                    <Nav>
                        <ButtonGroup>
                            {
                                post.user_id === user.user_id &&
                                <EditButton onClick={ toEdit }>
                                    편집
                                </EditButton>
                            }
                        </ButtonGroup>
                    </Nav>
                    <Article>
                        작성일 { post.created_at.substring(0, 10) } | 수정일 { post.updated_at.substring(0, 10)  } | 총 { post.update_count } 회 수정
                    </Article>
                    <Title>
                        { post.title }
                    </Title>
                    <TagBox />
                    <Contents dangerouslySetInnerHTML={{ __html: post.contents }}/>
                    <CommentBox />
                </> : <Loading />
            }
        </Block>
    );
};

export default PostFragment;