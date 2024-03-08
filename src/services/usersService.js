import User from "#src/models/Users";
import bcrypt from "bcryptjs"
import queryBuilder from "#src/utils/mongoQueryBuilder";

const exposeServices = {

    findOneUserByEmail: async ({email}) => {
        try {
            return await User.findOne({email})
        } catch (error) {
            throw error
        }

    },

    findOneUserById: async ({id}) => {
        try {
            return await User.findOne({_id: id})
        } catch (error) {
            throw error
        }
    },
    findOneUserByIdWithRoles: async ({id}) => {
        const q = {_id: id}
        const filter = {roles: 1}
        const embed = {
            populate: {path: 'roles'}
        }
        try {
            return await User.findOne(q, filter, embed)
        } catch (error) {
            throw error
        }
    },
    findUserByRefreshToken: async ({refreshToken}) => {
        try {
            return await User.findOne({refreshToken})
        } catch (error) {
            throw error
        }
    },
    findAllUsers: async (query) => {
        const {
            filter,
            projection,
            options
        } = queryBuilder.getFindOptions({query})
        projection.password = 0
        projection.refreshToken = 0

        try {
            return await User.find(filter, projection, options)
        } catch (error) {
            throw error
        }
    },
    countUsers: async (query) => {
        const {
            filter
        } = queryBuilder.getFindOptions({query})
        try {
            return await User.countDocuments(filter)
        } catch (error) {
            throw new Error(error)
        }
    },
    createUser: async (rawData) => {
        const {password} = rawData
        const salt = bcrypt.genSaltSync(4);
        const hash = bcrypt.hashSync(password, salt);

        const newUserData = {
            ...rawData,
            password: hash
        }

        try {
            const toSave = new User(newUserData)
            return toSave.save()
        } catch (error) {
            throw error
        }
    },
    updateUserToken: async ({userId, refreshToken}) => {

        const query = {
            _id: userId
        }
        const updateQ = {
            $set: {
                refreshToken
            }
        }
        try {
            return await User.findOneAndUpdate(query, updateQ, {new: true})
        } catch (error) {
            throw error
        }
    },
    async updateUser(id, body) {
        try {
            if (body.password) {
                const salt = bcrypt.genSaltSync(4);
                body.password = bcrypt.hashSync(body.password, salt)
            }
            return await User.findOneAndUpdate({_id: id}, body, {new: true})
        } catch (error) {
            throw error
        }
    },
    async partialUpdate(id, body) {
        try {
            const {roles, skills, ...allFields} = body
            const updateObject = {}
            if (roles) {
                updateObject.$addToSet = {roles}
            }
            if (skills) {
                updateObject.$addToSet = {skills}
            }
            if (Object.keys(allFields).length > 0) {
                updateObject.$set = {...allFields}
            }
            return await User.findOneAndUpdate({_id: id}, updateObject, {new: true})
        } catch (error) {
            throw error
        }
    },
    async deleteUser(id) {
        try {
            return await User.findOneAndDelete({_id: id})
        } catch (error) {
            throw error
        }
    }
}


export default exposeServices
