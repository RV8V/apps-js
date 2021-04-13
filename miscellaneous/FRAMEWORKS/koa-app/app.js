const Koa = require('koa')
const KoaRouter = require('koa-router')
const json = require('koa-json')
const path = require('path')
const render = require('koa-ejs')

const app = new Koa()
const router = new KoaRouter()

const PORT = process.env.PORT || 4000

router.get('/test', ctx => ctx.body = 'hello world from get route')

/*
 * app.use(async ctx => ctx.body = 'hello world')
 * app.use(json())
 */

render(app, {
  root: path.join(__dirname, 'views')
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
