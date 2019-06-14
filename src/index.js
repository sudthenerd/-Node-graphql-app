import { GraphQLServer } from 'graphql-yoga';
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')

// String, Boolean, Int, Float, ID.
 
// Type Definitions (Schemas)
const typeDefs = `
    type Query {
        hello(name: String): String!
        add(number1: Int!, number2: Int): Boolean!
        org: String!
        place: String!
        about: String!
        site: Site!
        page: Page!
        pages(pageId: String): [Page!]!
    }

    type Site {
        id: ID!
        name: String!
        logo: String!
        defaultLanguage: String!,
        pageNames: [String!]!
    }

    type Page {
        id: ID!
        title: String!
        metaDescription: String
        metaKeyword: String
        metaRobots: String
        routePath: String!
        isDefault: Boolean!
    }

    type Language {
        id: ID!
        name: String!
    }
`;

// Resolver
const resolvers = {
    Query: {
        site() {
            return {
                id: '123',
                name: 'E-Governance',
                logo: 'site-logo.jpg',
                defaultLanguage: 'en',
                pageNames: [
                    'Home', 'Education', 'Policy'
                ]
            }
        },

        page() {
            return {
                id: '1',
                title: 'Home Page Title',
                metaDescription: null,
                metaKeyword: 'E-governance',
                metaRobots: null,
                routePath: 'home',
                isDefault: true,
            }
        },

        pages(parent, args) {
            const page = [
                {
                    id: '1',
                    title: 'Home Page',
                    metaDescription: null,
                    metaKeyword: 'E-governance',
                    metaRobots: null,
                    routePath: 'home',
                    isDefault: true,
                },
                {
                    id: '2',
                    title: 'Education Page',
                    metaDescription: null,
                    metaKeyword: 'E-governance',
                    metaRobots: null,
                    routePath: 'home',
                    isDefault: true,
                },
                {
                    id: '3',
                    title: 'Policy Page',
                    metaDescription: null,
                    metaKeyword: 'E-governance',
                    metaRobots: null,
                    routePath: 'home',
                    isDefault: true,
                }
            ];

            if (args.pageId) {
                return page.find((page) => {
                    return page.id === args.pageId;
                });
            } else {
                return pages;
            }
        },

        hello(parent, args) {
            if (args.name) {
                return `Hey Community, Welcome ${args.name} !!`
            }

            return `Hey Community, Welcome All !!`
        },

        add(parent, args) {
            return !!(args.number1 + args.number2);
        },

        org() {
            return '1Rivet';
        },

        place() {
            return 'Valsad';
        },

        about() {
            return 'IT Service Provider Firm'
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
     console.log('Server started at localhost: 4000')
})