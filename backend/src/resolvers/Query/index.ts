import {IResolvers} from "graphql-tools";

export default {
    me: (source, args, context) => context.user || null
} as IResolvers