import React from 'react';
import Layout from "./components/Layout";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LoginCallback from "./views/LoginCallback";

const App = () => {
    return (
        <Layout>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={LoginCallback}/>
                </Switch>
            </BrowserRouter>
        </Layout>
    );
};

export default App;