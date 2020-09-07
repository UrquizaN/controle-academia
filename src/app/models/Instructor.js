const { date } = require('../../lib/utils')
const db = require('../../database/db')

module.exports = {
    all(callback){
        const query = `
            SELECT instructors.*, count(members) AS total_members
            FROM instructors
            LEFT JOIN members ON (instructors.id = members.instructor_id)
            GROUP BY instructors.id
            ORDER BY total_members DESC
        `
        db.query(query, function(error, results){
            if(error) throw `Database Error! ${error}`
            return callback(results.rows) 
        })
    },
    create(data, callback){
        const query = `
            INSERT INTO instructors(
                avatar_url,
                name,
                birth,
                gender,
                services,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
       `

       const values = [
           data.avatar_url,
           data.name,
           date(data.birth).iso,
           data.gender,
           data.services,
           date(Date.now()).iso,
       ]

       db.query(query, values, function(error, results) {
            if(error) throw `Database Error! ${error}`
            return callback(results.rows[0])
        })
    },
    find(id, callback){
        const query = `
            SELECT * FROM instructors WHERE id = $1
        `
        db.query(query, [id], function(error, results){
            if(error) throw `Database Error! ${error}`
            return callback(results.rows[0])
        })
    },
    findBy(filter, callback){
        const query = `
            SELECT instructors.*, count(members) AS total_members
            FROM instructors
            LEFT JOIN members ON (instructors.id = members.instructor_id)
            WHERE instructors.name ILIKE '%${filter}%'
            OR instructors.services ILIKE '%${filter}%'
            GROUP BY instructors.id
            ORDER BY total_members DESC
        `
        db.query(query, function(error, results){
            if(error) throw `Database Error! ${error}`
            return callback(results.rows) 
        })
    },
    update(data, callback){
        const query = `
            UPDATE instructors SET
            avatar_url = ($1), 
            name = ($2), 
            birth = ($3), 
            gender = ($4), 
            services = ($5)
            WHERE id = $6
        `
        const values = [
            data.avatar_url,
            data.name,
            data.birth,
            data.gender,
            data.services,
            data.id
        ]

        db.query(query, values, function(error, results){
            if(error) throw `Database Error! ${error}`
            return callback()
        }) 
    },
    delete(id, callback){
        const query = `
            DELETE FROM instructors WHERE id = $1
        `
        db.query(query, [id], function(error, results){
            if(error) throw `Database Error! ${error}`
            return callback()
        }) 
    }
}