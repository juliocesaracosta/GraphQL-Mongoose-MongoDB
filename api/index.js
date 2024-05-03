const { ApolloServer} = require ('apollo-server');
const { resolvers } = require('./resolvers.js');
const mongoose = require("mongoose");
const { typeDefs } = require('./models/typeDefs.js');
const  { InMemoryLRUCache } = require('@apollo/utils.keyvaluecache');

const MONGO_URI = "mongodb+srv://culiacan:1234-@cluster0.2xgtfpu.mongodb.net/prueba?retryWrites=true&w=majority&appName=Cluster0";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (req, res) => ({ req, res }),
  cache: new InMemoryLRUCache({
    // ~100MiB
    maxSize: Math.pow(2, 20) * 100,
    // 5 minutes (in seconds)
    ttl: 300,
  }),
});

server
.listen({port: process.env.PORT || 4000})
.then(({url}) => {
    console.log(`corriendo ${url}`)
    mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log(`Db Connected`);
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    });
})


//const handler = startServerAndCreateNextHandler(server, {
//  context: async (req, res) => ({ req, res }),
//})

//export default allowCors(handler)
