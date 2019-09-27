const db = require('../../config/db')
const formatter = require('../../utils/formatter')

class ActorsController {
    async get(ctx) {
        const pagination = formatter.pagination(ctx.request.query)

        const total = await db.query('select count(1)::int from actor')
        const result = await db.query(`
            select actor_id, first_name, last_name 
                from actor order by actor_id  
                offset $1 limit $2`, [pagination.offset, pagination.limit])

        ctx.body = {
            page: pagination.page,
            per_page: pagination.per_page,
            total: total.rows[0].count,
            data: result.rows,
        }
    }
}

module.exports = ActorsController;