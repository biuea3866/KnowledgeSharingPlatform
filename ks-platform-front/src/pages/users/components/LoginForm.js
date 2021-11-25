import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import { changeField, initializeForm, login } from '../../../modules/auth';
import { saveUser } from '../../../modules/user';
import { useNavigate } from 'react-router-dom'
import FullButton from '../../components/common/FullButton';
import Input from '../../components/common/Input';
import Swal from 'sweetalert2';

const FormBlock = styled.div`
    display: flex;
    flex-directions: column;
    justify-content: center;
    align-items: center;
`;

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { 
        form,
        user,
        auth,
        authError
    } = useSelector(({ 
        auth,
        user
    }) => ({ 
        form: auth.login,
        user: user.user,
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
        e.preventDefault();
        
        const { 
            email,
            password
        } = form;

        if([email].includes('')) {
            Swal.fire({
                title: "Message",
                text: "e-mail이 공란입니다!",
                icon: 'error',
                confirmButtonColor: palette.red[2],
                confirmButtonText: 'OK'
            });
            
            return;
        }

        if([password].includes('')) {
            Swal.fire({
                title: "Message",
                text: "비밀번호가 공란입니다!",
                icon: 'error',
                confirmButtonColor: palette.red[2],
                confirmButtonText: 'OK'
            });
            
            return;
        }

        dispatch(login({
            email,
            password
        }));
    };

    useEffect(() => {
        if(auth) {
            const token = auth;

            localStorage.setItem('token', JSON.stringify(token));

            dispatch(saveUser());
        }
    }, [dispatch, auth]);

    useEffect(() => {
        dispatch(initializeForm('auth'));

        dispatch(initializeForm('login'));
        
        dispatch(initializeForm('authError'));
    }, []);

    useEffect(() => {
        if(user) {
            localStorage.setItem('user', JSON.stringify(user));

            dispatch(initializeForm('auth'));

            dispatch(initializeForm('login'));
            
            navigate('/na-docs');
        }
    }, [dispatch, user]);

    useEffect(() => {
        if([authError].includes("Error: Deactivating user")) {
            Swal.fire({
                title: "Message",
                text: "비활성화 유저입니다!",
                icon: 'error',
                confirmButtonColor: palette.red[2],
                confirmButtonText: 'OK'
            });

            return;
        }
    }, [authError]);

    return(
        <FormBlock>
            <form onSubmit={ onSubmit }>
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
                <FullButton red>
                    Login
                </FullButton>
            </form>
        </FormBlock>
    );
};

export default LoginForm;