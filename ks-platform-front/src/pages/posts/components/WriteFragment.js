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

const ErrorMessage = styled.div`
    color: ${palette.red[0]};
    text-align: center;
    font-size: 14px;
    margin-top: 1rem;
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
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
        const {
            title,
            contents,
            is_secret,
            user_id
        } = form;

        if([title].includes('')) {
            setError('Please check title');

            return;
        }

        if([contents].includes('')) {
            setError('Please check contents');

            return;
        }

        if(flag) {
            dispatch(writePost({
                title,
                contents,
                is_secret,
                user_id
            }));
        }
    }, [dispatch, flag]);

    useEffect(() => {
        if(post) {
            setError(null);

            dispatch(initialize('write'));

            dispatch(initialize('post'));
            
            Swal.fire({
                title: "Message",
                text: "Successfully register user!",
                icon: 'success',
                confirmButtonColor: palette.red[2],
                confirmButtonText: 'OK'
            });

            navigate('/na-docs/');
        }
    }, [dispatch, post]);

    useEffect(() => {
        setError(null);

        dispatch(initialize('write'));

        dispatch(initialize('post'));
    }, [dispatch]);

    useEffect(() => {
        const script = document.createElement('script');
        
        script.text = `
            $(document).ready(function() {
                $('#summernote').summernote({
                                    lang: "ko-KR",
                                    placeholder: 'Fill in your idea!',
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
                                 placeholder="Please fill title"
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
                { error && <ErrorMessage>{ error }</ErrorMessage>}
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