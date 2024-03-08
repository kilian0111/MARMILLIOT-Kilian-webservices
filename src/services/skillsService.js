import Skills from "#src/models/Skills";

const exposeServices = {
    addNewSkill: async (rawData) => {
        try {
            const newSkills = new Skills(rawData)
            return await newSkills.save()
        } catch (error) {
            throw error
        }
    },
    findAllSkills: async () => {
        try {
            return await Skills.find()
        } catch (error) {
            throw error
        }
    },
    findSkillById: async (id) => {
        try {
            return await Skills.findOne({_id: id})
        } catch (error) {
            throw error
        }
    },
    updateSkill: async (id, rawData) => {
        try {
            return await Skills.findOneAndUpdate({_id: id}, rawData, {new: true})
        } catch (error) {
            throw error
        }
    },
    deleteSkill: async (id) => {
        try {
            return await Skills.findOneAndDelete({_id: id})
        } catch (error) {
            throw error
        }
    }
}


export default exposeServices
