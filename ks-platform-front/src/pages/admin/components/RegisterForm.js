import React, { useState } from 'react';
import styled from 'styled-components';
import RadioForm from '../../components/common/RadioForm';
import RadioItem from '../../components/common/RadioItem';
import BorderButton from '../../components/common/BorderButton';
import FullButton from '../../components/common/FullButton';
import BottomlineInput from '../../components/common/BottomlineInput';
import { useDispatch, useSelector } from 'react-redux';
import { changeField } from '../../../modules/auth';

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 100px;
`;

const AddButton = styled(FullButton)`
    width: 130px;
`;

const CancelButton = styled(BorderButton)`
    width: 130px;
    margin-left: 20px;
`;

const Block = styled.div`
    padding-top: 130px;
    display: flex;
    justify-content: center;
`;

const RoleRadio = styled.div`
    width: 200px;
    margin-top: 20px;
    margin-bottom: 2rem;
`;

const AddForm = styled.form`
    display: flex;
    width: 90%;
    flex-direction: column;
`;

const RegisterForm = () => {
    const { form } = useSelector(({ auth }) => ({ form: auth.register }));
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const onChangeField = e => {
        const { 
            value,
            name
        } = e.target;

        dispatch(changeField({
            form: 'register',
            key: name,
            value
        }));
    };
    const onRegister = e => {
        e.preventDefault();

        const {
            email,
            password,
            passwordConfirm,
            nickname,
            name,
            department,
            role,
            is_active
        } = form;

        if([email,
            password,
            passwordConfirm,
            nickname,
            name,
            department,
            role,
            is_active].includes('')) {
            setError('입력하지 않은 사항이 있습니다.')        
        
            return;
        }

        if(!email.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i)) {
            setError('이메일 정규식 표현이 아닙니다.');

            return
        }

        if(password.length < 8) {
            setError('비밀번호를 8자리 이상이 아닙니다.');

            return;
        }

        if(password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');

            return;
        }


    }
    return(
        <Block>
            <AddForm>
                <RoleRadio>
                    <RadioForm>
                        <RadioItem id="ADMIN"
                                   name="role"
                                   value="관리자"
                                   for="ADMIN"
                                   onChange={ onChangeField }
                        />
                        <RadioItem id="USER"
                                   name="role"
                                   value="일반"
                                   for="USER"
                                   onChange={ onChangeField }
                        />
                    </RadioForm>
                </RoleRadio>
                <BottomlineInput autoComplete="email"
                                 name="email"
                                 placeholder="na-docs@example.com"
                                 onChange={ onChangeField }
                />
                <BottomlineInput autoComplete="password"
                                 name="password"
                                 placeholder="8자리 이상 비밀번호"
                                 onChange={ onChangeField }
                />
                <BottomlineInput autoComplete="re-password"
                                 name="passwordConfirm"
                                 placeholder="비밀번호 재입력"
                                 onChange={ onChangeField }
                />
                <BottomlineInput autoComplete="name"
                                 name="name"
                                 placeholder="이름"
                                 onChange={ onChangeField }
                />
                <BottomlineInput autoComplete="department"
                                 name="department"
                                 placeholder="부서"
                                 onChange={ onChangeField }
                />
                <BottomlineInput autoComplete="nickname"
                                 name="nickname"
                                 placeholder="닉네임"
                                 onChange={ onChangeField }
                />
                <ButtonGroup>
                    <AddButton red>추가</AddButton>
                    <CancelButton>취소</CancelButton>
                </ButtonGroup>
            </AddForm>
        </Block>
    );
};

export default RegisterForm;