import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone' ; 
import { PrismaClient } from '@prisma/client';

import fs from 'fs';

const GRAPHQL_FILE = "./src/schema.graphql";
const prisma = new PrismaClient();

const resolvers = {
    Query: {
        articles: async (parent, args, context) => {
            return context.prisma.article.findMany();
        },
    },

    Mutation: {
        post: (parent, args, context) => {
            const newArticle = context.prisma.article.create({
                data: {
                    url: args.url,
                    title: args.title,
                    author: args.author,
                }
            });
            return newArticle
        },
    },
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(GRAPHQL_FILE,"utf-8"),
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async() => ({
        prisma,
    }),
});
  
console.log(`🚀  Server ready at: ${url}`);