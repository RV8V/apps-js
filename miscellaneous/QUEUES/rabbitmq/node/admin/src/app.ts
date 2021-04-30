import * as express from 'express'
import * as cors from 'cors'

import "reflect-metadata";
import { createConnection } from "typeorm";

import { Product } from './entities/product.entity'

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "username",
  password: "password",
  database: "database",
  entities: ["src/entities/*.js"],
  synchronize: true,
  logging: false
}).then(connection => {
  const app = express()
  const productRepository = connection.getRepository(Product)

  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
  }))

  app.use(express.json())

  app.get('/products', async (req, res) => {
    return res.json({
      products: await productRepository.find()
    })
  })

  app.post('/products', async (req, res) => {
    return res.send(
      await productRepository.save(
        await productRepository.create(req.body)
      )
    )
  })

  app.get('/products/:id', async (req, res) => {
    return res.json({
      product: await productRepository.findOne(req.params.id)
    })
  })

  app.put('/products/:id', async (req, res) => {
    const product = await productRepository.findOne(req.params.id)
    productRepository.merge(product, req.body)
    return res.json({
      product: await productRepository.save(product)
    })
  })

  app.delete('/products/:id', async (req, res) => {
    return res.json({
      product: await productRepository.delete(req.params.id)
    })
  })

  app.post('/products/:id/like', async (req, res) => {
    const product = await productRepository.findOne(req.params.id)
    product.likes++
    const result = await productRepository.save(product)
    return res.send(result)
  })

  app.listen(8000, () => {
    console.log('listening on port 8000 mysql')
  })
}).catch(error => console.log(error))
