import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { changeField, editPost } from '../../../modules/post';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import BorderButton from '../../components/common/BorderButton';
import BottomlineInput from '../../components/common/BottomlineInput';
import FullButton from '../../components/common/FullButton';
import $ from 'jquery';

const Block = styled.div`
    padding-top: 150px;
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
    margin-bottom: 100px;
`;

const EditButton = styled(BorderButton)`
    width: 130px;
    margin-left: 20px;
    cursor: pointer;
`;

const CancelButton = styled(FullButton)`
    width: 130px;
    margin-left: 20px;
    cursor: pointer;
`;

const Article = styled.div`
    width: 80%;
    display: flex;
    justify-content: flex-start;
    border: none;
    border-bottom: 1px solid ${ palette.gray[2] };
    padding-bottom: 10px;
`;

const FormBlock = styled.form`
    display: flex;
    width: 80%;
    flex-direction: column;
`;

const EditInput = styled(BottomlineInput)`
    margin-top: 50px;
    width: 100%;
`;

const Summernote = styled.textarea`
    z-index: 100;
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

const EditFragment = () => {
    const { 
        form,
        post
    } = useSelector(({ post }) => ({ 
        form: post.edit,
        post: post.post 
    }));
    const [flag, setFlag] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onChangeTitle = e => {
        const {
            name,
            value
        } = e.target;

        dispatch(changeField({
            form: 'edit',
            key: name,
            value
        }));
    };
    const onCheckSecret = e => {

    };
    const onCancel = e => {
        navigate(-1);
    };
    const onEdit = e => {
        dispatch(changeField({
            form: 'edit',
            key: 'contents',
            value: $('#summernote-value').val()
        }));

        setFlag(true);
    };
    
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

    useEffect(() => {
        const {
            title,
            contents,
            is_secret,
            user_id
        } = form;

        if([title].includes('')) {
            return;
        }

        if([contents].includes('')) {
            return;
        }

        if(flag) {
            dispatch(editPost({
                title,
                contents,
                is_secret,
                user_id
            }));
        }
    }, [dispatch, flag]);
    
    return(
        <Block>
            <Nav>
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
                <ButtonGroup>
                    <EditButton onClick={ onEdit }>
                        편집
                    </EditButton>
                    <CancelButton red
                                  onClick={ onCancel }
                    >
                        취소
                    </CancelButton>
                </ButtonGroup>
            </Nav>
            <Article>
                작성일 { post.created_at.substring(0, 10) } | 수정일 { post.updated_at.substring(0, 10)  } | 총 { post.update_count } 회 수정
            </Article>
            <FormBlock>
                <EditInput name="title"
                           value={ post.title }
                           onChange={ onChangeTitle }
                />
                <Summernote id="summernote"
                            name="contents"
                            value={ post.contents }
                />  
            </FormBlock>
        </Block>
    );
};

export default EditFragment;