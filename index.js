const express = require('express')
const uuid = require('uuid')
const app = express()
const port = 3000
app.use(express.json())


const users = []
const checkUserId = (req, res, next) => {

    const { id } = req.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {

        return res.status(404).json({ message: "User not found" })

    }

    req.userIndex = index

    req.userId = id

    next()
}
app.get('/users', (req, res) => {
    return res.json(users)
})

app.post('/users', (req, res) => {

    const { name, age } = req.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return res.status(201).json(user)

})

app.put('/users/:id', checkUserId, (req, res) => {

    const { name, age } = req.body
    const index = req.userIndex
    const id = req.userId

    const updateUser = { id, name, age }

    users[index] = updateUser

    return res.json(updateUser)
})

app.delete('/users/:id', (req, res) => {

    const index = req.userIndex

    users.splice(index, 1)

    return res.json().status(204)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))