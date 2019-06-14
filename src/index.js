import { GraphQLServer } from 'graphql-yoga';
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')

// String, Boolean, Int, Float, ID.

// Demo Data

const sites = [
    {
        id: '123',
        name: 'E-Governance',
        logo: 'site-logo.jpg',
        defaultLanguage: 'en',
        pageNames: [
            'Home', 'Education', 'Policy'
        ]
    },
    {
        id: '1234',
        name: 'Medical',
        logo: 'site-logo.jpg',
        defaultLanguage: 'en',
        pageNames: [
            'Home', 'Education', 'Policy'
        ]
    }
];

const pages = [
    {
        id: '1',
        title: 'Home Page',
        metaDescription: null,
        metaKeyword: 'E-governance',
        metaRobots: null,
        routePath: 'home',
        isDefault: true,
        site: '123'
    },
    {
        id: '2',
        title: 'Education Page',
        metaDescription: null,
        metaKeyword: 'E-governance',
        metaRobots: null,
        routePath: 'home',
        isDefault: true,
        site: '123'
    },
    {
        id: '3',
        title: 'Policy Page',
        metaDescription: null,
        metaKeyword: 'E-governance',
        metaRobots: null,
        routePath: 'home',
        isDefault: true,
        site: '123'
    }
];
 
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
        sites: [Site!]!
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
        site: Site
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

        sites() {
            return sites;
        },

        page() {
            return {
                id: '123',
                title: 'Home Page Title',
                metaDescription: null,
                metaKeyword: 'E-governance',
                metaRobots: null,
                routePath: 'home',
                isDefault: true,
                site: '123'
            }
        },

        pages(parent, args) {
            if (args.pageId) {
                return pages.filter((page) => {
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
    },
    Page: {
        site(parent, args, ctx, info) {
            return sites.find((site) => {
                console.log(site.id, parent.site)
                return site.id === parent.site;
            })
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


// # Write your query or mutation here
// query {
//   message:hello(name: "to 1Rivet")
//   add(number1: 1, number2: 0)
//   orgName:org
//   place
//   about
//   site {
//     name
//     logo
//     defaultLanguage
//     pageNames
//   }
//   page {
//     id
//     title
//   }
//   pages(pageId: "1") {
//     title
//   }
// }

// query {
//     page {
//       id
//       title
//       site {
//         id
//         name
//       }
//     }
//   }