const { date } = require('../../lib/utils')
const db = require('../../database/db')

module.exports = {
    all(callback){
        const query = `
            SELECT * FROM members ORDER BY name ASC
        `
        db.query(query, function(error, results){
            if(error) throw `Database Error! ${error}`
            return callback(results.rows) 
        })
    },
    create(data, callback){
        const query = `
            INSERT INTO members(
                avatar_url,
                name,
                email,
                birth,
                gender,
                blood,
                weight,
                height,
                instructor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
       `

       const values = [
           data.avatar_url,
           data.name,
           data.email,
           date(data.birth).iso,
           data.gender,
           data.blood,
           data.weight,
           data.height,
           data.instructor
       ]

       db.query(query, values, function(error, results) {
            if(error) throw `Database Error! ${error}`
            return callback(results.rows[0])
        })
    },
    find(id, callback){
        const query = `
            SELECT members.*, instructors.name AS instructor_name
            FROM members
            LEFT JOIN instructors ON (members.instructor_id = instructors.id)
            WHERE members.id = $1
        `
        db.query(query, [id], function(error, results){
            if(error) throw `Database Error! ${error}`
            return callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `
            UPDATE members SET
            avatar_url = ($1), 
            name = ($2), 
            email = ($3), 
            birth = ($4), 
            gender = ($5), 
            blood = ($6),
            weight = ($7),
            height = ($8),
            instructor_id = ($9)
            WHERE id = $10
        `
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.birth,
            data.gender,
            data.blood,
            data.weight,
            data.height,
            data.instructor,
            data.id
        ]

        db.query(query, values, function(error, results){
            if(error) throw `Database Error! ${error}`
            return callback()
        }) 
    },
    delete(id, callback){
        const query = `
            DELETE FROM members WHERE id = $1
        `
        db.query(query, [id], function(error, results){
            if(error) throw `Database Error! ${error}`
            return callback()
        }) 
    },
    instructorsList(callback){
        const query = `
            SELECT name, id FROM instructors
        `
        db.query(query, function(error, results){
            if(error) throw `Database Error! ${error}`
            return callback(results.rows)
        })
    }
}