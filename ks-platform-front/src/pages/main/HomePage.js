import React from 'react';
import HeaderTemplate from '../components/common/HeaderTemplate';
import SearchFragment from './components/SearchFragment';

const HomePage = () => {
    return(
        <>
            <HeaderTemplate />
            <SearchFragment />
        </>
    );
};

export default HomePage;