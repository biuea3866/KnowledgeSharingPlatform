import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import BorderButton from '../../components/common/BorderButton';
import BottomlineInput from '../../components/common/BottomlineInput';
import FullButton from '../../components/common/FullButton';

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

const EditFragment = () => {
    const { post } = useSelector(({ post }) => ({ post: post.post }));
    const match = useMatch('/na-docs/post/edit/:post_id');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onChangeTitle = e => {

    };
    const onChangeContents = e => {

    };
    const onCancel = e => {
        navigate(-1);
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

    return(
        <Block>
            <Nav>
                <ButtonGroup>
                    <EditButton>
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