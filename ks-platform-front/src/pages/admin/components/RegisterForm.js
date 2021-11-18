import React from 'react';
import styled from 'styled-components';
import RadioForm from '../../components/common/RadioForm';
import RadioItem from '../../components/common/RadioItem';
import BorderButton from '../../components/common/BorderButton';
import FullButton from '../../components/common/FullButton';
import BottomlineInput from '../../components/common/BottomlineInput';

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
    const onChangeField = e => {
        const { 
            value,
            name
        } = e.target;
        
    };

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
                                 placeholder="E-mail"
                                 onChange={ onChangeField }
                />
                <BottomlineInput autoComplete="password"
                                 name="password"
                                 placeholder="Password"
                                 onChange={ onChangeField }
                />
                <BottomlineInput autoComplete="re-password"
                                 name="passwordConfirm"
                                 placeholder="Re-password"
                                 onChange={ onChangeField }
                />
                <BottomlineInput autoComplete="name"
                                 name="name"
                                 placeholder="Name"
                                 onChange={ onChangeField }
                />
                <BottomlineInput autoComplete="department"
                                 name="department"
                                 placeholder="Department"
                                 onChange={ onChangeField }
                />
                <BottomlineInput autoComplete="nickname"
                                 name="nickname"
                                 placeholder="Nickname"
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