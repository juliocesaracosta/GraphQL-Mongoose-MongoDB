const { ApolloServer} = require ('apollo-server');
const { resolvers } = require('./resolvers.js');
const mongoose = require("mongoose");
const { typeDefs } = require('./models/typeDefs.js');

const MONGO_URI = "mongodb+srv://cesar:1234-@cluster0.2xgtfpu.mongodb.net/prueba?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Db Connected`);
  })
  .catch(err => {
    console.log(err.message);
  });


const server = new ApolloServer({typeDefs, resolvers});

server
.listen({port: process.env.PORT || 4000})
.then(({url}) => {
    console.log(`corriendo ${url}`)
})
