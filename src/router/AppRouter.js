import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { LandingPage } from 'pages/LandingPage/LandingPage';
import { PublicRoute } from 'router/PublicRoute';
import { PrivateRoute } from 'router/PrivateRoute';
import { MyDesignsPage } from 'pages/Navigation/MyDesigns/MyDesignsPage';
import { UserProfile } from 'pages/User/UserProfile/UserProfile';
import { useAuthState } from 'contexts/AuthContext';
import { NavBar } from 'components/NavBar';
import { UserConfigProvider} from 'contexts/UserConfigContext';
import { Footer } from 'components/Footer';
import { CssBaseline, Grow, makeStyles } from '@material-ui/core';
import { SharedWithMePage } from 'pages/Navigation/SharedWithMe/SharedWithMePage';
import { PublicRepositoryPage } from 'pages/Navigation/PublicRepository/PublicRepositoryPage';
import { SearchUsersPage } from 'pages/User/SearchUsersPage/SearchUsersPage';
import { DesignPage } from 'pages/DesignPage/DesignPage';
import { SnackbarProvider } from 'notistack';
import { ConfirmationModal } from 'components/ConfirmationModal';

const useStyles = makeStyles((theme) => ({
    '@global': {
        //Ancho del scrollbar    
        '*::-webkit-scrollbar': {
            width: '0.4em',
        },
        //Sombra del scrollbar
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.2)'
            
        },
        //Scrollbar
        '*::-webkit-scrollbar-thumb': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.2)',
            borderRadius: '15px',
            backgroundColor: 'rgba(0,0,0,.1)',
        }
    },
}));

export const AppRouter = () => {
    const { authState, verifyToken } = useAuthState();
    const { token, checking } = authState;
    useStyles();

    useEffect(() => {
        verifyToken();
    }, [verifyToken]);

    if (checking) {
        return <h1>Espere...</h1>;
    }

    return (
        <Router>
            <div>
                <UserConfigProvider>
                    <CssBaseline/>
                    <NavBar />
                    <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'bottom',horizontal: 'left',}} TransitionComponent={Grow}>
                        <Switch>
                            <PublicRoute exact path="/" component={ LandingPage } isAuthenticated={!checking && !!token }/>
                            <PrivateRoute exact path="/profile/:uid" component={ UserProfile } isAuthenticated={ !checking && !!token }/>
                            <PrivateRoute exact path="/my-designs" component={MyDesignsPage} isAuthenticated={!checking && !!token }/>
                            <PrivateRoute path="/my-designs/:urlPath+/" component={MyDesignsPage} isAuthenticated={!checking && !!token }/>
                            <PrivateRoute exact path="/shared-with-me" component={SharedWithMePage} isAuthenticated={!checking && !!token }/>
                            <PrivateRoute exact path="/public-repository" component={PublicRepositoryPage} isAuthenticated={!checking && !!token }/>
                            <PrivateRoute exact path="/users/search" component={SearchUsersPage} isAuthenticated={!checking && !!token }/>
                            <PrivateRoute exact path="/designs/:id" component={DesignPage} isAuthenticated={!checking && !!token }/>
                            <Redirect to="/" />
                        </Switch>
                        <ConfirmationModal />
                    </SnackbarProvider>
                    <Footer />
                </UserConfigProvider>
            </div>
        </Router>
    );
};
