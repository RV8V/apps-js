'use strict'
// >>>>>>>>>>>>>>>>> api/controllers/orders.js <<<<<<<<<<<<<<<<<<<<<<<<<
/*
const mongoose = require('mongoose')

const Product = require('../models/product')
const Order = require('../models/order')

exports.orders_get_all = /*checkAuth*/ //(req, res, next) => {
  /*res.status(200).json({
    message: 'Orders were fetched'
  })*/
/*  Order.find().select('product quantity _id').populate('product', 'name').exec()
    .then(docs => res.status(200).json({
      count: docs.length,
      orders: docs.map(doc => {
        return {
          _id: doc.id,
          product: doc.product,
          quantity: doc.quantity,
          request: {
            type: 'GET',
            url: `http://localhost:3000/orders/${doc._id}`
          }
        }
      })
    }))
    .catch(err => res.status(500).json(err))
}

exports.orders_create_order = /*checkAuth,*/ //(req, res, next) => { --------------
  /*const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  }*/
/*  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: 'Product not found'
        })
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      })
      return order.save()
    })
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Order stored',
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: 'GET',
          url: `http://localhost:3000/orders/${result._id}`
        }
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
    /*res.status(201).json({
      message: 'Order was created',
      order: order
    })*/
/*}

exports.orders_get_order = (req, res, next) => {
  /*res.status(200).json({
    message: 'Order details',
    orderId: req.params.orderId
  })*/
/*  Order.findById(req.params.orderId).populate('product').exec()
    .then(order => {
      if (!order) return res.status(404).json({
        message: 'Order not found'
      })
      res.status(200).json({
        order: order,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/orders'
        }
      })
    })
    .catch(err => res.status(500).json(err))
}

exports.order_delete_order = (req, res, next) => {
  /*res.status(200).json({
    message: 'Order deleted',
    orderId: req.params.orderId
  })*/
/*  Order.remove({ _id: req.params.orderId }).exec(), 'name'
    .then(result => res.status(200).json({
      message: 'Order deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/orders',
        body: { productId: 'ID', quantity: 'Number' }
      }
    }))
    .catch(err => res.status(500).json(err))
}
*/

// ===============================================





// >>>>>>>>>>>>>>>>>>>> api/controllers/products.js <<<<<<<<<<<<<<<<<<<<<<<<<<

/*
const Product = require('../models/product')
const mongoose = require('mongoose')

exports.products_get_all = (req, res, next) => {
  Product.find().select('name price _id productImage').exec()
     .then(docs => {
       const response = {
         count: docs.length,
         products: docs.map(doc => {
           return {
             name: doc.name,
             price: doc.price,
             productImage: doc.productImage,
             _id: doc._id,
             request: {
               type: 'GET',
               url: `http://localhost:3000/products/${doc._id}`
             }
           }
         })
       }
       res.status(200).json(response)
     })
     .catch(err => {
       console.log(err)
       res.status(500).json({ error: err })
     })
}

exports.products_create_product = (req, res, next) => {
  //console.log(req.file)
  /*
  const product = {
    name: req.body.name,
    price: req.body.price
  }
  */
/*  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  })
  product
     .save()
     .then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Created product successfully ',
      createdProduct: {
        name: result.name,
        price: result.price,
        _id: result._id,
        request: {
          type: 'GET',
          url: `http://localhost:3000/products/${result._id}`
        }
      }
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: err })
  })
}

exports.products_get_product = (req, res, next) => {
  const id = req.params.productId
  Product.findById(id).select('name price _id productImage').exec()
     .then(doc => {
       console.log('From database', doc)
       if (doc) {
         res.status(200).json({
           product: doc,
           request: {
             type: 'GET',
             description: 'Get all products',
             url: 'http://localhost:3000/products'
           }
         })
       } else {
         res.status(404).json({ message: 'No valid entry found for provided ID' })
       }
     })
     .catch(err => {
       console.log(err)
       res.status(500).json({ error: err })
     })

}

exports.products_update_product = (req, res, next) => {
  /*res.status(200).json({
    message: 'Updated product'
  })*/
/*  const id = req.params.productId
  const updateOps = {}
  for (const ops of req.body) { // req.body is an array
    updateOps[ops.propName] = ops.value
  }
  Product.update({ _id: id }, { $set: updateOps/* = { name: req.body.newName, price: req.body.newPrice }*/// }).exec() -------
/*    .then(result => {
      res.status(200).json({
        message: 'Product updated',
        request: {
          type: 'GET',
          url: `http://localhost:3000/products/${id}`
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
}

exports.products_delete_product = (req, res, next) => {
  /*res.status(200).json({
    message: 'Deleted product'
  })*/
/*  const id = req.params.productId
  Product.remove({ _id: id }).exec()
    .then(result => res.status(200).json({
      message: 'Product deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/products',
        body: { name: 'String', price: 'Number' } // give instructions
      }
    }))
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
}
*/

// =============================





// >>>>>>>>>>>>>>>>>>>> api/controllers/user.js <<<<<<<<<<<<<<<<<<<<<<<<<<

/*
'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email }).exec()
    .then(user => {
      if (user.length >= 1) return res.status(409/*422*///).json({ message: 'Mail exsists' }) ----
  /*    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err })
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash
        })
        user.save()
          .then(result => {
            console.log(result)
            res.status(201).json({ message: 'User created' })
          })
          .catch(err => res.status(500),json({ error: err }))
      })
    })
}

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email }).exec()
  .then(user => { // user it is an array
    if (user.length < 1) return res.status(/*404*///401).json({ message: /*'Mail not found, user does not exist'*/'Auth failed' }) -----
