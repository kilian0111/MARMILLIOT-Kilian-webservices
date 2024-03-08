import usersService from '#src/services/usersService'

const exposeController = {

    allUsers: async (req, res) => {
        try {
            const {query} = req
            const allUsers = await usersService.findAllUsers(query)
            const xCountUser = await usersService.countUsers(query);
            res.set("X-count", xCountUser);
            return res.json(allUsers)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    findOneUserById: async (req, res) => {
        try {
            const {id} = req.params
            if (!id) {
                return res.sendStatus(400)
            }
            const user = await usersService.findOneUserById(req.params)
            return res.json(user)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    createUser: async (req, res) => {
        const {body} = req
        try {
            if (!body.password) {
                return res.status(400).json({error: 'password is required'}).send()
            }
            if (!body.email) {
                return res.status(400).json({error: 'email is required'}).send()
            }
            const registeredUser = await usersService.createUser(body)
            return res.json(registeredUser)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    updateUser: async (req, res) => {
        const {body} = req
        const {id} = req.params
        try {
            const toUpdate = await usersService.updateUser(id, body)
            return res.json(toUpdate)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    partialUpdate: async (req, res) => {
        const {body} = req
        const {id} = req.params
        try {
            const toPatch = await usersService.partialUpdate(id, body)
            return res.json(toPatch)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    deleteUser: async (req, res) => {
        const {id} = req.params
        try {
            const toDelete = await usersService.deleteUser(id)
            return res.json(toDelete)
        } catch (error) {
            return res.sendStatus(400)
        }
    }
}

export default exposeController
