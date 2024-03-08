import UsersS from '#src/services/usersService'


const exposeMiddleware = {

    authorizationChecker: async (req, res, next) => {
        const {userId, method, baseUrl} = req
        const thisU = await UsersS.findOneUserByIdWithRoles({id: userId})
        if (thisU.roles == null || thisU.roles.length === 0) {
            return res.sendStatus(403)
        }
        const ressourcePath = baseUrl.split('/')[3]
        let isAllowed = false
        thisU.roles.forEach(({authorizations}) => {
            // for each on each authorizations
            const findRessource = authorizations.find(({ressource}) => ressource === ressourcePath)

            isAllowed = findRessource?.permissions.includes(method)
        })

        if (isAllowed) {
            req.roles = thisU.roles.map(({name}) => name)
            return next()
        }
        return res.sendStatus(403)

    }
}

export default exposeMiddleware
