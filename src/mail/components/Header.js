import React from 'react';
import styled from 'styled-components';
const HeaderSC = styled.h1`
    height: 100px;
    @media (max-width: 700px) {
        height: 300px;
    }
`;

const Header = (props) => {
    return <HeaderSC>{props.title}</HeaderSC>;
};

export default Header;
