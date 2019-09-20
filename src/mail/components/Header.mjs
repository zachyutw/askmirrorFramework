const React = require('react');
const styled = require('styled-components');
// const HeaderSC = styled.h1`
//     height: 100px;
//     color: #fff;
//     @media (max-width: 700px) {
//         height: 300px;
//     }
// `;

const Header = (props) => {
    return <h1>{props.title}</h1>;
};

module.exports = Header;
