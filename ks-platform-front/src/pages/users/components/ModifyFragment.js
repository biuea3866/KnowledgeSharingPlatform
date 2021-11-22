import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, checkNickname, initializeForm, modifyUser } from '../../../modules/auth';
import BottomlineInput from '../../components/common/BottomlineInput';
import FullButton from '../../components/common/FullButton';
import BorderButton from '../../components/common/BorderButton';
import palette from '../../../lib/styles/palette';
import { useNavigate } from 'react-router';
import { saveUser } from '../../../modules/user';

const Block = styled.div`
    padding-top: 200px;
    display: flex;
    justify-content: center;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    margin-bottom: 100px;
`;

const ModifyButton = styled(FullButton)`
    width: 130px;
    cursor: pointer;
`;

const CancelButton = styled(BorderButton)`
    width: 130px;
    margin-left: 20px;
    cursor: pointer;
`;

const ModifyForm = styled.form`
    display: flex;
    width: 60%;
    flex-direction: column;
`;

const Row = styled.div`
    float: left;
    height: 70px;
    text-align: left;
    font-size: 1.5rem;
`;

const ErrorMessage = styled.div`
    color: ${palette.red[0]};
    text-align: center;
    font-size: 14px;
    margin-top: 1rem;
`;

const ModifyFragment = () => {
    const { 
        user,
        form,
        auth,
        checkedNickname
    } = useSelector(({ 
        user,
        auth
    }) => ({ 
        user: user.user,
        form: auth.modify,
        auth: auth.auth,
        checkedNickname: auth.checkedNickname
    }));
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onChangeField = e => {
        const {
            value,
            name
        } = e.target;

        dispatch(changeField({
            form: 'modify',
            key: name,
            value
        }));
    };
    const onModify = e => {
        e.preventDefault();

        dispatch(changeField({
            form: 'modify',
            key: 'user_id',
            value: user.user_id
        }));

        const {
            user_id,
            nickname,
            password,
            passwordConfirm
        } = form;

        if([password,
            passwordConfirm,
            nickname].includes('')) {
            setError('입력하지 않은 사항이 있습니다.')        
        
            return;
        }

        if(password.length < 8) {
            setError('비밀번호를 8자리 이상이 아닙니다.');

            return;
        }

        if(password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');

            return;
        }

        if(checkedNickname) {
            dispatch(modifyUser({
                user_id,
                password,
                nickname
            }));
        }
    };

    useEffect(() => {
        const { nickname } = form;

        if(nickname) {
            dispatch(checkNickname(nickname));
        }
    }, [dispatch, form]);

    useEffect(() => {
        if(auth) {
            dispatch(saveUser());

            dispatch(initializeForm('auth'));

            dispatch(initializeForm('authError'));

            dispatch(initializeForm('modify'));

            dispatch(initializeForm('checkedNickname'));

            setError(null);

            navigate('/na-docs');
        }
    }, [auth]);

    return(
        <Block>
            <ModifyForm onSubmit={ onModify }>
                <Row>
                    <b>E-mail: { user.email }</b>
                </Row>
                <Row>
                    <b>Department: { user.department }</b>
                </Row>
                <BottomlineInput autoComplete="nickname"
                                 name="nickname"
                                 placeholder="Nickname"
                                 onChange={ onChangeField }
                />
                <BottomlineInput autoComplete="password"
                                 name="password"
                                 type="password"
                                 placeholder="8자리 이상 비밀번호"
                                 onChange={ onChangeField }
                />
                <BottomlineInput autoComplete="passwordConfirm"
                                 name="passwordConfirm"
                                 type="password"
                                 placeholder="비밀번호 재입력"
                                 onChange={ onChangeField }
                />
                <Row>
                    <b>Created: { user.created_at }</b>
                </Row>
                { error && <ErrorMessage>{ error }</ErrorMessage>}
                <ButtonGroup>
                    <ModifyButton red >
                        저장
                    </ModifyButton>
                    <CancelButton>
                        취소
                    </CancelButton>
                </ButtonGroup>
            </ModifyForm>
        </Block>
    );
};

export default ModifyFragment;