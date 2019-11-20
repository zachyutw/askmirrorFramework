const React = require('react');
const Header = require('../Header');
const emailiy = require('../../emailify');
const Grid = require('../Grid');
const styled = require('styled-components');
// const BanderSC = styled.div`
//     height: 300px;
//     min-height: 300px;
//     @media (max-width: 700px) {
//         height: 200px;
//         min-height: 200px;
//     }
// `;
// const ImageSC = styled.img`
//     width: 100%;
//     height: 100%;
//     object-fit: contain !important;
//     object-fit: cover !important;
// `;
// const PageSC = styled.div`
//     background: #bfad6f;
//     padding: 50px;
//     @media (max-width: 700px) {
//         background: #ba6e40;
//         padding: 20px;
//     }
// `;

// const LinkBtnSC = styled.a`
//     text-decoration: none;
//     padding: 14px;
//     color: #fff;
//     border-radius: 10px;
//     background: #767778;
//     text-align: center;
//     font-size: 16px;
// `;

const Page = (props) => {
    return <div>{props.children}</div>;
};
const Image = (props) => {
    return <img src={props.src} />;
};
const Bander = (props) => {
    return (
        <div>
            <Image src={props.src} />
        </div>
    );
};
const LinkBtn = (props) => {
    const { children, ...rest } = props;
    return <a {...rest}>{children}</a>;
};

const HomePage = ({ title = 'Emial  Confirmation', cover = 'https://i.imgur.com/XsWZvr2.jpg', greeding, field, user, href }) => {
    return (
        <Page>
            <Bander src={cover} />
            <div style={{ textAlign: 'center' }}>
                <p stlye={{ color: '#FFF' }}>{greeding}</p>
                <Header title={title} />

                <LinkBtn href={field.href}> {field.text} </LinkBtn>
            </div>
        </Page>
    );
};

const HomeTemplate = emailiy(HomePage);
module.exports = HomeTemplate;
