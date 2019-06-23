import React, { useEffect, useCallback } from 'react';
import Layout from '../../App/Layout/Layout';
import PageP from '../../App/PageP/PageP';
import SectionP from '../../App/SectionP/SectionP';

import _ from 'lodash';
const MapPage = () => {
    return (
        <Layout>
            <PageP>
                <SectionP absolute className='container ui'>
                    <div className='ui segment'>
                        <h1>Three</h1>
                    </div>
                </SectionP>
            </PageP>
        </Layout>
    );
};

export default MapPage;
