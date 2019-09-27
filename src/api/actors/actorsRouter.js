const Router = require('@koa/router');
const ActorsController = require('./actorsController')

const routes = new Router()
const controller = new ActorsController();

routes.get('/actors', controller.get)

module.exports = routes;