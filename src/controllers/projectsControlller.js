import projectsService from "#src/services/projectsService";
import {sha1} from 'js-sha1';
import {get, set, setex, redisClient, delAllKeyStartingWith} from "#src/services/redisClient";


const exposeController = {
    getAllProjects: async (req, res) => {

        try {
            const sha1Query = sha1(JSON.stringify(req.query))
            const keySha1 = 'creation_' + sha1Query;
            const cacheResults = await get(keySha1)
            console.log(JSON.parse(cacheResults));
            console.log(sha1Query);
            if (cacheResults) {
                res.set('x-cache', 'HIT')
                return res.json(JSON.parse(cacheResults))
            }
            res.set('x-cache', 'MISS')
            const query = req.query
            const allProjects = await projectsService.findAllProjects(query)
            const xCountUser = await projectsService.countProject(query);
            await set(keySha1, JSON.stringify(allProjects))
            res.set("X-count", xCountUser);
            return res.json(allProjects)

        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },
    getProjectById: async (req, res) => {
        try {
            const {id} = req.params
            const project = await projectsService.findProjectById(id)
            return res.json(project)
        } catch (error) {
            return res.sendStatus(500)
        }

    },
    addNewProject: async (req, res) => {
        try {
            await delAllKeyStartingWith('creation_')
            const {body} = req
            const newProject = await projectsService.addNewProjects(body)
            return res.json(newProject)
        } catch (error) {
            return res.sendStatus(400)
        }
    },
    updateProject: async (req, res) => {
        try {
            await delAllKeyStartingWith('creation_')
            const {body} = req
            const {id} = req.params
            if (!id) return res.sendStatus(400)
            if (await projectsService.findProjectById(id) === null) {
                return res.sendStatus(404)
            }
            const updatedProject = await projectsService.updateProject(id, body)
            return res.json(updatedProject)
        } catch (error) {
            return res.sendStatus(400)
        }

    },
    partialUpdateProject: async (req, res) => {
        try {
            await delAllKeyStartingWith('creation_')
            const {body} = req
            const {id} = req.params
            if (!id) return res.sendStatus(400)
            if (await projectsService.findProjectById(id) === null) {
                return res.sendStatus(404)
            }
            const updatedProject = await projectsService.partialUpdateProject(id, body)
            return res.json(updatedProject)
        } catch (error) {
            return res.sendStatus(400)
        }

    },
    deleteProject: async (req, res) => {
        try {
            const {id} = req.params
            await delAllKeyStartingWith('creation_')
            if (!id) return res.sendStatus(400)
            if (await projectsService.findProjectById(id) === null) {
                return res.sendStatus(404)
            }
            const deletedProject = await projectsService.deleteProject(id)
            return res.sendStatus(204)
        } catch (error) {
            return res.sendStatus(400)
        }

    }
}

export default exposeController
