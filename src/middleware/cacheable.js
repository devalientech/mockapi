const bluebird = require('bluebird')
const redis = require('redis')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const client = redis.createClient();

module.exports = async (ctx, next) => {

    const cacheKey = getCacheKey(ctx.request.url)
    // console.log('cache get', cacheKey)

    const cacheResult = await client.getAsync(cacheKey)
    if (cacheResult) {
        // console.log('cache result')
        ctx.body = JSON.parse(cacheResult);
    } else {
        await next()

        if (ctx.body) {
            // console.log('cache set')
            await client.setexAsync(cacheKey, 60, JSON.stringify(ctx.body))
        }
    }
};

function getCacheKey(url) {
    return url.replace('/', '').replace(/\?|\&|\=/g, ':');
}
