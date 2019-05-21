import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
const AppPage = React.lazy(() => import('../components/Pages/AppPage/AppPage'));
const HomPage = React.lazy(() => import('../components/Pages/HomePage/HomPage'));
const Routes = () => {
    return (
        <Switch>
            <Suspense fallback={<div>Loading...</div>}>
                <Route exact path='/' component={AppPage} />
                <Route exact path='/home' component={HomPage} />
            </Suspense>
        </Switch>
    );
};
export default Routes;