/*    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) return res.status(401).json({ message: 'Auth failed' })
      if (result) {
        const token = jwt.sign({ email: user[0].email, userId: user[0].userId }, process.env.JWT_KEY, { expiresIn: '1h' })
        return res.status(200).json({ message: 'Auth successfull', token: token })
      }
      res.status(401).json({ message: 'Auth failed' })
    })
  })
  .catch(err => res.status(500),json({ error: err }))
}

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId }).exec()
    .then(result => res.status(200).json({ message: 'User deleted' }))
    .catch(err => res.status(500),json({ error: err }))
}
*/

/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

// ************************ API/MIDDLEWARE ******************************

/*
'use strict'

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    //console.log(token)
    const decoded = jwt.verify(/*req.body.token*///token, process.env.JWT_KEY) ---
  /*  req.userDate = decoded
    next()
  } catch(error) {
    res.status(401).json({ message: 'Auth failed' })
  }
}

*/

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// ^^^^^^^^^^^^^^^^^^^^^^ API/MODELS/order_product_user ^^^^^^^^^^^^^^^^^^^^^^^^^^

/*
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 }
})

module.exports = mongoose.model('Order', orderSchema)
*/

// ||||||||

/*
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: /*String,*/ //{ type: String, required: true }, ----
//  price: /*Number*/ { type: Number, required: true },
/*  productImage: { type: String, required: true }
})

module.exports = mongoose.model('Product', productSchema)
*/

// |||||||||

/*
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
  password: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema)
*/


// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// ++++++++++++++++++++++ API/ROUTES/order.js_products.js_user.js +++++++++++++++++++++++++++++++

/*
const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const OrdersControllers = require('../controllers/orders')

// Handle incomming GET requests to /orders
router.get('/', checkAuth, OrdersControllers.orders_get_all)
router.post('/', checkAuth, OrdersControllers.orders_create_order)
router.get('/:orderId', checkAuth, OrdersControllers.orders_get_order)
router.delete('/:orderId', checkAuth, OrdersControllers.order_delete_order)

module.exports = router
*/

// ||||||

/*

const express = require('express')
const router = express.Router()
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')

const ProductsControllers = require('../controllers/products')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.minetype === 'image/jpeg' || file.minetype === 'image/png') {
    cb(null, true)// accept -- store the file
  } else {
    cb(null, false) // not storage
  }
}

const upload = multer(/*{ des: 'uploads/' }*///{ storage: storage, limits: { fileSize: 1025 * 1024 * 5 }, fileFilter: fileFilter }) ----
/*
router.get('/', ProductsControllers.products_get_all)
router.post('/', checkAuth,/*1. checkAuth*/ //upload.single('productImage'), /*2. checkAuth*/ ProductsControllers.products_create_product) --
/*router.get('/:productId', ProductsControllers.products_get_product)
router.patch('/:productId', checkAuth, ProductsControllers.products_update_product)
router.delete('/:productId', checkAuth, ProductsControllers.products_delete_product)

module.exports = router

// ==================== TESTING CODE -------- UNEXPECTED END OF FILE =================

//router.get('/', (req, res, next) => {
  /* 1. res.status(200).json({
    message: 'Handling GET requests tp /products'
  })*/
/*  Product.find().exec()
    .then(docs => {
      console.log(docs)
      res.status(200).json(docs)
    })
    .catch(err => {
      console.error.bind(console, err.name)
      res.status(500).json({ error: err })
    })
})

router.post('/', (req, res, next) => {
  /*1. const product = {
    name: req.body.name,
    price: req.body.price
  }*/
/*  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  })
  product.save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Handling POST requests tp /products',
        createdProduct: result
      })
    })
    .catch(error => {
      process.stderr.write(err)
      res.status(500).json({ error: err })
    })
})

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId

  /*1. if (id === 'special') {
    res.status(200).json({
      message: 'You discovered the special ID',
      id: id
    })
  } else {
    res.status(200).json({
      message: 'You passed an ID'
    })
  }*/
/*  Product.findById(id).exec() // we can use callback instead of promises in order to get result and handle errors
    .then(doc => {
      console.log(`From database: ${doc}`)
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({ message: `No valid entry found for provided id: ${id}`` })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
 /*promises run asynchronously we do not write here --- res.status(200)... -- so inside then*/
/*})

router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated product'
  })
})

router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted product'
  })
})

module.exports = router
// ==================== TESTING CODE -------- UNEXPECTED END OF FILE =================
 */

// |||||||||||

/*

const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const UserController = require('../controllers/user')

router.post('/signup', UserController.user_signup)
router.post('/login', UserController.user_login)
router.delete('/:userId', checkAuth, UserController.user_delete)

module.exports = router
*/

// ||||||||||||||||||||||||||||||||||||||||||||||||||

// ---------------------------------- APP --------------------------------------

/*
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products')
//const productRoutes = require('./draft')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/user')

mongoose.connect(`mongodb+srv://Ruslan:${process.env.MONGO_ATLAS_PW}@cluster0-1xlfl.mongodb.net/test?retryWrites=true&w=majority`, { useMongoClient: true })
mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.methods === 'OPTIONS') {
    req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

// Routes that should handle requests
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/user', userRoutes)

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status(404) // correct -- error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app
*/
