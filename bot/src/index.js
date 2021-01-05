const config = require('../config.json')
const io = require('socket.io-client')
const Discord = require('discord.js')

const client = new Discord.Client()

const socket = io(config.backend, {
    query: {
        auth: config.secret
    }
})

socket.on('connect', () => {
    console.log('Connected To IPC server.')
    client.login(config.token).then(() => {
        console.log('Connected To Discord.')
    })
})

socket.on('eval', data => {
    if (data.id === 'ping') {
        return socket.emit('response', {
            id: 'ping',
            data: true
        })
    }
    new Promise(resolve => resolve(eval(data.code))).then(res => {
        socket.emit('response', {
            response: res,
            id: data.id
        })
    })
})
