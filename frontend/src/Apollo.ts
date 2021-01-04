import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: 'http://localhost:1234/graphql'
})

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? 'Bearer ' + token : ''
        }
    }
})

export default new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})