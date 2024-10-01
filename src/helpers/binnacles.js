import Binnacle from "../models/binnacles.js"
import Assignament from "../models/assignment.js"

const binnacleHelper = {
    existeBinnacleID: async (id, req) => {
        const existe = await Binnacle.findById(id)
        if (!existe) {
            throw new Error(`no existe el registro ${id}`)
        }

        req.req.binnaclebd = existe

    },

    existeAssignmentID: async (id, req) => {
        const existe = await Assignament.findById(id)
        if (!existe) {
            throw new Error(`no existe el registro ${id}`)
        }

        req.req.binnaclebd = existe

    },

    existeInstructortID: async (id, req) => {
        const existe = await Binnacle.find(instructor)
        if (!existe) {
            throw new Error(`no existe el registro ${id}`)
        }

        req.req.binnaclebd = existe

    },
}

export default binnacleHelper;