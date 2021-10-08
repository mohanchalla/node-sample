const { buildSchema } = require('graphql');
const Quote = require('../models/Quote')

var schema = buildSchema(`
    type Query {
        status: String
        quotes_by_name(name: String!): [Quote]
        quotes: [Quote]
    }

    type Mutation {
        createQuote(name: String!, quote: String): Quote
        updateQuote(name: String!, quote: String): Quote
        deleteQuote(name: String!): Quote
    }

    type Quote {
        id: ID,
        name: String!,
        quote: String
    }
`)

var resolvers = {
    status: () => "Welcome to GraphQL",
    quotes_by_name: ({name}) => {
        return Quote.find({ name: name });
    },
    quotes: () => {
        return Quote.find({});
    },
    createQuote: ({name, quote}) => {
        const newQuote = new Quote({
            name: name.trim(),
            quote: quote
          });
        return newQuote.save()
    },
    updateQuote: ({name, quote}) => {
        return Quote.findOneAndUpdate({name: name},
            {
                $set: {
                name: name,
                quote: quote
                }
            }, { upsert: true, new: true}
            );       
    },
    deleteQuote: async ({name}) => {
        let deletedQuote = await Quote.find({ name: name });
        let data = await Quote.deleteOne({name: name});
        return deletedQuote[0];
    }
}

exports.schema = schema
exports.resolvers = resolvers