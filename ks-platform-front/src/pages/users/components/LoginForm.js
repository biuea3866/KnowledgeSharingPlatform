import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import { changeField, initializeForm, login } from '../../../modules/auth';
import FullButton from '../../components/common/FullButton';
import Input from '../../components/common/Input';

const FormBlock = styled.div`
    display: flex;
    flex-directions: column;
    justify-content: center;
    align-items: center;
`;

const ErrorMessage = styled.div`
    color: ${palette.red[0]};
    text-align: center;
    font-size: 14px;
    margin-top: 1rem;
`;

const LoginForm = () => {
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { 
        form,
        auth,
        authError
    } = useSelector(({ auth }) => ({ 
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError
    }));
    const onChange = e => {
        const {
            value,
            name
        } = e.target;

        dispatch(changeField({
            form: 'login',
            key: name,
            value
        }));
    };
    const onSubmit = e => {
        const { 
            email,
            password
        } = form;

        console.log(email);
        
        if([email].includes('')) {
            setError('Email을 입력해주세요');
            
            return;
        }

        if([password].includes('')) {
            setError('비밀번호을 입력해주세요');
            
            return;
        }

        dispatch(login({
            email,
            password
        }));
    };

    // useEffect(() => {
    //     dispatch(initializeForm('login'));
    // }, [dispatch]);

    useEffect(() => {
        if(authError) {
            setError(authError);

            // return
        };

        // if(auth) {
        //     const { userId } = auth;
        // }
    }, [auth, authError]);

    return(
        <FormBlock>
            <div>
                <Input autoComplete="email"
                       name="email"
                       placeholder="E-mail"
                       onChange={ onChange }
                       value={ form.email }
                />
                <Input autoComplete="password"
                       name="password"
                       placeholder="Password"
                       type="password"
                       onChange={ onChange }
                       value={ form.password }
                />
                { error && <ErrorMessage>{ error }</ErrorMessage>}
                <FullButton red
                            onClick={ onSubmit }
                >
                    Login
                </FullButton>
            </div>
        </FormBlock>
    );
};

export default LoginForm;