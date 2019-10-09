const bluebird = require('bluebird')
const redis = require('redis')
const config = require('../../config/redis')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

class RedisClient {
    get client() {
        if (this._client == null) {
            this._client = redis.createClient(config);
        }
        return this._client;
    }

    async get(key) {
        const result = await this.client.getAsync(key)
        if (!result) {
            return null
        }
        return JSON.parse(result)
    }

    async set(key, val, time) {
        if (time) {
            await this.client.setexAsync(key, time, JSON.stringify(val))
        } else {
            await this.client.setAsync(key, JSON.stringify(val))
        }
    }
}

module.exports = { RedisClient }