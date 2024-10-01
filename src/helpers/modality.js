import Modality from "../models/modality.js"

const modalityHelper = {
    existeModalityID: async (id, req) => {
        const existe = await Modality.findById(id)
        if (!existe) {
            throw new Error(`no existe el registro ${id}`)
        }

        req.req.logbd = existe

    },
    
}

export default modalityHelper;