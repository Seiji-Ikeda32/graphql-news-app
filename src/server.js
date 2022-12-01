import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone' ; 

import fs from 'fs';

const GRAPHQL_FILE = "./src/schema.graphql";

const articles = [
    {
      id: 1,
      url: "hoge",
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      id: 2,
      url: "hoge",
      title: 'City of Glass',
      author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        articles: () => articles,
    },

    Mutation: {
        post: (parent, args) => {
            let totalCount = articles.length;

            const article = {
                id: totalCount++,
                url: args.url,
                title: args.title,
                author: args.author
            }
            articles.push(article);
            return article
        }
    }
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(GRAPHQL_FILE,"utf-8"),
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);