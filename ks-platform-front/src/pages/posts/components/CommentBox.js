import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import BottomlineInput from '../../components/common/BottomlineInput';
import paper_plane_outline from '../../../static/img/ionicons.designerpack/paper-plane-outline.svg';
import palette from '../../../lib/styles/palette';
import { addComment, changeField, initialize } from '../../../modules/post';
import Swal from 'sweetalert2';

const Box = styled.div`
    width: 90%;
    margin-bottom: 100px;
`;

const CommentForm = styled.form`
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CommentInput = styled(BottomlineInput)`
    width: 80%;
    height: 40px;
`;

const CommentButton = styled.img`
    width: 30px;
    height: 30px;
    margin-left: 10px;
    cursor: pointer;
`;

const SecretBox = styled.label`
    display: block; 
    position: relative; 
    padding-left: 25px; 
    margin-bottom: 30px; 
    margin-right: 10px;
    cursor: pointer; 
    font-size: 14px; 
    -webkit-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none;
`;

const Checkbox = styled.input`
    display: none;
    &:checked + .on {
        background: ${palette.red[3]};
    }
    &:checked + .on:after {
        display: block;
    }
`;

const Checkmark = styled.span`
    width: 20px; 
    height: 20px; 
    background: white;
    border: solid 1px ${palette.red[3]}; 
    position: absolute; 
    top: 0; 
    left: 0;
    &:after {
        content: ""; 
        position: absolute; 
        display: none;
        width: 6px; 
        height: 10px; 
        border: solid #fff; 
        border-width: 0 2px 2px 0; 
        -webkit-transform: rotate(45deg); 
        -ms-transform: rotate(45deg); 
        transform: rotate(45deg); 
        position: absolute; 
        left: 6px; top: 2px;
    }
`;

const CommentBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Comment = styled.div`
    width: 80%;
    border-bottom: 1px solid ${ palette.gray[4] };
    margin-top: 15px;
`;

const CommentTitle = styled.div`
    float: left;
    width: 85%;
    padding-bottom: 20px;
    font-weight: bold;
`;

const CommentArticle = styled.div`
    float: left;
    width: 15%;
    padding-bottom: 20px;
`;

const CommentContent = styled.div`
    width: 100%;
    padding-bottom: 10px;
`;

const CommentBox = () => {
    const { 
        form,
        post,
        user,
    } = useSelector(({ 
        post,
        user
    }) => ({ 
        form: post.comment,
        post: post.post,
        user: user.user
    }));
    const dispatch = useDispatch();
    const onCheckSecret = e => {
        const { name } = e.target;

        if(e.target.checked) {
            dispatch(changeField({
                form: 'comment',
                key: name,
                value: true
            }));
        } else {
            dispatch(changeField({
                form: 'comment',
                key: name,
                value: false
            }));
        }
    };
    const onChangeContent = e => {
        const {
            name,
            value
        } = e.target;

        dispatch(changeField({
            form: 'comment',
            key: name,
            value
        }));
    };
    const onComment = e => {
        const {
            content,
            name,
            is_secret,
            post_id
        } = form;

        if([content].includes('')) {
            Swal.fire({
                title: "Message",
                text: "Please Fill in comment!",
                icon: 'error',
                confirmButtonColor: palette.red[2],
                confirmButtonText: 'OK'
            });

            return;
        }

        dispatch(addComment({
            content,
            name,
            is_secret,
            post_id
        }));

        dispatch(initialize('comment'));
    };

    useEffect(() => {
        dispatch(changeField({
            form: 'comment',
            key: 'name',
            value: user.name
        }));
    }, [dispatch, user]);

    useEffect(() => {
        dispatch(changeField({
            form: 'comment',
            key: 'post_id',
            value: post.post_id
        }));
    }, [dispatch, post]);

    return(
        <Box>
            <CommentForm>
                <SecretBox for="check"
                           className="check-box"
                >
                    <Checkbox type="checkbox"
                              id="check"
                              name="is_secret"
                              onClick={ onCheckSecret }
                    />
                    <Checkmark className="on"></Checkmark>
                </SecretBox>
                <CommentInput name="content" 
                              placeholder="Write down comment"
                              onChange={ onChangeContent }
                />
                <CommentButton src={ paper_plane_outline } 
                               onClick={ onComment }
                />
            </CommentForm>
            <CommentBlock>
                {
                    post.comments &&
                    post.comments.map(comment => <Comment>
                                                    <CommentTitle>
                                                        { comment.name }
                                                    </CommentTitle>
                                                    <CommentArticle>
                                                        { comment.created_at.substring(0, 10) }
                                                    </CommentArticle>
                                                    {
                                                        !comment.is_secret ?
                                                        <CommentContent>
                                                            { comment.content }
                                                        </CommentContent> :
                                                        <CommentContent>
                                                            비공개 댓글입니다.
                                                        </CommentContent>
                                                    }
                                                </Comment>)
                }
            </CommentBlock>
        </Box>
    );
};

export default CommentBox;