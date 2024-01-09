// copied from https://blog.logrocket.com/how-to-set-up-node-typescript-express/

// src/index.js
import express, { type Express, type Request, type Response } from 'express'
import bodyParser from 'body-parser'

import dotenv from 'dotenv'

import type { Widget } from './widgetRepository'
import { createWidget, deleteWidget, listWidgets, updateWidget } from './widgetRepository'

dotenv.config()

// app setup

const app: Express = express()
app.use(bodyParser.json())
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

// Create / Update

interface CreateUpdateWidgetRequest {
  id?: string // optional because it's only used for updates
  name: string
}

interface CreateUpdateWidgetResponse {
  widget?: Widget
  status: string
}

app.post('/widget', (req: Request<unknown, unknown, CreateUpdateWidgetRequest>, res: Response<CreateUpdateWidgetResponse>) => {
  const name = (req.query.name as string || '')

  if (req.query.id !== undefined) {
    const id = parseInt(req.query.id as string)
    // Check if the widget exists

    const widget = updateWidget(id, name)

    if (widget !== null) {
      // Create a response object
      const createWidgetResponse: CreateUpdateWidgetResponse = {
        widget,
        status: 'success'
      }

      // Send the response as JSON
      res.json(createWidgetResponse)
    } else {
      res.status(400).json({
        status: `failure; widget with id ${id} does not exist`
      })
    }
  } else {
    const widget = createWidget(name)

    // Create a response object
    const createWidgetResponse: CreateUpdateWidgetResponse = {
      widget,
      status: 'success'
    }

    // Send the response as JSON
    res.json(createWidgetResponse)
  }
})

// Read

interface ListWidgetsResponse {
  widgets: Widget[]
  status: string
}

app.get('/widget', (req: Request, res: Response<ListWidgetsResponse>) => {
  // Retrieve all widgets and sort them by insert time ascending
  const allWidgets: Widget[] = listWidgets()

  // Create a response object
  const listWidgetsResponse: ListWidgetsResponse = {
    widgets: allWidgets,
    status: 'success'
  }

  // Send the response as JSON
  res.json(listWidgetsResponse)
})

// Delete

interface DeleteWidgetRequest {
  id: string
}

interface DeleteWidgetResponse {
  status: string
}

app.delete('/widget', (req: Request<unknown, unknown, DeleteWidgetRequest>, res: Response<DeleteWidgetResponse>) => {
  const id = parseInt(req.query.id as string)

  const success = deleteWidget(id)

  if (success) {
    res.json({ status: 'success' })
  } else {
    const deleteWidgetResponse: DeleteWidgetResponse = {
      status: `failure; widget with id ${id} does not exist`
    }

    res.status(400).json(deleteWidgetResponse)
  }
})

// begin listening

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
