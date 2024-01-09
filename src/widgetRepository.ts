// import { MongoClient } from 'mongodb'
// import dotenv from 'dotenv'

// const mongodbUri = process.env.MONGODB_URI
// const client = new MongoClient(mongodbUri)
// await client.connect()

// const db = client.db()

export interface Widget {
  id: number
  name: string
  createdAt: Date
}

// internal storage; volatile db for now

export const widgetsMap: Map<number, Widget> = new Map<number, Widget>()

// const createWidget

export const createWidget = (name: string): Widget => {
  const randomNumber: number = Math.floor(Math.random() * 1000000000000000)

  const widget: Widget = {
    id: randomNumber,
    name,
    createdAt: new Date()
  }

  widgetsMap.set(randomNumber, widget)

  return widget
}

// const updateWidget

export const updateWidget = (id: number, name: string): Widget | null => {
  if (widgetsMap.has(id)) {
    const widget: Widget = widgetsMap.get(id)!
    widget.name = name

    return widget
  } else {
    return null
  }
}

// const deleteWidget

export const deleteWidget = (id: number): boolean => {
  if (widgetsMap.has(id)) {
    widgetsMap.delete(id)
    return true
  } else {
    return false
  }
}

// const getWidgets

export const listWidgets = (): Widget[] => {
  return Array.from(widgetsMap.values()).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
}
