import Register from "../models/register.js"

const registerHelper = {
    existeRegisterID: async (id, req) => {
        const existe = await Register.findById(id)
        if (!existe) {
            throw new Error(`no existe el registro ${id}`)
        }

        req.req.logbd = existe

    },

    verifyDocAlternative: async (docAlternative) => {
        try {
            const url = docAlternative;
    
            const isOneDriveLink = (url) => {
                const regex = /^https?:\/\/(www\.)?(onedrive\.live\.com|1drv\.ms)(\/.*)?$/;
                return regex.test(url);
            };
    
            if (!isOneDriveLink(url)) {
                throw new Error("El enlace proporcionado no es válido. Debe ser un enlace de OneDrive.");
            }
    
            console.log("El contenido es un enlace válido de OneDrive.");
            return true;
        } catch (error) {
            throw new Error(error.message || "Error al verificar el enlace de OneDrive.");
        }
    }
}

export default registerHelper;