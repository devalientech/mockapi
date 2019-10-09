const { RedisClient } = require('../api/common/redisClient')

module.exports = async (ctx, next) => {
    const redisClient = new RedisClient();
    const cacheKey = getCacheKey(ctx.request.url)

    const cacheResult = await redisClient.get(cacheKey)
    if (cacheResult) {
        ctx.body = cacheResult
    } else {
        await next()
        if (ctx.body) {
            await redisClient.set(cacheKey, ctx.body, 60)
        }
    }
}

function getCacheKey(url) {
    return url.replace('/', '').replace(/\?|\&|\=/g, ':');
}
