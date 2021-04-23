const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const app = express();
const cors = require("cors");

app.use(cors());

const authors = [
  { id: 1, name: "J. K. Rowling" },
  { id: 2, name: "J. R. R. Tolkien" },
  { id: 3, name: "Brent Weeks" },
];

const locations = [
  { id: 1, location: "Kelowna" },
  { id: 2, location: "Vancouver" },
  { id: 3, location: "São Paulo" },
  { id: 2, location: "Mexico City" },
];

const books = [
  {
    id: 1,
    name: "Harry Potter and the Chamber of Secrets",
    authorId: 1,
    locationId: 1,
  },
  {
    id: 2,
    name: "Harry Potter and the Prisoner of Azkaban",
    authorId: 1,
    locationId: 3,
  },
  {
    id: 3,
    name: "Harry Potter and the Goblet of Fire",
    authorId: 1,
    locationId: 2,
  },
  { id: 4, name: "The Fellowship of the Ring", authorId: 2, locationId: 2 },
  { id: 5, name: "The Two Towers", authorId: 2, locationId: 3 },
  { id: 6, name: "The Return of the King", authorId: 2, locationId: 1 },
  { id: 7, name: "The Way of Shadows", authorId: 3, locationId: 3 },
  { id: 8, name: "Beyond the Shadows", authorId: 3, locationId: 2 },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book written by an author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find((author) => author.id === book.authorId);
      },
    },
    location: {
      type: LocationType,
      resolve: (book) => {
        return locations.find((location) => location.id === book.locationId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents the author type",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const LocationType = new GraphQLObjectType({
  name: "Location",
  description: "This represents a location type",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    location: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: "List of books",
      resolve: () => books,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of authors",
      resolve: () => authors,
    },
    locations: {
      type: new GraphQLList(LocationType),
      description: "List of locations",
      resolve: () => locations,
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add a book",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
        };
        books.push(book);
        return book;
      },
    },
    addAuthor: {
      type: AuthorType,
      description: "Add an author",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const author = { id: authors.length + 1, name: args.name };
        authors.push(author);
        return author;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);
app.listen(8000, () => console.log("Server is running"));
