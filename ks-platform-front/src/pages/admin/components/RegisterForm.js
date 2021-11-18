import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RadioForm from '../../components/common/RadioForm';
import RadioItem from '../../components/common/RadioItem';
import BorderButton from '../../components/common/BorderButton';
import FullButton from '../../components/common/FullButton';
import BottomlineInput from '../../components/common/BottomlineInput';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, checkEmail, checkNickname, initializeForm, register } from '../../../modules/auth';
import { useNavigate } from 'react-router';
import palette from '../../../lib/styles/palette';

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

const ErrorMessage = styled.div`
    color: ${palette.red[0]};
    text-align: center;
    font-size: 14px;
    margin-top: 1rem;
`;

const RegisterForm = () => {
    const { 
        auth,
        form,
        checkedEmail,
        checkedNickname
    } = useSelector(({ auth }) => ({ 
        auth: auth.auth,
        form: auth.register,
        checkedEmail: auth.checkedEmail,
        checkedNickname: auth.checkedNickname
    }));
    const navigate = useNavigate();
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
    const onCancel = e => {
        e.preventDefault();

        dispatch(initializeForm('auth'));

        dispatch(initializeForm('authError'));    

        navigate('/na-docs/admin');
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

        if(checkedEmail && checkedNickname) {
            setError(null);
            
            dispatch(register({
                email,
                password,
                nickname,
                name,
                department,
                role,
                is_active
            }));
        }
    }

    useEffect(() => {
        const { email } = form;

        dispatch(checkEmail(email));

        if(!checkedEmail) {
            setError('이메일 중복!');
            
            return;
        }

        setError(null);
    }, [checkedEmail, form]);

    useEffect(() => {
        const { nickname } = form;

        dispatch(checkNickname(nickname));

        if(!checkedNickname) {
            setError('닉네임 중복!');
            
            return;
        }

        setError(null);
    }, [checkedNickname, form]);

    useEffect(() => {
        if(auth) {
            dispatch(initializeForm('auth'));

            dispatch(initializeForm('authError'));

            setError(null);

            navigate('/na-docs');
        }
    }, [dispatch, auth]);

    return(
        <Block>
            <AddForm onSubmit={ onRegister }>
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
                                 type="password"
                                 placeholder="8자리 이상 비밀번호"
                                 onChange={ onChangeField }
                />
                <BottomlineInput autoComplete="re-password"
                                 name="passwordConfirm"
                                 type="password"
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
                { error && <ErrorMessage>{ error }</ErrorMessage>}
                <ButtonGroup>
                    <AddButton red>추가</AddButton>
                    <CancelButton onClick={ onCancel }>취소</CancelButton>
                </ButtonGroup>
            </AddForm>
        </Block>
    );
};

export default RegisterForm;