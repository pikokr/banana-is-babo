import {IResolvers} from "graphql-tools";
// @ts-ignore
import config from '../../../config.json'
import {DISCORD_API_ENDPOINT} from "../../constants";

export default {
    me: (source, args, context) => context.user || null,
    login: () => `${DISCORD_API_ENDPOINT}/oauth2/authorize?client_id=${config.oauth2.clientID}&redirect_uri=${encodeURIComponent(config.oauth2.callbackURI)}&response_type=code&scope=identify`
} as IResolvers