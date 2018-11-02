module.exports = {
    development: {
        provider: 'mongodb',
        connectionString: 'mongodb://127.0.0.1/exammate',
        paginationItems: 10,
        agenda: 'mongodb://127.0.0.1/agenda'
    },
    test: {
        provider: 'mongodb',
        connectionString: 'mongodb://127.0.0.1/exammate-test',
        paginationItems: 10,
        agenda: 'mongodb://127.0.0.1/agenda'
    },
    production: {
        provider: 'mongodb',
        connectionString: 'mongodb://127.0.0.1/exammate-production',
        paginationItems: 10,
        agenda: 'mongodb://127.0.0.1/agenda'
    }
}