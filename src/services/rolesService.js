import Roles from "#src/models/Roles";


const exposeServices = {
    addNewRoles: async (rawData) => {
        try {
            const newRoles = new Roles(rawData)
            return await newRoles.save()
        } catch (error) {
            throw error
        }
    },
    findAllRoles: async () => {
        try {
            return await Roles.find()
        } catch (error) {
            throw error
        }
    },
    findRoleById: async (id) => {
        try {
            return await Roles.findOne({_id: id})
        } catch (error) {
            throw error
        }
    },
    updateRole: async (id, rawData) => {
        try {
            return await Roles.findOneAndUpdate({_id: id}, rawData, {new: true})
        } catch (error) {
            throw error
        }
    },
    partialUpdateRole: async (id, rawData) => {
        try {
            const existingRole = await Roles.findOne({_id: id});

            if (existingRole) {
                // Mettez à jour les autorisations
                for (const authorization of rawData.authorizations) {
                    const index = existingRole.authorizations.findIndex(
                        auth => auth.ressource === authorization.ressource
                    );
                    if (index === -1) {
                        // Si la ressource n'existe pas, ajoutez la nouvelle autorisation
                        existingRole.authorizations.push(authorization);
                    } else {
                        // Si la ressource existe, vérifiez et ajoutez les nouvelles permissions
                        const existingPermissions = new Set(existingRole.authorizations[index].permissions);
                        authorization.permissions.forEach(permission => existingPermissions.add(permission));

                        existingRole.authorizations[index].permissions = Array.from(existingPermissions);
                    }
                }
                // Sauvegardez les modifications
                await existingRole.save();
                return existingRole;
            }
            return null;
        } catch (error) {
            throw error
        }
    },
    deleteRole: async (id) => {
        try {
            return await Roles.findOneAndDelete({_id: id})
        } catch (error) {
            throw error
        }
    }
}


export default exposeServices
