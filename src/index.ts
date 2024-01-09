// copied from https://blog.logrocket.com/how-to-set-up-node-typescript-express/

// src/index.js
import express, { Express, Request, Response } from "express";
import bodyParser from 'body-parser';

const dotenv = require('dotenv');

dotenv.config();


// app setup

const app: Express = express();
app.use(bodyParser.json());
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// internal storage; volatile db for now

const widgets: Widget[] = [];

// Create

interface Widget {
  id: number;
  name: string;
  createdAt: Date;
}

interface CreateWidgetRequest {
  name: string;
}

interface CreateWidgetResponse {
  widget?: Widget;
  status: string;
}

app.post('/widget', (req: Request<{}, {}, CreateWidgetRequest>, res: Response<CreateWidgetResponse>) => {

  const name = req.query.name || '';

  const randomNumber: number = Math.floor(Math.random() * 1000000000000000)

  const widget: Widget = {
    id: randomNumber,
    name: name as string,
    createdAt: new Date()
  }

  // Add the widget to the list
  widgets.push(widget);

  // Create a response object
  const createWidgetResponse: CreateWidgetResponse = {
    widget: widget,
    status: 'success'
  };

  // Send the response as JSON
  res.json(createWidgetResponse);
});
// Generate a random number with 16 digits
;


// Read

interface ListWidgetsResponse {
  widgets: Widget[];
  status: string;
}

app.get('/widget', (req: Request, res: Response<ListWidgetsResponse>) => {
  // Retrieve all widgets
  const allWidgets: Widget[] = widgets;

  // Create a response object
  const listWidgetsResponse: ListWidgetsResponse = {
    widgets: allWidgets,
    status: 'success'
  };

  // Send the response as JSON
  res.json(listWidgetsResponse);
});


// begin listening

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
