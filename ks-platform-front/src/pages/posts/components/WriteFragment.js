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
`;

const FormBlock = styled.form`
    display: flex;
    width: 80%;
    flex-direction: column;
`;

const Summernote = styled.textarea`
    z-index: 100;
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
        e.preventDefault();

        dispatch(changeField({
            form: 'write',
            key: 'contents',
            value: $('#summernote-value').val()
        }));

        dispatch(changeField({
            form: 'write',
            key: 'user_id',
            value: user.user_id
        }));

        setFlag(true);
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

                return;
            }

            if([contents].includes('')) {
                Swal.fire({
                    title: "Message",
                    text: "내용이 공란입니다!",
                    icon: 'error',
                    confirmButtonColor: palette.red[2],
                    confirmButtonText: 'OK'
                });

                return;
            }

            dispatch(writePost({
                title,
                contents,
                is_secret,
                user_id
            }));

            setReadPost(true);
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
    }, [dispatch, post]);

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
            <FormBlock onSubmit={ onWrite }>
                <BottomlineInput autoComplete="title"
                                 name="title"
                                 placeholder="제목을 채워주세요!"
                                 onChange={ onChangeTitle }
                />
                <Summernote id="summernote" 
                            name="contents"
                            className="contents"     
                />
                <input id="summernote-value" 
                       type="hidden"
                       value=""
                />
                <ButtonGroup>
                    <AddButton red>
                        작성하기
                    </AddButton>
                    <CancelButton>
                        취소하기
                    </CancelButton>
                </ButtonGroup>
            </FormBlock>
        </Block>
    );
};

export default WriteFragment;