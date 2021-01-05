import 'graphql-import-node'
import {ApolloServer} from "apollo-server-express";
import schema from '../schema.graphql'
import resolvers from './resolvers'
// @ts-ignore
import config from '../config.json'
import jwt from 'jsonwebtoken'
import express from 'express'
import cors from 'cors'
import socketIO from 'socket.io'
import {createServer} from "http";
import * as uuid from 'uuid'

declare global {
    namespace Express {
        interface Request {
            io: socketIO.Server
            botEval(code: string): Promise<any>
        }
    }
}

const resolverMap = {} as any

const app = express()

const httpServer = createServer(app)

const io = require('socket.io')(httpServer) as socketIO.Server

io.use((socket, next) => {
    if ((socket.handshake.query as any).auth !== config.ipcSecret) return socket.disconnect(true)

    next()
})

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

app.use(cors())

io.sockets.on('response', data => {
    if (data.id) {
        if (resolverMap[data.id]) {
            resolverMap[data.id]()
        }
    }
})

app.use((req, res, next) => {
    req.io = io
    req.botEval = code => {
        return new Promise<any>(resolve => {
            const id = uuid.v4()
            resolverMap[id] = resolve
            io.sockets.emit('eval', {
                id,
                code
            })
        })
    }
    next()
})

server.applyMiddleware({app})

httpServer.listen(config.port, () => console.log('Listening'))
