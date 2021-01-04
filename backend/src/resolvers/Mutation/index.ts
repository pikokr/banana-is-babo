import {IResolvers} from "graphql-tools";
// @ts-ignore
import config from '../../../config.json'
import fetch from "node-fetch";
import {DISCORD_API_ENDPOINT} from "../../constants";
import jwt from 'jsonwebtoken'
import Util from "../../Util";

export default {
    login: async (source, {code}: {code: string}, ctx) => {
        if (ctx.user) return null
        const params = new URLSearchParams({
            client_id: config.oauth2.clientID,
            code,
            client_secret: config.oauth2.clientSecret,
            redirect_uri: config.oauth2.callbackURI,
            grant_type: 'authorization_code',
            scope: 'identify'
        })
        const res = await fetch(DISCORD_API_ENDPOINT + '/oauth2/token', {
            body: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST'
        })
        const json = await res.json()
        if (res.status !== 200) return null
        if (!json.access_token) return null
        const user = await Util.safeFetch(DISCORD_API_ENDPOINT + '/users/@me', {
            headers: {
                Authorization: `${json.token_type} ${json.access_token}`
            }
        })
        const json2 = await user.json()
        if (user.status !== 200) return null
        return jwt.sign(json2, config.jwtSecret)
    }
} as IResolvers