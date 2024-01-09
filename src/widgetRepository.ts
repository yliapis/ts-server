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
