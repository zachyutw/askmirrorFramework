import React, { useContext, useMemo, useState, useEffect, useCallback } from 'react';
import GlobalContext from '../../../contexts/Global/GlobalContext';
import LayoutRegular from '../../Layout/LayoutRegular/LayoutRegular';
import Section from '../../App/Section/Section';
import s from './ConditionPage.module.css';
import useRedirect from '../../../hooks/useRedirect';
import AuthCondition from '../../Auth/AuthCondition/AuthCondition';
import ModalConfirm from '../../Modal/ModalConfirm/ModalConfirm';

const useModal = (propActived = false, propConfirm) => {
    const [ onConfirm, setOnConfirm ] = useState(propConfirm);
    const [ actived, setAcitved ] = useState(propActived);
    const [ controller, setController ] = useState({});

    useEffect(
        () => {
            if (onConfirm) {
                setAcitved(true);
            }
        },
        [ onConfirm ]
    );
    console.log(onConfirm);

    return [ actived, setAcitved, onConfirm, setOnConfirm, controller, setController ];
};

const Condition = ({ name, countdown, to, isSuccess, ...rest }) => {
    return (
        <Section className='center'>
            <div className={s.section}>
                <h1>Condition Page</h1>
                {countdown / 1000}
            </div>
        </Section>
    );
};
const check = (e) => {
    console.log(e);
};
const ConditionPage = (props) => {
    const { history, match } = props;
    const globalContext = useContext(GlobalContext);
    const { query } = globalContext;
    const { params: { routeName, name } } = match;
    const { redirect, timeout, isSuccess = true } = query;
    const [ countdown ] = useRedirect(history, redirect, timeout);
    const [ actived, setActived, onConfirm, setOnConfirm ] = useModal(false);
    const render = useMemo(
        () => {
            switch (routeName) {
                case 'auth':
                    return <AuthCondition name={name} to={redirect} countdown={countdown} isSuccess={isSuccess} />;
                default:
                    return <Condition name={name} to={redirect} countdown={countdown} isSuccess={isSuccess} />;
            }
        },
        [ routeName, name, countdown, isSuccess, redirect ]
    );
    const handleOnClick = (e) => {
        const name = e.target.name;

        setOnConfirm(() => () => check(name));
    };
    return (
        <LayoutRegular>
            <div className={[ s.page, 'maxPage', 'theme' ].join(' ')}>
                <button name='open' className='ui button' onClick={handleOnClick}>
                    Open
                </button>
                <ModalConfirm actived={actived} setActived={setActived} onConfirm={onConfirm}>
                    <div>确定删除该帖子吗？此操作不可撤回</div>
                </ModalConfirm>
                {render}
            </div>
        </LayoutRegular>
    );
};

export default ConditionPage;
