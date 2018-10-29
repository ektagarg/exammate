const database = require('./db');
let env = process.env.mode || 'development';
module.exports = {
    database : database[env]
}