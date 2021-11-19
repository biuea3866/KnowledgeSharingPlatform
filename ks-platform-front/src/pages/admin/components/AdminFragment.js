import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FullButton from '../../components/common/FullButton';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../modules/user';
import Loading from '../../components/common/Loading';
import UserCard from './UserCard';

const Block = styled.div`
    padding-top: 130px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Nav = styled.div`
    float: left;
    width: 90%;
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
`;

const AddButton = styled(FullButton)`
    width: 130px;
`;

const UserTable = styled.div`
    display: flex;
    width: 90%;
    margin: 50px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const AdminFragment = () => {
    const { users } = useSelector(({ user }) => ({ users: user.users }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return(
        <Block>
            <Nav>
                <Link to="/na-docs/admin/register">
                    <AddButton red>
                        조직원 추가
                    </AddButton>
                </Link>
            </Nav>
            <UserTable>
                {
                    users ?
                    users.map(user => {
                        return <UserCard user={ user } />
                    }) : 
                    <Loading />
                }
            </UserTable>
        </Block>
    );
};

export default AdminFragment;