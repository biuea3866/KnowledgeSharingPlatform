import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FullButton from '../../components/common/FullButton';

const Block = styled.div`
    padding-top: 130px;
    width: 100%;
`;

const Nav = styled.div`
    float: left;
    width: 90%;
    display: flex;
    justify-content: flex-end;
    margin-top: 100px;
`;

const AddButton = styled(FullButton)`
    width: 130px;
`;

const Table = styled.table``;

const AdminFragment = () => {
    return(
        <Block>
            <Nav>
                <Link to="/na-docs/admin/register">
                    <AddButton red>
                        조직원 추가
                    </AddButton>
                </Link>
            </Nav>
            <Table>

            </Table>
        </Block>
    );
};

export default AdminFragment;