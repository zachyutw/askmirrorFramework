import React from 'react';
import Header from '../Header';
import emailiy from '../../emailify';
const HomePage = () => {
    return (
        <div>
            <Header title='1234' />
        </div>
    );
};

const HomeTemplate = emailiy(HomePage);
const HomeTemplateString = HomeTemplate({}, { title: 'Home' });
export default HomeTemplateString;
