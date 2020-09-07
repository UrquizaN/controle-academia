const { age, date } = require('../../lib/utils')
const Member = require('../models/Member')

module.exports = {
    index(req, res) {
        Member.all((members) => {
            return res.render('members/index', { members })
        })
    },
    show(req, res){
        Member.find(req.params.id, function(member){
            if(!member) return res.send('Member Not Found!')

            member.age = age(member.birth)
            member.birth = date(member.birth).birthdate
            
            return res.render('members/show', { member })
        })
    },
    create(req, res) {
        Member.instructorsList(function(results){
            return res.render('members/create', { instructors: results})
        })
    },
    post(req, res) {
        Member.create(req.body, function(member) {
            return res.redirect(`/members/${member.id}`)
        })
    },
    edit(req, res) {
        Member.find(req.params.id, function(member){
            if(!member) return res.send('Member Not Found!')

            member.birth = date(member.birth).iso

            Member.instructorsList(function(results){
                return res.render('members/edit', { member, instructors: results })
            })
        })
    },
    put(req, res) {
       Member.update(req.body, function(){
           return res.redirect(`/members/${req.body.id}`)
       })
    },
    delete(req, res) {
        Member.delete(req.body.id, function(){
            return res.redirect(`/members`)
        })
    }
}