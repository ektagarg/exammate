module.exports = {
    development: {
        provider: 'mongodb',
        connectionString: 'mongodb://127.0.0.1:27017/exammate',
        paginationItems: 10

    },
    test: {
        provider: 'mongodb',
        connectionString: 'mongodb://127.0.0.1/exammate-test',
        paginationItems: 10
    },
    production: {
        provider: 'mongodb',
        connectionString: 'mongodb://127.0.0.1/exammate-production',
        paginationItems: 10
    }
}