import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';

const StyledInput = styled.input`
    width: 100%;
    height: 40px;
    border: 2px solid ${ palette.gray[6] };
    border-radius: 4px;
    margin: 8px 0;
    outline: none;
    box-sizing: border-box;
    transition: .3s;
    &:focus {
        border-color: ${ palette.red[1] };
        box-shadow: 0 0 8px 0 ${ palette.red[1] };
    }
`;

const Input = props => <StyledInput { ...props } />;

export default Input;