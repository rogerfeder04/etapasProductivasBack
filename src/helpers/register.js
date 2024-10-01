import Register from "../models/register.js"

const registerHelper = {
    existeRegisterID: async (id, req) => {
        const existe = await Register.findById(id)
        if (!existe) {
            throw new Error(`no existe el registro ${id}`)
        }

        req.req.logbd = existe

    },
}

export default registerHelper;