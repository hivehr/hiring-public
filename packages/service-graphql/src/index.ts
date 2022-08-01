import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

export const start = async (): Promise<void> => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: "bounded"
    });

    const { url } = await server.listen();
    console.log(`🚀 service-graphql ready @ ${url}`);
};

start();
