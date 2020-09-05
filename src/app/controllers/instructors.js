const { age, date } = require('../../lib/utils')
const Instructor = require('../models/Instructor')

module.exports = {
    index(req, res) {
        Instructor.all((instructors) => {
            return res.render('instructors/index', { instructors })
        })
    },
    show(req, res) {
        return res.render('instructors/show')
    },
    create(req, res) {
        return res.render('instructors/create')
    },
    post(req, res) {
        return
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        return
    },
    delete(req, res) {
        return
    }
}
