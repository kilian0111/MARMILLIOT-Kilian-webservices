import projectsService from "#src/services/projectsService";

const exposeController = {
    getAllProjects: async (req, res) => {
        const query = req.query
        const allProjects = await projectsService.findAllProjects(query)
        const xCountUser = await projectsService.countProject(query);
        res.set("X-count", xCountUser);
        return res.json(allProjects)
    },
    getProjectById: async (req, res) => {
        const {id} = req.params
        const project = await projectsService.findProjectById(id)
        return res.json(project)
    },
    addNewProject: async (req, res) => {
        const {body} = req
        const newProject = await projectsService.addNewProjects(body)
        return res.json(newProject)
    },
    updateProject: async (req, res) => {
        const {body} = req
        const {id} = req.params
        const updatedProject = await projectsService.updateProject(id, body)
        return res.json(updatedProject)
    },
    partialUpdateProject: async (req, res) => {
        const {body} = req
        const {id} = req.params
        const updatedProject = await projectsService.partialUpdateProject(id, body)
        return res.json(updatedProject)
    },
    deleteProject: async (req, res) => {
        const {id} = req.params
        const deletedProject = await projectsService.deleteProject(id)
        return res.json(deletedProject)
    }
}

export default exposeController
