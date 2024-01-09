// copied from https://blog.logrocket.com/how-to-set-up-node-typescript-express/

// src/index.js
import express, { type Express, type Request, type Response } from 'express'
import bodyParser from 'body-parser'

import dotenv from 'dotenv'

dotenv.config()

// app setup

const app: Express = express()
app.use(bodyParser.json())
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

// internal storage; volatile db for now

const widgetsMap: Map<number, Widget> = new Map<number, Widget>()

// Create / Update

interface Widget {
  id: number
  name: string
  createdAt: Date
}

interface CreateUpdateWidgetRequest {
  id?: string // optional because it's only used for updates
  name: string
}

interface CreateUpdateWidgetResponse {
  widget?: Widget
  status: string
}

app.post('/widget', (req: Request<unknown, unknown, CreateUpdateWidgetRequest>, res: Response<CreateUpdateWidgetResponse>) => {
  const id = parseInt(req.query.id as string)
  const name = (req.query.name as string || '')

  if (id) {
    // Check if the widget exists
    if (widgetsMap.has(id)) {
      // Update the widget
      const widget: Widget = widgetsMap.get(id)!
      widget.name = name

      // Create a response object
      const createWidgetResponse: CreateUpdateWidgetResponse = {
        widget,
        status: 'success'
      }

      // Send the response as JSON
      res.json(createWidgetResponse)
    } else {
      // Create a response object
      const createWidgetResponse: CreateUpdateWidgetResponse = {
        status: `failure; widget with id ${id} does not exist`
      }

      // Send the response as JSON
      res.status(400).json(createWidgetResponse)
    }
  } else {
    const randomNumber: number = Math.floor(Math.random() * 1000000000000000)

    const widget: Widget = {
      id: randomNumber,
      name,
      createdAt: new Date()
    }

    // Insert the widget into the map using its id as the key
    widgetsMap.set(widget.id, widget)

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
  const allWidgets: Widget[] = Array.from(widgetsMap.values()).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

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

  // Check if the widget exists
  if (widgetsMap.has(id)) {
    // Delete the widget from the map
    widgetsMap.delete(id)

    // Create a response object
    const deleteWidgetResponse: DeleteWidgetResponse = {
      status: 'success'
    }

    // Send the response as JSON
    res.json(deleteWidgetResponse)
  } else {
    // Create a response object
    const deleteWidgetResponse: DeleteWidgetResponse = {
      status: `failure; widget with id ${id} does not exist`
    }

    // Send the response as JSON
    res.status(400).json(deleteWidgetResponse)
  }
})

// begin listening

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
