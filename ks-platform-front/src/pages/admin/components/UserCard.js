import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import person_remove_outline from '../../../static/img/ionicons.designerpack/person-remove-outline.svg';
import person_add_outline from '../../../static/img/ionicons.designerpack/person-add-outline.svg';
import { changeField, deleteUser, initializeForm, resurrectUser } from '../../../modules/auth';
import { getUsers } from '../../../modules/user';

const Block = styled.div`
    backgroud-color: white;
    width: 350px;
    height: 300px;
    margin: 20px;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 20px;
`;

const Row = styled.div`
    float: left;
    width: 400px;
    height: 40px;
    overflow: hidden;
    text-align: left;
    padding-left: 10px;
`;

const DeleteBar = styled.div`
    float: left;
    width: 390px;
    height: 80px;
    background-color: ${ palette.red[0] };
    margin-left: -20px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const HideBar = styled.div`
    float: left;
    width: 390px;
    height: 80px;
    background-color: ${ palette.gray[7] };
    margin-left: -20px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const Icon = styled.img`
    width: 40px;
    height: 40px;
    color: white;
`;

const UserCard = user => {
    const { 
        form,
        auth
    } = useSelector(({ auth }) => ({ 
        form: auth.delete,
        auth: auth.auth
    }));
    const dispatch = useDispatch();
    const onDelete = e => {
        Swal.fire({
            title: "Message",
            text: "정말 삭제하시겠습니까?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: palette.red[2],
            confirmButtonText: 'Approval',
            cancelButtonText: 'Cancel'
        }).then(result => {
            if(result.isConfirmed) {
                dispatch(changeField({
                    form: 'delete',
                    key: 'user_id',
                    value: user.user.user_id
                }));

                const {
                    is_active,
                    user_id
                } = form;

                dispatch(deleteUser({
                    is_active,
                    user_id
                }));
            }
        });
    };
    const onResurrection = e => {
        Swal.fire({
            title: "Message",
            text: "재활성화 시키시겠습니까?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: palette.red[2],
            confirmButtonText: 'Approval',
            cancelButtonText: 'Cancel'
        }).then(result => {
            if(result.isConfirmed) {
                dispatch(changeField({
                    form: 'resurrect',
                    key: 'user_id',
                    value: user.user.user_id
                }));

                const {
                    is_active,
                    user_id
                } = form;

                // dispatch(resurrectUser({
                //     is_active,
                //     user_id
                // }));
            }
        });
    };

    useEffect(() => {
        if(auth) {
            dispatch(getUsers());

            dispatch(initializeForm('modify'));

            dispatch(initializeForm('auth'));
        }
    }, [dispatch, auth]);

    return (
        <Block>
            <Row>
                <b>Email: { user.user.email }</b>
            </Row>
            <Row>
                <b>Nickname: { user.user.nickname }</b>
            </Row>
            <Row>
                <b>Name: { user.user.name }</b>
            </Row>
            <Row>
                <b>Department: { user.user.department }</b>
            </Row>
            <Row>
                <b>Role: { user.user.role }</b>
            </Row>
            <Row>
                <b>Created: { user.user.created_at }</b>
            </Row>
            {
                user.user.is_active === true ?
                <DeleteBar>
                    <Icon src={ person_remove_outline }
                          onClick={ onDelete }
                    />
                </DeleteBar> :
                <HideBar>
                    <Icon src={ person_add_outline } 
                          onClick={ onResurrection }
                    />
                </HideBar>
            }

        </Block>
    );
};

export default UserCard;