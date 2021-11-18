import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import FullButton from '../../components/common/FullButton';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../../modules/user';
import Loading from '../../components/common/Loading';

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
    height: 375px;
    margin: 50px;
`;

const AdminFragment = () => {
    const { users } = (({ user }) => ({ users: user.users }));
    const dispatch = useDispatch();
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 5,
        maxColumns: 6,
    });

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
                    data ?
                    <DataGrid { ...data } /> : 
                    <Loading />
                }
            </UserTable>
        </Block>
    );
};

export default AdminFragment;