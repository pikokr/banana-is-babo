import 'graphql-import-node'
import {ApolloServer} from "apollo-server";
import schema from '../schema.graphql'
import resolvers from './resolvers'
// @ts-ignore
import config from '../config.json'
import jwt from 'jsonwebtoken'

const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers as any,
    context: ({req}) => {
        let result = {} as any
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            const token = req.headers.authorization.slice('Bearer '.length)
            try {
                result.user = jwt.verify(token, config.jwtSecret)
            } catch {
                result.user = null
            }
        }
        return result
    }
})

server.listen(config.port, () => console.log('Listening'))
