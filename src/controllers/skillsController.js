import skillsService from "#src/services/skillsService";

const exposeController = {
    getAllSkills: async (req, res) => {
        try {
            const allSkills = await skillsService.findAllSkills()
            return res.json(allSkills)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    getSkillById: async (req, res) => {
        try {
            const {id} = req.params
            const skill = await skillsService.findSkillById(id)
            return res.json(skill)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    addNewSkill: async (req, res) => {
        try {
            const {body} = req
            const newSkill = await skillsService.addNewSkill(body)
            return res.json(newSkill)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    updateSkill: async (req, res) => {
        try {
            const {body} = req
            const {id} = req.params
            const updatedSkill = await skillsService.updateSkill(id, body)
            return res.json(updatedSkill)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    deleteSkill: async (req, res) => {
        try {
            const {id} = req.params
            const deletedSkill = await skillsService.deleteSkill(id)
            return res.json(deletedSkill)
        } catch (error) {
            return res.sendStatus(400)
        }
    }
}

export default exposeController
