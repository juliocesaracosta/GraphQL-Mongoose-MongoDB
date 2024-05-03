const { ApolloServer} = require ('apollo-server');
const { resolvers } = require('./resolvers.js');
const mongoose = require("mongoose");
const { typeDefs } = require('./models/typeDefs.js');
const  { InMemoryLRUCache } = require('@apollo/utils.keyvaluecache');

const MONGO_URI = "mongodb+srv://culiacan:1234-@cluster0.2xgtfpu.mongodb.net/prueba?retryWrites=true&w=majority&appName=Cluster0";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: new InMemoryLRUCache({
    // ~100MiB
    maxSize: Math.pow(2, 20) * 100,
    // 5 minutes (in seconds)
    ttl: 300,
  }),
});

mongoose
.connect(MONGO_URI)
.then(() => {
  console.log(`db connected`);
  return server.listen({port: process.env.PORT || 4000})
})
.then((res)=> {
  console.log(`Server is running on port ${res.url}`);
})
.catch(err => {
  console.log(err.message);
});



//const handler = startServerAndCreateNextHandler(server, {
//  context: async (req, res) => ({ req, res }),
//})

//export default allowCors(handler)
