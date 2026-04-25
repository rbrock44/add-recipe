import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Middleware to parse JSON request bodies
app.use(express.json());

/**
 * API endpoint to submit recipes securely
 * The API key is kept secret on the server and never exposed to the client
 */
app.post('/api/recipe/pending', async (req, res) => {
  try {
    const apiKey = process.env['RECIPE_API_KEY'];
    const externalApiUrl = process.env['PENDING_RECIPE_URL'] || 'https://home-page-api.ryan-brock.com/recipe/pending';

    if (!apiKey) {
      console.error('RECIPE_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Forward the request to the external API with the API key
    const response = await fetch(externalApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(req.body),
    });

    // Return the response from the external API to the client
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Error submitting recipe:', error);
    return res.status(500).json({ error: 'Failed to submit recipe' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
