import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';

const StyledButton = styled.button`
    width: 100%;
    height: 50px;
    border-radius: 4px;
    border: 2px solid ${palette.red[1]};
    margin: 8px 0;
    padding: 8px;
    box-sizing: border-box;
    transition: .3s;
    background-color: #ffffff;
    color: ${palette.red[1]};
    font-size: 20px;
`;

const BorderButton = props => <StyledButton { ...props } />

export default BorderButton;