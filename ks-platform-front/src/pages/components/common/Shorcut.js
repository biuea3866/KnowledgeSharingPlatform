import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Icon = styled.img`
    width: 40px;
    height: 40px;
    margin-left: 20px;
    margin-right: 20px;
`;

const Shortcut = ({
    path,
    src,
    onClick
}) => {
    return(
        <Link to={ path } 
              onClick={ onClick ? onClick : null }
        >
            <Icon src={ src } />
        </Link>
    );
};

export default Shortcut;