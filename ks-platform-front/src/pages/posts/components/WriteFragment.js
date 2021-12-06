import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import { changeField, initialize, writePost } from '../../../modules/post';
import BorderButton from '../../components/common/BorderButton';
import BottomlineInput from '../../components/common/BottomlineInput';
import FullButton from '../../components/common/FullButton';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Block = styled.div`
    padding-top: 200px;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

const FormBlock = styled.form`
    display: flex;
    width: 80%;
    flex-direction: column;
`;

const Summernote = styled.textarea`
    p div {
        z-index: 100;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 100px;
`;

const AddButton = styled(FullButton)`
    width: 130px;
    cursor: pointer;
`;

const CancelButton = styled(BorderButton)`
    width: 130px;
    margin-left: 20px;
    cursor: pointer;
`;

const WriteFragment = () => {
    const { 
        form,
        post,
        user 
    } = useSelector(({ 
        post,
        user
    }) => ({ 
        form: post.write,
        post: post.post,
        user: user.user 
    }));
    const [flag, setFlag] = useState(false);
    const [readPost, setReadPost] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onChangeTitle = e => {
        const {
            name,
            value
        } = e.target;

        dispatch(changeField({
            form: 'write',
            key: name,
            value
        }));
    };
    const onWrite = e => {
        dispatch(changeField({
            form: 'write',
            key: 'contents',
            value: $('#summernote')[0].value
        }));

        dispatch(changeField({
            form: 'write',
            key: 'user_id',
            value: user.user_id
        }));

        setFlag(true);
    };
    const onEnter = e => {
        if(e.key === 'Enter') {
            onWrite();
        }
    };
    const onCancel = e => {
        navigate(-1);
    };

    useEffect(() => {
        if(flag) {
            const {
                title,
                contents,
                is_secret,
                user_id
            } = form;
    
            if([title].includes('')) {
                Swal.fire({
                    title: "Message",
                    text: "제목이 공란입니다!",
                    icon: 'error',
                    confirmButtonColor: palette.red[2],
                    confirmButtonText: 'OK'
                });

                setFlag(false);
            }
    
            if([contents].includes('')) {
                Swal.fire({
                    title: "Message",
                    text: "내용이 공란입니다!",
                    icon: 'error',
                    confirmButtonColor: palette.red[2],
                    confirmButtonText: 'OK'
                });

                setFlag(false);
            }

            if(![title, 
                 contents].includes('')) {
                dispatch(writePost({
                    title,
                    contents,
                    is_secret,
                    user_id
                }));

                setReadPost(true)
            }
        }
    }, [dispatch, flag]);

    useEffect(() => {
        if(post && readPost) {
            dispatch(initialize('write'));

            dispatch(initialize('post'));

            Swal.fire({
                title: "Message",
                text: "게시글이 성공적으로 등록되었습니다!",
                icon: 'success',
                confirmButtonColor: palette.red[2],
                confirmButtonText: 'OK'
            });

            navigate('/na-docs/');
        }
    }, [dispatch, post, readPost]);

    useEffect(() => {
        dispatch(initialize('write'));

        dispatch(initialize('post'));
    }, [dispatch]);

    useEffect(() => {
        const script = document.createElement('script');
        
        script.text = `
            $(document).ready(function() {
                $('#summernote').summernote({
                                    lang: "ko-KR",
                                    placeholder: '내용을 채워주세요!',
                                    height: 500,
                                    minHeight: 500,
                                    maxHeight: 500
                                });
            
                $('#summernote').on('summernote.change', function(e) {
                    $('#summernote-value').val($('#summernote').summernote('code'));
                });
            });
        `;

        document.body.append(script);
    }, []);
    
    return(
        <Block>
            <FormBlock>
                <BottomlineInput autoComplete="title"
                                 name="title"
                                 placeholder="제목을 입력해주세요!"
                                 onChange={ onChangeTitle }
                                 value={ form.title }
                />
                <Summernote id="summernote" />
                <input id="summernote-value" 
                       name="contents"
                       type="hidden"
                       value=""
                />
                <ButtonGroup>
                    <AddButton red
                               type="button"
                               onClick={ onWrite }
                               onKeyPress={ onEnter }        
                    >
                        작성하기
                    </AddButton>
                    <CancelButton onClick={ onCancel } >
                        취소하기
                    </CancelButton>
                </ButtonGroup>
            </FormBlock>
        </Block>
    );
};

export default WriteFragment;