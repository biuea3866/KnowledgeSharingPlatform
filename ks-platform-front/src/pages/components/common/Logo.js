import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../static/img/ju-nayeontekeu_logo_1558078490.png';

const Box = styled.div`
    float: left;
`;

const Icon = styled.img`
    width: 100px;
    height: 100px;
    margin-left: 20px;
    margin-top: 20px;
`;

const Logo = () => {
    return(
        <Link to="/na-docs">
            <Box>
                <Icon src={ logo } />
            </Box>
        </Link>
    );
};

export default Logo;