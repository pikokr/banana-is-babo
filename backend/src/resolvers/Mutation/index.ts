import {IResolvers} from "graphql-tools";
// @ts-ignore
import config from '../../../config.json'
import fetch from "node-fetch";
import {DISCORD_API_ENDPOINT} from "../../constants";
import jwt from 'jsonwebtoken'

export default {
    login: async (source, {code}: {code: string}, ctx) => {
        if (ctx.user) return null
        const params = new URLSearchParams({
            client_id: config.oauth2.clientID,
            code,
            client_secret: config.oauth2.clientSecret,
            redirect_uri: config.oauth2.redirect_uri,
            grant_type: 'authorization_code'
        })
        const res = await fetch(DISCORD_API_ENDPOINT + '/oauth2/token', {
            body: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        if (res.status !== 200) return null
        const json = await res.json()
        if (!json.access_token) return null
        const user = await fetch(DISCORD_API_ENDPOINT + '/users/@me', {
            headers: {
                Authorization: `${json.token_type} ${json.access_token}`
            }
        })
        if (user.status !== 200) return null
        return jwt.sign(await user.json(), config.jwtSecret)
    }
} as IResolvers