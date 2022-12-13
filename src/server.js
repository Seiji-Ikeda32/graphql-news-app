import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone' ; 
import { PrismaClient } from '@prisma/client';

import fs from 'fs';

import Query from './resolvers/query';
import Mutaition from './resolvers/mutaition'; 
import Article from './resolvers/article';
import User from './resolvers/user';

// const Articles = require("./resolvers/articles");
// const Mutaition = require("./resolvers/mutaition");
// const Article = require("./resolvers/article");
// const User = require("./resolvers/user");

const GRAPHQL_FILE = "./src/schema.graphql";
const { getUserId } = require("./utils")
const prisma = new PrismaClient();

const resolvers = {
    Query,
    Mutaition,
    Article,
    User,
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(GRAPHQL_FILE,"utf-8"),
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async({req}) => ({
        ...req,
        prisma,
        userId: req && req.headers.authorization ? getUserId(req) : null,
    }),
});
  
console.log(`🚀  Server ready at: ${url}`);