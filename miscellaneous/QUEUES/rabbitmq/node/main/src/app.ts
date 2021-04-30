import * as express from 'express'
import * as cors from 'cors'

import "reflect-metadata";
import { createConnection } from "typeorm";

import { Product } from './entities/product.entity'

createConnection({
  type: "mongodb",
  host: "localhost",
  port: 27018,
  username: "root",
  password: "password",
  database: "main",
  entities: ["src/entities/*.js"],
  synchronize: true,
  logging: false,
  cli: {
    entitiesDir: "src/entities"
  }
}).then(connection => {
  const app = express()
  const productRepository = connection.getRepository(Product)

  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
  }))

  app.use(express.json())

  app.listen(8001, () => {
    console.log('listening on port 8001 mongo')
  })
}).catch(error => console.log(error))
