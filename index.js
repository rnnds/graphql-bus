const express = require('express');
const axios = require('axios');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();
const port = process.env.PORT;

const schema = buildSchema(`
  type Query {
    ports: String
  }
`);

const root = {
    ports: async () => {
        let result = [];

        await axios.all([
            get('http://localhost:8096/ports'),
            get('http://localhost:8097/ports')
        ]).then(axios.spread(function (...args) {
            args.forEach(response => {
                result.push(response.data.port);
            });
        }));

        return JSON.stringify(result);
    }
}

function get(endpoint) {
    console.info('Requesting: %s', endpoint);
    return axios.get(endpoint);
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(port);