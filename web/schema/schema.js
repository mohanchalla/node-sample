const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema, GraphQLNonNull } = graphql;
const _ = require('lodash')
const Quote = require('../models/Quote')

const QuoteType = new GraphQLObjectType({
    name: "Quote",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        quote: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        status: {
            type: GraphQLString,
            resolve(parent, args){
                return "Welcome to GraphQL"
            }
        },
        quotes_by_name: {
            type: new GraphQLList(QuoteType),
            args: {name: { type: GraphQLString }},
            resolve(parent, args) {
                console.log("I am from here1", args);
                return Quote.find({ name: args.name });
            }
        },
        quotes: {
            type: new GraphQLList(QuoteType),
            resolve(parent, args) {
                console.log("I am from here2", args);
                return Quote.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        createQuote: {
            type: QuoteType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                quote: { type: GraphQLString }
            },
            resolve(parent, args) {
                const quote = new Quote({
                    name: args.name.trim(),
                    quote: args.quote
                });
                return quote.save()
            }
        },
        updateQuote: {
            type: QuoteType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                quote: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return Quote.findOneAndUpdate({name: args.name},
                {
                  $set: {
                    name: args.name,
                    quote: args.quote
                  }
                }, { upsert: true, new: true}
                );
            }
        },
        deleteQuote: {
            type: QuoteType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                console.log(args.name);
                let deletedQuote = await Quote.find({ name: args.name });
                let data = await Quote.deleteOne({name: args.name});
                return deletedQuote[0];
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})