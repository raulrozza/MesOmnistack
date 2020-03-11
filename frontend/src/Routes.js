import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Main from './Pages/Main';

const Routes = () => (
    <>
    <Helmet>
        <title>EJEC Quiz</title>
        <meta name="description" content="Um jogo de perguntas e respostas." />
	    <link href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&amp;subset=devanagari,latin-ext" rel="stylesheet" />
    </Helmet>
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
        </Switch>
    </BrowserRouter>
    </>
);

export default Routes;