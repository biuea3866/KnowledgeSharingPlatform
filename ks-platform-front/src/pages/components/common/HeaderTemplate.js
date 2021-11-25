import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'; 
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import Logo from './Logo';
import Shortcut from './Shorcut';
import settings_outline from '../../../static/img/ionicons.designerpack/settings-outline.svg';
import clipboard_outline from '../../../static/img/ionicons.designerpack/clipboard-outline.svg';
import person_outline from '../../../static/img/ionicons.designerpack/person-outline.svg';
import exit_outline from '../../../static/img/ionicons.designerpack/exit-outline.svg';
import { initialize, logout } from '../../../modules/user';
import Swal from 'sweetalert2';

const Box = styled.div`
    width: 100%;
    height: 130px;
    position: fixed;
    background-color: white;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
    z-index: 1;
`;

const Header = styled.div`
    float: left;
    width: 40%;
    height: 130px;
`;

const Title = styled.div`
    float: left;
    height: 130px;
    font-weight: bold;
    font-size: 40px;
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 30px;
    font-family: impact;
    a {
        color: ${palette.red[3]};
    }
`;

const Nav = styled.div`
    float: left;
    width: 60%;
    height: 130px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const HeaderTemplate = () => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onLogout = e => {
        e.preventDefault();

        dispatch(logout());

        dispatch(initialize('user'));    
        
        navigate('/na-docs/login');
    };
    const onCheckAdmin = e => {
        if (user) {
            if(!user.role.includes('ADMIN')) {
                Swal.fire({
                    title: "Message",
                    text: "운영 계정이 아닙니다!",
                    icon: 'error',
                    confirmButtonColor: palette.red[2],
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return(
        <Box>
            <Header>
                <Logo />
                <Title>
                    <Link to="/na-docs">
                        Na DOCS
                    </Link>
                </Title>
            </Header>
            <Nav>
                <Shortcut path={ !user.role.includes('ADMIN') ? 
                                 "/na-docs" : "/na-docs/admin/" }
                          src={ settings_outline }
                          onClick={ onCheckAdmin }
                />
                <Shortcut path="/na-docs/posts/write"
                          src={ clipboard_outline }
                />
                <Shortcut path="/na-docs/user/my-page"
                          src={ person_outline }
                />
                <Shortcut path="#" 
                          src={ exit_outline }
                          onClick={ onLogout }
                />
            </Nav>
        </Box>
    );
};

export default HeaderTemplate;