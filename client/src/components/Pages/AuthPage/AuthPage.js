import React, { useContext } from 'react';
import Layout from '../../App/Layout/Layout';
import AuthContext from '../../../contexts/Global/AuthContext';
import PageP from '../../App/PageP/PageP';
import SectionP from '../../App/SectionP/SectionP';
import _ from 'lodash';
import AuthFinalForm from '../../Auth/AuthFinalForm/AuthFinalForm';
const AuthPage = () => {
    const { state, controller } = useContext(AuthContext);
    // console.log(authContext);
    return (
        <Layout>
            <PageP>
                <SectionP absolute parallax={{ minHight: '20rem' }} className='container ui'>
                    <div className='ui segment'>
                        <h1>Auth</h1>
                    </div>
                    <AuthFinalForm name='signIn' onSubmit={() => {}} />
                    {/* <div style={{ position: 'relative' }}>
                        <div dangerouslySetInnerHTML={{ __html }} />
                    </div> */}
                </SectionP>
            </PageP>
        </Layout>
    );
};

export default AuthPage;
