import dotenv from 'dotenv';
import express from 'express';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import bodyParser from 'body-parser';
import {formatError} from 'apollo-errors';
import {authenticate} from './lib/authMiddleware.js';
import compression from 'compression';
import schema from './data/schema';
import {isInstance as isGraphqlError} from 'apollo-errors';
import {resolve} from 'path';
import fs from 'fs';
import morgan from 'morgan';

dotenv.config();

const PORT = process.env.PORT || 8080;
const DEV = process.env.NODE_ENV === 'development';

if (!DEV) {
  require('newrelic');
}

const app = express();

app.use(morgan('dev'));

// Compress all requests.
app.use(compression());

// Add latency in development..
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    setTimeout(next, 500);
  });
}

app.use(
  '/graphql',
  bodyParser.json(),
  // authenticate(process.env.OAUTH_CLIENT_ID), // removed, we don't need this
  graphqlExpress(req => ({
    schema,
    formatError,
    context: {user: req.user, ip: process.env.NODE_ENV = "development" ? "71.172.161.2" : req.ip}
  }))
);

app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

// Make sure it can find the SPA
const SPA_ROOT = resolve('../client/build');
const indexPath = resolve(SPA_ROOT, 'index.html');
if (!DEV && indexPath) {
  if (!fs.existsSync(indexPath)) {
    console.error("Can't find SPA static files. Exiting.");
    process.exit(1);
  }
}

// Serve SPA files
app.use(express.static(SPA_ROOT));

app.get('*', (req, res, next) => {
  res.sendFile(SPA_ROOT + '/index.html');
});

app.use((err, req, res, next) => {
  console.log(err);
  if (isGraphqlError(err)) {
    // If we threw the error, format it nicely.
    res.status(400).json(formatError(err));
  } else {
    // If something else broke, just give up.
    res.status(500).json({
      errors: {
        message: DEV ? err.message : 'Internal Error',
        ...(DEV ? {stack: err.stack} : {})
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Serving SPA from ${indexPath} on http://localhost:${PORT}/`);
  console.log(`GraphQl is now running on http://localhost:${PORT}/graphql`);
});
