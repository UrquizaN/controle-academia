const { age, date } = require('../../lib/utils')

exports.index = (req, res) => {
    return res.render('members/index', { members: data.members })
}

exports.show = function(req, res) {
    const { id } = req.params

    const foundMember = data.members.find((member) => {
        return member.id == id
    })

    if(!foundMember) return res.send('Member not found!')

    const member = {
        ...foundMember,
        age: age(foundMember.birth),
        birth: date(foundMember.birth).birthdate
    }

    return res.render('members/show', { member })
}

exports.create = function(req, res) {
    return res.render('members/create')
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == "") return res.send('Please, fill all fields!')
    }

    let id = 1
    let lastMember = data.members[data.members.length - 1]

    if(lastMember){
        id = lastMember.id + 1
    }

    birth = Date.parse(req.body.birth)

    data.members.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send('Write file error!')

        return res.redirect(`/members/${id}`)
    })
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundMember = data.members.find((member) => {
        return member.id == id
    })

    if(!foundMember) return res.send('Member not found!')

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso,
    }

    return res.render('members/edit', { member })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find((member, foundIndex) => {
        if(member.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundMember) {
        return res.send('Member not found!')
    }

    const member = {
        ...foundMember,
        ...req.body,
        id: Number(req.body.id),
        birth: Date.parse(req.body.birth)
    }

    data.members[index] = member

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write error!')

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredMember = data.members.filter((member) => {
        return member.id != id
    })

    data.members = filteredMember

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write error!')

        return res.redirect('members')
    })
}