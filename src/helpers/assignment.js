// helpers/assignmentHelper.js
import Assignment from '../models/assignment.js';


const assignmentHelper = {


existAssignmentByID: async (id) => {
    try {
        const assignment = await Assignment.findById(id);
        if (!assignment) {
            throw new Error(`La asignación con ID ${id} no existe`);
        }
        return assignment;
    } catch (error) {
        throw new Error(`Error al buscar la asignación por ID: ${error.message}`);
    }
}
}

export default assignmentHelper;