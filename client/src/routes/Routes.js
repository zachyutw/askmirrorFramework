import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
const AppPage = React.lazy(() => import('../components/Pages/AppPage/AppPage'));
const Routes = (props) => {
    return (
        <Switch>
            <Suspense fallback={<div>Loading...</div>}>
                <Route exact path='/' component={AppPage} />
            </Suspense>
        </Switch>
    );
};
export default Routes;
