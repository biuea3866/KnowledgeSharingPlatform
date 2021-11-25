import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, checkNickname, initializeForm, modifyUser } from '../../../modules/auth';
import BottomlineInput from '../../components/common/BottomlineInput';
import FullButton from '../../components/common/FullButton';
import BorderButton from '../../components/common/BorderButton';
import palette from '../../../lib/styles/palette';
import { useNavigate } from 'react-router';
import { saveUser } from '../../../modules/user';
import Swal from 'sweetalert2';

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
    height: 50px;
    text-align: left;
    font-size: 1.5rem;
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

        if([nickname].includes('')) {
            Swal.fire({
                title: "Message",
                text: "닉네임이 공란입니다!",
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

        if([passwordConfirm].includes('')) {
            Swal.fire({
                title: "Message",
                text: "비밀번호 재입력란이 공란입니다!",
                icon: 'error',
                confirmButtonColor: palette.red[2],
                confirmButtonText: 'OK'
            });

            return;
        }
        
        if(password.length < 8) {
            Swal.fire({
                title: "Message",
                text: "8자리 이상의 비밀번호가 아닙니다!",
                icon: 'error',
                confirmButtonColor: palette.red[2],
                confirmButtonText: 'OK'
            });

            return;
        }

        if(password !== passwordConfirm) {
            Swal.fire({
                title: "Message",
                text: "비밀번호가 일치하지 않습니다",
                icon: 'error',
                confirmButtonColor: palette.red[2],
                confirmButtonText: 'OK'
            });

            return
        }

        if(checkedNickname) {
            dispatch(modifyUser({
                user_id,
                password,
                nickname
            }));
        }
    };
    const onCancel = e => {
        dispatch(initializeForm('auth'));

        dispatch(initializeForm('authError'));

        dispatch(initializeForm('modify'));

        dispatch(initializeForm('checkedNickname'));

        navigate('/na-docs/');
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
                    <b>부서: { user.department }</b>
                </Row>
                <BottomlineInput autoComplete="nickname"
                                 name="nickname"
                                 placeholder="닉네임"
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
                    <b>등록일: { user.created_at }</b>
                </Row>
                <ButtonGroup>
                    <ModifyButton red >
                        저장
                    </ModifyButton>
                    <CancelButton onClick={ onCancel }>
                        취소
                    </CancelButton>
                </ButtonGroup>
            </ModifyForm>
        </Block>
    );
};

export default ModifyFragment;