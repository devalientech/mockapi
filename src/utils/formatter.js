module.exports = {
    pagination(querystring) {
        let page = parseInt(querystring.page || 1, 10)
        let per_page = parseInt(querystring.per_page || 10, 10)

        page = (page > 0) ? page : 1;

        return {
            page,
            per_page,
            offset: (page-1) * per_page, 
            limit: per_page 
        }
    }
}