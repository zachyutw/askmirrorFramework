import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
const AppPage = React.lazy(() => import('../components/Pages/AppPage/AppPage'));
const HomPage = React.lazy(() => import('../components/Pages/HomePage/HomPage'));
const AuthPage = React.lazy(() => import('../components/Pages/AuthPage/AuthPage'));
const HtmlPage = React.lazy(() => import('../components/Pages/HtmlPage/HtmlPage'));
const ThreePage = React.lazy(() => import('../components/Pages/ThreePage/ThreePage'));
export const htmlRoute = {
    name: 'html',
    main: { path: '/html', name: 'main' }
};
export const authRoute = {
    name: 'auth',
    main: { path: '/auth', name: 'main' }
};
export const appRoute = {
    name: 'app',
    main: { path: '/', name: 'main' }
};
export const homeRoute = {
    name: 'home',
    main: { path: '/home', name: 'main' }
};
export const threeRoute = {
    name: 'three',
    main: { path: '/three', name: 'main' }
};

export const navMainFields = [ homeRoute, appRoute, authRoute, htmlRoute ];
const Routes = () => {
    return (
        <Switch>
            <Suspense fallback={<div>Loading...</div>}>
                <Route exact path={homeRoute.main.path} component={HomPage} />
                <Route path={authRoute.main.path} component={AuthPage} />
                <Route path={htmlRoute.main.path} component={HtmlPage} />
                <Route exact path={appRoute.main.path} component={AppPage} />
                <Route path={threeRoute.main.path} component={ThreePage} />
            </Suspense>
        </Switch>
    );
};
export default Routes;
