import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';

const Block = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: ${ palette.gray[2] };
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const WhiteBox = styled.div`
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
    padding: 2rem;
    width: 60%;
    background: white;
    border-radius: 2px;
`;

const Header = styled.div`
    float: left;
    margin-top: 20px;
    margin-bottom: 30px;
    width: 60%;
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${ palette.red[2] };
    font-weight: bold;
    font-family: Impact;
`;

const LoginFragment = ({ children }) => {
    return(
        <Block>
            <Header>
                Na DOCS
            </Header>
            <WhiteBox>
                { children }
            </WhiteBox>
        </Block>
    );
};

export default LoginFragment;