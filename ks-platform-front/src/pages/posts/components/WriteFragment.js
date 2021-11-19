import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import { changeField } from '../../../modules/post';
import BorderButton from '../../components/common/BorderButton';
import BottomlineInput from '../../components/common/BottomlineInput';
import FullButton from '../../components/common/FullButton';

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

const Summernote = styled.div`
    z-index: -1;
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
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const onChangeField = e => {
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

    useEffect(() => {
        const script = document.createElement('script');
        var temp = '';

        script.text = `$('#summernote').summernote({
                                            lang: "ko-KR",
                                            placeholder: 'Fill in your idea!',
                                            height: 500,
                                            minHeight: 500,
                                            maxHeight: 500,
                                            onChange: function(e) {
                                                console.log(e);
                                            }
                                        })`;

        script.text = `console.log($('#summernote').summernote('code'))`;

        script.text = `const temp = $('#summernote').summernote('code')`;
    
        document.body.appendChild(script);

        console.log(window['temp']);
         
    }, []);

    return(
        <Block>
            <FormBlock method="post">
                <BottomlineInput autoComplete="title"
                                 name="title"
                                 placeholder="Please fill title"
                                 onChange={ onChangeField }
                />
                <Summernote id="summernote" 
                            name="contents"
                            className="editordata"
                            onChange={ onChangeField }            
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