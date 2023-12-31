import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import serverless from 'serverless-http';
import world from '../../src/charts/world';
import genreWorld from '../../src/charts/genreWorld';
import country from '../../src/charts/country';
import multiSearch from '../../src/search/multi';
import artistDetails from '../../src/artists/details';
import songDetails from '../../src/tracks/details';
import songRelated from '../../src/tracks/related';

const api = express();
api.use(bodyParser.json());
api.use(cors());

const router = Router();

world(router);
genreWorld(router);
country(router);
multiSearch(router);
artistDetails(router);
songDetails(router);
songRelated(router);

api.use('/', router);

export const handler = serverless(api);
