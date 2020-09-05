const db = require('../../database/db')

module.exports = {
    all(callback){
        const query = `
            SELECT * FROM instructors
        `
        db.query(query, function(error, results){
            if(error) throw `Database Error! ${error}`
            return callback(results.rows) 
        })
    }
}