import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import Logo from './Logo';
import Shortcut from './Shorcut';
import settings_outline from '../../../static/img/ionicons.designerpack/settings-outline.svg';
import clipboard_outline from '../../../static/img/ionicons.designerpack/clipboard-outline.svg';
import person_outline from '../../../static/img/ionicons.designerpack/person-outline.svg';
import exit_outline from '../../../static/img/ionicons.designerpack/exit-outline.svg';

const Box = styled.div`
    width: 100%;
    height: 130px;
    position: fixed;
    background-color: white;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
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
                <Shortcut path="/na-docs/admin"
                          src={ settings_outline }
                />
                <Shortcut path="/na-docs/posts"
                          src={ clipboard_outline }
                />
                <Shortcut path="/na-docs/user/my-page"
                          src={ person_outline }
                />
                <Shortcut path="/na-docs/auth/logout" 
                          src={ exit_outline }
                />
            </Nav>
        </Box>
    );
};

export default HeaderTemplate;