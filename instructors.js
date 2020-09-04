const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

exports.show = function(req, res) {
<<<<<<< HEAD
    const id = req.params.id
=======
    const { id } = req.params
>>>>>>> b59d4d5f13d8962f2ccb8a53b8e9cfb829ef3ecd

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id
    })

<<<<<<< HEAD
    if(!foundInstructor) return res.send('Instructor not found!')
=======
    if(!foundInstructor) {
        return res.send('Instructor not found!')
    }
>>>>>>> b59d4d5f13d8962f2ccb8a53b8e9cfb829ef3ecd

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(','),
<<<<<<< HEAD
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),
=======
        created_at: new Intl.DateTimeFormat("en-GB").format(foundInstructor.created_at)
>>>>>>> b59d4d5f13d8962f2ccb8a53b8e9cfb829ef3ecd
    }

    return res.render('instructors/show', { instructor })
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == "") return res.send('Please, fill all fields!')
    }

    let { name, avatar_url, birth, gender, services } = req.body

    const id = Number(data.instructors.length + 1)
    const created_at = Date.now()
    birth = Date.parse(birth)

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send('Write file error!')

        return res.redirect(`/instructors/${id}`)
    })
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id
    })

    if(!foundInstructor) return res.send('Instructor not found!')

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    return res.render('instructors/edit', { instructor })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find((instructor, foundIndex) => {
        if(instructor.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundInstructor) {
        return res.send('Instructor not found!')
    }

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.instructors[index] = instructor

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write error!')

        return res.redirect(`/instructors/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredInstructor = data.instructors.filter((instructor) => {
        return instructor.id != id
    })

    data.instructors = filteredInstructor

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write error!')

        return res.redirect('instructors')
    })
}