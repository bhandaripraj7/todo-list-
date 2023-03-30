import express, {Express, Request, Response } from 'express';
import cors from 'cors'
import {Pool, QueryResult} from 'pg'
const app: Express = express()
app.use(cors())
app.use(express.json())
const port = 3001

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ result: 'success' })
})

app.listen(port, () => {
console.log('server listening to the port $(port)');
})
app.get('/new', (req: Request, res: Response) => {
    const pool = openDb()
  
    pool.query('insert into task (description) values ($1) returning *',
    [req.body.description],
    (error: Error,result: QueryResult) => {
      if (error) {
        res.status(500).json({error: error.message})
      }
      res.status(200).json({id: result.rows[0].id})
    })
  })
  const openDb = (): Pool => {
    const pool: Pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'todo',
    password: 'root',
    port: 5432
  })
  return pool
}

