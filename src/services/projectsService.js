import Projects from "#src/models/Project";
import queryBuilder from "#src/utils/mongoQueryBuilder";


const exposeServices = {
    addNewProjects: async (rawData) => {
        try {
            const newProjects = new Projects(rawData)
            return await newProjects.save()
        } catch (error) {
            throw error
        }
    },
    findAllProjects: async (query) => {
        const {
            filter,
            projection,
            options
        } = queryBuilder.getFindOptions({query})

        try {
            return await Projects.find(filter, projection, options)
        } catch (error) {
            throw error
        }
    },
    countProject: async (query) => {
        const {
            filter
        } = queryBuilder.getFindOptions({query})
        try {
            return await Projects.countDocuments(filter)
        } catch (error) {
            throw new Error(error)
        }
    },
    findProjectById: async (id) => {
        try {
            return await Projects.findOne({_id: id})
        } catch (error) {
            throw error
        }
    },
    updateProject: async (id, rawData) => {
        try {
            return await Projects.findOneAndUpdate({_id: id}, rawData, {new: true})
        } catch (error) {
            throw error
        }
    },
    partialUpdateProject: async (id, rawData) => {
        try {
            const {
                members,
                ...allFields
            } = rawData
            return await Projects.findOneAndUpdate({_id: id},
                {
                    $set: {
                        // Mettre à jour les autres champs si nécessaire
                        ...allFields
                    },
                    $addToSet: {
                        // Ajouter les membres si nécessaire
                        members
                    }
                }, {new: true});
        } catch (error) {
            throw error
        }
    },
    deleteProject: async (id) => {
        try {
            return await Projects.findOneAndDelete({_id: id})
        } catch (error) {
            throw error
        }
    }
}


export default exposeServices
