import 'graphql-import-node'
import {ApolloServer} from "apollo-server";
import schema from '../schema.graphql'
import resolvers from './resolvers'
// @ts-ignore
import config from '../config.json'

const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers as any
})

server.listen(config.port, () => console.log('Listening'))
