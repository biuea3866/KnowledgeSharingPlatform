import React from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';

const Input = styled.input`
    width: 100%;
    font-size: 1.5rem;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid ${ palette.red[2] };
    margin-top: 1rem;
    margin-bottom: 2rem;
    outline: none;
`;

const BottomlineInput = props => <Input { ...props } />

export default BottomlineInput;