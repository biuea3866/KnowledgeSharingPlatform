import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch } from 'react-router';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import { getPost } from '../../../modules/post';
import BorderButton from '../../components/common/BorderButton';
import FullButton from '../../components/common/FullButton';
import Loading from '../../components/common/Loading';
import TagBox from './TagBox';

const Block = styled.div`
    padding-top: 200px;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Nav = styled.div`
    width: 80%;
    float: left;
    display: flex;
    justify-content: flex-end;
`;
const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 100px;
`;

const UndoButton = styled(FullButton)`
    width: 130px;
    cursor: pointer;
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

const CommentBox = styled.div``;

const PostFragment = () => {
    const { post } = useSelector(({ post }) => ({ post: post.post }));
    const match = useMatch('/na-docs/post/:post_id');
    const dispatch = useDispatch();

    useEffect(() => {
        const { post_id } = match.params;
        
        dispatch(getPost(post_id));
    }, []);

    return(
        <Block>
            {
                post ?
                <>
                    <Nav>
                        <ButtonGroup>
                            <UndoButton red>
                                게시글 목록
                            </UndoButton>
                            <EditButton>
                                편집
                            </EditButton>
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
                </> :
                <Loading />
            }
        </Block>
    );
};

export default PostFragment;