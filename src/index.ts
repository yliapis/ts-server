// copied from https://blog.logrocket.com/how-to-set-up-node-typescript-express/

// src/index.js
import express, { Express, Request, Response } from "express";
const dotenv = require('dotenv');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
