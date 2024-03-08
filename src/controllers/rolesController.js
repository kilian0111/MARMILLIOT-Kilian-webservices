import rolesService from "#src/services/rolesService";

const exposeController = {
    getAllRoles: async (req, res) => {
        try {
            const allRoles = await rolesService.findAllRoles()
            return res.json(allRoles)
        } catch (error) {
            return res.sendStatus(400)
        }

    },
    getRoleById: async (req, res) => {
        try {
            const {id} = req.params
            if (!id) {
                return res.sendStatus(400)
            }
            const role = await rolesService.findRoleById(id)
            if (!role) {
                return res.sendStatus(404)
            }
            return res.json(role)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    addNewRole: async (req, res) => {
        try {
            const {body} = req
            if (!body && !body.name) {
                return res.sendStatus(400)
            }
            const newRole = await rolesService.addNewRoles(body)
            return res.json(newRole)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    updateRole: async (req, res) => {
        try {
            const {body} = req
            const {id} = req.params
            if (!id) {
                return res.sendStatus(400)
            }
            if (await rolesService.findRoleById(id) === null) {
                return res.sendStatus(404)
            }

            const updatedRole = await rolesService.updateRole(id, body)
            return res.json(updatedRole)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    partialUpdateRole: async (req, res) => {
        try {
            const {body} = req
            const {id} = req.params
            if (!id) {
                return res.sendStatus(400)
            }
            if (await rolesService.findRoleById(id) === null) {
                return res.sendStatus(404)
            }
            const updatedRole = await rolesService.partialUpdateRole(id, body)
            return res.json(updatedRole)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    deleteRole: async (req, res) => {
        try {
            const {id} = req.params
            if (!id) {
                return res.sendStatus(400)
            }
            if (await rolesService.findRoleById(id) === null) {
                return res.sendStatus(404)
            }
            const deletedRole = await rolesService.deleteRole(id)
            return res.status(204)
        } catch (error) {
            return res.sendStatus(400)
        }
    }
}

export default exposeController
