import React, { useMemo } from 'react';
import _ from 'lodash';
import { withRouter, withNav } from '../../../routes/withNav';
import { navMainFields } from '../../../routes/Routes';
import InputItemP from '../../Input/InputItemP/InputItemP';
import s from './Navmain.module.css';
import { centerSort } from '../../../lib';

console.log(navMainFields);
const navmainField = _.map(navMainFields, ({ name, main }) => ({ name, to: main.path, text: _.capitalize(name) }));
console.log(navmainField);
// const navmainField ={
//     home: { name: 'home', to: '/home', text: 'Home' },
//     app: { name: 'app', to: '/', text: 'App' },
//     auth: { name: 'auth', to: '/auth', text: 'Auth' }
// };
const navmainFields = Object.values(navmainField);
const middleNavmainFields = centerSort(navmainFields);
// console.log(middleNavmainFields);
const CardItem = ({ className, text, icon }) => {
    return <div className={[ 'item', className ].join(' ')}>{text}</div>;
};

const Navmain = ({ onChange, name = 'vertical' }) => {
    const memoFields = useMemo(
        () => {
            switch (name) {
                case 'horizontal':
                    return middleNavmainFields;
                default:
                    return navmainFields;
            }
        },
        [ name ]
    );
    return (
        <div className={[ s.nav, s[name] ].join(' ')}>
            {memoFields.map((field, index) => (
                <InputItemP onChange={onChange} {...field} key={index}>
                    <CardItem
                        // className=' inverted ui segment fluid attached'
                        {...field}
                    />
                </InputItemP>
            ))}
        </div>
    );
};

export default withRouter(withNav(Navmain));
