import React from 'react';
import Layout from "./components/Layout";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LoginCallback from "./views/LoginCallback";
import {useQuery} from "@apollo/client";
import {gql} from "@apollo/client/core";
import {ADMIN_ID} from "./CONSTANTS";
import AdminPage from "./views/AdminPage";

const App = () => {
    const {data} = useQuery(gql`
    query {
        user: me {
            id
        }
    }
    `)

    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/login" component={LoginCallback}/>
                    <Route render={({location}) => {
                        if (!data || !data.user || data.user.id !== ADMIN_ID) return null
                        return (
                            <Switch location={location}>
                                <Route exact path="/admin" component={AdminPage}/>
                            </Switch>
                        )
                    }}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
};

export default App;