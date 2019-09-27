'use strict';

const Koa = require('koa');
const actorsRouter = require('./api/actors/actorsRouter');
const koaBody = require('koa-body');
const cacheable = require('./middleware/cacheable')

class App extends Koa {
    constructor(...params) {
        super(...params);

        this._configureMiddlewares();
        this._configureRoutes();
    }

    _configureMiddlewares() {
        this.use(koaBody({
            jsonLimit: '10mb'
        }));

        this.use(cacheable);

        this.use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                ctx.status = err.status || 500;
                ctx.body = { 
                    statusCode: ctx.status, 
                    message: err.message,
                    details: err.stackTrace
                 };
                // ctx.app.emit('error', err, ctx);
            }
        });
    }

    _configureRoutes() {
        // Bootstrap application router
        this.use(actorsRouter.routes());
    }

}

module.exports = App;